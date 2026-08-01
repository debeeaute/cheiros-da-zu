/**
 * Conector do Cheiros da Zu com Google Planilhas.
 * Cole este arquivo em Extensões > Apps Script, dentro da planilha da loja.
 */
const ABA_PRODUTOS = 'Produtos';
const ABA_VENDAS = 'Vendas';

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('Cheiros da Zu')
    .addItem('Preparar planilha', 'prepararPlanilha')
    .addToUi();
}

function prepararPlanilha() {
  const planilha = SpreadsheetApp.getActive();
  const produto = obterOuCriarAba_(planilha, ABA_PRODUTOS);
  const venda = obterOuCriarAba_(planilha, ABA_VENDAS);
  if (produto.getLastRow() === 0) {
    produto.appendRow(['id', 'nome', 'marca', 'categoria', 'preco', 'estoque']);
  }
  if (venda.getLastRow() === 0) {
    venda.appendRow(['id', 'produtoId', 'quantidade', 'data', 'canal', 'cliente']);
  }
  [produto, venda].forEach(aba => {
    aba.getRange(1, 1, 1, aba.getLastColumn()).setFontWeight('bold').setBackground('#fbe7ec');
    aba.setFrozenRows(1);
    aba.autoResizeColumns(1, aba.getLastColumn());
  });
  SpreadsheetApp.getUi().alert('Planilha preparada! Preencha os produtos na aba Produtos.');
}

function doGet() {
  return resposta_({ ok: true, ...lerDados_() });
}

function doPost(e) {
  try {
    const corpo = JSON.parse(e.postData.contents || '{}');
    if (corpo.acao === 'venda') registrarVenda_(corpo.venda);
    if (corpo.acao === 'produto') salvarProduto_(corpo.produto);
    return resposta_({ ok: true, ...lerDados_() });
  } catch (erro) {
    return resposta_({ ok: false, erro: erro.message });
  }
}

function lerDados_() {
  const planilha = SpreadsheetApp.getActive();
  return {
    produtos: linhasComoObjetos_(planilha.getSheetByName(ABA_PRODUTOS)),
    vendas: linhasComoObjetos_(planilha.getSheetByName(ABA_VENDAS))
  };
}

function registrarVenda_(venda) {
  if (!venda || !venda.produtoId || !Number(venda.quantidade)) throw new Error('Venda incompleta.');
  const planilha = SpreadsheetApp.getActive();
  const produtos = planilha.getSheetByName(ABA_PRODUTOS);
  const valores = produtos.getDataRange().getValues();
  const indice = valores.findIndex((linha, i) => i > 0 && String(linha[0]) === String(venda.produtoId));
  if (indice < 1) throw new Error('Produto não encontrado.');
  const estoque = Number(valores[indice][5]);
  if (estoque < Number(venda.quantidade)) throw new Error('Estoque insuficiente.');
  produtos.getRange(indice + 1, 6).setValue(estoque - Number(venda.quantidade));
  planilha.getSheetByName(ABA_VENDAS).appendRow([
    venda.id || Date.now(), venda.produtoId, Number(venda.quantidade), venda.data,
    venda.canal || 'Outro', venda.cliente || 'Cliente novo'
  ]);
}

function salvarProduto_(produto) {
  if (!produto || !produto.nome) throw new Error('Produto incompleto.');
  SpreadsheetApp.getActive().getSheetByName(ABA_PRODUTOS).appendRow([
    produto.id || Date.now(), produto.nome, produto.marca || 'Outra', produto.categoria || '',
    Number(produto.preco) || 0, Number(produto.estoque) || 0
  ]);
}

function linhasComoObjetos_(aba) {
  if (!aba || aba.getLastRow() < 2) return [];
  const [cabecalhos, ...linhas] = aba.getDataRange().getValues();
  return linhas.filter(linha => linha.some(celula => celula !== '')).map(linha =>
    Object.fromEntries(cabecalhos.map((cabecalho, indice) => [cabecalho, linha[indice]]))
  );
}

function obterOuCriarAba_(planilha, nome) {
  return planilha.getSheetByName(nome) || planilha.insertSheet(nome);
}

function resposta_(dados) {
  return ContentService.createTextOutput(JSON.stringify(dados))
    .setMimeType(ContentService.MimeType.JSON);
}

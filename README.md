# Cheiros da Zu

Painel HTML simples para uma loja de cosméticos controlar estoque, registrar vendas e encontrar oportunidades comerciais.

## Como usar

1. Abra `index.html` no navegador.
2. Clique em **Usar dados de exemplo** para conhecer o painel ou cadastre seus produtos em **Estoque**.
3. Registre cada saída em **Vendas**. Os dados ficam salvos no navegador usado.
4. Se preferir, importe um arquivo CSV com as colunas `data,produto,quantidade,canal,cliente`.

Exemplo:

```csv
data,produto,quantidade,canal,cliente
2026-08-01,Lily Eau de Parfum,1,WhatsApp,Cliente recorrente
```

Para uma integração automática com Google Planilhas, será necessário conectar uma planilha publicada ou uma pequena automação (Apps Script). Esta versão já está preparada para importação manual do CSV e análise local.

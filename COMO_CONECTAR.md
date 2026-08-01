# Conectar a Planilha Google ao Cheiros da Zu

## 1. Preparar a planilha

1. Crie uma nova planilha no Google Planilhas, por exemplo: **Controle Cheiros da Zu**.
2. No menu da planilha, abra **Extensões > Apps Script**.
3. Apague o texto que aparecer e cole o conteúdo do arquivo `Code.gs` desta pasta.
4. Clique em **Salvar** e atualize a página da planilha.
5. Surgirá o menu **Cheiros da Zu**. Clique em **Preparar planilha** e autorize o acesso quando o Google pedir.

Isso cria as abas `Produtos` e `Vendas`. Preencha a aba Produtos com os seus itens.

## 2. Criar o link de conexão

1. Ainda no Apps Script, clique em **Implantar > Nova implantação**.
2. Em tipo, escolha **App da Web**.
3. Em “Executar como”, escolha **Eu**.
4. Em “Quem tem acesso”, escolha a opção mais ampla disponível para permitir que o site seja usado por você e sua mãe.
5. Clique em **Implantar**, autorize e copie a URL que termina em `/exec`.

Envie essa URL para o Codex. Ela é o endereço que permitirá conectar o site à planilha.

> Importante: não coloque dados pessoais de clientes (telefone, endereço ou CPF) nessa planilha. Nesta versão, registre somente o tipo de cliente, como “Cliente novo” ou “Cliente recorrente”.

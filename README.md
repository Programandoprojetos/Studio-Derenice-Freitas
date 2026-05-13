# Studio Derenice Freitas

Sistema local de agendamento com Node.js, persistencia em arquivo JSON e interface web.

## Executar localmente

1. Instale o Node.js 18 ou superior.
2. Abra o terminal na pasta [Belleza-Studio-main](/C:/Users/raull/OneDrive/Desktop/Belleza-Studio-main).
3. Se quiser personalizar credenciais e porta, copie `.env.example` para `.env` e edite os valores.
4. Execute `npm.cmd start`.
5. Abra [http://127.0.0.1:3000](http://127.0.0.1:3000).

## Arquivos principais

- [index.html](/C:/Users/raull/OneDrive/Desktop/Belleza-Studio-main/index.html): estrutura da interface.
- [static/styles.css](/C:/Users/raull/OneDrive/Desktop/Belleza-Studio-main/static/styles.css): estilos da aplicacao.
- [static/app.js](/C:/Users/raull/OneDrive/Desktop/Belleza-Studio-main/static/app.js): frontend conectado a API local.
- [server.js](/C:/Users/raull/OneDrive/Desktop/Belleza-Studio-main/server.js): servidor HTTP e API.
- [data/appointments.json](/C:/Users/raull/OneDrive/Desktop/Belleza-Studio-main/data/appointments.json): base local dos agendamentos.
- [.env.example](/C:/Users/raull/OneDrive/Desktop/Belleza-Studio-main/.env.example): exemplo de configuracao local.

## Melhorias aplicadas

- CSS extraido para arquivo proprio.
- Mensagens visuais na tela no lugar de `alert()`.
- Melhorias basicas de acessibilidade com `main`, `section`, `aria-label` e foco visivel.
- Credenciais e porta configuraveis por `.env`.

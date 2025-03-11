// Importação das dependências
const express = require("express");
const cors = require("cors");
require("dotenv").config();

// Inicialização do servidor
const app = express();
app.use(express.json());
app.use(cors()); // Permite requisições de origens diferentes (como localhost:3000 para o front-end)

// Configuração das respostas do chatbot
const respostas = {
  "1": "Ótimo! Para fazer um pedido, acesse nosso site ou ligue para (XX) XXXX-XXXX.",
  "2": "Nosso horário de funcionamento é das 8h às 18h, de segunda a sábado.",
  "3": "Nosso endereço é Rua Exemplo, 123, Centro, Cidade/Estado.",
  "saudacao": "Olá! Como posso te ajudar hoje? Você pode escolher uma das opções: 1, 2 ou 3.",
  "erro": "Desculpe, não entendi. Escolha uma opção: 1, 2 ou 3, ou pergunte sobre algo mais!"
};

// Função para salvar o log da interação no banco de dados (MongoDB)
function logMessageToDB(message, response) {
  // Aqui você poderia adicionar o código para salvar no banco de dados MongoDB
  // Exemplo:
  // const newLog = new ChatLog({ message, response });
  // newLog.save().catch((err) => console.error(err));
  console.log(`Log: ${message} => ${response}`);
}

// Rota principal do chatbot
app.post("/api/chat", (req, res) => {
  const { message } = req.body;
  let resposta = respostas[message] || respostas["erro"]; // Resposta padrão para mensagens desconhecidas
  
  if (!resposta && message.toLowerCase().includes("oi")) {
    resposta = respostas["saudacao"];
  }

  // Log da interação no servidor (simulando salvar no banco de dados)
  logMessageToDB(message, resposta);

  // Envia a resposta do chatbot para o front-end
  res.json({ reply: resposta });
});

// Inicializa o servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

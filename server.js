// Importação das dependências
const express = require("express");
const cors = require("cors");
const fs = require("fs");
require("dotenv").config();

// Inicialização do servidor
const app = express();
app.use(express.json());
app.use(cors());

// Configuração das respostas do chatbot
const respostas = {
  "1": "Ótimo! Para fazer um pedido, acesse nosso site ou ligue para (XX) XXXX-XXXX.",
  "2": "Nosso horário de funcionamento é das 8h às 18h, de segunda a sábado.",
  "3": "Nosso endereço é Rua Exemplo, 123, Centro, Cidade/Estado.",
  "saudacao": "Olá! Como posso te ajudar hoje? Você pode escolher uma das opções: 1, 2 ou 3.",
  "erro": "Desculpe, não entendi. Escolha uma opção: 1, 2 ou 3, ou pergunte sobre algo mais!"
};

// Função para logar as mensagens em um arquivo
function logMessage(message, response) {
  const log = `Mensagem: ${message} | Resposta: ${response} | Data: ${new Date().toISOString()}\n`;
  fs.appendFile("chat_logs.txt", log, (err) => {
    if (err) {
      console.error("Erro ao salvar log: ", err);
    } else {
      console.log("Log salvo com sucesso.");
    }
  });
}

// Rota principal do chatbot
app.post("/api/chat", (req, res) => {
  const { message } = req.body;

  // Respostas personalizadas baseadas na mensagem
  let resposta = respostas[message] || respostas["erro"];

  // Se a mensagem não for uma opção numérica, tentamos encontrar respostas alternativas
  if (!resposta && message.toLowerCase().includes("oi")) {
    resposta = respostas["saudacao"];
  }

  // Log da interação
  logMessage(message, resposta);

  // Retorno da resposta
  res.json({ reply: resposta });
});

// Inicializa o servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

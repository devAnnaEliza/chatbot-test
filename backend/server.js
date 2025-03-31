// Importação das dependências
const express = require("express");
const cors = require("cors");
require("dotenv").config();

// Inicialização do servidor
const app = express();
app.use(express.json());
app.use(cors());

// Respostas do chatbot
const respostas = {
  "olá": "Olá! Como posso te ajudar hoje?",
  "tudo bem?": "Estou bem, obrigado! E você?",
  "qual é o seu nome?": "Eu sou o Chatbot Inteligente!",
  "adeus": "Até logo! Foi um prazer conversar com você.",
  "erro": "Desculpe, não entendi. Pode reformular?",
};

// Rota principal do chatbot
app.post("/api/chat", (req, res) => {
  const { message } = req.body;

  if (!message || typeof message !== "string") {
    return res.status(400).json({ reply: "Entrada inválida. Envie uma mensagem válida." });
  }

  const mensagemFormatada = message.trim().toLowerCase();
  const resposta = respostas[mensagemFormatada] || respostas["erro"];

  res.json({ reply: resposta });
});

// Inicialização do servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
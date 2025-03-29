const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

const respostas = {
  "1": "Ótimo! Para fazer um pedido, acesse nosso site ou ligue para (XX) XXXX-XXXX.",
  "2": "Nosso horário de funcionamento é das 8h às 18h, de segunda a sábado.",
  "3": "Nosso endereço é Rua Exemplo, 123, Centro, Cidade/Estado.",
  "saudacao": "Olá! Como posso te ajudar hoje? Escolha uma das opções: 1, 2 ou 3.",
  "erro": "Desculpe, não entendi. Escolha uma das opções: 1, 2 ou 3.",
};

const mensagensCoringa = ["olá", "oi", "bom dia", "boa tarde", "boa noite", "e aí", "tudo bem"];

app.post("/api/chat", (req, res) => {
  const { message, usuario } = req.body;

  if (!message || typeof message !== "string" || !usuario || typeof usuario !== "string") {
    return res.status(400).json({ reply: "Entrada inválida. Certifique-se de enviar uma mensagem e um nome de usuário válidos." });
  }

  const mensagemFormatada = message.trim().toLowerCase();
  console.log("Mensagem formatada:", mensagemFormatada);

  if (mensagensCoringa.includes(mensagemFormatada)) {
    return res.json({ reply: respostas["saudacao"] });
  }

  const resposta = respostas[mensagemFormatada] || respostas["erro"];
  res.json({ reply: resposta });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
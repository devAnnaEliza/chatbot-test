const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

let lembretes = []; // Lista de lembretes

// Rota principal do chatbot
app.post("/api/chat", (req, res) => {
  const { message } = req.body;

  if (!message || typeof message !== "string") {
    return res.status(400).json({ reply: "Por favor, envie uma mensagem válida." });
  }

  const mensagemFormatada = message.trim().toLowerCase();

  // Adicionar lembrete com horário
  if (mensagemFormatada.startsWith("adicionar lembrete")) {
    const partes = message.split(":");
    if (partes.length < 2) {
      return res.json({ reply: "Formato inválido. Use: 'Adicionar lembrete: [horário] [mensagem]'" });
    }

    const horario = partes[1].trim();
    const lembrete = partes.slice(2).join(":").trim();

    if (!horario || !lembrete) {
      return res.json({ reply: "Por favor, forneça um horário e uma mensagem para o lembrete." });
    }

    lembretes.push({ horario, mensagem: lembrete });
    return res.json({ reply: `Lembrete adicionado para ${horario}: "${lembrete}"` });
  }

  // Listar lembretes
  if (mensagemFormatada === "listar lembretes") {
    if (lembretes.length === 0) {
      return res.json({ reply: "Você não tem lembretes no momento." });
    }

    const lista = lembretes
      .map((lembrete, index) => `${index + 1}. ${lembrete.horario} - ${lembrete.mensagem}`)
      .join("\n");
    return res.json({ reply: `Seus lembretes:\n${lista}` });
  }

  return res.json({ reply: "Comando não reconhecido. Tente 'Adicionar lembrete' ou 'Listar lembretes'." });
});

// Inicialização do servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
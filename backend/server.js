// Importação das dependências
const express = require("express");
const cors = require("cors");
require("dotenv").config();

// Inicialização do servidor
const app = express();
app.use(express.json());
app.use(cors()); // Permite requisições de origens diferentes (como localhost:3000 para o front-end)

// Simulação de uma fila de atendentes
let atendentes = ["atendente1@example.com", "atendente2@example.com"]; // Lista de atendentes disponíveis

// Configuração das respostas do chatbot
const respostas = {
  "1": "Ótimo! Para fazer um pedido, acesse nosso site ou ligue para (XX) XXXX-XXXX.",
  "2": "Nosso horário de funcionamento é das 8h às 18h, de segunda a sábado.",
  "3": "Nosso endereço é Rua Exemplo, 123, Centro, Cidade/Estado.",
  "saudacao": "Olá! Como posso te ajudar hoje? Você pode escolher uma das opções: 1, 2 ou 3.",
  "erro": "Escolha uma das opções: 1, 2 ou 3.",
  "opcoes": "Escolha uma opção: 1 - Fazer um pedido, 2 - Horário de funcionamento, 3 - Endereço da empresa.",
  "quais_sao_as_opcoes": "Você pode me perguntar sobre: 1 - Pedidos, 2 - Horário de funcionamento, 3 - Endereço. Ou digitar uma pergunta que eu possa responder.",
  "o_que_voce_faz": "Eu sou um assistente virtual! Eu posso te ajudar com pedidos, horário de funcionamento ou localização da nossa empresa.",
  "como_posso_ajudar": "Você pode perguntar sobre nossos serviços, horários, ou nosso endereço.",
  "falar_com_atendente": "Ok, vou transferir você para um atendente humano. Um momento...",
  "erro_atendente": "Desculpe, não há atendentes disponíveis no momento. Tente novamente mais tarde."
};

// Função para notificar o atendente (pode ser via e-mail, Slack, etc.)
function notificarAtendente(usuario) {
  // Simulação de notificação via e-mail ou algum sistema de mensagens
  console.log(`Notificando atendente: ${atendentes[0]} - Usuário quer falar com atendente: ${usuario}`);
  // Aqui você pode colocar código para enviar e-mails, SMS, ou integração com sistemas de atendimento ao cliente.
}

// Rota principal do chatbot
app.post("/api/chat", (req, res) => {
  const { message, usuario } = req.body; // Agora estamos passando o 'usuario' junto com a mensagem
  let resposta;

  if (message.toLowerCase().includes("falar com atendente") || message.toLowerCase().includes("atendente")) {
    resposta = respostas["falar_com_atendente"];
    notificarAtendente(usuario); // Notifica o atendente
  } else {
    // Lógica para outras perguntas do usuário
    resposta = respostas[message] || respostas["erro"];
  }

  // Envia a resposta do chatbot para o front-end
  res.json({ reply: resposta });
});

// Inicializa o servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

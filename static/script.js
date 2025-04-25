function displayMessage(message, sender) {
  const chatBox = document.getElementById("chat-messages");
  const newMessage = document.createElement("div");
  newMessage.classList.add("message", sender); // 'user-message' ou 'bot-message'
  newMessage.textContent = message;
  chatBox.appendChild(newMessage);

  // Rola automaticamente para a última mensagem
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Função para enviar a mensagem do usuário
async function sendMessage() {
  const userInputElement = document.getElementById("user-input");
  const userInput = userInputElement.value.trim();

  if (userInput === "") return; // Não envia mensagens vazias

  // Exibe a mensagem do usuário na interface
  displayMessage(userInput, "user-message");

  // Limpa o campo de entrada
  userInputElement.value = "";

  try {
    // Envia a mensagem para o backend
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: userInput }),
    });

    if (!response.ok) {
      throw new Error("Erro na resposta do servidor");
    }

    const data = await response.json();
    displayMessage(data.reply, "bot-message");
  } catch (error) {
    console.error("Erro ao enviar a mensagem:", error);
    displayMessage("Desculpe, algo deu errado. Tente novamente mais tarde.", "bot-message");
  }
}

// Adiciona eventos ao botão de envio e ao pressionar Enter
document.getElementById("send-button").addEventListener("click", sendMessage);
document.getElementById("user-input").addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    sendMessage();
  }
});
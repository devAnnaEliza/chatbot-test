function displayMessage(message, sender) {
  const chatBox = document.getElementById("chat-messages");
  const newMessage = document.createElement("div");
  newMessage.classList.add("message", sender);

  // Adiciona ícones às mensagens
  if (sender === "user-message") {
    newMessage.innerHTML = `<i class="fas fa-user"></i> ${message}`;
  } else if (sender === "bot-message") {
    // Substitui quebras de linha (\n) por <br> para exibição correta
    const formattedMessage = message.replace(/\n/g, "<br>");
    newMessage.innerHTML = `<i class="fas fa-robot"></i> ${formattedMessage}`;
  }

  chatBox.appendChild(newMessage);
  chatBox.scrollTop = chatBox.scrollHeight;
}

async function sendMessage() {
  const userInputElement = document.getElementById("user-input");
  const userInput = userInputElement.value.trim();

  if (userInput === "") return;

  displayMessage(userInput, "user-message");
  userInputElement.value = "";

  try {
    const response = await fetch("http://localhost:5000/api/chat", {
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

document.getElementById("send-button").addEventListener("click", sendMessage);
document.getElementById("user-input").addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    sendMessage();
  }
});
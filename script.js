document.getElementById("send-btn").addEventListener("click", sendMessage);
document.getElementById("user-input").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    sendMessage();
  }
});

function sendMessage() {
  const userInput = document.getElementById("user-input").value.trim();
  if (userInput === "") return;

  // Exibir a mensagem do usuário
  displayMessage(userInput, "user");

  // Limpar o campo de entrada
  document.getElementById("user-input").value = "";

  // Enviar a mensagem para o servidor
  fetch("http://localhost:5000/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message: userInput }),
  })
    .then(response => response.json())
    .then(data => {
      const botReply = data.reply;
      displayMessage(botReply, "bot");
    })
    .catch(error => {
      console.error("Erro ao enviar a mensagem:", error);
      displayMessage("Desculpe, algo deu errado. Tente novamente mais tarde.", "bot");
    });
}

function displayMessage(message, sender) {
  const messageElement = document.createElement("div");
  messageElement.classList.add("message");
  messageElement.classList.add(sender === "user" ? "user-message" : "bot-message");
  messageElement.textContent = message;

  document.getElementById("chat-box").appendChild(messageElement);

  // Rolagem automática para a última mensagem
  const chatBox = document.getElementById("chat-box");
  chatBox.scrollTop = chatBox.scrollHeight;
}

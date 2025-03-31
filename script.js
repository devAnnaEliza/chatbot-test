function displayMessage(message, sender) {
  const chatBox = document.getElementById("chat-messages");
  const newMessage = document.createElement("div");
  newMessage.classList.add("message", sender); // 'user-message' ou 'bot-message'
  newMessage.textContent = message;
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
    const botReply = await getBotResponse(userInput);

    displayMessage(botReply, "bot-message");
  } catch (error) {
    console.error("Erro ao enviar a mensagem:", error);
    displayMessage("Desculpe, algo deu errado. Tente novamente mais tarde.", "bot-message");
  }
}

async function getBotResponse(userInput) {
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
    return data.reply;
  } catch (error) {
    console.error("Erro ao se comunicar com o backend:", error);
    return "Desculpe, algo deu errado. Tente novamente mais tarde.";
  }
}

document.getElementById("send-button").addEventListener("click", sendMessage);
document.getElementById("user-input").addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    sendMessage();
  }
});
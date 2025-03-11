// Função para exibir as mensagens na interface
function displayMessage(message, sender) {
    const chatBox = document.getElementById("chat-box");
    const newMessage = document.createElement("div");
    newMessage.classList.add(sender); // 'user' ou 'bot'
    newMessage.textContent = message;
    chatBox.appendChild(newMessage);
  
    // Rola a janela para a última mensagem
    chatBox.scrollTop = chatBox.scrollHeight;
  }
  
  // Função para enviar a mensagem para o servidor e receber a resposta
  function sendMessage() {
    const userInput = document.getElementById("user-input").value.trim();
    if (userInput === "") return;
  
    // Exibir a mensagem do usuário na tela
    displayMessage(userInput, "user");
  
    // Limpar o campo de entrada
    document.getElementById("user-input").value = "";
  
    // Enviar a mensagem para o servidor (back-end)
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
        displayMessage(botReply, "bot"); // Exibir a resposta do bot
      })
      .catch(error => {
        console.error("Erro ao enviar a mensagem:", error);
        displayMessage("Desculpe, algo deu errado. Tente novamente mais tarde.", "bot");
      });
  }
  
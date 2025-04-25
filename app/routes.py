from flask import Blueprint, request, jsonify

main = Blueprint("main", __name__)

@main.route("/api/chat", methods=["POST"])
def chat():
    data = request.get_json()
    message = data.get("message", "").lower()
    print(f"Mensagem recebida: {message}")  # Log para depuração

    responses = {
        "olá": "Olá! Como posso te ajudar hoje?",
        "tudo bem?": "Estou bem, obrigado! E você?",
        "qual é o seu nome?": "Eu sou o Intelichat!",
        "adeus": "Até logo! Foi um prazer conversar com você.",
    }

    reply = responses.get(message, "Desculpe, não entendi. Pode reformular?")
    print(f"Resposta enviada: {reply}")  # Log para depuração
    return jsonify({"reply": reply})
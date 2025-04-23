from flask import Blueprint, render_template, request, jsonify

main = Blueprint("main", __name__)

#pág inicial
@main.route("/")
def index():
    return render_template("index.html")

#rota para bot
@main.route("/api/chat", methods=["POST"])
def chat():
    data = request.get_json()
    message = data.get("message", "").lower()

    #respostas
    responses = {
        "olá": "Olá! Como posso ajudar hoje?",
        "tudo bem?": "Sim, estou bem! E você?",
        "qual é o seu nome?": "Meu nome é Intelichat!",
        "tchau": "Até logo! Foi um prazer conversar com você."
    }

    #respostas padrão
    reply = responses.get(message, "Desculpe, não entendi. Pode reformular?")
    return jsonify({"reply": reply})
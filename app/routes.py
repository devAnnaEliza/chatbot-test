from flask import Blueprint, render_template, request, jsonify

main = Blueprint("main", __name__)

#pág inicial
@main.route("/")
def index():
    return render_template("index.html")

#rota para bot

import socket
import threading

def handle_client(conexao, endereco):
    print(f"Conexão estabelecida com {endereco}")
    while True:
        try:
            msg = cliente.recv(1024).decode('utf-8')
            if not msg:
                print(f"Cliente {endereco} desconectado")
                break

            print(f"Mensagem recebida de {endereco}: {msg}")
            
            if msg.lower() == 'sair':
                print(f"Conexão encerrada com {endereco}")
                conexao.send('sair'.encode('utf-8'))
                break
            else:
                resposta = f"Você disse: {msg}"
                conexao.send(resposta.encode('utf-8'))
        except Exception as e:
            print(f"Erro na conexão com {endereco}: {e}")
            break

    conexao.close()

servidor = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
servidor.bind(('localhost', 8888))

servidor.listen(5)
print("Aguardando conexão...")

while True:
    conexao, endereco = servidor.accept()
    thread = threading.Thread(target=handle_client, args=(conexao, endereco))
    thread.start()
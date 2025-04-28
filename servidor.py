import socket

servidor = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
servidor.bind(('localhost', 8888))

servidor.listen(1)
print("Aguardando conexão...")

conexao, endereco = servidor.accept()
print(f"Conexão estabelecida com {endereco}")

terminado = False

print('Chat iniciado!')

while not terminado:
    msg = cliente.recv(1024).decode('utf-8')
    print(f"Mensagem recebida: {msg}")

    if msg == 'sair':
        terminado = True
        conexao.send('sair'.encode('utf-8'))
    else:
        resposta = f"Você disse: {msg}"
        cliente.send(resposta.encode('utf-8'))

conexao.close()
servidor.close()
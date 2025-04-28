import socket

servidor = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
servidor.bind(('localhost', 8888))

servidor.listen(1)

conexao, endereco = servidor.accept()

terminado = False

print('Chat iniciado!')

while not terminado:
    msg = cliente.recv(1024).decode('utf-8')

    if msg == 'sair':
        terminado = True
    else:
        cliente.send(input('Mensagem: ').encode('utf-8'))

conexao.close()
servidor.close()
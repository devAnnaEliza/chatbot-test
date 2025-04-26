import socket

servidor = socket.socket(socket.AF_INET, socket.socket.SOCK_STREAM)
servidor.bind(('localhost', 8888))

servidor.listen()
cliente, end = servidor.accept()

terminado = False

print('Chat iniciado!')

while not terminado:
    msg = cliente.recv(1024).encode('utf-8')

    if msg == 'sair':
        terminado = True
    else:
        cliente.send(input('Mensagem: ').encode('utf-8'))

servidor.close()
cliente.close()
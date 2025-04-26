import socket

cliente = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
cliente.connect(('localhost', 8888))

terminado = False

print('Digite "sair" para encerrar')

while not terminado:
    cliente.send(input('Mensagem:').encode('utf-8'))
    msg = cliente.recv(1024).decode('utf-8')

    if msg == 'sair':
        terminado = True

    else:
        print(msg)

cliente.close()
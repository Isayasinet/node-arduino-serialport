// introducir en terminal npm init --yes
// introducir en terminal npm install serialport
// npm install express
// Instalar socket.io
const express = require('express'); // Importar el módulo express
const socketIo = require('socket.io'); // Importar el módulo socket.io
const http = require('http'); // Importar el módulo http

const app = express(); // Crear una instancia de la aplicación express
const server = http.createServer(app); // Crear un servidor http con la aplicación express
const io = socketIo(server); // Inicializar socket.io con el servidor http

// Configuraciones

// Rutas

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html'); // Enviar archivo index.html
});

// Archivos estáticos

app.use(express.static(__dirname + '/public')); // Servir archivos estáticos desde la carpeta public

const { SerialPort } = require('serialport'); // Importar la clase SerialPort de serialport
const puertoSerial = new SerialPort({ path: 'COM5', baudRate: 9600 }); // Crear una instancia de SerialPort

io.on("connection", (socket) => {
    console.log('Un nuevo cliente se ha conectado'); // Mostrar mensaje en consola al conectar un cliente
});

puertoSerial.on('open', () => {
    console.log('Puerto Serial Abierto'); // Confirmación de conexión
});
puertoSerial.on('data', data => {
    console.log(data.toString()); // Mostrar datos recibidos en consola
    io.emit('arduino:data', { 
        value: data.toString() // Enviar datos a los clientes web
    });
});

server.listen(3000, () => {
    console.log('Servidor corriendo en puerto 3000'); // Mostrar mensaje al iniciar el servidor en el puerto 3000
});


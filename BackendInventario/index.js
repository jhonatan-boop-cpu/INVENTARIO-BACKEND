const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

//Configuración de CORS
app.use(cors());

//Parsear solicitudes JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Sincronizar la base de datos
const db = require('./models');
db.sequelize.sync().then(() => {
    console.log('Base de datos sincronizada');
});

//Importar rutas
require('./routes')(app);

//Inicializar el servidor
app.listen(3000, function () {
    console.log(`Servidor corriendo en el puerto 3000`);
});
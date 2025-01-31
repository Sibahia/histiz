const express = require('express');
const cors = require('cors');

const app = express();

const { sqlORM } = require('./database.js');
const { Dates } = require('../model/dates.js');
const { validateUser, valideUserType, valideType } = require('../model/validateUser.js');

const patientsRoute = require('../routes/patients.js');

let CORS_OPTION = {
    'origin': '*',
    'methods': ['GET', 'POST', 'DELETE']
};

const port = '5500';

app.use(cors(CORS_OPTION));
app.use(express.json());

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});

app.use('/api/users/patients', patientsRoute);


const User = new sqlORM('./database/historiales.db');

const UsersSchema = {
    cedula: 'INTEGER PRIMARY KEY',
    primerNombre: 'TEXT NOT NULL',
    segundoNombre: 'TEXT NOT NULL',
    primerApellido: 'TEXT NOT NULL',
    segundoApellido: 'TEXT NOT NULL',
    fecha_nacimiento: 'TEXT NOT NULL',
    edad: 'INTEGER',
    direccion:'TEXT NOT NULL',
    email: 'TEXT NOT NULL',
    enfermedades: 'TEXT NOT NULL',
    fecha_creacion: 'TEXT NOT NULL'
};

User.define('pacientes', UsersSchema);

app.get('/', (req, res) => {
    res.status(200).send(JSON.stringify('Servers on'));
});
const express = require('express');
const router = express.Router();

const { sqlORM } = require('../src/database.js');
const { Dates } = require('../model/dates.js');
const { validateUser, valideUserType, valideType } = require('../model/validateUser.js');

const User = new sqlORM('./database/historiales.db');

router.get('/', (req, res) => {
    let limit = req.query.limit;

    try {
        if (limit !== undefined) {
            valideUserType('limit', limit);
            limit = parseInt(limit);
        };

        if (limit) {
            User.findAll('pacientes', { limit: limit })
            .then(patients => res.status(200).send(JSON.stringify(patients)))
            .catch(error => res.status(404).send(JSON.stringify(error.message)));
        } else {
            User.getAll('pacientes')
            .then(data => res.status(200).send(JSON.stringify(data)))
            .catch(error => res.status(404).send(JSON.stringify(error.message)));
        };
    } catch (error) {
        res.status(400).send(JSON.stringify(error.parse()));
    };
});

router.post('/', (req, res) => {
    const { cedula, primerNombre, segundoNombre, primerApellido, segundoApellido, fecha_nacimiento, edad, direccion, email, enfermedades } = req.body;

    const newUser = new Dates({
        cedula: cedula,
        primerNombre: primerNombre,
        segundoNombre: segundoNombre,
        primerApellido: primerApellido,
        segundoApellido: segundoApellido,
        fecha_nacimiento: fecha_nacimiento,
        edad: edad,
        direccion: direccion,
        email: email,
        enfermedades: enfermedades
    })

    try {
        validateUser(newUser);
        res.status(201).send(JSON.stringify('informacion guardada'));
    } catch (error) {
        res.status(400).send(JSON.stringify(error.parse()));
    };
});

router.get('/:type/:value', (req, res) => {
    try {
        valideType(req.params.type, req.params.value);

        const typeData = new Object();
        typeData[`${req.params.type}`] = parseInt(req.params.value);
        console.log(typeData)

        User.find('pacientes', typeData)
        .then(data => res.status(200).send(JSON.stringify(data)))
        .catch(error => res.status(404).send(JSON.stringify(error.message)));
    } catch (error) {
        res.status(400).send(JSON.stringify(error.parse()));
    };
});

router.get('/count', (req, res) => {
    User.findCount('pacientes')
    .then(data => res.status(201).send(JSON.stringify(data[0])))
    .catch(error => res.status(404).send(JSON.stringify(error.message)));
});

module.exports = router;
const { Validation, ConnectionError } = require('./typesError.js');
const { formatDate } = require('./dates.js');
const { sqlORM } = require('../src/database.js');

const User = new sqlORM('./database/historiales.db');

const validateUser = ({ cedula, primerNombre, segundoNombre, primerApellido, segundoApellido, fecha_nacimiento, edad, direccion, email, enfermedades } = {}) => {
    if (!cedula) throw new Validation('cedula es requerida');
    if (!primerNombre || !segundoNombre) throw new Validation('nombres requerido');
    if (!primerApellido || !segundoApellido) throw new Validation('apellidos es requerido');
    if (!fecha_nacimiento) throw new Validation('fecha nacimiento es requerido');
    if (!edad) throw new Validation('edad es requerida');
    if (!direccion) throw new Validation('direccion es requerido');
    if (!email) throw new Validation('email es requerido');
    if (!enfermedades) throw new Validation('enfermedades es requerida');

    if (cedula < 4) throw new Validation('cedula debe tener mínimo 4 digitos');
    if (primerNombre.length < 3 || segundoNombre.length < 3) throw new Validation('el nombre debe tener minimo 3 digitos');
    if (primerApellido.length < 3 || segundoApellido.length < 3) throw new Validation('el apellido debe tener minimo 3 digitos');
    
    const date = new Date();
    const registro = formatDate(date);

    try {
        User.insert('pacientes', {
            cedula: cedula,
            primerNombre: primerNombre,
            segundoNombre: segundoNombre,
            primerApellido: primerApellido,
            segundoApellido: segundoApellido,
            fecha_nacimiento: fecha_nacimiento,
            edad: edad,
            direccion: direccion,
            email: email,
            enfermedades: enfermedades,
            fecha_creacion: registro
        });

    } catch (error) {
        throw new ConnectionError('error de conexion en la database');
    };
};

const valideUserType = (type, value) => {
    if (type === 'limit') {
        if (isNaN(value)) {
            throw new Validation('no es un limite');
        }
    } else {
        throw new Validation('este tipo no tiene soporte');
    }
};

const valideType = (type, value) => {
    let cedula = type == 'cedula';
    let nombre = type == 'nombre';

    if (cedula && isNaN(value) || nombre && !isNaN(value)) {
        let data = cedula ? 'cedula' : 'nombre';
        throw new Validation(`no es ${data}`);
    };
};

module.exports = { validateUser, valideUserType, valideType }
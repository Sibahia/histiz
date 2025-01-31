class Dates {
    // constructor (cedula, primerNombre, segundoNombre, primerApellido, segundoApellido, fecha_nacimiento, edad, direccion, email, enfermedades) {
    constructor(obj) {
        this.cedula = obj.cedula;
        this.primerNombre = obj.primerNombre;
        this.segundoNombre = obj.segundoNombre;
        this.primerApellido = obj.primerApellido;
        this.segundoApellido = obj.segundoApellido;
        this.fecha_nacimiento = obj.fecha_nacimiento;
        this.edad = obj.edad;
        this.direccion = obj.direccion;
        this.email = obj.email;
        this.enfermedades = obj.enfermedades;
    }
}

function formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses empiezan desde 0
    const year = String(date.getFullYear()).slice(-2);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}

module.exports = { Dates, formatDate }
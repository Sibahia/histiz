const sqlite3 = require('sqlite3').verbose();

class sqlORM {
    constructor (dbFileName) {
        this.db = new sqlite3.Database(dbFileName, (error) => {
            if (error) { console.log('Error de conexión: ', error.message) };
        });
    };

    define(tableName, params) {
        const columns = Object.keys(params).map(key => {
            return `${key} ${params[key]}`;
        }).join(', ');

        const sql = `CREATE TABLE IF NOT EXISTS ${tableName} (${columns})`;

        this.db.run(sql, (error) => {
            if (error) { console.log('Error definiendo tabla: ', error.message) };
        });
    };

    insert(tableName, params) {
        const columns = Object.keys(params).join(', ');
        const placeholders = Object.keys(params).map(() => '?').join(', ');
        const values = Object.values(params);

        const sql = `INSERT INTO ${tableName} (${columns}) VALUES (${placeholders})`;
        
        this.db.run(sql, values, (error) => {
            if (error) { console.log('Error insertando datos: ', error.message) };
        });
    };

    find(tableName, params) {
        const columns = Object.keys(params).map(key => `${key} = ?`).join(' AND ');
        const values = Object.values(params);

        const sql = `SELECT * FROM ${tableName} WHERE ${columns}`;

        return new Promise((resolve, reject) => {
            if (!params) return reject('No hay datos')

            this.db.get(sql, values, (error, row) => {
                if (row == 0) return reject('No existe');
                if (!row) return reject('No existe');

                if (error) {
                    reject('Error obteniendo los datos: ' + error.message);
                } else {
                    resolve(row)
                };
            });
        });
    };

    findAll (tableName, params) {
        const columns = Object.keys(params).join(' ');
        const values = Object.values(params);

        const sql = `SELECT * FROM ${tableName} ${columns} ${values}`;

        return new Promise((resolve, reject) => {
            this.db.all(sql, (error, rows) => {
                if (error) {
                    reject('Error obteniendo los datos limitado: ' + error.message);
                } else {
                    resolve(rows);
                };
            });
        });
    };

    findCount (tableName) {

        const sql = `SELECT count( ) AS count FROM ${tableName}`;

        return new Promise((resolve, reject) => {
            this.db.all(sql, (error, row) => {
                if (error) {
                    reject('Error obteniendo la cantidad de registros: ' + error.message);
                } else {
                    resolve(row);
                };
            });
        });
    };

    getAll(tableName) {
        const sql = `SELECT * FROM ${tableName}`;

        return new Promise((resolve, reject) => {
            this.db.all(sql, (error, rows) => {
                if (error) {
                    reject('Error obteniendo todos los datos: ' + error.message);
                } else {
                    resolve(rows);
                };
            });
        });
    };

};

module.exports = { sqlORM };
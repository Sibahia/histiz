class Validation extends Error {
    constructor (message) {
        super(message)
        this.name = 'Validation'
        this.message = message
    }

    parse() {
        return { validation: this.message };
    }

}

class ConnectionError extends Error {
    constructor (message) {
        super(message)
        this.name = 'ConnectionError'
        this.message = message
    }

    parse() {
        return { connectionError: this.message };
    }
}

module.exports = { Validation, ConnectionError }
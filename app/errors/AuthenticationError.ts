class AuthenticationError extends Error {
    statusCode: number;
    constructor(message: string) {
        super(message);
        this.name = this.constructor.name;
        this.statusCode = 400;

        Error.captureStackTrace(this, this.constructor)
    }
}

export { AuthenticationError }
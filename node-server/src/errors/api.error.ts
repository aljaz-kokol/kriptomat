import {StatusCode} from '../utils/status.util';

export class APIError implements Error {
    public name: string;
    public message: string;
    public statusCode: number;
    public data?: any[]

    constructor(name: string, message: string, statusCode: number = StatusCode.SERVER_ERROR, data?: any[]) {
        this.name = name;
        this.message = message
        this.data = data
        this.statusCode = statusCode;
    }

    public static fromError(error: Error): APIError {
        return new APIError(error.name, error.message)
    }

}

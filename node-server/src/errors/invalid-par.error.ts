import { APIError } from './api.error';
import { StatusCode } from '../utils/status.util';

export class InvalidParameterError extends APIError {
    constructor( message: string, data?: any[]) {
        super('Invalid Parameter error', message, StatusCode.BAD_RREQUEST, data);
    }
}

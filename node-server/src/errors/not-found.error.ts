import {APIError} from './api.error';
import {StatusCode} from '../utils/status.util';

export class NotFoundError extends APIError {
    constructor(message: string, data?: any[]) {
        super('Resource Not Found Error', message, StatusCode.NOT_FOUND, data);
    }
}

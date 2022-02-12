import {APIError} from "./api.error";
import {StatusCode} from "../utils/status.util";

export class AlreadyExistsError extends APIError {
    constructor(message: string, data?: any) {
        super('Document already exists error', message, StatusCode.CONFLIST, data);
    }
}

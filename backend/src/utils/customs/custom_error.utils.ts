export class CustomError extends Error {
    statusCode: number | undefined;
    href: string;
    constructor( message: string, href: string, statusCode?: number) {
        super(message);
        this.statusCode = statusCode;
        this.href = href;
    }
}


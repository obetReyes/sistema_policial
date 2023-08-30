import { Response, Request, NextFunction } from "express";


export const tryCatch =
    (controller: (res: Request, Res: Response) => unknown) =>
        async (req: Request, res: Response, next: NextFunction) => {
            try {
                await controller(req, res);
            } catch (error) {
                return next(error);
            }
};


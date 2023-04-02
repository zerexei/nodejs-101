
import express, { Express, Request, Response } from 'express';

const app: Express = express();

app.post('/api/admins', (req: Request, res: Response) => {
    try {
        res.json({
            message: "Admin successfuly created."
        })
    } catch (error: unknown) {
        res.json({
            error: error.message
        })
    }

});

export default app;
import  express from 'express';
import { json } from 'body-parser';
import * as mysql2 from 'mysql2';


async function bootstrap() {
    let db = await mysql2.createConnection({
        host: 'localhost',
        user: 'oncovid',
        database: 'oncovid',
        password: 'dk82lcxIEw91cL',
    });

    const app = express();

    app.use('*', async (req, res, next) => {
        const start = new Date();
        res.once('finish', () => {
            const end = new Date();
            const time = end.getTime() - start.getTime();
            // TODO Figure out why path is showing wrong
        console.log(`[${new Date().toISOString()}] Got request for ${req.method} ${req.path} ${time}ms`);
        });
        next();
    });

    app.use('*', json());

    app.use('*', async (_req, _res, next) => {
        next();
        // TODO auth
    });

    app.post('/api/phu/:phuId/eligibility', async (req, res) => {
        try {
            console.log([req.params.phuId, JSON.stringify(req.body), '', new Date()]);
        await db.execute(
            'INSERT INTO eligibility (phuId, data, createdBy, lastUpdated) VALUES (?, ?, ?, ?)',
            [req.params.phuId, JSON.stringify(req.body), '', new Date()],
        );
        res.send({ });
        }
        catch (error) {
            console.log('Error while adding eligibility', error);
            res.status(500).send();
        }
    });

    app.listen(9999);
}

bootstrap();


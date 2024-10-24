import express, { Request, Response, NextFunction } from 'express';
import connectDB from './config/database';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(express.json());

app.use(cors());

app.get('/', (req, res) => {
    res.send('API Running');
})

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


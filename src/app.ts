import express, { Request, Response, NextFunction } from 'express';
import { wordleSolution } from './wordle';


const app = express();
const port = 5000;


const getLocationsWithTimezones = (request: Request, response: Response, next: NextFunction) => {
    const data = {
        "solution": wordleSolution()
    }

    response.status(200).json(data);
};

app.get('/wordle/solution', getLocationsWithTimezones);

app.listen(port, () => {
    console.log(`application is running on port ${port}.`);
});
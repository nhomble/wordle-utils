import express, { Request, Response, NextFunction } from 'express';
import { wordleSolution } from './wordle';


const app = express();
app.use(express.json());

const port = process.env.PORT || 8080;


const routeSolution = (request: Request, response: Response, next: NextFunction) => {
    const data = {
        "solution": wordleSolution()
    }

    response.status(200).json(data);
};

const routeMessage = (request: Request, response: Response, next: NextFunction) => {
    console.log(request.body);

    response.status(200).json({});
};

app.get('/wordle/solution', routeSolution);
app.post('/groupme/message', routeMessage);

app.listen(port, () => {
    console.log(`application is running on port ${port}.`);
});
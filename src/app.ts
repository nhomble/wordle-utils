import express, { Request, Response, NextFunction } from 'express';
import { wordleTest, fonts, wordleSolution } from './wordle';
import { groupCollapsed } from 'console';
import axios from 'axios';

const app = express();
app.use(express.json());

const port = process.env.PORT || 8080;
const groupmeToken = process.env.G_TOKEN;
const groupmeBot = process.env.G_ID;

const routeSolution = (request: Request, response: Response, next: NextFunction) => {
    const data = {
        "solution": wordleSolution()
    }

    response.status(200).json(data);
};

const chatMessage = function (message: string) {
    const res = axios.post('hhttps://api.groupme.com/v3/bots/post', { text: message, bot_id: groupmeBot }, {
        headers: {
            // 'application/json' is the modern content-type for JSON, but some
            // older servers may use 'text/json'.
            // See: http://bit.ly/text-json
            'Authorization': groupmeToken
        }
    });
}

const routeMessage = (request: Request, response: Response, next: NextFunction) => {
    const message = request.body.text;
    const author = request.body.name;
    const parts = message.split(" ");

    if (parts[0] === "/wordle") {
        const guess = parts[1];
        const solution = wordleTest(guess);

        const output = [fonts.miss, fonts.miss, fonts.miss, fonts.miss, fonts.miss];
        for (var i = 0; i < solution.correct.length; i++) {
            output[solution.correct[i]] = fonts.correct;
        }
        for (var i = 0; i < solution.reorder.length; i++) {
            output[solution.reorder[i]] = fonts.reorder;
        }
        const res = guess + "\n" + output.join("");
        chatMessage(res);
        console.log(res);
    }
    response.status(200).json({});
};

app.get('/wordle/solution', routeSolution);
app.post('/groupme/message', routeMessage);

app.listen(port, () => {
    console.log(`application is running on port ${port}.`);
});
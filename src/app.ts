import express, { Request, Response, NextFunction } from "express";
import { wordleTest, fonts, wordleSolution, isValidGuess } from "./wordle";
import { groupCollapsed } from "console";
import axios from "axios";

const app = express();
app.use(express.json());

const port = process.env.PORT || 8080;
const groupmeToken = process.env.G_TOKEN;
const groupmeBot = process.env.G_ID;

const routeSolution = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const data = {
    solution: wordleSolution(),
  };

  response.status(200).json(data);
};

const chatMessage = (message: string) => {
  const res = axios.post(
    "https://api.groupme.com/v3/bots/post",
    { text: message, bot_id: groupmeBot },
    {
      headers: {
        // 'application/json' is the modern content-type for JSON, but some
        // older servers may use 'text/json'.
        // See: http://bit.ly/text-json
        Authorization: groupmeToken,
      },
    }
  );
};

const routeMessage = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { text: message, name: author } = request.body;
  const [command, maybeGuess = ''] = message.split(" ")

  if (command === "/wordle" && maybeGuess) {
    const guess = maybeGuess.toLowerCase();
    const { correct, reorder } = wordleTest(guess);

    const output = [fonts.miss, fonts.miss, fonts.miss, fonts.miss, fonts.miss];
    for (var i = 0; i < correct.length; i++) {
      output[correct[i]] = fonts.correct;
    }
    for (var i = 0; i < reorder.length; i++) {
      output[reorder[i]] = fonts.reorder;
    }
    var res = guess + "\n" + output.join("");

    // because of tyler
    if (!isValidGuess(guess)) {
      res = "Hey " + author + " learn the rules. " + guess + " is not valid!";
    }

    chatMessage(res);
    console.log(res);
  }
  response.status(200).json({});
};

app.get("/wordle/solution", routeSolution);
app.post("/groupme/message", routeMessage);

app.listen(port, () => {
  console.log(`application is running on port ${port}.`);
});

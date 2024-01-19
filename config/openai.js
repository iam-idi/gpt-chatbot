import { Configuration, OpenAIApi} from "openai";
import dotenv from "dotenv";
dotenv.config();

const configuration = new Configuration({
    apiKey: process.env.OPENAI-API-KEY,
})

const openai = new OpenAIApi(configuration);

export default openai; 
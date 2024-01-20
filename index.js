import openai from "./config/openai.js";
import colors from "colors";
import readlineSync from "readline-sync";

const chatHistory = []; //stores chat history

async function main(){

    console.log(colors.bold.green('Welcome to the chatbot program'));
    console.log(colors.bold.green('You can now start chatting with the bot.'));

    while (true){
        const userInput = readlineSync.question(colors.blue('\nYOU: '));
        console.log(colors.yellow('GPT-BOT: '))
        let botResponse = ""; //stores bot response

        try {

            const messages = chatHistory.map(([role, content]) => ({
                role,
                content,
            }));
            
            //add latest user input to messages
            messages.push({role: 'user', content: userInput});

            //call the api with user input
            const response = await openai.chat.completions.create({
                model: 'gpt-3.5-turbo',
                messages: messages,
                stream: true
            })
            //exiting process
            if(userInput.toLowerCase() == 'exit'){
                for await(let part of response){
                    process.stdout.write(part.choices[0].delta.content || '')
                }
                return
            }
            //logging bot's response
            for await(let part of response){
                process.stdout.write(part.choices[0].delta.content || '')
                //saving bot response
                botResponse += part.choices[0].delta.content || '';
            }

            //add user and gpt response to chatHistory
            chatHistory.push(['user', userInput]);
            chatHistory.push(['assistant', botResponse]);
            // "\n"+console.log("messages: " + JSON.stringify(messages));

        } catch (error) {
            console.error(colors.red(error))
        }
    }

}

main();
import { Mistral } from '@mistralai/mistralai';

const apiKey = process.env.MISTRAL_API_KEY;

const client = new Mistral({apiKey: apiKey});


const prompt = {
    "Correcteur": "Corrigez la grammaire et la syntaxe de la phrase suivante sans ajouter de commentaire: ",
    "Traducteur": "Traduit la phrase suivante en anglais: ",
    "Résumeur": "Résume la phrase suivante: ",
    "Rédacteur": "Rédige une phrase à partir de ce qui est demandé: ",
};


async function main() {
    let isRunning: boolean = true;

    while (isRunning) {

        console.log("Choisissez une option: ");
        console.log("1. Correcteur");
        console.log("2. Traducteur");
        console.log("3. Résumeur");
        console.log("4. Rédacteur");

        const promptChoice: string | null = prompt("Choix: ");
        if (promptChoice === "1") {
            const userInput: string | null = prompt("Entrez une phrase: ");
            if (userInput === "exit" || userInput === null) {
                isRunning = false;
                break;
            }
            chat(userInput, prompt.Correcteur);
        }
        else if (promptChoice === "2") {
            const userInput: string | null = prompt("Entrez une phrase: ");
            if (userInput === "exit" || userInput === null) {
                isRunning = false;
                break;
            }
            chat(userInput, prompt.Traducteur);
        }
        else if (promptChoice === "3") {
            const userInput: string | null = prompt("Entrez une phrase: ");
            if (userInput === "exit" || userInput === null) {
                isRunning = false;
                break;
            }
            chat(userInput, prompt.Résumeur);
        }
        else if (promptChoice === "4") {
            const userInput: string | null = prompt("Entrez une phrase: ");
            if (userInput === "exit" || userInput === null) {
                isRunning = false;
                break;
            }
            chat(userInput, prompt.Rédacteur);
        } else {
            break;
        }
        
        
        

        // const userInput: string | null = prompt("Enter a message: ");
        // if (userInput === "exit" || userInput === null) {
        //     isRunning = false;
        //     break;
        // }
        
        // chat(userInput, "You are a helpful assistant.");
    }   
    
}

async function chat(userInput: string, prompt: string) {
    const chatResponse = await client.chat.complete({
    model: 'open-mistral-nemo',
    messages: [{role: 'user', content: userInput}],
    });

    if (chatResponse.choices) {
    console.log('Chat:', chatResponse.choices[0].message.content);
    } else {
    console.error('No choices found in chat response');
    }
}


main();
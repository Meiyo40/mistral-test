import { Mistral } from '@mistralai/mistralai';
import promptSync from 'prompt-sync';

const apiKey = process.env.MISTRAL_API_KEY;
const client = new Mistral({ apiKey: apiKey });

const prompt = {
    "Correcteur": "Corrigez la grammaire et la syntaxe de la phrase suivante sans ajouter de commentaire: ",
    "Traducteur": "Traduit la phrase suivante en anglais: ",
    "Résumeur": "Résume la phrase suivante: ",
    "Rédacteur": "Rédige une phrase à partir de ce qui est demandé: ",
};

async function main() {
    const promptInput = promptSync();  // Initialize prompt-sync for input
    let isRunning: boolean = true;

    while (isRunning) {
        console.log("Choisissez une option: ");
        console.log("1. Correcteur");
        console.log("2. Traducteur");
        console.log("3. Résumeur");
        console.log("4. Rédacteur");
        console.log("Tapez 'exit' pour quitter.");

        const promptChoice = promptInput("Choix: ");

        if (promptChoice === "exit") {
            isRunning = false;
            break;
        }

        const userInput = promptInput("Entrez une phrase: ");

        if (userInput === "exit" || userInput === null) {
            isRunning = false;
            break;
        }

        switch (promptChoice) {
            case "1":
                await chat(userInput, prompt.Correcteur);
                break;
            case "2":
                await chat(userInput, prompt.Traducteur);
                break;
            case "3":
                await chat(userInput, prompt.Résumeur);
                break;
            case "4":
                await chat(userInput, prompt.Rédacteur);
                break;
            default:
                console.log("Option non valide. Veuillez réessayer.");
                break;
        }
    }
}

async function chat(userInput: string, promptType: string) {
    try {
        const chatResponse = await client.chat.complete({
            model: 'open-mistral-nemo',
            messages: [{ role: 'user', content: `${promptType}${userInput}` }],
        });

        if (chatResponse.choices && chatResponse.choices.length > 0) {
            console.log('Chat:', chatResponse.choices[0].message.content);
        } else {
            console.error('No choices found in chat response');
        }
    } catch (error) {
        console.error('Error in chat:', error);
    }
}

main();

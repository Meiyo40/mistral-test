import { Mistral } from '@mistralai/mistralai';

const apiKey = process.env.MISTRAL_API_KEY;
const client = new Mistral({ apiKey: apiKey });

const prompt = {
    "Correcteur": "Corrigez la grammaire et la syntaxe de la phrase suivante sans ajouter de commentaire: ",
    "Traducteur": "Traduit la phrase suivante en anglais: ",
    "Résumeur": "Résume la phrase suivante: ",
    "Rédacteur": "Rédige une phrase à partir de ce qui est demandé: ",
};

async function main() {
    let isRunning = true;

    process.stdin.setEncoding('utf-8');

    while (isRunning) {
        console.log("\nChoisissez une option: ");
        console.log("1. Correcteur");
        console.log("2. Traducteur");
        console.log("3. Résumeur");
        console.log("4. Rédacteur");
        console.log("Tapez 'exit' pour quitter.");

        const promptChoice = await getUserInput("Choix: ");
        if (promptChoice === "exit") {
            isRunning = false;
            break;
        }

        const userInput = await getUserInput("Entrez une phrase:");
        if (userInput === "exit" || userInput === null || userInput === undefined) {
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
    process.stdin.end();
}

async function getUserInput(query: string) {
    console.log(query);
    return new Promise((resolve) => {
        process.stdin.once('data', (data) => resolve(data.toString().trim()));
    });
}

async function chat(userInput: string, promptType: string   ) {
    try {
        console.log(`Calling mistral with PROMPT:${promptType}\n CONTENT:${userInput}`);
        const chatResponse = await client.chat.complete({
            model: 'open-mistral-nemo',
            messages: [{ role: 'user', content: `${promptType}${userInput}` }],
        });

        if (chatResponse.choices && chatResponse.choices.length > 0) {
            console.log(`Réponse:\n${chatResponse.choices[0].message.content}\n`);
        } else {
            console.error('No choices found in chat response');
        }
    } catch (error) {
        console.error('Error in chat:', error);
    }
}

main();

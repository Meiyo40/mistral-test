import { Mistral } from '@mistralai/mistralai';

const apiKey = process.env.MISTRAL_API_KEY;
const client = new Mistral({ apiKey: apiKey });

export const Prompt = {
    SPELL_CHECK_FR: "Corrigez la grammaire et la syntaxe de la phrase suivante sans ajouter de commentaire: ",
    TRANSLATE_TO_EN: "Traduit la phrase suivante en anglais: ",
    TRANSLATE_TO: `Traduit la phrase suivante en `,
    SUMMERIZER: "Résume le texte suivante, en étant concis: ",
    RANDOM_QUOTE: "Donne moi une citation ou une expression française au hasard sans autre commentaire.",
} as const;

type Prompt = typeof Prompt;
export async function callWithPrompt(userInput: string, prompt: Prompt   ) {
    try {
        console.log(`Calling mistral with PROMPT:${prompt}\n CONTENT:${userInput}`);
        const chatResponse = await client.chat.complete({
            model: 'open-mistral-nemo',
            messages: [{ role: 'user', content: `${prompt}${userInput}` }],
        });

        if (chatResponse.choices && chatResponse.choices.length > 0) {
            return chatResponse.choices[0].message.content;
        } else {
            console.error('No choices found in chat response');
        }


        /*
        console.log(`Calling mistral with PROMPT:${promptType}\n CONTENT:${userInput}`);
        const chatResponse = await client.chat.complete({
            model: 'open-mistral-nemo',
            messages: [{ role: 'user', content: `${promptType}${userInput}` }],
        });

        if (chatResponse.choices && chatResponse.choices.length > 0) {
            return chatResponse.choices[0].message.content;
        } else {
            console.error('No choices found in chat response');
        }
         */
    } catch (error) {
        console.error('Error in chat:', error);
    }

    return "";
}

export async function callWithCustomPrompt(userInput: string, prompt: string   ) {
    try {
        console.log(`Calling mistral with PROMPT:${prompt}\n CONTENT:${userInput}`);
        const chatResponse = await client.chat.complete({
            model: 'open-mistral-nemo',
            messages: [{ role: 'user', content: `${prompt}${userInput}` }],
        });

        if (chatResponse.choices && chatResponse.choices.length > 0) {
            return chatResponse.choices[0].message.content;
        } else {
            console.error('No choices found in chat response');
        }
    } catch (error) {
        console.error('Error in chat:', error);
    }

    return "";
}
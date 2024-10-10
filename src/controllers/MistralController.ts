import {callWithCustomPrompt, Prompt} from "../services/MistralService.ts";

async function TranslateText(text: string, targetLanguage: string) {
    return await callWithCustomPrompt(text, `${Prompt.TRANSLATE_TO}${targetLanguage}: `);
}

async function TranslateToEnglish(text: string) {
    return await callWithCustomPrompt(text, Prompt.TRANSLATE_TO_EN);
}

async function SummarizeText(text: string) {
    return await callWithCustomPrompt(text, Prompt.SUMMERIZER);
}

async function CorrectText(text: string) {
    return await callWithCustomPrompt(text, Prompt.SPELL_CHECK_FR);
}

/**
 * Get a random quote from the model
 * @constructor
 */
async function RandomQuote() {
    return await callWithCustomPrompt("", Prompt.RANDOM_QUOTE);
}

export {TranslateText, SummarizeText, CorrectText, TranslateToEnglish, RandomQuote};
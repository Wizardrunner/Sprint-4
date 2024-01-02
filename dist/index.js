"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const apiUrl = 'https://icanhazdadjoke.com/';
let isFirstJoke = true; // Flag to track if it's the first joke
const fetchJoke = () => __awaiter(void 0, void 0, void 0, function* () {
    const headers = new Headers({
        'Accept': 'application/json',
    });
    const response = yield fetch(apiUrl, { headers });
    const jokeData = yield response.json();
    // Ensure the request was successful
    if (jokeData.status === 200) {
        return {
            id: jokeData.id,
            joke: jokeData.joke,
            status: jokeData.status,
        };
    }
    else {
        throw new Error(`Failed to fetch joke. Status: ${jokeData.status}`);
    }
});
document.addEventListener('DOMContentLoaded', () => __awaiter(void 0, void 0, void 0, function* () {
    const getJokeButton = document.getElementById('getJokeButton');
    const jokeContainer = document.getElementById('jokeContainer');
    if (getJokeButton && jokeContainer) {
        try {
            const joke = yield fetchJoke();
            jokeContainer.textContent = joke.joke;
            console.log(joke.joke);
            // Change button text on startup
            getJokeButton.textContent = 'Next Joke';
        }
        catch (error) {
            console.error('Error fetching joke:', error.message);
        }
        getJokeButton.addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const joke = yield fetchJoke();
                // Display the joke on the screen
                jokeContainer.textContent = joke.joke;
                // Log the joke to the console
                console.log(joke.joke);
            }
            catch (error) {
                console.error('Error fetching joke:', error.message);
            }
        }));
    }
}));

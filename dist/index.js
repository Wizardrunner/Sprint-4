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
const reportAcudits = [];
const updateJokeReport = (joke, score) => {
    const date = new Date().toISOString();
    const jokeReport = { joke, score, date };
    reportAcudits.push(jokeReport);
    console.log('Joke Report Updated:', jokeReport);
};
document.addEventListener('DOMContentLoaded', () => __awaiter(void 0, void 0, void 0, function* () {
    const getJokeButton = document.getElementById('getJokeButton');
    const jokeContainer = document.getElementById('jokeContainer');
    const jokeContent = document.getElementById('jokeContent');
    const scoreButtons = document.querySelectorAll('.score-button');
    if (getJokeButton && jokeContainer && jokeContent && scoreButtons) {
        try {
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
            const fetchAndDisplayJoke = () => __awaiter(void 0, void 0, void 0, function* () {
                const joke = yield fetchJoke();
                jokeContent.textContent = joke.joke;
                // Enable score buttons
                scoreButtons.forEach((button) => {
                    button.removeAttribute('disabled');
                });
                // Reset previous scores
                scoreButtons.forEach((button) => {
                    button.classList.remove('selected');
                });
            });
            yield fetchAndDisplayJoke();
            getJokeButton.addEventListener('click', fetchAndDisplayJoke);
            scoreButtons.forEach((button) => {
                button.addEventListener('click', (event) => {
                    var _a;
                    const selectedScore = parseInt(event.target.value, 10);
                    // Mark the selected button
                    scoreButtons.forEach((btn) => {
                        btn.classList.remove('selected');
                    });
                    event.target.classList.add('selected');
                    // Update the joke report
                    updateJokeReport((_a = jokeContent === null || jokeContent === void 0 ? void 0 : jokeContent.textContent) !== null && _a !== void 0 ? _a : '', selectedScore);
                });
            });
        }
        catch (error) {
            console.error('Error fetching joke:', error.message);
        }
    }
}));

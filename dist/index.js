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
const dadJokeApiUrl = 'https://icanhazdadjoke.com/';
const chuckNorrisApiUrl = 'https://api.chucknorris.io/jokes/random';
const reportAcudits = [];
let isFirstJoke = true;
const updateJokeReport = (joke, score) => {
    const date = new Date().toISOString();
    const jokeReport = { joke, score, date };
    reportAcudits.push(jokeReport);
    console.log('Joke Report Updated:', jokeReport);
};
const fetchJoke = (apiUrl) => __awaiter(void 0, void 0, void 0, function* () {
    const headers = new Headers({
        'Accept': 'application/json',
    });
    try {
        const response = yield fetch(apiUrl, { headers });
        if (response.ok) {
            const jokeData = yield response.json();
            return {
                id: jokeData.id,
                joke: jokeData.joke || jokeData.value || '', // Ensure we have a default value
                status: jokeData.status,
            };
        }
        else {
            throw new Error(`Failed to fetch joke. Status: ${response.status}`);
        }
    }
    catch (error) {
        console.error('Error fetching joke:', error.message);
        throw new Error('Failed to fetch joke. Check your network connection.');
    }
});
const fetchAndDisplayJoke = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const jokeApiUrl = isFirstJoke ? dadJokeApiUrl : chuckNorrisApiUrl;
        const joke = yield fetchJoke(jokeApiUrl);
        if (joke.status === 200 || joke.status === undefined) {
            const jokeContent = document.getElementById('jokeContent');
            if (jokeContent) {
                jokeContent.textContent = joke.joke;
            }
            // Enable score buttons
            const scoreButtons = document.querySelectorAll('.score-button');
            scoreButtons.forEach((button) => {
                button.removeAttribute('disabled');
            });
            // Reset previous scores
            scoreButtons.forEach((button) => {
                button.classList.remove('selected');
            });
            // Toggle between dad jokes and Chuck Norris jokes
            isFirstJoke = !isFirstJoke;
        }
        else {
            throw new Error(`Failed to fetch joke. Status: ${joke.status}`);
        }
    }
    catch (error) {
        console.error('Error fetching and displaying joke:', error.message);
    }
});
document.addEventListener('DOMContentLoaded', () => __awaiter(void 0, void 0, void 0, function* () {
    const getJokeButton = document.getElementById('getJokeButton');
    const jokeContent = document.getElementById('jokeContent');
    const scoreButtons = document.querySelectorAll('.score-button');
    if (getJokeButton && jokeContent && scoreButtons) {
        const handleScoreButtonClick = (selectedScore) => {
            var _a;
            // Log the selected score to the console
            console.log('Selected Score:', selectedScore);
            // Update the joke report
            updateJokeReport((_a = jokeContent === null || jokeContent === void 0 ? void 0 : jokeContent.textContent) !== null && _a !== void 0 ? _a : '', selectedScore);
        };
        // Attach event listeners
        getJokeButton.addEventListener('click', fetchAndDisplayJoke);
        scoreButtons.forEach((button) => {
            button.addEventListener('click', (event) => {
                const selectedScore = parseInt(event.currentTarget.value, 10);
                // Mark the selected button
                scoreButtons.forEach((btn) => {
                    btn.classList.remove('selected');
                });
                event.currentTarget.classList.add('selected');
                // Call the function to handle the score button click
                handleScoreButtonClick(selectedScore);
            });
        });
        // Initial fetch and display of joke
        yield fetchAndDisplayJoke();
    }
}));
// OpenWeather
document.addEventListener('DOMContentLoaded', () => __awaiter(void 0, void 0, void 0, function* () {
    const apiKey = '120847f2db75d8496176bb003a9b6bde';
    const weatherContainer = document.getElementById('weatherContainer');
    const fetchWeather = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield fetch(`https://api.openweathermap.org/data/2.5/weather?q=Barcelona,ES&appid=${apiKey}`);
            if (response.ok) {
                const weatherData = yield response.json();
                if (weatherContainer && weatherData.weather && weatherData.weather.length > 0) {
                    const weatherDescription = weatherData.weather[0].description;
                    weatherContainer.textContent = `Current weather in Barcelona: ${weatherDescription}`;
                }
                else {
                    throw new Error('No weather information available.');
                }
            }
            else {
                throw new Error(`Failed to fetch weather. Status: ${response.status}`);
            }
        }
        catch (error) {
            console.error('Error fetching weather:', error.message);
        }
    });
    // Call the function to get weather information when the page loads
    yield fetchWeather();
}));

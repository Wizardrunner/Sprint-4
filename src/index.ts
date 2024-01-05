interface Joke {
  id: string;
  joke: string;
  status: number;
}

interface JokeReport {
  joke: string;
  score: number | null;
  date: string;
}

const dadJokeApiUrl = 'https://icanhazdadjoke.com/';
const chuckNorrisApiUrl = 'https://api.chucknorris.io/jokes/random';
const reportAcudits: JokeReport[] = [];

let isFirstJoke = true;

const updateJokeReport = (joke: string, score: number | null) => {
  const date = new Date().toISOString();
  const jokeReport: JokeReport = { joke, score, date };
  reportAcudits.push(jokeReport);
  console.log('Joke Report Updated:', jokeReport);
};

const fetchJoke = async (apiUrl: string): Promise<Joke> => {
  const headers = new Headers({
      'Accept': 'application/json',
  });

  try {
      const response = await fetch(apiUrl, { headers });

      if (response.ok) {
          const jokeData = await response.json();
          return {
              id: jokeData.id,
              joke: jokeData.joke || jokeData.value || '', // Ensure we have a default value
              status: jokeData.status,
          };
      } else {
          throw new Error(`Failed to fetch joke. Status: ${response.status}`);
      }
  } catch (error: any) {
      console.error('Error fetching joke:', error.message);
      throw new Error('Failed to fetch joke. Check your network connection.');
  }
};

const fetchAndDisplayJoke = async () => {
  try {
      const jokeApiUrl = isFirstJoke ? dadJokeApiUrl : chuckNorrisApiUrl;
      const joke = await fetchJoke(jokeApiUrl);

      if (joke.status === 200 || joke.status === undefined) {
          const jokeContent = document.getElementById('jokeContent');
          if (jokeContent) {
              jokeContent.textContent = joke.joke;
          }

          // Enable score buttons
          const scoreButtons = document.querySelectorAll('.score-button');
          scoreButtons.forEach((button) => {
              (button as HTMLButtonElement).removeAttribute('disabled');
          });

          // Reset previous scores
          scoreButtons.forEach((button) => {
              (button as HTMLButtonElement).classList.remove('selected');
          });

          // Toggle between dad jokes and Chuck Norris jokes
          isFirstJoke = !isFirstJoke;
      } else {
          throw new Error(`Failed to fetch joke. Status: ${joke.status}`);
      }
  } catch (error: any) {
      console.error('Error fetching and displaying joke:', error.message);
  }
};

document.addEventListener('DOMContentLoaded', async () => {
  const getJokeButton = document.getElementById('getJokeButton');
  const jokeContent = document.getElementById('jokeContent');
  const scoreButtons = document.querySelectorAll('.score-button');

  if (getJokeButton && jokeContent && scoreButtons) {
      const handleScoreButtonClick = (selectedScore: number) => {
          // Log the selected score to the console
          console.log('Selected Score:', selectedScore);

          // Update the joke report
          updateJokeReport(jokeContent?.textContent ?? '', selectedScore);
      };

      // Attach event listeners
      getJokeButton.addEventListener('click', fetchAndDisplayJoke);

      scoreButtons.forEach((button) => {
        button.addEventListener('click', (event) => {
            const selectedScore = parseInt((event.currentTarget as HTMLButtonElement).value, 10);
    
            // Mark the selected button
            scoreButtons.forEach((btn) => {
                (btn as HTMLButtonElement).classList.remove('selected');
            });
            (event.currentTarget as HTMLButtonElement).classList.add('selected');
    
            // Call the function to handle the score button click
            handleScoreButtonClick(selectedScore);
        });
    });
    
      // Initial fetch and display of joke
      await fetchAndDisplayJoke();
  }
});

// OpenWeather
document.addEventListener('DOMContentLoaded', async () => {
  const apiKey = '120847f2db75d8496176bb003a9b6bde';
  const weatherContainer = document.getElementById('weatherContainer');

  const fetchWeather = async () => {
      try {
          const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=Barcelona,ES&appid=${apiKey}`);
          if (response.ok) {
              const weatherData = await response.json();
              if (weatherContainer && weatherData.weather && weatherData.weather.length > 0) {
                  const weatherDescription = weatherData.weather[0].description;
                  weatherContainer.textContent = `Current weather in Barcelona: ${weatherDescription}`;
              } else {
                  throw new Error('No weather information available.');
              }
          } else {
              throw new Error(`Failed to fetch weather. Status: ${response.status}`);
          }
      } catch (error: any) {
          console.error('Error fetching weather:', error.message);
      }
  };

  // Call the function to get weather information when the page loads
  await fetchWeather();
});

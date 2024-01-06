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

const backgroundImages: string[] = [
  './img/blob.svg',
  './img/blob1.svg',
  './img/blob2.svg',
  './img/blob3.svg',
  './img/blob4.svg'
];

let currentBackgroundIndex = 0;

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

      // Change the background image
      document.body.style.backgroundImage = `url('${backgroundImages[currentBackgroundIndex]}')`;

      // Increment the background index or reset it
      currentBackgroundIndex = (currentBackgroundIndex + 1) % backgroundImages.length;

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
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=Barcelona,ES&units=metric&appid=${apiKey}`);
      if (response.ok) {
        const weatherData = await response.json();
        if (weatherContainer && weatherData.weather && weatherData.weather.length > 0) {
          const weatherIcon = getWeatherIcon(weatherData.weather[0].icon);
          const temperature = Math.round(weatherData.main.temp);

          // Display weather information with icon and temperature
          weatherContainer.innerHTML = `
            <div class="weather-info">
              <div class="weather-text">
                ${weatherIcon} <span class="pipe">|</span> <span class="temperature">${temperature} °C</span>
              </div>
            </div>
          `;
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

  // Function to get custom weather icon based on OpenWeather icon code
  const getWeatherIcon = (iconCode: string) => {
    const iconFilename = `${iconCode}.png`;
    const iconPath = `img/weather/${iconFilename}`;

    return `<img src="${iconPath}" alt="${iconCode}" />`;
  };

  // Call the function to get weather information when the page loads
  await fetchWeather();
});

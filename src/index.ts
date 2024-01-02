interface Joke {
  id: string;
  joke: string;
  status: number;
}

const apiUrl = 'https://icanhazdadjoke.com/';
let isFirstJoke = true; // Flag to track if it's the first joke

const fetchJoke = async (): Promise<Joke> => {
  const headers = new Headers({
    'Accept': 'application/json',
  });

  const response = await fetch(apiUrl, { headers });
  const jokeData = await response.json();

  // Ensure the request was successful
  if (jokeData.status === 200) {
    return {
      id: jokeData.id,
      joke: jokeData.joke,
      status: jokeData.status,
    };
  } else {
    throw new Error(`Failed to fetch joke. Status: ${jokeData.status}`);
  }
};

document.addEventListener('DOMContentLoaded', async () => {
  const getJokeButton = document.getElementById('getJokeButton');
  const jokeContainer = document.getElementById('jokeContainer');

  if (getJokeButton && jokeContainer) {
    try {
      const joke = await fetchJoke();
      jokeContainer.textContent = joke.joke;
      console.log(joke.joke);

      // Change button text on startup
      getJokeButton.textContent = 'Next Joke';
    } catch (error: any) {
      console.error('Error fetching joke:', error.message);
    }

    getJokeButton.addEventListener('click', async () => {
      try {
        const joke = await fetchJoke();

        // Display the joke on the screen
        jokeContainer.textContent = joke.joke;

        // Log the joke to the console
        console.log(joke.joke);
      } catch (error: any) {
        console.error('Error fetching joke:', error.message);
      }
    });
  }
});
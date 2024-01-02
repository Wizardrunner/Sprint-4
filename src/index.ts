interface Joke {
  id: string;
  joke: string;
  status: number;
}

const apiUrl = 'https://icanhazdadjoke.com/';

const fetchJoke = async (): Promise<Joke> => {
    const headers = new Headers({
      'Accept': 'application/json',
    });
  
    try {
      const response = await fetch(apiUrl, { headers });
      const jokeData = await response.json();
  
      console.log('API response:', jokeData); // Log the response
  
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
    } catch (error) {
      throw new Error(`Error fetching joke: ${error}`);
    }
  };
  
document.addEventListener('DOMContentLoaded', () => {
  const getJokeButton = document.getElementById('getJokeButton');
  const jokeContainer = document.getElementById('jokeContainer');

  if (getJokeButton && jokeContainer) {
    getJokeButton.addEventListener('click', async () => {
      try {
        const joke = await fetchJoke();
        jokeContainer.textContent = joke.joke;
        console.log(joke.joke);
    } catch (error: any) {
        console.error('Error fetching joke:', error.message);
      }
    });
  }
});
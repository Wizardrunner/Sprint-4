interface JokeReport {
  joke: string;
  score: number | null;
  date: string;
}

const apiUrl = 'https://icanhazdadjoke.com/';
const reportAcudits: JokeReport[] = [];

const updateJokeReport = (joke: string, score: number | null) => {
  const date = new Date().toISOString();
  const jokeReport: JokeReport = { joke, score, date };
  reportAcudits.push(jokeReport);
  console.log('Joke Report Updated:', jokeReport);
};

document.addEventListener('DOMContentLoaded', async () => {
  const getJokeButton = document.getElementById('getJokeButton');
  const jokeContainer = document.getElementById('jokeContainer');
  const jokeContent = document.getElementById('jokeContent');

  const scoreButtons = document.querySelectorAll('.score-button');

  if (getJokeButton && jokeContainer && jokeContent && scoreButtons) {
    try {
      const fetchJoke = async (): Promise<{ id: string; joke: string; status: number }> => {
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

      const fetchAndDisplayJoke = async () => {
        const joke = await fetchJoke();
        jokeContent.textContent = joke.joke;

        // Enable score buttons
        scoreButtons.forEach((button) => {
          (button as HTMLButtonElement).removeAttribute('disabled');
        });

        // Reset previous scores
        scoreButtons.forEach((button) => {
          (button as HTMLButtonElement).classList.remove('selected');
        });
      };

      await fetchAndDisplayJoke();

      getJokeButton.addEventListener('click', fetchAndDisplayJoke);

      scoreButtons.forEach((button) => {
        button.addEventListener('click', (event) => {
          const selectedScore = parseInt((event.target as HTMLButtonElement).value, 10);

          // Mark the selected button
          scoreButtons.forEach((btn) => {
            (btn as HTMLButtonElement).classList.remove('selected');
          });
          (event.target as HTMLButtonElement).classList.add('selected');

          // Update the joke report
          updateJokeReport(jokeContent?.textContent ?? '', selectedScore);
        });
      });
    } catch (error: any) {
      console.error('Error fetching joke:', error.message);
    }
  }
});

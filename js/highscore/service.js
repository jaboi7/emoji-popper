const hidminConfig = {
  gameSecret: 'gs_em2f4e0370d30111e880eb8b85403a27fd',
  baseUrl: 'http://localhost:8003/api',
  headers: {
    "Content-Type": "application/json"
  }
}

/**
 * Submits a new score entry to the hidmin API.
 * @param {number} score Entry score value.
 * @param {string} name Optional holder name of this entry.
 * @returns {Promise<string>} The new score entry's ID.
 */
function submitScoreEntry(score, name = null) {
  console.log(`[submitScoreEntry] score: ${score} name: "${name}"`)
  return new Promise((resolve, reject) => {

    //  Retrieve game token using our game secret
    fetchGameToken().then(token => {

      //  Submit a new score entry to hidmin
      fetch(hidminConfig.baseUrl + '/score?token=' + token, {
        method: 'POST',
        headers: hidminConfig.headers,
        body: JSON.stringify({
          score,
          name
        })
      })
        .then(r => r.json())
        .then(obj => resolve(obj.scoreId))
        .catch(reject);
    })
  })
}

/**
 * @returns {Promise<string>} A token for use before submitting a score entry.
 */
function fetchGameToken() {
  return new Promise((resolve, reject) => {
    return fetch(hidminConfig.baseUrl + '/game/token', {
      method: 'POST',
      headers: hidminConfig.headers,
      body: JSON.stringify({
        gameSecret: hidminConfig.gameSecret
      })
    })
      .then(r => r.json())
      .then(obj => resolve(obj.token))
      .catch(reject);
  })
}

/**
 * @returns {Promise<ScoreEntry>} all score entries for this game.
 */
function fetchScoreboard() {
  return new Promise((resolve, reject) => {
    fetch(hidminConfig.baseUrl + '/games/' + hidminConfig.gameSecret)
      .then(r => r.json())
      .then(obj => {
        let entries = obj.entries.map(e => {
          /** @type {ScoreEntry} */
          let entry = {
            ...e,
            date: new Date(e.date),
          };

          return entry;
        });

        resolve(entries);
      })
      .catch(reject);
  })
}
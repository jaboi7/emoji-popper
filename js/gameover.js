/**
 * Shows the game over screen.
 * @param score Resulting score
 */
function showGameOver(score) {
  removeAllBalloons();

  let container = document.getElementById('game-over');
  container.style.display = null;

  container.getElementsByClassName('score')[0].innerText = score;

  document.getElementById('score-submit-action').onclick = e => {
    e.preventDefault();

    let name = document.getElementById('input-score-holder').value.trim();

    onSubmitScoreEntry(score, name);
  }

  //  Fetch scoreboard
  fetchScoreboard().then(entries => {
    appendScoreboard(
      container.getElementsByClassName('scoreboard')[0],
      entries
    );
  })
}

function removeAllBalloons() {
  //  Remove excess balloons
  for (let e of document.getElementsByClassName('balloon')) {
    e.remove();
  }
}

function appendScoreboard(parent, entries) {
  for (let entry of entries) {
    let el = document.createElement('li');
    el.classList.add('score-entry');

    let nameEl = document.createElement('h4');
    nameEl.classList.add('name');
    nameEl.innerText = entry.name;
    el.appendChild(nameEl);

    let scoreEl = document.createElement('p');
    scoreEl.classList.add('score');
    scoreEl.innerText = entry.score;
    el.appendChild(scoreEl);

    parent.appendChild(el);
  }
}

function onSubmitScoreEntry(score, name = null) {
  let form = document.getElementById('game-over');
  form.setAttribute('disabled', 'true');
  
  submitScoreEntry(score, name).then(id => {
    form.removeAttribute('disabled');
    alert("Score submitted! Score entry ID is: " + id);
    hideGameOver();
  }).catch(e => {
    console.error(e);
    alert("Whoops! Something went wrong. Check the console!");
  })
}

function hideGameOver(){
  let form = document.getElementById('game-over');
  form.style.display = "none";
}

window.addEventListener('load', () => {
  document.getElementById('score-submit-cancel').addEventListener('click', hideGameOver);
})
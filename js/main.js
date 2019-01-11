let dev = document.location.origin.indexOf('localhost') != -1;

window.addEventListener('load', () => {
  document.getElementById('start').addEventListener('click', e => {
    Balloon.initSpawnLoop();
    
    e.target.remove();
  })
});

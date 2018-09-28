

window.addEventListener('load', () => {
  document.getElementById('start').addEventListener('click', e => {
    Balloon.initSpawnLoop();
    
    e.target.remove();
  })
});

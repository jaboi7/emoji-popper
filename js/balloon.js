const root = document.getElementById('app');

/**
 * Increments a CSS style value and returns the result as a style value.
 * @param {string} str Source value 
 * @param {number} incr Increment value
 * @returns {string} Style value
 */
const incrementStylePx = (str, incr) => {
  let numVal = parseInt(str.replace(/px/i, ''));
  return `${numVal + incr}px`;
}

const audio = {
  spawn: new Audio('./assets/hello.wav'),
  inflate: new Audio('./assets/inflate.wav'),
  pop: new Audio('./assets/pop.wav')
}

let eggKeyPressed = false;
let shotgunKeyPressed = false;
document.addEventListener('keydown', e => {
  eggKeyPressed = e.keyCode == 69;
  shotgunKeyPressed = e.shiftKey;
});
document.addEventListener('keyup', e => {
  eggKeyPressed = false;
  shotgunKeyPressed = false;
});

/**
 * Represents a single balloon on screen.
 * @author Johan Svensson
 */
class Balloon {
  /**
   * Starts spawning balloons at random locations.
   */
  static initSpawnLoop() {
    setTimeout(() => Balloon.scheduleSpawn(), 1000);
  }

  static getSpawnInterval() {
    return range(750, 2000);
  }

  static scheduleSpawn() {
    setTimeout(() => {
      let padding = 80;

      let minWidth = padding;
      let minHeight = window.innerHeight * 0.5;
      let maxWidth = window.innerWidth - padding * 2;
      let maxHeight = window.innerHeight - padding * 2;

      Balloon.create(range(minWidth, maxWidth), range(minHeight, maxHeight));
      Balloon.scheduleSpawn()
    }, Balloon.getSpawnInterval());
  }

  /**
   * Creates an item at a specified location on the screen.
   * @param {number} x X coordinate
   * @param {number} y Y coordinate
   */
  static create(x, y) {
    let balloon = new Balloon();

    let { style } = balloon.element;
    style.left = `${x}px`;
    style.top = `${y}px`;
  }

  constructor() {
    this.attachToDOM();
    this.startAscendInterval();
  }

  /**
   * @returns {number} Font size px.
   */
  getInitialSize() {
    return range(16, 36);
  }

  attachToDOM() {
    let e = this.element = document.createElement('span');
    e.innerHTML = eggKeyPressed ? '🥚' : '🎈';
    e.style.fontSize = `${this.getInitialSize()}px`;
    e.classList.add('balloon');
    e.onclick = () => this.expand()
    root.appendChild(e);

    audio.spawn.play();
  }

  /**
   * Expands the balloon.
   */
  expand() {
    let { style } = this.element;
    style.fontSize = incrementStylePx(
      style.fontSize,
      shotgunKeyPressed ? range(90, 120) :
        range(8, 16)
    );
    if (shotgunKeyPressed) {
      this.expandCount = this.popTrigger
    }
    if (this.expandCount++ == this.popTrigger) {
      this.pop();
    } else {
      audio.inflate.play();
    }
  }

  startAscendInterval() {
    this.ascendIntervalId = setInterval(() => this.ascend(), 1250);
  }

  /**
   * Ascends to some new location.
   */
  ascend() {
    let { style } = this.element;

    style.top = incrementStylePx(style.top, range(20, 40) * -1);
    style.left = incrementStylePx(style.left, range(20, 40) * (this.shiftLeft ? -1 : 1));

    this.shiftLeft = !this.shiftLeft;
  }

  /**
   * Pops this balloon.
   */
  pop() {
    let { element, ascendIntervalId } = this;
    clearInterval(ascendIntervalId);

    element.style.fontSize = incrementStylePx(element.style.fontSize, range(40, 80));
    element.innerHTML = '🌟';

    //  Prevent further clicking
    element.style.pointerEvents = 'none';

    setInterval(() => this.disappear(), 750);

    audio.pop.play();
  }

  /**
   * Says bye-bye from the DOM tree.
   */
  disappear() {
    let { element } = this;
    let { style } = element;

    style.fontSize = '0px';

    setTimeout(() => element.remove(), 1000);
  }
}

/**
 * @type {HTMLSpanElement}
 */
Balloon.prototype.element = null;
Balloon.prototype.ascendIntervalId = -1;
Balloon.prototype.expandCount = 0;

//  While ascending
Balloon.prototype.shiftLeft = false;

Balloon.prototype.popTrigger = Math.floor(range(3, 7));
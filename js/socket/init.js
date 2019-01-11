/**
 * Initializes the socket.
 * @author Johan Svensson
 */
let _;

var io;

function initSocket() {
  let url = dev ? 'localhost:3000' : null;
  io = io(url);
}
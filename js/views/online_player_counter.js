/**
 * Sets up the online player counter as a listener.
 */
function setupOnlinePlayerCounter() {
  io.on(event_onlinePlayerCountChanged, num => {
    $('#opc').html(`There ${num == 1 ? 'is 1 popper' : `are ${num} poppers`} playing right now!`);
  });
}
const $ = require('jquery')
global.$ = $

const socket = new WebSocket('wss://fronds.tv:8081/broadcast')

socket.onmessage = async function(event) {
  var data = JSON.parse(event.data)

  if (!data) {
    return
  }
}

socket.onclose = function(event) {
}

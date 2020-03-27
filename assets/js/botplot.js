const $ = require('jquery')
global.$ = $

import '../css/animate.css'
import '../js/animate.js'

import '../css/pokedex.css'
import { Pokedex } from '../js/pokedex.js'

const socket = new WebSocket('wss://fronds.tv:8081/broadcast')
const pokedex = new Pokedex('.pokedex')

socket.onmessage = async function(event) {
  var data = JSON.parse(event.data)

  if (!data) {
    return
  }

  if (data.pokemon) {
    pokedex.display(data)
  }
}

socket.onclose = function(event) {
  pokedex.close()
}

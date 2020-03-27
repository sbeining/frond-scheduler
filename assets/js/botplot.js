const $ = require('jquery')
global.$ = $

import '../css/animate.css'
import '../js/animate.js'

import '../css/pokedex.css'
import { Pokedex } from '../js/pokedex.js'

import '../css/phoenix.css'
import { objection, holdIt, takeThat } from '../js/phoenix.js'

const socket = new WebSocket('wss://fronds.tv:8081/broadcast')
const pokedex = new Pokedex('.pokedex')

socket.onmessage = async function(event) {
  var data = JSON.parse(event.data)

  if (!data) {
    return
  }

  if (data.animation == 'phoenix|objection') {
    await objection()
  }

  if (data.animation == 'phoenix|holdit') {
    await holdIt()
  }

  if (data.animation == 'phoenix|takethat') {
    await takeThat()
  }

  if (data.pokemon) {
    pokedex.display(data)
  }
}

socket.onclose = function(event) {
  pokedex.close()
}

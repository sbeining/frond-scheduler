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

let cooldown = false

socket.onmessage = async function(event) {
  const channel = $('.options').data('channel')

  if (cooldown) {
    console.log('cooldown!')
    return
  }

  var data = JSON.parse(event.data)

  if (!data) {
    return
  }

  if (channel != data.channel) {
    return
  }

  if (data.animation == 'phoenix|objection') {
    await objection()
    startCooldown(30000)
  }

  if (data.animation == 'phoenix|holdit') {
    await holdIt()
    startCooldown(30000)
  }

  if (data.animation == 'phoenix|takethat') {
    await takeThat()
    startCooldown(30000)
  }

  if (data.pokemon) {
    pokedex.display(data)
  }
}

function startCooldown(ms) {
  cooldown = true
  setTimeout(function() { cooldown = false }, ms)
}

socket.onclose = function(event) {
  pokedex.close()
}

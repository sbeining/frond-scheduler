/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// any CSS you import will output into a single css file (app.css in this case)
require('../scss/global.scss');
require('../css/app.css');
require('@fortawesome/fontawesome-free/css/all.min.css');

// Need jQuery? Install it with "yarn add jquery", then uncomment to import it.
const $ = require('jquery');
global.$ = $;
require('bootstrap');

const moment = require('moment');
global.moment = moment;
const locale = window.navigator.userLanguage || window.navigator.language;
moment.locale(locale);
require('tempusdominus-bootstrap-4');

console.log('Hello Webpack Encore! Edit me in assets/js/app.js');

import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import bootstrap from '@fullcalendar/bootstrap';
import 'tempusdominus-bootstrap-4/build/css/tempusdominus-bootstrap-4.css';

const pagepiling = require('pagepiling.js');
import 'pagepiling.js/dist/jquery.pagepiling.css';

document.addEventListener('DOMContentLoaded', function() {
  var calendarEl = document.getElementById('calendar');

  if (calendarEl) {
    var calendar = new Calendar(calendarEl, {
      locale: locale,
      firstDay: 1,
      plugins: [ dayGridPlugin, timeGridPlugin, bootstrap ],
      initialView: 'timeGridWeek',
      allDaySlot: false,
      scrollTime: '10:00:00',
      themeSystem: 'bootstrap',
      headerToolbar: {
        left: 'title',
        right: 'timeGridWeek,dayGridMonth prev,next'
      },
      events: '/event.json',
      eventContent: function(info) {
        const category = info.event._def.extendedProps.category
        const color = info.event.backgroundColor
        const selector = `#legend div[data-category-id=${category.id}]`

        if (category.id !== 1 && $(selector).length === 0) {
          let categoryDiv = $('<div/>')

          categoryDiv.addClass('legendEntry')
          categoryDiv.attr('data-category-id', category.id)
          categoryDiv.attr('title', category.description)
          categoryDiv.html(category.title)
          categoryDiv.attr('style', `background-color:${color}`)

          $('#legend').append(categoryDiv)
        }

        const creator = info.event._def.extendedProps.creator
        const streamSelector = `#legend div[data-creator=${creator.username}]`

        if (category.id === 1 && $(streamSelector).length === 0) {
          let categoryDiv = $('<div/>')

          categoryDiv.addClass('legendEntry')
          categoryDiv.attr('data-creator', creator.username)
          categoryDiv.html(`${creator.displayName} stream`)
          categoryDiv.attr('style', `background-color:${color}`)

          $('#legend').append(categoryDiv)
        }
      },
      datesSet: function(info) {
        $('#legend').empty()
      }
    });

    calendar.render();
  }

  $('.to-local-datetime').each(function() {
    const content = $(this).text();
    const converted = moment(content).format('LLL');
    $(this).text(converted);
  })

  $('.profile_card.compact').click(function() {
    $(this).hide()
    $(this).next().show()
  })

  $('.profile_card.full').click(function() {
    $(this).hide()
    $(this).prev().show()
  })


  $('#pagepiling').pagepiling({
    css3: false,
    verticalCentered: false
  });
});

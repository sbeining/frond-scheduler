/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// any CSS you require will output into a single css file (app.css in this case)
require('../scss/global.scss');
require('../css/app.css');
require('@fortawesome/fontawesome-free/css/all.min.css');

// Need jQuery? Install it with "yarn add jquery", then uncomment to require it.
const $ = require('jquery');
global.$ = $;
require('bootstrap');

const moment = require('moment');
global.moment = moment;
const locale = window.navigator.userLanguage || window.navigator.language;
moment.locale(locale);
require('fullcalendar');
require('tempusdominus-bootstrap-4');

console.log('Hello Webpack Encore! Edit me in assets/js/app.js');

import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/timegrid/main.css';
import '@fullcalendar/bootstrap/main.css';
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import bootstrap from '@fullcalendar/bootstrap';
import 'tempusdominus-bootstrap-4/build/css/tempusdominus-bootstrap-4.css';

document.addEventListener('DOMContentLoaded', function() {
  var calendarEl = document.getElementById('calendar');

  if (calendarEl) {
    var calendar = new Calendar(calendarEl, {
      locale: locale,
      firstDay: 1,
      plugins: [ dayGridPlugin, timeGridPlugin, bootstrap ],
      defaultView: 'timeGridWeek',
      allDaySlot: false,
      minTime: '10:00:00',
      themeSystem: 'bootstrap',
      header: {
        left: 'title',
        right: 'timeGridWeek,dayGridMonth prev,next'
      },
      events: '/event.json'
    });

    calendar.render();
  }

  $('.to-local-datetime').each(function() {
    const content = $(this).text();
    const converted = moment(content).format('LLL');
    $(this).text(converted);
  })
});

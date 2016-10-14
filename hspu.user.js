// ==UserScript==
// @name         HorribleSubs PowerUP
// @namespace    https://github.com/netpok/horriblesubs-powerup
// @version      0.1
// @description  Add AniDB links, update times and removes JLink
// @author       netpok
// @match        http://horriblesubs.info/*
// @require      https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.15.1/moment.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/moment-timezone/0.5.6/moment-timezone-with-data.min.js
// ==/UserScript==
/* jshint -W097 */
'use strict';

(function () {

    var $ = $j;

    $(".schedule-time").each(function () {
        $(this).text(moment.tz($(this).text(), "HH:mm", 'America/Los_Angeles').local().format("HH:mm"));
    });

    $("#mban").parent().remove();
})();
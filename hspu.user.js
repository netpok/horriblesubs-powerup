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

    var add_ep_click_event_ = add_ep_click_event;
    add_ep_click_event = function () {
        add_ep_click_event_();
        $(".release-info tr>td.link-1080p:nth-last-child(1)").after('<td class="linkful res-label"><span class="res-link">' +
            '<a href="#" class="tr_needlistener" target="_blank"><img src="http://anidb.net/favicon.ico"></a></span></td>').next().find("a").click(function () {
            this.href = 'http://anidb.net/perl-bin/animedb.pl?show=animelist&noalias=1&do.update=update&adb.search=' +
                encodeURIComponent($(this).closest("tr").find("td:first").text().replace(/\([0-9]{2}\/[0-9]{2}(\/[0-9]{2})?\) /, "").replace(/( S[0-9]+)? - [0-9]+(-[0-9]+)?/, ""));
        });
    };
})();
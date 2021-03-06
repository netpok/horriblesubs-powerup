// ==UserScript==
// @name         HorribleSubs PowerUP
// @namespace    https://github.com/netpok/horriblesubs-powerup
// @version      0.1
// @description  Add AniDB links, update times and removes JLink
// @author       netpok
// @match        http://horriblesubs.info/*
// @require      https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.15.1/moment.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/moment-timezone/0.5.6/moment-timezone-with-data.min.js
// @grant        GM_addStyle
// ==/UserScript==
/* jshint -W097 */
'use strict';

(function () {
    var $ = jQuery;

    $(".schedule-time").each(function () {
        $(this).text(moment.tz($(this).text(), "HH:mm", 'America/Los_Angeles').local().format("HH:mm"));
    });

    $("#mban").parent().remove();

    GM_addStyle(".ind-show a{display: initial!important} .ind-show img,.schedule-page-show img, .schedule-show img, .schedule-widget-show img{vertical-align: -2px;padding-right: 7px;} " +
        ".res-label-4{width: 4%;} .schedule-today td{white-space: nowrap;text-overflow: ellipsis;overflow: hidden;}");
    var add_ep_click_event_ = add_ep_click_event;
    add_ep_click_event = function () {
        add_ep_click_event_();
        $("td.rls-label:nth-child(1):not(.rls-label-4)").parent().prepend('<td class="res-label res-label-4"><span class="res-link">' +
            '<a href="#" target="_blank"><img src="http://anidb.net/favicon.ico"></a></span></td>').find("a:first").click(function () {
            this.href = 'http://anidb.net/perl-bin/animedb.pl?show=animelist&noalias=1&do.update=update&adb.search=' +
                encodeURIComponent($(this).closest("tr").find("td:nth-child(2)").text().replace(/^\([0-9]{2}\/[0-9]{2}(\/[0-9]{2})?\) /, "").replace(/( S[0-9]+)? - [0-9]+(-[0-9]+)?$/, ""));
        });
    };

    $(".ind-show,.schedule-page-show,.schedule-show,.schedule-widget-show").prepend('<a href="#" target="_blank"><img src="http://anidb.net/favicon.ico"></a>').find("a:first").click(function () {
        this.href = 'http://anidb.net/perl-bin/animedb.pl?show=animelist&noalias=1&do.update=update&adb.search=' +
            encodeURIComponent($(this).parent().text().replace(/( S[0-9]+)?$/, ""));
    });

    $(".series-info").closest("article").find("header").addClass("res-link").addClass("schedule-show").find("h1").after('<a href="#" target="_blank" class="linkful"><img src="http://anidb.net/favicon.ico"> AniDB</a>').find("a").click(function () {
        this.href = 'http://anidb.net/perl-bin/animedb.pl?show=animelist&noalias=1&do.update=update&adb.search=' +
            encodeURIComponent($(this).parent().text().trim().replace(/( Season [A-Za-z]+)?$/, ""));
        console.log($(this).parent().text());
    });
})();
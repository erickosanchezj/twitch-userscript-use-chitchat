// ==UserScript==
// @name         Use ChitChat
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  Replaces Twitch's default chat with https://chitchat.ma.pe by https://twitter.com/mape
// @author       https://github.com/MarcGamesons/twitch-userscript-use-chitchat
// @match        https://www.twitch.tv/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    //Wait 15 seconds so that the site can load fully (even if you use add-ons like FFZ).
    window.setTimeout(function(){

        // Get the container that contains the chat messages.
        var node = document.getElementsByClassName("chat-list__lines"); // v1.0 used "chat-messages".

        // Delete all child nodes.
        while (node[0].firstChild) {
            node[0].removeChild(node[0].firstChild);
        }

        // Create an iframe and load ChitChat into it
        var ifrm = document.createElement("iframe");
        var casterURL = window.location.pathname.split('/');
        // v1.2 add id to the iframe.
        ifrm.id = "ChitChatFrame";
        ifrm.setAttribute("src", "https://chitchat.ma.pe/" + casterURL[1]);
        ifrm.style.width = "100%";
        // v1.1 ifrm.style.height = "100%";

        // Append the iframe to the container that contains the chat messages.
        node[0].appendChild(ifrm);

        // v1.2 Update localStorage to enable forceTopBottomLayout.
        ifrm = document.getElementById("ChitChatFrame").contentWindow;
        var settings = ifrm.postMessage(localStorage.getItem("settings"), "*");
        var data = JSON.parse(settings);
        data.forceTopBottomLayout = true;
        data = JSON.stringify(data);
        ifrm.postMessage(localStorage.setItem("settings", data));
        ifrm.location.reload();

    }, 15000);
})();

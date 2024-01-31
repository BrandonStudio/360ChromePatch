// ==UserScript==
// @name         360 Google
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Add Google option to 360 fix search.
// @author       Brandon Studio
// @updateURL    https://cdn.jsdelivr.net/gh/BrandonStudio/360ChromePatch@main/google.js
// @downloadURL  https://cdn.jsdelivr.net/gh/BrandonStudio/360ChromePatch@main/google.js
// @match        http://chrome.360.cn/360chromelink/fixsearch.html*
// @icon         http://chrome.360.cn/favicon.ico
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    const btns = document.getElementById('search_btns')
    btns.insertAdjacentHTML('afterBegin', '<button id="google" type="button" i18n-content="google">Google</button>')
    btns.onclick = function(e) {
        e = e||event;
        var url, iep;
        var search_type = 1;
        switch ((e.target||e.srcElement).id) {
            case 'baidu':
                var eex = external.GetRunPath(external.GetSID(window)) || ''
                console.log(eex)
                if (eex.endsWith('360ChromeX.exe')) {
                    url = 'http://www.baidu.com/baidu?wd=%s';
                    sendGif('1424.4459.gif')
                    if (!query('q')) {
                        url = 'http://www.baidu.com/baidu'
                    }
                } else {
                    url = 'http://www.baidu.com/baidu?wd=%s';
                    sendGif('1347.2369.gif')
                    if (!query('q')) {
                        url = 'http://www.baidu.com/baidu'
                    }
                }
                iep = 'ie';
                search_type = 1;
                break;
            case 'bing':
                url = 'http://www.bing.com/search?q=%s';
                iep = 'ue';
                search_type = 2;
                break;
            case 'search360':
                url = 'https://www.so.com/s?q=%s';
                iep = 'ie';
                search_type = 2;
                break;
            case 'google':
                var i = location.href.indexOf('url=')
                location = location.href.substr(i + 4)
                return;
        }
        if (url) {
            //chrome.send('alterSearchEngine', [search_type, document.getElementById('cb_remember').checked ? 1 : 0]);
            url = url.replace('%s', query('q') || '');
            var ie;
            if(ie = query('ie')) {
                if (ie.toLowerCase() == 'gb2312') {
                    ie = 'gbk';
                }
                url += '&' + iep + '=' + ie;
            }
            location = url;
        }
    };
})();

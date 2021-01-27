(function(){/*
 clipboard.js v2.0.6
 https://clipboardjs.com/

 Licensed MIT © Zeno Rocha
*/
'use strict';window.clipboard=function(){function d(c){if(f[c])return f[c].exports;var a=f[c]={exports:{}};g[c](a,a.exports,d);return a.exports}var g={243:function(c,a,e){e.d(a,{"default":function(){return h}});var h=function(){return{copy:function(k){var l="rtl"==document.documentElement.getAttribute("dir"),b=document.createElement("textarea");b.style.fontSize="12pt";b.style.border="0";b.style.padding="0";b.style.margin="0";b.style.position="absolute";b.style[l?"right":"left"]="-9999px";b.style.top=
"".concat(window.pageYOffset||document.documentElement.scrollTop,"px");b.setAttribute("readonly","");b.value=k;document.body.append(b);b.select();return document.execCommand("copy")}}}()}},f={};(function(){d.d=function(c,a){for(var e in a)d.o(a,e)&&!d.o(c,e)&&Object.defineProperty(c,e,{enumerable:!0,get:a[e]})}})();(function(){d.o=function(c,a){return Object.prototype.hasOwnProperty.call(c,a)}})();return d(243)}().default;}).call(this || window)

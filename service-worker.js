if(!self.define){let e,i={};const n=(n,s)=>(n=new URL(n+".js",s).href,i[n]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=i,document.head.appendChild(e)}else e=n,importScripts(n),i()})).then((()=>{let e=i[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(s,r)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(i[t])return;let d={};const c=e=>n(e,t),o={module:{uri:t},exports:d,require:c};i[t]=Promise.all(s.map((e=>o[e]||c(e)))).then((e=>(r(...e),d)))}}define(["./workbox-020e1147"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/index-BSG6DdY5.js",revision:null},{url:"assets/index-CWp1XzVT.css",revision:null},{url:"index.html",revision:"f7606d5649442893a7a34349e5de65f2"},{url:"registerSW.js",revision:"38013143dc2183340ede8bc1c5124507"},{url:"favicon.ico",revision:"b681b6bb0ff152de1938924bc1875a5d"},{url:"meet-app-144.png",revision:"dae5f3d5d35396e6e3c04e8ef6e70cb6"},{url:"meet-app-192.png",revision:"4ad85c7f381794f8fc16e5ba53cd1f8f"},{url:"meet-app-512.png",revision:"365b42cb16441d855f01d1c094011c15"},{url:"manifest.webmanifest",revision:"ccd3d4f0bf5c6229d5d5787d8de01004"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html"))),e.registerRoute(/\/.*\.png$/,new e.StaleWhileRevalidate({cacheName:"images",plugins:[new e.ExpirationPlugin({maxEntries:50})]}),"GET")}));

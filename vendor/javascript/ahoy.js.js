var e={set:function(e,t,n,r){var i="";var o="";if(n){var a=new Date;a.setTime(a.getTime()+60*n*1e3);i="; expires="+a.toGMTString()}r&&(o="; domain="+r);document.cookie=e+"="+escape(t)+i+o+"; path=/; samesite=lax"},get:function(e){var t,n;var r=e+"=";var i=document.cookie.split(";");for(t=0;t<i.length;t++){n=i[t];while(" "===n.charAt(0))n=n.substring(1,n.length);if(0===n.indexOf(r))return unescape(n.substring(r.length,n.length))}return null}};var t={urlPrefix:"",visitsUrl:"/ahoy/visits",eventsUrl:"/ahoy/events",page:null,platform:"Web",useBeacon:true,startOnReady:true,trackVisits:true,cookies:true,cookieDomain:null,headers:{},visitParams:{},withCredentials:false,visitDuration:240,visitorDuration:1051200};var n=window.ahoy||window.Ahoy||{};n.configure=function(e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])};n.configure(n);var r=window.jQuery||window.Zepto||window.$;var i,o,a;var s=false;var c=[];var u="undefined"!==typeof JSON&&"undefined"!==typeof JSON.stringify;var l=[];function visitsUrl(){return t.urlPrefix+t.visitsUrl}function eventsUrl(){return t.urlPrefix+t.eventsUrl}function isEmpty(e){return 0===Object.keys(e).length}function canTrackNow(){return(t.useBeacon||t.trackNow)&&isEmpty(t.headers)&&u&&"undefined"!==typeof window.navigator.sendBeacon&&!t.withCredentials}function serialize(e){var t=new FormData;for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.append(n,e[n]);return t}function setCookie(n,r,i){e.set(n,r,i,t.cookieDomain||t.domain)}function getCookie(t){return e.get(t)}function destroyCookie(t){e.set(t,"",-1)}function log(e){getCookie("ahoy_debug")&&window.console.log(e)}function setReady(){var e;while(e=c.shift())e();s=true}n.ready=function(e){s?e():c.push(e)};function matchesSelector(e,t){var n=e.matches||e.matchesSelector||e.mozMatchesSelector||e.msMatchesSelector||e.oMatchesSelector||e.webkitMatchesSelector;if(n)return n.apply(e,[t])?e:e.parentElement?matchesSelector(e.parentElement,t):null;log("Unable to match");return null}function onEvent(e,t,n){document.addEventListener(e,(function(e){var r=matchesSelector(e.target,t);if(r){var i=getClosest(r,"data-ahoy-skip");if(null!==i&&"false"!==i)return;n.call(r,e)}}))}function documentReady(e){"interactive"===document.readyState||"complete"===document.readyState?setTimeout(e,0):document.addEventListener("DOMContentLoaded",e)}function generateId(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,(function(e){var t=16*Math.random()|0;var n="x"===e?t:3&t|8;return n.toString(16)}))}function saveEventQueue(){t.cookies&&u&&setCookie("ahoy_events",JSON.stringify(l),1)}function csrfToken(){var e=document.querySelector("meta[name=csrf-token]");return e&&e.content}function csrfParam(){var e=document.querySelector("meta[name=csrf-param]");return e&&e.content}function CSRFProtection(e){var t=csrfToken();t&&e.setRequestHeader("X-CSRF-Token",t)}function sendRequest(e,n,i){if(u)if(r&&r.ajax)r.ajax({type:"POST",url:e,data:JSON.stringify(n),contentType:"application/json; charset=utf-8",dataType:"json",beforeSend:CSRFProtection,success:i,headers:t.headers,xhrFields:{withCredentials:t.withCredentials}});else{var o=new XMLHttpRequest;o.open("POST",e,true);o.withCredentials=t.withCredentials;o.setRequestHeader("Content-Type","application/json");for(var a in t.headers)Object.prototype.hasOwnProperty.call(t.headers,a)&&o.setRequestHeader(a,t.headers[a]);o.onload=function(){200===o.status&&i()};CSRFProtection(o);o.send(JSON.stringify(n))}}function eventData(e){var n={events:[e]};if(t.cookies){n.visit_token=e.visit_token;n.visitor_token=e.visitor_token}delete e.visit_token;delete e.visitor_token;return n}function trackEvent(e){n.ready((function(){sendRequest(eventsUrl(),eventData(e),(function(){for(var t=0;t<l.length;t++)if(l[t].id===e.id){l.splice(t,1);break}saveEventQueue()}))}))}function trackEventNow(e){n.ready((function(){var t=eventData(e);var n=csrfParam();var r=csrfToken();n&&r&&(t[n]=r);t.events_json=JSON.stringify(t.events);delete t.events;window.navigator.sendBeacon(eventsUrl(),serialize(t))}))}function page(){return t.page||window.location.pathname}function presence(e){return e&&e.length>0?e:null}function cleanObject(e){for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&null===e[t]&&delete e[t];return e}function eventProperties(){return cleanObject({tag:this.tagName.toLowerCase(),id:presence(this.id),class:presence(this.className),page:page(),section:getClosest(this,"data-section")})}function getClosest(e,t){for(;e&&e!==document;e=e.parentNode)if(e.hasAttribute(t))return e.getAttribute(t);return null}function createVisit(){s=false;i=n.getVisitId();o=n.getVisitorId();a=getCookie("ahoy_track");if(false===t.cookies||false===t.trackVisits){log("Visit tracking disabled");setReady()}else if(i&&o&&!a){log("Active visit");setReady()}else{if(!i){i=generateId();setCookie("ahoy_visit",i,t.visitDuration)}if(getCookie("ahoy_visit")){log("Visit started");if(!o){o=generateId();setCookie("ahoy_visitor",o,t.visitorDuration)}var e={visit_token:i,visitor_token:o,platform:t.platform,landing_page:window.location.href,screen_width:window.screen.width,screen_height:window.screen.height,js:true};document.referrer.length>0&&(e.referrer=document.referrer);for(var r in t.visitParams)Object.prototype.hasOwnProperty.call(t.visitParams,r)&&(e[r]=t.visitParams[r]);log(e);sendRequest(visitsUrl(),e,(function(){destroyCookie("ahoy_track");setReady()}))}else{log("Cookies disabled");setReady()}}}n.getVisitId=n.getVisitToken=function(){return getCookie("ahoy_visit")};n.getVisitorId=n.getVisitorToken=function(){return getCookie("ahoy_visitor")};n.reset=function(){destroyCookie("ahoy_visit");destroyCookie("ahoy_visitor");destroyCookie("ahoy_events");destroyCookie("ahoy_track");return true};n.debug=function(e){false===e?destroyCookie("ahoy_debug"):setCookie("ahoy_debug","t",525600);return true};n.track=function(e,r){var i={name:e,properties:r||{},time:(new Date).getTime()/1e3,id:generateId(),js:true};n.ready((function(){t.cookies&&!n.getVisitId()&&createVisit();n.ready((function(){log(i);i.visit_token=n.getVisitId();i.visitor_token=n.getVisitorId();if(canTrackNow())trackEventNow(i);else{l.push(i);saveEventQueue();setTimeout((function(){trackEvent(i)}),1e3)}}))}));return true};n.trackView=function(e){var t={url:window.location.href,title:document.title,page:page()};if(e)for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);n.track("$view",t)};n.trackClicks=function(e){if(void 0===e)throw new Error("Missing selector");onEvent("click",e,(function(e){var t=eventProperties.call(this,e);t.text="input"===t.tag?this.value:(this.textContent||this.innerText||this.innerHTML).replace(/[\s\r\n]+/g," ").trim();t.href=this.href;n.track("$click",t)}))};n.trackSubmits=function(e){if(void 0===e)throw new Error("Missing selector");onEvent("submit",e,(function(e){var t=eventProperties.call(this,e);n.track("$submit",t)}))};n.trackChanges=function(e){log("trackChanges is deprecated and will be removed in 0.5.0");if(void 0===e)throw new Error("Missing selector");onEvent("change",e,(function(e){var t=eventProperties.call(this,e);n.track("$change",t)}))};try{l=JSON.parse(getCookie("ahoy_events")||"[]")}catch(e){}for(var d=0;d<l.length;d++)trackEvent(l[d]);n.start=function(){createVisit();n.start=function(){}};documentReady((function(){t.startOnReady&&n.start()}));export{n as default};


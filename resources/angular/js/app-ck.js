"use strict";var duktvideos=angular.module("duktvideos",[]).config(["$routeProvider",function(e,t){e.when("/",{templateUrl:Craft.getResourceUrl("duktvideos/angular/partials/details.html"),controller:ServicesListCtrl}).when("/:serviceKey",{templateUrl:Craft.getResourceUrl("duktvideos/angular/partials/details.html"),controller:ServicesListCtrl}).when("/:serviceKey/:methodName",{templateUrl:Craft.getResourceUrl("duktvideos/angular/partials/details.html"),controller:ServicesListCtrl}).when("/:serviceKey/:methodName/:playlistId",{templateUrl:Craft.getResourceUrl("duktvideos/angular/partials/details.html"),controller:ServicesListCtrl}).otherwise({redirectTo:"/"})}]);duktvideos.factory("DuktVideosService",function(e){var t={searchQuery:"",currentService:!1,currentMethod:!1,services:!1,loader:{on:function(){$(".dv-main .toolbar .spinner").removeClass("hidden")},off:function(){$(".dv-main .toolbar .spinner").addClass("hidden")}},videoMore:{on:function(){$(".dv-video-more").css("display","block")},off:function(){$(".dv-video-more").css("display","none")}}};return t});duktvideos.run(function(e,t,n,r,i,s){function u(n,r,i){var s={method:"search",service:n.serviceKey,searchQuery:r,page:1,perPage:Dukt_videos.pagination_per_page};i.loader.on();t({method:"POST",url:Craft.getActionUrl("duktvideos/ajax/angular",s),cache:!0}).success(function(t,n,r,s){e.videos=t;t.length<Dukt_videos.pagination_per_page?i.videoMore.off():i.videoMore.on();i.loader.off()}).error(function(e,t,n,r){console.log("error",e,t,n,r)})}console.log("run");t({method:"POST",url:Craft.getActionUrl("duktvideos/ajax/angular",{method:"services"})}).success(function(r,s,o,u){console.log("services success");$(".dv-box").removeClass("dv-loading");e.services=r;console.log("number of services detected : ",e.services.length);if(e.services.length==0){e.errorMessage="Set up a video service";$(".dv-getStarted").css("display","block");$(".dv-box").css("display","none");return!1}$.each(r,function(n,r){t({method:"POST",url:Craft.getActionUrl("duktvideos/ajax/angular",{method:"playlists",service:r.name})}).success(function(t,r,i,s){e.services[n].playlists=t}).error(function(e,t,n,r){console.log("error",e,t,n,r)})});$.each(e.services,function(t,n){if(i.serviceKey==t||typeof i.serviceKey=="undefined"){e.currentService=n;return!1}});console.log("currentService",e.currentService);console.log("$routeParams.serviceKey",i.serviceKey);e.serviceKey=e.currentService.name;if(n.path()=="/"||n.path()==""){console.log("redirect",e.serviceKey+"/uploads");n.path(e.serviceKey+"/uploads")}}).error(function(e,t,n,r){console.log("error",e,t,n,r)});e.serviceChange=function(){console.log("serviceChange",this.serviceKey);e.currentService=e.services[this.serviceKey];n.path($(".dv-sidebar select").val()+"/"+i.methodName)};e.getClass=function(e){var t=new RegExp("/.*/"+e),r=n.path().match(t);return r?"active":""};var o=!1;e.search=function(){typeof this.searchQuery!="undefined"&&(s.searchQuery=this.searchQuery);var e=s.searchQuery,t=new RegExp("/.*/search"),r=n.path().match(t);r||n.path(i.serviceKey+"/search");if(e!=""){clearTimeout(o);o=setTimeout(function(){console.log("search",i.serviceKey,e);u(i,e,s)},500)}};$(document).on("keypress",".search input",function(t){t.keyCode=="13"&&e.search()})});
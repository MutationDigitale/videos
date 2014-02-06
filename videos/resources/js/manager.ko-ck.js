/**
 * Knockout Manager
 */function KoManager(){var e=this;e.gateways=ko.observableArray();Craft.postActionRequest("videos/getGatewaysWithSections",{},$.proxy(function(t,n){if(t&&n=="success")if(!t.hasOwnProperty("error")){e.gateways(t.gateways);var r=$(".videos-main .dk-middle"),i=$(".dk-no-videos",r);Dukt.Utils.positionCenter(i,r);if(e.gateways().length==0){$(".videos-no-gateway",this.$container).removeClass("hidden");$(".videos-gateways-loading",this.$container).addClass("hidden")}$(".videos-sidebar .dk-section:first-child li:first-child",$manager.$container).trigger("click")}else $manager.error(t.error);else $manager.error("Couldn't get gateways.")},this));e.videos=ko.observable();e.selectedGateway=ko.observable();e.selectedSectionItem=ko.observable();e.selectedVideoIndex=ko.observable();e.goToSectionItem=function(t){$manager.spinner("on");var n={url:t.url};e.getVideos(n);e.selectedSectionItem(t.url)};e.searchQuery="";e.previousSearchQuery="";e.searchTimeout=!1;e.pagination={page:1,perPage:36};e.getVideosData={};e.getVideos=function(t){var n=!1;if(typeof t=="undefined"){n=!0;t=e.getVideosData}else{e.getVideosData=t;e.pagination={page:1,perPage:36}}typeof t.options=="undefined"&&(t.options={});t.options.page=e.pagination.page;t.options.perPage=e.pagination.perPage;$manager.spinner("on");$manager.getVideosErrorReset();$manager.more("hide");Craft.postActionRequest("videos/getVideosFromUrl",t,$.proxy(function(r,i){$manager.spinner("off");if(r&&i=="success")if(!r.hasOwnProperty("error")){$(".dk-videos",$manager.$container).removeClass("hidden");if(!n){e.selectedVideoIndex(null);$(".submit",$manager.$container).addClass("disabled");$(".videos-main .dk-middle",$manager.$container).get(0).scrollTop=0;e.videos(r.videos)}else e.videos(e.videos().concat(r.videos));e.videos().length==0?$(".dk-no-videos",$manager.$container).removeClass("hidden"):$(".dk-no-videos",$manager.$container).addClass("hidden");if(typeof r.videos!="undefined")r.videos.length==t.options.perPage?$manager.more("show"):$manager.more("hide");else if(!n){$(".dk-videos",$manager.$container).addClass("hidden");$manager.getVideosError("Couldn't get videos.",!0)}else $manager.getVideosError("Couldn't get videos.")}else if(!n){$(".dk-videos",$manager.$container).addClass("hidden");$manager.getVideosError(r.error,!0)}else $manager.getVideosError(r.error)},this))};e.more=function(){e.pagination.page=e.pagination.page+1;e.getVideos()};e.doSearch=function(t){typeof t!="undefined"&&t&&(e.previousSearchQuery="");if(e.searchQuery=="")e.previousSearchQuery=e.searchQuery;else if(e.previousSearchQuery!=e.searchQuery){e.previousSearchQuery=e.searchQuery;clearTimeout(e.searchTimeout);$manager.spinner("on");e.searchTimeout=setTimeout(function(){var t={url:e.selectedGateway()+"/search",options:{q:e.searchQuery}};e.getVideos(t)},800)}};e.cancel=function(){$manager.close()};e.back=function(){$manager.back()};e.play=function(e){$manager.play(e)};e.submit=function(t,n,r,i){$target=$(n.target);if(!$target.hasClass("disabled")){var s=e.selectedVideoIndex(),o=e.videos(),u=o[s],a=$manager.$field;a.$input.val(u.url);a.lookupVideo();$manager.close()}};e.selectVideo=function(t,n){e.selectedVideoIndex(t);$(".submit",$manager.$container).removeClass("disabled")}};
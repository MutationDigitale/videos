/**
 * Manager modal
 */var Manager=Modal.extend({$field:null,init:function(){this.base();$.post(Craft.getUrl("videos/modals/manager"),{},$.proxy(function(e,t,n){if(t=="success"){this.$inject.html(e);$container=this.$container;ko.applyBindings(new KoManager,$(".videos-manager",$container).get(0));var r=$container,i=$(".videos-gateways-loading",r);Dukt.Utils.positionCenter(i,r)}},this))},getVideosError:function(e,t){var n=$(".videos-main .dk-middle"),r=$(".dk-error",n);r.html(e);r.removeClass("hidden");if(t){r.addClass("dk-absolute");Dukt.Utils.positionCenter(r,n)}else{r.removeClass("dk-absolute");r.css("width","auto");r.css("height","auto")}},getVideosErrorReset:function(){var e=$(".videos-main .dk-middle"),t=$(".dk-error",e);t.html("");t.addClass("hidden")},spinner:function(e){e=="on"?$(".dk-spinner",this.$container).removeClass("hidden"):$(".dk-spinner",this.$container).addClass("hidden")},open:function(e){this.base();this.$field=e;Dukt.Utils.positionCenter($(".dk-center",this.$container),this.$container)},play:function(e){$(".videos-manager-player",this.$container).removeClass("hidden");$(".videos-manager-player",this.$container).html('<iframe src="'+e.embedUrl+'autoplay=1" />');$(".dk-back",this.$container).removeClass("hidden")},back:function(){$(".videos-manager-player",this.$container).addClass("hidden");$(".videos-manager-player",this.$container).html("");$(".dk-back",this.$container).addClass("hidden")},more:function(e){e=="show"?$(".dk-more",this.$container).removeClass("hidden"):$(".dk-more",this.$container).addClass("hidden")}}),$manager=new Manager;
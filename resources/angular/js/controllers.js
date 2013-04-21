function ServicesListCtrl($scope, $routeParams, $http, $rootScope, $location, $route, VideosService)
{
	console.log('controller', $routeParams.serviceKey, $routeParams.methodName);

	// --------------------------------------------------------------------

	if(typeof($routeParams.serviceKey) !== "undefined" && typeof($routeParams.methodName) !== "undefined")
	{
		var opts = {
			service : $routeParams.serviceKey,
			method : $routeParams.methodName,
			page:1,
			perPage:Dukt_videos.pagination_per_page
		};

		if($routeParams.methodName != 'search')
		{
			performRequest(opts);
		}

	}

	// --------------------------------------------------------------------

	$scope.moreVideos = function()
	{
		var offset = $rootScope.videos.length;

		VideosService.videoMore.off();

		perPage = Dukt_videos.pagination_per_page;
		page = Math.floor(offset / perPage) + 1;

		var opts = {
			method: $routeParams.methodName,
			service: $routeParams.serviceKey,
			searchQuery: VideosService.searchQuery,
			page:page,
			perPage:perPage
		};

		performRequest(opts, function(data) {
			$.merge($rootScope.videos, data);
		});
	}

	// --------------------------------------------------------------------

	// play a video

	$scope.play = function(video)
	{
		// show preview modal

		//videos.preview.show();

		dkvideos.preview.play(video);

		$scope.selected = video;

		$http({method: 'POST', url: Craft.getActionUrl('videos/ajax/embed', {videoUrl:video.url, service: $routeParams.serviceKey})}).
        success(function(data, status, headers, config) {
        	console.log('--success', $.parseJSON(data));
        	// $('#player .title').html(video.title);
        	$('#player #videoDiv').html($.parseJSON(data));
        }).
        error(function(data, status, headers, config) {
          console.log('--error', data, status, headers, config);
        });

		console.log('play video', video.id);
	}

	// --------------------------------------------------------------------

	// is video selected

	$scope.isSelected = function(video) {
	    return $scope.selected === video;
	}

	// --------------------------------------------------------------------

	// perform AJAX request

	function performRequest(opts, callback)
	{
		if(typeof($routeParams.playlistId) !== "undefined")
		{
			opts.playlistId = $routeParams.playlistId;
		}

		VideosService.loader.on();

		$http({method: 'POST', url: Craft.getActionUrl('videos/ajax/'+opts.method, opts)}).
			success(function(data, status, headers, config)
			{
				console.log('ajax/'+opts.method+' : success');
			}).
			error(function(data, status, headers, config)
			{
				console.log('ajax/'+opts.method+' : error', data, status, headers, config);
			}).then(function(a, b, c) {
	        	console.log('ajax/'+opts.method+' : then');



	        	if(typeof(callback) == "function")
	        	{
	        		callback(a.data);
	        	}
	        	else
	        	{
	        		$rootScope.videos = a.data;
	        	}

                if(a.data.length < Dukt_videos.pagination_per_page)
                {
                    VideosService.videoMore.off();
                }
                else
                {
                    VideosService.videoMore.on();
                }

                VideosService.loader.off();
	    });
	}
}

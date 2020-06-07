(function () {
  var playerEl = document.getElementById('player');

  if (playerEl) {
    function loadPlayer(videoId) {
      if (typeof (YT) == 'undefined' || typeof (YT.Player) == 'undefined') {

        var tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        window.onYouTubePlayerAPIReady = function () {
          onYouTubePlayer(videoId);
        };

      } else {

        onYouTubePlayer(videoId);

      }
    }

    var player;

    function onYouTubePlayer(videoId) {
      if (player) {
        player.destroy();
      };
      player = new YT.Player('player', {
        height: '291',
        width: '516',
        videoId: videoId,
        playerVars: {
          controls: 2,
          showinfo: 0,
          rel: 0,
          showsearch: 0,
          iv_load_policy: 3
        },
      });
    }

    var playlistItems = document.querySelectorAll('[data-yt-video-id]');

    loadPlayer(playlistItems[0].dataset.ytVideoId);

    for (var i = 0, len = playlistItems.length; i < len; i++) {
      playlistItems[i].addEventListener('click', function (e) {
        e.preventDefault();
        loadPlayer(this.dataset.ytVideoId);
      });
    }
  }
})();
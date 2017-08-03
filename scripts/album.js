// Example Album
var albumPicasso = {
  title: 'The Colors',
  artist: 'Pablo Picasso',
  label: 'Cubism',
  year: '1881',
  albumArtUrl: 'assets/images/album_covers/01.png',
  songs: [{
      title: 'Blue',
      duration: '4:26'
    },
    {
      title: 'Green',
      duration: '3:14'
    },
    {
      title: 'Red',
      duration: '5:01'
    },
    {
      title: 'Pink',
      duration: '3:21'
    },
    {
      title: 'Magenta',
      duration: '2:15'
    }
  ]
};

// Another Example Album
var albumMarconi = {
  title: 'The Telephone',
  artist: 'Guglielmo Marconi',
  label: 'EM',
  year: '1909',
  albumArtUrl: 'assets/images/album_covers/20.png',
  songs: [{
      title: 'Hello, Operator?',
      duration: '1:01'
    },
    {
      title: 'Ring, ring, ring',
      duration: '5:01'
    },
    {
      title: 'Fits in your pocket',
      duration: '3:21'
    },
    {
      title: 'Can you hear me now?',
      duration: '3:14'
    },
    {
      title: 'Wrong phone number',
      duration: '2:15'
    }
  ]
};

// Third Example Album
var albumThird = {
  title: 'Third and Three',
  artist: '33 and The One Thirds',
  label: 'Math Core',
  year: '2018',
  albumArtUrl: 'assets/images/album_covers/17.png',
  songs: [{
      title: 'Fractions Per Second',
      duration: '0:33'
    },
    {
      title: 'We Are 33',
      duration: '0:33'
    },
    {
      title: '33 Doors Down',
      duration: '0:33'
    },
    {
      title: '33 || 66',
      duration: '0:33'
    },
    {
      title: 'ee',
      duration: '0:33'
    }
  ]
};
// -- actual code starts here -- //

// cycles through albums on click - just for fun!
var albumList = [albumPicasso, albumMarconi, albumThird]
document.querySelector(".album-cover-art").addEventListener("click", function() {
  albumList.push(albumList.shift()); //cycles though albumList
  setCurrentAlbum(albumList[0]);
});

// template to create mulitple rows as needed for number of songs
var createSongRow = function(songNumber, songName, songLength) {
  var template =
    '<tr class="album-view-song-item">' +
    '  <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>' +
    '  <td class="song-item-title">' + songName + '</td>' +
    '  <td class="song-item-duration">' + songLength + '</td>' +
    '</tr>';

  var $row = $(template);

  var onHover = function(event) {
    var songNumberCell = $(this).find('.song-item-number');
    var songNumber = songNumberCell.attr('data-song-number');

    if (songNumber !== currentlyPlayingSong) {
      songNumberCell.html(playButtonTemplate);
    }
  };

  var offHover = function(event) {
    var songNumberCell = $(this).find('.song-item-number');
    var songNumber = songNumberCell.attr('data-song-number');

    if (songNumber !== currentlyPlayingSong) {
      songNumberCell.html(songNumber);
    }
  };

  $row.find('.song-item-number').click(clickHandler);
  $row.hover(onHover, offHover);
  return $row;
};

var setCurrentAlbum = function(album) {

  var $albumTitle = $('.album-view-title');
  var $albumArtist = $('.album-view-artist');
  var $albumReleaseInfo = $('.album-view-release-info');
  var $albumImage = $('.album-cover-art');
  var $albumSongList = $('.album-view-song-list');

  $albumTitle.text(album.title);
  $albumArtist.text(album.artist);
  $albumReleaseInfo.text(album.year + ' ' + album.label);
  $albumImage.attr('src', album.albumArtUrl);

  $albumSongList.empty();

  for (var i = 0; i < album.songs.length; i++) {
    var $newRow = createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
    $albumSongList.append($newRow);
  }
};

// variable for play/pause functionality
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';
// Album button templates
var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';


// Store state of playing songs
var currentlyPlayingSong = null;

$(document).ready(function() {
  setCurrentAlbum(albumPicasso);
});

// click handler
var clickHandler = function() {
  var songNumber = $(this).attr('data-song-number');

  if (currentlyPlayingSong !== null) {
    // Revert to song number for currently playing song because user started playing new song.
    var currentlyPlayingCell = $('.song-item-number[data-song-number="' + currentlyPlayingSong + '"]');
    currentlyPlayingCell.html(currentlyPlayingSong);
  }
  if (currentlyPlayingSong !== songNumber) {
    // Switch from Play -> Pause button to indicate new song is playing.
    $(this).html(pauseButtonTemplate);
    currentlyPlayingSong = songNumber;
  } else if (currentlyPlayingSong === songNumber) {
    // Switch from Pause -> Play button to pause currently playing song.
    $(this).html(playButtonTemplate);
    currentlyPlayingSong = null;
  }
};

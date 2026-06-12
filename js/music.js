const playlist = [
  {
    title: "Rock With You",
    artist: "Michael Jackson",
    url: "https://archive.org/download/thebestofdisco/Michael%20Jackson%20-%20Rock%20With%20You.mp3"
  },
  {
    title: "Die For You",
    artist: "The Weeknd",
    url: "https://archive.org/download/aura-music-cde7fb34-7b6f-4b3e-8dad-55c2763803bc/temp_song_1761491571398.mp3"
  },
  {
    title: "Love on the Brain",
    artist: "Rihanna",
    url: "https://archive.org/download/love-on-the-brain-160k/Love%20On%20The%20Brain_160k.mp3"
  },
  {
    title: "Young and Beautiful",
    artist: "Lana Del Rey",
    url: "https://archive.org/download/lana-del-rey-young-and-beautiful-o-1a-f-54-do-60/Lana%20Del%20Rey%20-%20Young%20and%20Beautiful%20%5Bo_1aF54DO60%5D.mp3"
  },
  {
    title: "Video Games",
    artist: "Lana Del Rey",
    url: "https://archive.org/download/VideoGames_440/Lana_Del_Ray_-_Video_Games.mp3"
  },
  {
    title: "Case 143",
    artist: "Stray Kids",
    url: "https://archive.org/download/y-2mate.com-stray-kids-case-143-mv_202308/y2mate.com%20-%20Stray%20Kids%20CASE%20143%20MV.mp3"
  },
  {
    title: "Into You",
    artist: "Ariana Grande",
    url: "https://archive.org/download/into-you-ariana-grande-lyrics/Into%20You%20-%20Ariana%20Grande%20%28Lyrics%29.mp3"
  },
  {
    title: "Never Let You Go",
    artist: "Justin Bieber",
    url: "https://archive.org/download/AlsPlaylistMixedGenre/Justin%20Bieber%20-%20Never%20Let%20You%20Go.mp3"
  },
  {
    title: "U Smile",
    artist: "Justin Bieber",
    url: "https://archive.org/download/AlsPlaylistMixedGenre/Justin%20Bieber%20-%20U%20Smile.mp3"
  },
  {
    title: "Love Never Felt So Good",
    artist: "Michael Jackson ft. JT",
    url: "https://archive.org/download/AlsPlaylistMixedGenre/Michael%20Jackson%20-%20Love%20Never%20Felt%20So%20Good%20feat.%20Justin%20Timberlake.mp3"
  }
];

let currentTrackIndex = 0;
let playingState = false;
let bgAudio = null;
let musicBtn = null;
let musicPlayer = null;

function isPlaying() {
  return playingState;
}

function loadTrack(index) {
  currentTrackIndex = index;
  const track = playlist[index];
  if (bgAudio) {
    bgAudio.src = track.url;
    bgAudio.volume = 0.4;
    bgAudio.load();
  }
  
  const currentTrackTitleEl = document.getElementById('currentTrackTitle');
  const currentTrackArtistEl = document.getElementById('currentTrackArtist');
  if (currentTrackTitleEl) currentTrackTitleEl.textContent = track.title;
  if (currentTrackArtistEl) currentTrackArtistEl.textContent = track.artist;
  
  // Highlight active track
  const playlistTracksEl = document.getElementById('playlistTracks');
  if (playlistTracksEl) {
    const items = playlistTracksEl.querySelectorAll('.track-item');
    items.forEach((item, i) => {
      if (i === index) item.classList.add('active');
      else item.classList.remove('active');
    });
  }
}

function playTrack() {
  if (!bgAudio) return;
  bgAudio.play()
    .then(() => {
      playingState = true;
      if (musicBtn) musicBtn.classList.add('playing');
      if (musicPlayer) musicPlayer.classList.add('playing');
    })
    .catch(err => console.log("Audio play failed: ", err));
}

function pauseTrack() {
  if (!bgAudio) return;
  bgAudio.pause();
  playingState = false;
  if (musicBtn) musicBtn.classList.remove('playing');
  if (musicPlayer) musicPlayer.classList.remove('playing');
}

function loadAndPlayTrack(index) {
  loadTrack(index);
  playTrack();
}

function initMusic() {
  bgAudio = document.getElementById('bgAudio');
  musicBtn = document.getElementById('musicBtn');
  musicPlayer = document.getElementById('musicPlayer');
  
  const playlistTracksEl = document.getElementById('playlistTracks');
  const playPauseBtn = document.getElementById('playPauseBtn');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const timeElapsedEl = document.getElementById('timeElapsed');
  const timeDurationEl = document.getElementById('timeDuration');
  const trackProgressBar = document.getElementById('trackProgressBar');
  const trackProgressFill = document.getElementById('trackProgressFill');

  if (!bgAudio || !musicBtn || !musicPlayer) return;

  // Set default audio volume
  bgAudio.volume = 0.4;

  // Populate Playlist in DOM
  playlist.forEach((track, index) => {
    const li = document.createElement('li');
    li.className = `track-item ${index === 0 ? 'active' : ''}`;
    li.innerHTML = `
      <span class="track-item-title">${track.title}</span>
      <span class="track-item-artist">${track.artist}</span>
    `;
    li.addEventListener('click', (e) => {
      e.stopPropagation();
      loadAndPlayTrack(index);
    });
    if (playlistTracksEl) playlistTracksEl.appendChild(li);
  });

  // Toggle playlist panel on floating button click
  musicBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    musicPlayer.classList.toggle('open');
  });

  // Close panel on outside click
  document.addEventListener('click', (e) => {
    if (!musicPlayer.contains(e.target)) {
      musicPlayer.classList.remove('open');
    }
  });

  if (playPauseBtn) {
    playPauseBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (playingState) pauseTrack();
      else playTrack();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      let prevIndex = currentTrackIndex - 1;
      if (prevIndex < 0) prevIndex = playlist.length - 1;
      loadAndPlayTrack(prevIndex);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      let nextIndex = currentTrackIndex + 1;
      if (nextIndex >= playlist.length) nextIndex = 0;
      loadAndPlayTrack(nextIndex);
    });
  }

  // Auto-play next track when finished
  bgAudio.addEventListener('ended', () => {
    let nextIndex = currentTrackIndex + 1;
    if (nextIndex >= playlist.length) nextIndex = 0;
    loadAndPlayTrack(nextIndex);
  });

  // Track progress updates
  bgAudio.addEventListener('timeupdate', () => {
    if (bgAudio.duration) {
      const progress = (bgAudio.currentTime / bgAudio.duration) * 100;
      if (trackProgressFill) trackProgressFill.style.width = `${progress}%`;
      if (timeElapsedEl) timeElapsedEl.textContent = formatTime(bgAudio.currentTime);
      if (timeDurationEl) timeDurationEl.textContent = formatTime(bgAudio.duration);
    }
  });

  function formatTime(secs) {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  }

  // Progress bar scrubbing
  if (trackProgressBar) {
    trackProgressBar.addEventListener('click', (e) => {
      e.stopPropagation();
      const rect = trackProgressBar.getBoundingClientRect();
      const pos = (e.clientX - rect.left) / rect.width;
      if (bgAudio.duration) {
        bgAudio.currentTime = pos * bgAudio.duration;
      }
    });
  }
}

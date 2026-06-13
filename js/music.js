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

// Lyrics for Rock With You (Michael Jackson)
const rockWithYouLyrics = [
  { time: 0, text: "♪ (Intro - Michael Jackson) ♪" },
  { time: 8, text: "Girl, close your eyes..." },
  { time: 15, text: "Let that rhythm get into you" },
  { time: 22, text: "Don't try to fight it" },
  { time: 29, text: "There ain't nothing that you can do" },
  { time: 36, text: "Relax your mind" },
  { time: 43, text: "Lay back and groove with mine" },
  { time: 50, text: "You gotta feel that heat" },
  { time: 54, text: "And we can ride the boogie" },
  { time: 58, text: "Share that beat of love" },
  { time: 62, text: "I wanna rock with you (all night)" },
  { time: 69, text: "Dance you into day (sunlight)" },
  { time: 76, text: "I wanna rock with you (all night)" },
  { time: 83, text: "Rock the night away..." },
  { time: 104, text: "I wanna rock with you (all night)" },
  { time: 110, text: "Rock the night away..." }
];

let lastKaraokeText = '';
const audioCache = [];

function isPlaying() {
  return playingState;
}

function updatePlayPauseIcon(isPlayingState) {
  const btn = document.getElementById('playPauseBtn');
  if (!btn) return;
  if (isPlayingState) {
    btn.innerHTML = '<i data-lucide="pause"></i>';
  } else {
    btn.innerHTML = '<i data-lucide="play"></i>';
  }
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
}

// Get or create preloaded audio element for the given index
function getAudioElement(index) {
  if (audioCache[index]) {
    return audioCache[index];
  }
  
  const audio = document.createElement('audio');
  audio.src = playlist[index].url;
  audio.preload = 'auto';
  audio.volume = 0.4;
  
  const timeElapsedEl = document.getElementById('timeElapsed');
  const timeDurationEl = document.getElementById('timeDuration');
  const trackProgressFill = document.getElementById('trackProgressFill');

  // Forward events of the current active audio element to the UI handlers
  audio.addEventListener('loadstart', () => {
    if (index === currentTrackIndex) {
      musicPlayer.classList.add('loading');
      const titleEl = document.getElementById('currentTrackTitle');
      if (titleEl) {
        titleEl.textContent = playlist[currentTrackIndex].title + " (Cargando...)";
      }
    }
  });

  audio.addEventListener('waiting', () => {
    if (index === currentTrackIndex) {
      musicPlayer.classList.add('loading');
    }
  });

  audio.addEventListener('playing', () => {
    if (index === currentTrackIndex) {
      musicPlayer.classList.remove('loading');
      musicPlayer.classList.add('playing');
      musicBtn.classList.add('playing');
      playingState = true;
      
      const titleEl = document.getElementById('currentTrackTitle');
      if (titleEl) {
        titleEl.textContent = playlist[currentTrackIndex].title;
      }
      updatePlayPauseIcon(true);
    }
  });

  audio.addEventListener('play', () => {
    if (index === currentTrackIndex) {
      playingState = true;
      musicBtn.classList.add('playing');
      musicPlayer.classList.add('playing');
      updatePlayPauseIcon(true);
    }
  });

  audio.addEventListener('pause', () => {
    if (index === currentTrackIndex) {
      playingState = false;
      musicBtn.classList.remove('playing');
      musicPlayer.classList.remove('playing', 'loading');
      updatePlayPauseIcon(false);
    }
  });

  audio.addEventListener('ended', () => {
    if (index === currentTrackIndex) {
      let nextIndex = currentTrackIndex + 1;
      if (nextIndex >= playlist.length) nextIndex = 0;
      loadAndPlayTrack(nextIndex);
    }
  });

  audio.addEventListener('timeupdate', () => {
    if (index === currentTrackIndex) {
      if (audio.duration) {
        const progress = (audio.currentTime / audio.duration) * 100;
        if (trackProgressFill) trackProgressFill.style.width = `${progress}%`;
        if (timeElapsedEl) timeElapsedEl.textContent = formatTime(audio.currentTime);
        if (timeDurationEl) timeDurationEl.textContent = formatTime(audio.duration);
        
        // Update Karaoke Panel
        if (typeof window.updateKaraokeLine === 'function') {
          let currentText = '';
          if (currentTrackIndex === 0) {
            const currentTime = audio.currentTime;
            for (let i = rockWithYouLyrics.length - 1; i >= 0; i--) {
              if (currentTime >= rockWithYouLyrics[i].time) {
                currentText = rockWithYouLyrics[i].text;
                break;
              }
            }
          } else {
            currentText = "Letra no disponible";
          }
          
          if (currentText !== lastKaraokeText) {
            lastKaraokeText = currentText;
            window.updateKaraokeLine(currentText);
          }
        }
      }
    }
  });

  audioCache[index] = audio;
  return audio;
}

function loadTrack(index) {
  // Pause and reset any currently playing audio in cache
  if (bgAudio) {
    bgAudio.pause();
    bgAudio.currentTime = 0;
  }

  currentTrackIndex = index;
  bgAudio = getAudioElement(index);
  
  // Reset karaoke tracker
  lastKaraokeText = '';
  
  const track = playlist[index];
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
  
  // Preload adjacent tracks to make switching instantaneous
  const nextIndex = (index + 1) % playlist.length;
  const prevIndex = (index - 1 + playlist.length) % playlist.length;
  getAudioElement(nextIndex);
  getAudioElement(prevIndex);
}

function playTrack() {
  if (!bgAudio) return;
  bgAudio.play().catch(err => console.log("Audio play failed: ", err));
}

function pauseTrack() {
  if (!bgAudio) return;
  bgAudio.pause();
  playingState = false;
  if (musicBtn) musicBtn.classList.remove('playing');
  if (musicPlayer) musicPlayer.classList.remove('playing', 'loading');
  updatePlayPauseIcon(false);
}

function loadAndPlayTrack(index) {
  loadTrack(index);
  playTrack();
}

function initMusic() {
  musicBtn = document.getElementById('musicBtn');
  musicPlayer = document.getElementById('musicPlayer');
  
  const playlistTracksEl = document.getElementById('playlistTracks');
  const playPauseBtn = document.getElementById('playPauseBtn');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const trackProgressBar = document.getElementById('trackProgressBar');

  if (!musicBtn || !musicPlayer) return;

  // Initialize and preload the first track and its neighbors
  bgAudio = getAudioElement(0);
  getAudioElement(1);
  getAudioElement(playlist.length - 1);

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
    
    const dayNightToggle = document.getElementById('dayNightToggle');
    if (dayNightToggle) {
      if (musicPlayer.classList.contains('open')) {
        dayNightToggle.style.opacity = '0';
        dayNightToggle.style.pointerEvents = 'none';
      } else {
        dayNightToggle.style.opacity = '1';
        dayNightToggle.style.pointerEvents = 'auto';
      }
    }
  });

  // Close panel on outside click
  document.addEventListener('click', (e) => {
    if (!musicPlayer.contains(e.target)) {
      musicPlayer.classList.remove('open');
      const dayNightToggle = document.getElementById('dayNightToggle');
      if (dayNightToggle) {
        dayNightToggle.style.opacity = '1';
        dayNightToggle.style.pointerEvents = 'auto';
      }
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

  // Progress bar scrubbing
  if (trackProgressBar) {
    trackProgressBar.addEventListener('click', (e) => {
      e.stopPropagation();
      const rect = trackProgressBar.getBoundingClientRect();
      const pos = (e.clientX - rect.left) / rect.width;
      if (bgAudio && bgAudio.duration) {
        bgAudio.currentTime = pos * bgAudio.duration;
      }
    });
  }
}

function formatTime(secs) {
  const m = Math.floor(secs / 60);
  const s = Math.floor(secs % 60);
  return `${m}:${s < 10 ? '0' : ''}${s}`;
}


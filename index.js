const $$ = document.querySelectorAll.bind(document);
const $ = document.querySelector.bind(document);

const PLAYER_STORAGE_KEY = "Minh Khanh";

const heading = $("header h2");
const cdThumb = $(".cd-thumb");
const audio = $("#audio");
const cd = $(".cd");
const playBtn = $(".btn-toggle-play");
const player = $(".player");
const progress = $("#progress");
const nextBtn = $(".btn-next");
const prevBtn = $(".btn-prev");
const randomBtn = $(".btn-random");
const repeatBtn = $(".btn-repeat");
const playlist = $(".playlist");

const app = {
  currentIndex: 0,
  isPlaying: false,
  isRandom: false,
  isRpeat: false,
  config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
  setConfig: function (key, value) {
    this.config[key] = value;
    localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config));
  },
  songs: [
    {
      name: "Faded",
      singer: "Alan Walker",
      img: "https://i.ytimg.com/an_webp/60ItHLz5WEA/mqdefault_6s.webp?du=3000&sqp=CLCohosG&rs=AOn4CLCagfORqn2FC8XeQ_crmnbRy6-akw",
      path: "/MusicPlayer/music/Faded.mp3",
    },
    {
      name: "Until You",
      singer: "Shayne Ward",
      img: "https://i.ytimg.com/an_webp/e9oxsf3NWMs/mqdefault_6s.webp?du=3000&sqp=CLWShosG&rs=AOn4CLA97SBM7XBAvsxWvD59xLxyvt8GZQ",
      path: "/MusicPlayer/music/UntilYou.mp3",
    },
    {
      name: "Takeaway",
      singer: "The Chansmokers,...",
      img: "https://i.ytimg.com/an_webp/qNLjSqT48sg/mqdefault_6s.webp?du=3000&sqp=CIjrhYsG&rs=AOn4CLB1lomYdYH0xgEI6czbH2djZ3WfMA",
      path: "/MusicPlayer/music/Takeaway.mp3",
    },
    {
      name: "2 million year",
      singer: "Đen",
      img: "https://i.ytimg.com/vi/LSMDNL4n0kM/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAQDmYpBHUeUvVKlnXYVx7PTAEeTQ",
      path: "/MusicPlayer/music/y2mate.com - Đen  hai triệu năm ft Biên mv.mp3",
    },
    {
      name: "Mistletoe - cover",
      singer: "Quỳnh Lâm Nha",
      img: "https://i.ytimg.com/an_webp/P8C7-cC0zKw/mqdefault_6s.webp?du=3000&sqp=CKTbhosG&rs=AOn4CLBiIuV3BhXfuilp9d4h2emaluNL_g",
      path: "/MusicPlayer/music/y2mate.com - Cây tầm gửi   Quỳnh Lâm Nha  Cover  Tik Tok   Mistletoe  琼琳呀 .mp3",
    },
    {
      name: "Close",
      singer: "The Chansmokers",
      img: "https://i.ytimg.com/an_webp/PT2_F-1esPk/mqdefault_6s.webp?du=3000&sqp=CM7uhosG&rs=AOn4CLBhB4aw-EFmcqbETAyHAUlLJGWdiQ",
      path: "/MusicPlayer/music/y2mate.com - The Chainsmokers  Closer Lyric ft Halsey.mp3",
    },
    {
      name: "See You Again",
      singer: "Charlie Puth",
      img: "https://i.ytimg.com/an_webp/cPyovQwFmhE/mqdefault_6s.webp?du=3000&sqp=CMHQhosG&rs=AOn4CLBxRSMjgmHYH3WtzIyg1GLfwKNTxw",
      path: "/MusicPlayer/music/y2mate.com - Wiz Khalifa  See You Again Lyrics ft Charlie Puth.mp3",
    },
    {
      name: "Sinh ra đã là thứ đối lập nhau",
      singer: "Dalab",
      img: "https://i.ytimg.com/an_webp/redFrGBZoJY/mqdefault_6s.webp?du=3000&sqp=CL71hosG&rs=AOn4CLDmqWhsenzI-DdYE_O-Ud2GpsSv4A",
      path: "/MusicPlayer/music/y2mate.com - Sinh Ra Đã Là Thứ Đối Lập Nhau  Emcee L Da LAB ft Badbies Official MV.mp3",
    },
    {
      name: "Nhạc buồn vl",
      singer: "...",
      img: "https://i.ytimg.com/vi/Tc0rQSPVk-U/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDz687cKGvkb5bsQOBNcwmtzYwGzg",
      path: "/MusicPlayer/music/y2mate.com - Giọt nước mắt anh đã tuôn rơi rồi  NGƯỜI MÌNH YÊU CHƯA CHẮC ĐÃ YÊU MÌNH  GIL LÊ.mp3",
    },
  ],
  render: function () {
    let htmls = this.songs.map((item, index) => {
      return `
            <div class="song ${
              index === this.currentIndex ? "active" : ""
            }" data-index = ${index}>
                <div class="thumb"
                    style="background-image: url('${item.img}')">
                </div>
                <div class="body">
                    <h3 class="title">${item.name}</h3>
                    <p class="author">${item.singer}</p>
                </div>
                <div class="option">
                    <i class="fas fa-ellipsis-h"></i>
                </div>
            </div>
        `;
    });
    playlist.innerHTML = htmls.join("");
  },
  defaultProperties: function () {
    Object.defineProperty(this, "currentSong", {
      get: function () {
        return this.songs[this.currentIndex];
      },
    });
  },
  handleEvents: function () {
    const cdWidth = cd.offsetWidth;

    const cdThumbAnimate = cdThumb.animate(
      [
        {
          transform: "rotate(360deg)",
        },
      ],
      {
        duration: 10000,
        iterations: Infinity,
      }
    );

    cdThumbAnimate.pause();
    document.onscroll = function () {
      const scrollTop = document.documentElement.scrollTop || window.scrollY;
      const newCdWidth = cdWidth - scrollTop;

      cd.style.width = newCdWidth > 0 ? newCdWidth + "px" : 0;
      cd.style.opacity = newCdWidth / cdWidth;
    };

    playBtn.onclick = function () {
      if (app.isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
      audio.onplay = function () {
        app.isPlaying = true;
        player.classList.add("playing");
        cdThumbAnimate.play();
      };
      audio.onpause = function () {
        app.isPlaying = false;
        player.classList.remove("playing");
        cdThumbAnimate.pause();
      };
      audio.ontimeupdate = function () {
        if (audio.duration) {
          const ProgressPercent = Math.floor(
            (audio.currentTime / audio.duration) * 100
          );
          progress.value = ProgressPercent;
        }
      };
      progress.onchange = function (e) {
        const seekTime = (audio.duration / 100) * e.target.value;
        audio.currentTime = seekTime;
      };
    };
    nextBtn.onclick = function () {
      if (app.isRandom) {
        app.randomSong();
      } else {
        app.nextSong();
      }
      audio.play();
      app.render();
      app.scrollToActiveSong();
    };
    prevBtn.onclick = function () {
      if (app.isRandom) {
        app.randomSong();
      } else {
        app.prevSong();
      }
      audio.play();
      app.render();
      app.scrollToActiveSong();
    };
    randomBtn.onclick = function () {
      app.isRandom = !app.isRandom;
      randomBtn.classList.toggle("active", app.isRandom);
      app.setConfig("isRandom", app.isRandom);
    };
    audio.onended = function () {
      if (isRpeat) {
        audio.play();
      } else {
        nextBtn.click();
      }
    };
    repeatBtn.onclick = function () {
      app.isRpeat = !app.isRpeat;
      app.setConfig("isRpeat", app.isRpeat);
      repeatBtn.classList.toggle("active", app.isRpeat);
    };
    playlist.onclick = function (e) {
      const songNode = e.target.closest(".song:not(.active)");
      if (songNode || e.target.closest(".option")) {
        if (songNode) {
          app.currentIndex = Number(songNode.dataset.index);
          app.loadCurrentSong();
          app.render();
          audio.play();
        }
      }
    };
  },
  loadCurrentSong: function () {
    heading.textContent = this.currentSong.name;
    cdThumb.style.backgroundImage = `url('${this.currentSong.img}')`;
    audio.src = this.currentSong.path;
    audio.onplay = function () {
      app.isPlaying = true;
      player.classList.add("playing");
      cdThumbAnimate.play();
    };
    audio.onpause = function () {
      app.isPlaying = false;
      player.classList.remove("playing");
      cdThumbAnimate.pause();
    };
  },
  nextSong: function () {
    this.currentIndex++;
    if (this.currentIndex >= this.songs.length) {
      this.currentIndex = 0;
    }
    this.loadCurrentSong();
  },
  prevSong: function () {
    this.currentIndex--;
    if (this.currentIndex < 0) {
      this.currentIndex = this.songs.length - 1;
    }
    this.loadCurrentSong();
  },
  randomSong: function () {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * this.songs.length);
    } while (newIndex === this.currentIndex);
    this.currentIndex = newIndex;
    this.loadCurrentSong();
  },
  scrollToActiveSong: function () {
    setTimeout(() => {
      $(".song.active").scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }, 500);
  },
  loadConfig: function () {
    app.isRandom = app.config.isRandom;
    app.isRpeat = app.config.isRpeat;
  },
  start: function () {
    this.defaultProperties();
    this.loadCurrentSong();
    this.loadConfig();
    this.handleEvents();
    this.render();

    randomBtn.classList.toggle("active", this.isRandom);
    repeatBtn.classList.toggle("active", this.isRpeat);
  },
};
app.start();

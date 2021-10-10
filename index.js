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
      img: "https://upload.wikimedia.org/wikipedia/vi/d/da/Alan_Walker_-_Faded.png",
      path: "/MusicPlayer/music/Faded.mp3",
    },
    {
      name: "Until You",
      singer: "Shayne Ward",
      img: "https://avatar-ex-swe.nixcdn.com/song/2018/01/29/b/d/d/e/1517189710456_640.jpg",
      path: "/MusicPlayer/music/UntilYou.mp3",
    },
    {
      name: "Takeaway",
      singer: "The Chansmokers,...",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyoPp_7q97KQv_tlUbBFDWkn6L82ABYqtqNA&usqp=CAU",
      path: "/MusicPlayer/music/Takeaway.mp3",
    },
    {
      name: "2 million year",
      singer: "Đen",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIXaDDnjZoh39iJDltDplpPd657YtDd4rE6w&usqp=CAU",
      path: "/MusicPlayer/music/y2mate.com - Đen  hai triệu năm ft Biên mv.mp3",
    },
    {
      name: "Mistletoe - cover",
      singer: "Quỳnh Lâm Nha",
      img: "https://revelogue.com/wp-content/uploads/2021/01/justin-bieber-bat-dau-e1611506032777.jpg",
      path: "/MusicPlayer/music/y2mate.com - Cây tầm gửi   Quỳnh Lâm Nha  Cover  Tik Tok   Mistletoe  琼琳呀 .mp3",
    },
    {
      name: "Close",
      singer: "The Chansmokers",
      img: "https://avatar-ex-swe.nixcdn.com/song/2017/10/04/a/4/8/6/1507109116689_640.jpg",
      path: "/MusicPlayer/music/y2mate.com - The Chainsmokers  Closer Lyric ft Halsey.mp3",
    },
    {
      name: "See You Again",
      singer: "Charlie Puth",
      img: "https://dichthuathanu.com/wp-content/uploads/2020/09/hqdefault-2.jpg",
      path: "/MusicPlayer/music/y2mate.com - Wiz Khalifa  See You Again Lyrics ft Charlie Puth.mp3",
    },
    {
      name: "Sinh ra đã là thứ đối lập nhau",
      singer: "Dalab",
      img: "https://i.ytimg.com/vi/eb2JHVBVKhs/maxresdefault.jpg",
      path: "/MusicPlayer/music/y2mate.com - Sinh Ra Đã Là Thứ Đối Lập Nhau  Emcee L Da LAB ft Badbies Official MV.mp3",
    },
    {
      name: "Nhạc buồn vl",
      singer: "...",
      img: "https://cdn.tgdd.vn/hoi-dap/1313875/lo-fi-la-gi-cach-de-nhan-biet-ban-dang-nghe-loai-nhac-nay1.jpg",
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
      progress.onchange = function (e) {
        const seekTime = (audio.duration / 100) * e.target.value;
        audio.currentTime = seekTime;
      };
     audio.ontimeupdate = function () {
        if (audio.duration) {
          const ProgressPercent = Math.floor(
            (audio.currentTime / audio.duration) * 100
          );
          progress.value = ProgressPercent;  
        }     
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
      if (app.isRpeat) {
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

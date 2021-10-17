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
  usedMusic: [],
 cdThumbAnimate : cdThumb.animate(
    [
      {
        transform: "rotate(360deg)",
      },
    ],
    {
      duration: 10000,
      iterations: Infinity,
    }
  ),
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
      name: "Anh Đếch Cần Gì Nhiều Ngoài Em",
      singer: "Đen",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIXaDDnjZoh39iJDltDplpPd657YtDd4rE6w&usqp=CAU",
      path: "/MusicPlayer/music/y2mate.com - Đen  Anh Đếch Cần Gì Nhiều Ngoài Em ft Vũ Thành Đồng MV_320kbps.mp3",
    },
    {
      name: "Ngày khác lạ",
      singer: "Đen",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIXaDDnjZoh39iJDltDplpPd657YtDd4rE6w&usqp=CAU",
      path: "/MusicPlayer/music/y2mate.com - Đen  Ngay Khac La ft Giang Pham Triple D MV_320kbps.mp3",
    },
    {
      name: "Đi Theo Bóng Mặt Trời",
      singer: "Đen",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIXaDDnjZoh39iJDltDplpPd657YtDd4rE6w&usqp=CAU",
      path: "/MusicPlayer/music/y2mate.com - Đen  Đi Theo Bóng Mặt Trời ft Tăng Ngân Hà Maius Philharmonic_320kbps.mp3",
    },
    {
      name: "Ta Cứ Đi Cùng Nhau",
      singer: "Đen",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIXaDDnjZoh39iJDltDplpPd657YtDd4rE6w&usqp=CAU",
      path: "/MusicPlayer/music/y2mate.com - Đen  Ta Cứ Đi Cùng Nhau ft Linh Cáo Prod by  i Tễu MV_320kbps.mp3",
    },
    {
      name: "Cơn Mơ Băng Giá",
      singer: "Noo Phước Thịnh",
      img: "https://suckhoedoisong.qltns.mediacdn.vn/2015/1413943827-noo-3-1423842695674.jpg",
      path: "/MusicPlayer/music/y2mate.com - Noo Phước Thịnh COVER Cơn Mơ Băng Giá LIVE  Mây in the Nest_320kbps.mp3",
    },
    {
      name: "Chạm khẽ tim anh một chút thôi",
      singer: "Noo Phước Thịnh",
      img: "https://suckhoedoisong.qltns.mediacdn.vn/2015/1413943827-noo-3-1423842695674.jpg",
      path: "/MusicPlayer/music/y2mate.com - Chạm khẽ tim anh một chút thôi Noo Phước Thịnh  Lyric video by Eunn_320kbps.mp3.webm",
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
      name: "Muốn nói với em",
      singer: "TTeam",
      img: "https://cdnmedia.thethaovanhoa.vn/Upload/O5NP4aFt6GVwE7JTFAOaA/files/2020/06/thai-vu-muon-noi-voi-em%20(3).jpg",
      path: "/MusicPlayer/music/y2mate.com - TTeam  MUỐN NÓI VỚI EM Official MV KIỀU MINH TUẤN  LÊ CHI BLACKBI.mp3",
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
      name: "Nước Mắt Em Lau Bằng Tình Yêu Mới",
      singer: "Dalab",
      img: "https://i.ytimg.com/vi/eb2JHVBVKhs/maxresdefault.jpg",
      path: "/MusicPlayer/music/y2mate.com - Nuoc Mat Em Lau Bang Tinh Yeu Moi  Da LAB ft Toc Tien Official MV_320kbps.mp3",
    },
    {
      name: "Nhạc buồn vl",
      singer: "...",
      img: "https://cdn.tgdd.vn/hoi-dap/1313875/lo-fi-la-gi-cach-de-nhan-biet-ban-dang-nghe-loai-nhac-nay1.jpg",
      path: "/MusicPlayer/music/y2mate.com - Giọt nước mắt anh đã tuôn rơi rồi  NGƯỜI MÌNH YÊU CHƯA CHẮC ĐÃ YÊU MÌNH  GIL LÊ.mp3",
    },
    {
      name: "BƯỚC QUA MÙA CÔ ĐƠN",
      singer: "Vũ",
      img: "https://static2.yan.vn/YanNews/202012/202012100650387133-32ba9754-912d-40ca-8edf-be27c7f3d19f.jpeg",
      path: "/MusicPlayer/music/y2mate.com - BƯỚC QUA MÙA CÔ ĐƠN  Vũ Official MV.mp3",
    },
    {
      name: "LẠ LÙNG",
      singer: "Vũ",
      img: "https://static2.yan.vn/YanNews/202012/202012100650387133-32ba9754-912d-40ca-8edf-be27c7f3d19f.jpeg",
      path: "/MusicPlayer/music/y2mate.com - LẠ LÙNG  Vũ Original_320kbps.mp3",
    },
    {
      name: "Trốn Tìm",
      singer: "Đen",
      img: "https://i1.sndcdn.com/artworks-SulYyzvm47QgVmqH-yL2nCw-t500x500.jpg",
      path: "/MusicPlayer/music/y2mate.com - Đen  Trốn Tìm ft MTV band MV.mp3",
    },
    {
      name: "Mười Năm",
      singer: "Đen",
      img: "https://i1.sndcdn.com/artworks-SulYyzvm47QgVmqH-yL2nCw-t500x500.jpg",
      path: "/MusicPlayer/music/y2mate.com - Đen  Mười Năm ft Ngọc Linh MV Lộn Xộn 3_320kbps.mp3",
    },
    {
      name: "NƠI TA CHỜ EM",
      singer: "1ST SINGLE",
      img: "https://cdn.vietnammoi.vn/stores/news_dataimages/vantt/052017/18/14/3835_kaity-1-5718-1494903982.jpg",
      path: "/MusicPlayer/music/y2mate.com - NƠI TA CHỜ EM OFFICIAL MV 4K  WILL FT KAITY  1ST SINGLE  EM CHƯA 18 OST.mp3",
    },
    {
      name: "Âm thầm bên em",
      singer: "Sơn tùng MTP",
      img: "https://vietthanh.vn/image/catalog/sheet-nhac/28ths05.jpg",
      path: "/MusicPlayer/music/y2mate.com - Âm Thầm Bên Em Lofi Ver By Besu  Sơn Tùng MTP.mp3",
    },
    {
      name: "Hãy trao cho anh",
      singer: "Sơn tùng MTP",
      img: "https://static.yeah1.com/uploads/editors/47/2021/01/08/gQ66Xpnfhbbvs2ZE49YK2Sn8O599bgA5IrapVGjN.jpeg",
      path: "/MusicPlayer/music/y2mate.com - SƠN TÙNG MTP  HÃY TRAO CHO ANH ft Snoop Dogg  Official MV.mp3",
    },
    {
      name: "Senorita",
      singer: "Shawn Mendes , Camila Cabello",
      img: "https://static.toiimg.com/thumb/msid-72055553,width-400,resizemode-4/72055553.jpg",
      path: "/MusicPlayer/music/y2mate.com - Shawn Mendes Camila Cabello  Señorita.mp3",
    },
    {
      name: "Khi phải quên đi ",
      singer: "KHÓI cover",
      img: "https://vnn-imgs-f.vgcloud.vn/2019/06/05/11/phan-manh-quynh-mv-moi-la-cau-chuyen-that-cua-toi-va-ban-gai-1.jpg",
      path: "/MusicPlayer/music/y2mate.com - Khi phải quên đi  KHÓI cover_320kbps.mp3"
    },
    {
      name: "Đường Tôi Chở Em Về ",
      singer: "buitruonglinh x Freak D",
      img: "https://i1.sndcdn.com/artworks-4Xh2hYcOULz9vJhi-S6U07A-t500x500.jpg",
      path: "/MusicPlayer/music/y2mate.com - Đường Tôi Chở Em Về Lofi Ver  buitruonglinh x Freak D_320kbps.mp3",
    },
    {
      name: "Có Chàng Trai Viết Lên Cây ",
      singer: "Phan Mạnh Quỳnh",
      img: "https://vnn-imgs-f.vgcloud.vn/2019/06/05/11/phan-manh-quynh-mv-moi-la-cau-chuyen-that-cua-toi-va-ban-gai-1.jpg",
      path: "/MusicPlayer/music/y2mate.com - Có Chàng Trai Viết Lên Cây  Phan Mạnh Quỳnh  AUDIO LYRIC OFFICIAL_320kbps.mp3",
    },
    {
      name: "Nhạt",
      singer: "Phan Mạnh Quỳnh",
      img: "https://vnn-imgs-f.vgcloud.vn/2019/06/05/11/phan-manh-quynh-mv-moi-la-cau-chuyen-that-cua-toi-va-ban-gai-1.jpg",
      path: "/MusicPlayer/music/y2mate.com - NHẠT  Phan Mạnh Quỳnh  AUDIO_320kbps.mp3",
    },
  ],

  shuffle: function (array) {
    let currentIndex = array.length,
      randomIndex;
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    return array;
  },

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

    app.cdThumbAnimate.pause();
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
        app.cdThumbAnimate.play();
      };
      audio.onpause = function () {
        app.isPlaying = false;
        player.classList.remove("playing");
        app.cdThumbAnimate.pause();
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
      app.cdThumbAnimate.play();
    };
    audio.onpause = function () {
      app.isPlaying = false;
      player.classList.remove("playing");
      app.cdThumbAnimate.pause();
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
    } while (Boolean(app.usedMusic.find((item) => item === newIndex)));
    if (app.usedMusic.length === app.songs.length) {
      app.usedMusic = [];
    } else {
      app.usedMusic.push(newIndex);
      this.currentIndex = newIndex;
    }
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
    this.shuffle(app.songs);
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

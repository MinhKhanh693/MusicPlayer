const $$ = document.querySelectorAll.bind(document);
const $ = document.querySelector.bind(document);

const heading = $("header h2");
const cdThumb = $(".cd-thumb");
const audio = $("#audio");

const cd = $(".cd");
const playBtn = $(".btn-toggle-play");
const player = $(".player");

const progress = $("#progress");

const app = {
  currentIndex: 0,
  isPlaying: false,
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
      name: "Takeaway",
      singer: "The Chansmokers,...",
      img: "https://i.ytimg.com/an_webp/qNLjSqT48sg/mqdefault_6s.webp?du=3000&sqp=CIjrhYsG&rs=AOn4CLB1lomYdYH0xgEI6czbH2djZ3WfMA",
      path: "/MusicPlayer/music/Takeaway.mp3",
    },
    {
      name: "Takeaway",
      singer: "The Chansmokers,...",
      img: "https://i.ytimg.com/an_webp/qNLjSqT48sg/mqdefault_6s.webp?du=3000&sqp=CIjrhYsG&rs=AOn4CLB1lomYdYH0xgEI6czbH2djZ3WfMA",
      path: "/MusicPlayer/music/Takeaway.mp3",
    },
    {
      name: "Takeaway",
      singer: "The Chansmokers,...",
      img: "https://i.ytimg.com/an_webp/qNLjSqT48sg/mqdefault_6s.webp?du=3000&sqp=CIjrhYsG&rs=AOn4CLB1lomYdYH0xgEI6czbH2djZ3WfMA",
      path: "/MusicPlayer/music/Takeaway.mp3",
    },
  ],
  render: function () {
    let htmls = this.songs.map((item) => {
      return `
            <div class="song">
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
    $(".playlist").innerHTML = htmls.join("");
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

   const cdThumbAnimate =  cdThumb.animate([{
        transform : 'rotate(360deg)'
    }],{
        duration:10000,
        iterations : Infinity
    })

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
        cdThumbAnimate.pause();
      } else {
        audio.play();
        cdThumbAnimate.play();
      }
      audio.onplay = function () {
        app.isPlaying = true;
        player.classList.add("playing");
      };
      audio.onpause = function () {
        app.isPlaying = false;
        player.classList.remove("playing");
      };

      audio.ontimeupdate = function () {
        if (audio.duration) {
          const ProgressPercent = Math.floor(
            (audio.currentTime / audio.duration) * 100
          );
          progress.value = ProgressPercent;
        }
      };

      progress.onchange = function(e){
          const seekTime = audio.duration / 100 * e.target.value ;
          audio.currentTime = seekTime;
      }
    };
  },
  loadCurrentSong: function () {
    heading.textContent = this.currentSong.name;
    cdThumb.style.backgroundImage = `url('${this.currentSong.img}')`;
    audio.src = this.currentSong.path;
  },
  
  start: function () {
    this.defaultProperties();
    this.loadCurrentSong();
    this.handleEvents();
    this.render();
  },
};
app.start();

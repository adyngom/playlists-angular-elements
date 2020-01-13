import {
  Component,
  OnInit,
  ViewEncapsulation,
  Input,
  AfterViewInit,
  ElementRef,
  ViewChild
} from "@angular/core";

@Component({
  selector: "app-playlists",
  templateUrl: "./playlists.component.html",
  styleUrls: ["./playlists.component.css"],
  encapsulation: ViewEncapsulation.Native
})
export class PlaylistsComponent implements OnInit, AfterViewInit {
  @Input()
  title = "Upcoming must watch";

  listStyles = {};
  episodes = [];
  headers = [];

  @ViewChild("containerRef", { static: false }) containerRef: ElementRef;
  @ViewChild("videoBoxRef", { static: false }) videoBoxRef: ElementRef;
  @ViewChild("videoPlayerRef", { static: false }) videoPlayerRef: ElementRef;
  @ViewChild("videosListRef", { static: false }) videosListRef: ElementRef;
  @ViewChild("chaptersRef", { static: false }) chaptersRef: ElementRef;

  ngOnInit() {}

  ngAfterViewInit() {
    this.setVideosListStyles();

    this.headers = [
      ...this.containerRef.nativeElement.querySelectorAll(".chapter-header")
    ];
    this.episodes = [
      ...this.containerRef.nativeElement.querySelectorAll(".episodes")
    ];

    this.switchVideo("KrEWXL9ClGw");
    this.setEpisodesHeight();

    this.chaptersRef.nativeElement.addEventListener("click", e => {
      e.preventDefault();
      const elem = e.target;

      if (elem.classList.contains("chapter-header")) {
        const _episodes = elem.nextElementSibling;
        this.episodes.forEach(ep => (ep.style.height = "0px"));
        this.headers.forEach(header => header.classList.remove("open"));
        elem.classList.toggle("open");
        _episodes.style.height = _episodes.getAttribute("data-height") + "px";
      }

      if (elem.classList.contains("episode")) {
        const { type, episodeid: id } = elem.dataset;
        if (!!id) {
          this.switchVideo(id, type);
        }
      }
    });
  }

  private setVideosListStyles(): void {
    this.listStyles = {
      height: `${this.videoPlayerRef.nativeElement.scrollHeight}px`,
      overflow: "scroll"
    };
    Object.assign(this.videosListRef.nativeElement.style, this.listStyles);
  }

  private setEpisodesHeight = (): void => {
    !!this.episodes.length &&
      this.episodes.forEach((ep, i) => {
        const _height = ep.scrollHeight;
        ep.setAttribute("data-height", _height);
      });

    this.episodes[0].style.height =
      this.episodes[0].getAttribute("data-height") + "px";
  };

  protected getYouTubeUrl = (id: string): string =>
    `https://www.youtube.com/embed/${id}?rel=0&amp;showinfo=0`;

  protected getVimeoUrl = (id: string): string =>
    `https://player.vimeo.com/video/${id}`;

  protected switchVideo = (id, type = "youtube") => {
    const url =
      type === "vimeo" ? this.getVimeoUrl(id) : this.getYouTubeUrl(id);
    this.videoPlayerRef.nativeElement.setAttribute("src", url);
  };
}

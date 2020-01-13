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

  @ViewChild("containerRef", { static: false }) containerRef: ElementRef;
  @ViewChild("videoBoxRef", { static: false }) videoBoxRef: ElementRef;
  @ViewChild("videoPlayerRef", { static: false }) videoPlayerRef: ElementRef;
  @ViewChild("videosListRef", { static: false }) videosListRef: ElementRef;
  @ViewChild("chaptersRef", { static: false }) chaptersRef: ElementRef;

  ngOnInit() {}

  ngAfterViewInit() {
    this.setVideosListStyles();

    const headers = [
      ...this.containerRef.nativeElement.querySelectorAll(".chapter-header")
    ];
    console.log(headers);
    const episodes = [
      ...this.containerRef.nativeElement.querySelectorAll(".episodes")
    ];
    console.log(episodes);
  }

  private setVideosListStyles(): void {
    this.listStyles = {
      height: `${this.videoPlayerRef.nativeElement.scrollHeight}px`,
      overflow: "scroll"
    };
    console.log(this.videosListRef.nativeElement.style);
    Object.assign(this.videosListRef.nativeElement.style, this.listStyles);
  }

  protected getYouTubeUrl = (id: string): string =>
    `https://www.youtube.com/embed/${id}?rel=0&amp;showinfo=0`;

  protected getVimeoUrl = (id: string): string =>
    `https://player.vimeo.com/video/${id}`;
}

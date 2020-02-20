import { BrowserModule } from "@angular/platform-browser";
import { NgModule, Injector } from "@angular/core";
import { createCustomElement } from "@angular/elements";
import { PlaylistsComponent } from "./playlists/playlists.component";

@NgModule({
  declarations: [PlaylistsComponent],
  imports: [BrowserModule],
  entryComponents: [PlaylistsComponent],
  providers: []
})
export class AppModule {
  constructor(private injector: Injector) {}

  ngDoBootstrap() {
    const el = createCustomElement(PlaylistsComponent, {
      injector: this.injector
    });
    customElements.define("play-lists", el);
  }
  
}
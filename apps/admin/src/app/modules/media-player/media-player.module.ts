import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MediaPlayerRoutingModule } from './media-player-routing.module';
import { AudioPlayerComponent } from './components/audio-player/audio-player.component';
import { VideoPlayerComponent } from './components/video-player/video-player.component';
import { ImageViewerComponent } from './components/image-viewer/image-viewer.component';
import {UploadsModule} from "../uploads/uploads.module";
import {MatCardModule} from "@angular/material/card";

@NgModule({
  declarations: [AudioPlayerComponent, VideoPlayerComponent, ImageViewerComponent],
  imports: [
    CommonModule,
    MediaPlayerRoutingModule,
    MatCardModule,
    UploadsModule
  ]
})
export class MediaPlayerModule { }

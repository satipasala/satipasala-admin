import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FILE_MANAGEMENT_AUDIO_FILES_ROUTE} from "../../app-routs";
import {AudioPlayerComponent} from "./components/audio-player/audio-player.component";

const routes: Routes = [
  {path: FILE_MANAGEMENT_AUDIO_FILES_ROUTE, component: AudioPlayerComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MediaPlayerRoutingModule { }

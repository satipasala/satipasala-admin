import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'admin-audio-player',
  templateUrl: './audio-player.component.html',
  styleUrls: ['./audio-player.component.scss']
})
export class AudioPlayerComponent implements OnInit {

  msbapTitle = 'Nalanda College School Anthem';
  msbapAudioUrl = 'https://firebasestorage.googleapis.com/v0/b/sathipasala-41bb8.appspot.com/o/Nalanda%20College%20Colombo%20School%20Anthem.mp3?alt=media&token=b6fa0cad-a79c-4f13-be69-6063e6cfb14e';
  msbapDisplayTitle = true;
  fileType = "audio/*"

  constructor() { }

  ngOnInit() {
  }

}

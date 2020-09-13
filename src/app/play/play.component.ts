import { Component, OnInit } from '@angular/core';

const VID_URL = 'https://bitdasha.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss']
})
export class PlayComponent implements OnInit {

  options

  constructor() { }

  ngOnInit(): void {
    this.options = this.getVjsOptions();
  }

  getVjsOptions() {
    return ({
      fluid: true,
      autoplay: true,
      controls: true,
      sources: [{
        src: VID_URL,
        type: 'application/x-mpegURL',
        withCredentials: true,
      }],
      Html5: {
        vhs: {
          withCredentials: true,
        }
      },
    });
  }
}

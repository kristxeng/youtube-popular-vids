import { VidItem } from './../core/models/youtube-response.interface';
import { DataHandlerService } from './../core/services/data-handler.service';
/**
 * Video.js and Angular integration
 * from https://docs.videojs.com/tutorial-angular.html
 */

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';

const VID_URL = 'https://bitdasha.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8';
const VID_URL2 = 'https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss']
})
export class PlayComponent implements OnInit {

  options

  vid: VidItem;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly dataHandler: DataHandlerService,
  ) { }

  ngOnInit(): void {
    this.options = this.getVjsOptions();
    this.route.queryParams.pipe(
      map( params => params.id),
      switchMap( id => this.dataHandler.vids$.pipe(
          map(vids => vids.find(vid => vid.id === id))
      ))
    ).subscribe( vid => this.vid = vid);
  }

  getVjsOptions() {
    return ({
      fluid: true,
      autoplay: true,
      controls: true,
      sources: [{
        src: VID_URL2,
        type: 'application/x-mpegURL',
      }],
      Html5: {
        vhs: {
          withCredentials: false,
        }
      },
    });
  }
}

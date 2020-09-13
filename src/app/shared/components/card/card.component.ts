import { Component, OnInit, Input } from '@angular/core';
import { VidItem, VidSnippet, VidContentDetails } from 'src/app/core/models/youtube-response.interface';
import { DataHandlerService } from 'src/app/core/services/data-handler.service';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {

  @Input() data;

  videoInfo: VidSnippet;
  thumbnailsUrl: string;
  contentDetails: VidContentDetails;
  durationStr: string;

  faBookmark = faBookmark;

  constructor(private readonly dataHandler: DataHandlerService) { }

  ngOnInit(): void {
    this.initData();
  }

  private initData(): void {
    this.videoInfo = this.data.snippet;
    this.thumbnailsUrl = this.videoInfo.thumbnails.medium.url;
    this.contentDetails = this.data.contentDetails;
    this.durationStr = this.dataHandler.parseDuration(this.data.contentDetails.duration);
  }

}

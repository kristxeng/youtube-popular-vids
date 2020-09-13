import { Component, OnInit, Input } from '@angular/core';
import { VidSnippet, VidContentDetails, VidItem } from 'src/app/core/models/youtube-response.interface';
import { DataHandlerService } from 'src/app/core/services/data-handler.service';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {

  faBookmark = faBookmark;

  @Input() data: VidItem;

  videoInfo: VidSnippet;
  thumbnailsUrl: string;
  contentDetails: VidContentDetails;
  durationStr: string;

  isCollected: boolean;

  constructor(private readonly dataHandler: DataHandlerService) { }

  ngOnInit(): void {
    this.initData();
  }

  onBookmarkClick(): void {
    if (this.isCollected) {
      this.dataHandler.removeFromCollection(this.data.id);
      Swal.fire(this.dataHandler.getAlertInfo('remove'));
    } else {
      this.dataHandler.addToCollection(this.data);
      Swal.fire(this.dataHandler.getAlertInfo('add'));
    }

    this.isCollected = !this.isCollected;
  }

  private initData(): void {
    this.videoInfo = this.data.snippet;
    this.thumbnailsUrl = this.videoInfo.thumbnails.medium.url;
    this.contentDetails = this.data.contentDetails;
    this.durationStr = this.dataHandler.parseDuration(this.data.contentDetails.duration);
    this.isCollected = this.dataHandler.isInCollection(this.data.id);
  }
}

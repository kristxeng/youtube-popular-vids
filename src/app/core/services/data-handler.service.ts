import { GoogleYoutubeApiService } from './google-youtube-api.service';
import { VidItem } from './../models/youtube-response.interface';
import { Injectable } from '@angular/core';
import { SweetAlertOptions } from 'sweetalert2';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';


const COLLECTION_KEY = 'collectionVids';

@Injectable({
  providedIn: 'root'
})
export class DataHandlerService {

  vids$: Observable<VidItem[]>;
  collectionVids: Array<VidItem>;

  constructor(
    private readonly apiService: GoogleYoutubeApiService,
  ) {
    this.initVids$();
    this.initCollectionVids();
  }

  parseDuration(duration: string): string {
    if (!duration) { return; }
    const re = /P(?:([0-9]+)D)*T(?:([0-9]+)H)*(?:([0-9]+)M)*(?:([0-9]+)S)*/;
    return duration.replace(re, (str, day, hour, min, sec) => {
      const dayStr = day ? (day + 'days ') : '';
      const hourStr = hour ? (hour + ':') : '';
      const minStr = (min ? min : 0) + ':';

      return dayStr + hourStr + minStr + sec;
    });
  }

  getAlertInfo(isBookmarked: boolean): SweetAlertOptions {
    if (isBookmarked) {
      return ({
        title: 'Removed from Collection',
        icon: 'warning',
        confirmButtonText: 'OK'
      });
    } else {
      return ({
        title: 'Saved to Collection',
        icon: 'success',
        confirmButtonText: 'OK'
      });
    }
  }

  isInCollection(id: string) {
    return this.collectionVids.findIndex( item => item.id === id) >= 0;
  }

  addToCollection(vidItem: VidItem) {
    const collectionIds = this.collectionVids.map(item => item.id);
    const isExisting = collectionIds.includes(vidItem.id);
    if (isExisting) {
      console.warn('vid id has been in collection!');
      return;
    }

    this.collectionVids.push(vidItem);
    console.log(this.collectionVids)
    this.setLocalStorage(this.collectionVids);
  }

  removeFromCollection(vidId: string) {
    const collectionIds = this.collectionVids.map(item => item.id);
    const isExisting = collectionIds.includes(vidId);
    if (!isExisting) {
      console.warn('vid is not in collection!');
      return;
    }

    this.collectionVids = this.collectionVids.filter(item => item.id !== vidId);
    this.setLocalStorage(this.collectionVids);
  }

  private initVids$() {
    this.vids$ = this.apiService.getList().pipe(map(res => res.items));
  }

  private initCollectionVids() {
    const vids = JSON.parse(localStorage.getItem(COLLECTION_KEY));
    if (vids) {
      this.collectionVids = vids;
    } else {
      this.collectionVids = [];
      this.setLocalStorage([]);
    }
  }

  private setLocalStorage(vids) {
    const vidsStrng = JSON.stringify(vids);
    localStorage.setItem(COLLECTION_KEY, vidsStrng);
  }
}

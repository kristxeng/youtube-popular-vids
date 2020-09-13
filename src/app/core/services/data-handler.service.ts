import { GoogleYoutubeApiService } from './google-youtube-api.service';
import { VidItem } from './../models/youtube-response.interface';
import { Injectable } from '@angular/core';
import { SweetAlertOptions } from 'sweetalert2';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';


const COLLECTION_KEY = 'collectionVids';

interface CollectionVids {
  data: VidItem[],
  update: boolean,
}

@Injectable({
  providedIn: 'root'
})
export class DataHandlerService {

  vids$: Observable<VidItem[]>;
  collectionVids$ = new BehaviorSubject<CollectionVids>(null);

  constructor(
    private readonly apiService: GoogleYoutubeApiService,
  ) {
    this.initVids$();
    this.initCollectionVids();

    this.collectionVids$.pipe(
      filter(item => !!item),
      filter(item => item.update),
    ).subscribe(item => {
      this.setLocalStorage(item.data);
    });
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

  isInCollection(id: string) {
    return this.collectionVids$.value.data.findIndex( item => item.id === id) >= 0;
  }

  getAlertInfo(option: 'add' | 'remove'): SweetAlertOptions {
    switch (option) {
      case 'add':
        return ({
          title: 'Saved to Collection',
          icon: 'success',
          confirmButtonText: 'OK'
        });

      case 'remove':
        return ({
          title: 'Removed from Collection',
          icon: 'warning',
          confirmButtonText: 'OK'
        });
    }
  }

  addToCollection(vidItem: VidItem) {
    const collectionIds = this.collectionVids$.value.data.map(item => item.id);
    const isExisting = collectionIds.includes(vidItem.id);
    if (isExisting) {
      console.warn('vid id has been in collection!');
      return;
    }

    const data = this.collectionVids$.value.data;
    data.push(vidItem);
    this.collectionVids$.next({data, update: true});
  }

  removeFromCollection(vidId: string) {
    const collectionIds = this.collectionVids$.value.data.map(item => item.id);
    const isExisting = collectionIds.includes(vidId);
    if (!isExisting) {
      console.warn('vid is not in collection!');
      return;
    }

    const data = this.collectionVids$.value.data.filter(item => item.id !== vidId);
    this.collectionVids$.next({data, update: true});
  }

  private initVids$() {
    this.vids$ = this.apiService.getList().pipe(map(res => res.items));
  }

  private initCollectionVids() {
    const data = JSON.parse(localStorage.getItem(COLLECTION_KEY)) || [];
    this.collectionVids$.next({data, update: false});
  }

  private setLocalStorage(vids) {
    const vidsStrng = JSON.stringify(vids);
    localStorage.setItem(COLLECTION_KEY, vidsStrng);
  }
}

import { GoogleYoutubeApiService } from './google-youtube-api.service';
import { VidItem, VidSnippet } from './../models/youtube-response.interface';
import { Injectable } from '@angular/core';
import { SweetAlertOptions } from 'sweetalert2';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';


const COLLECTION_KEY = 'collectionVidIdss';

interface CollectionIds {
  ids: string[];
  update: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class DataHandlerService {

  vids$: Observable<VidItem[]>;
  collectionVids$: Observable<VidItem[]>;

  private collectionIds$ = new BehaviorSubject<CollectionIds>(null);

  constructor(
    private readonly apiService: GoogleYoutubeApiService,
  ) {
    this.initVids$();
    this.initCollectionIds();
    this.initCollectionVids$();

    this.collectionIds$.pipe(
      filter(item => !!item),
      filter(item => item.update),
    ).subscribe(item => {
      this.setLocalStorage(item.ids);
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

  isIdInCollection(id: string): boolean {
    return this.collectionIds$.value.ids.findIndex( item => item === id) >= 0;
  }

  getAlertInfo(option: 'add' | 'remove'): SweetAlertOptions {
    switch (option) {
      case 'add':
        return ({
          title: 'Saved to Collection',
          icon: 'success',
          confirmButtonText: 'OK',
          heightAuto: false,
        });

      case 'remove':
        return ({
          title: 'Removed from Collection',
          icon: 'warning',
          confirmButtonText: 'OK',
          heightAuto: false,
        });
    }
  }

  addToCollection(vidId: string): void {
    const ids = this.collectionIds$.value.ids;
    const isExisting = ids.includes(vidId);
    if (isExisting) {
      console.warn('vid id has been in collection!');
      return;
    }


    ids.push(vidId);
    this.collectionIds$.next({ids, update: true});
  }

  removeFromCollection(vidId: string): void {
    let ids = this.collectionIds$.value.ids;
    const isExisting = ids.includes(vidId);
    if (!isExisting) {
      console.warn('vid is not in collection!');
      return;
    }

    ids = ids.filter(item => item !== vidId);
    this.collectionIds$.next({ids, update: true});
  }

  getSpecificVidSnippet$(id: string): Observable<VidSnippet> {
    return this.apiService.getlistByIds([id]).pipe(
      map(res => res.items[0].snippet),
    );
  }

  private initVids$(): void {
    this.vids$ = this.apiService.getList().pipe(map(res => res.items));
  }

  private initCollectionVids$(): void {
    this.collectionVids$ = this.collectionIds$.pipe(
      map(data => data.ids),
      tap(console.log),
      switchMap(ids => {
        if (ids && ids.length) {
          return this.apiService.getlistByIds(ids).pipe(map(res => res.items));
        } else {
          return of([]);
        }
      })
    );
  }

  private initCollectionIds(): void {
    const ids = JSON.parse(localStorage.getItem(COLLECTION_KEY)) || [];
    this.collectionIds$.next({ids, update: false});
  }

  private setLocalStorage(vidIds): void {
    const vidIdsStrng = JSON.stringify(vidIds);
    localStorage.setItem(COLLECTION_KEY, vidIdsStrng);
  }
}

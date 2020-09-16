import { GoogleApi } from '../constants/google-api';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { YoutubeResponse } from '../models/youtube-response.interface';

@Injectable({
  providedIn: 'root'
})
export class GoogleYoutubeApiService {

  constructor(
    private readonly httpClient: HttpClient,
  ) { }

  getList(): Observable<YoutubeResponse> {
    const params = this.getListParams();

    return this.httpClient.get<YoutubeResponse>(GoogleApi.url, { params });
  }

  getlistByIds(vidIds: string[]): Observable<YoutubeResponse> {
    const params = this.getIdsParams(vidIds);

    return this.httpClient.get<YoutubeResponse>(GoogleApi.url, { params });
  }


  private getListParams(): HttpParams {
    return new HttpParams()
      .set('part', 'snippet,contentDetails')
      .set('chart', 'mostPopular')
      .set('maxResults', '100')
      .set('regionCode', 'TW')
      .set('key', GoogleApi.token);
  }

  private getIdsParams(vidIds: string[]): HttpParams {
    const idsString = vidIds.toString();
    return new HttpParams()
      .set('part', 'snippet,contentDetails')
      .set('id', idsString)
      .set('key', GoogleApi.token);
  }
}

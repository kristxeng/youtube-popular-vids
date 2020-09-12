import { GoogleApi } from '../constants/google-api';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { YoutubeResponse } from '../models/youtube-response.interface';

@Injectable({
  providedIn: 'root'
})
export class GoogleYoutubeApiService {

  constructor(
    private readonly httpClient: HttpClient,
  ) { }

  getList(): Observable<YoutubeResponse> {
    const params = this.getParams();

    return this.httpClient.get<YoutubeResponse>(GoogleApi.url, { params });
  }

  getParams(): HttpParams {
    return new HttpParams()
      .set('part', 'snippet,contentDetails')
      .set('chart', 'mostPopular')
      .set('maxResults', '100')
      .set('regionCode', 'TW')
      .set('key', GoogleApi.token);
  }
}

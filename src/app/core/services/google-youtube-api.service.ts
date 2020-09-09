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
    let params = new HttpParams();

    params = params.append('part', 'snippet,contentDetails');
    params = params.append('chart', 'mostPopular');
    params = params.append('maxResults', '1');
    params = params.append('key', GoogleApi.token);

    return params;
  }
}

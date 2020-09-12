import { VidItem } from 'src/app/core/models/youtube-response.interface';
import { Component, OnInit } from '@angular/core';
import { GoogleYoutubeApiService } from '../core/services/google-youtube-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  data: Array<VidItem>;

  constructor(
    private readonly apiService: GoogleYoutubeApiService,
  ) { }

  ngOnInit(): void {
    this.apiService.getList().subscribe( res => this.data = res.items );
  }

}

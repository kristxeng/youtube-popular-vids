import { VidItem } from 'src/app/core/models/youtube-response.interface';
import { Component, OnInit } from '@angular/core';
import { GoogleYoutubeApiService } from '../core/services/google-youtube-api.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  data: Array<VidItem>;

  pageNum: number;

  constructor(
    private readonly apiService: GoogleYoutubeApiService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.pageNum = params.page;
    });

    this.apiService.getList().subscribe( res => this.data = res.items );
  }

  onPageChange(pageNum): void {
    this.pageNum = pageNum;
    this.router.navigate(['.'], {queryParams: {page: pageNum}});
  }
}

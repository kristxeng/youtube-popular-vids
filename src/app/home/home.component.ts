import { DataHandlerService } from 'src/app/core/services/data-handler.service';
import { VidItem } from 'src/app/core/models/youtube-response.interface';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  data$: Observable<VidItem[]>;

  pageNum: number;

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly dataHandler: DataHandlerService,
  ) { }

  ngOnInit(): void {
    this.data$ = this.dataHandler.vids$;
    this.route.queryParams.subscribe(params => {
      this.pageNum = params.page;
    });
  }

  onPageChange(pageNum): void {
    this.pageNum = pageNum;
    this.router.navigate(['.'], {queryParams: {page: pageNum}});
  }
}

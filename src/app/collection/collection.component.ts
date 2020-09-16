import { DataHandlerService } from 'src/app/core/services/data-handler.service';
import { VidItem } from './../core/models/youtube-response.interface';
import { Component, OnInit } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss']
})
export class CollectionComponent implements OnInit {

  faTimes = faTimes;

  data$: Observable<VidItem[]>;

  constructor(
    private readonly router: Router,
    private readonly dataHandler: DataHandlerService,
  ) { }

  ngOnInit(): void {
    this.data$ = this.dataHandler.collectionVids$;
  }

  onRemoveClick(vidId: string): void {
    this.dataHandler.removeFromCollection(vidId);
    Swal.fire(this.dataHandler.getAlertInfo('remove'));
  }

  onImgClick(id: string) {
    const queryParams = {id};
    this.router.navigate(['/play'], { queryParams });
  }

}

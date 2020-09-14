import { DataHandlerService } from 'src/app/core/services/data-handler.service';
import { VidItem } from './../core/models/youtube-response.interface';
import { Component, OnInit } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss']
})
export class CollectionComponent implements OnInit {

  faTimes = faTimes;

  data$: Observable<VidItem[]>;

  constructor(
    private readonly dataHandler: DataHandlerService,
  ) { }

  ngOnInit(): void {
    this.data$ = this.dataHandler.collectionVids$;
  }

  onRemoveClick(vidId: string): void {
    this.dataHandler.removeFromCollection(vidId);
    Swal.fire(this.dataHandler.getAlertInfo('remove'));
  }

}

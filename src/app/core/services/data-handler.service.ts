import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataHandlerService {

  constructor() { }

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
}

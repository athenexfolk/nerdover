import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'relativeTime',
  standalone: true,
})
export class RelativeTimePipe implements PipeTransform {
  transform(value: Date) {
    if (!(value instanceof Date)) value = new Date(value);

    let seconds: number = Math.floor(
      (new Date().getTime() - value.getTime()) / 1000
    );
    let interval: number = Math.floor(seconds / 31536000);

    if (interval >= 1) {
      return interval + ' ปีที่แล้ว';
    }
    interval = Math.floor(seconds / 2592000);

    if (interval >= 1) {
      return interval + ' เดือนที่แล้ว';
    }
    interval = Math.floor(seconds / 86400);

    if (interval >= 1) {
      return interval + ' วันที่แล้ว';
    }
    interval = Math.floor(seconds / 3600);

    if (interval >= 1) {
      return interval + ' ชั่วโมงที่แล้ว';
    }
    interval = Math.floor(seconds / 60);

    if (interval >= 1) {
      return interval + ' นาทีที่แล้ว';
    }
    return Math.floor(seconds) + ' วินาทีที่แล้ว';
  }
}

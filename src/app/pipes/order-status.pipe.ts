import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderStatus'
})
export class OrderStatusPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if(value === 0)
      return 'New'
    if(value === 1)
      return 'Accepted and Delivering'
    if(value === 2)
      return 'Done'
  }

}

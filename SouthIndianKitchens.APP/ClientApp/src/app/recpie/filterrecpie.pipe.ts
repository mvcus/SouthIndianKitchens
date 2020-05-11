

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterimages'
})
export class FilterimagesPipe implements PipeTransform {
  transform(items: any[], recpie: string): any {

    if (recpie === 'all') { return items } else
      return items.filter(item => {
        return item.Time === recpie;
      });


  }

}


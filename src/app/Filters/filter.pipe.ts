import { Pipe, PipeTransform } from "@angular/core";
@Pipe({
  name: "filterVideos"
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if (!items) return [];
    if (!searchText) return items;
    searchText = searchText.toLowerCase();
    return items.filter(item => {
      return item.snippet.title.toLowerCase().includes(searchText);
    });
  }
}

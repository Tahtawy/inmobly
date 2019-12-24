import { Pipe, PipeTransform } from "@angular/core";
import ytDurationFormat from "youtube-duration-format";

@Pipe({
  name: "durationFormat"
})
export class DurationFormatPipe implements PipeTransform {
  transform(duration: String): String {
    if (duration) return ytDurationFormat(duration);
  }
}

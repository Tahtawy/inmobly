import { Component, OnInit } from "@angular/core";
import { YoutubeService } from "../../Services/youtube.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  constructor(private youtubeService: YoutubeService) {}

  // Component Data Model.
  videos: Array<any> = [];
  unSortedVideos: Array<any> = [];
  nextPageToken: String = "";
  prevPageToken: String = "";
  searchText: String = "";
  sortType: String = ""; // '' means not sorted, 'asc' means ascending, 'des' means descending
  sortColumn: String = "";

  // Component Methods.
  getChannelVideos(pageToken = "") {
    this.youtubeService.getChannelVideos(pageToken).subscribe(data => {
      this.videos = data["items"];
      this.unSortedVideos = [...this.videos];
      this.sortType = "";
      this.sortColumn = "";
      this.nextPageToken = data["nextPageToken"] || null;
      this.prevPageToken = data["prevPageToken"] || null;
    });
  }
  searchVideos(searchText: String) {
    this.videos.filter(video => {
      return video.snippet.title.includes(searchText);
    });
  }
  sortTitle() {
    if (this.sortColumn === "date" && this.sortType !== "") this.sortType = "";
    this.sortColumn = "title";
    if (this.sortType === "") {
      // Sort Ascending
      this.videos.sort((a, b) =>
        a.snippet.title.localeCompare(b.snippet.title)
      );
      this.sortType = "asc";
    } else if (this.sortType === "asc") {
      // Sort Descending
      this.videos.sort((a, b) =>
        b.snippet.title.localeCompare(a.snippet.title)
      );
      this.sortType = "des";
    } else if (this.sortType === "des") {
      this.videos = this.unSortedVideos;
      this.sortType = "";
    }
  }
  sortPublishDate() {
    if (this.sortColumn === "title" && this.sortType !== "") this.sortType = "";
    this.sortColumn = "date";
    let aDate;
    let bDate;
    if (this.sortType === "") {
      // Sort Ascending
      this.videos.sort((a, b) => {
        let aDate: any = new Date(a.snippet.publishedAt);
        let bDate: any = new Date(b.snippet.publishedAt);
        return aDate - bDate;
      });
      this.sortType = "asc";
    } else if (this.sortType === "asc") {
      // Sort Descending
      this.videos.sort((a, b) => {
        let aDate: any = new Date(a.snippet.publishedAt);
        let bDate: any = new Date(b.snippet.publishedAt);
        return bDate - aDate;
      });
      this.sortType = "des";
    } else if (this.sortType === "des") {
      this.videos = this.unSortedVideos;
      this.sortType = "";
    }
  }

  // Component Life Cycle Hooks.
  ngOnInit() {
    this.getChannelVideos(); // Initially get first page
  }
}

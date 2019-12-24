import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { YoutubeService } from "../../Services/youtube.service";

@Component({
  selector: "app-details",
  templateUrl: "./details.component.html",
  styleUrls: ["./details.component.scss"]
})
export class DetailsComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private youtubeService: YoutubeService
  ) {}

  // Component Data Model.
  videoId: String = "";
  videoRate: String = "";
  videoDetails: Object = {
    snippet: {
      title: "",
      thumbnails: {
        high: {
          url: ""
        }
      }
    }
  };
  videoContentDetails: Object = {
    contentDetails: {
      duration: ""
    }
  };
  videoStatistics: Object = {
    statistics: {
      viewCount: "",
      likeCount: ""
    }
  };

  // Component Methods.
  getVideoDetails() {
    this.youtubeService.getVideoDetails(this.videoId).subscribe(data => {
      this.videoDetails = data["items"][0];
    });
  }
  getVideoContentDetails() {
    this.youtubeService.getVideoContentDetails(this.videoId).subscribe(data => {
      this.videoContentDetails = data["items"][0]["contentDetails"];
    });
  }
  getVideoStatistics() {
    this.youtubeService.getVideoStatistics(this.videoId).subscribe(data => {
      this.videoStatistics = data["items"][0]["statistics"];
    });
  }
  setVideoRate(videoId) {
    let allRates = JSON.parse(window.localStorage.getItem("rates"));
    if (!allRates) {
      allRates = {};
      window.localStorage.setItem("rates", JSON.stringify(allRates));
    }
    allRates[videoId] = this.videoRate;
    window.localStorage.setItem("rates", JSON.stringify(allRates));
  }
  getVideoRate(videoId) {
    let allRates = JSON.parse(window.localStorage.getItem("rates"));
    if (!allRates) {
      this.videoRate = "";
    } else {
      this.videoRate = allRates[videoId];
    }
  }
  addToFavorite() {
    let favoriteList = JSON.parse(window.localStorage.getItem("favoriteList"));
    if (!favoriteList) {
      favoriteList = [];
      window.localStorage.setItem("favoriteList", JSON.stringify(favoriteList));
    }
    if (!favoriteList.includes(this.videoId)) {
      favoriteList.push(this.videoId);
      window.localStorage.setItem("favoriteList", JSON.stringify(favoriteList));
    }
  }
  onRate(event) {
    this.videoRate = event.newValue;
    this.setVideoRate(this.videoId);
  }

  ngOnInit() {
    this.videoId = this.route["params"]["value"]["id"];
    this.getVideoDetails();
    this.getVideoContentDetails();
    this.getVideoStatistics();
    this.getVideoRate(this.videoId);
  }
}

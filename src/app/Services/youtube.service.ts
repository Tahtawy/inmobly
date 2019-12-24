import { Injectable } from "@angular/core";

import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class YoutubeService {
  BASE_URL = "https://content.googleapis.com/youtube/v3";
  API_KEY = "AIzaSyAsDgNseLsnSPEZS0ZyTTSGh0vsr2TeBFk";
  CHANNEL_ID = "UCWv7vMbMWH4-V0ZXdmDpPBA";

  constructor(private httpClient: HttpClient) {}

  public getChannelVideos(pageToken = "") {
    return this.httpClient.get(
      `${this.BASE_URL}/search?part=snippet&type=video&channelId=${this.CHANNEL_ID}&pageToken=${pageToken}&key=${this.API_KEY}`
    );
  }

  public getVideoDetails(videoId) {
    return this.httpClient.get(
      `${this.BASE_URL}/videos?part=snippet&id=${videoId}&key=${this.API_KEY}`
    );
  }

  public getVideoContentDetails(videoId) {
    return this.httpClient.get(
      `${this.BASE_URL}/videos?part=contentDetails&id=${videoId}&key=${this.API_KEY}`
    );
  }

  public getVideoStatistics(videoId) {
    return this.httpClient.get(
      `${this.BASE_URL}/videos?part=statistics&id=${videoId}&key=${this.API_KEY}`
    );
  }
}

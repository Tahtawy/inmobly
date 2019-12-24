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
      `${this.BASE_URL}/search?part=snippet&channelId=${this.CHANNEL_ID}&pageToken=${pageToken}&key=${this.API_KEY}`
    );
  }
}

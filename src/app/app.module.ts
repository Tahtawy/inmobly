import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

// 3rd Parties.
import { RatingModule } from "ng-starrating";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HttpClientModule } from "@angular/common/http";
import { FilterPipe } from "./Filters/filter.pipe";
import { DurationFormatPipe } from "./Filters/youtubeDurationFormat.pipe";
import { HeaderComponent } from "./Components/layout/header/header.component";
import { HomeComponent } from "./Views/home/home.component";
import { DetailsComponent } from "./Views/details/details.component";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    DetailsComponent,
    FilterPipe,
    DurationFormatPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RatingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

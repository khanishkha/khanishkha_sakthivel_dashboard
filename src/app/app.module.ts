import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CourseDetailsComponent } from './course-evaluation/course-details/course-details.component';
import { AssessmentProgressComponent } from './course-evaluation/course-details/assessment-progress/assessment-progress.component';
import { CourseEvaluationComponent } from './course-evaluation/course-evaluation.component';
import { CardComponent } from './components/card/card.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { HttpClientModule } from '@angular/common/http';
import { HichartComponent } from './components/hichart/hichart.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
@NgModule({
  declarations: [
    AppComponent,
    CourseDetailsComponent,
    AssessmentProgressComponent,
    CourseEvaluationComponent,
    CardComponent,    
    HichartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,HighchartsChartModule,HttpClientModule, BrowserAnimationsModule,MatFormFieldModule,MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

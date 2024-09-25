import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// Move the CourseResponse interface outside of the CourseDataService class
export interface CourseResponse {
  [key: string]: {
    course: {};
    assessmentProgress: Array<{ name: string; completion: number }>;
    attendance: {
      dates: string[];
      attendance: number[];
    };
  };
}

@Injectable({
  providedIn: 'root'
})
export class CourseDataService {
  private dataUrl = 'assets/courselist_data.json';
  private courseUrl = 'assets/sample_data.json';

  constructor(private http: HttpClient) {}

  getCourseData(courseCode: string, courseName: string): Observable<any> {
    return this.http.get<CourseResponse>(this.courseUrl).pipe(
      map(response => {
        console.log(response,'res')
        return response[courseCode] || null}) // Filter by course code
    );
  }

  getCourseList(): Observable<any> {
    return this.http.get(this.dataUrl);
  }
}

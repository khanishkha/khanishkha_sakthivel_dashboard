import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { courstData } from '../course-evaluation/course-details/courseData.interface';
// Move the CourseResponse interface outside of the CourseDataService class


@Injectable({
  providedIn: 'root'
})
export class CourseDataService {
  private dataUrl = 'assets/courselist_data.json';
  private courseUrl = 'assets/sample_data.json';

  constructor(private http: HttpClient) {}

  getCourseData(courseCode: string): Observable<any> {
    return this.http.get<courstData>(this.courseUrl).pipe(
      map(response => {
        return response[courseCode] || null}) // Filter by course code

    );
  }

  getCourseList(): Observable<any> {
    return this.http.get(this.dataUrl);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CourseDataService {  

  private dataUrl = 'assets/sample_data.json';

  constructor(private http: HttpClient) {}

  getCourseData(): Observable<any> {
    return this.http.get(this.dataUrl);
  }

}
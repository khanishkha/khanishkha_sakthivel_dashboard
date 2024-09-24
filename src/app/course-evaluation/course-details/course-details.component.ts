import { Component, OnInit } from '@angular/core';
import { CourseDataService } from 'src/app/service/course-data.service';

interface Credits {
  lecture: number;
  tutorial: number;
  practical: number;
  project: number;
  [key: string]: number; // For any additional credits
}

interface CourseData {
  code: string;
  name: string;
  type: string;
  period: string;
  credits: Credits;
  outcomes: string[]; // Assuming outcomes is an array of strings
  mappedOutcomes: string[]; // Assuming mappedOutcomes is also an array of strings
  // Add any other properties you expect from the course data
}


@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.scss']
})
export class CourseDetailsComponent implements OnInit {
  courseData: CourseData | null = null;
  credittotal:number=0
  constructor(private courseService: CourseDataService) {}

  ngOnInit(): void {
    this.courseService.getCourseData().subscribe(data => {
      console.log(data,'data')
      this.courseData = data.course;     
      
    });
  }
  getCreditsArray(): { type: string, value: number }[] {
    if (!this.courseData || !this.courseData.credits) {
      return [];
    }

    const credits = this.courseData.credits;
    return Object.keys(credits).map(key => {     
      return { type: key, value: credits[key] };
    });
  }
 
  calculateTotalCredits(): number {
    if (!this.courseData || !this.courseData.credits) {
      return 0; // Return 0 if no credits are available
    }

    const credits = this.courseData.credits;
    return Object.values(credits).reduce((sum, value) => sum + value, 0);
  }
}

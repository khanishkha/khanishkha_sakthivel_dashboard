import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CourseDataService } from 'src/app/service/course-data.service';

interface Credits {
  lecture: number;
  tutorial: number;
  practical: number;
  project: number;
  [key: string]: number; // For any additional credits
}
 interface AssessmentProgress {
  name: string;         // Name of the assessment (can be an empty string)
  completion: number;   // Completion percentage
}

// Interface for Attendance
 interface Attendance {
  dates: string[];      // Array of date strings
  attendance: number[]; // Array of attendance percentages
}
export interface CourseResponse {
  course: {
    code: string;
    name: string;
    type: string;
    period: string;
    credits: Credits;
    outcomes: string[];
    mappedOutcomes: string[];
  };
  assessmentProgress: AssessmentProgress[]; // Change to array
  attendance: Attendance;
}


@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.scss']
})
export class CourseDetailsComponent implements OnInit {
  courseData!: CourseResponse 
  credittotal:number=0
  courseList={}
  courseNames:string[]=[]
  courseCodes:string[]=[]
  selectedCourseCode:string='BA3102';
  selectedCourseName:string='Quantitative Techniques';
  
  constructor(private courseService: CourseDataService,private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
   
    this.courseService.getCourseList().subscribe(data => {
      //console.log(data,'data')
      this.courseList = data.courseList;     
      this.courseCodes=Object.keys(this.courseList);
      this.courseNames = Object.values(this.courseList);
      this.selectedCourseName=this.courseNames[0]
      this.selectedCourseCode=this.courseCodes[0]     
      this.getCourseData() 
      // this.courseService.getCourseData(this.selectedCourseCode,this.selectedCourseName).subscribe(data => {
      //   this.courseData = data;   
      //   this.cdr.detectChanges(); 
      // });
    });
  }
  getCourseData(){
    this.courseService.getCourseData(this.selectedCourseCode,this.selectedCourseName).subscribe(data => {
      this.courseData = data;   
      this.cdr.detectChanges(); 
    });
  }
  getCreditsArray(): { type: string, value: number }[] {
    if (!this.courseData || !this.courseData.course.credits) {
      return [];
    }

    const credits = this.courseData.course.credits;
    return Object.keys(credits).map(key => {     
      return { type: key, value: credits[key] };
    });
  }
  // onCourseCodeChange(){

  // }
  // onCourseNameChange(){

  // }
  calculateTotalCredits(): number {
    if (!this.courseData || !this.courseData.course.credits) {
      return 0; // Return 0 if no credits are available
    }

    const credits = this.courseData.course.credits;
    return Object.values(credits).reduce((sum, value) => sum + value, 0);
  }
}

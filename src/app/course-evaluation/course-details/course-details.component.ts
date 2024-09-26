import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CourseDataService } from 'src/app/service/course-data.service';
import { CourseResponse } from './courseData.interface';


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
    let indexOfCourseCode=this.courseCodes.indexOf(this.selectedCourseCode)
    this.selectedCourseName=this.courseNames[indexOfCourseCode]
    this.courseService.getCourseData(this.selectedCourseCode).subscribe(data => {
      this.courseData = data;   
      this.cdr.detectChanges(); 
    });
  }
  getCourseCode(){
    let indexOfCourseName=this.courseNames.indexOf(this.selectedCourseName)
    this.selectedCourseCode=this.courseCodes[indexOfCourseName]
    this.getCourseData()
  }
  getCreditsArray(): { type: string, value: number }[] {
    if (!this.courseData || !this.courseData.course.credits) {
      return [];
    }
  
    const credits = this.courseData.course.credits;
    return Object.keys(credits).map(key => {
      return { type: key, value: credits[key] as number };
    });
  }
  
  calculateTotalCredits(): number {
    if (!this.courseData || !this.courseData.course.credits) {
      return 0; // Return 0 if no credits are available
    }
  
    const credits = this.courseData.course.credits;
    return Object.values(credits).reduce((sum, value) => sum + (value as number), 0);
  }
  
}

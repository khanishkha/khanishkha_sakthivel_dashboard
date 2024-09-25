import { ChangeDetectorRef, Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { CourseDataService } from 'src/app/service/course-data.service';
// Interface for Assessment Progress
export interface AssessmentProgress {
  name: string;         // Name of the assessment (can be an empty string)
  completion: number;   // Completion percentage
}

// Interface for Attendance
export interface Attendance {
  dates: string[];      // Array of date strings
  attendance: number[]; // Array of attendance percentages
}

// Update the Course Response interface to include the new interfaces
export interface CourseResponse {
  
   course:{
      code: string;
      name: string;
      type: string;
      period: string;
      credits: {
        lecture: number;
        tutorial: number;
        practical: number;
        project: number;
      };
      outcomes: string[];
      mappedOutcomes: string[];
   },
    assessmentProgress: AssessmentProgress[] // Use the new AssessmentProgress interface
    attendance: Attendance;                    // Use the new Attendance interface
  
}

@Component({
  selector: 'app-assessment-progress',
  templateUrl: './assessment-progress.component.html',
  styleUrls: ['./assessment-progress.component.scss']
})
export class AssessmentProgressComponent implements OnInit {
  @Input() courseCode!: string; // Using '!' for non-null assertion
  @Input() courseName!: string; // Using '!' for non-null assertion
  @Input() courseData!:CourseResponse
  assessmentProgressChart: Highcharts.Options =  {
    chart: {
      type: 'column',
    },    
    xAxis: {
      categories: [],
      title: {
        text: 'Courses',
      },
    },
    
    series: [{
      name: 'Completion',
      data: [],
      type: 'column',
      
    }],
   
  }
  attendanceChart: Highcharts.Options = {
    chart: {
      type: 'line',
    },
    title: {
      text: '',
    },
    xAxis: {
      categories: [], 
      title: {
        text: 'Weeks',
      },
    },
    yAxis: {
      title: {
        text: 'Attendance',
      },
    },
    series: [
      {
        name: 'Attendance',
        data: [],
        type: 'line',
      }
    ],
  };
  assementProgressData!:AssessmentProgress[];
  constructor(private courseService: CourseDataService,private cdr: ChangeDetectorRef) {    
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.courseData) {
      //console.log(this.courseData, 'course data');
      this.initializeCharts(); // Update charts when courseData changes
    }
  }
  private initializeCharts(): void {
    if (this.courseData) {
      this.assementProgressData = this.courseData.assessmentProgress;

      // Update attendanceChart based on courseData
      this.attendanceChart = {
        legend: { enabled: false },
        chart: { type: 'line' },
        title: { text: '' },
        xAxis: {
          categories: this.courseData.attendance.dates,
          title: { text: 'Weeks' },
        },
        yAxis: {
          title: { text: 'Attendance' },
        },
        plotOptions: {
          series: {
              color: '#db34eb'
          }
      },
        series: [
          {
            name: 'Attendance',
            data: this.courseData.attendance.attendance,
            type: 'line',
            marker: {
              enabled: true,
              fillColor: '#030357' // Change this color as needed
          }
          }
        ],
      };

      this.updateAssementProgressData();
      this.cdr.detectChanges();
    }
  }
  ngOnInit(): void {
    if(this.courseData){
      this.assementProgressData=this.courseData?.assessmentProgress
      this.attendanceChart = {
        legend: {
          enabled: false,  // This will hide the legend
        },
        chart: {
          type: 'line',
        },
        title: {
          text: '',
        },
      
        xAxis: {
          categories: this.courseData?.attendance?.dates, 
          title: {
            text: 'Weeks',
          },
        },
        yAxis: {
          title: {
            text: 'Attendance',
          },
        },
        series: [
          {
            name: 'Attendance',
            data: this.courseData?.attendance?.attendance,
            type: 'line',
          }
        ],
      };
  
      this.updateAssementProgressData()
      this.cdr.detectChanges();
     
  }
  }


  updateAssementProgressData(){
    const categories = this.assementProgressData.map(course => course.name);
    const completionData = this.assementProgressData.map(course => ({
      y: course?.completion === 0 ? 100 : course?.completion, // Use 100 for 0% completion
      color: course?.completion === 0 ? '#f0e9e9' : '#91b07c', // Grey for 0 completion
    }));
  
    this.assessmentProgressChart = {
      chart: {
        type: 'column',
      },
      legend: {
        enabled: false,  // This will hide the legend
      },
      title: {
        useHTML: true,
        text: `
          <div style="display: flex; align-items: center;">            
            <div style="width: 20px; height: 10px; background-color: #91b07c; margin: 0 10px;"></div>
             <span>Completed</span>          
            <div style="width: 20px; height: 10px; background-color: #f0e9e9; margin:0px 10px;"></div>
              <span>Pending</span>
          </div>
        `
      },
      xAxis: {
        categories: categories,
        labels:{
         rotation:0,
        
        style:{
          textOverflow:'visible',
          width:200
        }
        },
        title: {
          text: 'Courses',
        },
      },
      yAxis: {
        min: 0,
        max: 100,
        title: {
          text: 'Completion Percentage',
        },
        labels: {
          format: '{value}%',
        },
      },
      series: [{
        name: 'Completion',
        data: completionData,
        type: 'column',
        // dataLabels: {
        //   enabled: true,
        //   format: '{point.y}%', // Show completion percentage on top of columns
        // },
      }],
      tooltip: {
        pointFormat: 'Completion: <b>{point.y}%</b>',
      },
    };
  }
}

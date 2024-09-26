import { ChangeDetectorRef, Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { CourseDataService } from 'src/app/service/course-data.service';
import { AssessmentData, AssessmentProgress } from '../courseData.interface';
import { CourseResponse } from '../courseData.interface';


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
    }, plotOptions: {
      series: {
          color: '#db34eb'
      }
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
      }, {
        name: 'dash',
        data: [],
        type: 'line',
        showInLegend: false,
      }
    ],
  };
  assementProgressData!:AssessmentData[];
   // Correctly inject ChangeDetectorRef
   constructor(private cdr: ChangeDetectorRef) {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.courseData) {
      this.initializeCharts(); // Update charts when courseData changes
    }
  }
  private initializeCharts(): void {
    if (this.courseData) {
      this.assementProgressData = this.courseData?.assessmentProgress?.data;
      const actualData = this.courseData?.attendance?.attendance; // Your existing data
      const lastDataPoint = actualData[actualData.length - 1];
      const dummyDataPoint = lastDataPoint + 10; // or whatever value makes sense
      let dummayDataArr=[]
      for(let i=0 ;i< actualData.length-1;i++){
        dummayDataArr.push(null)
      }
      dummayDataArr.push(lastDataPoint)
      dummayDataArr.push(dummyDataPoint)
     
    
      // Update attendanceChart based on courseData
      this.attendanceChart = {
        chart: {
          type: 'line',
        },
        title: {
          text: '',
        },
        xAxis: {
          categories: this.courseData?.attendance?.dates,//.concat(['To be Continued']), // Add a label for the dummy data
          title: {
            text: 'Weeks',
          },
        },
        yAxis: { 
          min: 0,
          tickInterval: 25,
          max:100,
          title: {
            text: 'Attendance',
          },  labels: {
            format: '{value}%',
          },
        },
        series: [
          {
            name: 'Attendance',
            data: actualData,
            type: 'line',
            marker: {
              enabled: true,
              fillColor: '#030357',
            },
          },
          {
            name: 'Dashed Line',
            type: 'line',
            data:  dummayDataArr,// Keep points for the dashed line
            dashStyle: 'Dash',
            showInLegend: false,
            
          },
        ],
      };
      
      this.updateAssementProgressData();
      
    }
  }
  ngOnInit(): void {
    if(this.courseData){
      this.assementProgressData=this.courseData?.assessmentProgress?.data
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
         labels: {
            format: '{value}%',
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


  updateAssementProgressData() {
    const groups = this.courseData?.assessmentProgress?.groups; // Assuming this is where your group data is located
  const completionData = [];
  
  // Iterate over each group to construct categories and data
  for (const group in groups) {
    if (groups.hasOwnProperty(group)) {
      // Add group label
      completionData.push({ y: null, color: '#f0e9e9' }); // Add a null value for the group label

      // Iterate over each item in the group
      groups[group].forEach((courseName: string) => {
        const course = this.assementProgressData.find(c => c.name === courseName);
        
        if (course) {
          completionData.push({
            y: course.completion === 0 ? 100 : course.completion, // Use 100 for 0% completion
            color: course.completion === 0 ? '#f0e9e9' : '#91b07c', // Grey for 0 completion
          });
        }
      });
    }
  }

  // Set up categories
  const categories = [];
  for (const group in groups) {
    if (groups.hasOwnProperty(group)) {
      categories.push(...groups[group]); // Add course names
      categories.push(group); // Add group label (optional)
    }
  }

    this.assessmentProgressChart = {
      chart: {
        type: 'column',
      },
      legend: {
        enabled: false, // Hide the legend
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
        `,
      },
      xAxis: {
        categories: categories,
        labels: {
          rotation: 0,
          style: {
            textOverflow: 'visible',
            width: 200,
          },
          formatter: function () {
            const groupLabels = Object.keys(groups).map(label => label.toString()); // Ensure all labels are strings
            if (groupLabels.includes(this.value.toString())) { // Convert this.value to string for comparison
              return `<strong>${this.value}</strong>`; // Bold for group labels
            } else {
              return ''; // Hide individual course labels
            }
          }
        },
        
      },
      yAxis: {
        min: 0,
        tickInterval: 25,
        max:100,
       title:{
         text:''
       },
        labels: {
          format: '{value}%',
        },
      },
      series: [{
        name: 'Completion',
        data: completionData,
        type: 'column',
      }],
      tooltip: {
        pointFormat: 'Completion: <b>{point.y}%</b>',
      },
    };
  
    this.cdr.detectChanges(); // Ensure changes are detected
  }
  
}

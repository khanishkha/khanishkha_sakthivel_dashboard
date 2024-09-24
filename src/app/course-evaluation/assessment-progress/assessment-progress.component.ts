import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CourseDataService } from 'src/app/service/course-data.service';
interface assessment {
  name: string;
  completion: number;
}
@Component({
  selector: 'app-assessment-progress',
  templateUrl: './assessment-progress.component.html',
  styleUrls: ['./assessment-progress.component.scss']
})
export class AssessmentProgressComponent implements OnInit {
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
  assementProgressData:assessment[]=[]
  constructor(private courseService: CourseDataService,private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.courseService.getCourseData().subscribe(data => {
      console.log(data, 'data');
      this.assementProgressData=data.assessmentProgress
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
          categories: data.attendance.dates, 
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
            data: data.attendance.attendance,
            type: 'line',
          }
        ],
      };
  
      this.updateAssementProgressData()
      //console.log(this.lineChartOptions,'chart options');
      this.cdr.detectChanges();
      // If you're using change detection or chart update methods, trigger it here
      // Example: this.chart.update(this.lineChartOptions); if chart is an instance of Highcharts.Chart
    });
  }


  updateAssementProgressData(){
    const categories = this.assementProgressData.map(course => course.name);
    const completionData = this.assementProgressData.map(course => ({
      y: course.completion === 0 ? 100 : course.completion, // Use 100 for 0% completion
      color: course.completion === 0 ? '#d3d3d3' : undefined, // Grey for 0 completion
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
            <div style="width: 20px; height: 10px; background-color: green; margin: 0 10px;"></div>
             <span>Completed</span>          
            <div style="width: 20px; height: 10px; background-color: grey; margin:0px 10px;"></div>
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

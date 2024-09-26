export interface AssessmentProgress {
    data: AssessmentData[];
    groups: AssessmentGroups;
  }
  
  export interface AssessmentData {
    name: string;
    completion: number;
  }
  
  export interface AssessmentGroups {
    [groupName: string]: string[];
  }
  
  // Interface for Attendance
  export interface Attendance {
    dates: string[];      // Array of date strings
    attendance: number[]; // Array of attendance percentages
  }

  export interface Credits {
    lecture: number;
    tutorial: number;
    practical: number;
    project: number;
    [key: string]: number; // For any additional credits
  }

  // Update the Course Response interface to include the new interfaces
  export interface CourseResponse { 
    
     course:{
        code: string;
        name: string;
        type: string;
        period: string;
        credits: Credits;
        outcomes: string[];
        mappedOutcomes: string[];
     },
      assessmentProgress: AssessmentProgress // Use the new AssessmentProgress interface
      attendance: Attendance;                    // Use the new Attendance interface
    
  }
   export interface courstData{
    [courseCode: string]: CourseResponse
   }
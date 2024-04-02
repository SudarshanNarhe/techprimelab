export class Project1 {
    project_id!: number;
    project_name!: string;
    reason_id!: number;
    type_id!: number;
    division_id!: number;
    priority_id!: number;
    department_id!: number;
    location_id!: number;
    status_id!: number;
    start_date!: Date;
    end_date!: Date;    
    user_id!: number;
    category_id!:number;
  
    constructor(
      project_id: number,
      project_name: string,
      reason_id: number,
      type_id: number,
      division_id: number,
      priority_id: number,
      department_id: number,
      location_id: number,
      status_id: number,
      start_date: Date,
      end_date: Date,
      user_id: number,
      category_id:number
    ) {
      this.project_id = project_id;
      this.project_name = project_name;
      this.reason_id = reason_id;
      this.type_id = type_id;
      this.division_id = division_id;
      this.priority_id = priority_id;
      this.department_id = department_id;
      this.location_id = location_id;
      this.status_id = status_id;
      this.start_date = start_date;
      this.end_date = end_date;
      this.user_id = user_id;
      this.category_id= category_id;
    }
  }
import { User } from "./User";
import { Category } from "./category";
import { Department } from "./department";
import { Division } from "./division";
import { Location } from "./location";
import { Priority } from "./priority";
import { Reason } from "./reason";
import { Status } from "./status";
import { Types } from "./type";

export class Project {
  project_id!: number;
  project_name!: string;
  reason_id!: Reason;
  type_id!: Types;
  division_id!: Division;
  priority_id!: Priority;
  department_id!: Department;
  location_id!: Location;
  status_id!: Status;
  start_date!: Date;
  end_date!: Date;
  user_id!: User;
  category_id!:Category;
  reason: any;

  constructor(
    project_id: number,
    project_name: string,
    reason_id: Reason,
    type_id: Types,
    division_id: Division,
    priority_id: Priority,
    department_id: Department,
    location_id: Location,
    status_id: Status,
    start_date: Date,
    end_date: Date,
    user_id: User,
    category_id:Category
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

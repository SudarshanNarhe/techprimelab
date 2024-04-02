export class Department {

    department_id!:number;
    department!:string;

    constructor(department_id:number,department:string){
        this.department_id=department_id;
        this.department=department;
    }

}
export class DepartmentSuccess {

    department:string;
    totalProjects:number;
    totalProjectsclosed:number;
    successPercentage:number;

    constructor(totalProjects:number,department:string, totalProjectsclosed:number,
            successPercentage:number){
                this.department=department;
                this.totalProjects=totalProjects;
                this.totalProjectsclosed=totalProjectsclosed;
                this.successPercentage=successPercentage;
    }

}
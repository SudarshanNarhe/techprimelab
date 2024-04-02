export class Location {

    location_id!:number;
    location!:string;

    constructor(location_id:number,location:string){
        this.location_id=location_id;
        this.location=location;
    }

}
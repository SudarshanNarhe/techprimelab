export class Category {

    category_id!:number;
    category!:string;

    constructor(category_id:number,category:string){
        this.category_id=category_id;
        this.category=category;
    }

}
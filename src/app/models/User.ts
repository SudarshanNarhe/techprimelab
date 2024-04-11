import { Role } from "./role";

export class User {
    user_id:number;
    name: string;
    contact: string;
    email: string;
    password: string;
    address: string;
    user_role:string;

    constructor(user_id: number,username: string, contact: string, email: string, password: string, address: string, user_role:string) {
        this.user_id = user_id;
        this.name = username;
        this.contact = contact;
        this.email = email;
        this.password = password;
        this.address = address;
        this.user_role = user_role;

    }
}

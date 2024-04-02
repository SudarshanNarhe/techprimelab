export class User {
    userId:number;
    username: string;
    contact: string;
    email: string;
    password: string;
    address: string;
    user_role:string;

    constructor(userId: number,username: string, contact: string, email: string, password: string, address: string, user_role:string) {
        this.userId = userId;
        this.username = username;
        this.contact = contact;
        this.email = email;
        this.password = password;
        this.address = address;
        this.user_role = user_role;

    }
}

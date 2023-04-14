export interface BasicUser {
    email:string;
    name:string;
    password:string;
}

export interface User extends BasicUser {
    isAdmin:boolean;
    isSeller:boolean;
    createdAt:Date;
    updatedAt:Date;
}

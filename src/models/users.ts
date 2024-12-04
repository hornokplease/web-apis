export interface USER{
    id:number,
    name:string,
    email:string,
    password:string,
    session_token?:string,
    refresh_token?:string,
}
export interface IRegisterUser {
wardData: IWard,
userData: IUserCreation
}
interface IWard{
    name:string,
    city:string,
    state:string,
    country:string
}
interface IUserCreation{
    name:string,
    role:string,
    email:string,
    password:string,
    member_number:string
}
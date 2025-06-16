export interface IRegisterUser {
  wardData: IWard;
  userData: IUserCreation;
}
export interface IWard {
  name: string;
  city: string;
  state: string;
  country: string;
  id: number | null;
  unit_number: string;
}
interface IUserCreation {
  name: string;
  role: string;
  email: string;
  password: string;
  member_number: string;
}

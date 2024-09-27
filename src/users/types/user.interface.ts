
import { Role } from "src/roles/role.enum";

export interface IUser{

    email: string

    password: string

    role: Role[]
}
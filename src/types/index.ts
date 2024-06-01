import {FormControl} from "@angular/forms";

interface Form{
  name: FormControl<string | null>;
  lastName: FormControl<string | null>;
  email: FormControl<string | null>;
  password: FormControl<string | null>;
}

export interface Credentials{
  email: string;
  password: string;
}

interface User extends Credentials{
  name: string;
  lastName: string;
}

export interface GenericObject<T, R>{
  name: T;
  lastName: T;
  email: T;
  password: T;
}

export type FormDto = Form
export type UserDto = User


// user.ts
export class User {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  password: string;
  token: string;

  constructor(data: {
    id: string;
    firstName: string;
    lastName: string;
    age: number;
    email: string;
    password: string;
    token: string;
  }) {
    this.id = data.id;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.age = data.age;
    this.email = data.email;
    this.password = data.password;
    this.token = data.token;
  }
}

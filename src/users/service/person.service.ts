import { Injectable } from "@nestjs/common";
import { Person } from "src/users/interfaces/person.interface";

@Injectable()
export class PersonService {
  private readonly persons: Person[] = [];

  create(person: Person) {
    this.persons.push(person)
  }

  findAll(): Person[] {
    return this.persons
  }

}
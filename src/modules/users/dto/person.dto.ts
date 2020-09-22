import { IsInt, IsString } from "class-validator";

export class PersonDto {
  @IsString({ message: 'name 不能为数字'})
  readonly name: string;

  @IsInt({ message: 'age 必须数字'})
  readonly age: number;
}
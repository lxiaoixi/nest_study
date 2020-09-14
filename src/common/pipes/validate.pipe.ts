import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    console.log('this is validate start');
    if(!metatype || !this.toValidate(metatype)){ 
      return value;
    }

    const object = plainToClass(metatype, value);
    const errors = await validate(object);

    if(errors.length > 0) {
      let errorMsg = '';
      for(const error of errors) {
        errorMsg += Object.values(error.constraints).join('') + ';';
      }
      throw new BadRequestException({ code: 2001, message: errorMsg})
    }

    return value;
  }

  private toValidate(metatype: any): boolean {
    const types: any[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}

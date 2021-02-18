import { IsNotEmpty, IsOptional, IsString, IsNumber } from 'class-validator';

export class CreateDto {
    @IsString()
    @IsNotEmpty({ message: 'projectId 不能为空' })
    projectId: string;

    @IsString()
    @IsNotEmpty({ message: 'projectName 不能为空' })
    projectName: string;
    
    @IsOptional()
    @IsString()
    desc?: string;

    @IsOptional()
    @IsString()
    department?: string;

    @IsOptional()
    @IsString()
    username?: string;

    @IsOptional()
    @IsString()
    email?: string;
}

import { IsNotEmpty, IsNumber, IsString, Min, MinLength } from "class-validator";

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(1)
    title:string;

    @IsNumber()
    @IsNotEmpty()
    @Min(0)
    price:number;

    @IsString()
    desc:string;
}

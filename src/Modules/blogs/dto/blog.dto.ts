import {IsNotEmpty} from "class-validator"
export class BlogDto{
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    content: string;
}
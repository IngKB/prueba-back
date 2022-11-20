import { IsNotEmpty } from 'class-validator';

export class CreatePostDto {

    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    text: string;

    tags?: string[];

    images?: string[];
}

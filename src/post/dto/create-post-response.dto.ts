export class CreatePostResponseDto {

    response: string;
    code: number;
    constructor(response: string, code: number) {
        this.response = response;
        this.code = code;
    }
}

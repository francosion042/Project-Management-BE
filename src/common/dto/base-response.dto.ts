export class BaseResponseDto {
  constructor(
    public status: number,
    public message: string,
    public data: any = null,
  ) {}
}

import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

export class CreateClientDto {
  @IsNumber()
  clientid: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  filelink: string;
}

export class UpdateClientDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  filelink?: string;
}

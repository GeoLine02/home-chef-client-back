import { IsNumber, IsString } from 'class-validator';

export class NewAddressDTO {
  @IsString()
  city: string;

  @IsString()
  street: string;

  @IsString()
  neighborhood: string;

  @IsNumber()
  lat: number;

  @IsNumber()
  lng: number;
}

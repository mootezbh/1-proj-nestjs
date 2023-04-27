import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString, MaxLength } from 'class-validator';
export class CreateProductDto {
  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly name: string;
  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  @IsString()
  @MaxLength(50)
  @IsNotEmpty()
  readonly description: string;
  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  @IsNotEmpty()
  readonly price: string;
  //@IsNotEmpty()
  //@IsArray()
  image: string[];
}

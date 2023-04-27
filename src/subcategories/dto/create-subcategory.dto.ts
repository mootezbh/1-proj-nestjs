import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
export class CreateSubcategoryDto {
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
  readonly category: string;
}

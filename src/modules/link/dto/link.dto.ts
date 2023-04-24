import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddLinkDTO {
  @ApiProperty({
    description: 'link to encode',
    type: 'string',
  })
  @IsNotEmpty()
  @IsString()
  link: string;
}

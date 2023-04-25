import { IsNotEmpty, IsString, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddLinkDTO {
  @ApiProperty({
    description: 'link to encode',
    type: 'string',
  })
  @IsNotEmpty()
  @IsString()
  @IsUrl()
  link: string;
}

export class ViewLinkDTO {
  @ApiProperty({
    description: 'code/shortlink to decode',
    type: 'string',
  })
  @IsNotEmpty()
  @IsString()
  short_link: string;
}

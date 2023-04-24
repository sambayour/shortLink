import { Body, Controller, Post } from '@nestjs/common';
import { LinkService } from './link.service';
import { AddLinkDTO } from './dto/link.dto';

@Controller('link')
export class LinkController {
  constructor(private readonly linkService: LinkService) {}

  @Post()
  async createLink(@Body() payload: AddLinkDTO) {
    try {
      return this.linkService.createLink(payload);
    } catch (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        throw new Error('duplicate');
      } else {
        throw new Error('operation failed');
      }
    }
  }
}

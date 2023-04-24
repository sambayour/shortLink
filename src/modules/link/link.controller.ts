import { Body, Controller, Post } from '@nestjs/common';
import { LinkService } from './link.service';
import { AddLinkDTO } from './dto/link.dto';

@Controller('link')
export class LinkController {
  constructor(private readonly linkService: LinkService) {}

  @Post()
  async createLink(@Body() payload: AddLinkDTO) {
    return this.linkService.createLink(payload);
  }
}

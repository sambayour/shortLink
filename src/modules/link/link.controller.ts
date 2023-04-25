import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { LinkService } from './link.service';
import { AddLinkDTO, ViewLinkDTO } from './dto/link.dto';

@Controller()
export class LinkController {
  constructor(private readonly linkService: LinkService) {}

  @Post('/encode')
  async createLink(@Body() payload: AddLinkDTO) {
    return this.linkService.createLink(payload);
  }
  @Post('/decode')
  async viewLink(@Body() payload: ViewLinkDTO) {
    return this.linkService.viewLink(payload);
  }

  @Get('/statistic/:url_path')
  async getStat(@Param('url_path') url_path: string) {
    return this.linkService.getStat(url_path);
  }
}

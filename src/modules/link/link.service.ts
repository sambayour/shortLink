import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Link } from './entity/link.entity';
import { AddLinkDTO, ViewLinkDTO } from './dto/link.dto';
import { Repository } from 'typeorm';
import { codeInLink, randomStr } from 'src/helpers/utility';
import { Ilink } from 'src/commons/interface';

@Injectable()
export class LinkService {
  constructor(
    @InjectRepository(Link) private linkRepository: Repository<Link>,
  ) {
    this.linkRepository = linkRepository;
  }

  async createLink(payload: AddLinkDTO): Promise<Link> {
    const code = randomStr(7);

    const linkPayload: Ilink = {
      code,
      short_link: `${process.env.APP_URL + '/' + code}`,
      link: payload.link,
    };

    return this.linkRepository.save(linkPayload);
  }

  async viewLink(payload: ViewLinkDTO) {
    const { short_link } = payload;

    const code = codeInLink(short_link);

    const res = await this.findLinkByCode(code);
    console.log('res', res);

    this.incrementLinkView(res[0]?.id);

    return res[0]?.link;
  }

  async getStat(url_path: string) {
    const code = codeInLink(url_path);

    const res = await this.findLinkByCode(code);
    const resp = await this.findLinkByShortUrl(url_path);

    return res[0] || resp[0];
  }

  async findLinkByCode(code: string) {
    return this.linkRepository.findBy({ code });
  }

  async findLinkByShortUrl(short_link: string) {
    return this.linkRepository.findBy({ short_link });
  }

  async incrementLinkView(id: string) {
    this.linkRepository.increment({ id }, 'redirect', 1);
  }
}

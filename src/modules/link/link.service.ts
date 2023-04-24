import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Link } from './entity/link.entity';
import { AddLinkDTO } from './dto/link.dto';
import { Repository } from 'typeorm';
import { randomStr } from 'src/helpers/utility';
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
}

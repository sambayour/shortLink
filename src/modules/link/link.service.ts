import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Link } from './entity/link.entity';
import { AddLinkDTO } from './dto/link.dto';
import { Repository } from 'typeorm';

@Injectable()
export class LinkService {
  constructor(
    @InjectRepository(Link) private linkRepository: Repository<Link>,
  ) {
    this.linkRepository = linkRepository;
  }

  async createLink(payload: AddLinkDTO): Promise<Link> {
    return this.linkRepository.save(payload);
  }
}

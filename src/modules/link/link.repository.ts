import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Link } from './entity/link.entity';
import { DuplicateDatabaseEntryError } from 'src/enum/db.error.enum';
import { AddLinkDTO } from './dto/link.dto';
@Injectable()
export class LinkRepository extends Repository<Link> {
  async createLink(payload: AddLinkDTO): Promise<Link> {
    const { link } = payload;
    console.log('link.respository', payload);
    const shortLink = this.create({
      link,
    });
    try {
      await this.save(shortLink);
    } catch (err) {
      if (err.code === DuplicateDatabaseEntryError.uniqueErrorKey) {
        throw new ConflictException('Short link already exist!');
      } else {
        throw new InternalServerErrorException();
      }
    }

    return shortLink;
  }
}

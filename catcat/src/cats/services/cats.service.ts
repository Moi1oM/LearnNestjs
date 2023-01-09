import { ReadOnlyCatDto } from './../dto/cat.dto';
import { InjectModel } from '@nestjs/mongoose';
import { CatRequestDto } from '../dto/cats.request.dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Cat } from '../cats.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { CatsRepository } from '../cats.repository';

@Injectable()
export class CatsService {
  constructor(private readonly catsRepository: CatsRepository) {}

  async getAllCat() {
    const allCat = await this.catsRepository.findAll();
    const readOnlyCats = allCat.map((cat) => cat.readOnlyData);
    return readOnlyCats;
  }

  async signUp(body: CatRequestDto) {
    const { email, name, password } = body;
    const isCatExist = await this.catsRepository.existsByEmail(email);

    if (isCatExist) {
      throw new UnauthorizedException('이미 존재하는 고양이입니다.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const cat = await this.catsRepository.create({
      email,
      name,
      password: hashedPassword,
    });

    return cat.readOnlyData;
  }

  logOut() {
    return '프론트에서 jwt제거하세요..ㅎㅎ';
  }

  async uploadImg(cat: Cat, files: Express.Multer.File[]) {
    const fileName = `cats/${files[0].filename}`;
    console.log(fileName);
    const newCat = await this.catsRepository.findByIdAndUpdateImg(
      cat.id,
      fileName,
    );
    console.log(newCat);
    return newCat;
  }
}

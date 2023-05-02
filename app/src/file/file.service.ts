import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class FileService {
  uploadFile(files: Array<Express.Multer.File>) {
    if (!files) {
      throw new BadRequestException('파일이 존재하지 않습니다.');
    }
    return files.map((e) => {
      return { filePath: e.path.substr(11, 100) };
    });
  }
}

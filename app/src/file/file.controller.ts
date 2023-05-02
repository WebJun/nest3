import { Controller, Post, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { AnyFilesInterceptor, FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { FileService } from './file.service';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  //   @Post('upload')
  //   @UseInterceptors(AnyFilesInterceptor())
  //   uploadFile(@UploadedFiles() file: Express.Multer.File) {
  //     return this.fileService.uploadFile(file);
  //   }

  @Post('upload')
  @UseInterceptors(FilesInterceptor('imgfile[]'))
  uploadFile(@UploadedFiles() files: Array<Express.Multer.File>) {
    return this.fileService.uploadFile(files);
  }
}

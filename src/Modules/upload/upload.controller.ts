import { Controller, Post, Req, Res } from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { UploadService } from './upload.service';
import fastify = require('fastify');
import { UploadDto } from './dto/upload.dto';

@ApiTags('Upload')
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Upload Image',
    type: UploadDto,
  })
  @Post('')
  uploadImage(
    @Req() req: fastify.FastifyRequest,
    @Res() res: fastify.FastifyReply<any>,
  ): Observable<any> {
    return this.uploadService.uploadImage(req, res);
  }
}

import { BadRequestException, Injectable } from '@nestjs/common';
import { from, Observable, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import fastify = require('fastify');
import * as util from 'util';
import * as fs from 'fs';
import stream = require('stream');

@Injectable()
export class UploadService {
  uploadImage(
    req: fastify.FastifyRequest,
    res: fastify.FastifyReply<any>,
  ): Observable<any> {
    let filePath;

    const handler = (
      field: string,
      file: any,
      filename: string,
      encoding: string,
      mimetype: string,
      fiedl = 5,
    ) => {
      const extension = filename.split('.').pop();
      const writeStream = fs.createWriteStream(`uploads/${filename}`);

      const pipeline = util.promisify(stream.pipeline);

      filePath = writeStream.path;

      try {
        pipeline(file, writeStream);
      } catch (err) {
        throw new BadRequestException(err);
      }
    };

    const onEnd = (err: any) => {
      // if (err) {
      //   res.send(new BadRequestException());
      //   return;
      // }

      res.code(200).send({});
    };

    return from(req.multipart(handler, onEnd)).pipe(
      map((data) => {
        // console.log(filePath);

        return data;
      }),
    );
  }
}

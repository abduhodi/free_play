import { BadRequestException } from '@nestjs/common';
import { existsSync, mkdir, writeFile } from 'fs';
import * as path from 'path';
import { v4 } from 'uuid';

export async function downloadFile(file: Express.Multer.File): Promise<string> {
  try {
    const filePath = path.resolve(__dirname, '../../', 'data');

    if (!existsSync(filePath)) {
      mkdir(filePath, { recursive: true }, (err) => {
        if (err) {
          console.log(err);
          throw new BadRequestException(err.message);
        }
      });
    }
    const filename = v4() + '.' + file.originalname.split('.').at(-1);
    writeFile(
      path.join(filePath, filename),
      file.buffer,
      { encoding: 'base64' },
      (err) => {
        if (err) {
          console.log(err);
          throw new BadRequestException(err.message);
        }
      },
    );
    return filename;
  } catch (error) {
    console.log(error);
    throw new BadRequestException(error.message);
  }
}

import { InternalServerErrorException } from '@nestjs/common';
import { createReadStream, existsSync, readFile } from 'fs';
import { join, resolve } from 'path';
import { buffer } from 'stream/consumers';

export async function uploadFile(filename: string) {
  const filePath = resolve(__dirname, '../../', 'data');
  const url = join(filePath, filename);
  if (!existsSync(url))
    throw new InternalServerErrorException('image is not found');

  return buffer(createReadStream(url));
}

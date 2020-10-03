import fs from 'fs';
import path from 'path';
import upload from '@config/upload';
import IStorageProvider from '../models/IStorageProvider';


class DiskStorageProvider implements IStorageProvider {
  public async saveFile(file: string): Promise<string> {
    await fs.promises.rename(
      path.resolve(upload.tmpFolder, file),
      path.resolve(upload.uploadFolder, file),
    );

    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    const filePath = path.resolve(upload.uploadFolder, file);

    if (filePath) {
      await fs.promises.unlink(filePath);
    } else {
      return;
    }
  }
}
export default DiskStorageProvider;

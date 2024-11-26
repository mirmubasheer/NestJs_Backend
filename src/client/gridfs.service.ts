import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as mongoose from 'mongoose';
import * as Grid from 'gridfs-stream';
import { GridFSBucket } from 'mongodb';
import { GridFsStorage } from 'multer-gridfs-storage';
import { StorageEngine } from 'multer';

@Injectable()
export class GridFsService {
  private gfs: Grid.Grid;
  private gridFsBucket: GridFSBucket;
  public storage: StorageEngine;

  constructor(private configService: ConfigService) {
    const connection = mongoose.connection;
    connection.once('open', () => {
      this.gridFsBucket = new mongoose.mongo.GridFSBucket(connection.db, {
        bucketName: 'uploads',
      });
      this.gfs = Grid(connection.db, mongoose.mongo);
      this.gfs.collection('uploads');
    });

    this.storage = new GridFsStorage({
      url: this.configService.get<string>('mongodb+srv://srinivasnani005:Pragadanani$5@cluster0.osbiulq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'),
      file: (req, file) => ({
        bucketName: 'uploads',
        filename: `${Date.now()}-${file.originalname}`,
        metadata: { originalname: file.originalname },
      }),
    });
  }

  async findFileById(id: string): Promise<any> {
    return this.gfs.files.findOne({ _id: new mongoose.Types.ObjectId(id) });
  }

  async createReadStreamById(id: string): Promise<any> {
    return this.gridFsBucket.openDownloadStream(new mongoose.Types.ObjectId(id));
  }
}

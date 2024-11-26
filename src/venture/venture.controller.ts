import { Controller, Get, Post, Body, Param, Delete, Put, UploadedFile, UseInterceptors, UseGuards } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { VentureService } from './venture.service';
import { CreateVentureDto } from './dto/create-venture.dto';
import { Venture } from './schema/venture.schema';
import { S3Service } from '../client/s3.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('ventures')
export class VentureController {
  constructor(
    private readonly ventureService: VentureService,
    private readonly s3Service: S3Service,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard) 
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @Body() createVentureDto: CreateVentureDto,
    @UploadedFile() file: Express.Multer.File
  ): Promise<Venture> {
    let fileLink = '';
    if (file) {
      fileLink = await this.s3Service.uploadFile(file);
    }
    createVentureDto.fileLink = fileLink;
    return this.ventureService.create(createVentureDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)  
  findAll(): Promise<Venture[]> {
    return this.ventureService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)  
  findOne(@Param('id') id: string): Promise<Venture> {
    return this.ventureService.findOne(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)  
  @UseInterceptors(FileInterceptor('file'))
  async update(
    @Param('id') id: string,
    @Body() updateVentureDto: CreateVentureDto,
    @UploadedFile() file: Express.Multer.File
  ): Promise<Venture> {
    if (file) {
      updateVentureDto.fileLink = await this.s3Service.uploadFile(file);
    }
    return this.ventureService.update(id, updateVentureDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string): Promise<Venture> {
    return this.ventureService.remove(id);
  }

  @Delete()
  @UseGuards(JwtAuthGuard)  
  async removeAll(): Promise<void> {
    return this.ventureService.removeAll();
  }
}

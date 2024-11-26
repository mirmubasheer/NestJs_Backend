import { Controller, Get, Post, Body, Param, Delete, Put, UploadedFile, UseInterceptors, UseGuards } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ClientService } from './client.service';
import { CreateClientDto, UpdateClientDto } from './dto/create-client.dto';
import { S3Service } from './s3.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('clients')
export class ClientController {
  constructor(
    private readonly clientService: ClientService,
    private readonly s3Service: S3Service,
  ) {}
 
  @Post()
  @UseGuards(JwtAuthGuard)  
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @Body() createClientDto: CreateClientDto,
    @UploadedFile() file: Express.Multer.File
  ): Promise<string> {
    if (file) {
      createClientDto.filelink = await this.s3Service.uploadFile(file);
    }
    await this.clientService.create(createClientDto);
    return 'Client created successfully';
  }

  @Get()
  @UseGuards(JwtAuthGuard)  
  findAll() {
    return this.clientService.findAll();
  }

  @Get(':clientid')
  @UseGuards(JwtAuthGuard) 
  findOne(@Param('clientid') clientid: number) {
    return this.clientService.findOne(clientid);
  }

  @Put(':clientid')
  @UseGuards(JwtAuthGuard) 
  @UseInterceptors(FileInterceptor('file'))
  async update(
    @Param('clientid') clientid: number,
    @Body() updateClientDto: UpdateClientDto,
    @UploadedFile() file: Express.Multer.File
  ): Promise<string> {
    if (file) {
      updateClientDto.filelink = await this.s3Service.uploadFile(file);
    }
    await this.clientService.update(clientid, updateClientDto);
    return `Client with id ${clientid} updated successfully`;
  }

  @Delete(':clientid')
  @UseGuards(JwtAuthGuard) 
  async remove(@Param('clientid') clientid: number): Promise<string> {
    await this.clientService.remove(clientid);
    return `Client with id ${clientid} deleted successfully`;
  }

  @Delete()
  @UseGuards(JwtAuthGuard) 
  async removeAll(): Promise<string> {
    await this.clientService.removeAll();
    return 'All clients deleted successfully';
  }
}

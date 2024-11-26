import { Controller, Get, Post, Body, Param, Delete, Put, ConflictException, UseGuards } from '@nestjs/common';
import { LeadsService } from './leads.service';
import { CreateLeadDto } from './dto/create-lead.dto';
import { Lead } from './schema/lead.schema';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';


@Controller('leads')
export class LeadsController {
  constructor(private readonly leadsService: LeadsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)  
  async create(@Body() createLeadDto: CreateLeadDto): Promise<Lead> {
    try {
      return await this.leadsService.create(createLeadDto);
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      throw error;
    }
  }

  @Get()
  @UseGuards(JwtAuthGuard)  
  findAll(): Promise<Lead[]> {
    return this.leadsService.findAll();
  }

  @Get(':leadId')
  @UseGuards(JwtAuthGuard)  

  findOne(@Param('leadId') leadId: number): Promise<Lead> {
    return this.leadsService.findOne(leadId);
  }

  @Put(':leadId')
  @UseGuards(JwtAuthGuard)  
  async update(
    @Param('leadId') leadId: number,
    @Body() updateLeadDto: CreateLeadDto,
  ): Promise<Lead> {
    return this.leadsService.update(leadId, updateLeadDto);
  }

  @Delete(':leadId')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('leadId') leadId: number): Promise<Lead> {
    return this.leadsService.remove(leadId);
  }

  @Delete()
  @UseGuards(JwtAuthGuard)
  async removeAll(): Promise<{ message: string }> {
    return await this.leadsService.removeAll();
  }
}

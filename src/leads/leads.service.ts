import { Injectable, NotFoundException, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Lead, LeadDocument } from './schema/lead.schema';
import { CreateLeadDto } from './dto/create-lead.dto';

@Injectable()
export class LeadsService {
  constructor(@InjectModel(Lead.name) private leadModel: Model<LeadDocument>) {}

  async create(createLeadDto: CreateLeadDto): Promise<Lead> {
    try {
      const existingLead = await this.leadModel.findOne({ email: createLeadDto.email }).exec();
      if (existingLead) {
        throw new ConflictException(`Lead with email ${createLeadDto.email} already exists`);
      }

      const lastLead = await this.leadModel.findOne().sort('-leadId').exec();
      const nextId = lastLead ? lastLead.leadId + 1 : 1;

      const createdLead = new this.leadModel({
        ...createLeadDto,
        leadId: nextId,
      });

      return await createdLead.save();
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findAll(): Promise<Lead[]> {
    try {
      return await this.leadModel.find().exec();
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findOne(leadId: number): Promise<Lead> {
    try {
      const lead = await this.leadModel.findOne({ leadId }).exec();
      if (!lead) {
        throw new NotFoundException(`Lead with id ${leadId} not found`);
      }
      return lead;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async update(leadId: number, updateLeadDto: CreateLeadDto): Promise<Lead> {
    try {
      const lead = await this.leadModel.findOneAndUpdate({ leadId }, updateLeadDto, { new: true }).exec();
      if (!lead) {
        throw new NotFoundException(`Lead with id ${leadId} not found`);
      }
      return lead;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async remove(leadId: number): Promise<Lead> {
    try {
      const lead = await this.leadModel.findOneAndDelete({ leadId }).exec();
      if (!lead) {
        throw new NotFoundException(`Lead with id ${leadId} not found`);
      }
      return lead;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async removeAll(): Promise<{ message: string }> {
    try {
      const result = await this.leadModel.deleteMany({}).exec();
      if (result.deletedCount === 0) {
        throw new NotFoundException('No leads found');
      }
      return { message: 'All leads have been deleted successfully' };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}

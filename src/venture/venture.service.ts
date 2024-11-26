import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Venture, VentureDocument } from './schema/venture.schema';
import { CreateVentureDto } from './dto/create-venture.dto';

@Injectable()
export class VentureService {
  constructor(@InjectModel(Venture.name) private ventureModel: Model<VentureDocument>) {}

  async create(createVentureDto: CreateVentureDto): Promise<Venture> {
    const createdVenture = new this.ventureModel(createVentureDto);
    return createdVenture.save();
  }

  async findAll(): Promise<Venture[]> {
    return this.ventureModel.find().exec();
  }

  async findOne(id: string): Promise<Venture> {
    const venture = await this.ventureModel.findById(id).exec();
    if (!venture) {
      throw new NotFoundException(`Venture with id ${id} not found`);
    }
    return venture;
  }

  async update(id: string, updateVentureDto: CreateVentureDto): Promise<Venture> {
    const updatedVenture = await this.ventureModel.findByIdAndUpdate(id, updateVentureDto, { new: true }).exec();
    if (!updatedVenture) {
      throw new NotFoundException(`Venture with id ${id} not found`);
    }
    return updatedVenture;
  }

  async remove(id: string): Promise<Venture> {
    const venture = await this.ventureModel.findByIdAndDelete(id).exec();
    if (!venture) {
      throw new NotFoundException(`Venture with id ${id} not found`);
    }
    return venture;
  }

  async removeAll(): Promise<void> {
    await this.ventureModel.deleteMany({}).exec();
  }
}

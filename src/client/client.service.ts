import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Client, ClientDocument } from './schema/client.schema';
import { CreateClientDto, UpdateClientDto } from './dto/create-client.dto';

@Injectable()
export class ClientService {
  constructor(
    @InjectModel(Client.name) private clientModel: Model<ClientDocument>,
  ) {}

  async create(createClientDto: CreateClientDto): Promise<Client> {
    const createdClient = new this.clientModel(createClientDto);

    const nextClientid = await this.clientModel.findOne().sort('-clientid').exec();
    createdClient.clientid = nextClientid ? nextClientid.clientid + 1 : 1;

    return createdClient.save();
  }

  async findAll(): Promise<Client[]> {
    return this.clientModel.find().exec();
  }

  async findOne(clientid: number): Promise<Client> {
    const client = await this.clientModel.findOne({ clientid }).exec();
    if (!client) {
      throw new NotFoundException(`Client with id ${clientid} not found`);
    }
    return client;
  }

  async update(clientid: number, updateClientDto: UpdateClientDto): Promise<Client> {
    const client = await this.clientModel.findOneAndUpdate({ clientid }, updateClientDto, {
      new: true,
    }).exec();
    if (!client) {
      throw new NotFoundException(`Client with id ${clientid} not found`);
    }
    return client;
  }

  async remove(clientid: number): Promise<Client> {
    const client = await this.clientModel.findOneAndDelete({ clientid }).exec();
    if (!client) {
      throw new NotFoundException(`Client with id ${clientid} not found`);
    }
    return client;
  }

  async removeAll(): Promise<void> {
    await this.clientModel.deleteMany({}).exec();
  }
}

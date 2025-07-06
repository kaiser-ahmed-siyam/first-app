import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Click } from './entites/click.entity';
import { Install } from './entites/install.entity';

@Injectable()
export class TrackService {
  private readonly logger = new Logger(TrackService.name);

  constructor(
    @InjectRepository(Click)
    private clickRepository: Repository<Click>,
    @InjectRepository(Install)
    private installRepository: Repository<Install>,
  ) {}

  async getClickCount(): Promise<number> {
    return await this.clickRepository.count();
  }

  async saveClick(clickData: Partial<Click>): Promise<Click> {
    try {
      const click = this.clickRepository.create(clickData);
      const savedClick = await this.clickRepository.save(click);
      this.logger.log(`Click saved successfully: ${savedClick.click_id}`);
      return savedClick;
    } catch (error) {
      this.logger.error(`Error saving click: ${error.message}`, error.stack);
      throw error;
    }
  }

  async getAllClicks(): Promise<Click[]> {
    return await this.clickRepository.find();
  }

  async saveInstall(installData: Partial<Install>): Promise<Install> {
    try {
      this.logger.log(`Attempting to save install with data: ${JSON.stringify(installData)}`);
      
      const install = this.installRepository.create(installData);
      const savedInstall = await this.installRepository.save(install);
      
      this.logger.log(`Install saved successfully: ${savedInstall.install_id}`);
      return savedInstall;
    } catch (error) {
      this.logger.error(`Error saving install: ${error.message}`, error.stack);
      throw error;
    }
  }

  async getInstallCount(): Promise<number> {
    return await this.installRepository.count();
  }

  async getAllInstalls(): Promise<Install[]> {
    return await this.installRepository.find();
  }
}
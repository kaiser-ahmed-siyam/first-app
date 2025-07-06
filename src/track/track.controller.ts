import { Controller, Get, Post, Body, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { TrackService } from './track.service';

@Controller('track')
export class TrackController {
  private readonly logger = new Logger(TrackController.name);

  constructor(private readonly trackService: TrackService) {}

  @Get('test-connection')
  async testConnection() {
    try {
      const clickCount = await this.trackService.getClickCount();
      const installCount = await this.trackService.getInstallCount();
      return { 
        message: 'Connection successful', 
        clickCount, 
        installCount,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      this.logger.error(`Test connection failed: ${error.message}`);
      throw new HttpException('Database connection failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('click')
  async trackClick(@Body() clickData: any) {
    try {
      this.logger.log(`Received click data: ${JSON.stringify(clickData)}`);
      
      // Validate required fields
      if (!clickData.device_id || !clickData.campaign_id) {
        throw new HttpException('Missing required fields: device_id, campaign_id', HttpStatus.BAD_REQUEST);
      }

      const result = await this.trackService.saveClick(clickData);
      return { status: 'success', data: result };
    } catch (error) {
      this.logger.error(`Click tracking failed: ${error.message}`);
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException('Failed to track click', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('clicks')
  async getClicks() {
    try {
      const clicks = await this.trackService.getAllClicks();
      return { status: 'success', data: clicks, count: clicks.length };
    } catch (error) {
      this.logger.error(`Failed to get clicks: ${error.message}`);
      throw new HttpException('Failed to retrieve clicks', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('install')
  async trackInstall(@Body() installData: any) {
    try {
      this.logger.log(`Received install data: ${JSON.stringify(installData)}`);
      
      // Validate required fields
      if (!installData.device_id) {
        throw new HttpException('Missing required field: device_id', HttpStatus.BAD_REQUEST);
      }

      const result = await this.trackService.saveInstall(installData);
      return { status: 'success', data: result };
    } catch (error) {
      this.logger.error(`Install tracking failed: ${error.message}`);
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException('Failed to track install', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('installs')
  async getInstalls() {
    try {
      const installs = await this.trackService.getAllInstalls();
      return { status: 'success', data: installs, count: installs.length };
    } catch (error) {
      this.logger.error(`Failed to get installs: ${error.message}`);
      throw new HttpException('Failed to retrieve installs', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('stats')
  async getStats() {
    try {
      const clickCount = await this.trackService.getClickCount();
      const installCount = await this.trackService.getInstallCount();
      return {
        status: 'success',
        stats: {
          clicks: clickCount,
          installs: installCount,
          conversion_rate: clickCount > 0 ? (installCount / clickCount * 100).toFixed(2) + '%' : '0%'
        }
      };
    } catch (error) {
      this.logger.error(`Failed to get stats: ${error.message}`);
      throw new HttpException('Failed to retrieve stats', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
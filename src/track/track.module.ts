import { Module } from '@nestjs/common';
import { TrackController } from './track.controller';
import { TrackService } from './track.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Click } from './entites/click.entity';
import { Install } from './entites/install.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Click, Install])], // Registers both Click and Install entities
  controllers: [TrackController],
  providers: [TrackService], // Registers TrackService
})
export class TrackModule {}
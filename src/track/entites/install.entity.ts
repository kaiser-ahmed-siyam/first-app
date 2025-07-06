import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('installs')
export class Install {
  @PrimaryGeneratedColumn('uuid')
  install_id: string;

  @Column({ type: 'text' })
  device_id: string;

  @Column({ type: 'text', nullable: true })
  click_id: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  timestamp: Date;

  @Column({ type: 'text', nullable: true })
  campaign_id: string;

  @Column({ type: 'text', nullable: true })
  ad_network: string;

  @Column({ type: 'text', nullable: true })
  attribution_type: string;
}
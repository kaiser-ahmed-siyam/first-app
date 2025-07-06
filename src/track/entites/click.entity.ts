import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('clicks')
export class Click {
  @PrimaryGeneratedColumn('uuid')
  click_id: string;

  @Column({ type: 'text' })
  fingerprint: string;

  @Column({ type: 'text' })
  campaign_id: string;

  @Column({ type: 'text' })
  ad_network: string;

  @Column({ type: 'text' })
  device_id: string;

  @Column({ type: 'text' })
  ip: string;

  @Column({ type: 'text' })
  user_agent: string;

  @Column({ type: 'text' })
  referrer: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  timestamp: Date;
}
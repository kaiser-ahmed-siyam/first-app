-- Table for tracking clicks
CREATE TABLE clicks (
  click_id UUID PRIMARY KEY,
  fingerprint TEXT,
  campaign_id TEXT,
  ad_network TEXT,
  device_id TEXT,
  ip TEXT,
  user_agent TEXT,
  referrer TEXT,
  timestamp TIMESTAMP DEFAULT NOW()
);

-- Table for tracking installs
CREATE TABLE installs (
  install_id UUID PRIMARY KEY,
  device_id TEXT,
  os_version TEXT,
  device_model TEXT,
  bundle_id TEXT,
  timestamp TIMESTAMP DEFAULT NOW(),
  campaign_id TEXT,
  ad_network TEXT,
  attribution_type TEXT
);

-- Indexes for performance
CREATE INDEX idx_clicks_device_id ON clicks (device_id);
CREATE INDEX idx_clicks_timestamp ON clicks (timestamp);
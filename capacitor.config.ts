import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.milkywaycluster.app',
  appName: 'MilkyWayCluster',
  webDir: 'build',
  server: {
    url: 'https://www.milkywaycluster.com',
    cleartext: true
  }
};

export default config;

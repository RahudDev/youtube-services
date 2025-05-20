import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.milkywaycluster.app',
  appName: 'MilkyWayCluster',
  webDir: 'build',
  server: {
    url: 'https://milkywaycluster.com',
    cleartext: false
  }
};

export default config;

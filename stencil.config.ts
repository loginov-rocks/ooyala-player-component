import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'ooyala-player',
  outputTargets: [
    {
      type: 'dist'
    },
    {
      type: 'www',
      serviceWorker: null
    }
  ]
};

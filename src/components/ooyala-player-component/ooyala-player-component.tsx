import { Component, Prop, Watch } from '@stencil/core';

import { Config } from './config';

@Component({
  tag: 'ooyala-player-component',
  styleUrl: 'ooyala-player-component.css',
  shadow: true
})
export class OoyalaPlayerComponent {
  player: any = null;

  @Prop() containerId: string;
  @Prop() embedCode: string;
  @Prop() playerBrandingId: string;
  @Prop() providerCode: string;
  @Prop({ mutable: true }) version: string = Config.defaultVersion;

  @Watch('embedCode')
  watchHandler(newEmbedCode: string, oldEmbedCode: string) {
    if (this.player && newEmbedCode !== oldEmbedCode) {
      this.player.setEmbedCode(newEmbedCode);
    }
  }

  componentDidLoad() {
    // TODO: Prevent embedding scripts and styles when component remounts on the same page.

    if (this.version !== Config.defaultVersion) {
      this.version = 'stable/' + this.version;
    }

    const urlWhereHosted = Config.baseUrl + '/' + this.version + '/';
    const promises = [];

    Config.scripts.forEach((src) => {
      promises.push(new Promise((resolve, reject) => {
        const script = document.createElement('script');

        script.async = false;
        script.onerror = () => reject(new Error(`Can't embed ${src} script`));
        script.onload = resolve;
        script.src = urlWhereHosted + src;

        document.body.appendChild(script);
      }));
    });

    Config.styles.forEach((href) => {
      promises.push(new Promise((resolve, reject) => {
        const link = document.createElement('link');

        link.href = urlWhereHosted + href;
        link.onerror = () => reject(new Error(`Can't embed ${href} style`));
        link.onload = resolve;
        link.rel = 'stylesheet';

        document.body.appendChild(link);
      }));
    });

    // Wait until all resources will be loaded.
    Promise.all(promises)
      .then(() => {
        const ooyala = (window as any).OO;

        ooyala.ready(() => {
          this.player = ooyala.Player.create(this.containerId, this.embedCode, {
            pcode: this.providerCode,
            playerBrandingId: this.playerBrandingId,
            skin: {
              config: urlWhereHosted + Config.skin,
            },
          });
        });
      });
  }

  render() {
    return <slot />;
  }
}

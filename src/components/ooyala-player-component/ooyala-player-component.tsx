import { Component, Prop } from '@stencil/core';

@Component({
  tag: 'ooyala-player-component',
  styleUrl: 'ooyala-player-component.css',
  shadow: true
})
export class OoyalaPlayerComponent {

  @Prop() first: string;
  @Prop() last: string;

  render() {
    return (
      <div>
        Hello, World! I'm {this.first} {this.last}
      </div>
    );
  }
}

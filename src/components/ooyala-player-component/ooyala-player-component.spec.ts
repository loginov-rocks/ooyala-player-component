import { TestWindow } from '@stencil/core/testing';
import { OoyalaPlayerComponent } from './ooyala-player-component';

describe('ooyala-player-component', () => {
  it('should build', () => {
    expect(new OoyalaPlayerComponent()).toBeTruthy();
  });

  describe('rendering', () => {
    let element: HTMLOoyalaPlayerComponentElement;
    let testWindow: TestWindow;
    beforeEach(async () => {
      testWindow = new TestWindow();
      element = await testWindow.load({
        components: [OoyalaPlayerComponent],
        html: '<ooyala-player-component></ooyala-player-component>'
      });
    });

    it('should work without parameters', () => {
      expect(element.textContent.trim()).toEqual('Hello, World! I\'m');
    });

    it('should work with a first name', async () => {
      element.first = 'Peter';
      await testWindow.flush();
      expect(element.textContent.trim()).toEqual('Hello, World! I\'m Peter');
    });

    it('should work with a last name', async () => {
      element.last = 'Parker';
      await testWindow.flush();
      expect(element.textContent.trim()).toEqual('Hello, World! I\'m  Parker');
    });

    it('should work with both a first and a last name', async () => {
      element.first = 'Peter';
      element.last = 'Parker';
      await testWindow.flush();
      expect(element.textContent.trim()).toEqual('Hello, World! I\'m Peter Parker');
    });
  });
});

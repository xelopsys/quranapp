import humps from 'humps';
import { Audio } from 'expo-av';

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const decamelize = (object: Record<string, string>) => {
  if (!(object && !(object instanceof File))) return object;

  if (object instanceof FormData) {
    const formData = new FormData();
    // eslint-disable-next-line no-restricted-syntax
    for (const [key, value] of object.entries) {
      formData.append(humps.decamelize(key), value);
    }
    return formData;
  }

  if (typeof object === 'object') {
    return humps.decamelizeKeys(object);
  }
  return {};
};

class AudioInstance {
  private sound: Audio.Sound;

  constructor() {
    this.sound = new Audio.Sound();
  }

  async loadAsync(uri: string) {
    await this.sound.loadAsync(
      { uri, overrideFileExtensionAndroid: 'mp3' },
      {
        shouldPlay: true,
        isMuted: false,
        androidImplementation: 'MediaPlayer',
      }
    );
  }

  async playAsync() {
    await this.sound.playAsync();
  }
  async pauseAsync() {
    await this.sound.pauseAsync();
  }

  async getUnloadedStatus() {
    return await this.sound.getStatusAsync();
  }

  async stopAsync() {
    await this.sound.stopAsync();
  }

  async unloadAsync() {
    await this.sound.unloadAsync();
  }
  async isLoading() {
    const status = await this.sound.getStatusAsync();
    return status.isLoaded;
  }
}

export { wait, decamelize, AudioInstance };

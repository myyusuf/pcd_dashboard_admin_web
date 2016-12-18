import { guid } from '../Utils';

export default class Splitter {

  constructor() {
    this.id = guid();
  }

  render(container) {
    container.jqxSplitter({ theme: 'metro', width: '100%', height: '100%', panels: [{ size: 200 }] });
  }
}

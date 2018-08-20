import {Position} from './position';

export class ElementSpecs {
  public type = '';
  public position: Position = new Position();
  public data: any;
  constructor(data?: ElementSpecs) {
    if (!data) {
      return;
    }

    this.type = data.type;
    if (data.position) {
      this.position.top = data.position.top;
      this.position.left = data.position.left;
    }
    this.data = data.data;
  }
}

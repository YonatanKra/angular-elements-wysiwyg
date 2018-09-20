import {Position} from './position';

export class ElementSpecs {
  private _id?: string = (Math.random() * 100000 + new Date().getTime()).toString();
  public type = '';
  public position: Position = new Position();
  public data: any;
  public events?: any;

  constructor(data?: any) {
    if (!data) {
      return;
    }

    this.type = data.type;
    if (data.position) {
      this.position.top = data.position.top;
      this.position.left = data.position.left;
    }
    this.data = data.data;
    this.events = data.events;
  }

  get id() {
    return this._id;
  }
}

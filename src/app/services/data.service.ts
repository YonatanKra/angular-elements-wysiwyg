import {EventEmitter, Injectable} from '@angular/core';
import {ElementSpecs} from '../elements/models/element-specs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private _canvasData: Array<ElementSpecs> = [];
  private _createData() {
    const data = [];
    for (let i = 0; i < Math.random() * 100 + 10; i++) {
      data.push(new ElementSpecs());
      data[i].type = Math.random().toString();
    }
    return data;
  }

  public canvasData = new EventEmitter();

  constructor() {

  }

  updateCanvasData(data?: Array<ElementSpecs>) {
    this._canvasData = data;
    this.canvasData.emit(data);
  }

  getCanvasData(cached?: boolean) {
    let canvasData = this._canvasData;
    if (cached !== true) {
      canvasData = this._createData();
    }
    this.updateCanvasData(canvasData);
  }
}

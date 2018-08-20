export class Position {
  private _top = 0;
  private _left = 0;

  set top(val) {
    if (!val || isNaN(val)) {
      val = 0;
    }
    this._top = val;
  }

  get top() {
    return this._top;
  }

  set left(val) {
    if (!val || isNaN(val)) {
      val = 0;
    }
    this._left = val;
  }

  get left() {
    return this._left;
  }

  constructor(top?: number, left?: number) {
    this.top = top;
    this.left = left;
  }
}

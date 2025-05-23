export class Toggler {
  private _active: boolean;

  get active() {
    return this._active;
  }

  constructor(active: boolean = false) {
    this._active = active;
  }

  activate = () => (this._active = true);
  deactivate = () => (this._active = false);
  toggle = () => (this._active = !this._active);
}

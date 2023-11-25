class EventEmitter {
  private _callbacks: { [key: string]: any };

  constructor() {
    this._callbacks = {};
  }

  public on<T extends NonNullable<unknown>>(eventName: string, callback: T) {
    if (!this._callbacks[eventName]) {
      this._callbacks[eventName] = [];
    }
    this._callbacks[eventName].push(callback);
  }

  public off<T extends NonNullable<unknown>>(
    eventName: string,
    callback: (callbackParams: T) => void
  ) {
    if (!this._callbacks[eventName]) return;
    this._callbacks[eventName] = this._callbacks[eventName].filter(
      (registeredEvent) => registeredEvent !== callback
    );
  }

  public emit<T extends NonNullable<unknown>>(eventName: string, data: T) {
    if (!this._callbacks[eventName]) return;

    this._callbacks[eventName].forEach((event) => event(data));
  }
}

export default EventEmitter;

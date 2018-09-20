export class Dispatcher {
  constructor () {
    this.channels = new Map();
    this.listeners = new Map();
    this.connectHandler = this.onConnect.bind(this);
  }
  on (name, handler) {
    if (this.listeners.has(name)) {
      this.listeners.get(name).push(handler);
    } else {
      this.listeners.set(name, [handler]);
    }
  }
  clear (name) {
    this.listeners.delete(name);
  }
  onConnect (channel) {
    this.channels.set(channel.name, channel);
    channel.onMessage.addListener(
      message => this.dispatch(channel.name, message)
    );
  }
  dispatch (name, message) {
    if (this.listeners.has(name)) {
      this.listeners.get(name).forEach(h => h(message));
    }
    if (message && typeof message.type === 'string') {
      let s = name + '.' + message.type
      if (this.listeners.has(s)) {
        this.listeners.get(s).forEach(h => h(message));
      }
    }
    if (message && typeof message.to === 'string') {
      this.send(message.to, message);
    }
  }
  send (name, message) {
    if (this.channels.has(name)) {
      this.channels.get(name).postMessage(message);
    }
  }
}

export class Port {
  constructor (name) {
    this.listeners = new Map();
    this.port = browser.runtime.connect({ name });
    this.port.onMessage.addListener(m => this.dispatch(m));
  }
  dispatch (message) {
    if (
      message && typeof message.type === 'string' &&
      this.listeners.has(message.type)
    ) {
      this.listeners.get(message.type).forEach(h => h(message));
    }
  }
  on (type, handler) {
    if (this.listeners.has(type)) {
      this.listeners.get(type).push(handler);
    } else {
      this.listeners.set(type, [ handler ]);
    }
  }
  send (message) {
    this.port.postMessage(message);
  }
}

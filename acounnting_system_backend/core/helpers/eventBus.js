'use strict';
const EventEmitter = require('events');

class AppEventBus extends EventEmitter {
  constructor() {
    super();
    // Optional: prevent memory leak warnings
    this.setMaxListeners(50);
  }
}

module.exports = new AppEventBus();

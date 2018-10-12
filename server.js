const tcp = require('net');
const Thrift = require('..');
const ThriftClient = require('./client');

class ThriftServer extends tcp.Server {
  constructor(schema) {
    super();
    Object.defineProperty(this, METHODS, { value: [] });
    this.on('connect', socket => {
      const thrift = new Thrift(socket);
      const client = new ThriftClient(thrift, { schema });
      client.on('error', () => client.end());
      this[METHODS].forEach(args => client.register(...args));
    });
  }
}

module.exports = ThriftServer;
class ThriftProtocolError extends Error {
  constructor(message) {
    super(message);
    this.name = 'THRIFT_PROTOCOL_ERROR';
  }
}

class ThriftRangeError extends Error {
  constructor(message) {
    super(message);
    this.name = 'THRIFT_RANGE_ERROR';
  }
}

class ThriftTypeError extends Error {
  constructor(message) {
    super(message);
    this.name = 'THRIFT_TYPE_ERROR';
  }
}

class SocketClosedByBackEnd extends Error {
  constructor() {
    super('socket closed by backend');
    this.name = 'SOCKET_CLOSED_BY_BACKEND';
    this.status = 503;
  }
}

class TApplicationException extends Error {
  static get SCHEMA() {
    let value = [
      { id: '1', name: 'message', type: 'string' },
      { id: '2', name: 'type', type: 'i32' }
    ];
    Object.defineProperty(this, 'SCHEMA', { configurable: true, value });
    return value;
  }
  static get TYPE_ENUM() {
    let value = {
      UNKNOWN: 0,
      UNKNOWN_METHOD: 1,
      INVALID_MESSAGE_TYPE: 2,
      WRONG_METHOD_NAME: 3,
      BAD_SEQUENCE_ID: 4,
      MISSING_RESULT: 5,
      INTERNAL_ERROR: 6,
      PROTOCOL_ERROR: 7
    };
    Object.defineProperty(this, 'TYPE_ENUM', { configurable: true, value });
    return value;
  }
  static get TYPE_ENUM_INV() {
    let value = {};
    let TYPE_ENUM = this.TYPE_ENUM;
    for (let key in TYPE_ENUM) value[TYPE_ENUM[key]] = key;
    Object.defineProperty(this, 'TYPE_ENUM_INV', { configurable: true, value });
    return value;
  }
  constructor(type, message) {
    super(message);
    this.name = TApplicationException.TYPE_ENUM_INV[type];
    this.status = 500;
  }
}


class ThriftClientTimeoutError extends Error {
  constructor(message) {
    super(message || 'ThriftClient call time out');
    this.status = 504;
    this.name = 'THRIFT_CLIENT_TIMEOUT';
  }
}

class ThriftSchemaMismatchRequest extends Error {
  constructor(message) {
    super(message);
    this.status = 400;
    this.name = 'THRIFT_SCHEMA_MISMATCH_REQUEST';
  }
}

class ThriftSchemaMismatchResponse extends Error {
  constructor(message) {
    super(message);
    this.status = 500;
    this.name = 'THRIFT_SCHEMA_MISMATCHING_RESPONSE';
  }
}

module.exports = {
  ThriftProtocolError,
  ThriftRangeError,
  ThriftTypeError,
  SocketClosedByBackEnd,
  TApplicationException,
  ThriftClientTimeoutError,
  ThriftSchemaMismatchRequest,
  ThriftSchemaMismatchResponse
};

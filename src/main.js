var Readable = require('stream').Readable;
var util = require('util');
var _ = require('lodash');

var _defaults = {
  maxBufferSize: 10000
};

function defaults(options) {
  options = options || {};
  _defaults = _.defaults(options, _defaults);
}

function listener(evt) {
  var data = JSON.stringify({
    x: evt.clientX,
    y: evt.clientY,
  }) + '\n';
  if (this._needsPush) {
    this._needsPush = false;
    this.push(data);
  } else {
    while (this._buffer.length >= this._options.maxBufferSize) {
      this._buffer.shift();
    }
    this._buffer.push(data);
  }
}

function MouseStream(options) {
  if (!(this instanceof MouseStream)) {
    return new MouseStream();
  }
  Readable.call(this, {
    objectMode: true
  });
  this._options = _.defaults(options || {}, _defaults);
  this._buffer = [];
  this._needsPush = false;
  this._listener = listener.bind(this);
  document.documentElement.addEventListener('mousemove', this._listener);
}

util.inherits(MouseStream, Readable);

MouseStream.prototype._read = function () {
  var data = this._buffer.shift();
  if (!data) {
    this._needsPush = true;
  } else {
    while (data && this.push(data)) {
      data = this._buffer.shift();
    }
  }
};

MouseStream.prototype.close = function () {
  document.documentElement.removeEventListener('mousemove', this._listener);
  this.push(null);
};

module.exports = MouseStream;
module.exports.defaults = defaults;
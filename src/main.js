var Readable = require('stream').Readable;
var util = require('util');
var _ = require('lodash');

var _defaults = {
  maxBufferSize: 10000,
  serializer: JSON.stringify,
  domElement: document.documentElement
};

function defaults(options) {
  options = options || {};
  _defaults = _.defaults(options, _defaults);
}

function pushData(data) {
  data = this._options.serializer(data) + '\n';
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

function DOMStream(options) {
  if (!(this instanceof DOMStream)) {
    return new DOMStream();
  }
  Readable.call(this, {
    objectMode: true
  });
  this._options = _.defaults(options || {}, _defaults);
  this._buffer = [];
  this._needsPush = false;
  _.forEach(options.events, function (event) {
    event.domElement = event.domElement || this._options.domElement;
    var processer = (event.processer instanceof Array) ?
        function (evt) {
          return _.pick(evt, event.processer);
      } :
        (event.processer || _.constant({}));
    event.listener = function (evt) {
      pushData.call(this, _.defaults(processer(evt), {
        type: event.name
      }));
    }.bind(this);
    event.domElement.addEventListener(event.name, event.listener);
  });
}

util.inherits(DOMStream, Readable);

DOMStream.prototype._read = function () {
  var data = this._buffer.shift();
  if (!data) {
    this._needsPush = true;
  } else {
    while (data && this.push(data)) {
      data = this._buffer.shift();
    }
  }
};

DOMStream.prototype.close = function () {
  _.forEach(this._options.events, function (event) {
    event.domElement.removeEventListener(event.name, event.listener);
  });
  this.push(null);
};

module.exports = DOMStream;
module.exports.defaults = defaults;
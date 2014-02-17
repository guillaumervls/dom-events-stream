DOM Events Stream
=================

Create streams of DOM events (click, scroll, ...)

# Install

`npm install dom-events-stream` ([Browserify](https://github.com/substack/node-browserify))

or include [this script](https://raw.github.com/guillaumervls/dom-events-stream/master/dist/dom-events-stream.js).

# Use

```javascript
var DOMEventStream = require('dom-events-stream').defaults(options);
var s = DOMEventStream(options); // see below for options
s.pipe(/* anywhere you want */);
```

## options

### maxBufferSize [`10000`]
Internal buffer max size (number of events).

### events
An array of events to listen to. Each event must be specifed as an object with
the following attributes :

* `name` : name of the event - **[REQUIRED]**
* `domElement` : element to listen to - defaults to the `domElement` setting (see below)
* `processer` : a function that returns an object from an JS event.
                It will be serialized with the `serializer` setting (see below)

### domElement [`document.documentElement`]
The default DOM Element to listen to events.

### serializer [`JSON.stringify`]
Serializes processed events before pushing them in the stream.


# Licence

The MIT License (MIT)

Copyright (c) 2013 guillaumervls

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
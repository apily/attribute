# attribute

Attribute setter/getter component.

## Installation

    $ npm install attribute

## Test

    $ component install -d
    $ component build -d
    $ open test/index.html

## API

### Attribute(obj)

  The `Attribute` must be used as a mixin.  
  A "plain" object may gain Attribute capabilities,  
  or you may extend an existing prototype.  
  `Attribute`-d objects become [Emitters](https://github.com/component/emitter).  

  As a mixin:

```js
var Attribute = require('attribute');
var user = { id: '007' };
Attribute(user);

user.set('name', 'James');
```

  As a prototype mixin:

```js
var Attribute = require('attribute');
Attribute(User.prototype);
```

### Attribute#get(attribute)

  Return `attribute` value.

### Attribute#set(name_or_obj, value)

  Set `name / value` attribute pair.  
  If an object is passed, set all the `name / value` pairs.  
  Emit `change` event.  
  Emit `chage:[attribute]` event for each attribute setted.  

## License

(The MIT License)

Copyright (c) 2012 Enrico Marino and Federico Spini

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

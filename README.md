gzipme
=======
A simple Node module and CLI which gzip file for you! :)

It's very simple to use it, just follow the documentation below...

## Module Version
### Instalation

``` bash
npm install gzipme
```

### The code
``` javascript
var gzipme = require('gzipme');

gzipme("file.txt"); // it will compress and generate "file.txt.gz" in the same path.

gzipme("file.txt", true); // it will overwrite the "file.txt" replacing to the compressed file.
```

## CLI Version
### Instalation

``` bash
npm install -g gzipme
```

### The Command

``` bash
gzipme file.txt
```
to compress and generate "file.txt.gz" in the same path.

or

``` bash
gzipme -o file.txt
```
to overwrite the "file.txt" replacing to the compressed file.

## Author

Caio Ribeiro Pereira <caio.ribeiro.pereira@gmail.com>
Twitter: <http://twitter.com/crp_underground>
Blog: <http://udgwebdev.com>

## License

The MIT License (MIT)

Copyright (c) 2013 caio.ribeiro.pereira@gmail.com

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
## Gzipme

[![Donate via Paypal](https://img.shields.io/badge/donate-paypal-blue)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=L8MUNAKECUULY&source=url) [![Build Status](https://travis-ci.org/caio-ribeiro-pereira/gzipme.svg?branch=master)](https://travis-ci.org/caio-ribeiro-pereira/gzipme) [![Codacy Badge](https://app.codacy.com/project/badge/Grade/0e2b271a992343e8804ad868a9b17354)](https://www.codacy.com/manual/caio-ribeiro-pereira/gzipme?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=caio-ribeiro-pereira/gzipme&amp;utm_campaign=Badge_Grade) [![Coverage Status](https://coveralls.io/repos/github/caio-ribeiro-pereira/gzipme/badge.svg?branch=master)](https://coveralls.io/github/caio-ribeiro-pereira/gzipme?branch=master) ![npm](https://img.shields.io/npm/dt/gzipme) ![GitHub](https://img.shields.io/github/license/caio-ribeiro-pereira/gzipme) ![npm](https://img.shields.io/npm/v/gzipme) ![GitHub stars](https://img.shields.io/github/stars/caio-ribeiro-pereira/gzipme) ![GitHub forks](https://img.shields.io/github/forks/caio-ribeiro-pereira/gzipme)


## About

A simple and tiny lib/cli for gzip file compression. It's very simple to use it, take a look:

### Instalation

``` bash
npm install gzipme
```

## Module version
### How to use

``` javascript
// Load gzipme module
const gzipme = require('gzipme');

// Compress 'file.txt' to 'file.txt.gz' in the same dir.
gzipme('file.txt');

// Compress 'file.txt' into the same file.
gzipme('file.txt', { overwrite: true });

// Compress 'file.txt' to generate a file named as 'compressed.txt' in the same dir.
gzipme('file.txt', { output: 'compressed.txt' });

// Compress 'file.txt' using best compress mode (few bytes, but slow compression).
gzipme('file.txt', { mode: 'best' });

// Compress 'file.txt' using fast compress mode (fast compression, but more bytes).
gzipme('file.txt', { mode: 'fast' });
```

[Click here](https://nodejs.org/api/zlib.html#zlib_zlib_constants) to understand the Node.js Zlib compreension mode.


## CLI version
### Instalation

``` bash
npm install -g gzipme
```

### All commands

``` bash
# It's the same as function 'gzipme('file.txt')'.
gzipme file.txt
# It's the same as function 'gzipme('file.txt', { overwrite: true });'.
gzipme -o file.txt
# It's the same as function 'gzipme('file.txt', { output: 'compressed.txt' });'.
gzipme -O compressed.txt file.txt
# It's the same as function 'gzipme('file.txt', { mode: 'fast' });'.
gzipme -c best file.txt
# It's the same as function 'gzipme('file.txt', { mode: 'fast' });'.
gzipme -c fast file.txt
```

## Running tests

Just clone this repository, and follow the commands below:
``` bash
git clone git@github.com:caio-ribeiro-pereira/gzipme.git
cd gzipme
npm install
npm test
```

## Author

Caio Ribeiro Pereira <caio.ribeiro.pereira@gmail.com>  
Twitter: <http://twitter.com/crp_underground>  
About me: <https://crpwebdev.github.io>

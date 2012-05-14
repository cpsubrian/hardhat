HardHat
=======

**Scaffolding utility for blue-collar programmers.**

[![Build Status](https://secure.travis-ci.org/cantina/hardhat.png)](http://travis-ci.org/cantina/hardhat)

About / Why?
------------
There are a [few](http://search.npmjs.org/#/scaffold) [other](http://search.npmjs.org/#/scaffolder)
[scaffolding](http://search.npmjs.org/#/scaffoldit) libraries out there, some more recently
updated than others.  One thing most of them share in common is that they all do
a little too much. I don't need option parsing, I can use [optimist](https://github.com/substack/node-optimist).
I don't need a command prompt library, [prompt](https://github.com/flatiron/prompt)
already takes care of that. I don't need cli routing, I'm happy to use
[flatiron](https://github.com/flatiron/flatiron)/[director](https://github.com/flatiron/director).

HardHat aims to solve specific problems and be another tool in your overall
command-line application.


Features
--------

  * `scaffold()`: Copy a directory of scaffold folders & files (templates) to a
    new destination.
      * Your templates can be written using any engine that [consolidate](https://github.com/visionmedia/consolidate.js) supports
        (currently 14 engines including jade, handlebars, etc.)
  * More?  Pull requests welcome :)


Installation
------------
### Install via npm (node package manager) ###
```
$ [sudo] npm install hardhat
```

Usage
------

### hardhat.scaffold ###

The scaffold() method copies files and directories from one location to
another, optionally applying template data to them.

The templating is powered by [consolidate](https://github.com/visionmedia/consolidate.js), so
you can use any of its supported engines (jade, handlebars, ejs, etc.).

```js
var hardhat = require('hardhat');

hardhat.scaffold(<srcDir>, <destDir>, options, function(err) {
  // All done!
});
```

The available options (and their defaults) are:

```js
var options = {
  engine: 'handlebars', // The consolidate-supported template engine to use.
  ext: 'tpl', // The extension prefix to trigger templating (see below).
  encoding: 'utf8', // The file encoding for templates (non templates can be any encoding).
  data: {} // Template data to pass to the engine.
};
```

In order to trigger templating on your source files, you shoud add an extension
prefix matching the options passed or the default.  So for example, if your
source file is `index.html` but you want templating to be applied, you should
name it `index.tpl.html`.  Scaffold will apply the templating and write the
file to the destination as `index.html`, stripping the extension prefix.

If you are happy with the default options and do not have any template data to
pass, you can omit options from the method call like:

```js
var hardhat = require('hardhat');

hardhat.scaffold(<srcDir>, <destDir>, function(err) {
  // All done and used the default options.
});
```

Examples
---------
Coming Soon


Running Tests
-------------
Install dev dependencies:
```
$ [sudo] npm install -d
```

Run the tests:
```
$ make test
```



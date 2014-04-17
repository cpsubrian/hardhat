/**
 * Assert that two directories contain the same files and folders
 * (by file/directory name only, not contents).
 */

var assert = require('assert'),
    path = require('path'),
    fs = require('fs'),
    dive = require('dive');

module.exports = function assertDeepDiveMatches(dirIn, dirOut, matches, ext, done) {
  // Default ext to 'tpl'.
  if (typeof ext === 'function') {
    done = ext;
    ext = 'tpl';
  }
  var ct = 0;

  assert.ok(fs.existsSync(dirIn), 'dirIn does not exist');
  assert.ok(fs.existsSync(dirOut), 'dirOut does not exist');

  dive(dirIn, {all: true, directories: true}, function(err, file) {
    var relative = file.replace(dirIn, '');
    var copied = path.join(dirOut, relative).replace('.' + ext + '.', '.');
    if (pathMatches(file)) {
      assert.ok(fs.existsSync(copied), 'output file `<dirOut>' + copied.replace(dirOut, '') + '` was not copied');
      ct++;
    }
    else {
      assert.ok(!fs.existsSync(copied) || fs.statSync(copied).isDirectory(), 'output file `<dirOut>' + copied.replace(dirOut, '') + '` was erroneously copied');
    }
  }, function() {
    done(null, ct);
  });

  function pathMatches (path) {
    var type = {}.toString.call(matches);
    if (type === '[object RegExp]') {
      return matches.test(path);
    }
    else if (type === '[object String]') {
      return ~path.indexOf(matches);
    }
    else if (type === '[object Function]') {
      return matches(path);
    }
    else {
      throw new Error('Invalid matches format');
    }
  }
};

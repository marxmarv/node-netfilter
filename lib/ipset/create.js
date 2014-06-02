var exec = require('child_process').exec;

/**
 * Create a set identified with setsetname and specified type.
 *
 * @param options
 * @param cb
 */
module.exports = function (options, cb) {
  if (typeof arguments[0] != 'object') {
    throw new Error('Invalid arguments. Signature: (options, callback?)');
  }

  /*
   * Build cmd to execute.
   */
  var cmd = ['ipset', 'create', '-exist'];
  var args = [];

  /*
   * Process options.
   */
  if (typeof options.setname != 'undefined') {
    args = args.concat(options.setname);
  }

  if (typeof options.type != 'undefined') {
    args = args.concat(options.type);
  }

  /*
   * An array of {key: value} pair.
   */
  if (typeof options['create_options'] != 'undefined') {
    for (var i in options['create_options']) {
      if (options['create_options'].hasOwnProperty(i)) {
        args = args.concat(i, options['create_options'][i]);
      }
    }
  }

  /*
   * Execute command.
   */
  exec(cmd.concat(args).join(' '), function (error, stdout, stderror) {
    if (error && cb) {
      cb({
        msg : stderror.split('\n')[0],
        cmd : cmd.concat(args).join(' '),
        code: error.code
      });
    }
    else if (cb) {
      cb(null);
    }
  });
};
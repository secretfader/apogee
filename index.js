var _ = require('lodash');

exports.configuration = {
  header: 'X-API-Version'
};

exports.config = function (options) {
  options = options || {};
  exports.configuration = _.extend(exports.configuration, options);
};

exports.limit = function (version) {
  if ('string' !== typeof(version)) {
    throw new Error('Please supply a version for this route.');
  }
  
  return function (req, res, next) {
    var header;

    res.header(exports.configuration.header, version);

    if (req.header(exports.configuration.header)) {
      header = req.header(exports.configuration.header);
    }

    if (header && (version === header)) {
      return next();
    } else if (!header && (version === exports.configuration.default)) {
      return next();
    }

    next('route');
  };
};

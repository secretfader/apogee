exports.config = function (options) {
  return function (req, res, next) {
    options = options || {};

    options.header = options.header || 'X-API-Version';
    options.default = options.default || '1';

    req.apogee = options;

    next();
  };
};


exports.limit = function (version) {
  return function (req, res, next) {
    var header;

    res.header(req.apogee.header, version.toString());

    if (req.header(req.apogee.header)) {
      header = req.header(req.apogee.header);
    }

    if (header && (version.toString() === header)) {
      return next();
    } else if (!header && (version.toString() === req.apogee.default)) {
      return next();
    }

    next('route');
  };
};

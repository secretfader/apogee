exports.config = function (options) {
  exports.configuration = options || {};
};

exports.limit = function (version) {
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

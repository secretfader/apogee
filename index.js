var _ = require('lodash')
,   Apogee;

Apogee = function () {
  this.configuration = {
    header: 'X-API-Version'
  };
};

Apogee.prototype.configure = function (options) {
  options = options || {};
  this.configuration = _.extend(this.configuration, options);
};

Apogee.prototype.limit = function (version) {
  if ('string' !== typeof(version)) {
    throw new Error('Please supply a version for this route.');
  }

  var self = this;

  return function (req, res, next) {
    var header;

    res.header(self.configuration.header, version);

    if (req.header(self.configuration.header)) {
      header = req.header(self.configuration.header);
    }

    if (header && (version === header)) {
      return next();
    } else if (!header && (version === self.configuration.default)) {
      return next();
    }

    next('route');
  };
};

module.exports = new Apogee();

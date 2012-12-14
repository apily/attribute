
/* !
 * attribute
 * Attribute setter/getter component.
 *
 * @author Enrico Marino and Federico Spini
 * @copyright 2012 Enrico Marino and Federico Spini
 * @licence MIT
 */

/**
 * Module dependencies.
 */

var Emitter = require('emitter');
var each = require('each');

/**
 * Expose `Attribute`.
 */

module.exports = Attribute;

/**
 * Mixin emitter.
 */

Emitter(Attribute.prototype);

/**
 * Initialize a new `Attribute`.
 *
 * @api public
 */

function Attribute(obj) {
  if (obj) return mixin(obj);
}

/**
 * Mixin the Attribute properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */

function mixin(obj) {
  for (var key in Attribute.prototype) {
    obj[key] = Attribute.prototype[key];
  }
  return obj;
}

/**
 * get
 * Get the attribute value.
 *
 * @param {String} attribute
 * @return {Any}
 * @api public
 */

Attribute.prototype.get = function(attribute) {
  this._attributes = this._attributes || {};
  return this._attributes[attribute];
};

/**
 * set
 * Set the attribute[s] value[s].
 *
 * @param {String|Object} name_or_obj
 * @param {Any} value
 * @return {Object} this
 * @api public
 */

Attribute.prototype.set = function(name_or_obj, value) {
  var self = this;
  var name;
  var attributes;
  this._attributes = this._attributes || {};
  if (typeof name_or_obj === 'string') {
    name = name_or_obj;
    _set(self, name, value);
  } else {
    attributes = name_or_obj;
    each(attributes, function(name, value) {
      _set(self, name, value);
    });
  }
  self.emit('change', self);
  return this;
};

/**
 * _set
 * Actually modify the attribute value.
 *
 * @param {Object} obj
 * @param {String} name
 * @param {Any} value
 * @api public
 */

function _set(obj, name, value) {
  obj._attributes[name] = value;
  obj.emit('change:' + name, obj);
}

// standard import
var util = require("util");

// local import
var errors = require(__dirname + '/errors');


/**
 * Set
 *
 * to be used as a return object of dynamodb getItem
 * @constructor
 */
function Set(iter) {
  if (!(this instanceof Set)) return new Set(iter);

  this._o = {};
  this.length = 0;

  if (iter) {
    if ( iter.constructor === Array) {
      this._arr_construct(iter)
    } else if (iter.constructor === Object) {
      this._obj_construct(iter);
    } else {
      throw new errors.InvalidParametersError("Invalid Object");
    }
  }
}

/**
 * _check_value
 *
 * for type checking against values
 * @returns {boolean}
 * @private
 */
Set.prototype._check_value = function(v) {
  return true;
};

/**
 * constructor helper for Arrays
 * @param arr
 * @private
 */
Set.prototype._arr_construct = function(arr) {
  for (var i=0;i<arr.length;++i) {
    this.add(arr[i])
  }
};

/**
 * _obj_construct
 *
 * constructor helper for Objects
 * only adds in keys to set
 * @param obj
 * @private
 */
Set.prototype._obj_construct = function(obj) {
  for (var i in obj) {
    if (obj.hasOwnProperty(i)) {
      this.add(i);
    }
  }
};

/**
 * add
 *
 * adds a value to the set
 * returns the value if successful, otherwise false
 * @param v
 */
Set.prototype.add = function(v) {
  if (this._check_value(v)) {
    this._add(v);
    return v;
  } else {
    return false
  }
};

/**
 * _add
 *
 * adds value to internal set representation
 * @param v
 * @private
 */
Set.prototype._add = function(v) {
  if (!this._o.hasOwnProperty(v)) {
    this.length++;
    this._o[v] = 1;
  }
};


/**
 * remove
 *
 * removes a value from the set
 * @param v
 */
Set.prototype.remove = function(v) {
  this._remove(v);
};

/**
 * _remove
 *
 * removes the values from internal set representation
 * @param v
 * @private
 */
Set.prototype._remove = function(v) {
  if (this._o.hasOwnProperty(v)) {
    this.length--;
    delete this._o[v]
  }
};

/**
 * isMember
 *
 * checks for membership of value in set
 * @param v
 * @returns {boolean}
 */
Set.prototype.isMember = function(v) {
  return this._o.hasOwnProperty(v);
};

/**
 * StringSet
 *
 * special Set for String values
 * @constructor
 */
function StringSet(iter) {
  if (!(this instanceof StringSet)) return new StringSet(iter);
  Set.call(this, iter);
}
util.inherits(StringSet, Set);

/**
 * _check_value
 *
 * special
 * @param v
 * @returns {boolean}
 * @private
 */
StringSet.prototype._check_value = function(v) {
  return v.constructor === String;
};

/**
 * NumberSet
 *
 * special set for Number values
 * @constructor
 */
function NumberSet(iter) {
  if (!(this instanceof NumberSet)) return new NumberSet(iter);
  Set.call(this, iter);
}
util.inherits(NumberSet, Set);

/**
 * _check_value
 *
 * ensures value is numeric
 * @param v
 * @private
 */
NumberSet.prototype._check_value = function(v) {
  return v.constructor === Number
};

/**
 * BinarySet
 *
 * special set for Binary values
 * @param iter
 * @constructor
 */
function BinarySet(iter) {
  if (!(this instanceof BinarySet)) return new BinarySet(iter);
  Set.call(this, iter);
}
util.inherits(BinarySet, Set);

/**
 * _add
 *
 * ensures that value is binary
 * @param v
 * @private
 */
BinarySet.prototype._check_value = function(v) {
  return v.constructor === Buffer;
};

module.exports = {
  Set: Set,
  StringSet: StringSet,
  NumberSet: NumberSet,
  BinarySet: BinarySet
};
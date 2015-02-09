/**
 * unit tests for the Set objects
 */

var sets = require(__dirname + '/../');

// set different set types
var Set = sets.Set,
  StringSet = sets.StringSet,
  NumberSet = sets.NumberSet,
  BinarySet = sets.BinarySet;

var testSet = function(test) {

  var s = new Set([1, 2, 3]);

  // test non new constructor
  var s2 = Set([1,2,3]);
  test.ok(s2 instanceof Set);

  test.ok(s.isMember(1));

  // test add
  s.add(1);
  test.equal(s.length, 3);

  // finish test
  test.done();
};

var testStringSet = function(test) {
  var stringSet = new StringSet(["foo", "bar", "baz"]);

  // test non new constructor
  var s2 = StringSet(["foo","bar","baz"]);
  test.ok(s2 instanceof StringSet);
  test.ok(s2 instanceof Set);

  // attempt to add non-string
  test.ok(!stringSet.add(1));
  test.ok(!stringSet.isMember(1));
  test.equal(stringSet.length, 3);

  // attempt to add member
  stringSet.add("foo");
  test.ok(stringSet.isMember("foo"));
  test.equal(stringSet.length, 3);

  // add new string
  stringSet.add("fizz");
  test.ok(stringSet.isMember("fizz"));
  test.equal(stringSet.length, 4);

  // finish test
  test.done();
};

var testNumberSet = function(test) {
  var numberSet = new NumberSet([1,2,3]);

  // test non new constructor
  var s2 = NumberSet([1,2,3]);
  test.ok(s2 instanceof NumberSet);
  test.ok(s2 instanceof Set);

  // add non number
  numberSet.add("4");
  test.ok(!numberSet.isMember("4"));
  test.equal(numberSet.length, 3);

  // add member
  numberSet.add(2);
  test.ok(numberSet.isMember(2));
  test.equal(numberSet.length, 3);

  // add new number
  numberSet.add(1.1);
  test.ok(numberSet.isMember(1.1));
  test.equal(numberSet.length, 4);

  // finish test
  test.done();
};

var testBinarySet = function(test) {
  var binarySet = new BinarySet([new Buffer("01"), new Buffer("02"), new Buffer("03")]);

  // test non new constructor
  var s2 = BinarySet([new Buffer("01"), new Buffer("02"), new Buffer("03")]);
  test.ok(s2 instanceof BinarySet);
  test.ok(s2 instanceof Set);

  // add non buffer
  test.ok(!binarySet.add(1));
  test.ok(!binarySet.isMember(1));
  test.equal(binarySet.length, 3);

  // add member
  binarySet.add(new Buffer("02"));
  binarySet.isMember(new Buffer("02"));
  test.equal(binarySet.length, 3);

  // add new buffer
  binarySet.add(new Buffer("04"));
  binarySet.isMember(new Buffer("04"));
  test.equal(binarySet.length, 4);

  // finish test
  test.done();
};

module.exports = {
  testSet: testSet,
  testStringSet: testStringSet,
  testNumberSet: testNumberSet,
  testBinarySet: testBinarySet
};


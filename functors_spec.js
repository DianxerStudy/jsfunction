const assert = require('assert');
const {Right} = require('./support')
const {getStory} = require('./functors.js')
var account = getStory({balance:30});
assert.deepStrictEqual(account, Right.of('Your balance is $10' ));
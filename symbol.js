var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SymbolSchema = new Schema({
  symbol: String
});

module.exports = mongoose.model('Symbol', SymbolSchema);
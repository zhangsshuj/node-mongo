const mongoose = require('mongoose')

const Schema = mongoose.Schema

var locList = new Schema({
  name: { type: String },
  point: { type: Array}, // [lon, lat]
})
//定义MongoDB中集合Collection里文档document的结构　　
const productSchema = new Schema({
  "shelvesDate": {type: Date, default: Date.now, get:tipsDate },
  'productId': String,
  'productName': {type:String},
  'salePrice': Number,
  'productImage': String,
  'productNum': Number,
  'checked': {type: Number,default: 1},
  'list': Array,
  'loc': [locList]
})
function capitalize (val) {
  if (typeof val !== 'string') val = '';
  return val.charAt(0).toUpperCase() + val.substring(1);
}
function tipsDate(val) {
  if (!val) return val
  return (val.getMonth() + 1) + "/" + val.getDate() + "/" + val.getFullYear()
}
function obfuscate(val) {
  return '****-****-****-' + val.slice(val.length-4, val.length);
}
function valiStr(val) {
  return val.length <= 30
}
productSchema.path('productName').set(capitalize)
// productSchema.path('productName').validate(valiStr,'validation of `{PATH}` failed with value `{VALUE}`')
// console.log(productSchema.path('shelvesDate').get(tipsDate))

// var fullname = productSchema.virtual('fullname');
// console.log(fullname instanceof mongoose.VirtualType);

//通过Model可以实例化出文档对象document
module.exports = mongoose.model('good', productSchema)

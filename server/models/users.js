const mongoose = require('mongoose')

const schema = mongoose.Schema

var cartList = new schema({
  "productId": String,
  "productName": String,
  "salePrice": String,
  "productImage": String,
  "checked": String,
  "productNum": String
})
var addressList = new schema({
  "addressId": String,
  "userName": String,
  "streetName": String,
  "postCode": Number,
  "tel": Number,
  "isDefault": Boolean
})

const userSchema = new schema({
    "created": { type: Date, default: Date.now },
    "uId": String,
    "userName": String,
    "userPwd": {type: String,required: true},
    "orderList": Array,
    "tel": {
      type: Number,
      required: [true, '手机号必填']
    },
    "cartList": [cartList],
    "addressList": [addressList]
})
// 为该 schema 定义一个索引（大多是复合索引）
// userSchema.index()

// 向由该 schema 编译的 model 构造的 document 添加一个实例方法 1
// userSchema.method('alert', function () {
//   console.log('alert')
// })
// 向由该 schema 编译的 model 构造的 document 添加一个实例方法 2
userSchema.method({
  alert1: function () {
    console.log('用户：'+ this.userName + '购买了' + this.cartList.length + '个商品')
  },
  alert2: function () {
    console.log(this.uId)
  }
})


// document 定义一个前置钩子 (pre hook)
userSchema.pre('save', function (next) {
  if (!this.created) this.created = new Date()
  next()
})
// userSchema.pre('validate', function (next) {
//   if (this.userName !== 'Woody') this.userName = 'Woody';
//   next();
// })

// 给 document 定义一个后置钩子 (post hook)
userSchema.post('save', function (doc) {
  console.log('this fired after a document was saved');
});

userSchema.post('find', function(docs) {
  console.log('this fired after you run a find query');
});

// 向 schema 中加载一个 ES6 类
class userClass {
  // `gravatarImage` becomes a virtual
  get gravatarImage() {
    const hash = md5(this.email.toLowerCase());
    return `https://www.gravatar.com/avatar/${hash}`;
  }

  // `getProfileUrl()` becomes a document method
  getProfileUrl() {
    return `https://mysite.com/${this.email}`;
  }

  // `findByEmail()` becomes a static
  static findByEmail(email) {
    return this.findOne({ email });
  }
}
userSchema.loadClass(userClass);

module.exports = mongoose.model('user', userSchema)

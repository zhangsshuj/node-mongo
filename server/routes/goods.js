const express = require('express')
const mongoose = require('mongoose')
const goods = require('../models/goods')
const users = require('../models/users')

const router = express.Router()

// mongoose.connect('mongodb://140.143.234.88:27017/db_demo')
mongoose.connect('mongodb://localhost:27017/dataDB',{ keepAlive: 120 });

mongoose.connection.on('connected', () => {
    console.log('MongoDb connected successful!')
})

mongoose.connection.on('err', () => {
    console.log('MongoDb connected fail!')
})

mongoose.connection.on('disconnected', () => {
    console.log('MongoDb disconnected!')
})

// ------------------model-----------------
// goods.count({},function (err, count) {
//   console.log(count)
// })
// goods.distinct('productNum', {productNum: {$gt: 1}}, function (err, result) {
//   console.log(result)
// })
// goods.find({'productNum': {$gte: 1, $lte: 10}},function (err, result) {
//   console.log(result)
// })
// goods.where('productNum').gte(1).lte(10).exec(function(err, result) {
//   console.log(result)
// })
// goods.where('productNum').gte(1).lte(10).where('productName', /^音/i).exec(function(err, result){
//   console.log(result)
// })
// goods.$where('this.productName.indexOf("音") != -1').exec(function(err, result){
//   console.log(result)
// })
// goods.findOneAndUpdate({productName: '小米音箱'},{productName: '小米音箱2'},{checked:1}, function (err,result) {
//   console.log(result)
// })
// goods.findByIdAndUpdate('5dba4be9cabed2a41e14754d',{productName: '大米音箱'},{checked: 1}, function (err,result) {
//   console.log(result)
// })
// goods.findOneAndRemove({productName: '大米音箱'},{checked: 1}, function (err,result) {
//   console.log(result)
// })
// goods.create({'productId': '100017',
//   'productName': 'kasas15szzxczxczczxczczczczczczczxxczczcz',
//   'salePrice': 10010221,
//   'productImage': '15.jpg',
//   'productNum': 1012,
//   'checked': 1,
//   'loc': {name: '北京', point: [39.5427,116.2317]},
//   'list': [{bianhao: '01',kucun: '123'}]
// }, function (err, result) {
// })
// goods.watch().on('change', change => { // 不管用
//   console.log(change)
// })
// goods.bulkWrite([
//   {
//     insertOne:{
//       document:{
//         "productId" : "100005",
//         "productName" : "大米音箱",
//         "salePrice" : 199,
//         "productImage" : "1.jpg",
//         "checked" : 1,
//         "productNum" : 2
//       }
//     }
//   },
//   {
//     updateOne: {
//       filter: { productName: '大米音箱' },
//       update: { productName: '大大米音箱' }
//     }
//   },
//   {
//     deleteOne: {
//       filter: { productName: 'k8s' },
//     }
//   }
// ]).then(function (err, result) {
//   console.log(result)
// })
// goods.hydrate({_id: '5dc38fd9a8fb00131077aed0'})

// goods.update({productId: '100005'},{productName: '凌凌漆'},{checked: 0},function(err, result){
//   console.log(result)
// })

// goods.update({productId: '100005'},{productName: '凌凌漆'},{checked: 0},function(err, result){
//   console.log(result)
// })

// goods.update({_id:'5dc38fd9a8fb00131077aed0'},{$set: {productName: '玲玲水'}}).exec(function(err,result) {
//   console.log(result)
// })

// goods.update({_id:'5dc38fd9a8fb00131077aed0','list.bianhao': '01'},{'list.$.kucun': '1001'}).exec(function(err,result) {
//   console.log(result)
// })

// goods.updateMany({_id:'5dc38fd9a8fb00131077aed0','list.bianhao': '01'},{'list.$.kucun': '1001'},function (err, result) {
//   console.log(result)
// })

// goods.updateOne({_id:'5dc38fd9a8fb00131077aed0','list.bianhao': '01'},{'list.$.kucun': '1022'},function (err, result) {
//   console.log(result)
// })

// goods.replaceOne({_id:'5dc38fd9a8fb00131077aed0', 'list.bianhao': '01'},{
//   'list': [{"bianhao": "wwww","kucun": "adsasdad"}],},function (err, result) {
//   console.log(result)
// })

// var o = {};
// o.map = function () { emit(this.productName, 1) }
// o.reduce = function (k, vals) { return vals.length }
// o.out =  {replace: 'productName'}
// o.verbose = true
// goods.mapReduce(o, function (err, results) {
//   console.log(results)
//   model.find().where('value').gt(10).exec(function (err, doc) {
//     console.log(doc)
//   })
// })

// goods.aggregate([
//   { $group: { _id: 1, productNum: { $min: '$productNum' }}},
//   { $project: { _id:0, productNum: 1 }}
// ]).
// then(function (res) {
//   console.log(res); // [ { maxBalance: 98000 } ]
// })

// goods.geoSearch({productNum: 111},{near: [0,0] },function (err, result) {
//   console.log(result)
// })

// goods.find({productName: '张三'}, function (err, good) {
//   var opts = [{ path: 'company', match: { x: 1 }, select: 'name' }]
//   var promise = goods.populate(good, opts);
//   promise.then(function (err, res) {
//     console.log(res)
//     console.log(err)
//   })
// })

// ----------------------------- find------------------------------------
// goods.where('productName').equals('张三').exec(function (err,result) {
//   console.log(result);
// })

//  ||
// goods.find({}).or([{productName: '张三s'},{productNum: 1111}]).exec(function (err, result) {
//   console.log(result)
// })

// !
// goods.find({}).nor([{productName: '张三'},{productNum: 1111}]).exec(function (err, result) {
//   console.log(result)
// })

// &&
// goods.find({}).and([{productName: '张三'},{productNum: 111}]).exec(function (err, result) {
//   console.log(result)
// })

// goods.find({}).gt('productNum',120).exec(function (err, result) {
//   console.log(result)
// })
// goods.find({}).where('productNum').gt(2).exec(function (err, result) {
//   console.log(result)
// })
// goods.find({}).where('productNum').gte(100).exec(function (err, result) {
//   console.log(result)
// })

// 查找productNum不等于2的数据
// goods.find({}).where('productNum').ne(2).exec(function (err, result) {
//   console.log(result)
// })
// 查找productNum等于3的数据
// goods.find({}).in('productNum',3).exec(function (err, result) {
//   console.log(result)
// })
// 查找productNum不等于3的数据
// goods.find({}).nin('productNum',3).exec(function (err, result) {
//   console.log(result)
// })
// 查找productNum是2 的所有数据
// goods.find({}).all('productNum',2).exec(function (err, result) {
//   console.log(result)
// })
// 查找list数组长度是1的doc
// goods.find({}).size('list',1).exec(function (err, result) {
//   if (err) return handleError(err);
// })
// goods.find({}).regex('productName','张三').exec(function (err, result) {
//   if (err) return handleError(err);
//   console.log(result)
// })
// goods.find({}).maxDistance('productNum',1000).exec(function (err, result) {
//   console.log(result)
// })
// goods.find({'productNum': {$mod: [2,0]}}).exec(function (err, doc) {
//   console.log(doc)
// })
// goods.find({'checked': {$exists: false}}).exec(function (err, doc) {
//   console.log(doc)
// })
// goods.find({'list': {$elemMatch: {'bianhao': 'wwww'}}}).exec(function (err, doc) {
//   console.log(doc)
// })
// goods.where('loc').within({ box: [[40.73, -73.9], [40.7, -73.988]] }).exec(function (err, doc) {
//   console.log(doc)
// })
// goods.find({'productName': {$slice: [1,2]}}).exec(function (err, doc) {
//   console.log(doc)
// })
// goods.find().skip(1).limit(2).maxScan(111).exec(function (err, doc) {
//   console.log(doc)
// })
// goods.find().skip(1).limit(2).batchSize(0).exec(function (err, doc) {
//   console.log(doc)
// })
// goods.find().comment('login query').exec(function (err, doc) {
//   console.log(doc)
// })
// goods.find().snapshot(true).exec(function (err, doc) {
//   console.log(doc)
// })
// goods.find().hint({ indexA: -1, indexB: 1}).exec(function (err, doc) {
//   console.log(doc)
// })
// goods.find().select('productNum -_id').exec(function (err, doc) {
//   console.log(doc)
// })
// goods.find().select({productNum: 1, _id: 0}).exec(function (err, doc) {
//   console.log(doc)
// })
// console.log(goods.update({
//   _id: '5dc38fd9a8fb00131077aed0',
//   'list.bianhao': 'wwww'
// }, {'list.$.kucun': '100113'}).getUpdate());
// goods.find().lean().exec(function (err, doc) {
//   console.log(doc)
// })
// goods.find({'productNum': '111'}).error(new Error('no select hhh')).exec(function (err, doc) {
//   console.log(1)
//   console.log(2)
//   console.log(err)
//   console.log(3)
//   console.log(doc)
//   console.log(4)
// })
// goods.findByIdAndUpdate('5dc38fd9a8fb00131077aed0', {$push: {'goods.$.list': {$each: [{bianhao:'aa',kucun: '12'}]}}}).exec(function (err,doc) {
//   console.log(doc)
// })
// goods.find({}).collation({productNum: {locale: 'zh'}}).exec(function (err, doc) {
//   console.log(doc)
// })
// goods.findOne({productNum: 111},{list:''}).exec(function (err,doc) {
//   console.log(doc)
// })
// goods.count({productNum: 111}).exec(function (err,doc) {
//   console.log(doc)
// })
// goods.distinct('list',{productNum: 10},function (err, doc) {
//   console.log(doc)
// })
// goods.find().sort({productName: 'asc',productNum: -1}).exec(function (err,doc) {
//   console.log(doc)
// })
// goods.remove({productNum: 10}, function (err, doc) {  // deleteOne
//   console.log(doc)
// })
// goods.deleteMany({productNum: {$gt: 9}}, function (err, doc) {
//   console.log(doc)
// })
// findOneAndRemove
// goods.find({}).findOneAndUpdate({productName: '小米音箱2'},{productName: '小米音箱3'},{new: true}, function (err,result) {
//   console.log(result)
// })
// updateMany updateOne replaceOne
// goods.find({}).update({productName: '小米音箱3'},{productName: '小米音箱4'},{new: true}, function (err,result) {
//   console.log(result)
// })
// goods.find().populate('productName').exec(function (err, kittens) {
//   console.log(kittens) // Zoopa
// })
// goods.find({productName: '小米音箱4'}).cursor().on('data',function (doc) {
//   console.log(doc)
// }).on('end', function () {
//   console.log('die')
// })
// goods.aggregate([
//   {$group:{_id: '$productNum',num_tutorial: {$sum : 1}}}
// ]).exec(function (err,doc) {
//   console.log(doc)
//     // [ { _id: 10, num_tutorial: 2 },
//     // { _id: 2, num_tutorial: 2 },
//     // { _id: 3, num_tutorial: 1 } ]
// })
// goods.aggregate([
  // {$group:{_id: '$productNum',num_tutorial: {$sum : "$productNum"}}}
  // [ { _id: 10, num_tutorial: 20 },
  // { _id: 2, num_tutorial: 4 },
  // { _id: 3, num_tutorial: 3 } ]
  // {$group:{_id: '$productNum',num_tutorial: {$avg : "$productNum"}}}
  // [ { _id: 10, num_tutorial: 10 },
  // { _id: 2, num_tutorial: 2 },
  // { _id: 3, num_tutorial: 3 } ]
  // {$group:{_id: '$productNum',num_tutorial: {$min : "$productNum"}}}
  // [ { _id: 10, num_tutorial: 10 },
  // { _id: 2, num_tutorial: 2 },
  // { _id: 3, num_tutorial: 3 } ]
  // {$group:{_id: '$productNum',nameList: {$push : "$productName"}}}
    // [ { _id: 10, nameList: [ '小米音箱4', 'k13s' ] },
    // { _id: 2, nameList: [ 'xxx', '大大米音箱' ] },
    // { _id: 3, nameList: [ '小米6' ] } ]
  // {$group:{_id: '$productNum',nameList: {$addToSet : "$productName"}}}
  // [ { _id: 10, nameList: [ '小米音箱4', 'k13s' ] },
  // { _id: 2, nameList: [ 'xxx', '大大米音箱' ] },
  // { _id: 3, nameList: [ '小米6' ] } ]
  // {$group:{_id: '$productNum',first: {$first : "$productName"}}}
    // [ { _id: 10, first: '小米音箱4' },
    // { _id: 2, first: 'xxx' },
    // { _id: 3, first: '小米6' } ]
  // {$group:{_id: '$productNum',first: {$last : "$productName"}}}
    // [ { _id: 10, first: 'k13s' },
    // { _id: 2, first: '大大米音箱' },
    // { _id: 3, first: '小米6' } ]

// ]).exec(function (err,doc) {
//   console.log(doc)
// })
// goods.aggregate([
//   {$match: {productNum: {$gt:1,$lte: 3}}},
//   // {$skip: 0},
//   // {$limit: 0},
//   {$group: {_id: '$productNum',counts: {$sum:1}}},
//   {sort: -1}
// ]).exec(function (err, doc) {
//   console.log(doc)
// })
// goods.aggregate([
//   {
//     $geoNear: {
//       spherical: true,  // spherical 是否按照球形状来求距离
//       near: [39.5427,116.2317],
//       maxDistance: 10000,
//       query: {'$productId': '100013'},
//       distanceField: 'dist',
//       key: '$loc.$point'
//     }
//   }
//   //distanceMultiplier 这个参数是用于确定你返回的距离是什么单位 6378137 的单位是m
//   //maxDistance  查询的最大距离
// // near 中心点坐标
// // distanceField  距离放在哪个属性
// // key 保存坐标数据的地方
// // query 你的过滤条件
// ]).exec(function (err,doc) {
//   console.log(doc)
// })
// goods.aggregate([
//   {$match: {productName:'k13s'}},
//   {$unwind: "$loc"}
// ]).exec(function (err,doc) {
//   console.log(doc)
// })
// goods.aggregate([
//   {$match: {productName:'k13s'}},
//   {$lookup: {form: 'users',localField: 'uId',foreignField:'_id', as:'users'}}
// ]).exec(function (err,doc) {
//   console.log(doc)
// })
// goods.aggregate([
//   {$match: {productName:'k13s'}},
//   {$facet: {productNum:[{$productNum: {groupBy:'$productNum'}}]}}
// ]).exec(function (err,doc) {
//   console.log(doc)
// })
// console.log(goods.aggregate([
//   {$match: {productName: 'k13s'}}
// ]).pipeline()); // [ { '$match': { productName: 'k13s' } } ]
// var m = new goods
// console.log(m.checked)




//获取产品列表
router.get('/list', (req, res, next) => {
    const page = parseInt(req.param('page')) //获取页码参数
    const pageSize = parseInt(req.param('pageSize')) //获取一页有多少条数据参数
    const sort = req.param('sort') //获取排序参数
    const priceLevel = req.param('priceLevel') //获取价格区间
    const skip = (page - 1) * pageSize //计算跳过多少条
    let params = {} //查询参数
    let startPrice = '', endPrice = ''

    if (priceLevel != 'all') {
        switch (priceLevel) {
            case '0':
                startPrice = 0
                endPrice = 100
                break
            case '1':
                startPrice = 100
                endPrice = 500
                break
            case '2':
                startPrice = 500
                endPrice = 1000
                break
            case '3':
                startPrice = 1000
                endPrice = 5000
                break
        }
        params = {
              salePrice: {
                $gt: startPrice,
                $lt: endPrice
            }
        }
    }
    const goodsModel = goods.find(params).skip(skip).limit(pageSize) //查询后跳过多少条限制一页多少条，返回计算后的模型
    goodsModel.sort({'salePrice': sort}) //对模型进行排序
    goodsModel.exec((err, doc) => { // 然后执行查询
        if (err) {
            res.json({
                status: -1,
                msg: err.message
            })
        } else {
            res.json({
                status: 0,
                msg: '',
                result: {
                    count: doc.length,
                    list: doc
                }
            })
        }
    })
})


//加入购物车
router.post('/addCart', (req, res, next) => {
    const userId = req.cookies.userId
    const productId = req.body.productId
    let userProductId = ''

    //查询user表
    users.findOne({uId: userId}, (err1, userDoc) => {
        if (err1) {
            res.json({
                status: -1,
                msg: err.message
            })
        } else {
            if (userDoc) {
              //遍历user表的购物车列表是否已有此商品
                userDoc.cartList.forEach(item => {
                    if (item.productId == productId) {
                        userProductId = productId
                        item.productNum++
                    }
                })
                if (userProductId) {
                    //已添加的商品只增加数量
                    userDoc.save((err2, doc2) => {
                        if (err2) {
                            res.json({
                                status: -1,
                                msg: err2.message
                            })
                        } else {
                            res.json({
                                status: 0,
                                msg: '操作成功',
                                result: ''
                            })
                        }
                    })
                } else {
                    //未添加的查询goods表信息
                    goods.findOne({productId: productId}, (err3, goodsDoc) => {
                        if (err3) {
                            res.json({
                                status: -1,
                                msg: err3.message
                            })
                        } else {
                            if (goodsDoc) {
                                //查出来的信息赋值给user表的cartList
                                goodsDoc.productNum = 1
                                goodsDoc.checked = 1
                                userDoc.cartList.push(goodsDoc)
                                userDoc.save((err4, doc4) => {
                                    if (err4) {
                                        res.json({
                                            status: -1,
                                            msg: err2.message
                                        })
                                    } else {
                                        res.json({
                                            status: 0,
                                            msg: '操作成功',
                                            result: ''
                                        })
                                    }
                                })
                            }
                        }
                    })
                }
            }
        }
    })
})

module.exports = router

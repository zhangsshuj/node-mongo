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
// goods.findOneAndUpdate({productName: '音箱'},{productName: '小米音箱'},{checked: 2}, function (err,result) {
//   console.log(result)
// })
// goods.findByIdAndUpdate('5dba4be9cabed2a41e14754d',{productName: '大米音箱'},{checked: 1}, function (err,result) {
//   console.log(result)
// })
// goods.findOneAndRemove({productName: '大米音箱'},{checked: 1}, function (err,result) {
//   console.log(result)
// })
// goods.create({'productId': '100004',
//   'productName': 'k10s',
//   'salePrice': 100,
//   'productImage': '15.jpg',
//   'productNum': 10,
//   'checked': 1}, function (err, result) {
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

/**
 * @author yanglei
 * @date 20160408
 * @fileoverview 邀请商户入驻
 */
var util = require("../../utils"),
    _ = require("lodash");

module.exports = {
    inviteBusinessOne(data) {
        var source = data.data,
            orderSource = data.orderData,
            one = [],
            two = [],
            three = [],
            objOne = {
                defate_plan_count: 0,
                participate_seller_count: 0,
                participate_goods_count: 0,
                order_count: 0,
                participate_user_count: 0
            },
            objTwo = {
                rebate_order_count: 0,
                rebate_order_amount_count: 0,
                rebate_order_amount_actual_count: 0,
                rebate_amount_count: 0
            },
            objThree = {
                name: "返利订单",
                spu_count: 0,
                total_spu_num: 0,
                sku_count: 0,
                total_sku_num: 0,
                refund_user_count: 0,
                total_user_num: 0,
                refund_goods_amount_count: 0,
                total_amount: 0,
                refund_goods_amount_actual_count: 0,
                total_amount_actual: 0
            };
        for (var key of source) {
            objOne.defate_plan_count += key.defate_plan_count;
            objOne.participate_seller_count += key.participate_seller_count;
            objOne.participate_goods_count += key.participate_goods_count;
            objOne.order_count += key.order_count;
            objOne.participate_user_count += key.participate_user_count;
            objTwo.rebate_order_count += key.rebate_order_count;
            objTwo.rebate_order_amount_count += key.rebate_order_amount_count;
            objTwo.rebate_order_amount_actual_count += key.rebate_order_amount_actual_count;
            objTwo.rebate_amount_count += key.rebate_amount_count;
        }
        for (var key of orderSource) {
            objThree.spu_count += key.spu_count;
            objThree.sku_count += key.sku_count;
            objThree.refund_user_count += key.refund_user_count;
            objThree.refund_goods_amount_count += key.refund_goods_amount_count;
            objThree.refund_goods_amount_actual_count += key.refund_goods_amount_actual_count;
            objThree.total_spu_num = key.total_spu_num;
            objThree.total_sku_num = key.total_sku_num;
            objThree.total_user_num = key.total_user_num;
            objThree.total_amount = key.total_amount;
            objThree.total_amount_actual = key.total_amount_actual;
        }
        one.push(objOne);
        objTwo.rate = util.toFixed(objTwo.rebate_amount_count, objTwo.rebate_order_amount_actual_count);
        two.push(objTwo);
        three.push(objThree);
        three.push({
            name: "返利退货订单占比",
            spu_count: util.toFixed(objThree.spu_count, objThree.total_spu_num),
            sku_count: util.toFixed(objThree.sku_count, objThree.total_sku_num),
            refund_user_count: util.toFixed(objThree.refund_user_count, objThree.total_user_num),
            refund_goods_amount_count: util.toFixed(objThree.refund_goods_amount_count, objThree.total_amount),
            refund_goods_amount_actual_count: util.toFixed(objThree.refund_goods_amount_actual_count, objThree.total_amount_actual)
        });
        return util.toTable([one, two, three], data.rows, data.cols);
    },
    inviteBusinessTwo(data, filter_key, dates) {
        var source = data.data,
            type = "line",
            array = [ "分享返利" ],
            newData = {},
            map = {};
        map[filter_key + "_0"] = array[0];
        for (var date of dates) {
            var obj = {};
            for (var key of source) {
                if (date === util.getDate(key.date)) {
                    for (var i = 0; i < array.length; i++) {
                        if (key.rebate_type === array[i]) {
                            obj[filter_key + "_" + i] += key[filter_key];
                        }
                    }
                }
            }
            newData[date] = obj;
        }
        return [{
            type: type,
            map: map,
            config: {
                stack: false
            },
            data: newData
        }];
    },
    inviteBusinessThree(data, filter_key) {
        var source = data.data,
            typePie = "pie",
            typeBar = "bar",
            mapPie = {},
            mapBar = {},
            newDataPie = {},
            newDataBar = {},
            filter_name = {
                goods_sku_count: "商品件数",
                goods_amount_count: "商品总金额",
                rebate_amount_count: "返利到账金额"
            },
            XPie = [
                {
                    key : "1级",
                    value : "1"
                },
                {
                    key : "2级",
                    value : "2"
                },
                {
                    key : "3级",
                    value : "3"
                },
                {
                    key : "4级",
                    value : "4"
                }
            ],
            XBar = [
                {
                    key : "层级1",
                    value : "1"
                },
                {
                    key : "层级2",
                    value : "2"
                },
                {
                    key : "层级3",
                    value : "3"
                },
                {
                    key : "层级4",
                    value : "4"
                }
            ];
        for (var level of XPie) {
            var obj = {};
            obj.value = 0;
            for (var key of source) {
                if (level.value === key.grade) {
                    obj.value += key[filter_key];
                }
            }
            newDataPie[level.key] = obj;
        }
        for (var level of XPie) {
            var obj = {};
            for (var i = 0; i < XBar.length; i++) {
                obj[i] = 0;
            }
            for (var key of source) {
                if (key.level === level.value) {
                    for (var i = 0; i < XBar.length; i++) {
                        if (key.grade === XBar[i].value) {
                            obj[i] += key[filter_key];
                        }
                    }
                }
            }
            newDataBar[level.key] = obj;
        }
        for (var i = 0; i < XBar.length; i++) {
            mapBar[i] = XBar[i].key;
        }
        mapPie.value = filter_name[filter_key];
        return [{
            type: typePie,
            map: mapPie,
            data: newDataPie,
            config: {
                stack: false
            }
        }, {
            type: typeBar,
            map: mapBar,
            data: newDataBar,
            config: {
                stack: true
            }
        }]
    },
    inviteBusinessFour(data) {
        var source = data.data;
        source.forEach((key, value) => {
            key.id = value + 1;
            key.order_rate = key.new_order_count + "/" + key.order_all_count;
            key.price_rate = key.new_order_amount + "/" + key.order_all_amount;
        });
        return util.toTable([source], data.rows, data.cols);
    }
};
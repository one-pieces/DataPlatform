/**
 * @author yanglei
 * @date 20160415
 * @fileoverview 商品分析
 */
var api = require("../../../base/api"),
    filter = require("../../../filters/achievements/product");

module.exports = (Router) => {

    Router = new api(Router,{
        router : "/achievements/productOne",
        modelName : ["SalesPerfKeyValue"],
        platform : false,
        fixedParams : {
            key_type : [ "products_acc", "products_order",
                "products_cars", "products_pay", "products_scan" ]
        },
        filter_select: [{
            title: '',
            filter_key : 'key_name',
            groups: [{
                key: ['sku', "sku_spu"],
                value: 'SKU'
            }, {
                key: ['spu', "sku_spu"],
                value: '合并SKU'
            }]
        }],
        filter(data, filter_key, dates) {
            return filter.productOne(data, filter_key, dates);
        },
        cols : [
            [
                {
                    caption: '商品访客数',
                    type: 'number'
                }, {
                    caption: '商品访问量',
                    type: 'number'
                }, {
                    caption: '商品页平均停留时长(s)',
                    type: 'number'
                },{
                    caption: '被访问的商品数',
                    type: 'number'
                },{
                    caption: '加购商品数/件数',
                    type: 'number'
                }, {
                    caption: '下单商品数/件数',
                    type: 'number'
                }, {
                    caption: '支付商品数/件数',
                    type: 'number'
                }
            ]
        ],
        rows : [
            [ 'one', 'two', 'three', "four", "five", "six", "seven" ]
        ]
    });

    Router = new api(Router,{
        router : "/achievements/productTwo",
        modelName : ["SalesPerfKeyValue"],
        platform : false,
        filter_select: [{
            title: '',
            filter_key : 'key_name',
            groups: [{
                key: 'sku',
                value: 'SKU',
                cell : {
                    title: '',
                    filter_key : 'key_type',
                    groups: [{
                        key: "products_cars",
                        value: '加购商品件数'
                    },{
                        key: "products_order",
                        value: '下单商品件数'
                    },{
                        key: "products_pay",
                        value: '支付商品件数'
                    }]
                }
            }, {
                key: ['spu', "sku_spu"],
                value: '合并SKU',
                cell : {
                    title: '',
                    filter_key : 'key_type',
                    groups: [{
                        key: "products_scan",
                        value: '浏览商品数'
                    },{
                        key: "products_order",
                        value: '下单商品数'
                    },{
                        key: "products_pay",
                        value: '支付商品数'
                    }]
                }
            }]
        }],
        filter(data, filter_key, dates) {
            return filter.productTwo(data, filter_key, dates);
        }
    });

    Router = new api(Router,{
        router : "/achievements/productThree",
        modelName : ["SalesPerfKeyValue"],
        platform : false,
        excel_export : true,
        filter_select: [{
            title: '',
            filter_key : 'key_name',
            groups: [{
                key: ['sku', "sku_spu"],
                value: 'SKU'
            }, {
                key: ['spu', "sku_spu"],
                value: '合并SKU'
            }]
        }],
        flexible_btn : [{
            content: '<a href="javascript:void(0)">导出</a>',
            preMethods: ['excel_export']
        }],
        filter(data, filter_key, dates) {
            return filter.productThree(data, dates);
        },
        rows : [
            [ 'one', 'two', 'three', "four", "five", "six", "seven" ]
        ],
        cols : [
            [{
                caption: '日期',
                type: 'string'
            }, {
                caption: '被访问商品数',
                type: 'number'
            }, {
                caption: '下单商品数/件数',
                type: 'number'
            }, {
                caption: '支付商品数/件数',
                type: 'number'
            }, {
                caption: '退货商品数/件数',
                type: 'number'
            }, {
                caption: '支付金额',
                type: 'number'
            }, {
                caption: '退货金额',
                type: 'number'
            }]
        ]
    });

    Router = new api(Router,{
        router : "/achievements/productFour",
        modelName : ["ProductTop"],
        platform : false,
        date_picker_data : 1,
        showDayUnit : true,
        excel_export : true,
        flexible_btn : [{
            content: '<a href="javascript:void(0)">导出</a>',
            preMethods: ['excel_export']
        }],
        filter(data, filter_key, dates) {
            return filter.productFour(data);
        },
        rows : [
            [ 'top', 'commodity_name', 'access_num', 'access_num_rate', 'access_users',
                'access_users_rate', 'share_num']
        ],
        cols : [
            [{
                caption: '排名',
                type: 'number'
            }, {
                caption: '商品名称',
                type: 'string'
            }, {
                caption: '浏览量',
                type: 'number'
            }, {
                caption: '浏览量占比',
                type: 'string'
            }, {
                caption: '访客数',
                type: 'number'
            }, {
                caption: '访客数占比',
                type: 'string'
            }, {
                caption: '被分享商品数',
                type: 'number'
            }]
        ]
    });

    Router = new api(Router,{
        router : "/achievements/productFive",
        modelName : ["ProductTop"],
        platform : false,
        date_picker_data : 1,
        showDayUnit : true,
        excel_export : true,
        flexible_btn : [{
            content: '<a href="javascript:void(0)">导出</a>',
            preMethods: ['excel_export']
        }],
        filter(data, filter_key, dates) {
            return filter.productFive(data);
        },
        rows : [
            [ 'top', 'commodity_name', 'order_users', 'oder_products', 'order_price',
                'order_price_rate', "refund_num", 'share_num']
        ],
        cols : [
            [{
                caption: '排名',
                type: 'number'
            }, {
                caption: '商品名称',
                type: 'string'
            }, {
                caption: '下单人数',
                type: 'number'
            }, {
                caption: '下单件数',
                type: 'number'
            }, {
                caption: '成交金额',
                type: 'number'
            }, {
                caption: '成交金额占比',
                type: 'string'
            }, {
                caption: '退货数',
                type: 'number'
            }, {
                caption: '被分享商品数',
                type: 'number'
            }]
        ]
    });

    return Router;
};
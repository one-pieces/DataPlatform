/**
 * @author luoye
 * @date 20160406
 * @fileoverview 数据概览
 */

module.exports = {
    all() {
        return {
            name: "数据概览",
            path: "/dataOverview",
            display: true,
            defaultData: [{
                type: "table",
                title: "数据概览",
                query_api: "/dataOverview/dataOverviewAllOne"
            }, {
                type: "chart",
                title: "数据趋势",
                query_api: "/dataOverview/dataOverviewAllTwo"
            }, {
                type: "chart",
                title: "地域分布 TOP10",
                query_api: "/dataOverview/dataOverviewAllThree"
            }, {
                type: "table",
                title: "访问页面 TOP10",
                query_api: "/dataOverview/dataOverviewAllFour"
            }]
        }
    }
};

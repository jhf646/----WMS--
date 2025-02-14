//自调用函数
(function() {
    // 1、页面一加载就要知道页面宽度计算
    var setFont = function() {
        // 因为要定义变量可能和别的变量相互冲突，污染，所有用自调用函数
        var html = document.documentElement; // 获取html
        // 获取宽度
        var width = html.clientWidth;

        // 判断
        if (width < 1024) width = 1024
        if (width > 1920) width = 1920
            // 设置html的基准值
        var fontSize = width / 80 + 'px';
        // 设置给html
        html.style.fontSize = fontSize;
    }
    setFont();
    // 2、页面改变的时候也需要设置
    // 尺寸改变事件
    window.onresize = function() {
        setFont();
    }
})();
//函数 
function ajax(key) {
    $.ajax({
        url: http1 + '?interface=' + key,
        type: "get",
        dataType: 'json',
        success: function(data) {
            let key1 = key.split('&');
            if (typeof(eval(key1[0])) == "function") {
                eval(key1[0] + "(data);");
            } else {
                // 函数不存在
            }
            console.log(data)
        },
        error: function() {

        }
    })
}

function load() {

    //1、 库位实时信息（总库位数、已使用库位、剩余库位数量、库位法兰数）
    ajax("GetRealTimeInfo")

    //2、 当日运行效率(出库/入库)
    ajax("GetDailyWorkEfficiency")

    //3、 获取实时任务
    ajax("getRealTimeTask")

    //4、当日报警信息
    ajax("GetDailyErrorInfo")

    var dt = new Date();
    dt.getFullYear()

    //5、 获取xx年12个月的出入库数量
    ajax("GetMonthDataByYear&year=" + dt.getFullYear())

    //6、获取7天内物料使用前10
    ajax("GetUseRate")

    //7、 法兰可视化信息
    ajax("GetFlangeStockInfo")

    //当日的订单完成数
    // ajax("getFinishedPlanNum")
}
load()
var i = 0
    // 循环刷新函数
setInterval(() => {
    console.log("第" + i + "次循环请求");
    load();
    i++
}, 10000);
// 库位实时信息（总库位数、已使用库位、剩余库位数量、库位法兰数）
function GetRealTimeInfo(data) {
    // <!--     "totalCount": 150,
    //     "usedCount": 9,
    //     "freeCount": 141,
    //     "flangeCount": 0 -->
    $("#totalCount").html("")
    $("#totalCount").html(data.totalCount)
    $("#usedCount").html("")
    $("#usedCount").html(data.usedCount)
    $("#freeCount").html("")
    $("#freeCount").html(data.freeCount)
    $("#flangeCount").html("")
    $("#flangeCount").html(data.flangeCount)

}
//当日运行效率(出库/入库)
function GetDailyWorkEfficiency(data) {
    // <!-- "warehouseInCount": 0,     "warehouseOutCount": 0,     "efficiency": 0 -->
    $("#warehouseInCount").html("")
    $("#warehouseInCount").html(data.warehouseInCount)
    $("#warehouseOutCount").html("")
    $("#warehouseOutCount").html(data.warehouseOutCount)
    $("#efficiency").html("")
    $("#efficiency").html(`${data.efficiency}`)

    let A = parseInt(data.efficiency) * 2
    let B = 200 - parseInt(data.efficiency) * 2
    f5(A, B)

    function f5(A, B) {
        var option = {
            series: [{
                type: 'pie',
                radius: ['130%', '150%'], // 放大图形
                center: ['50%', '80%'], // 往下移动  套住75%文字
                label: {
                    show: false,
                },
                startAngle: 180,
                hoverOffset: 0, // 鼠标经过不变大
                data: [{
                        value: A,
                        itemStyle: { // 颜色渐变#00c9e0->#005fc1
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [
                                    { offset: 0, color: '#00c9e0' },
                                    { offset: 1, color: '#005fc1' }
                                ]
                            }
                        }
                    },
                    { value: B, itemStyle: { color: '#12274d' } }, // 颜色#12274d
                    { value: 200, itemStyle: { color: 'transparent' } } // 透明隐藏第三块区域
                ]
            }]
        };
        var myechart = echarts.init($('.gauge')[0]);
        myechart.setOption(option);
    }
}
//获取实时任务
function getRealTimeTask(data) {
    //         "OperType": "Out",
    //     "ItemCode": "0001",
    //     "StockIndex": "A11",
    //     "SerialNumber": ""
    console.log(data)
    let html = ''

    html += ` <div class="row">
        <span class="col">${data.StockIndex}</span>
        <span class="col">${data.OperType=='Out'?"出库":"入库"}</span>
        <span class="col">${data.ItemCode}</span>
        <span class="col">${data.SerialNumber}</span>
        <span class="icon-dot"></span>
    </div>`

    console.log(html)
    $("#getRealTimeTask").html("")
    $("#getRealTimeTask").html(html)
    if (data.length > 10) {
        //事件委托
        $('.monitor').on('click', ' a', function() {
            //点击当前的a 加类名 active  他的兄弟删除类名
            $(this).addClass('active').siblings().removeClass('active');
            //获取一一对应的下标 
            var index = $(this).index();
            //选取content 然后狗日对应下标的 显示   当前的兄弟.content隐藏
            $('.content').eq(index).show().siblings('.content').hide();
        });
        //滚动
        //原理：把marquee下面的子盒子都复制一遍 加入到marquee中
        //      然后动画向上滚动，滚动到一半重新开始滚动
        //因为选取的是两个marquee  所以要遍历
        $('.monitor .marquee').each(function(index, dom) {
            //将每个 的所有子级都复制一遍
            var rows = $(dom).children().clone();
            //再将新的到的加入原来的
            $(dom).push(rows);
        });
    }
}
//当日报警信息
function GetDailyErrorInfo(data) {
    //             "errorInfo": "Warning3",
    //         "errorTime": "2020/9/10 16:16:30"

    let html = ''
    for (var i = 0; i < data.length; i++) {
        html += ` <div class="row">
        <span class="col">${data[i].errorInfo}</span>
        <span class="col">${data[i].errorTime}</span>
        <span class="icon-dot"></span>
    </div>`
    }

    $("#GetDailyErrorInfo").html("")
    $("#GetDailyErrorInfo").html(html)
    if (data.length > 10) {
        //事件委托
        $('.monitor').on('click', ' a', function() {
            //点击当前的a 加类名 active  他的兄弟删除类名
            $(this).addClass('active').siblings().removeClass('active');
            //获取一一对应的下标 
            var index = $(this).index();
            //选取content 然后狗日对应下标的 显示   当前的兄弟.content隐藏
            $('.content').eq(index).show().siblings('.content').hide();
        });
        //滚动
        //原理：把marquee下面的子盒子都复制一遍 加入到marquee中
        //      然后动画向上滚动，滚动到一半重新开始滚动
        //因为选取的是两个marquee  所以要遍历
        $('.monitor .marquee').each(function(index, dom) {
            //将每个 的所有子级都复制一遍
            var rows = $(dom).children().clone();
            //再将新的到的加入原来的
            $(dom).push(rows);
        });
    }
}
//获取xx年12个月的出入库数量
function GetMonthDataByYear(data) {

    let arr = [],
        arr1 = []
    for (var i = 0; i < data.length; i++) {
        arr.push(data[i].InCount)
        arr1.push(data[i].OutCount)
    }
    f2(arr, arr1)


}
//获取7天内物料使用前10
function GetUseRate(data) {

    let arr = [],
        arr1 = []
    for (var i = 0; i < data.length; i++) {
        arr.push(data[i].materielID)
        arr1.push(parseInt(data[i].useRate))
    }
    f3()

    function f3() {
        // 中间省略的数据  准备三项
        var item = {
            name: '',
            value: 1200,
            // 柱子颜色
            itemStyle: {
                color: '#254065'
            },
            // 鼠标经过柱子颜色
            emphasis: {
                itemStyle: {
                    color: '#254065'
                }
            },
            // 工具提示隐藏
            tooltip: {
                extraCssText: 'opacity:0'
            }
        };
        option = {
            // 工具提示
            tooltip: {
                // 触发类型  经过轴触发axis  经过轴触发item
                trigger: 'item',
                // 轴触发提示才有效
                axisPointer: {
                    // 默认为直线，可选为：'line' 线效果 | 'shadow' 阴影效果       
                    type: 'shadow'
                }
            },
            // 图表边界控制
            grid: {
                // 距离 上右下左 的距离
                left: '0',
                right: '3%',
                bottom: '3%',
                top: '5%',
                // 大小是否包含文本【类似于boxsizing】
                containLabel: true,
                //显示边框
                show: true,
                //边框颜色
                borderColor: 'rgba(0, 240, 255, 0.3)'
            },
            // 控制x轴
            xAxis: [{
                // 使用类目，必须有data属性
                type: 'category',
                // 使用 data 中的数据设为刻度文字
                data: arr,
                // 刻度设置
                axisTick: {
                    // true意思：图形在刻度中间
                    // false意思：图形在刻度之间
                    alignWithLabel: false,
                    show: false
                },
                //文字
                axisLabel: {
                    color: '#4c9bfd',
                    interval: 0,
                    rotate: 40,
                }
            }],
            // 控制y轴
            yAxis: [{
                // 使用数据的值设为刻度文字
                type: 'value',
                axisTick: {
                    // true意思：图形在刻度中间
                    // false意思：图形在刻度之间
                    alignWithLabel: false,
                    show: false
                },
                //文字
                // axisLabel: {},
                axisLabel: {
                    formatter: '{value} %',
                    color: '#4c9bfd'
                },
                splitLine: {
                    lineStyle: {
                        color: 'rgba(0, 240, 255, 0.3)'
                    }
                },

            }],
            // 控制x轴
            series: [

                {
                    // series配置
                    // 颜色
                    itemStyle: {
                        // 提供的工具函数生成渐变颜色
                        color: new echarts.graphic.LinearGradient(
                            // (x1,y2) 点到点 (x2,y2) 之间进行渐变
                            0, 0, 0, 1, [
                                { offset: 0, color: '#00fffb' }, // 0 起始颜色
                                { offset: 1, color: '#0061ce' } // 1 结束颜色
                            ]
                        )
                    },
                    // 图表数据名称
                    name: '用户统计',
                    // 图表类型
                    type: 'bar',
                    // 柱子宽度
                    barWidth: '60%',
                    // 数据
                    data: arr1
                }
            ]
        };
        var myechart = echarts.init($('.users .bar')[0]);
        myechart.setOption(option);
    }
}
//法兰可视化信息
function GetFlangeStockInfo(data) {
    //        "StockIndex": "A11",
    //         "ItemCode": "0001",
    //         "ItemName": "",
    //         "SerialNumber": ""
    $("div").removeClass("zhany")
        // $("#" + data[i].StockIndex).addClass("zhany");
    for (var i = 0; i < data.length; i++) {
        $("#" + data[i].StockIndex + " #ItemCode").html("")
        $("#" + data[i].StockIndex + " #ItemCode").html(data[i].ItemCode)
        $("#" + data[i].StockIndex + " #SerialNumber").html("")
        $("#" + data[i].StockIndex + " #SerialNumber").html(data[i].SerialNumber)
        $("#" + data[i].StockIndex).addClass("zhany");

    }
}

function f2(arr, arr1) {
    console.log(arr, arr1)
    var option = {
        //鼠标提示工具
        tooltip: {
            trigger: 'axis'
        },
        xAxis: {
            // 类目类型                                  
            type: 'category',
            // x轴刻度文字                                  
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            axisTick: {
                show: false //去除刻度线
            },
            axisLabel: {
                color: '#4c9bfd', //文本颜色

            },
            axisLine: {
                show: false //去除轴线  
            },
            boundaryGap: false //去除轴内间距
        },
        yAxis: {
            // 数据作为刻度文字                                  
            type: 'value',
            axisTick: {
                show: false //去除刻度线
            },
            axisLabel: {
                color: '#4c9bfd' //文本颜色
            },
            axisLine: {
                show: false //去除轴线  
            },
            boundaryGap: false //去除轴内间距
        },
        //图例组件
        legend: {
            textStyle: {
                color: '#4c9bfd' // 图例文字颜色

            },
            right: '10%' //距离右边10%
        },
        // 设置网格样式
        grid: {
            show: true, // 显示边框
            top: '20%',
            left: '3%',
            right: '4%',
            bottom: '3%',
            borderColor: '#012f4a', // 边框颜色
            containLabel: true // 包含刻度文字在内
        },
        series: [{
                name: '法兰出库率',
                // 数据                                  
                data: arr1,
                // 图表类型                                  
                type: 'line',
                // 圆滑连接                                  
                smooth: true,
                itemStyle: {
                    color: '#00f2f1' // 线颜色
                }
            },
            {
                name: '法兰入库率',
                // 数据                                  
                data: arr,
                // 图表类型                                  
                type: 'line',
                // 圆滑连接                                  
                smooth: true,
                itemStyle: {
                    color: '#ed3f35' // 线颜色
                }
            }
        ]
    };
    var myechart = echarts.init($('.line')[0]);
    myechart.setOption(option);
}
// function f5(data) {


//     let option = {
//         backgroundColor: '#04243E',
//         title: {
//             text: '{num|' + data.value + '}{key| %}',
//             subtext: data.name,
//             x: '49%',
//             y: '38%',
//             textAlign: 'center',
//             // textStyle: {
//             //     rich: {
//             //         num: {
//             //             fontWeight: 'bold',
//             //             color: '#fff',
//             //             fontFamily: '微软雅黑',
//             //             fontSize: 25,
//             //         },
//             //         key: {
//             //             fontWeight: 'bold',
//             //             color: '#fff',
//             //             fontFamily: '微软雅黑',
//             //             fontSize: 15,
//             //         }
//             //     }

//             // },
//             // subtextStyle: {
//             //     lineHeight: 30,
//             //     fontSize: 15
//             // }
//         },
//         data: [{
//             name: data.name,
//         }],
//         series: [{ // 主圆环
//             name: data.name,
//             type: 'pie',
//             radius: ['50%', '70%'],
//             startAngle: 180,
//             color: [{
//                 type: 'linear',
//                 x: 1,
//                 y: 0,
//                 x2: 0,
//                 y2: 0,
//                 colorStops: [{
//                     offset: 0,
//                     color: 'rgba(51,227,189,1)' // 0% 处的颜色
//                 }, {
//                     offset: 1,
//                     color: 'rgba(51,227,189,.1)' // 100% 处的颜色
//                 }]
//             }, 'transparent'],
//             hoverAnimation: true,
//             legendHoverLink: false,
//             z: 10,
//             labelLine: {
//                 normal: {
//                     show: false
//                 }
//             },
//             data: [{
//                 value: data.efficiency
//             }, {
//                 value: 150
//             }]
//         }, { // 背景圆环
//             name: '',
//             type: 'pie',
//             radius: ['50%', '70%'],
//             silent: true,
//             startAngle: 180,
//             labelLine: {
//                 normal: {
//                     show: false
//                 }
//             },
//             z: 5,
//             data: [{
//                 value: 200,
//                 itemStyle: {
//                     color: '#1A3B4C'
//                 }
//             }, {
//                 value: 200,
//                 itemStyle: {
//                     color: 'transparent'
//                 }
//             }]
//         }, { // 中间圈
//             name: '',
//             z: 5,
//             type: 'pie',
//             cursor: 'default',
//             radius: ['45%', '45%'],
//             startAngle: 180,
//             hoverAnimation: false,
//             legendHoverLink: false,
//             labelLine: {
//                 normal: {
//                     show: false
//                 }
//             },
//             data: [{
//                 value: 199,
//                 itemStyle: {
//                     borderColor: 'rgba(51,123,321,1)',
//                     borderType: 'dashed'
//                 }
//             }, {
//                 value: 200,
//                 itemStyle: {
//                     color: 'transparent'
//                 }
//             }]
//         }]
//     };

//     var myechart = echarts.init($('.gauge')[0]);
//     myechart.setOption(option);
// }
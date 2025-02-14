
$(function () {
    $.ajaxSetup({ cache: false })

    clearInterval(timer1);
    $(".time").html("当前时间：" + showtime());
    timer1 = setInterval(function () {
        $(".time").html("当前时间：" + showtime())
    }, 1000)

    clearInterval(f1);
    f1 = setInterval(function () {
        ST()
    }, 8000)
})

 

// $(function () {
//     $.ajaxSetup({ cache: false })

//     clearInterval(timer1);
//     $(".time").html("当前时间：" + showtime());
//     timer1 = setInterval(function () {
//         $(".time").html("当前时间：" + showtime())
//     }, 1000)

//     clearInterval(f1);
//     f1 = setInterval(function () {
//         ST()
//     }, 8000)
// })


// function f1(){

//     var xhr = new XMLHttpRequest();
//     xhr.onreadystatechange=function(){

//         if(xhr.readyState===4&&xhr.status===200){


//         }
//     };

//     xhr.open("POST","https://cf.ams.game.qq.com/ams/ame/amesvr?ameVersion=0.3&"+
//     "sServiceType=cf&iActivityId=238455&sServiceDepartment=group_f&"+
//     "sSDID=7834efb52724e45bb6e0b403221f9966&sMiloTag=AMS-MILO-238455-583270-o1173326004-"+ new Date()+"-ftEtSd&isXhrPost=true",true);

//     xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

//     xhr.send('_app_id=1005&channel=91003&_from=pc&djc_source=482482&appext=%25E7%2584%25A6%25E6%2581%2592%25E9%25A3%259E__%25E5%258C%2597%25E4%25BA%25AC%25E5%25BB%25B6%25E5%25BA%2586%25E5%258E%25BF%25E6%2596%25B0%25E5%2590%25B4%25E5%258C%25BA&id_card=320982199406042278&mobile=18961637060&iTime=6&item=2&iActivityId=238455&iFlowId=583270&g_tk=1320731845&e_code=482482&g_code=0&eas_url=http%3A%2F%2Fmall.qq.com%2Fact%2Fa20190701cfeleventh%2F&eas_refer=http%3A%2F%2Fmall.qq.com%2Fact%2Fa20190701cfeleventh%2F&xhr=1&sServiceDepartment=group_f&sServiceType=cf&xhrPostKey=xhr_'+ new Date().getTime());
// }

// var swiper = new Swiper('.swiper-container', {
//     navigation: {
//         nextEl: '.swiper-button-next',
//         prevEl: '.swiper-button-prev',
//     },
//     //   触发时间
//     on: {
//         slideChangeTransitionStart: function () {
//             //0页面时加载1页面，反之1页面时加载0页面
//             if (this.activeIndex == 0) {
//                 console.log("1")
//                 $(".bt").html("库存数据可视化")
//                 // success_1();
//             } else {
//                 console.log("0")
//                 $(".bt").html("流程状态可视化")
//                 // get_ww();
//                 // load()
//             }
//         },
//     },
//     //切换停顿时间和自由切换
//     // autoplay: {
//     //     autoplay:false,
//     //     disableOnInteraction: false,
//     //     delay: 2000,
//     // },
//     //切换效果
//     // effect : 'cube',
//     //     cubeEffect: {
//     //         slideShadows: true,
//     //         shadow: true,
//     //         shadowOffset: 100,
//     //         shadowScale: 0.6
//     //     },
//     //   间隔时间
//     speed: 2000,
// });


var timer1
function showtime() {
    var mydate = new Date();
    var str = "" + mydate.getFullYear() + "年";
    str += (mydate.getMonth() + 1) + "月";
    str += mydate.getDate() + "日";
    str += mydate.getHours() + "时";
    str += mydate.getMinutes() + "分";
    str += mydate.getSeconds() + "秒";
    return str;
}

//模态框 出库
var load = document.getElementById("load");
var mask = document.getElementById("mask");
var login = document.getElementById("login");
var close_login = document.getElementById("close_login");
var close_login_poll = document.getElementById("close_login_poll");
var close_login_B = document.getElementById("close_login_B");
var close_login_A = document.getElementById("close_login_A");
close_login.onclick = function () {
    mask.style.display = "none";
    login.style.display = "none";
};

close_login_poll.onclick = function () {
    mask.style.display = "none";
    poll.style.display = "none";
};
close_login_B.onclick = function () {
    mask.style.display = "none";
    login_B.style.display = "none";
};
close_login_A.onclick = function () {
    mask.style.display = "none";
    login_A.style.display = "none";
};
 function closeLogin_A() {
    mask.style.display = "none";
    poll.style.display = "none";
};

function closeLogin_B() {
    mask.style.display = "none";
    login_B.style.display = "none";
};

function closeLogin() {
    mask.style.display = "none";
    login.style.display = "none";
};

function closeLogin_C() {
    mask.style.display = "none";
    login_A.style.display = "none";
};
var dex = ""

function tck(index) {


    var index_1 = (index == 1 ? 1 : index == 2 ? 3 : 5)

    // alert(index_1)

    console.log($(".sz>table>tbody>tr:nth-child(" + index_1 + ")>td:nth-child(10)").html())

    console.log($(".sz>table>tbody>tr:nth-child(" + index_1 + ")>td:nth-child(10) tbody").html())

    if ($(".sz>table>tbody>tr:nth-child(" + index_1 + ")>td:nth-child(10) tbody").html() === "") {

        alert("当前通道无物料！")

    } else {

        //第一个数据加载
        $("#login .tsk").html("")
        $("#login .tsk").html(index_1 + "号通道出库操作提示框")
        $("#login table").html("")
        $("#login table").html($(".sz>table>tbody>tr:nth-child(" + index_1 + ")>td:nth-child(10) tbody").html())
        mask.style.display = "block";
        login.style.display = "block";

        dex = index
    }

};

function setOut() {

    load.style.display = "block";
    login.style.display = "none";

    // alert(dex)

    $.ajax({

        type: "post",

        url: http1 + "API/WMSInteractive/BoxOut",
        // url: "mn.json",

        data: { Row: dex },

        success: function (data) {

            mask.style.display = "none";
            login.style.display = "none";
            load.style.display = "none";
            alert("出库指令下发成功！")
            ST()

        },
        error: function (data) {

            mask.style.display = "none";
            load.style.display = "none";
            login.style.display = "none";
            alert("出库指令下发失败，无法提交给服务器！")

        },
    })
}

function showtime1() {
    var mydate = new Date();
    var str = "" + mydate.getFullYear() + "年";
    str += (mydate.getMonth() + 1) + "月";
    str += mydate.getDate() + "日";
    str += mydate.getHours() + "时";
    str += mydate.getMinutes() + "分";
    str += mydate.getSeconds() + "秒";
    return str;
}
//动态加载数据
var f1

var jc = 1
function ST() {

    $.ajax({

        type: "GET",

        url: http1 + "API/WMSInteractive/Inventory",
        // url: "mn.json",

        data: {},

        success: function (data) {

            if(jc==1){
                alert("网络已联通，可以正常操作！")
                // mask.style.display = "block";
                // login_B.style.display = "block";
                // $('#msg').html ("");
                // $('#msg').html( '网络已联通，可以正常操作！<br>' + showtime1());
            }
            jc--
            // var obj = JSON.parse(data);

            $(".sz>table>tbody>tr:nth-child(odd)>td").css("opacity", "0")

            var obj = data;

            var html = "";

            for (var i = 0; i < obj.length; i++) {

                console.log(obj[i]);

                console.log(obj[i].CarInfo.length);

                for (var j = 0; j < obj[i].CarInfo.length; j++) {

                    console.log(obj[i].CarInfo[j].ItemCode);

                    html = `  
                    <tr>
                        <td>物料号:</td>
                    </tr>
                    <tr>
                        <td>${obj[i].CarInfo[j].ItemCode}</td>
                    </tr>
                    <tr>
                        <td>数量:</td>
                    </tr>
                    <tr>
                        <td>${obj[i].CarInfo[j].Quantity}</td>
                    </tr>
                    <tr>
                        <td>流转卡编号:</td>
                    </tr>
                    <tr>
                        <td>${obj[i].CarInfo[j].TrackCard}</td>
                    </tr>
                    `
                    $("." + obj[i].CarInfo[j].ShelfSerial + " tbody").html(html)
                    $("." + obj[i].CarInfo[j].ShelfSerial + " .tdw_2").css("background-color", " rgb(97, 197, 84)")
                    $("." + obj[i].CarInfo[j].ShelfSerial + "").css("background-color", " rgb(97, 197, 84)")
                    $("." + obj[i].CarInfo[j].ShelfSerial + "").css("opacity", "1")
                    
                }
            }

            console.log(obj);
        },
        error: function (data) {
            alert("无法连接服务器，请联系相关人员处理！")
            console.log("提交失败，无法提交给服务器！")

        },
    })
}


//空框 满框 切换
var Scale = document.getElementById("box");

$(".switch-wrap").click(function () {

    if ($(this).hasClass("active")) {

        if (confirm("当前通道确定为满框嘛？")) {

            $.ajax({

                type: "GET",

                url: http1 + "API/WMSInteractive/TransferMode",
                // url: "mn.json",
                // contentType: "json",

                data: { MODE: "Empty" },
                // Full
                success: function (data) {

                    var lxl = 0;

                    Scale.style.transform = "translateX(" + lxl + "%)";

                    $(".switch-wrap").removeClass("active");

                    alert("满框模式切换成功!");

                },
                
                error: function (data) {

                    alert("切换失败！无法连接服务器！")

                },

            })

        }

    } else {

        if (confirm("当前通道确定为空框嘛？")) {

            $.ajax({

                type: "GET",

                url: http1 + "API/WMSInteractive/TransferMode",
                // url: "mn.json",
                // contentType: "json",

                data: { MODE: "Full" },
                // EmptyFull
                success: function (data) {

                    var lxl = 100;
                    Scale.style.transform = "translateX(" + lxl + "%)";

                    $(".switch-wrap").addClass("active");

                    alert("空框模式切换成功");

                },
                error: function (data) {

                    alert("切换失败！无法连接服务器！")

                },
            })

        }

    }
})









//查询功能按钮
function GN() {
    mask.style.display = "block";
    poll.style.display = "block";

}


// var tabs = document.getElementsByClassName('tab-head')[0].getElementsByTagName('h3'),
//     contents = document.getElementsByClassName('tab-content')[0].getElementsByTagName('div');

//     (function changeTab(tab) {
//         for (var i = 0, len = tabs.length; i < len; i++) {
//             tabs[i].onmouseover = showTab;
//         }
//     })();

// console.log(contents)


// function showTab() {
//     for (var i = 0, len = tabs.length; i < len; i++) {
//         if (tabs[i] === this) {
//             tabs[i].className = 'selected';
//             contents[i].className = 'show';
//         } else {
//             tabs[i].className = '';
//             contents[i].className = '';
//         }
//     }
// }

// $('#search_button').click(function () {

//     teacher_table_A();

// });

var time = new Date();
var day = ("0" + time.getDate()).slice(-2);
var month = ("0" + (time.getMonth() + 1)).slice(-2);
var today = time.getFullYear() + "-" + (month) + "-" + (day);

$('#RQ-1').val(today);
$('#RQ-2').val(today);
$('#RQ-3').val(today);
$('#RQ-4').val(today);

var keyWord1 = "";

keyWord1 = document.getElementById("RQ-1").value;

var keyWord2 = "";

keyWord2 = document.getElementById("RQ-2").value;

var keyWord3 = "";

keyWord1 = document.getElementById("RQ-3").value;


var keyWord4 = "";

keyWord2 = document.getElementById("RQ-4").value;

//自动加载
$(function () {
    searchAction()
    teacher_table_A();
    // teacher_table_B();
});
//表格刷新
function tableRefresh() {
    $('#teacher_table_A').bootstrapTable('refresh', {
        query: {}
    });
}
//点击查询函数
function searchAction() {

    $('#search_button').click(function () {
  
        keyWord1 = $('#RQ-1').val(),
        keyWord2 = $('#RQ-2').val()
        tableRefresh();

    })
}

// 查询参数
function queryParams_A(params) {
    var temp1 = {
        StartTime: keyWord1,
        EndTime: keyWord2
    };
    return temp1;
}
function queryParams_B(params) {
    var temp2 = {
        // state: search_type_repositoryAdmin,
    };
    return temp2;
}
// 表格初始化
function teacher_table_A() {

    $('#teacher_table_A').bootstrapTable(
        {
            method: 'GET',
            url: http1 + 'API/WMSInteractive/OperationHistory',
            // 'http://192.168.5.42:8080/'
            ajaxOptions: {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                }
            },
            queryParams: "queryParams_A",
            toolbar: "#toolbar",
            sidePagination: "true",
            search: "true",
            //                        showRefresh:"true",
            showColumns: "true",
            pageSize: "5",
            sortOrder: 'asc',
            pagination: true, //分页
            pageNumber: 1,
            pageList: [5, 10, 20, 50, 100, 'All'],
            queryParamsType: 'limit',
            exportDataType: 'all',
            exportTypes: ['excel','xlsx'],
            showExport: true,  //是否显示导出按钮
            buttonsAlign: "left",
            Icons: 'glyphicon-export',
            exportOptions: {
                //                                ignoreColumn: [0,1],  //忽略某一列的索引
                fileName: '库存记录表',  //文件名称设置
                worksheetName: '库存操作记录',  //表格工作区名称
                tableName: '库存记录',
                excelstyles: ['blue', 'red', 'font-size', 'font-weight'],
                //                                onMsoNumberFormat: DoOnMsoNumberFormat
            },
            columns: [
                // ShelfSerial		库位号
                // Quantity	数量
                // OperationDate		操作日期
                // BatchNumber		批次号
                // Type		操作类型
                // TrackCard		跟踪卡号
                // ItemCode		料号
                {
                    field: 'ShelfSerial',
                    title: '库位号'
                },
                {
                    field: 'ItemCode',
                    title: '料号'
                },
                {
                    field: 'Quantity',
                    title: '数量'
                },
                {
                    field: "BatchNumber",
                    title: "批次号"
                },
                {
                    field: "TrackCard",
                    title: "流转卡编号"
                },
//                 IceIceIce:
// ProductionDate 加工日期

// IceIceIce:
// CastingDate 铸造日期
{
    field: "ProductionDate",
    title: "加工日期"
},
{
    field: "CastingDate",
    title: "铸造日期"
},
                {
                    field: "Type",
                    title: "操作类型"
                },
                {
                    field: "OperationDate",
                    title: "操作日期",
                    formatter: function (value) {
                        var dateee = new Date(value).toJSON();
                        var date = new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '');
                        return date
                    }
                },
            ],
        });
}

function teacher_table_B() {

    $('#teacher_table_B').bootstrapTable(
        {
            method: 'GET',
            url: http1 + 'API/WMSInteractive/OperationHistory',
            // 'http://192.168.5.42:8080/'
            ajaxOptions: {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                }
            },
            queryParams: "queryParams",
            toolbar: "#toolbar",
            sidePagination: "true",
            search: "true",
            //                        showRefresh:"true",
            showColumns: "true",
            pageSize: "5",
            sortOrder: 'asc',
            pagination: true, //分页
            pageNumber: 1,
            pageList: [5, 10, 20, 50, 100, 'All'],
            queryParamsType: 'limit',
            exportDataType: 'all',
            exportTypes: ['excel'],
            showExport: true,  //是否显示导出按钮
            buttonsAlign: "left",
            Icons: 'glyphicon-export',
            exportOptions: {
                //                                ignoreColumn: [0,1],  //忽略某一列的索引
                fileName: '数据表',  //文件名称设置
                worksheetName: '库存数据表',  //表格工作区名称
                tableName: '库存数据表',
                excelstyles: ['blue', 'red', 'font-size', 'font-weight'],
                //                                onMsoNumberFormat: DoOnMsoNumberFormat
            },
            columns: [
                {
                    field: 'itemCode',
                    title: '料号'
                },
                {
                    field: 'BoxMaxQty',
                    title: '箱标准量'
                    //sortable: true
                },
                {
                    field: 'WwStatus',
                    title: '委外状态'
                    //sortable: true
                },
                {
                    field: "TransportMan",
                    title: "运输人"
                },
                {
                    field: "TransportCompany",
                    title: "运输公司",
                },
                {
                    field: "Transportation",
                    title: "运输方式",
                    formatter: function (value) {
                        if (value == "1") {
                            return "汽运"
                        }
                        if (value == "2") {
                            return "货运"
                        }
                        if (value == "3") {
                            return "邮寄"
                        }
                        if (value == "4") {
                            return "自提"
                        }
                        if (value == "5") {
                            return "直运"
                        }
                        if (value == "AIR") {
                            return "空运"
                        }
                        if (value == "EMS") {
                            return "快递"
                        }
                        if (value == "LAND") {
                            return "陆运"
                        }
                        if (value == "SEA") {
                            return "海运"
                        }
                        if (value == "SEAandAIR") {
                            return "海空联运"
                        }
                        if (value == "TRAIN") {
                            return "铁路"
                        }
                    },
                },
                {
                    field: 'operation',
                    title: '操作',
                    formatter: function (value, row, index) {
                        var s = '<button class="btn btn-info btn-sm edit"><span>编辑</span></button>';
                        // var d = '<button class="btn btn-danger btn-sm delete"><span>删除</span></button>';
                        var fun = '';
                        return s
                        // return s + ' ' + d;
                    },
                    events: {
                        // 操作列中编辑按钮的动作
                        'click .edit': function (e, value, row, index) {
                            selectID = row.userID;
                            rowEditOperation(row);
                        },
                        'click .delete': function (e, value, row, index) {
                            selectID = row.userID;
                            $('#deleteWarning_modal').modal('show');
                        }
                    }
                }],
        });
}
// 格式化数据
var formatData_A = function (data) {
    var l = [];
    console.log(json);
    if (data == "") {
        alert("库存为空")
    } else {
        $('#teacher_table_A').bootstrapTable('destroy');
        for (var i = 0; i < data.length; i++) {
            var m = data[i];
            var d = {
                'itemCode': m.itemCode,
                'itemName': m.itemName,
                'stockPlace': m.stockPlace,
                'qty': m.qty,
                'entertime': m.entertime,
            };
            l.push(d)
        }
        return l
    }
};


var formatData_B = function (data) {
    var l = [];
    console.log(json);
    if (data == "") {
        alert("库存为空")
    } else {
        $('#teacher_table_B').bootstrapTable('destroy');
        for (var i = 0; i < data.length; i++) {
            var m = data[i];
            var d = {
                'itemCode': m.itemCode,
                'itemName': m.itemName,
                'stockPlace': m.stockPlace,
                'qty': m.qty,
                'entertime': m.entertime,
            };
            l.push(d)
        }
        return l
    }
};




// var uploadedDataURL = "echarts_geojson/json/china.json";
// // var uploadedDataURL = "/asset/get/s/data-1479697763933-ByhDrJlGx.json";
// var myChart = echarts.init(document.getElementById('container'));

// $.get(uploadedDataURL, function (data) {
//     echarts.registerMap('china', data);

//     var geoCoordMap = {
//         //[宽，高]
//         '出口': [900, 650],
//         '入口': [1300, 650],
//         '等待进入电梯': [1100, 650],
//         '等待进去通道': [1100, 300],
//         '一号通道待置区': [700, 300],
//         '二号通道待置区': [500, 300],
//         '三号通道待置区': [300, 300],
//         '一号通道出货区': [700, 100],
//         '二号通道出货区': [500, 100],
//         '三号通道出货区': [300, 100]
//     };

//     var data = {
//         '出口': "1",
//         '入口': "1",
//         '等待进入电梯': "1",
//         '等待进去通道': "1",
//         '一号通道待置区': "1",
//         '二号通道待置区': "1",
//         '三号通道待置区': "1",
//         '一号通道出货区': "1",
//         '二号通道出货区': "1",
//         '三号通道出货区': "1",
//     };

//     //飞机箭头
//     var planePath = 'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z';

//     option = {
//         backgroundColor: '#000',
//         title: {
//             text: '',
//             left: '-5',
//             top: '10px',
//             textStyle: {
//                 color: '#ffffff',
//                 fontFamily: '微软雅黑',
//                 fontWeight: 'lighter',
//                 fontSize: 12
//             }
//         },
//         tooltip: {
//             trigger: 'item',
//             formatter: function (o) {

//                 return o.name + "：" + o.value[2] + "起";
//             }


//         },

//         geo: {
//             map: '',
//             label: {
//                 emphasis: {
//                     show: false
//                 }
//             },
//             roam: true,
//             itemStyle: {
//                 normal: {
//                     color: 'rgba(22,22,2,0)',
//                     areaColor: 'rgba(22,22,2,0)',
//                     borderColor: 'rgba(22,22,2,0)'

//                 },
//                 emphasis: {

//                     color: 'rgba(22,22,2,0)',
//                     areaColor: 'rgba(22,22,2,0)',
//                     borderColor: 'rgba(22,22,2,0)'
//                 }
//             }
//         },
//         series: [
//             {
//                 // 动态连接指示线
//                 type: 'lines',
//                 zlevel: 1,
//                 effect: {
//                     show: true,
//                     period: 3,
//                     trailLength: 0,
//                     color: '#A6C84C',
//                     symbolSize: 0
//                 },
//                 lineStyle: {
//                     normal: {
//                         color: '#a6c84c',
//                         width: 0,
//                         curveness: 0
//                     }
//                 },//465    
//                 data: [{

//                     coords: [geoCoordMap['出口'], geoCoordMap['等待进入电梯']]
//                 }, {

//                     coords: [geoCoordMap['入口'], geoCoordMap['等待进入电梯']]
//                 }, {

//                     coords: [geoCoordMap['等待进入电梯'], geoCoordMap['等待进去通道']]
//                 }, {

//                     coords: [geoCoordMap['等待进去通道'], geoCoordMap['一号通道待置区']]
//                 }, {

//                     coords: [geoCoordMap['一号通道待置区'], geoCoordMap['二号通道待置区']]
//                 }, {

//                     coords: [geoCoordMap['二号通道待置区'], geoCoordMap['三号通道待置区']]
//                 }, {

//                     coords: [geoCoordMap['一号通道待置区'], geoCoordMap['一号通道出货区']]
//                 }, {

//                     coords: [geoCoordMap['二号通道待置区'], geoCoordMap['二号通道出货区']]
//                 }, {

//                     coords: [geoCoordMap['三号通道待置区'], geoCoordMap['三号通道出货区']]
//                 }]
//             },
//             {
//                 //静态连接线
//                 type: 'lines',
//                 zlevel: 2,
//                 effect: {
//                     show: true,
//                     //滑动速度
//                     period: 2,
//                     trailLength: 0,
//                     //symbol: 'image://',
//                     //引用飞机
//                     // symbol: planePath,
//                     symbol: "arrow",
//                     symbolSize: 15
//                 },
//                 lineStyle: {
//                     normal: {
//                         color: '#a6c84c',
//                         width: 2,
//                         opacity: 0.4,
//                         curveness: 0
//                     }
//                 },
//                 data: [{

//                     coords: [geoCoordMap['出口'], geoCoordMap['等待进入电梯']]
//                 }, {

//                     coords: [geoCoordMap['入口'], geoCoordMap['等待进入电梯']]
//                 }, {

//                     coords: [geoCoordMap['等待进入电梯'], geoCoordMap['等待进去通道']]
//                 }, {

//                     coords: [geoCoordMap['等待进去通道'], geoCoordMap['一号通道待置区']]
//                 }, {

//                     coords: [geoCoordMap['一号通道待置区'], geoCoordMap['二号通道待置区']]
//                 }, {

//                     coords: [geoCoordMap['二号通道待置区'], geoCoordMap['三号通道待置区']]
//                 }, {

//                     coords: [geoCoordMap['一号通道待置区'], geoCoordMap['一号通道出货区']]
//                 }, {

//                     coords: [geoCoordMap['二号通道待置区'], geoCoordMap['二号通道出货区']]
//                 }, {

//                     coords: [geoCoordMap['三号通道待置区'], geoCoordMap['三号通道出货区']]
//                 }]
//             }, {

//                 type: 'effectScatter',
//                 coordinateSystem: 'geo',
//                 zlevel: 2,
//                 rippleEffect: {
//                     //闪动速度
//                     period: 4,
//                     scale: 2.5,
//                     brushType: 'stroke'
//                 },
//                 label: {
//                     normal: {
//                         show: true,
//                         position: 'right',
//                         formatter: '{b}'
//                     }
//                 },

//                 symbolSize: '25',
//                 itemStyle: {
//                     normal: {
//                         color: '#0D6695',
//                     }
//                 },
//                 data: [{
//                     name: '出口',
//                     value: geoCoordMap['出口'].concat(data.出口),

//                     // symbol: 'image:'+weixin
//                 }, {
//                     name: '入口',
//                     value: geoCoordMap['入口'].concat(data.入口),


//                 }, {
//                     name: '等待进入电梯',
//                     value: geoCoordMap['等待进入电梯'].concat(data.等待进入电梯),


//                 }, {
//                     name: '等待进去通道',
//                     value: geoCoordMap['等待进去通道'].concat(data.等待进去通道),


//                 }, {
//                     name: '一号通道待置区',
//                     value: geoCoordMap['一号通道待置区'].concat(data.一号通道待置区),


//                 }, {
//                     name: '二号通道待置区',
//                     value: geoCoordMap['二号通道待置区'].concat(data.二号通道待置区),


//                 }, {
//                     name: '三号通道待置区',
//                     value: geoCoordMap['三号通道待置区'].concat(data.三号通道待置区),


//                 }, {
//                     name: '一号通道出货区',
//                     value: geoCoordMap['一号通道出货区'].concat(data.一号通道出货区),


//                 }, {
//                     name: '二号通道出货区',
//                     value: geoCoordMap['二号通道出货区'].concat(data.二号通道出货区),


//                 }, {
//                     name: '三号通道出货区',
//                     value: geoCoordMap['三号通道出货区'].concat(data.三号通道出货区),


//                 },
//                 ]
//             }]
//     };


//     myChart.setOption(option);

//     var currentIndex = -1;
//     var timeTicket = setInterval(function () {
//         var dataLen = option.series[2].data.length;

//         currentIndex = (currentIndex + 1) % dataLen;

//         // 显示 tooltip
//         myChart.dispatchAction({
//             type: 'showTip',
//             seriesIndex: 2,
//             dataIndex: currentIndex
//         });
//     }, 1000);

// });








//清除

function qc_1(index) {

    mask.style.display = "block";
    login_A.style.display = "block";
    $("#msg_A").html(" ")
    $("#msg_A").html(index)
}

function qc() {

    load.style.display = "block";
    login_A.style.display = "none";

    var dex_1=$("#msg_A").html()

    $.ajax({

        type: "post",

        url: http1 + "API/WMSInteractive/ClearInventory",
        // url: "mn.json",

        data: { ShelfRow: dex_1 },

        success: function (data) {

            mask.style.display = "none";
            login_A.style.display = "none";
            load.style.display = "none";
            alert("出库指令下发成功！")
            ST()

        },
        error: function (data) {

            mask.style.display = "none";
            load.style.display = "none";
            login_A.style.display = "none";
            alert("出库指令下发失败，无法提交给服务器！")

        },
    })
}
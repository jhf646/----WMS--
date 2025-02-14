document.getElementById("id_card").value="320982199406042278";
document.getElementById("mobile").value="18961637060";
document.getElementById("sName").value="焦恒飞";
document.getElementById("sAddress").value="新吴区"

$(function () {
    $.ajaxSetup({ cache: false })

    var f1
    clearInterval(f1);
    f1 = setInterval(function () {
        document.getElementById("ce").click()

        document.getElementById("confirm-btn").click()
        
        document.getElementById("gobuy").click()
        
        document.getElementById("surebuy").click()
        
        document.getElementById("alert-btn").click()
    }, 4000)
})

// document.getElementById("id_card").value="自己的身份证";
// document.getElementById("mobile").value="自己的手机";
// document.getElementById("sName").value="自己的姓名";
// document.getElementById("sAddress").value="自己的地址"

$(function () {
    $.ajaxSetup({ cache: false })
    ce()
    function ce(){
        $("#sName").val("姓名")
        $("#mobile").val("手机")
        $("#id_card").val("身份证")
        $("#sAddress").val("地址") 
        $("a.change-inblock.btn")[1].click();
        setTimeout("ce_1()",1000);
    }
    function ce_1(){   
        document.getElementById("confirm-btn").click()
        $("#buying-ticket .img-gou ").addClass("change-block");
        document.getElementById("gobuy").click()
        clearInterval(f1);
    }   
    var f1 = setInterval(function () {      
        document.getElementById("surebuy").click();
        document.getElementById("alert-btn").click()  
    }, 300)
})


$(function () {
    $.ajaxSetup({ cache: false })
    ce()
    function ce(){
        $("#sName").val("焦恒飞")
        $("#mobile").val("18961637060")
        $("#id_card").val("320982199406042278")
        $("#sAddress").val("新吴区") 
        $("a.change-inblock.btn")[1].click();
        
        setTimeout("ce_1()",1000);
    }
    function ce_1(){   
    
        document.getElementById("confirm-btn").click()
        $("#buying-ticket .img-gou ").addClass("change-block");
        document.getElementById("gobuy").click()
        clearInterval(f1);
    }   
    var f1 = setInterval(function () {      
        document.getElementById("surebuy").click();
        document.getElementById("alert-btn").click()  
    }, 100)
})




function imitateClick(oElement, iClientX, iClientY) {
    var oEvent;
    if (document.createEventObject) { //For IE
        oEvent = document.createEventObject();
        oEvent.clientX = iClientX;
        oEvent.clientY = iClientY;
        oElement.fireEvent("onclick", oEvent);   
    } else {
        oEvent = document.createEvent("MouseEvents");
        oEvent.initMouseEvent("click", true, true, document.defaultView, 0, 0, 0, 
                                iClientX, iClientY/*, false, false, false, false, 0, null*/); 
        oElement.dispatchEvent(oEvent);
    }
}
var body = document.body;
var i=0
body.onclick = function(event) {
    i++
    console.log("clicked at (" + event.clientX + "," + event.clientY + "),点击次数为"+i+"");
};
imitateClick(body, 265, 254);

//循环点击 
$(function () {
    var f1, f2, f3
    clearInterval(f1);
    f1 = setInterval(function () {
        imitateClick(body, 875, 617);
    }, 500)
    clearInterval(f2);
    f2 = setInterval(function () {
        imitateClick(body, 916, 622);
    }, 500)
    clearInterval(f3);
    f3 = setInterval(function () {
        imitateClick(body, 781, 575);
    }, 500)
})

imitateClick(body, 100, 100);
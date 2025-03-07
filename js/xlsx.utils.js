var xlsxUtils = {
    Binary: {
        fixdata(data) { //文件流转BinaryString
            var o = "",
                l = 0,
                w = 10240;
            for (; l < data.byteLength / w; ++l) o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)));
            o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)));
            return o;
        },
        s2ab(s) { //字符串转字符流
            var buf = new ArrayBuffer(s.length);
            var view = new Uint8Array(buf);
            for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
            return buf;
        }
    },
    _wb: null,
    _rABS: false,
    /**
     * @desc  导入根据文件
     * @param {File} f 文件
     * @param {Function} c 回调
     * @return {Object} 回调值
     */
    import(f, c) {
        this.wb = null;
        var reader = new FileReader();
        reader.onload = function (e) {
            var data = e.target.result;
            xlsxUtils._wb = xlsxUtils._rABS ? XLSX.read(btoa(xlsxUtils.Binary.fixdata(data)), { type: 'base64' }) : XLSX.read(data, { type: 'binary' });
            if (typeof c == "function") { c(xlsxUtils._wb); }
        };
        if (xlsxUtils._rABS) {
            reader.readAsArrayBuffer(f);
        } else {
            reader.readAsBinaryString(f);
        }
    },
    /**
     * @desc  根据表Sheet名获取数据
     * @param {String} name 
     * @return {Object} 
     */
    getSheetByName(name) {//
        return XLSX.utils.sheet_to_json(xlsxUtils._wb.Sheets[name]);
    },
    /**
     * @desc  根据表Sheet索引获取数据
     * @param {Number} index 
     * @return {Object}
     */
    getSheetByIndex(index = 0) {
        return xlsxUtils.getSheetByName(xlsxUtils._wb.SheetNames[index]);
    },
    /**
     * @desc 导出
     * @param {Array} data 数据{title1:dataList,title2:dataList....}  
     * @param {String} type 
     * @return {Blob}
     */
    export(data, type) {
        var tmpWB = null;
        for (var title in data) {
            var tmpdata = xlsxUtils.format2Sheet(data[title]);
            tmpWB = xlsxUtils.format2WB(tmpdata, title, tmpWB);
        }
        return xlsxUtils.format2Blob(tmpWB, type);
    },
    /**
     * 从数据数组或对象中根据key生成相同key值的对象
     * @param {Object|Array} data 
     * @return {Object}
     */
    readDataHead(data) {
        var o = {}, d = Array.isArray(data) ? Object.keys(data[0]) : data; for (var i of d) o[i] = i;
        return o;
    },
    /**
     * @desc 格式化数据为Sheet格式
     * @param {Array} json 数据
     * @param {Number} n 列偏移
     * @param {Number} r 行偏移
     * @param {Array} keyMap 对象键数组
     * @param {Function|Boolean} t 数据
     */
    format2Sheet(json, n, r, keyMap, t) {
        keyMap = keyMap || Object.keys(json[0]);
        var types = (t == undefined ? ((v) => (({ "number": "n", undefined: "s", "boolean": "b","string":"s" })[typeof v])||"s") : t);
        n = n || 0;
        r = r || 0;
        var tmpdata = {};//用来保存转换好的json 
        var t1 = json.map((v, i) => keyMap.map((k, j) => Object.assign({}, {
            v: v[k],
            position: ((j + n) > 25 ? xlsxUtils.getCharCol((j + n)) : String.fromCharCode(65 + (j + n))) + (i + 1 + r),
        }))).reduce((prev, next) => prev.concat(next)).forEach((v, i) => tmpdata[v.position] = {
            v: v.v,
            t: types?types(v.v):"s"
        });
        return tmpdata;
    },
    /**
     * @desc 格式化数据为Sheet格式
     * @param {Array} sheetData 
     * @param {String} title 
     * @param {Object} wb 
     * @param {Object} ref
     */
    format2WB(sheetData, title, wb, ref) {
        title = title || "mySheet";
        var outputPos = Object.keys(sheetData);
        if (!wb) wb = { Sheets: {}, SheetNames: [] };
        wb.SheetNames.push(title);
        wb.Sheets[title] = Object.assign({}, sheetData, {
            '!ref': ref || (outputPos[0] + ':' + outputPos.reverse().find(_=>_.indexOf("!")==-1))//设置填充区域
        });
        return wb;
    },
    /**
     * @desc 将xlsx Workbook 转为blob
     * @param {Array} wb 
     * @param {String} type 类型
     */
    format2Blob(wb, type) {
        return new Blob([xlsxUtils.Binary.s2ab(XLSX.write(wb,
            { bookType: (type == undefined ? 'xlsx' : type), bookSST: false, type: 'binary' }//这里的数据是用来定义导出的格式类型
        ))], { type: "" });
    },
    /**
     * @desc 匹配单元格对应的标识
     * @param {Number} n 
     */
    getCharCol(n) {
        let temCol = '',
            s = '',
            m = 0
        while (n > 0) {
            m = n % 26 + 1
            s = String.fromCharCode(m + 64) + s
            n = (n - m) / 26
        }
        return s
    },
};
 
module.exports = function(){
    return xlsxUtils;   
};
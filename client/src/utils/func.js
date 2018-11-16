export function getTime(time){
    return time.substr(time.length-5,5)
};

export function getDetailTime(d1,d2) {
    var dateBegin = new Date(d1.replace(/-/g, "/"));
    var dateEnd = new Date(d2.replace(/-/g, "/"));
    var dateDiff = dateEnd.getTime() - dateBegin.getTime();//时间差的毫秒数
    var dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000));//计算出相差天数
    var leave1=dateDiff%(24*3600*1000)    //计算天数后剩余的毫秒数
    var hours=Math.floor(leave1/(3600*1000))//计算出小时数
    //计算相差分钟数
    var leave2=leave1%(3600*1000)    //计算小时数后剩余的毫秒数
    var minutes=Math.floor(leave2/(60*1000))//计算相差分钟数
    //计算相差秒数
    var leave3=leave2%(60*1000)      //计算分钟数后剩余的毫秒数
    var seconds=Math.round(leave3/1000)
    return [dayDiff,hours,minutes]
}

export function getDate(date) { 
    let Date = date.replace(/-/g, "/")
    return Date.substr(0,10)
 }
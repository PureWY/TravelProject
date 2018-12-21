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

 export function format(format) {
    var args = {
      'M+': this.getMonth() + 1,
      'd+': this.getDate(),
      'h+': this.getHours(),
      'm+': this.getMinutes(),
      's+': this.getSeconds(),
      'q+': Math.floor((this.getMonth() + 3) / 3),
      S: this.getMilliseconds()
    }
    if (/(y+)/.test(format)) {
      format = format.replace(
        RegExp.$1,
        (this.getFullYear() + '').substr(4 - RegExp.$1.length)
      )
    }
    for (var i in args) {
      var n = args[i]
      if (new RegExp('(' + i + ')').test(format)) {
        format = format.replace(
          RegExp.$1,
          RegExp.$1.length == 1 ? n : ('00' + n).substr(('' + n).length)
        )
      }
    }
    return format
  }

  function getFormatDate(arg) {
    if (arg == undefined || arg == '') {
        return '';
    }
  
    var re = arg + '';
    if (re.length < 2) {
        re = '0' + re;
    }
  
    return re;
  }

  export function getPreDay(date, days) {
    if (days == undefined || days == '') {
        days = 1;
    }
    var date = new Date(date);
    date.setDate(date.getDate() - days);
    var month = date.getMonth() + 1;
    var day = date.getDate();
    return date.getFullYear() + '-' + getFormatDate(month) + '-' + getFormatDate(day);
  }
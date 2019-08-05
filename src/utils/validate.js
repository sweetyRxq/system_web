/**
 * Created by jiachenpan on 16/11/18.
 */

export function isvalidUsername(str) {
  const valid_map = ['admin', 'editor']
  // return valid_map.indexOf(str.trim()) >= 0
  return true
}

/* 合法uri*/
export function validateURL(textval) {
  const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return urlregex.test(textval)
}

/* 小写字母*/
export function validateLowerCase(str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/* 大写字母*/
export function validateUpperCase(str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/* 大小写字母*/
export function validatAlphabets(str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}

/* 数字*/
export function validatNumber(rule, value, callback, name) {
  var validatName
  if (name) {
    validatName = Object.keys(name)[0]
  }
  if (value === '') {
    callback(new Error('请输入数值!'))
  } else {
    var myreg = /^[0-9]*$/g
    if (!myreg.test(value)) {
      callback(new Error('只允许输入数字!'))
    } else {
      callback()
    }
  }
}

/* 大小写字母、数字*/
export function validatLetterNumber(rule, value, callback, name) {
  var validatName
  if (name) {
    validatName = Object.keys(name)[0]
  }
  if (value === '' || value == null) {
    if (validatName == 'companyNumber') {
      callback(new Error('请输入企业编号'))
    } else if (validatName == 'departmentNumber') {
      callback(new Error('请输入部门编号'))
    } else if (validatName == 'warehouseNumber') {
      callback(new Error('请输入仓库编号'))
    } else if (validatName == 'reportNumber') {
      callback(new Error('请输入报告编号'))
    } else if (validatName == 'uniqueCode') {
      callback(new Error('请输入唯一识别码'))
    } else if (validatName == 'userNo') {
      callback(new Error('请输入编号'))
    } else if (validatName == 'driverNo') {
      callback(new Error('请输入驾驶员编号'))
    } else if (validatName == 'drivingLicense') {
      callback(new Error('请输入驾驶证编号'))
    }
  } else if ((value.length != 18) && (validatName == 'drivingLicense')) {
    callback(new Error('请输入正确的驾驶证编号'))
  } else {
    var myreg = /^[0-9a-zA-Z]*$/g
    if (!myreg.test(value)) {
      callback(new Error('只允许输入大小写字母和数字'))
    } else {
      callback()
    }
  }
}

/* 中文、大小写字母、数字*/
export function validatChineseLetterNumber(rule, value, callback, name) {
  var validatName
  if (name) {
    validatName = Object.keys(name)[0]
  }
  if (value === '' || value == null) {
    if (validatName == 'companyName') {
      callback(new Error('请输入企业名称'))
    } else if (validatName == 'departmentName') {
      callback(new Error('请输入部门名称'))
    } else if (validatName == 'warehouseName') {
      callback(new Error('请输入仓库名称'))
    }
  } else {
    var myreg = /^[A-Za-z0-9\u4e00-\u9fa5]+$/gi
    if (!myreg.test(value)) {
      callback(new Error('只允许输入汉字、大小写字母和数字'))
    } else {
      callback()
    }
  }
}

/* 手机号*/
export function validaPhone(rule, value, callback) {
  if (value === '') {
    callback(new Error('请输入手机号码'))
  } else {
    var myreg = /^[1][3,4,5,7,8][0-9]{9}$/
    if (!myreg.test(value)) {
      callback(new Error('请输入正确的手机号码'))
    } else {
      callback()
    }
  }
}

/* 名称*/
export function nameValid(rule, value, callback) {
  if (value === '') {
    callback(new Error('请输入名称'))
  } else {
    var myreg = /^[\u4e00-\u9fa5_a-zA-Z0-9]+$/
    if (!myreg.test(value)) {
      callback(new Error('名称不能含有特殊字符'))
    } else {
      callback()
    }
  }
}

/* 编号*/
export function numberValid(rule, value, callback) {
  if (value === '') {
    callback(new Error('请输入编号'))
  } else {
    var myreg = /^[0-9a-zA-Z-]+$/
    if (!myreg.test(value)) {
      callback(new Error('编号不能含有中文及特殊字符'))
    } else {
      callback()
    }
  }
}

/* 年龄*/
export function ageValid(rule, value, callback) {
  if (value === '') {
    callback(new Error('请输入年龄'))
  } else {
    var myreg = /^([1-9]\d)$|^(1\d\d)$/
    if (!myreg.test(value)) {
      callback(new Error('请输入正确合理的年龄'))
    } else {
      callback()
    }
  }
}

/* 账号*/
export function accountValid(rule, value, callback) {
  if (value === '') {
    callback(new Error('请输入用户账号'))
  } else {
    var myreg = /^[0-9A-Za-z]+$/
    if (!myreg.test(value)) {
      callback(new Error('用户账号只能为字母、数字'))
    } else {
      callback()
    }
  }
}

/* 车牌*/
export function plateValid(rule, value, callback) {
  if (value === '') {
    callback(new Error('请输入车辆牌照'))
  } else {
    var myreg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/
    if (!myreg.test(value)) {
      callback(new Error('请输入正确的车辆牌照'))
    } else {
      callback()
    }
  }
}

/* 经度*/
export function longrg(rule, value, callback) {
  if (value === '') {
    callback(new Error('请输入经度'))
  } else {
    var myreg = /^(\-|\+)?(((\d|[1-9]\d|1[0-7]\d|0{1,3})\.\d{0,6})|(\d|[1-9]\d|1[0-7]\d|0{1,3})|180\.0{0,6}|180)$/
    if (!myreg.test(value)) {
      callback(new Error('请输入正确的经度值（整数部分为0-180,小数部分为0到6位!）'))
    } else {
      callback()
    }
  }
}

/* 纬度*/
export function latreg(rule, value, callback) {
  if (value === '') {
    callback(new Error('请输入纬度度'))
  } else {
    var myreg = /^(\-|\+)?([0-8]?\d{1}\.\d{0,6}|90\.0{0,6}|[0-8]?\d{1}|90)$/
    if (!myreg.test(value)) {
      callback(new Error('请输入正确的纬度值（整数部分为0-90,小数部分为0到6位!）'))
    } else {
      callback()
    }
  }
}

/* 长宽高*/
export function numberValueValid(rule, value, callback) {
  if (value == '' || value == 0) {
    callback(new Error('请输入大于0的值'))
  } else if (value > 1000) {
    callback(new Error('请输入小于或等于1000的值'))
  } else {
    var myreg = /^[0-9]*$/g
    if (!myreg.test(value)) {
      callback(new Error('值只能输入数字'))
    } else {
      callback()
    }
  }
}

/* 体积*/
export function volumeValid(rule, value, callback) {
  if (value === '' || value == 0) {
    callback(new Error('体积必须为大于0值'))
  } else {
    var myreg = /^[0-9a-zA-Z/-]+$/
    if (value > 1000) {
      callback(new Error('最大容量为1000L'))
    } else {
      callback()
    }
  }
}

/* IP*/
export function ipValid(rule, value, callback) {
  if (value === '') {
    callback(new Error('请输入IP地址'))
  } else {
    var myreg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])(\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])){3}$/
    if (!myreg.test(value)) {
      callback(new Error('请输入正确的IP地址格式'))
    } else {
      callback()
    }
  }
}

/* global - 验证(最大长度限制以及不允许有空格存在) */
export function globalValid(rule, value, callback){
  let limitObj = rule.limit
  value = value || ''
  let tips = Vue.$t('global_validate.max_length1')+limitObj.max+Vue.$t('global_validate.max_length2')
  if(typeof value != 'undefined' && value != null){
    if(value.indexOf(" ") != -1 ){
      callback(new Error(Vue.$t('global_validate.not_space')))
    }else if(value.length>limitObj.max){
      callback(new Error(tips))
    }else{
      callback()
    }
  }else{
    callback()
  }
}

/*account - 验证(以英文字母开头，只能包含英文字母、数字和下划线) */
export function letterNumberLineValid(rule,value,callback){
  var myreg = /^[a-zA-Z][a-zA-Z0-9_]*$/g
  if (!myreg.test(value)) {
    callback(new Error(Vue.$t('global_validate.uppercase_number_line')))
  } else {
    callback()
  }
}

/* 大写字母 - 验证（只能输入大写字母）*/
export function UpperCasevalidate(rule,value,callback) {
  const reg = /^[A-Z]+$/
  if(!reg.test(value)){
    callback(new Error(Vue.$t('global_validate.uppercase')))
  }else{
    callback()
  }
}

/* 大写字母 - 验证（只能输入大写字母和下划线）*/
export function UpperCaseLinevalidate(rule,value,callback) {
  const reg = /^[A-Z_]+$/
  if(!reg.test(value)){
    callback(new Error(Vue.$t('global_validate.uppercase_line')))
  }else{
    callback()
  }
}
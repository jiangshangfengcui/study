/**
* 插件：表单验证
*
* 2013.10.22
*/
var ckform = (function(){
	return {
		//判断是否是整数
		isInteger : function(str){
			return /^[-]{0,1}[0-9]{1,}$/.test(str);
		},
		//判断是否为数字
		isNumber : function(str){
			return /^[0-9]+$/.test(str);
		},
		//判断是否为数字字母组合
		isZmOrNum : function(str){
			return /[A-Za-z].*[0-9]|[0-9].*[A-Za-z]/.test(str);
		},
		//验证email
		isEmail : function(str){
			return /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(str);
		},
		//验证手机号码
		isMobile : function(str){
			return /^13[0-9]{9}$|14[0-9]{9}|15[0-9]{9}$|18[0-9]{9}$/.test(str);
		},
		isLength : function(str,min,max){
			if(str.length>=min&&str.length<=max){
				return true; 
			}
			else{
				return false;
			}
		}
	}
})();
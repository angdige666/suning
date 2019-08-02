// 注册验证
	// 1、正则判断函数
function check(str,type) {
	switch(type) {
		case "phone":
			var r = /^1((3[\d])|(4[5,6,9])|(5[0-3,5-9])|(6[5-7])|(7[0-8])|(8[1-3,5-8])|(9[1,8,9]))\d{8}$/;

			break; 
	}
	return r.test(str);
}

// $('.phone')[0].focus(function() {
// 	$('.phone')[0].innerHtml = "";
// })    ^(?![\d]+$)(?![a-zA-Z]+$)(?![!#$%^&*]+$)[\da-zA-Z!#$%^&*]{6,20}$

//判断输入的手机号
var phone = document.getElementsByClassName('phone')[0];
var promptBox = document.getElementsByClassName('promptBox')[0];
var phoneNumber = document.getElementsByClassName('phoneNumber')[0];
var phoneP2 = phoneNumber.getElementsByClassName('p2')[0];
let str = phone.placeholder;
let result = null;
phone.onfocus = function() {	
	phone.placeholder = "";	
	promptBox.innerHTML = "";
}
phone.onblur = function() {
	if(phone.value == "") {
		phone.placeholder = str;
	}else {
		result = check(Number(phone.value),"phone");
		if(result == false) {
			promptBox.innerHTML = "格式不正确,请您输入正确的手机号";
		}else {
			phoneP2.style.display = "block";
		}
	}
}

//验证码事件判断
var checkMa = document.getElementsByClassName('checkMa')[0];
var number = document.getElementsByClassName('number')[0];
var numA2 = checkMa.getElementsByClassName('a2')[0];

number.onblur = function() {
	if(phone.value == "") {
		promptBox.innerHTML = "请输入注册手机";
	}
}
numA2.onclick = function() {
	if(phone.value == "") {
		promptBox.innerHTML = "请输入注册手机";
	}
}

//设置密码的判断
var passWord = document.getElementsByClassName('passWord')[0];
var pass = passWord.getElementsByClassName('pass')[0];
var passP2 = passWord.getElementsByClassName('p2')[0];

var checkPw = document.getElementsByClassName('checkPw')[0];
var safeLevel = checkPw.getElementsByClassName('safeLevel')[0];
var checkP = checkPw.getElementsByTagName('p')[0];
var sL3 = safeLevel.getElementsByClassName('sL3')[0];
var sL4 = safeLevel.getElementsByClassName('sL4')[0];

var speChar = ["~","!","@","#","$","%","^","&","*","(",")","_","+","-","=","{","}","[","]","?","/",",",".",";"];

let isNumber = false;
let isCode = false;
let isSpeChar = false;
//密码框获得焦点
pass.onfocus = function() {
	checkP.innerHTML = `6-20个字符，由字母，数字和符号的两种以上组合。<a href="#">密码设置建议</a>`;
	checkP.style.color = "#999";
	checkP.style.display = "block";
	
}
//密码框输入内容时
pass.oninput = function() {
	let str = pass.value;
	if(pass.value != "") {
		passP2.style.display = "block";
	}else {
		passP2.style.display = "none";
		
	}

	if(str.length>5) {
		safeLevel.style.display = "block";
		for(let i =0;i<str.length;i++) {
			if(48<=str.charCodeAt(i) && str.charCodeAt(i)<=57) {
				isNumber = true;							
			}
			if((65<str.charCodeAt(i) && str.charCodeAt(i)<90) || (97<str.charCodeAt(i) &&str.charCodeAt(i)<122)) {
				isCode = true;
			}

			if(speChar.indexOf(str.charAt(i))>-1) {
				isSpeChar = true;
			}
		}
		if((isNumber && isCode) || (isNumber && isSpeChar) || (isCode && isSpeChar)) {
			sL3.style.background = "#ffaa00";
		}

		if(isNumber && isCode && isSpeChar) {
			sL4.style.background = "#ffaa00";
		}

	}else {
		safeLevel.style.display = "none";
	}
}
//密码框失去焦点
pass.onblur = function() {
	let str = pass.value;

	var cont = 0;
		var num = 0;
		var char = 0;
	if(pass.value == "") {
		checkP.style.display = "none";
	}

	if(str.length<6) {
		checkP.innerHTML = "请输入6-20位密码！";
		checkP.style.color = "red";
	}

	if(str.length>=6) {
		var firstCode = str.charCodeAt(0);
		for(var i=0;i<str.length;i++) {
			var code = str.charCodeAt(i);		
			if(48<=code && code<=57) {
				if(firstCode == code) {
					cont++;
				}
				num++;					
			}else if((65<code && code<90) || (97<code && code<122)) {
				if(firstCode == code) {
					cont++;
				} 
				char++;				
			}
		}
		if(cont == str.length) {
			checkP.innerHTML = "不能为同一字符！";
			checkP.style.color = "red";
		}else if(num == str.length) {
			checkP.innerHTML = "不能为纯数字！";
			checkP.style.color = "red";
		}else if(char == str.length) {
			checkP.innerHTML = "不能为纯字母！";
			checkP.style.color = "red";
		}
	}
}

let flag = true;
passP2.onclick = function() {
	if(flag) {
		pass.type = "text";
		passP2.style.background = `url(image/reg_login/pass1.png)`;
		flag = false;
	}else {
		pass.type = "passWord";
		passP2.style.background = `url(image/reg_login/pass2.png)`;
		flag = true;
	}
}


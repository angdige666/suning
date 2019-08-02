function $(str) {
	if(str.charAt(0) == "#") {
		return document.getElementById(str.substring(1));
	}else if(str.charAt(0) == ".") {
		return document.getElementsByClassName(str.slice(1));
	}else {
		return document.getElementsByTagName(str);
	}
}

//秒杀时间
var waitLengthP = $('.daoshiWait')[0].children[0].children;
var waitLength = $('.WaitLength')[0];
var limBnanerChild = $('.limBnaner')[0].children;

for(let i=0;i<waitLengthP.length;i++) {
	var pre=""; //上一个 
	var por=0; //当前
	waitLengthP[i].onmouseover = function() {
		pre = por; //上一张编号
		por = i;   //当前编号
		waitLengthP[pre].style.color = "#333";
		waitLengthP[pre].style.background="none";

		waitLengthP[por].style.color = "#fff";
		waitLengthP[por].style.background="#ff4e43";

		// if(i<waitLengthP.length-2) {
		// 	waitLength.style.marginLeft = `${-i*200}px`;
		// }

		limBnanerChild[pre].style.display = "none";
		limBnanerChild[por].style.display = "block";

	}
}


//秒杀轮播
$('.btnLeft')[0].onclick = function() {
	$('.bnanerLength')[0].style.marginLeft = "-1255px";
}
$('.btnRight')[0].onclick = function() {
	$('.bnanerLength')[0].style.marginLeft = "0px";
}

//轮播图
window.onload = function() {
	new Banner({
		
	},$('#banner'));
}

// 号外轮播
var centerLength = $('.centerLength')[0];
var num = 0;
var maxTop = centerLength.offsetHeight - 270;
setInterval(function() {
	num -= 255;
	if(num < -maxTop) {
		num = 0;
	}
	centerLength.style.cssText = `
		position:absoult;
		top:${num}px;
		transition: all 1s;
	`;

},5000);

var aLis = $('.con_nav_length')[0].children;
var aLi = $('.con_nav_length')[0];
var contents = $('.contentListBox');
for(let i=0;i<aLis.length;i++) {
	var pre=""; //上一张 
	var por=0; //当前
	aLis[i].onclick = function() {
		pre = por; //上一张编号
		por = i;   //当前编号
		//恢复上一张的样式
		aLis[pre].style.color = "#333";
		aLis[pre].style.background = "none";
		//更改当前的样式
		aLis[por].style.color = "#fff";
		aLis[por].style.background = "#e96262";

		contents[pre].style.display = "none";
		contents[por].style.display = "block";

		if(aLis[i]<aLis.length-3) {
			aLi.style.marginLeft = `${-i*40}px`;
		}
	}
}

// var youLike = $('#youLike');
// var datas = null;
// console.log(youLike);
// // window.onload = function() {
// 	//去后台拿数据
// 	var xhr=new XMLHttpRequest();
// 	xhr.open("get","php/index.php");
	
// 	xhr.onreadystatechange=function(){
// 		if(xhr.readyState==4&&xhr.status==200){				
// 			datas = JSON.parse(xhr.responseText);	
// 			console.log(datas);			
// 			new youLike({
// 				data:datas,
// 				width:1490,
// 				height:1000,
// 				num:5,
// 				img:{
// 					width:260,
// 					height:260
// 				}
				
// 			},youLike);
// 		}
// 	}
// 	xhr.send()
// }









// var liDoms = document.getElementById('banLeftUl').children;
// var leftLiHover = $('.leftLiHover');

// console.log(leftLiHover);
// for(let i=0;i<liDoms.length;i++) {
// 	liDoms[i].onmouseover = function() {
// 		leftLiHover[0].style.display = "block";
// 	}
// 	liDoms[i].onmouseout = function() {
// 		leftLiHover[0].style.display = "none";
// 	}
// }
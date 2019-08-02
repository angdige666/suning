//轮播图封装分析

//1、轮播图外层盒子的大小  width height
//2、没传图片有默认图片
//3、图片的轮播时间
//4、小点的大小、形状 默认颜色、选中时的颜色、位置
//5、...

// new BannerPlay({
// 	width:500,   //轮播图宽
// 	height:300,  //轮播图高
// 	imgs:["img/img1.jpg","img/img2.jpg"],//轮播图的图片
// 	timeSpace:2000,  //轮播图播放时长
// 	type:['fade','filp'],  //切换的类型
// 	dou:{
// 		douColor:"pink",     //豆的默认颜色
// 		douHeightColor:"red",  //豆选中时的颜色
// 		douSize:10;       //豆的大小
// 		douPos:["上","下"],    //豆的位置
// 		douType:['circle','square'],   //豆的形状
// 	}
// })
class BannerPlay {
	constructor(obj,boxDom) {
		this.boxDom = boxDom;
		this.imgDoms = [];
		this.liDoms = [];
		this.btnLeft = null;
		this.btnRight = null;
		this.timer = null;
		//如果没有传obj数据，则使用默认的数据
		let defaultObj = {
			width:500,
			height:300,
			imgs:["img/1.jpg","img/2.jpg","img/3.jpg","img/4.jpg"],
			timeSpace:2000,
			type:"normal",
			dou:{
				douColor:"pink",
				douHeightColor:"red",
				douSize:20,
				douPos:"下",
				douType:'circle',
			},
			ord:0,
			timer:null
		}

		for(let key in defaultObj) {
			if(obj[key]) {
				this[key] = obj[key];
			}else {
				this[key] = defaultObj[key];
			}
		}
		//把数据呈现出去
		this.render();
		this.autoPlay();
		this.btnRight.onclick = () =>{
			this.click(this.btnRight);
		}
		this.btnLeft.onclick = () =>{
			this.click(this.btnLeft);
		}

	}

	//写外观

	render() {
		//给盒子相对定位，里面的图片需要相对父级定位
		this.boxDom.style.position = "relative";

		//1、创建图片
		for(let i=0;i<this.imgs.length;i++) {
			//创建img标签
			let imgDom = document.createElement('img');
			//给img附地址
			imgDom.src = this.imgs[i];
			imgDom.style.cssText = `
				position:absolute;
				top:0;
				left:0;
				width:100%;
				height:100%;
				z-index:1;
			`;
			if(i == 0){
				imgDom.style.zIndex = 2;
			}
			//把创建的imgDom添加到boxDom中
			this.boxDom.appendChild(imgDom);
			this.imgDoms.push(imgDom);
		}

		//2、创建豆豆
			//1)、创建豆豆的容器
		let douBox = document.createElement('ul');
			//2)、豆豆容器的样式
		douBox.style.cssText = `
			position:absolute;
			width:100%;
			height:10%;
			z-index:999;
			list-style:none;
		`;

		//判断豆豆容器的上下位置
		if(this.dou.douPos == "下") {
			douBox.style.bottom = "0";
		}else if(this.dou.douPos == "上") {
			douBox.style.top = "0";
		}
		//把豆豆容器放进盒子里
		this.boxDom.appendChild(douBox);
		//3、创建豆豆容器里的li(小豆豆)// margin-right:${this.dou.douSize}px;
		for(let i=0;i<this.imgs.length;i++) {
			let liDom = document.createElement('li');
			//小豆豆（li）的样式
			let marTop = (douBox.height-this.dou.douSize)/2;
			liDom.style.cssText = `
				float:left;
				width:${this.dou.douSize}px;
				height:${this.dou.douSize}px;				
				border-radius:50%;
				margin-right:${this.dou.douSize}px;
				margin-top:5px;
				background:${this.dou.douColor};
			`;			
			//把创建的小豆豆放进豆豆容器中
			douBox.appendChild(liDom);
			this.liDoms.push(liDom);
			// console.log(this.liDoms);
		}
		let marLeft = (this.width - (((this.imgs.length * 2)-1)*this.dou.douSize))/2;
		
		douBox.children[0].style.cssText = `
			float:left;
			margin-left:${marLeft}px;			
			width:${this.dou.douSize}px;
			height:${this.dou.douSize}px;				
			border-radius:50%;
			margin-top:5px;
			margin-right:${this.dou.douSize}px;
			background:${this.dou.douHeightColor};
		`;

		//创建按钮的父盒子
		let btnBox = document.createElement('div');

		btnBox.style.cssText = `
			position:absolute;
			top:125px;
			width:100%;
			height:50px;
			z-index:4;
		`;
		this.boxDom.appendChild(btnBox);
		//创建左右按钮
		this.btnLeft = document.createElement('div');
		this.btnRight = document.createElement('div');
		this.btnLeft.style.cssText = `
			height:100%;
			width:40px;
			float:left;
			text-align:center;
			line-height:100%;
			background:rgba(255,255,255,.8);
		`;
		this.btnRight.style.cssText = `
			height:100%;
			width:40px;
			float:right;
			text-align:center;
			line-height:100%;
			background:rgba(255,255,255,.8);
		`;
		btnBox.appendChild(this.btnRight);
		btnBox.appendChild(this.btnLeft);


	}


	//自动播放
	autoPlay() {
		this.timer = setInterval(() => {
	
			this.preOrd = this.ord;
			this.ord++;
			//边界判断
			if(this.ord>this.imgs.length-1) {
				this.ord = 0;
			}

			//修改图片的外观
			this.imgDoms[this.preOrd].style.zIndex = 0;
			this.imgDoms[this.ord].style.zIndex = 2;

			//修改豆豆的外观
			// console.log(this.liDoms);
			this.liDoms[this.preOrd].style.background = this.dou.douColor;
			this.liDoms[this.ord].style.background = this.dou.douHeightColor;

			//鼠标移入时，定时器清除，图片不循环
			this.boxDom.onmouseover = () => {
				clearInterval(this.timer);
				this.timer = null;
			}
			//鼠标移出时，定时器开启，图片继续循环
			this.boxDom.onmouseout = () => {
				this.autoPlay();
			}

		},this.timeSpace);
	}

	//点击左右按钮
	//1、点击右边按钮
	click() {
		if(this.btnRight.onclick) {
			this.preOrd = this.ord;
			this.ord ++;
			//判断边界
			if(this.ord>this.imgs.length-1) {
				this.ord = 0;
			}
			//图片外观

			this.imgDoms[this.preOrd].style.zIndex = 0;
			this.imgDoms[this.ord].style.zIndex = 2;
			//豆豆外观
			this.liDoms[this.preOrd].style.background = this.dou.douColor;
			this.liDoms[this.ord].style.background = this.dou.douHeightColor;
		}else if(this.btnLeft.onclick) {
			this.preOrd = this.ord;
			this.ord --;
			//判断边界
			if(this.ord<0) {
				this.ord = this.imgs.length-1;
			}
			//图片外观
			this.imgDoms[this.preOrd].style.zIndex = 0;
			this.imgDoms[this.ord].style.zIndex = 2;
			//豆豆外观
			this.liDoms[this.preOrd].style.background = this.dou.douColor;
			this.liDoms[this.ord].style.background = this.dou.douHeightColor;
		}
	}
	//点击豆豆
	douClick() {
		
	}

}


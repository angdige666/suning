class Banner{
	//1.构造函数
	constructor(obj,boxDom){
		//1.1属性
		this.boxDom=boxDom;//div盒子
		this.imgDoms=[];//放图片的空数组
		this.liDoms=[];//放豆豆的空数组
		//默认样式
		let defaultObj={
			width:1036,
			height:603,
			imgs:["image/img_index/banner1.jpg","image/img_index/banner2.jpg","image/img_index/banner3.jpg","image/img_index/banner4.jpg","image/img_index/banner5.jpg"],
			title:["30万图书5折封顶","童书5折","教辅79-30","招商","暑期儿童分级阅读书目","登月主题","电子书","文艺","博集","经管励志"],
			href:["http://www.baidu.com","childbook.html","referencebook.html","attract.html","summervacationbook.html","moonfallbook.html","ebook.html","artbook.html","richbook.html","economybook.html"],
			timeSpace:3000,
			douColor:"white",
			color:"black",
			douHeightColor:"#ff4848",
			heightColor:"white",
			douSize:42,
			douIsCircle:true,
			douPosition:"下",
			myTimer:null,
			order:0
		}
		for(let key in defaultObj){
			if(obj[key]){
				this[key]=obj[key];
			}else{
				this[key]=defaultObj[key];
			}
		}
		//1.2创建外观（引用方法）
		this.render();
		this.addEvent();
		this.autoPlayer();
	}
	//2.方法
	//2.1渲染页面（动态创建Dom对象）(html和css代码)
	render(){
		//盒子设置为相对定位
		this.boxDom.style.position = "relative";
		// this.boxDom.style.position = "relative";
		//1.创建img标签
		for(var i=0;i<this.imgs.length;i++){
			let imgDom=document.createElement("img");
			imgDom.src=this.imgs[i];
			imgDom.title=this.title[i];
			imgDom.style.cssText=`
				position:absolute;
				left:0;
				top:0;
				width:100%;
				height:100%;
				z-index:1;
			`;
		if(i==0){
			imgDom.style.zIndex=2;
		}
		this.boxDom.appendChild(imgDom);
		this.imgDoms.push(imgDom);
		}
		//2.1创建放豆豆的盒子ul
		let ulDom=document.createElement("ul");
		ulDom.style.cssText=`
			position:absolute;
			list-style:none;
			z-index:3;
		`;
		if(this.douPosition=="上"){
			ulDom.style.top="20px";
			ulDom.style.left="20px";
		}else if(this.douPosition=="下"){
			ulDom.style.bottom="20px";
			ulDom.style.right="20px";
		}
		this.boxDom.appendChild(ulDom);
		//2.1创建豆豆li
		for(let i=0;i<this.imgs.length;i++){
			let liDom=document.createElement("li");
			liDom.style.cssText=`
			float:left;
			width:${this.douSize}px;
			height:${this.douSize}px;
			margin-right:20px;
			background-color: ${this.douColor};
			color:${this.color};
			text-align:center;
			line-height:${this.douSize}px;
			`;
			liDom.innerHTML=i+1;
			
		if(this.douIsCircle){
				liDom.style.borderRadius="50%";
			}
		if(i==0){
			liDom.style.backgroundColor=this.douHeightColor;
			liDom.style.color=this.heightColor;
		}
		ulDom.appendChild(liDom);
		this.liDoms.push(liDom);
		}
	}
	//2.2添加事件
	addEvent(){
		//1)鼠标放在图片上，停止播放
		this.boxDom.onmouseover=()=>{
			this.stopPlayer();
		}
		for(let i=0;i<this.imgDoms.length;i++){
			this.imgDoms[i].onmouseover=()=>{
				console.log(this.imgDoms[i]);
				//鼠标变成手？？
				// this.imgDoms[i].style.cursor="pointer";
				this.mouseChange(this.imgDoms[i],"pointer");
			}
		}
		//2）鼠标离开，继续播放
		this.boxDom.onmouseout=()=>{
			this.autoPlayer();	
		}

	
		for(let i=0;i<this.imgDoms.length;i++){
			this.imgDoms[i].onmouseout=()=>{
				//鼠标变回原来的样子
				this.mouseChange(this.imgDoms[i],"default");
			}
		}
		//3）鼠标放在豆豆上，跳转到相应的图片上
		for(let i=0;i<this.liDoms.length;i++){
			this.liDoms[i].onmouseover=()=>{
				this.goImg(i);
				this.stopPlayer();
				//鼠标变成手？？
				// this.liDoms[i].style.cursor="pointer";
				this.mouseChange(this.liDoms[i],"pointer");
			}
		}
		for(let i=0;i<this.liDoms.length;i++){
			this.liDoms[i].onmouseout=()=>{
				//鼠标变回原来的样子
				// this.liDoms[i].style.cursor="default";
				this.mouseChange(this.liDoms[i],"default");
			}
		}
		//4)点击图片，分别跳转到不同的页面
		for(let i=0;i<this.imgDoms.length;i++){
			this.imgDoms[i].onclick=()=>{
				location=this.href[i];
			}
		}
	}
		//鼠标变小手、恢复原状
		mouseChange(dom,attr){
			dom.style.cursor=attr;
		}
	//2.3自动播放
	autoPlayer(){
		if(this.myTimer!=null){
			return;
		}
		
		this.myTimer=setInterval(()=>{
			var preOrd=this.order;
			//1.1计算数据
			this.order++;
			//1.2判断边界
			if(this.order>this.imgs.length-1){
				this.order=0;
			}
			//2.修改外观
			this.reReder(preOrd,this.order);
		},this.timeSpace);
	}
	stopPlayer(){
		window.clearInterval(this.myTimer);
		this.myTimer=null;
	}
	//点击豆豆，跳转到相应的图片上
	goImg(transOrd){
		var preOrd=this.order;
		//1.1改变数据
		this.order=transOrd;
		//1.2判断边界
		if(this.order>this.imgs.length-1){
			this.order=0;
		}else if(this.order<0){
			this.order=this.imgs.length-1;
		}
		//2.改变外观
		this.reReder(preOrd,this.order);
	}
	reReder(preOrd,order){
		//改变图片
		this.imgDoms[preOrd].style.zIndex=1;
		this.imgDoms[order].style.zIndex=2;
		//改变豆豆
		this.liDoms[preOrd].style.backgroundColor=this.douColor;
		this.liDoms[preOrd].style.color=this.color;
		this.liDoms[order].style.backgroundColor=this.douHeightColor;
		this.liDoms[order].style.color=this.heightColor;
	}
}

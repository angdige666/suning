class youLike {
	constructor(obj,domBox) {
		this.obj = obj;
		this.domBox = domBox;
		this.bigBox = null;   //存放内容的大盒子

		this.everyBox = null;  //存放每个内容的小盒子
		this.everyBoxs = [];

		this.imgBox = null;  //每个图片的小盒子
		this.imgBoxs = [];

		let defaultObj = {
			data:[],
			num:2,
			width:800,
			height:"auto",
			img:{
				width:200,
				height:200
			}
		}
		for(let key in defaultObj) {
			if(obj[key]) {
				this[key] = obj[key];
			}else {
				this[key] = defaultObj[key];
			}
		}
		// console.log(this[key]);
		this.render();
		this.event();
	}
	render() {
		//创建所有图片的大盒子
		this.bigBox = document.createElement('div');
		this.bigBox.style.cssText = `
			width:${this.width}px;
			
			border-left:1px solid #eee;
			border-top:1px solid #eee;
		`;
		this.domBox.appendChild(this.bigBox);
		
		let len = this.data.length;
		var everyBoxWidth = this.width/this.num;
		for(let i=0; i<len; i++) {
			//创建存放内容的小盒子
			this.everyBox = document.createElement('div');
			this.everyBox.style.cssText = `
				float:left;
				width:${everyBoxWidth}px;
				border-right:1px solid #eee;
				border-bottom:1px solid #eee;
				box-sizing:border-box;
				sursor:pointer;
				text-align:center;
				background:#fff;
			`;	
			this.bigBox.appendChild(this.everyBox);
			this.everyBoxs.push(this.everyBox);

			//创建小盒子中img的图片
			this.imgBox = document.createElement('div');
			this.imgBox.style.cssText = `
				width:${this.img.width}px;
				height:${this.img.height}px;
				margin:20px auto 0px;
				border:none;
			`;

			this.everyBox.appendChild(this.imgBox);
			this.imgBoxs.push(this.imgBox);

			//创建图片的连接text-decoration: none;
			let a_img = document.createElement('a');
			a_img.href = "#";
			this.imgBox.appendChild(a_img);

			//创建每一个img标签
			let img = document.createElement('img');
			img.style.cssText = `
				width:100%;
				height:100%;
			`;
			img.src = this.data[i].img_src;
			a_img.appendChild(img);

			//创建每个图片下对应的title标题 p标签
			let title_img = document.createElement('p');
			title_img.style.cssText = `
				width:250px;
				height:46px;
				font-size: 14px;
				color:#333;
				margin-top:30px;
				margin-left: 25px;
				line-height: 25px;
				text-align:left;
				overflow: hidden;
			`;
			title_img.innerHTML = this.data[i].title;
			this.everyBox.appendChild(title_img);

			//创建p标签里的span,存放---自营---
			//先判断，如果有则创建span，没有则不用创建
			if(this.data[i].self) {
				let span_p = document.createElement('span');
				span_p.style.cssText = `
					float: left;
					width:44px;
					height:22px;
					font-size: 14px;
					line-height: 22px;
					text-align: center;
					color:#fff;
					border-radius: 3px;
					margin-right: 5px;
					background: #ff8800;
				`;
				span_p.innerHTML = this.data[i].self;
				title_img.appendChild(span_p);
			}

			//创建价格的盒子
			let priceBox = document.createElement('div');
			priceBox.style.cssText = `
				float: left;
				width:90px;
				height:30px;
				margin-left: 25px;
				line-height: 30px;
			`;
			this.everyBox.appendChild(priceBox);
			//创建价格--￥
			let price_i = document.createElement('i');
			price_i.style.cssText = `
				font-size: 10px;
				color: #ff6600;
			`;
			price_i.innerHTML = "￥";
			 //创建价格span
			let price_span = document.createElement('span');
			price_span.style.cssText = `
				font-size: 15px;
				color: #ff6600;
				font-weight: bold;
			`;
			price_span.innerHTML = this.data[i].price;
			priceBox.appendChild(price_i);
			priceBox.appendChild(price_span);

			//创建找相似的盒子
			let findSimi = document.createElement("a");
			findSimi.style.cssText = `
				float: right;
				width:60px;
				height:30px;
				color:#ff6600;
				line-height: 30px;
				text-align: center;
				border-radius: 5px;
				margin-right: 25px;
				margin-bottom:50px;
				text-decoration: none;
				border:1px solid #ff6600;
			`;
			findSimi.href = "#";
			findSimi.innerHTML = this.data[i].findSimi;
			this.everyBox.appendChild(findSimi);
		}
		
	}

	event() {
		let len = this.data.length;
		for(let i=0;i<len;i++) {
			this.imgBoxs[i].onmouseover = ()=> {
				this.imgBoxs[i].style.transform = "scale(1.1)";
				this.imgBoxs[i].style.transition = "all .8s";
			}
			this.imgBoxs[i].onmouseout = ()=> {
				this.imgBoxs[i].style.transform = "scale(1)";
				this.imgBoxs[i].style.transition = "all .8s";
			}
		}
	}


}
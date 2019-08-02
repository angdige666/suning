class Limited {
	constructor(obj,boxDom) {
		this.obj = obj;
		this.boxDom = boxDom;

		let defaultObj = {
			data:[1,2,3,4,5,6,7,8],
			width:1190,
			num:4,
			img:{
				width:196,
				height:196
			}
		}

		for(let key in defaultObj) {
			if(obj[key]) {
				this[key] = obj[key];
			}else {
				this[key] = defaultObj[key];
			}
			console.log(this[key]);
		}

		this.render();
		// this.event();
	}

	render() {
		//创建每一个商品信息的盒子--
		let len = this.data.length;
		console.log(len);
		for(let i=0;i<len;i++) {
			//每个盒子连接
			let shopBoxA = document.createElement('a');
			shopBoxA.href = "#";
			shopBoxA.style.cssText = `
				float:left;
				width:290px;
				height:410px;
				background-color: #fff;
				margin-right: 10px;
				margin-bottom: 10px;
			`;
			this.boxDom.appendChild(shopBoxA);
			//每个盒子信息
			let shopBox = document.createElement('div');
			shopBox.style.cssText = `
				width:100%;
				height:100%;
			`;
			if((i+1)%4==0) {
				shopBoxA.style.marginRight = "0";
			}
			shopBoxA.appendChild(shopBox);

			//创建图片盒子
			let imgBox = document.createElement('div');
			imgBox.style.cssText = `
				width:100%;
				padding-top:36px;
				height:232px;
			`;
			shopBox.appendChild(imgBox);
			//创建图片标签
			let imgs = document.createElement('img');
			imgs.src = "";
			imgs.style.cssText = `
				display:block;
				width:${this.img.width}px;
				height:${this.img.height}px;
				margin:auto;
			`;
			imgBox.appendChild(imgs);
			//创建图片底部信息的盒子
			let infoBox = document.createElement('div');
			infoBox.style.cssText = `
				width:248px;
				height:142px;
				margin:auto;
			`;
			shopBox.appendChild(infoBox);
			//标题信息
			let titleBox = document.createElement('div');
			titleBox.style.cssText = `
				width:100%;
				height:42px;
				font-size:14px;
				color:#333;
				overflow:hidden;
			`;
			titleBox.innerHTML = "青岛啤酒 苏宁定制罐500ml*18(新老包装交替发货)";
			infoBox.appendChild(titleBox);
			//抢购百分比
			let buys = document.createElement('div');
			buys.style.cssText = `
				width:100%;
				height:18px;
				margin-top:6px;
			`;
			infoBox.appendChild(buys);
			//滚动条的盒子
			let progress = document.createElement('div');
			progress.style.cssText = `
				float:left;
				width:163px;
				height:10px;
				margin-top:4px;
				margin-right:14px;
				border-radius:5px;
				background:#FADBDE;
			`;
			buys.appendChild(progress);
			//滚动条
			let proBar = document.createElement('span');
			proBar.style.cssText = `
				float:left;
				width:100px;
				height:10px;
				border-radius:5px;
				background:#FB3B48;
			`;
			progress.appendChild(proBar);
			//滚动条数据显示
			let proNum = document.createElement('div');
			proNum.style.cssText = `
				float:left;
				width:70px;
				height:10px;
				margin-top:2px;
			`;
			buys.appendChild(proNum);
			//数据显示小背景
			let proHot = document.createElement('span');
			proHot.style.cssText = `
				float:left;
				width:11px;
				height:13px;
				background:url('image/limited/icon-hot.png');
			`;
			proNum.appendChild(proHot);
			//显示数据百分比
			let pro_num = document.createElement('span');
			pro_num.style.cssText = `
				float:left;
				height:13px;
				line-height:13px;
				font-size:12px;
				color:#999;
				margin-left:5px;
			`;
			pro_num.innerHTML = "已抢68%";
			proNum.appendChild(pro_num);
			//创建价格的盒子
			let price = document.createElement('div');
			price.style.cssText = `	
				height:30px;
				margin-top:20px;
				line-height:30px;
			`;
			infoBox.appendChild(price);
			//销售价格的盒子
			let salePriceBox = document.createElement('div');
			salePriceBox.style.cssText = `
				float:left;
				font-size:28px;
				color:#F92C4A;
				margin-right:10px;
			`;
			price.appendChild(salePriceBox);
			//人民币符号
			let is = document.createElement('i');
			is.style.cssText = `
				float:left;
				margin-right:2px;
				margin-top:5px;
				font-size:16px;
				font-style:normal;
			`;
			is.innerHTML = "￥";
			salePriceBox.appendChild(is);
			//销售价格
			let salePrice = document.createElement('div');
			salePrice.style.cssText = `
				float:left;
				font-size:28px;
				color:#F92C4A;
			`;
			salePrice.innerHTML = "188";
			salePriceBox.appendChild(salePrice);

			//原价格的盒子
			let yuanPriceBox = document.createElement('div');
			yuanPriceBox.style.cssText = `
				float:left;
				font-size:12px;
				color:#999;
			`;
			price.appendChild(yuanPriceBox);
			//人民币符号
			let yp_is = document.createElement('i');
			yp_is.style.cssText = `
				float:left;
				font-size:12px;
				font-style:normal;
				text-decoration: line-through;
			`;
			yp_is.innerHTML = "￥";
			yuanPriceBox.appendChild(yp_is);
			//原来销售价格
			let yuanPrice = document.createElement('div');
			yuanPrice.style.cssText = `
				float:left;
				font-size:12px;
				color:#999;
				text-decoration: line-through;
			`;
			yuanPrice.innerHTML = "299";
			yuanPriceBox.appendChild(yuanPrice);
			//马上抢按钮
			let btn = document.createElement('div');
			btn.style.cssText = `
				float:right;
				width:88px;
				height:38px;
				line-height:38px;
				margin-top:-5px;
				font-size:14px;
				color:#fff;
				text-align:center;
				box-shadow: 0px 7px 19px rgba(248, 35, 74, 0.35);
    			border-radius: 4px;
				background:url('image/limited/btn-red.png')
			`;
			btn.innerHTML = "马上抢";
			price.appendChild(btn);
		}

	}


}
var display=document.getElementsByClassName("display")[0];
var date=document.getElementsByClassName("date");
var confirm=document.getElementsByClassName("confirm");
var yxj=document.getElementsByClassName("yxj")[0];
var T_price=document.getElementsByClassName("T_price")[0];
var money=document.getElementsByClassName("money")[0];
var goods=[
	{
		"name":"限时抢购NierAutomata初回限定版只要359元",
		"price":359,
		"pic":'images/icon_1.png'
	},
	{
		"name":"限时抢购NierAutomata初回限定版只要459元",
		"price":459,
		"pic":'images/icon_2.png'
	},
	{
		"name":"限时抢购NierAutomata初回限定版只要559元",
		"price":559,
		"pic":'images/icon_3.png'
	},
	{
		"name":"限时抢购NierAutomata初回限定版只要659元",
		"price":659,
		"pic":'images/icon_4.png'
	},
	{
		"name":"限时抢购NierAutomata初回限定版只要759元",
		"price":759,
		"pic":'images/icon_5.png'
	}
]
for(var i=0;i<5;i++){
	display.innerHTML+="<li class='goods'>\
					<div class='cover'>\
						<input class='date' type='datetime' name='date' value='"+(new Date())+"'/>\
						<button class='confirm'>确定</button>\
						<span class='countdown'>剩余<span class='time'>00</span>天<span class='time'>00</span>时<span class='time'>00</span>分<span class='time'>00</span>秒</span>\
						<img class='pic' src='"+goods[i].pic+"' alt='a pic of goods'/>\
						<span class='desc'>"+goods[i].name+"</span>\
						<span class='price'>抢购价：<strong class='num'>￥"+goods[i].price+".00</strong></span>\
					</div>\
				</li>";
}
var index,deadline_ms;
var moveNum=5;
var final_y=150;
var final_o=0;
var changeNum=0.06;
var xpos=ypos=flag=0;
for(var i=0;i<confirm.length;i++){
	confirm[i].index=i;
	confirm[i].onclick=function(){
		index=this.index;
		cover[index].style.opacity=1;
		deadline_ms=Date.parse(date[index].value);
		var confirmT=new Date();
		var confirmT_ms=Date.parse(confirmT);
		D_value=deadline_ms-confirmT_ms;//毫秒差值		
		if(D_value<0){
			alert("该时间已失效，请重新输入！")
		}else{
			countDown();
			timeID=setInterval("countDown()",1000);
		}				
	}		
}
var cover=document.getElementsByClassName("cover");
var time=document.getElementsByClassName("time");
//倒计时函数
function countDown(){	
	var now=new Date();
	var now_ms=Date.parse(now);
	D_value=deadline_ms-now_ms;//毫秒差值
	if(D_value==-1000){
		clearTimeout(timeID);
		doShake(flag,index,xpos,ypos);
		return true;
	}
	var day=0,hour=0,min=0,sec=0;
	sec=D_value/1000;
	if(sec>60){
		min=Math.floor(sec/60);
		sec=sec%60;
		if(min>60){
			hour=Math.floor(min/60);
			min=min%60;				
			if(hour>24){
				day=Math.floor(hour/24);
				hour=hour%24;					
			}
		}
	}
	var arr=[day,hour,min,sec];
	for(var j=4*index;j<4*(index+1);j++){
		time[j].innerHTML=arr[j-index*4];
	}
	//timeID=setTimeout("countDown()",1000);
}
//抖动函数
function doShake(flag,shakeNum,xpos,ypos){
	if(flag==1||flag==3){
		xpos=0;
		ypos=0;
	}else if(flag==0){
		xpos=-10;
		ypos=0;
	}else if(flag==2){
		xpos=10;
		ypos=0;
	}else{
		flag=0;	
		moveElement(moveNum,index,final_y);
		hiddenCover(changeNum,index,final_o);
		return true;
	}
	cover[shakeNum].style.left=xpos+'px';
	cover[shakeNum].style.top=ypos+'px';
	flag++;
	shakeElem=setTimeout("doShake("+flag+","+shakeNum+","+xpos+","+ypos+")",50);		
}
//元素移动函数
function moveElement(moveNum,index,final_y){
	var ypos=parseInt(cover[index].style.top);	
	if(ypos==final_y){
		return true;
	}
	if(ypos<final_y){
		ypos=ypos+moveNum;
	}	
	cover[index].style.top=ypos+"px";	
	movement1=setTimeout("moveElement("+moveNum+","+index+","+final_y+")",50);
}
//逐渐消失函数
function hiddenCover(changeNum,index,final_o){
	var opacity=cover[index].style.opacity;
	if(opacity<=final_o){
		cover[index].style.display="none";
		clearTimeout(movement1);
		pullOff(index);
		return true;
	}
	if(opacity>final_o){
		opacity=opacity-changeNum;
	}
	cover[index].style.opacity=opacity;
	setTimeout("hiddenCover("+changeNum+","+index+","+final_o+")",50);	
}
//添加下架商品信息
function pullOff(index){
	var yxj_goods=document.createElement("ul");
	yxj_goods.className="yxj_goods";
	yxj_goods.innerHTML="<li>\
							<span class='yxj_name'>"+goods[index].name+"</span>\
						</li>\
						<li>"+goods[index].price+"</li>\
						<li>\
							<img class='yxj_pic' src='"+goods[index].pic+"' alt='pic'/>\
						</li>";
	yxj.insertBefore(yxj_goods,T_price);
	money.innerHTML=parseInt(money.innerHTML)+goods[index].price;
}
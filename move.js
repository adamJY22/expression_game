//封装了一个$函数 
function $(selector,parent,tagName){
				
	var firstChar=selector.charAt(0);
	
	parent=parent||document;
	
	if(firstChar=="#"){
		return document.getElementById(selector.substring(1));
	}else if(firstChar=="."){
		//对tagName做一个判断，默认是* 全部标签
		tagName=tagName||"*";
		//从父级下获取特定的标签
		var allEles=parent.getElementsByTagName(tagName);
		
		var arr=[];//用于存储要找的所有的带该类的元素
		//循环所有的标签
		for(var i=0;i<allEles.length;i++){
			//将每一个标签的class通过空格 转成数组
			var arrClassNames=allEles[i].className.split(" ");
			//循环数组中的每一个class名，进行判断
			for(var j=0;j<arrClassNames.length;j++){
				//如果有一个class名和我要找的相等，说明该元素是我要找的元素
				if(arrClassNames[j]==selector.slice(1)){
					//用数组存起来
					arr.push(allEles[i]);
					break;//停止向后查找
				}
			};
		};
		//当整个循环完毕， 返回数组（里面存着所有找到的元素）
		return arr;
		
	}else{
		return parent.getElementsByTagName(selector);
	}
}

//封装了一个运动函数
function move ( obj, attr, rate, target, callback ) {
	clearInterval( obj.timer );
	obj.timer=null;
	var speed=parseFloat(getStyle( obj, attr ));
	rate = speed < target ? rate : -rate;
	obj.timer = setInterval(function () {
		speed += rate;			// 步长
		if ( speed >= target && rate > 0 ||  speed <= target && rate < 0  ) {
			speed = target;
		}
		obj.style[attr] = speed + 'px';
		if ( speed == target ) {
			clearInterval( obj.timer );
			obj.timer=null;
			callback && callback();
		}
	}, 30);
}
function getStyle(obj,attr){
	return obj.currentStyle ? obj.currentStyle[attr]:getComputedStyle(obj)[attr];
};
//封装一个抖动函数
function shake(obj,attr,fudu,rate,callback){
	if(obj.timers) return ;
	obj.timers=null;
	var Pos=parseInt( getStyle(obj,attr) );
	var num=0;
	//console.log(Pos);
	var arr=[];
	for(var i=fudu;i>0;i-=rate){
		arr.push(-i,i);
	};
	arr.push(0);
	//console.log(arr);
	
	obj.timers=setInterval(function(){
		
		obj.style[attr]=Pos+arr[num]+"px";
		num++;
		if(num>arr.length-1){
			clearInterval(obj.timers);
			obj.timers=null;
			callback&&callback();
		}
		
	},30);
	
}

var productClass=["德利豆干(冷藏)","魔法coco","花蓮薯/芋","竹筒麻糬(冷藏)","羊羹","廟口紅茶小西點","奶油方塊","百艾重乳酪蛋糕(冷凍)","弘宇蛋糕(冷藏)","提拉米蘇精緻蛋糕(冷藏)","特殊風味"];
var classStart=[0,2,4,7,13,17,20,24,25,28,32,33];
var productName=["原味","微辣","巧克力","咖啡","花蓮薯","芋心番薯","薯芋混和","紅豆","芝麻","山藥","奶酥","香蕉","花生","綠茶","蜂蜜","蘋果","烏龍茶","原味10入","草莓10入","咖啡10入","紐西蘭奶油","巴西里香蒜","比利時黑巧克力","北海道巧克力","乳酪球8入","水晶奶酪","芋泥奶酪","濃情巧克力","提拉米蘇","提米蛋糕25入","布朗尼蛋糕25入","黑岩優格乳酪蛋糕","剝皮辣椒"];
var price=[120,120,100,100,100,100,100,50,50,50,50,50,50,25,25,25,25,160,160,180,100,120,140,140,180,200,200,250,250,280,280,300,120];
var img=["kZEw","5z5u","lRjR","lRjR","xE7v","dt8e","OLkQ","f4jm","f4jm","f4jm","f4jm","f4jm","f4jm","FPgL","FPgL","FPgL","FPgL","xMvL","xMvL","xMvL","NHTY","crYD","eHEF","wjqf","kKJX","Vg1p","FMbj","H0jS","zNMV","GCge","TdD3","z4X2","oZju"];
var imgUrl="http://gdurl.com/";
function printProduct() {
	var output="";
	for(var i=0;i<11;i++) {
		output+='<div class="panel panel-warning" style=""><div class="panel-heading"><h1>'+productClass[i]+'</h1></div><div class="panel-body">';
		var num=classStart[i+1]-classStart[i];
		for(var j=classStart[i];j<classStart[i+1];j++) {
			output+='<div class="col-md-3"><div class="panel panel-warning" style=""><div class="panel-body"><img src="'+imgUrl+img[j]+'" style="width:100%;"/>';
			output+='<h2>'+productName[j]+'</h2><p>售價：NT$ '+price[j]+"</p><p class='num'>訂購數量：<select  name='num'><option selected value='1'>1</option><option value='2'>2</option><option value='3'>3</option><option value='4'>4</option><option value='5'>5</option></select></p></br><button type='button' id='add-to-cart";
			output+=j+"' class='btn btn-warning btn-lg'><span class='glyphicon glyphicon-shopping-cart'></span>加到購物車</button></div></div></div>";
		}
		output+="</div></div>";
	}
	document.write(output);
}
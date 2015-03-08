var products;
function loadProductData()
{
	var jobj = new Object();
	jobj.mode = 'getData';
	httpPost("/productEdit",jobj,function(resp){
		console.log('??');
		if(resp=='no record')
		{
			console.log('no record');
			var tableString ='';
			tableString+="<button type='button'id=savebtn>save</button>"
			+"<button type='button'id=addnewbtn>add New Prodcut</button>";
            $('#productTable').html(tableString);
            addNewClick();
            saveClick();
		}
		else
		{
			console.log(resp);
			var obj = jQuery.parseJSON(resp);
            console.log(obj);
            var tableString ='';
            products = obj.products;
            for(var i=0;i<products.length;i++)
            {
            	tableString+="<form name='product'>"
            	+"<tr>"
                +""+i+""
                +" <input type='text' name='pname' value="+products[i].name+">"//商品名稱
                +" <input type='text' name='url' value="+products[i].url+">"//縮圖圖片網址
                +" <input type='text' name='url' value="+products[i].imgurl+">"//大圖圖片網址
                +"<input type='number' name = 'price' value= '"+products[i].price+"'>"//網路價
                +"<input type='number' name = 'realPrice' value='"+products[i].realPrice+"'>"//野台價
                +" <input type='text' name='url' value="+products[i].url+">"
				+"<select name='size'>"
				  +"<option value='true'>true</option>"
				  +"<option value='false'>false</option>"
				+"</select>"
				+"<button type='button'class='deletebtn'>delete</button>"
                +"</tr>"
                +"</form>";
            }
            dataNum = products.length;
            tableString+="<button type='button'id=savebtn>save</button>"
			+"<button type='button'id=addnewbtn>add New Prodcut</button>";

            $('#productTable').html(tableString);
            addNewClick();
            saveClick();
            deleteClick();
		}
	});
}
function saveClick()
{
	$('a[id^=save-btn]').click(

	);
	loadProductData();
}
var dataNum = 0;
function addNewClick()
{
		console.log("add btn generated");
	$('#addnewbtn').click(
		function()
		{
			console.log("add new product click");
			var tableString='';
			tableString+="<form name='product'>"
				
                +""+dataNum+""
                +" <input type='text' name='pname' value=商品名稱 />"
                +" <input type='text' name='url' value=網址 />"
                +"<input type='number' name='price' value='100'/>"
                +"<input type='number' name='realPrice' value='100'/>"
				+"<select name='size'>"
				  +"<option value='NULL'>None</option>"
				  +"<option value='S'>S</option>"
				  +"<option value='M'>M</option>"
				  +"<option value='L'>L</option>"
				  +"<option value='XL'>XL</option>"
				  +"<option value='2L'>2L</option>"
				+"</select>"
				+"<button type='button'class='deletebtn'>delete</button>"
                
                +"</form>";

            
			$('#productTable').prepend(tableString);

			dataNum++;
		}
	);
}
function deleteClick()
{
	$('.deletebtn').click(
		function()
		{
			deleteProduct($(this).parent().find('input[name = pname]').val());
			$(this).parent().remove();
            console.log('remove');

		}
	);
	
}
function saveClick()
{
	$('#savebtn').click(
		function()
		{
			products = document.getElementsByName('product');
			for(var i=0;i<products.length;i++)
			{

				var jobj = new Object();
				jobj.mode = 'update';
				jobj.property = new Object();
				console.log(products[i]);
				jobj.property.name = encodeURIComponent(products[i].pname.value);
				jobj.property.url = products[i].url.value;
				jobj.property.price = products[i].price.value;
				jobj.property.realPrice = products[i].realPrice.value;
				jobj.property.size = products[i].size.value;
				httpPost("/productEdit",jobj,function(resp){
					console.log(resp);
					if(resp=='success')
					{
						console.log('update success');
						loadProductData();
					}
				});
			}
			
		}
	);
}
function deleteProduct(name)
{
	var jobj = new Object();
	jobj.mode = 'delete';
	jobj.property = new Object();
	jobj.property.name = encodeURIComponent(name);
	httpPost("/productEdit",jobj,function(resp){
		if(resp=='deleted')
		{
			console.log('deleted');
			loadProductData();
		}
	});
}
$(document).ready(function()
	{
		loadProductData();
	});
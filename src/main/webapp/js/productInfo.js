var products;
function loadProductInfo()
{
	var jobj = new Object();
	jobj.mode = 'getData';
	httpPost("/productEdit",jobj,function(resp){
		
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
            	
                tableString+="<li>"
					
						+"<img src='"+products[i].url+"'alt='img01'>"
						+"<div>"
						+"<h3>"+products[i].name+"</h3>"
			      		+"<p>網路價：NT$"+products[i].price+"</p>"
			      		+"<p>現場價：NT$"+products[i].realPrice+"</p>"
			      		+"尺寸：<select name='size'>"
			      		  +"<option value='NULL'>None</option>"
						  +"<option value='S'>S</option>"
						  +"<option value='M'>M</option>"
						  +"<option value='L'>L</option>"
						  +"<option value='XL'>XL</option>"
						  +"<option value='2L'>2L</option>"
						+"</select>"
						+"<p class='num'>訂購數量：  <input style='width:60px; display: inline;' type='number' class='form-control' value='1' min='0' max='100'></p>"
			        	+"<button type='button' id='add-to-cart"+i+"' class='btn btn-success btn-lg'>"
					  	+"<span class='glyphicon glyphicon-shopping-cart'></span> 加到購物車"
						+"</button>"
						+"</div>"
				+"</li>";
				
				
            }
         	$('#productlist').html(tableString);
            //$('#productTable').html(tableString);
         	addtocartsetup();
		}
	});
}
//$(document).ready(loadProductInfo);
$(document).ready(function()
	{
		loadProductInfo();
	});
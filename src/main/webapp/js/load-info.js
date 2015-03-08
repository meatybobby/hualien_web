
var imageURL;

$(document).ready(function(){
    initPrice();
    imageURL = new Array();
   
   for(var i=1;i<38;i++)
   imageURL.push("https://googledrive.com/host/0B730ssCZsL8TcG5ReHR6S0lJbWc/"+i+".jpg");
   for(var i=38;i<46;i++)
   imageURL.push("https://googledrive.com/host/0B730ssCZsL8TcG5ReHR6S0lJbWc/38.jpg");
   
   
   
   
   var string='';
   
   var panelI = panelIndexArray[0];
   var numinRow = 4;
   var rowCount = 0;
   for(var i = 0;i<productNameArray.length;i++)
   {
           var index = i;
           
           if(productNameArray[index]==null)
           break;
           var name =productNameArray[index];
           var price =productPriceArray[index];//網路售價
           var realPrice = ;//現場價
           if(panelIndexArray[panelI]==index)
           {
               if(panelI>0)
                string+="</div></div></div>";
           string+="<div class='panel panel-success' style='width:810px' >"
                    +"<div class='panel-heading'>"
                        +"<h2>"
                        +"<span class='glyphicon glyphicon-shopping-cart'></span>" 
                           +panelNameArray[panelI]
                         +"</h2>"  
                     +"</div>"
                      +"<div class='panel-body' id='catalog'>";
               panelI++;
               rowCount = 0;
           }
           if(rowCount%numinRow==0)
           {
               if(rowCount!=0)
               string+="</div>";
               string+="<div class='row' >";
           }
           rowCount++;
           string+="<div class='col-md-2' style='width:25%'>"
             +"<div class='thumbnail'><!--thumbnail-->"
              +"<div class='caption'>"
               +"<h3>"+name+"</h3>"  
                 +"<img src="+imageURL[index]+" class='img-responsive' alt='no image'/>"
                   +"<p>網路售價："+price+"元</p>"
                   +"<p>現場售價："+price+"元</p>"
                   +"<p class='num'>訂購數量：  <input style='width:60px; display: inline;' type='number' name class='form-control' value='1' min='1' max='100'></p>"
                   +"<button type='button' id='add-to-cart"+(index)+"' class='btn btn-success btn-lg'>"
                    +"<span class='glyphicon glyphicon-shopping-cart'></span> 加到購物車"
                   +"</button>"
                  +"</div>"    
                +"</div>"
               +"</div>";  
   }
   
   $('#product-catalog').html(string);
   //var productHTML = getElementByID('#product-catalog')
   //productHTML.innerHTML = string;
   addtocartsetup();
   //var jobj = new Object();
   //jobj.phone = "0";
    //httpPost('sendreserve',jobj,function(resp){console.log(resp)}); 
});

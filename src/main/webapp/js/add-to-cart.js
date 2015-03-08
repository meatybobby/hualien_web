var reservationArray;
var reserveFormString;
var cartPrice;
var addtocartsetup= function()
{
    console.log('add to cart setup');
    reserveFormString = "<div class='form-group'>"
            +"<label for='exampleInputPassword1'>姓名</label>"
            +"<input  class='form-control' type='text' id='name' value ='"+clientName+"' style='width:100%' />"
        +"</div>"
         +"<div class='form-group'>"
            +"<label for='exampleInputPassword1'>手機號碼</label>"
            +"<input  class='form-control' type='text' id='phone' style='width:100%'/>"
        +"</div>"

        +"<div class='form-group'>"
            +"<label for='exampleInputPassword1'>領貨時間</label>"
            +"<select  class='form-control' id='get-time' style='width:100%'>"
              +"<option selected value='0'>3/17(二) 20:00-22:00小吃部</option>"
              +"<option  value='1'>3/18(三) 20:00-22:00小吃部</option>"
              +"<option value='2'>3/19(四) 20:00-22:00小吃部</option>"
           +"</select>"
        +"</div>"
        
         +"<h4 class='text-center'>"
            +"<button type='button' id='send' class='btn btn-default btn-lg' style='width:80%'>"
                  +"<span class='glyphicon glyphicon-ok'></span> 下訂單"
                +"</button>"
        +"</h4>"
        +"<h4 class='text-center'>"
            +"<button type='button' id='search' class='btn btn-default btn-lg' style='width:80%'>"
                  +"<span class='glyphicon glyphicon-search'></span> 查詢訂單"
                +"</button>"
        +"</h4>"
    reservationArray = new Array();
    $('button[id^=add-to-cart]').click(
        function()
        {  
            //console.log('add button clicked!');
            var split = $(this).attr('id').split('add-to-cart')
            var i = parseInt(split[1]);
                var res = new Object();
                res.id = i;
                res.num = parseInt($(this).siblings('.num').children('select').val());
                
                if(res.num>0)
                {
					var c;
					for(c=0;c<11;c++)
						if(classStart[c+1]>i) break;
                    res.name = productClass[c]+' '+productName[i];

                    res.price = price[i];

                    if(!checkExist(res))
                    reservationArray.push(res);
                    updateCartInfo();
                }
                else
                console.log('zero');
            
        }
    );
}
function checkExist(res)
{
    for(var i=0;i<reservationArray.length;i++)
    {
        if(res.name==reservationArray[i].name)
        {
            reservationArray[i].num+=res.num;
            return true;
        }
    }
    return false;
}
/*
reservationArray[]
    product
        name 
    num
*/
function updateCartInfo()
{
    var string = "";
    var totalprice = 0;
    console.log(reservationArray);
    for(var i = 0;i<reservationArray.length;i++)
    {
            var res = reservationArray[i];
            var name =  res.name;
            var price = res.price*res.num;

            totalprice+=price;
            string+="<div class='thumbnail'><!--thumbnail-->"
              +"<div >"
              
                +"<h5>"+name;
                string+=" x "+res.num+"</h5>"
               +"<a href='#cart' id='remove"+i+"' class='cancel-icon remove label label-danger' >"
                +"<span class='glyphicon glyphicon-remove'></span>"+"remove</a>"   
                
                +"</p> "   
              +"</div>"
            +"</div><!--thumbnail-->";
    }
    
        string+="<h4>總價："+totalprice+"</h4>"+"<hr>"+ reserveFormString;
        cartPrice = totalprice;

        //string="<div class='thumbnail'>預購結束<div>"
    $('#cart').html(string);
    removeSetup();
    sendReservationSetup();
}

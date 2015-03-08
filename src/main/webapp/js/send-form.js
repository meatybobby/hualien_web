var reservationArray;
var reserveFormString;

var clientName='';
var phone='';
var sendReservationSetup= function()
{
    $('#ok').click(
        function(){
            window.location.reload();
        }
    )
    $('button[id^=search]').click(
    
        function()
        {
            var jobj = new Object();
            jobj.phone = $("input#phone").val(); 
            jobj.name = encodeURIComponent($("input#name").val());
            httpPost("/getreserve",jobj,function(resp){
                
                var obj = jQuery.parseJSON(resp);
                var reservation = obj.reservations[0];
                //console.log(obj);
                var total=reservation.total;
                var takeTime=reservation.takeTime;
                reservation.paid =undefined;
                reservation.name =undefined;
                reservation.date = undefined;
                reservation.total= undefined;
                reservation.phone= undefined;
                reservation.takeTime = undefined;
                reservation.taken = undefined;

                var output = '';
                for(var key in reservation)
                {

                    var obj = reservation[key];
                    if(obj!=undefined)
                    output+=key+" x"+obj;

                }

                output+="\n總價："+total+"\n領取時間"+takeTime;
				//console.log(output);
                alert(output);
            });
        }
    );
    $('button[id^=send]').click(
        function()
        {
            console.log("send form clicked");
            var jobj = new Object();
            jobj.phone = $("input#phone").val(); 
            jobj.name = encodeURIComponent($("input#name").val());
            clientName =$("input#name").val();
            phone = jobj.phone;
			var timeVal=parseInt($('#get-time').val());
            //jobj.email = "";
			jobj.takeTime="3/"+(17+timeVal);
            var sendArray = reservationArray.slice(0);
            
            for(var i=0;i<sendArray.length;i++)
            {
                sendArray[i] = new Object()
                sendArray[i].name = encodeURIComponent(reservationArray[i].name);
                sendArray[i].num = reservationArray[i].num;
            }

            jobj.reserve = sendArray;
            jobj.total = cartPrice.toString();
            //console.log(jobj);
            if(jobj.phone.length!=10)
            {
                alert('請填入正確號碼');
            }
            else if(cartPrice==0)
            {
                 alert('沒有訂購任何東西喔');
            }
            else
            {
                console.log($('#myModal'));
                $('#myModal').modal('show');

                httpPost("/sendreserve",jobj,function(resp){
                    if(resp=="Reservation received")
                    {
                        console.log('response');
                        $('#myModal').modal('show');
                        $('.modal-body').html(
                        "<p>下單成功!!</p>"
                        +"<p>請在預購週結束前，至小吃部付款</p>"
                        +"<p>並依選定日期，於下週至小吃部領取商品</p>"
                        
                        +"<p>*注意* 一支電話只能填寫一筆訂單，重複填寫會覆蓋掉之前的訂單</p>"
                        );
                    }
                    else if(resp=="exist")
                    {
                        $('#myModal').modal('show');
                        $('.modal-body').html(
                        "<p>重複下單 取消上一筆</p>"
                        +"<p>付款後請不要再重複下單</p>"
                        
                        +"<p>*注意* 一支電話只能填寫一筆訂單，重複填寫會覆蓋掉之前的訂單</p>"
                        );
                    }
                    else
                    alert('error');
                    console.log(resp);
                }); 
                 
            }
            //window.location.reload();
        }
    )
    
}

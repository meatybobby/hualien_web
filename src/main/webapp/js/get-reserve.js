$(document).ready(function(){
     initPrice();
    $( "#phone" ).keypress(function( event ) {
        
          if ( event.which == 13 ) {
             searchReserve();
          }
     });
    $("#search").click(function(){
        console.log('click');
           searchReserve();
    });
}
);
function payCheck()
{
    var phone = $("#phone").val();
        var jobj = new Object;
        jobj.phone = phone;
        httpPost("/paycheck",jobj,function(resp){
            if(resp=='paid')
            alert('確認付款完成');
            else
            alert('error');
            window.location.reload();
        });
}
function searchReserve()
{
    var phone = $("#phone").val();
        var jobj = new Object;
        jobj.phone = phone;
        httpPost("/getreserve",jobj,function(resp){
            if(resp=="not found")
            {
                console.log('not found');
                alert('not found');
            }
            else
            {
                    var obj = jQuery.parseJSON(resp);
                    console.log(obj);

                    
                    for(var i = 0;i<obj.reservations.length;i++)
                    {
                    var reservation =obj.reservations[i];

                    if(reservation.paid=="false")
                    {

                         console.log(reservation);
                         

                           var tableString='';
                           /*
                         for(var i=0;i<productPriceArray.length;i++)
                         {
                             var str ='reserve'+i;
                             var num = reservation[str]; 
                             if(num)
                             {
                                 console.log(productNameArray[i]+':'+num);
                                 tableString+="<tr>"
                                                +"<th>"+i+"</th>"
                                                +"<th>"+productNameArray[i]+"</th>"
                                                +"<th>"+productPriceArray[i]+"</th>"
                                                +"<th>"+num+"</th>"
                                               +"</tr>";
                             }
                             
                         }*/
                         var paid = reservation.paid;
                         var clientName = reservation.name;
                         var total = reservation.total;

                         delete reservation.paid;
                         delete reservation.name;
                         delete reservation.date;
                         delete reservation.total;
                         delete reservation.phone;
                         delete reservation.takeTime;
                         delete reservation.taken;
                         tableString+="<tr>"
                                                +"<th>-</th>"
                                                +"<th>"+clientName+"</th>"
                                                +"<th>"+total+"</th>"
                                        
                                                +"<th>"+JSON.stringify(reservation)+"</th>"
                                               +"</tr>";
                         $('#tablecontent').html(tableString);
                         if(paid=='false')
                         {
                             $('#pay').html(
                             "<p id='status''>訂單狀態：未付款</p>"
                                +"<button id='checkbtn' type='button' class='btn btn-default btn-lg'>"
                              +"<span class='glyphicon glyphicon-ok'></span> 確認付款"
                              +"</button>"
                              );
                              $('#checkbtn').click(function(){payCheck();});
                         }
                         else
                         {
                             $('#pay').html(
                             "<p id='status''>訂單狀態：已付款</p>"
                              );
                         }
                     }
                      else
                         {
                             $('#pay').html(
                             "<p id='status''>"+reservation.name+" 訂單狀態：已付款</p>"
                              );
                         }
                 }

             }
        })    
}
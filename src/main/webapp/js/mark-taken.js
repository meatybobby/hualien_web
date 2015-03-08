$(document).ready(function(){
     initPrice();
     
    $( "#phone" ).keypress(function( event ) {
        
          if ( event.which == 13 ) {
             searchReserve();
          }
     });
    $("#search").click(function(){
        searchReserve();
    });
}
);
function takenCheck()
{
    var phone = $("#phone").val();
        var jobj = new Object;
        jobj.phone = phone;
        httpPost("/marktaken",jobj,function(resp){
            if(resp=='taken recieved')
            alert('確認領取完成');
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
        httpPost("/searchtaken",jobj,function(resp){
            if(resp=="not found...")
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
                    if(reservation.taken=="false")
                    {
                         console.log(reservation);
                       
                           var tableString='';
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
                         }
                         
                         tableString+="<tr>"
                                                +"<th>-</th>"
                                                +"<th>總價</th>"
                                                +"<th>"+reservation.total+"</th>"
                                                +"<th>-</th>"
                                               +"</tr>";
                         $('#tablecontent').html(tableString);
                         if(reservation.taken=='false')
                         {
                             $('#pay').html(
                             "<p id='status''>商品未領取</p>"
                                +"<button id='checkbtn' type='button' class='btn btn-default btn-lg'>"
                              +"<span class='glyphicon glyphicon-ok'></span> 確認領取"
                              +"</button>"
                              );
                              $('#checkbtn').click(function(){takenCheck();});
                         }
                         else
                         {
                             $('#pay').html(
                             "<p id='status''>訂單狀態：已領取</p>"
                              );
                         }
                     }
                 }
             }
        })    
}
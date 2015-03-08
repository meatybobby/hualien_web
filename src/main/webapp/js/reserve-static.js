$(document).ready(function(){
   searchReserve();
}
);

function searchReserve()
{
//    var phone = $("#phone").val();
       var jobj = new Object;
    //    jobj.phone = phone;
        httpPost("/getstatic",jobj,function(resp){
            if(resp=="not found")
            {
                console.log('not found');
                alert('not found');
            }
            else
            {
                var obj = jQuery.parseJSON(resp);
               
                var tableString='';
                var products = new Object();
                var totalMoney =0;
                var paidMoney = 0;
                 for(var i=0;i<obj.reservations.length;i++)
                 {
                     var reservation =obj.reservations[i];
                     totalMoney+=parseInt(reservation.total);
                     if(reservation.paid=="true")
                        paidMoney+=parseInt(reservation.total);
                         tableString+="<tr>"
                                        +"<th>"+i+"</th>"
                                        +"<th>"+reservation.paid+"</th>"
                                        +"<th>"+reservation.name+"</th>"
                                        +"<th>"+reservation.phone+"</th>"
                                        +"<th>"+reservation.total+"</th>"
                                        +"<th>"+reservation.date+"</th>"
                                        +"<th>"+reservation.takeTime+"</th>"
                                        +"<th>"+reservation.taken+"</th>";
                                        
                                        delete reservation.paid;
                                        delete reservation.name;
                                        delete reservation.date;
                                        delete reservation.total;
                                        delete reservation.phone;
                                        delete reservation.takeTime;
                                        delete reservation.taken;


                                        tableString+="<th>"+JSON.stringify(reservation)+"</th>"
                                       +"</tr>";

                        for(var key in reservation)
                        {
                            console.log(key);
                            console.log(reservation[key]);
                            console.log(products[key]);
                            if(products[key]==undefined)
                                products[key] = parseInt(reservation[key]);
                            else
                                products[key] += parseInt(reservation[key]);
                        }
                 }
                 
                 $('#tablecontent').html(tableString);
                 $('#product-static').html(JSON.stringify(products)+"總金額："+totalMoney+"已付款："+paidMoney);
             }

        })    
}
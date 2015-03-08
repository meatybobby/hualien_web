$(document).ready(function(){
     initPrice();
    getproductstatic();
    console.log("qq");
}
);
function getproductstatic()
{
    console.log("qq");
    
        var jobj = new Object;
        
        httpPost("/productstatic",jobj,function(resp){
            if(resp=="not found")
            {
                console.log('not found');
                alert('not found');
            }
            else
            {
                    var obj = jQuery.parseJSON(resp);
                    console.log(obj);
                    var totalNum = obj;
                    console.log(totalNum);
                    var totalMoney = 0;
                    for(var i = 0;i<totalNum.length;i++)
                    {
                           var tableString='';
                         for(var i=0;i<productPriceArray.length;i++)
                         {
                              
                                 tableString+="<tr>"
                                                +"<th>"+productNameArray[i]+"</th>"
                                                +"<th>"+productPriceArray[i]+"</th>"
                                                +"<th>"+totalNum[i]+"</th>"
                                                +"<th>"+parseInt(totalNum[i])*productPriceArray[i]+"</th>"
                                               +"</tr>";
                                  totalMoney+=   parseInt(totalNum[i])*productPriceArray[i];
                         }
                         
                         tableString+="<tr>"
                                                +"<th>-</th>"
                                                +"<th>總價</th>"
                                                +"<th>"+totalMoney+"</th>"
                                                +"<th>-</th>"
                                               +"</tr>";
                         $('#tablecontent').html(tableString);
                     }
                 }
             
        })    
}
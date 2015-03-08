 $(document).ready(init);
 

var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/1zoBd4RGb1XXeXfOHiG7Y1P9nt6vKOeikRl2tl53YUjo/pubhtml?gid=0&single=true';
var public_spreadsheet_url = '//https://docs.google.com/spreadsheets/d/1zoBd4RGb1XXeXfOHiG7Y1P9nt6vKOeikRl2tl53YUjo/pubhtml?gid=0&single=true';
//https://docs.google.com/spreadsheets/d/1zoBd4RGb1XXeXfOHiG7Y1P9nt6vKOeikRl2tl53YUjo/pubhtml?gid=0&single=true
//https://docs.google.com/spreadsheets/d/1zoBd4RGb1XXeXfOHiG7Y1P9nt6vKOeikRl2tl53YUjo/edit#gid=0

//梅竹網https://docs.google.com/spreadsheets/d/12zcJ53PgU-vB2xmrZERwRKAR3voVitJCJHuHr_wYKPs/pubhtml?gid=0&single=true
//https://docs.google.com/spreadsheets/d/12zcJ53PgU-vB2xmrZERwRKAR3voVitJCJHuHr_wYKPs/pubhtml?gid=0&single=true
function init() {
addtocartsetup();
  updateCartInfo();
 // $('#productlist1').html("<p>努力讀取中...休淡幾壘</p>");

  Tabletop.init( { key: public_spreadsheet_url,
                   callback: showInfo,
                   simpleSheet: true } );
}
function showInfo(data, tabletop) {
  updateGrid(data);
}

iconURL ="https://89a57e458b863f4e685427c3cabe0da86666b2b0-www.googledrive.com/host/0B730ssCZsL8Tfjc4UHFPUFdEZ21VRlQ4ejhaUTlsWkhEUWJFcWFoOWR4aVh6LUZqeU1WS00/";
imageURL = "https://36fe5f8910ef4d18f416be73d09449ad85bd2a8c.googledrive.com/host/0B9zHG0RjXYUyUzgzNXZBcXdqVkk/";
function updateGrid(data)
{

    products = data;
    var modalString ='';
    for(var listNum = 0;listNum<2;listNum++){

     var tableString ='';
        for(var i=0;i<4;i++)
        {
          var index =i+listNum*4;

          var p =products[index];
        tableString+="<li>"
        +"<a class='md-trigger' data-modal='modal-"+index+"'><div class='imgWrap'><img class='iconImg' src='"+iconURL+p.filename+"'alt='img01'>"
        +" <p class='imgDescription'>詳細資料</p></div>"
        +"</a>"
        +"<div>"
        +"<h3>"+products[index].short_name+"</h3>";
        if(p.online_price!='0')
            tableString+="<p>網路價：NT$"+products[index].online_price+"</p>";
            tableString+="<p>現場價：NT$"+products[index].real_price+"</p>";
            
            if(products[index].hasSize=='all')
            {
            tableString+="<p class='size'>尺寸： <select  name='size'>"
            +"<option value='XS'>XS</option>"
          +"<option value='S'>S</option>"
          +"<option selected value='M'>M</option>"
          +"<option value='L'>L</option>"
          +"<option value='XL'>XL</option>"
          +"<option value='2L'>2L</option>"
          +"<option value='3L'>3L</option>"
        +"</select></p>";
          }
          else if(products[index].hasSize=='part')
            {
            tableString+="<p class='size'>尺寸： <select  name='size'>"
          +"<option value='S'>S</option>"
          +"<option selected value='M'>M</option>"
          +"<option value='L'>L</option>"
          +"<option value='XL'>XL</option>"
          +"<option value='2L'>2L</option>"
        +"</select></p>";

          }
        

           if(p.online_price!='0')
           {
            tableString+="<p class='num'>訂購數量： <select  name='num'>"
          +"<option value='S'>S</option>"
          +"<option selected value='1'>1</option>"
          +"<option value='2'>2</option>"
          +"<option value='3'>3</option>"
          +"<option value='4'>4</option>"
          +"<option value='5'>5</option>"
           +"</select></p>"
            +"</br><button type='button' id='add-to-cart"+index+"' class='btn btn-primary btn-lg'>"
          +"<span class='glyphicon glyphicon-shopping-cart'></span> 加到購物車"
        +"</button>";
           }
            
        tableString+="</div>"
       +"</li>";

       modalString+="<div class='md-modal md-effect-1' id='modal-"+index+"'>"
          +"<div class='md-content'>"
           +"<a href='#cart' class='md-close remove label label-danger' >"
                +"<span class='glyphicon glyphicon-remove'></span></a>"   

          
            +"<h3>"+products[index].product_name+"</h3>"
            +"<div style='overflow: hidden'>"
             +"<img class='product-image' src='"+imageURL+p.filename+"'alt='img01'>"
             
            +"<div>"
              +"<p>材質："+p.material+"</p>";

              if(p.format)
                modalString+="<p>規格："+p.format+"</p>"

              
              /*<ul>
                <li><strong>Read:</strong> modal windows will probably tell you something important so don't forget to read what they say.</li>
                <li><strong>Look:</strong> a modal window enjoys a certain kind of attention; just look at it and appreciate its presence.</li>
                <li><strong>Close:</strong> click on the button below to close the modal.</li>
              </ul>*/
    
              var d = p.description;
              k =d.split(/\s+/);
    
              for(var j=0;j<k.length;j++)
              {modalString+="<p class='des'>"+k[j]+"</p>";}
             
             if(p.sizeImg)
            modalString+="</br><p class='des'><a style='text-align: left;color:#67f' href='"+p.sizeImg+"'>衣服尺寸表</a></p>";
            modalString+="</div>"

           +"</div>"
           +"</div>"
         +"</div>";
      }
  $('#productlist'+(listNum+1)).html(tableString);
  $('#modals').html(modalString+'<div class="md-overlay"></div>');
  }
    //$('#productTable').html(tableString);
  addtocartsetup();
  ModalEffects();
}
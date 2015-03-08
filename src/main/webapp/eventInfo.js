 $(document).ready(init);
 

var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/1IEPM-RgBSh1VV5CGKRw2IGZ9At9a96B1k7m-sEwOgLI/pubhtml';

//https://docs.google.com/spreadsheets/d/12zcJ53PgU-vB2xmrZERwRKAR3voVitJCJHuHr_wYKPs/edit#gid=0
function init() {

  $('#productlist1').html("<p>努力讀取中...休淡幾壘</p>");

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
     var tableString ='';
     console.log($('#og-grid').html());

      for(var i=0;i<products.length;i++)
      {
          var p = products[i];

          tableString+="<li>"
            +"<a href='hah.html' data-largesrc='"+p.img+"' data-title='"+p.eventname+"' data-description='活動日期："+p.date+"<br/>活動時間："+p.time+"<br/>活動地點："+p.location+"<br/>活動介紹："+p.brief+"'>"
              +"<img class='gridPic' src='"+p.img+"' alt='img01'/>"
            +"</a>"
    
         +"</li>";
    /*
            var d = p.description;
            k =d.split(/\s+/);
  
            for(var j=0;j<k.length;j++)
            {modalString+="<p class='des'>"+k[j]+"</p>";}
          */
      }
      console.log('replaceDone');
  $('#og-grid').html(tableString).ready(function()
    {
     $.getScript("js/grid.js", function(){

        Grid.init();

   // Use anything defined in the loaded script...
      });
    });

}
var reservationArray;
var reserveFormString;

var removeSetup= function()
{
    $('a[id^=remove]').click(
        function()
        {
            console.log('remove click');
             var split = $(this).attr('id').split('remove');
             var i = parseInt(split[1]);
             console.log('remove:'+i);
             reservationArray.splice(i,1);
             updateCartInfo();
        }
    )
}

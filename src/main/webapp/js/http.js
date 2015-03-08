function httpPost(URL,param,func)
{
    var xmlHttp = null;

    xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "POST", URL, true );
    xmlHttp.setRequestHeader('Content-Type', 'application/json', 'charset=UTF-8');
    
    var string = JSON.stringify(param);
    console.log(string);
    
    xmlHttp.send(string);
    

    
    //xmlHttp.setRequestHeader('Access-Control-Allow-Origin', 'http://localhost:8888');
    
    xmlHttp.onreadystatechange = function() {//Call a function when the state changes.
        if(xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            func(decodeURIComponent(xmlHttp.responseText));
        }
    }
    return xmlHttp.responseText;
}
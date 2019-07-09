// JavaScript Document

function llamarAjax1(obj,nameFunction,dir) {
	var capa = capa || "";
	var nameFunction= nameFunction || "";
	
	
    $.ajax(
        {
            url:dir,
            type:'POST',
            data: obj
        })
        .done(function(data) {
			
          manejadorCallBacks(nameFunction,data);
		   
        })
        .fail(function(data) {
           alert("fallo de envio/send");
        });
		
}


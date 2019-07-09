// Crear peticion
function creaPeticion() {
	try {
		peticion = new XMLHttpRequest(); /* e.j. Firefox */
	}  catch(err1) {
			try {
			peticion = new ActiveXObject("Msxml2.XMLHTTP");
			/*  some versions IE */
			} catch(err2) {
			try {
				peticion = new ActiveXObject("Microsoft.XMLHTTP");
				/* some versions IE */
			} catch(err3) {
				peticion =  false;
			}
		}
	}
	return peticion;
}
//Si uso el GET esta es la funci�n
function requestGET(url, parametros, peticion) {
	myRand=parseInt(Math.random()*99999999);
	peticion.open("GET",url+'?'+parametros+'&rand='+myRand,true);
	peticion.send(null);
}

//Si uso el POST esta es la funci�n333
function requestPOST(url, parametros, peticion) {
	peticion.open("POST", url,true);
	peticion.setRequestHeader('Content-Type',  'application/x-www-form-urlencoded');
	peticion.send(parametros);
}

// La respuesta la debo dar en div, para que sea estandard para todas las p�ginas
// la acci�n local la debo realizar mediante una funci�n de javascript local a la p�gina que invoca
// para ello a do Ajax le paso el nombre y los parametros de dicha funci�n
// y llamarfuncion_resultado la funci�n que ejecuta finalmente la funci�n de la p�gina que usar� esta libreria 
function llamarfuncion_resultado(funcion_resultado,resultado) {
	eval(funcion_resultado  + '(resultado)');
}

//Esta funci�n es la que llama a Ajax
function llamarAjax(url,parametros,funcion_resultado,metodo,usarxml) {
//create the XMLHTTPRequest object instance
	var  mipeticion = creaPeticion();
	mipeticion.onreadystatechange  = function() {
		if(mipeticion.readyState == 4) {
			if(mipeticion.status == 200) {
				var resultado = mipeticion.responseText;
				if(usarxml ==1)  {
					resultado = mipeticion.responseXML;
				}

				llamarfuncion_resultado(funcion_resultado,  resultado);
			}
		}
	}
	if(trim (metodo.toUpperCase())=='POST' )  {
		requestPOST(url,parametros,mipeticion);
	} else {
		requestGET(url,parametros,mipeticion);
	}
}

function trim (myString){
		return myString.replace(/^\s+/g,'').replace(/\s+$/g,'')
}
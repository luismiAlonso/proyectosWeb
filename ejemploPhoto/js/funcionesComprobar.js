var carpeta="./funciones_php/";
var objFormL={login:false,contra:false};
var objFromC={nick:false,contra:false,telf:false,email:false,cif:false};
function validaNumeroEntero(num){
	var patron=/^\d+$/
	if(patron.test(num)){
		return true;
		
	}else{
		return false;	
	}
}
function validaNumeroDecimal(num){
	var patron=/^\d*[.]?\d*$/
	if(patron.test(num)){
		return true;
		
	}else{
		return false;	
	}
}
function clearContent(capa){

	var padre=document.getElementById(capa);
	if(padre.hasChildNodes()){
	while (padre.firstChild) {
    padre.removeChild(padre.firstChild);
	}
	}
}
function compruebaCheck(checks){
	var codeLineas=new Array();
	var valido=false;
	for(var i=0;i<checks.length;i++){
		
		if(checks[i].checked){
			codeLineas.push(checks[i].value);
			valido=true;
		}
	}
	if(valido){
	return codeLineas;
	}else{
	return	valido;
	}
}
function asignaErrorLoginG(data){
	
	var respuestaError="";
	var valido=true;
		data=JSON.parse(data);
	
	if(data.login){
		valido=false;
		objFormL.login=false;
		respuestaError=data.login;
		respuestaError+="<br>";
		$('#nickG').addClass("error"); 
	}else{
		objFormL.login=true;
		$('#nickG').removeClass("error"); 
	}
	if(data.contra){
		valido=false;
		objFormL.contra=false;
		respuestaError=data.contra;
		respuestaError+="<br>";
		$('#contraG').addClass("error"); 
	}else{
		objFormL.contra=true;
		$('#contraG').removeClass("error"); 
	}
	
	 $('#mensaje').empty();	
	$('#mensaje').append(respuestaError);
	$('#mensaje').show();
	return valido;
}
function asignaErrorCliente(data){
	var respuestaError="";
	
	data=JSON.parse(data);
	if(data.nick==0){
		objFromC.nick=false;
		respuestaError="El nick esta repetido";
		
		$('#nickC').addClass("error"); 
	}else if(data.nick==1){
		objFromC.nick=true;
		
	}
	if(data.contra==0){
		objFromC.contra=false;
		respuestaError="La contraseña esta repetida";
		
		$('#contraC').addClass("error"); 
	}else if(data.contra==1){
		objFromC.contra=true;
		
	}
	
	if(data.cif==0){
		objFromC.cif=false;
		respuestaError="EL cif esta repetido";
		$('#cif').addClass("error"); 
	}else if(data.cif==1){
		objFromC.cif=true;
		 
	}
	
	if(respuestaError!=""){
	$('#mensaje').empty();
	$('#mensaje').append(respuestaError);
	$('#mensaje').show();
	}
}

function compruebaDatosLogin(valor){
	var respuestaError="";
	
	if(valor.id=="nickG" || valor.id=="nickC" ){
		
		if(valor.value!=""){
			objFormL.login=true;
			$(valor).removeClass('error');
		}else{
			
			objFormL.login=false;
			respuestaError+="El campo login no puede quedar vacio<br>";
			$(valor).addClass("error"); 
		}
	}
	
	if(valor.id=="contraG" || valor.id=="contraC"){
		
		if(valor.value!=""){  
			if(valor.value.length>3){
				objFormL.contra=true;
				$(valor).removeClass('error');
				}else {
					
					objFormL.contra=false;
					respuestaError+="La contraseña necesita mas de 3 caracteres<br>";
					$(valor).addClass("error"); 
				}
					
		}else{
			objFormL.contra=false;
			respuestaError+="La contraseña no puede quedar vacia<br>";
			$(valor).addClass("error"); 

		}
		
	}
	
	
	if(respuestaError!=""){
		
	$('#mensaje').show();
	}
}

function reviewFormLogiGestor(dir){
	
	 var arrayElements=$(':text,:password');
	// var nick=document.getElementById("nickG").value;
	 //var contra=document.getElementById("contraG").value;
	 $('#mensaje').empty();
	 
	   for(var i=0;i<arrayElements.length;i++){
		    compruebaDatosLogin(arrayElements[i],arrayElements[i].name);
	   }
		
	   if(objFormL.login && objFormL.contra){
		   if(dir=="isLog_gestor"){
		  llamarAjax1(
		  {
			  login:arrayElements[0].value,contra:arrayElements[1].value},"asignaErrorLoginG",carpeta+dir+".php");
		   }else{
		  llamarAjax1({login:arrayElements[0].value,contra:arrayElements[1].value},"asignaErrorLoginC",carpeta+dir+".php");

		   }
		  
		 }
		
}
function reviewFormCliente(elemento){
	
	if(elemento.id=="envCli"){
	var elementos=document.getElementById("addCli").getElementsByTagName('INPUT');
	for(var i=0;i<elementos.length;i++){
		
		if(elementos[i].type=="text"){
			compruebaDatosCliente(elementos[i],elementos[i].name);
		}
	}	
	}else if(elemento.id=="aceptarModCli"){
			var elementos=document.getElementById("modCli").getElementsByTagName('INPUT');
		for(var i=0;i<elementos.length;i++){
				
				if(elementos[i].type=="text"){
					compruebaDatosClienteMod(elementos[i],elementos[i].name);
				}
			}
	}else if(elemento.id=="aceptarSolicitud"){
		var elementos=document.getElementById("solicitud").getElementsByTagName('INPUT');
		for(var i=0;i<elementos.length;i++){
				
				if(elementos[i].type=="text"){
					compruebaDatosCliente(elementos[i],elementos[i].name);
				}
			}
		
	}else if(elemento.id=="aceptarModPerfil"){
		var elementos=document.getElementById("modPerfil").getElementsByTagName('INPUT');
		for(var i=0;i<elementos.length;i++){
				
				if(elementos[i].type=="text"){
					compruebaDatosClienteMod(elementos[i],elementos[i].name);
				}
			}
		
	}
	
}
function IsOKCliente(){
	console.log(objFromC);
	if(objFromC.cif && objFromC.contra && objFromC.email && objFromC.nick && objFromC.telf){
		return true;
	}else{
		return false;
	}
}

function compruebaDatosCliente(elemento,dir){
	
	var respuestaError="";
	
	$('#mensaje').empty();
	if(elemento.id=="contraC"){
		if(elemento.value!=""){
			if(elemento.value.length>3){
			$(elemento).removeClass('error');
				if(dir=="comprobarSolicitud"){
				  llamarAjax1({contra:elemento.value},"asignaErrorClienteSol",carpeta+dir+".php");
				}else{
					llamarAjax1({contra:elemento.value},"asignaErrorCliente",carpeta+dir+".php");
	
				}
			}else{
				objFromC.contra=false;
				respuestaError="La contraseña debe tener más de tres caracteres<br>";
				$(elemento).addClass("error"); 
			}
		}else{
			objFromC.contra=false;
			respuestaError="El campo contraseña no puede quedar vacío<br>";
			$(elemento).addClass("error"); 

		}
	}
	if(elemento.id=="nickC"){
		if(elemento.value!=""){
			$(elemento).removeClass('error');
			if(dir=="comprobarSolicitud"){
				    llamarAjax1({nick:elemento.value},"asignaErrorClienteSol",carpeta+dir+".php");
				}else{
					  llamarAjax1({nick:elemento.value},"asignaErrorCliente",carpeta+dir+".php");
	
				}
			
		}else{
			objFromC.nick=false;
			respuestaError="El campo Nick no puede quedar vacío<br>";
			$(elemento).addClass("error"); 
		}
	}
	if(elemento.id=="telefonoC"){
		if(elemento.value!=""){
			if(validaTelf(elemento.value)){
			$(elemento).removeClass('error');
			objFromC.telf=true;
			}else{
				objFromC.telf=false;
				respuestaError="El teléfono no es válido,Tiene que empezar por 9, por 6 o por 7 y tener un total de 9 dígitos.<br>";
				$(elemento).addClass("error"); 
			}
				
		}else{
			objFromC.telf=false;
			respuestaError="El campo telefono no puede quedar vacío<br>";
			$(elemento).addClass("error"); 
			
		}
	}
	if(elemento.id=="emailC"){
		if(elemento.value!=""){
			if(validaEmail(elemento.value)){
			$(elemento).removeClass('error');
			objFromC.email=true;
			}else{
				objFromC.email=false;
				respuestaError="La dirección email no es válida<br>";
				$(elemento).addClass("error"); 
			}
				
		}else{
			objFromC.email=false;
			respuestaError="El campo email no puede quedar vacío<br>";
			$(elemento).addClass("error"); 
			
		}
	}
	
	if(elemento.id=="cif"){
		
		if(elemento.value!=""){
			if(isDNI(elemento.value)){
			$(elemento).removeClass('error');
			if(dir=="comprobarSolicitud"){
			  llamarAjax1({cif:elemento.value},"asignaErrorClienteSol",carpeta+dir+".php");
				}else{
			  		llamarAjax1({cif:elemento.value},"asignaErrorCliente",carpeta+dir+".php");
	
				}
			}else{
				objFromC.cif=false;
				respuestaError="El dni o cif no es válido<br>";
				$(elemento).addClass("error"); 
			}
				
		}else{
			objFromC.cif=false;
			respuestaError="El campo Cif no puede quedar vacío<br>";
			$(elemento).addClass("error"); 
			
		}
	}
	
	$('#mensaje').append(respuestaError);
	if(respuestaError!=""){
	$('#mensaje').show();
	}
}
function compruebaDatosClienteMod(elemento,dir){
	
	var respuestaError="";
	
	if(elemento.id=="contraC"){
		if(elemento.value!=""){
			if(elemento.value.length>3){
			$(elemento).removeClass('error');
			  //llamarAjax1({contra:elemento.value},"asignaErrorCliente",carpeta+dir+".php");
				objFromC.contra=true;
			}else{
				objFromC.contra=false;
				$('#mensaje').empty();
				respuestaError="La contraseña debe tener más de tres caracteres<br>";
				$('#mensaje').append(respuestaError);
				$(elemento).addClass("error"); 
			}
		}else{
			objFromC.contra=false;
			$('#mensaje').empty();
			respuestaError="El campo contraseña no puede quedar vacío<br>";
			$('#mensaje').append(respuestaError);
			$(elemento).addClass("error"); 

		}
	}
	if(elemento.id=="nickC"){
		if(elemento.value!=""){
			$(elemento).removeClass('error');
			  //llamarAjax1({nick:elemento.value},"asignaErrorCliente",carpeta+dir+".php");
			  objFromC.nick=true;
		}else{
			objFromC.nick=false;
			$('#mensaje').empty();
			respuestaError="El campo Nick no puede quedar vacío";
			$('#mensaje').append(respuestaError);
			$(elemento).addClass("error"); 
		}
	}
	if(elemento.id=="telefonoC"){
		if(elemento.value!=""){
			if(validaTelf(elemento.value)){
			$(elemento).removeClass('error');
			objFromC.telf=true;
			}else{
				objFromC.telf=false;
				$('#mensaje').empty();
				respuestaError="El teléfono no es válido,Tiene que empezar por 9, por 6 o por 7 y tener un total de 9 dígitos.";
				$('#mensaje').append(respuestaError);
				$(elemento).addClass("error"); 
			}
				
		}else{
			objFromC.telf=false;
			$('#mensaje').empty();
			respuestaError="El campo telefono no puede quedar vacío";
			$('#mensaje').append(respuestaError);
			$(elemento).addClass("error"); 
			
		}
	}
	if(elemento.id=="emailC"){
		if(elemento.value!=""){
			if(validaEmail(elemento.value)){
			$(elemento).removeClass('error');
			objFromC.email=true;
			}else{
				objFromC.email=false;
				$('#mensaje').empty();
				respuestaError="La dirección email no es válida";
				$('#mensaje').append(respuestaError);
				$(elemento).addClass("error"); 
			}
				
		}else{
			objFromC.email=false;
			$('#mensaje').empty();
			respuestaError="El campo email no puede quedar vacío";
			$('#mensaje').append(respuestaError);
			$(elemento).addClass("error"); 
			
		}
	}
	
	if(elemento.id=="cif"){
		
		if(elemento.value!=""){
			if(validateCIF(elemento.value)){
			$(elemento).removeClass('error');
			  //llamarAjax1({cif:elemento.value},"asignaErrorCliente",carpeta+dir+".php");
			  objFromC.cif=true;
			}else{
				objFromC.cif=false;
				$('#mensaje').empty();
				respuestaError="El dni o cif no es válido";
				$('#mensaje').append(respuestaError);
				$(elemento).addClass("error"); 
			}
				
		}else{
			objFromC.cif=false;
			$('#mensaje').empty();
			respuestaError="El campo Cif no puede quedar vacío";
			$('#mensaje').append(respuestaError);
			$(elemento).addClass("error"); 
			
		}
	}
	if(respuestaError!=""){
	$('#mensaje').show();
	}
}


function validaTelf(telf){
 var patron=/^[9|6|7][0-9]{8}$/;
 if(patron.test(telf)){
	 return true;
 }else{
	return false; 
 }
}
function validaEmail(email){
	
	var patron=/^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})$/;
	
	if(patron.test(email)){
		return true;
		
	}else{
		return false;	
	}
}


function validateCIF(cif){
	
	
	if(cif==""){
		
		//respuesta("El campo CIF_DNI es obligatorio","#cif","has-error");
		return false;
	}
	//Quitamos el primer caracter y el ultimo digito
	var valueCif=cif.substr(1,cif.length-2);
 
	var suma=0;
 
	//Sumamos las cifras pares de la cadena
	for(var i=1;i<valueCif.length;i=i+2)
	{
		suma=suma+parseInt(valueCif.substr(i,1));
	}
 
	var suma2=0;
 
	//Sumamos las cifras impares de la cadena
	for(var i=0;i<valueCif.length;i=i+2)
	{
	var	result=parseInt(valueCif.substr(i,1))*2;
		if(String(result).length==1)
		{
			// Un solo caracter
			suma2=suma2+parseInt(result);
		}else{
			// Dos caracteres. Los sumamos...
			suma2=suma2+parseInt(String(result).substr(0,1))+parseInt(String(result).substr(1,1));
		}
	}
 
	// Sumamos las dos sumas que hemos realizado
	suma=suma+suma2;
 
	var unidad=String(suma).substr(1,1)
	unidad=10-parseInt(unidad);
 
	var primerCaracter=cif.substr(0,1).toUpperCase();
 
	if(primerCaracter.match(/^[FJKNPQRSUVW]$/))
	{
		//Empieza por .... Comparamos la ultima letra
		if(String.fromCharCode(64+unidad).toUpperCase()==cif.substr(cif.length-1,1).toUpperCase())
			return true;
	}else if(primerCaracter.match(/^[XYZ]$/)){
		//Se valida como un dni
		var newcif;
		if(primerCaracter=="X")
			newcif=cif.substr(1);
		else if(primerCaracter=="Y")
			newcif="1"+cif.substr(1);
		else if(primerCaracter=="Z")
			newcif="2"+cif.substr(1);
		return validateDNI(newcif);
	}else if(primerCaracter.match(/^[ABCDEFGHLM]$/)){
		//Se revisa que el ultimo valor coincida con el calculo
		if(unidad==10)
			unidad=0;
		if(cif.substr(cif.length-1,1)==String(unidad))
			return true;
	}else{
		//Se valida como un dni
		return isDNI(cif);
	}

	return false;
	
	
}

function isDNI(dni) {
	
  var numero;
  var letr;
  var letra;
  var  patron =  /^[XYZ]?\d{5,8}[A-Z]$/;
  dni = dni.toUpperCase();
 
  if(patron.test (dni) == true){
     numero = dni.substr(0,dni.length-1);
     letr = dni.substr(dni.length-1,1);
     numero = numero % 23;
     letra='TRWAGMYFPDXBNJZSQVHLCKET';
     letra=letra.substring(numero,numero+1);
    if (letra!=letr.toUpperCase()) {
		//alert('Dni erroneo, la letra del NIF no se corresponde');
      return false;
     }else{
		 return dni
      
     }
  }else{
	  //alert('Dni erroneo, formato no válido');
    	return false;
   }
 
}

	
	$(function() {
		Webcam.set(
			{
				width: 1280,
				height: 720,
				image_format: 'jpeg',
				jpeg_quality: 90
			});
			
			Webcam.attach( '#camera--view' );
	});
	
	function configure(){
		
			var picture = document.getElementById('imageprev');
			/*const ctx = canvas.getContext('2d');
			ctx.filter= filtersC[filterIndex++ % filtersC.length];*/
			picture.className="";
			var effect = filters[filterIndex++ % filters.length];
			picture.classList.add(effect);

	}	
		//filtros
		
		let filterIndex = 0;
		const filters = [
		  'grayscale',
		  'sepia',
		  'blur',
		  'brightness',
		  'contrast',
		  'hue-rotate',
		  'hue-rotate2',
		  'hue-rotate3',
		  'saturate',
		  'invert',
		  ''
		];
		
		const filtersC = [
		 
		  'blur(5px)',
		  'opacity(50%)',
		  'brightness(50%)'
		  
		];
		// A button for taking snaps
		
		// preload shutter audio clip
		var shutter = new Audio();
		shutter.autoplay = false;
		shutter.src = navigator.userAgent.match(/Firefox/) ? 'shutter.ogg' : 'shutter.mp3';

		function take_snapshot() {
			// play sound effect
			shutter.play();
			// take snapshot and get image data
			
			Webcam.snap( function(data_uri) {
				
				document.getElementById('results').innerHTML = '<img id="imageprev" class="taken" src="'+data_uri+'"/>';					
				//createCanvas(data_uri);
				//getListPhotos('loadPhotos.php');
			});
			//Webcam.reset();
		}

		function saveSnap(){
			// Get base64 value from <img id='imageprev'> source
			//var canvas=document.getElementById("imageprev");
			
			var base64image =  document.getElementById("imageprev").src; //canvas.toDataURL();

			 Webcam.upload( base64image, 'upload.php', function(code, text) {
				 console.log('Save successfully');
				 console.log(text);
            });

		}
		
	function createCanvas(data_uri){
		
		var canvas = document.createElement('canvas');
		var ctx = canvas.getContext("2d");
		var image = new Image();	
		canvas.width = 400;
		canvas.height = 300;
		
		/*
		window.addEventListener('resize', resizeCanvas, false);
        window.addEventListener('orientationchange', resizeCanvas, false);
        resizeCanvas();
		*/
		image.onload = function() {
			ctx.drawImage(this, 0, 0);	
		}
		
		image.src=data_uri;
		$(canvas).attr('id', 'imageprev');
		$("#results").empty();
		$("#results").append(canvas);

	}
	
	 function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
	
	function getListPhotos(dir) {
			
		$.ajax(
			{
				url:dir,
				type:'POST'			
			})
			.done(function(data) {
			
				muestraListaPhotos(data);
			})
			.fail(function(data) {
				console.log(data);
				alert("fallo de envio/send");
			});
			
	}
	
	function muestraListaPhotos(data){
		
		datos=JSON.parse(data);
		var listaProductos=new Array();
		var miDiv = document.getElementById("myAwesomeForm");
		$("#myAwesomeForm").empty();
		for(var i=0;i<datos.length;i++){
			if(datos[i]!=""){		
				
				var img = $('<img />',
				 { id: 'Myid'+i,
				   src: "data:image/jpeg;base64,"+datos[i], 
				   width: 50
				 });
				 
				img.appendTo(miDiv);
				
			}
		}
	}
	
	function b64toBlob(b64Data, contentType, sliceSize) {
        contentType = contentType || '';
        sliceSize = sliceSize || 512;

        var byteCharacters = atob(b64Data);
        var byteArrays = [];

        for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            var slice = byteCharacters.slice(offset, offset + sliceSize);

            var byteNumbers = new Array(slice.length);
            for (var i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            var byteArray = new Uint8Array(byteNumbers);

            byteArrays.push(byteArray);
        }

      var blob = new Blob(byteArrays, {type: contentType});
      return blob;
}
		

// Set constraints for the video stream
var constraints = { video: { facingMode: "user" }, audio: false };
var track = null;

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
	
// Define constants
const cameraView = document.querySelector("#camera--view"),
    cameraOutput = document.querySelector("#camera--output"),
    cameraSensor = document.querySelector("#camera--sensor"),
    cameraTrigger = document.querySelector("#camera--trigger");

// Access the device camera and stream to cameraView
function cameraStart() {
    navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function(stream) {
            track = stream.getTracks()[0];
            cameraView.srcObject = stream;
        })
        .catch(function(error) {
            console.error("Oops. Something is broken.", error);
        });
}

// Take a picture when cameraTrigger is tapped
cameraTrigger.onclick = function() {
    cameraSensor.width = cameraView.videoWidth;
    cameraSensor.height = cameraView.videoHeight;
    cameraSensor.getContext("2d").drawImage(cameraView, 0, 0);
    cameraOutput.src = cameraSensor.toDataURL("image/webp");
    cameraOutput.classList.add("taken");
	saveSnap();
    // track.stop();
};


	function saveSnap(){
			// Get base64 value from <img id='imageprev'> source
			//var canvas=document.getElementById("imageprev");
			
			var base64image =  document.getElementById("camera--output").src; //canvas.toDataURL();

			 Webcam.upload( base64image, 'upload.php', function(code, text) {
				 console.log('Save successfully');
				 //getListPhotos('loadPhotos.php');
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

// Start the video stream when the window loads
window.addEventListener("load", cameraStart, false);
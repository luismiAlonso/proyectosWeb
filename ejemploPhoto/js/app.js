// Set constraints for the video stream
var constraints = { video: { facingMode: "user" }, audio: false };
var track = null;

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
    cameraOutput.src = cameraSensor.toDataURL("image/jpeg");
    cameraOutput.classList.add("taken");
	saveSnap();
    // track.stop();
};


	function saveSnap(){
			var base64image =  document.getElementById("camera--output").src; //canvas.toDataURL();
			uploadPhoto(base64image);
			//getListPhotos();	//meter en un slider
		}
	
	function uploadPhoto(basePhoto){
		dataPhoto={"photo":basePhoto}
		$.ajax(
			{
				data:dataPhoto,
				url:"upload.php",
				type:'POST'			
			})
			.done(function(data) {
				//alert(data);
				//muestraListaPhotos(data);
			})
			.fail(function(data) {
				console.log(data);
				//alert("fallo de envio/send");
			});
	}
	
	function getListPhotos() {
			
		$.ajax(
			{
				url:"loadPhotos.php",
				type:'POST'			
			})
			.done(function(data) {
				muestraListaPhotos(data);
			})
			.fail(function(data) {
				console.log(data);
				//alert("fallo de envio/send");
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
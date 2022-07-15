const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');


function getVideo(){
    navigator.mediaDevices
    .getUserMedia({ video: true, audio: false})
    .then(localMediaStream => {
        debugger;
        console.log(localMediaStream);
        video.srcObject = localMediaStream;
    })
    .catch(() =>alert('upss no se tiene acceso a la camara.'));


}

function paintCanvas(){
    const width = video.videoWidth;
    const height = video.videoHeight;
    canvas.width = width;
    canvas.height = height;

    return setInterval(() => {

        ctx.drawImage(video,0,0, width, height)
        let pixels = ctx.getImageData(0,0,width,height);
        pixels = redEffect(pixels);
        
        ctx.putImageData(pixels,0,0);
    },16);

    function redEffect(pixels){
        for ( i = 0; i < pixels.data.length; i+= 4) {
            pixels.data[i] = pixels.data[i] + 200;
            
        }
        return pixels;
    }
}

function takePhoto(){
    snap.currentTime =0;
    snap.play();
    const data = canvas.toDataURL('image/jpg')
    const link = document.createElement('a');
    link.href = data;
    link.setAttribute('download','foto');
    link.innerHTML = 'descargar'
    strip.insertBefore(link, strip.firstChild);

}



getVideo();
video.addEventListener('canplay', paintCanvas)


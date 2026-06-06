// console.log(document.getElementById('myVideo'));

var player = videojs('myVideo', {
    controls: true,
    // loop: false,
    width: 320,
    height: 240,
    // fluid: true,
    plugins: {
        record: {
            maxLength: 10,
            debug: true,
            audio: true,
            video: true,
        }
    }
}, function(){
    // print version information at startup
    videojs.log('Using video.js', videojs.VERSION,
        'with videojs-record', videojs.getPluginVersion('record'),
        'and recordrtc', RecordRTC.version);
});


// error handling
player.on('deviceError', function() {
    console.log('device error:', player.deviceErrorCode);
});
player.on('error', function(error) {
    console.log('error:', error);
});
// user clicked the record button and started recording
player.on('startRecord', function() {
  
});

//player.record();
window.player = player;

player.on('finishRecord', function() {
  // show save as dialog
  console.log('blob size', player.recordedData);
  window.recordedData = player.recordedData;
  // player.record().saveAs({'video': 'my-video-file-name.webm'});
});
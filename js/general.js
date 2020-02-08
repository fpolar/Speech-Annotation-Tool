
var myVideo = document.getElementById("v");
var pButton = document.getElementById("pp");// play/pause button
var sld = document.getElementById("sld");// the slider

var cRectangle = {top:-1, left:-1, width:-1, height:-1}

var syncing;
var refreshID;
var scrollInterval;
var scrollOn = false;
var resumeTime = 0;

var newWidthWidth = 100 * myVideo.duration;
myVideo.addEventListener('loadedmetadata', function() {
    console.log(myVideo.duration);
    sld.max = myVideo.duration*100;
    sld.value = sld.max/2;
});
document.onkeyup = function (event) {
    if (document.activeElement.tagName !== "INPUT")
    {
        var key = event.keyCode;
        if (key === 90)
        {
            setStart();
        }
        if (key === 88)
        {
            setEnd();
        }
        if (key === 83)
        {
            clearCurrent(true);
        }
        if (key === 65)
        {
            clearCurrent(false);
        }
        if (key === 32)
        {
            letsPlay();
        }
        if (key === 39)
        {
            sld.value++;
			refreshTimer();
        }
        if (key === 37)
        {
            sld.value--;
			refreshTimer();
        }
    }
};
function resizeTable(){
	$("#annotation-table").height($(document).height()-$("#table-toggle").offset().top+$("#table-toggle").outerHeight()-170);
}
function resizeMenu(){
	console.log($("#media").height());
	$("#menu").height($("#media").height());
}
$( window ).resize(function(){
	resizeTable();
	resizeMenu();
});
$( document ).ready(function(){
	resizeTable();
	resizeMenu();
	myVideo.playbackRate=0.5;
});
// end of initialization
function getVideo(){
	var newSrc = $("#videoURL").val();
	if(newSrc !== ""){
	myVideo.src = newSrc;
	}
	$("#URLPopup").hide();
	$("#v").show();
	$("#controls").show();
	
	var videoDiv = $("#v");
	
	resizeTable();
	resizeMenu();
	
	$("#canvas").css({
		"left":  $(videoDiv).position.left,
		"top":  $(videoDiv).position.top,
		"width": $(videoDiv).width(),
		"height": $(videoDiv).height(),
		"display": "block"
    });
}
function refreshTimer(){
	var newPosition = sld.value/100;
        myVideo.currentTime = newPosition;
//        console.log("current time "+myVideo.currentTime);
        var textForTimer = '' + myVideo.currentTime;
        textForTimer = textForTimer.substr(0, textForTimer.indexOf('.') + 7);
        if (textForTimer.indexOf('.') === 1 || textForTimer.indexOf('.') === -1)
        {
            textForTimer = '00:00:0' + textForTimer;
        } else if (textForTimer.indexOf('.') === 2) {
            textForTimer = '00:00:' + textForTimer;
        } else if (textForTimer.indexOf(':') === 1)
        {
            textForTimer = '00:0' + textForTimer;
        } else
        {
            textForTimer = '00:' + textForTimer;
        }
        $("#timer").text(textForTimer);
}
function sync()
{
	console.log("syncing");
    if (myVideo.ended)
    {
        myVideo.pause();
        pp.innerHTML = "<i class='fa fa-play'></i>";
        console.log("ended");
        return;
    } else if (myVideo.paused)
    {
        refreshTimer()
    } else
    {
        sld.value = myVideo.currentTime*100;
        var textForTimer = '' + myVideo.currentTime;
        textForTimer = textForTimer.substr(0, textForTimer.indexOf('.') + 7);
        if (textForTimer.indexOf('.') === 1)
        {
            textForTimer = '00:00:0' + textForTimer;
        } else if (textForTimer.indexOf('.') === 2) {
            textForTimer = '00:00:' + textForTimer;
        } else if (textForTimer.indexOf(':') === 1)
        {
            textForTimer = '00:0' + textForTimer;
        } else
        {
            textForTimer = '00:' + textForTimer;
        }
        $("#timer").text(textForTimer);
//        console.log("set text "+textForTimer);
//        console.log(myVideo.error);
//        console.log("video time - duration "+myVideo.currentTime+" "+myVideo.duration);
        setTimeout(sync, 10);
    }
}
/*I was working on this crazy bug for days that would stop the video playing around 10 and a half seconds, turns out, the video on the sail server was just currupt*/
function letsPlay()
{
    if (myVideo.paused)
    {
        myVideo.play();
        pp.innerHTML = "<i class='fa fa-pause'></i>";
        sync();
    } else
    {
        myVideo.pause();
        pp.innerHTML = "<i class='fa fa-play'></i>";

    }
}

function get_results() {
    var output = {};
    var count = 0;
    $('div:not(#annotation-table-header) #annotation-table .row').each(function () {
		console.log(this);
        output[count] = {
            'character': $(this).children('.nameIn').val(),
            'gender': $(this).children('.genderIn').val(),
            'start': $(this).children('.startIn').val(),
            'stop': $(this).children('.stopIn').val(),
            'noises': $(this).children('.noisesIn').val(), 
			'rectangle': cRectangle
        };
        count++;
    });
	console.log(output[0]);
    var txtFile = "output.txt";
    var file = new File([""], txtFile);
    var str = JSON.stringify(output, null, 4);
    return str;
}
var mousedownID = -1;
$(sld).mousedown(function () {
    if (!(myVideo.paused))
    {
        letsPlay();
    }
	if(mousedownID==-1)
     	mousedownID = setInterval(sync, 50);
});
$(sld).mouseup(function () {
   if(mousedownID!=-1) {
     clearInterval(mousedownID);
     mousedownID=-1;
   }
});

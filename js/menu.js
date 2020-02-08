//global variables
var numAnnotations = 0;
var numDeleted = 0;
var annotations = {};
var currentAnnotation = {name:"",start:"", stop:"", rectangle:null, extra:null};

//user flow functions
$("#start").click(function(){
	currentAnnotation.start = $("#timer").text();
	$("#starts-talking-pop-up").toggle();
	$("#name-pop-up").toggle();
});
$("#confirm-name").click(function(){
	currentAnnotation.name = $("#name").val(); 
	currentAnnotation.gender = $("#gender").val(); 
	$("#name-pop-up").toggle();
	$("#on-frame-pop-up").toggle();
});
$("#on-frame").click(function(){
	$("#on-frame-pop-up").toggle();
	$("#draw-on-frame-pop-up").toggle();
});
$("#off-frame").click(function(){
	$("#on-frame-pop-up").toggle();
	$("#stops-talking-pop-up").toggle();
});
$(".confirm-selection").click(function(){
	//these numbers need to be changed to represent
	//values relative to video frame(percentage)
	var drawnRectangle = document.getElementById("rectangle");
	console.log(drawnRectangle);
	currentAnnotation.rectangle = {
		top: drawnRectangle.style.top,
		left: drawnRectangle.style.left,
		height: drawnRectangle.style.height,
		width: drawnRectangle.style.width
	};
	$("#rectangle").remove();
	if(currentAnnotation.stop === ""){
		$("#draw-on-frame-pop-up").toggle();
		$("#stops-talking-pop-up").toggle();
	}else{
		$("#draw-on-frame-again-pop-up").toggle();
		finishAnnotation();
	}
});
$(".reset-selection").click(function(){
	$("#rectangle").remove();
	$(".reset-selection").prop('disabled', true);
	$(".confirm-selection").prop('disabled', true); 
	$(".reset-selection-again").prop('disabled', true);
	$(".confirm-selection-again").prop('disabled', true); 
});
$("#stop").click(function(){
	$("#stops-talking-pop-up").toggle();
	currentAnnotation.stop = $("#timer").text();
	if(currentAnnotation.rectangle === null){
		$("#on-frame-again-pop-up").toggle();
	}else{
		finishAnnotation();
	}
});
$("#off-frame-again").click(function(){
	$("#on-frame-again-pop-up").toggle();
	finishAnnotation();
});
$("#on-frame-again").click(function(){
	$("#on-frame-again-pop-up").toggle();
	$("#draw-on-frame-again-pop-up").toggle();
});
//this function is defined in extra.js on the buttons creation
//$("#submit-extras").click(function(){
//	$("#extra-attributes-pop-up").toggle();
//	submitExtraAttr();
//	finishAnnotation();
//});
function finishAnnotation(){
	console.log(($("#extra-attributes-pop-up").hasClass("empty")));
	console.log((currentAnnotation.extra !== null));
	if($("#extra-attributes-pop-up").hasClass("empty")||currentAnnotation.extra !== null){
		annotations[numAnnotations] = currentAnnotation;
	
		insertAnnotationIntoSheet();
		
		numAnnotations++;
	
		currentAnnotation = {name:"",start:"", stop:"", rectangle:null, extra:null};
	
		$("#finished-pop-up").toggle();
		resizeTable();
		resizeMenu();
	}else{
		$("#extra-attributes-pop-up").toggle();
	}
}
$("#another-annotation").click(function(){
	$("#finished-pop-up").toggle();
	$("#starts-talking-pop-up").toggle();
});

//table functions
$("#table-toggle").click(function(){
	$("#annotation-table").toggle();
	$("#table-toggle .fa-caret-down").toggle();
	$("#table-toggle .fa-caret-up").toggle();
});

function insertAnnotationIntoSheet() {
    var char = document.createElement("div");
    char.className = "row";
    // inputs
	var inputs = [];
    var nameInput = document.createElement("input");
    nameInput.value = currentAnnotation.name;
    nameInput.className = "nameIn";
	inputs[0] = nameInput;
	
	
    var startInput = document.createElement("input");
    startInput.value = currentAnnotation.start;
    startInput.className = "startIn";
	inputs[1] = startInput;
	
    var stopInput = document.createElement("input");
    stopInput.value = currentAnnotation.stop;
    stopInput.className = "stopIn";
	inputs[2] = stopInput;
	
    var extraAttr = document.createElement("button");
    extraAttr.innerHTML = "Extra Attributes";
    extraAttr.className = "extraAttr";
	$(extraAttr).click(function(){displayExtrasForEntry(numAnnotations+"");});
	inputs[3] = extraAttr;
	
    var editButton = document.createElement("button");
    editButton.innerHTML = "delete";
    editButton.className = "delete";
	$(editButton).click(function(){deleteEntry(numAnnotations+"");});
	inputs[4] = editButton;
	
	for(var i=0;i<5;i++){	
		var tempCol = document.createElement("div");
		tempCol.className = "col col-sm-2";
		tempCol.appendChild(inputs[i]);
		char.appendChild(tempCol);
	}

    document.getElementById("annotation-table").appendChild(char);
}

function displayExtrasForEntry(x){
//	console.log(x);
	var xInt = parseInt(x)-1;
	console.log(xInt);
	var tempEntry = annotations[xInt];
	console.log(tempEntry);
	alert(JSON.stringify(tempEntry.extra));
}
function deleteEntry(x){
//	console.log(x);
//	console.log($("#annotation-table .row:eq("+x+")"));
	var xInt = parseInt(x)-(numDeleted++);
	$("#annotation-table .row:eq("+x+")").remove();
	delete annotations[x];
}

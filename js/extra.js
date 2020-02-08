function extraAttrInit(file)
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
            	var empty = true;
            	var extraHTML = "";
                var allText = rawFile.responseText;
                var lines = allText.split('\n');
//                console.log(allText);
                lines.forEach(function(e){
//            		console.log(e);
                	if(e.length>0 && e.substr(0,1)!=='#'){
                		extraHTML+=e+"<br>"
                		empty = false;
                	}
                });
                extraHTML += "<button id='submit-extras'>Submit</button>";
                $("#extra-attributes").html(extraHTML);
                
                if(!empty){
                	console.log("remove empty");
                	$("#extra-attributes-pop-up").removeClass("empty");
                }

                $("#submit-extras").click(function(){
                	$("#extra-attributes-pop-up").toggle();
                	submitExtraAttr();
                	finishAnnotation();
                });
            }
        }
    }
    rawFile.send(null);
}
$(function() {
	extraAttrInit("./config.json");
});
//goes through all the extra inputs, and gets the names and values for each
function submitExtraAttr(){
	inputMap = {};
	$("#extra-attributes input").each(function(){
		var currentName = this.name;
		var currentType = this.type;
		var currentValue = this.value;
		if(currentType === "checkbox"){
			currentValue = this.checked;
		}
		else if(currentType === "radio"){
			if(this.checked){
				inputMap[currentName] = currentValue;
			}
		}else{
			inputMap[currentName] = currentValue;
		}
	});
    if(!$("#extra-attributes-pop-up").hasClass("empty")){
    	console.log("adding empty");
    	$("#extra-attributes-pop-up").removeClass("empty");
    }
	console.log(inputMap);
	currentAnnotation.extra = inputMap;
};

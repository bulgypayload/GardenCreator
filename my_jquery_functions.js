//Author: Kyle Platou

//this is the my_jquery_test.js file code to see if it works in this file. 
var myGarden;  
var myButtons;
var myPlots;
var myPlants; 
var plantCount;
var plotCount;
var buttonCount;
var pixelsPerFoot = 24; 
var gridHeight;
var gridWidth;
var slideIndex = 0;
var modalPicNumber=0;

var requestURL = 'garden2.json';
 var request = new XMLHttpRequest();

  request.open('GET', requestURL);
  request.responseType = 'json';
  request.send();
  request.onload = function(){
    myGarden = request.response;
    myPictures = myGarden['myPictures'];
	myButtons = myGarden['button'];
	myPlots = myGarden['plot'];
	myPlants = myGarden['plant']; 
    plantCount = myGarden.settings.plantCount;
	plotCount = myGarden.settings.plotCount; 
    buttonCount = myGarden.settings.buttonCount;
	gridHeight = myGarden.settings.gridHeight;
	gridWidth = myGarden.settings.gridWidth;
//---------------------------------------------------------------------------------------------------test



$(document).ready(function(){
  //Creates a tool tips-------------------------------
//$( document).tooltip();

//Make the grid dropable so the plot and plants can be dropped
makeDroppable("#grid");

//Populate the grid when document ready
populateGrid();
addPicturesToModal();
//$("#datePicker").datepicker();

// Get the current date and put in format MM/DD/YYYY
//var fullDate = new Date();
//var month = ((fullDate.getMonth().length+1) === 1)? '0' + (fullDate.getMonth()+1) : (fullDate.getMonth()+1);
//var todaysDate = month + "/" + fullDate.getDate() + "/" + fullDate.getFullYear();

//On window resize change Min width of grid
$(window).resize(function(){

	$("#grid").css({
      "min-height":$(window).height(),
      "min-width": $(window).width()     	  
    });
});

//Set height of grid and containers
if(gridWidth < $(window).width())
{
	gridWidth = $(window).width();
}

if(gridHeight < $(window).height())
{
	gridHeight = $(window).height(); 
}

$("#container").css({"width":"100%", "height": "100%"});
$("#grid").css({"width":gridWidth, "height": gridHeight});

//Make grid selectable
$("#grid").selectable();

//Let the grid Items be draggable----------------------
var grid = "#grid";
var plant = ".plant";
var plot = ".plot";
var plantNumber = 0;
//-----------------------------old place of myGarden-----------------------------------------------test

//This is the save button onclick function. 
$("#deleteObject").click(function(){  
    deleteSelected();   
});


//This is the save button onclick function. 
$("#saveGarden").click(function(){ 	

	//saves the application variables to the global Garden object. 
	myGarden.plant = myPlants;
	myGarden.plot = myPlots; 
    myGarden.myPictures = myPictures;
	myGarden.settings.plantCount = plantCount; 
	myGarden.settings.plotCount = plotCount; 
    myGarden.settings.buttonCount = buttonCount;
	myGarden.settings.gridWidth = gridWidth;
	myGarden.settings.gridHeight = gridHeight;
    myGarden.button = myButtons;	
	
	//filters the array for undefined values. 	
    var  string = JSON.stringify(myGarden, null, 2);
    var a = document.createElement('a');
    var file = new Blob([string], {type: 'application/json'});
    a.href = URL.createObjectURL(file);
    a.download = 'garden2.json';
    a.dispatchEvent(new MouseEvent(`click`, {bubbles: false, cancelable: true, view: window}));
	console.log('Saved');
});

// //ButtonClicks createStuff(class, Label, backgroundImage)
$("#addPlot").click(function(){
  var plotObject ={
	  id: "plot" + plotCount,
      parentId: "grid",
      classType: "plot",
      class: "plot ui-resizable ui-draggable ui-draggable-handle ui-droppable",
      backgroundImage: "pictures/ground.jpg",
      title: "Plot " + plotCount,
      zIndex: "2",
      top: 20,
      left: 100,
      height: 100,
      width: 100,
      moistureLevel: "20%"
  };
  plotCount++; 
  createStuff(plotObject);
  myPlots.push(plotObject);  
});

//Add plant button click
$("#addPlant").click(function(){
	document.getElementById('id01').style.display='block'; 
 });

//Increase width or height function-------------------------------------
$("#increaseGridWidth").click(function(){
  $("#grid").animate({
    width: "+=100"
  });
  gridWidth +=100;
});

$("#increaseGridHeight").click(function(){
    $("#grid").animate({
      height: "+=100",
    });
	gridHeight +=100;
});


//Decrease width or height function-------------------------------------
$("#decreaseGridWidth").click(function(){
  if( $("#grid").width() > $(window).width()){
    $("#grid").animate({
      width: "-=100"
    });
	gridWidth -=100;
  }
});

$("#decreaseGridHeight").click(function(){
  if( $("#grid").height() > $(window).height()){
    $("#grid").animate({
      height: "-=100"
    });
	gridHeight -=100;
  }
});

// Delete objects when selected-----------------------------
$(document).keyup(function(e){
  if(e.which === 46)
  {
	deleteSelected();
  }	
});

//Deletes the selected elements
function deleteSelected() {
    // body...
    //$(".ui-selected").remove();
    var itemToRemove =[];   
    itemToRemove = $(".ui-selected").toArray();

    for(var i = 0; i < itemToRemove.length; i++)
    {       
        for(var k = 0; k < myPlots.length; k++)
        {           
            if(myPlots[k] != null && itemToRemove[i]['id'] === myPlots[k]['id'])
            {
                delete myPlots[k];          
            }
        }//end of for

        for(var k = 0; k < myPlants.length; k++)
        {
            if(myPlants[k] != null && itemToRemove[i]['id'] === myPlants[k]['id'])
            {
                delete myPlants[k];         
            }
        }//end of for
    }
    $(".ui-selected").remove();

    myPlants = myPlants.filter(function(x) { return true }); 
    myPlants = myPlants.filter(function(x) { return true });
    myPlots = myPlots.filter(function(x) { return true }); 
    myPlots = myPlots.filter(function(x) { return true });
}//end delete selected elements

});}//end document ready function

//Slid Show controls
function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("demo");
    var captionText = document.getElementById("caption");
    var pictureSource = document.getElementById("picInput");
    if (n > slides.length) {slideIndex = 0}
        if (n < 0) {
            slideIndex = slides.length
        }
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex].style.display = "block";
    dots[slideIndex].className += " active";
    captionText.innerHTML = dots[slideIndex].alt;  

}//end of slideshow functions

//Iterates throught the JSON myPictures array to add the thumbnail and slideshow pictures
function addPicturesToModal() {
    // body...
    for( var i = modalPicNumber; i < myPictures.length; i++)
    {       
        addPictureToModal(myPictures[i].source, myPictures[i].alt, i)
        modalPicNumber++;
    }

    showSlides(slideIndex);
    
}//end createAddPictures to plant form

//Adds a single picture to modal
function addPictureToModal(pictureSource, altTag, i)
{
    $("#idMySlideShow").append("<div class=mySlides><img src="+ pictureSource + "></div>");    
        $("#myRow").append("<div class=column><img class=demo cursor src="
            + pictureSource 
            +" style=width:100% onclick=currentSlide("
            +i
            +") alt="
            + altTag + " ></div>");
}

//Populate the grid Function-------------------------------------------------------------------------
function populateGrid()
{  
    //add the buttons to menu
    for(var i = 0; i < myButtons.length; i++)
    {
        createButton(myButtons[i]);
    }

    //Create the plots 
    for(var i = 0; i < myPlots.length; i++)
    {
    	createStuff(myPlots[i]);
    } 

    //get the stand alone plants from the json object  
    for(var i = 0; i < myPlants.length; i++)
    {
        createStuff( myPlants[i]); 		
    }     
}//end populate grid function

//buttonAdd function for the plant from the modal
function createNewButton()
{

    if(isFilledOut()){    
    var myNewPlant = {
            id: "button" + buttonCount,
            class: "addButton",
            backgroundImage: getSelectedBackgroundImage(),
            title: $("#variety").val(),
            datePlanted: document.getElementById("myDatePlanted").valueAsDate,
            daysToHarvest: $("#daysToHarvest").val()*1,
            objCreateMinWidth: $("#plantSpacing").val() * 2,
            objCreateMinHeight: $("#rowSpacing").val() * 2,
            objCreateWidth: $("#plantSpacing").val() * 2,
            objCreateHeight: $("#rowSpacing").val() * 2
        };          
        
        
        createButton(myNewPlant);
        checkMyPictures(myNewPlant);         
        myButtons.push(myNewPlant);  
        clearModalInput();
        document.getElementById('id01').style.display='none';        
        buttonCount++;
    }
    else{
        alert("Please fill out all fields.");
    }
}

//Add picture to myPictures and to modal
function checkMyPictures(myNewPlant)
{
    var pictureExists = false; 

    for(var i = 0; i < myPictures.length; i++)
    {
        if(myPictures[i].source === myNewPlant.backgroundImage)
        {
            pictureExists = true; 
            break;
        }
    }
    if(pictureExists === false)
    {
        var picture = {source: myNewPlant.backgroundImage, alt: myNewPlant.title};

        myPictures.push(picture); 
        addPictureToModal(picture.source, picture.alt, modalPicNumber);
        modalPicNumber++;
    }
}

//Set bockground image to file selection or to default value based on picture selected.
function getSelectedBackgroundImage()
{
    var pictureSelected = document.getElementById("picInput");    

    if(pictureSelected.files[0] === undefined)
    {        
        return $("img.active").attr('src'); 
    }
    else{
        return "pictures/" + pictureSelected.files[0].name 
    }
}

//Clears the input fields 
function clearModalInput()
{
    $("#variety").val("");
    $("#picInput").val("");
    $("#variety").val("");
    //$("#myDatePlanted").val("");
    $("#daysToHarvest").val("");
    $("#plantSpacing").val("");
    $("#rowSpacing").val("");
    $("#rowSpacing").val("");
    $("#plantSpacing").val("");
}

//Check if the input fields are completed if not send alert message
function isFilledOut()
{
    var check = true; 

    var inputField = new Array($("#variety").val(),
    //$("#picInput").val(),
    $("#myDatePlanted").val(),
    $("#daysToHarvest").val(),
    $("#plantSpacing").val(),
    $("#rowSpacing").val(),
    $("#rowSpacing").val(),
    $("#plantSpacing").val());

    for(var i =0; i < inputField.length; i++)
    {
        if(inputField[i] === "" || inputField[i] === null)
        {
            check = false;
            break; 
        }
    };
    return check; 
}

//add a button and the click event function test
 function createButton(buttonObj){
	// Add the button to the html doc TODO add the title to the buttons create method
    $("#toolBar").append("<button id="+ buttonObj.id + " title="
        + buttonObj.title +" class=addButton style=background-Image:url("
        + buttonObj.backgroundImage +")></button>");
    
	// Get the current date and put in format MM/DD/YYYY    
	var createDatePlanted = new Date(buttonObj.datePlanted);
	var month = (createDatePlanted.getUTCMonth()+1);//((fullDate.getMonth().length+1) === 1)? '0' + (fullDate.getMonth()+1) : (fullDate.getMonth()+1);
	var myDate = month + "/" + createDatePlanted.getUTCDate() + "/" + createDatePlanted.getUTCFullYear();

    console.log(createDatePlanted);
    console.log(createDatePlanted.getUTCDate());
    console.log(createDatePlanted.getUTCMonth()+1);
    console.log(createDatePlanted.getUTCFullYear());

	
    //Give the button a click event that calls createStuff to create a plant
    $("#"+buttonObj.id).click(function(){	 
      var gardenObject = {
          id : "plant" + plantCount,
		  parentId : "grid",
		  classType: "plant",
          class: "plant small ui-resizable ui-draggable ui-draggable-handle",
          backgroundImage : buttonObj.backgroundImage,
          zIndex : "3",
          title: buttonObj.title,
          top: 20,
          left: 100,
          height: buttonObj.objCreateHeight,
          width: buttonObj.objCreateWidth,
          minWidth: buttonObj.objCreateMinWidth,
          minHeight: buttonObj.objCreateMinHeight,
          daysToHarvest: buttonObj.daysToHarvest,
          datePlanted : myDate,
          harvestDate : calculateHarvestDate(createDatePlanted, buttonObj.daysToHarvest)		   
	  };
	  myPlants.push(gardenObject);
      createStuff(gardenObject)
	  plantCount++; 
    });	
 }

 function calculateHarvestDate(plantDate, daysToHarvest)
 {   
    var returnDate = new Date(
        plantDate.getUTCFullYear(),
        plantDate.getUTCMonth()+1,
        plantDate.getUTCDate() + daysToHarvest);    

    return returnDate.getUTCMonth() + "/" + returnDate.getUTCDate() + "/" + returnDate.getUTCFullYear();
 }

//Create stuff with areguments classType, title backgroundImage, itemSize, datePlanted, dateHarvest and moistureLevel
function createStuff( gardenObject){

    var classType = gardenObject.classType; 

  if( classType === "plot")
  {
    createPlot(gardenObject);
  }  
  else if(classType === "plantJ" || classType ==="plant")
  {
	createPlant(gardenObject);	
  }
  else {
    alert("No stuff added.");
  }
  // $(classType + ":first").css("left", "50%");
  $("#" + gardenObject.id).css("position", "absolute");
  addClick(gardenObject);
}

//Create the plotsObject
function createPlot(gardenObject) {
    // body...
    $("#grid").prepend("<div id="+ gardenObject.id 
        +" class=plot title=plot><div class=plotWidthLabel widthLabel></div>"
        +"<div class=plotHeightLabel heightLabel></div></div>");
    $(".plotWidthLabel").addClass("widthLabel");
    $(".plotHeightLabel").addClass("heightLabel");
    // Start of experimental backgroundImage
    $("#" + gardenObject.id).css({
      height: gardenObject.height,
      width: gardenObject.width,
      left: gardenObject.left,
      top: gardenObject.top
    });
    makeResizable(gardenObject);
    makeDraggable(gardenObject);
    makeDroppable(gardenObject.classType, gardenObject);
    createToolTip(gardenObject); 

    var width = ($("#" + gardenObject.id).width()/pixelsPerFoot).toFixed(2);
    var height = ($("#" + gardenObject.id).height()/pixelsPerFoot).toFixed(2);
    $(".plotWidthLabel:first").text(width + " ft"); 
    $(".plotHeightLabel:first").text(height + " ft");

}//end createPlot

//Creates a plant object
function createPlant(gardenObject){
    //Create the garden object by finding the parent and prepending to the html
    $("#" + gardenObject.parentId).prepend("<div id="+ gardenObject.id+" class=plantJ title="+gardenObject.title+">"
        + "<div class=plantWidthLabel></div>"
        + "<div class=plantHeightLabel></div>"
        +"<div id="+ gardenObject.id +"picture class=plantJ title="+ gardenObject.title +">"
        +"</div>");
    $(".plantWidthLabel").addClass("widthLabel");
    $(".plantHeightLabel").addClass("heightLabel");     

    //Sets the background picture for the plant creates the size and repeats 
    $("#" + gardenObject.id+ "picture").css("background-image", "url(" + gardenObject.backgroundImage +")");
    $("#" + gardenObject.id + "picture").css({
      height: "100%",
      width: "100%",
      "background-repeat": "repeat",
    });
    $("#" + gardenObject.id + "picture").css("background-size", gardenObject.minWidth +"px "+ gardenObject.minHeight +"px");
    
    
    $("#" + gardenObject.id).css({
      height: gardenObject.height,
      width: gardenObject.width,
      left: gardenObject.left,
      top: gardenObject.top
    });

    //$("#" + gardenObject.id).css("background-size", gardenObject.minWidth +"px "+ gardenObject.minHeight+"px");
    makeResizable( gardenObject );    
    makeDraggable( gardenObject );
    createToolTip( gardenObject );

    var lblWidth = ($("#" + gardenObject.id).width()/pixelsPerFoot).toFixed(2);
    var lblHeight = ($("#" + gardenObject.id).height()/pixelsPerFoot).toFixed(2);   
    var lblRowSpacing = (gardenObject.minHeight/pixelsPerFoot).toFixed(2);
    var lblPlantSpacing = (gardenObject.minWidth/pixelsPerFoot).toFixed(2);

    if(lblWidth >= 12){
        $("#" + gardenObject.id + " > div.plantWidthLabel").text(gardenObject.title + " "+ lblWidth + "ft" 
            +" (Plant " + lblPlantSpacing + "ft / " 
            +" Row " + lblRowSpacing + "ft)" );
        }
        else if(lblWidth >=5) {
          $("#" + gardenObject.id + " > div.plantWidthLabel").text(gardenObject.title + " "+ lblWidth + "ft");
        }
        else
        {
            $("#" + gardenObject.id + " > div.plantWidthLabel").text(lblWidth + "ft");
        }

        if(lblHeight >=1)
        {
          $("#" + gardenObject.id + " > div.plantHeightLabel").text(lblHeight + " ft");
        }
        else {
          $("#" + gardenObject.id + " > div.plantHeightLabel").text("");
        }

}//end create plant

//Make Item draggable based on classType plant or plot
function makeDraggable(gardenObject )
{
    var classType = gardenObject.classType;
  if(classType === "plot")
  {
    $("#" + gardenObject.id).draggable({
      containment: "#grid",
      snap: true,
      stack: ".plot",
      start: function(){disableToolTip("." + classType);},
      stop: function(event, ui){
	  enableToolTip("." + classType);
	  gardenObject.left = ui.position.left;
	  gardenObject.top = ui.position.top; 
	  }
    });
  }
  else if(classType === "plant" || classType ==="plantJ")
  {
    $("#" + gardenObject.id).draggable({
      containment: "#grid",
      stack: "." + classType,
      start: function(){disableToolTip("." + classType);},
      stop: function(event, ui){
	  enableToolTip("." + classType);	  
	  //gardenObject.left = ui.position.left;
	  //gardenObject.top = ui.position.top;
	  }
    });
  }
  else{
    alert("Not allowed to drag")
  }
}//end draggable

//function makeResizable-----------------------------
function makeResizable( gardenObject )
{
    var classType = gardenObject.classType; 

    if(classType === "plot")
    {
        makePlotResizable(gardenObject);
    }
    else if(classType === "plant" || classType ==="plantJ")
    {	
        makePlantResizable(gardenObject);
    }
}//end makeResizable

function makePlotResizable( gardenObject )
{
    $("#" + gardenObject.id).resizable({
      minHeight: 60,
      minWidth: 60,
      resize: function( event, ui){
        var width = (ui.size.width/pixelsPerFoot).toFixed(2);
        var height = (ui.size.height/pixelsPerFoot).toFixed(2);
        gardenObject.width = ui.size.width;
        gardenObject.height = ui.size.height; 
        ui.element.children(".plotWidthLabel").text(width + " ft");
        ui.element.children(".plotHeightLabel").text(height + " ft");
      }
    });
}

function makePlantResizable( gardenObject ) {
    
    $("#" + gardenObject.id).resizable({
      minHeight: gardenObject.minHeight,
      minWidth: gardenObject.minWidth,
      grid: [gardenObject.minWidth, gardenObject.minHeight],
      resize: function( event, ui){   
        var width = (ui.size.width/pixelsPerFoot).toFixed(2);
        var height = (ui.size.height/pixelsPerFoot).toFixed(2);
        var lblRowSpacing = (gardenObject.minHeight/pixelsPerFoot).toFixed(2);
        var lblPlantSpacing = (gardenObject.minWidth/pixelsPerFoot).toFixed(2);

        gardenObject.width = ui.size.width; 
        gardenObject.height = ui.size.height; 

        if(width >= 12){
          ui.element.children(".plantWidthLabel").text(gardenObject.title + " " + width + "ft"
              +" (Plant " + lblPlantSpacing + "ft / "          
              +" Row " + lblRowSpacing + "ft)" );
        }
        else if(width >=5 ){
          ui.element.children(".plantWidthLabel").text(gardenObject.title + " " + width + "ft ");
        }
        else{
          ui.element.children(".plantWidthLabel").text(width + "ft ");   
        }

        if(height >=1)
        {
          ui.element.children(".plantHeightLabel").text(height + " ft");
        }
        else {
          ui.element.children(".plantHeightLabel").text("");
        }
      }
    });
}

//Make item droppable------------------------------
function makeDroppable( classType, gardenObject ){
  if(classType === "plot")
  {
    makePlotDroppable(gardenObject);
  }
  else if(classType === "#grid")
  {
    makeGridDroppable();
  }//end if
  else {
    alert("Cannot drop here.")
  }
}//end function make Droppable

//This function makes the plot element droppable
function makePlotDroppable(gardenObject) {
    // body...
    $("#" + gardenObject.id).droppable({
        tolerance: "touch",
        accept: ".plantJ, .plant",
        drop: function(event, ui){            
                $(this).prepend(ui.draggable);

                var left  = ui.offset.left - $(this).offset().left;
                var top   = ui.offset.top - $(this).offset().top;    

                $(ui.draggable).css({
                    "top": top,
                    "left": left
                });

                //Loops throught the json to find the object id and changes the parent for the plant....
                for(var i = 0; i < myPlants.length; i++)
                {             
                    if(myPlants[i]['id'] === ui.draggable.attr("id"))
                    {                        
                        myPlants[i]['parentId'] = gardenObject.id;
                        myPlants[i]['top'] = top;
                        myPlants[i]['left'] = left;
                    }
                }   //end for     
        }//Drop function
    });//End droppable
}//end the makePlotDroppable

//This function makes elements droppable on the grid
function makeGridDroppable() {
    // body...
    $("#grid").droppable({
      tolerance: "fit",
      drop: function(event, ui){
                $(this).prepend(ui.draggable);
                var left = ui.offset.left - $(this).offset().left;
                var top = ui.offset.top - $(this).offset().top; 

                $(ui.draggable).css({
                  "top": top,
                  "left": left
                });     

              //Loops throught the json to find the object id and changes the parentId for the plant....
                for(var i = 0; i < myPlants.length; i++)
                {             
                    if(myPlants[i]['id'] === ui.draggable.attr("id") && myPlants[i]['id'] !== undefined)
                    {                    
                        myPlants[i]['parentId'] = "grid";
                        myPlants[i]['top'] = top;
                        myPlants[i]['left'] = left;
                    }
                }   //end for
            }//end function
    });
}//End makeGridDroppable

//Add click function for object selections---------------------
function addClick( gardenObject) {
    if(gardenObject.classType === "plant" || gardenObject.classType === "plantJ")
    {
        $("#" + gardenObject.id).click(function(e){
            $(this).addClass("ui-selected");
            e.stopPropagation();
        });
    }
    else if(gardenObject.classType === "plot")
    {
        $("#" + gardenObject.id).click(function(){
            $(this).addClass("ui-selected");
            $(this).children().addClass("ui-selected");
        });
    }
    else 
    {
        alert("No click");
    }
}

//This is the function for the createToolTip
function createToolTip(gardenObject)
{
        var selector = gardenObject.classType

  $("#" + gardenObject.id).tooltip({
        content: function(event, ui){
          if(selector ==="plant" || selector ==="plantJ")
          {	
            return createPlantTooltipString(gardenObject);
          }
          else {
            return createPlotTooltipString($(this), gardenObject);
          }
        },
        disabled: false,
        track: false,
        close: function (event, ui) {
            ui.tooltip.hover(
            function () {
                $(this).stop(true).fadeTo(400, 1);
            },
            function () {
                $(this).fadeOut("400", function () {
                    $(this).remove();
                    })
            });
            $(".ui-helper-hidden-accessible").children(":not(:last)").remove();
        }
    });
}//end tooltip functions

//Create the plot tooltip string
function createPlotTooltipString(plot, gardenObject) {
    // body...
    var width = plot.width();
    var height = plot.height();
    height /=pixelsPerFoot; 
    width /=pixelsPerFoot;
    width = width.toFixed(2);
    height = height.toFixed(2);
    return "<b>" + gardenObject.title + "</b><br><b>Moisture: </b>"+gardenObject.moistureLevel+"<br><b>Width: </b>" 
           + width +  "ft<br><b>Length: </b>" + height 
           +"ft <br><button class=editButton>Edit</button>";
}


//creates the plant tool tip html
function createPlantTooltipString(gardenObject) {
    return "<b>" + gardenObject.title
                   +"<br>Planted: </b>"+ gardenObject.datePlanted
                   +"<br><b>Harvest in: </b>"+ gardenObject.daysToHarvest + " days"
                   +"<br><b>Harvest date: </b>" + gardenObject.harvestDate 
                   +"<br><b>Plant Spacing: </b>" + (gardenObject.minWidth/pixelsPerFoot).toFixed(2) 
                   +" ft<br><b>Row Spacing: </b>" + (gardenObject.minHeight/pixelsPerFoot).toFixed(2)
                   +" ft<br><b># of Plants: </b>" + ((gardenObject.height/gardenObject.minHeight) * (gardenObject.width/ gardenObject.minWidth))
                   +"<br><b>Rows: </b>" +  (gardenObject.height/ gardenObject.minHeight)
                   +"<br><b>Plants per row: </b>" +  (gardenObject.width/ gardenObject.minWidth)
                   +"<br><button class=editButton onclick=document.getElementById('id01').style.display='block';>Edit</button>";
}

//Function that disable the tooltip based on classType class or id
function disableToolTip(classType)
{
  $(classType).tooltip("option","disabled", true);
}

//Function that enable the tooltip based on classType class or id
function enableToolTip(classType)
{
  $(classType).tooltip("option", "disabled", false);
}

status="";
objects = [];

function preload(){
    img = loadImage("air_jordan.jpg");
}

function setup(){
    canvas = createCanvas(380, 380);
    canvas.center();
    objectDetecter = ml5.objectDetector("cocossd", modelloaded);
    document.getElementById("status").innerHTML = "Status : Detecting objects";
}

function draw(){
   image(img, 0, 0, 380, 380);
   if(status != ""){
    objectDetecter.detect(canvas, gotresults);
    for(i=0; i < objects.length; i++){
        document.getElementById("status").innerHTML = "Status : Objects Detected";
        document.getElementById("noofobjects").innerHTML = "Number of objects detected:" + objects.length;
        fill("red");
        percent = floor(objects[i].confidence * 100);
        text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
        noFill();
        stroke("red");
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
    }
   }
}

function modelloaded(){
    console.log("Model loaded!");
    status = true;
}

function gotresults(error, results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        objects = results;
    }
}

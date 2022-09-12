var confLocs=[];
var confTheta=[];
var slider;
var val=0;

function preload()
{
	myFont = loadFont('assets/OpenSans-Regular.ttf');
	
}

function setup()
{
    createCanvas(900, 800, WEBGL);
	angleMode(DEGREES);
	//Adding in a slider to customise and control the height of the box
	slider = createSlider(0,300,0);
	slider.position(410,150); 
	
	for(var i=0; i<200; i++)
	{
		var r_x = random(-500,500);
		var r_y = random(-800,0);
		var r_z = random(-500,500);
		var r_v = createVector(r_x,r_y,r_z);
		confLocs.push(r_v);
		var r_a = random(0,360);
		confTheta.push(r_a);
	}
}


function draw()
{
    background(125);
    fill(255,0,0);
    textSize(20);
    textFont(myFont);
    //positioning slider text
    console.log(slider.width);
    text('Height:' + val, -300, -350);
    val = slider.value();

    push();
    //Step 4:
    var xLoc = cos(frameCount*0.2)*1200;
    var zLoc = sin(frameCount*0.2)*1200;
    camera(xLoc,-600,zLoc,0,0,0,0,1,0);
    
    //Step 1:
    for(var x = -400;x<=400;x+=50)
    {
    	for(var z = -400;z<=400;z+=50)
    	{
    		push();
    		//step 3:
    		var distance = dist(0,0,x,z) + frameCount;
    		var length = map(sin(distance),-1,1,100,300);
    		translate(x,0,z);
    		//Adding in material for further development
    		specularMaterial(255);
    		//Adding in lights on the material and control using mouse
    		pointLight(170,20,mouseX-200,xLoc,mouseY-200,zLoc);
    		box(50,length+val,50);
    		pop();
    		
    	}
    }
	//Step 2:
    normalMaterial();
    confetti();
    stroke(0);
    pop();
}

// For confetti to fall from top to bottom
function confetti()
{
	for(var i=0;i<confLocs.length;i++)
	{
		push();
		//falling confetti at random locations and angles
		translate(confLocs[i].x,confLocs[i].y,confLocs[i].z);
		rotateX(confTheta[i]);
		plane(15,15);
		confLocs[i].y+=1;
		confTheta[i]+=10;
		// once confetti reaches bottom, it resets on top
		if(confLocs[i].y>0)
		{
			confLocs[i].y=-800;
		}
		pop();
	}
}

function larg()
{if(ie4)
{document.all.contentClip.style.height=196;
 document.all.contentClip.style.clip="rect(0 300 196 0)";}


else if(dom)
{document.getElementById("contentClip").style.height=196;
document.getElementById("contentClip").style.clip="rect(0 300 196 0)";}

else if(nn4)
{document.contentClip.height=196;
document.contentClip.clip.bottom=196;

}

}



// Made by geeeet@ghtml.com
// Keep these two lines and you're free to use this code

// Known bugs :
// If ie4.5 mac, please press apple-t to remove sidebar, otherwise everything is pushed 20px to the right...

// Corrected bugs :
// 25.01.2001 - When the height of the span "content" was less than the height of the span "contentClip" a javascript error occured, function changed : move()
// 21.02.2001 - Scrolling text wasn't selectable in ie, function changed : move()
// 05.03.2001 - Ie x and y coordinates was wrong when page was scrolled, function changed : getMouse()

// 19.04.2001 - Finally able to remove browser-scrollbar if content is longer than the browser is high:
// Just put this in the style-tag right before the end head-tag:
// body {margin-left:0; margin-right:0; margin-top:0; margin-bottom:0; width:100%;height:100%;overflow:hidden}

// Touch me here :-)
var upH = 6; // Height of up-arrow
var upW = 5; // Width of up-arrow
var downH = 6; // Height of down-arrow
var downW = 5; // Width of down-arrow
var dragH = 34; // Height of scrollbar
var dragW = 8; // Width of scrollbar
var scrollH = 136; // Height of scrollbar
var speed = 20; // Scroll speed

// And now... go to the bottom of the page...

// Browser detection
var dom = document.getElementById ? true:false;
var nn4 = document.layers ? true:false;
var ie4 = document.all ? true:false;

var mouseY; // Mouse Y position onclick
var mouseX; // Mouse X position onclick

var clickUp = false; // If click on up-arrow
var clickDown = false; // If click on down-arrow
var clickDrag = false; // If click on scrollbar
var clickAbove = false; // If click above scrollbar
var clickBelow = false; // If click below scrollbar

var timer = setTimeout("",500); // Repeat variable
var upL; // Up-arrow X
var upT; // Up-arrow Y
var downL; // Down-arrow X
var downT; // Down-arrow Y
var dragL; // Scrollbar X
var dragT; // Scrollbar Y
var rulerL; // Ruler X
var rulerT; // Ruler Y
var contentT; // Content layer Y;
var contentH; // Content height
var contentClipH; // Content clip height
var scrollLength; // Number of pixels scrollbar should move
var startY; // Keeps track of offset between mouse and span

// Mousedown
function down(e){
	if((document.layers && e.which!=1) || (document.all && event.button!=1)) return true; // Enables the right mousebutton
	getMouse(e);
	startY = (mouseY - dragT);
	
	// If click on up-arrow
	if(mouseX >= upL && (mouseX <= (upL + upW)) && mouseY >= upT && (mouseY <= (upT + upH))){
		clickUp = true;
		return scrollUp();
	}	
	// Else if click on down-arrow
	else if(mouseX >= downL && (mouseX <= (downL + downW)) && mouseY >= downT && (mouseY <= (downT + downH))){
		clickDown = true;
		return scrollDown();
	}
	// Else if click on scrollbar
	else if(mouseX >= dragL && (mouseX <= (dragL + dragW)) && mouseY >= dragT && (mouseY <= (dragT + dragH))){
		clickDrag = true;
		return false;
	}
	else if(mouseX >= dragL && (mouseX <= (dragL + dragW)) && mouseY >= rulerT && (mouseY <= (rulerT + scrollH))){
		// If click above drag
		if(mouseY < dragT){
			clickAbove = true;
			clickUp = true;
			return scrollUp();
		}
		// Else click below drag
		else{
			clickBelow = true;
			clickDown = true;
			return scrollDown();
		}
	}
	// If no scrolling is to take place
	else{
		return true;
	}
}

// Drag function
function move(e){
	if(clickDrag && contentH > contentClipH){
		getMouse(e);
		dragT = (mouseY - startY);
		
		if(dragT < (rulerT))
			dragT = rulerT;		
		if(dragT > (rulerT + scrollH - dragH))
			dragT = (rulerT + scrollH - dragH);
		
		contentT = ((dragT - rulerT)*(1/scrollLength));
		contentT = eval('-' + contentT);

		moveTo();
		
		// So ie-pc doesn't select gifs
		if(ie4)
			return false;
	}
}

function up(){
	clearTimeout(timer);
	// Resetting variables
	clickUp = false;
	clickDown = false;
	clickDrag = false;
	clickAbove = false;
	clickBelow = false;
	return true;
}

// Reads content layer top
function getT(){
	if(ie4)
		contentT = document.all.content.style.pixelTop;
	else if(nn4)
		contentT = document.contentClip.document.content.top;
	else if(dom)
		contentT = parseInt(document.getElementById("content").style.top);
}

// Reads mouse X and Y coordinates
function getMouse(e){
	if(ie4){
		mouseY = event.clientY + document.body.scrollTop;
		mouseX = event.clientX + document.body.scrollLeft;
	}
	else if(nn4 || dom){
		mouseY = e.pageY;
		mouseX = e.pageX;
	}
}

// Moves the layer
function moveTo(){
	if(ie4){
		document.all.content.style.top = contentT;
		document.all.ruler.style.top = dragT;
		document.all.drag.style.top = dragT;
	}
	else if(nn4){
		document.contentClip.document.content.top = contentT;
		document.ruler.top = dragT;
		document.drag.top = dragT;
	}
	else if(dom){
		document.getElementById("content").style.top = contentT + "px";
		document.getElementById("drag").style.top = dragT + "px";
		document.getElementById("ruler").style.top = dragT + "px";
	}
}

// Scrolls up
function scrollUp(){
	getT();
	
	if(clickAbove){
		if(dragT <= (mouseY-(dragH/2)))
			return up();
	}
	
	if(clickUp){
		if(contentT < 0){		
			dragT = dragT - (speed*scrollLength);
			
			if(dragT < (rulerT))
				dragT = rulerT;
				
			contentT = contentT + speed;
			if(contentT > 0)
				contentT = 0;
			
			moveTo();
			timer = setTimeout("scrollUp()",25);
		}
	}
	return false;
}

// Scrolls down
function scrollDown(){
	getT();
	
	if(clickBelow){
		if(dragT >= (mouseY-(dragH/2)))
			return up();
	}

	if(clickDown){
		if(contentT > -(contentH - contentClipH)){			
			dragT = dragT + (speed*scrollLength);
			if(dragT > (rulerT + scrollH - dragH))
				dragT = (rulerT + scrollH - dragH);
			
			contentT = contentT - speed;
			if(contentT < -(contentH - contentClipH))
				contentT = -(contentH - contentClipH);
			
			moveTo();
			timer = setTimeout("scrollDown()",25);
		}
	}
	return false;
}

// reloads page to position the layers again
function reloadPage(){
	location.reload();
}

// Preload
function eventLoader(){
MM_showHideLayers('up','','show','down','','show','drag','','show','ruler','','show','contentClip','','show');
	if(ie4){
	if(parseInt(document.all.content.offsetHeight)<=parseInt(document.all.contentClip.style.height))
	{document.all.ruler.style.visibility="hidden";
	document.all.drag.style.visibility="hidden";
	document.all.up.style.visibility="hidden";
	document.all.down.style.visibility="hidden";
	};
		// Up-arrow X and Y variables
		upL = document.all.up.style.pixelLeft;
		upT = document.all.up.style.pixelTop;		
		// Down-arrow X and Y variables
		downL = document.all.down.style.pixelLeft;
		downT = document.all.down.style.pixelTop;
		// Scrollbar X and Y variables
		dragL = document.all.drag.style.pixelLeft;
		dragT = document.all.drag.style.pixelTop;		
		// Ruler Y variable
		rulerT = document.all.ruler.style.pixelTop;		
		// Height of content layer and clip layer
		contentH = parseInt(document.all.content.scrollHeight);
		contentClipH = parseInt(document.all.contentClip.style.height);
	}
	else if(nn4){
	if(parseInt(document.contentClip.document.content.clip.bottom)<=parseInt(document.contentClip.clip.bottom))
	{document.ruler.visibility="hide";
	document.drag.visibility="hide";
	document.up.visibility="hide";
	document.down.visibility="hide";
};
		// Up-arrow X and Y variables
		upL = document.up.left;
		upT = document.up.top;		
		// Down-arrow X and Y variables
		downL = document.down.left;
		downT = document.down.top;		
		// Scrollbar X and Y variables
		dragL = document.drag.left;
		dragT = document.drag.top;		
		// Ruler Y variable
		rulerT = document.ruler.top;
		// Height of content layer and clip layer
		contentH = document.contentClip.document.content.clip.bottom;
		contentClipH = document.contentClip.clip.bottom;
	}
	else if(dom){
	if(parseInt(document.getElementById("content").offsetHeight)<=parseInt(document.getElementById("contentClip").style.height))
	{document.getElementById("ruler").style.visibility="hidden";
	document.getElementById("drag").style.visibility="hidden";
	document.getElementById("up").style.visibility="hidden";
	document.getElementById("down").style.visibility="hidden";
};
		// Up-arrow X and Y variables
		upL = parseInt(document.getElementById("up").style.left);
		upT = parseInt(document.getElementById("up").style.top);
		// Down-arrow X and Y variables
		downL = parseInt(document.getElementById("down").style.left);
		downT = parseInt(document.getElementById("down").style.top);
		// Scrollbar X and Y variables
		dragL = parseInt(document.getElementById("drag").style.left);
		dragT = parseInt(document.getElementById("drag").style.top);
		// Ruler Y variable
		rulerT = parseInt(document.getElementById("ruler").style.top);
		// Height of content layer and clip layer
		contentH = parseInt(document.getElementById("content").offsetHeight);
		contentClipH = parseInt(document.getElementById("contentClip").offsetHeight);
		document.getElementById("content").style.top = 0 + "px";
		
	}
	// Number of pixels scrollbar should move
	scrollLength = ((scrollH-dragH)/(contentH-contentClipH));
	// Initializes event capturing
	if(nn4){
		document.captureEvents(Event.MOUSEDOWN | Event.MOUSEMOVE | Event.MOUSEUP);
		window.onresize = reloadPage;
	}
	document.onmousedown = down;
	document.onmousemove = move;
	document.onmouseup = up;
}



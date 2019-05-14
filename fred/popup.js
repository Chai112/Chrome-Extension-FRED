// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';


let b_scan = document.getElementById('scan');

let b_left = document.getElementById('move_left');
let b_right = document.getElementById('move_right');

let nameOut = document.getElementById('n');
let t1 = document.getElementById('t1');

var originalImage = "images/fred48.png";
var frame = new Array();
var canvasIndex = -1;

var canvas = document.getElementById("c");
var b = false;

var m = new Array(1);
  m[0] = new Array(1);
  m[0][0] = "aa";
  chrome.runtime.sendMessage({message: m}, (response) => {
  });

b_scan.onclick = function(element) {

	 b_scan.style.visibility = "hidden";

	nameOut.innerHTML = "scanning...";
	t1.innerHTML = "Please, DO NOT CLOSE until this line disappears.";

  chrome.tabs.captureVisibleTab(null, {}, function (i) {

    originalImage = i;

    if (b === true)
    {
      canvas = document.getElementById("c1")
    }
    //var image1 = document.createElement("image1");
    //image1.src = i;
    var image = new Image();
    image.src = originalImage;

    image.onload = function() {
        /*ctx.drawImage(image, 0, 0);

        var xM = canvas.width;
        var yM = canvas.height;
        var colorH = new Array(xM);

        var imgData = ctx.getImageData(0, 0, 1, 1);

        var red = 0;
        var green = 0;
        var blue = 0;

        for (var x = 0; x < 1440; x += 2)
        {
          colorH[x] = new Array(700);
          for (var y = 0; y < 700; y += 2)
          {
            imgData = ctx.getImageData(x, y, 1, 1);

            red = imgData.data[0];
            green = imgData.data[1];
            blue = imgData.data[2];

            //colorH[x][y] = toHex(red) + toHex(green) + toHex(blue);
            //colorH[x][y] = {r:red, g:green, b:blue};
            colorH[x][y] = (red + green + blue) / 3;

            if (colorH[x][y] == 0 || colorH[x][y] >= 250)
            {
              colorH[x][y] = 0;
            }
          }
        }

        canvas = document.getElementById("c")

        t1.innerHTML = "You may close the popup now";

        colorH[0][0] = 'a';*/

        canvas = document.getElementById("c")
        t1.innerHTML = "You may close the popup now";

        chrome.browserAction.setIcon({path: 'images/fred_load48.png'});
        chrome.runtime.sendMessage({message: i}, (response) => {
        });
      };

    });

  /*chrome.tabs.query({active: true, currentWindow: true}, function (arrayOfTabs) {
    	chrome.tabs.reload(arrayOfTabs[0].id);
		});*/

};

b_left.onclick = function(element)
{
  if (canvasIndex > 0)
  {
    canvasIndex--;
  }
  if (frame.length > 0)
  	dispImage(canvasIndex);
  	nameOut.innerHTML = "face no. " + (canvasIndex + 1);
  	t1.innerHTML = frame[canvasIndex].emotion.happy;
};

b_right.onclick = function(element)
{
	 move_right.innerHTML = "R";	
  if (canvasIndex < frame.length - 1)
  {
    canvasIndex++;
  }
  if (frame.length > 0)
  {
  	dispImage(canvasIndex);
  	nameOut.innerHTML = "face no. " + (canvasIndex + 1);
  	t1.innerHTML = frame[canvasIndex].emotion.happy;
  }
};

chrome.runtime.onMessage.addListener(
  (request, sender, sendResponse) => {
    b = true;

    //it is either loading time or message.
    if (request.message[0][0] === "a")
    {
    	switch(request.message[0][1])
    	{
    		case "1":
    			t1.innerHTML = "contrasting"
    			break;
    		default:
    			t1.innerHTML = "";
    			break;
    	}
    }
    else
    {
    	//Debug
      /*frame = request.message;
      nameOut.innerHTML = "viola! I found " + frame.length + " faces.";
      move_right.innerHTML = "Click";*/

      chrome.browserAction.setIcon({path: 'images/fred48.png'});
      b_left.style.display = "inline";
      b_right.style.display = "inline";
      b_scan.innerHTML = "Rescan current window";

      //Debug
      colorDataToCanvas(request.message);
    }
});

//Debug
function colorDataToCanvas(i)
{
	alert(i);
	var image = new Image();
	image.src = originalImage;

	canvas.width = 1440;
	canvas.height = 700;
	canvas.style.display = "inline";

	// Copy the image contents to the canvas
	var ctx = canvas.getContext("2d");

	image.onload = function() {
	    ctx.drawImage(image, 0, 0);

	    var xM = canvas.width;
	    var yM = canvas.height;
	    for (var x = 2; x < xM - 2; x += 2)
	    {
	      for (var y = 2; y < yM - 2; y += 2)
	      {
	      	ctx.fillStyle = "#" + toHex(i[x][y].r) + toHex(i[x][y].g) + toHex(i[x][y].b);
	      	ctx.fillRect(x, y, 2, 2)
	      }
	    }
	};
}

function dispImage(index)
{
  var image = new Image();
  image.src = originalImage;

  // Copy the image contents to the canvas
  var ctx = canvas.getContext("2d");

  image.onload = function() {
    ctx.drawImage(image, -frame[index].x, -frame[index].y);
    var imgData = ctx.getImageData(0, 0, frame[index].w, frame[index].h);
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, 200, 200);
    ctx.putImageData(imgData, ((200 - frame[index].w) / 2), ((200 - frame[index].h) / 2));
  };
}

// not sure if this works
window.onRemoved = function(){
	alert(0);
	b_scan.parentNode.removeChild(b_scan);
	b_left.parentNode.removeChild(b_left);
	b_right.parentNode.removeChild(b_right);
};

function toHex (i)
{
  var o = Math.round(i).toString(16);
  while (o.length < 2) {o = '0' + o;}
  return o;
}

// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

const DESKTOP_MEDIA = ['tab', 'audio'];
var pending_request_id = null;



let changeColor = document.getElementById('changeColor');
let nameIn = document.getElementById('n2');
let nameOut = document.getElementById('n');
let image = document.getElementById('i');

nameOut.innerHTML = "";
chrome.storage.sync.get('name', function(data) {
	nameOut.innerHTML = data.name;
});

changeColor.onclick = function(element) {
	//set
	chrome.storage.sync.set({name: nameIn.value}, function () {
		console.log('The name is good');
	});
	//get
	chrome.storage.sync.get('name', function(data) {
		nameOut.innerHTML = data.name;
	});
  /*chrome.management.launchApp("pbnaomcgbfiofkfobmlhmdobjchjkphi", function(){
    if(chrome.runtime.lastError) console.error(chrome.runtime.lastError);
    else console.log("App launched");

    //pending_request_id = chrome.desktopCapture.chooseDesktopMedia(
    //  DESKTOP_MEDIA, onAccessApproved);

  });*/

  chrome.tabs.captureVisibleTab(null, {}, function (i) {
    //var image1 = document.createElement("image1");
    //image1.src = i;
    image.src = i;

    // Create an empty canvas element
    var canvas = document.getElementById("c");

    // Copy the image contents to the canvas
    var ctx = canvas.getContext("2d");

    image.onload = function() {
        ctx.drawImage(image, 0, 0);

        var imgData = ctx.getImageData(0, 0, 50, 70);
        ctx.putImageData(imgData, 10, 10);

        var red = imgData.data[0];
        var green = imgData.data[1];
        var blue = imgData.data[2];
        var alpha = imgData.data[3];

        //alert(blue.toString(16));
        ctx.fillStyle = "#" + red.toString(16) + "" + (green - 20).toString(16) + "" + blue.toString(16);
        ctx.fillRect(0, 0, 50, 50);
    };

    //image.src = url;

    //image.src = url;
    //ctx.drawImage(i, 0, 0);

    /*var imgData = ctx.getImageData(2, 2, 70, 70);
    var red = imgData.data[0];
    var green = imgData.data[1];
    var blue = imgData.data[2];
    var alpha = imgData.data[3];

    ctx.putImageData(imgData, 10, 70);



    var dataURL = canvas.toDataURL();

    var x = document.createElement("CANVAS");
    x.src = dataURL;*/

    //nameOut.innerHTML = blue;


   // You can add that image HTML5 canvas, or Element.
});

};

// Launch webkitGetUserMedia() based on selected media id.
function onAccessApproved(id, options) {
  if (!id) {
    console.log('Access rejected.');
    return;
  }
}

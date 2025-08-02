"use strict";
// Author: Emily Kong

function saveRobotState() {
  // saves the image of the robot
  laser.backgroundImage = context.getImageData(0, 0, canvas.width, canvas.height);
}

function restoreRobotState() {
  // restores the last saved robot state
  if (laser.backgroundImage) {
    context.putImageData(laser.backgroundImage, 0, 0);
  }
}

function drawHead() {
  context.fillStyle = "rgb(185, 185, 185)";
  context.beginPath();
    context.rect(108,5,80,37); // rect(xpos,ypos,width,height)
  context.fill();
}

function drawBody() {
  context.fillStyle = "rgb(152, 152, 152)";
  context.beginPath();
    context.rect(118,42,60,60);
  context.fill();
}
function drawRightArm() {
  context.fillStyle = "rgb(190, 190, 190)";
  context.beginPath();
    //right arm
    context.rect(178,45,16,30);
  context.fill();

  context.fillStyle = "rgb(123, 123, 123)";
  // right joint
  context.beginPath();
    context.arc(186,83,8,0,2*Math.PI,true);
  context.fill();
}

function drawLeftArm() {
  context.fillStyle = "rgb(190, 190, 190)";
  context.lineWidth = "1.8";
  context.beginPath();
    //left arm
    context.rect(102,45,16,30);
  context.fill();

  context.fillStyle = "rgb(123, 123, 123)";
  //left joint
  context.beginPath();
    context.arc(110,83,8,0,2*Math.PI,true);
  context.fill();
}

function drawRightLowerArm() {
  context.fillStyle = "rgb(190, 190, 190)";
  context.beginPath();
    //right arm
    context.rect(178,91,16,30);
  context.fill();
}

function drawLeftLowerArm() {
  context.fillStyle = "rgb(190, 190, 190)";
  context.beginPath();
    //left arm
    context.rect(102,91,16,30);
  context.fill();
}

function drawLegs() {
  context.fillStyle = "rgb(193, 193, 193)";
  context.beginPath();
    //left leg
    context.rect(120,102,20,42);
    //right leg 
    context.rect(156,102,20,42);
  context.fill();
}

function stateOff() {
  // clear facial expressions
  context.clearRect(110,6,70,32);
  //clear body
  context.clearRect(121,45,54,54);
  drawBody();
  drawHead();
  
  context.strokeStyle = "rgb(0, 0, 0)";
  context.lineWidth = "1.8";

  context.beginPath();
    //left eye
    context.moveTo(120,18);
    context.lineTo(134,18); 

    //right eye
    context.moveTo(162,18);
    context.lineTo(176,18); 
  context.stroke();

  //mouth 
  context.beginPath();
    context.moveTo(136,30);
    context.lineTo(160,30); 
  context.stroke();

  offlineStatus();

  
}

function stateOn() {
  // clear facial expressions
  context.clearRect(110,6,70,32);
  //clear body
  context.clearRect(121,45,54,54);
  drawBody();
  drawHead();
  //remove wire 
  restoreRobotState();
  
  context.strokeStyle = "rgb(0, 0, 0)";
  context.lineWidth = "1.8";
  context.fillStyle = "rgb(255, 255, 255)";

  //left eye
  context.beginPath();
    context.arc(127,18,7,0,Math.PI*2,true);
  context.stroke();
  //inner eye left
  context.beginPath();
    context.arc(127,18,6,0,Math.PI*2,true);
  context.fill();
  context.beginPath();
    context.arc(127,19,1,0,Math.PI*2,true);
  context.stroke();

  //right eye
  context.beginPath();
    context.arc(169,18,7,0,Math.PI*2,true);
  context.stroke();

  //inner right eye
  context.beginPath();
    context.arc(169,18,6,0,Math.PI*2,true);
  context.fill();
  context.beginPath();
    context.arc(169,19,1,0,Math.PI*2,true);
  context.stroke();

  //mouth 
  context.beginPath();
    context.moveTo(140,30);
    context.lineTo(156,30); 
  context.stroke();

  onlineStatus();

  if (action <=3) {
    laserOn = true;
  }
}

function onlineStatus() {
  //online button 
  context.fillStyle = "rgb(0, 255, 0)";
  context.beginPath();
    context.arc(148,60,5,0,Math.PI*2,true);
  context.fill();

  isRobotOn = true;
  batteryStatus();
  drawBatteryBorder();
  
}
function chargingExpression() {
  drawBody();
  drawHead();

  context.strokeStyle = "rgb(0, 0, 0)";
  context.lineWidth = "1.8";

  context.beginPath();
    //left eye
    context.moveTo(120,18);
    context.lineTo(134,18); 
    //eye bags
    context.moveTo(130,22);
    context.lineTo(134,22); 

    //right eye
    context.moveTo(162,18);
    context.lineTo(176,18); 
    //eye bags
    context.moveTo(162,22);
    context.lineTo(166,22); 
  context.stroke();

  //mouth 
  context.beginPath();
    context.moveTo(130,30);
    context.lineTo(166,30); 
  context.stroke();

}

function chargingStatus() {

  // clear facial expressions
  context.clearRect(110,6,70,32);
  //clear body
  context.clearRect(121,45,54,54);
  drawBody();
  drawHead();
  saveRobotState();

  chargingExpression();

  //charging button
  context.fillStyle = "rgb(48, 173, 251)";
  context.beginPath();
    context.arc(148,60,5,0,Math.PI*2,true);
  context.fill();

  //gradient for charging
  let chargingBox = context.createLinearGradient(0, 0, 200, 0);
  chargingBox.addColorStop(0, "rgb(37, 139, 255)");
  chargingBox.addColorStop(1, "white");

  context.fillStyle = chargingBox;
  context.fillRect(124, 88, 48, 10);
  drawBatteryBorder();

  // charging cable 
  context.beginPath();
    context.moveTo(150, 102);
    context.bezierCurveTo(150, 150, 180, 120, 310, 180);
  context.stroke();
}

function offlineStatus(){
  //offline button
  context.fillStyle = "rgb(255, 0, 0)";
  context.beginPath();
    context.arc(148,60,5,0,Math.PI*2,true);
  context.fill();

  isRobotOn = false; 
  batteryStatus();
  drawBatteryBorder();
  
}

function drawBatteryBorder() {
  context.strokeStyle = "rgb(0, 0, 0)"; 
  context.beginPath();
    context.rect(123,88,50,10);
  context.stroke();
}

function batteryStatus(){

  context.clearRect(123,88,16,10);

  //default state
  if (isRobotOn == true && action ==0) {
    context.clearRect(123, 88, 16, 10);

    context.fillStyle = "rgb(13, 133, 11)";  
    context.fillRect(123, 88, 16, 10); 
    
    context.fillStyle = "rgb(43, 180, 41)"; 
    context.fillRect(139, 88, 16, 10); 

    context.fillStyle = "rgb(169, 227, 168)";
    context.fillRect(155, 88, 17, 10);
  }
  //after action 1
  else if (isRobotOn == true && action >=1) {
    context.clearRect(123, 88, 16, 10);
    
    context.fillStyle = "rgb(220, 220, 220)";  
    context.fillRect(123, 88, 16, 10); 
    
    context.fillStyle = "rgb(43, 180, 41)"; 
    context.fillRect(139, 88, 16, 10); 

    context.fillStyle = "rgb(169, 227, 168)";
    context.fillRect(155, 88, 17, 10);
    drawBatteryBorder();
    // after action 2
    if (isRobotOn == true && action >=2) {
      context.clearRect(123, 88, 16, 10);
      
      context.fillStyle = "rgb(220, 220, 220)";  
      context.fillRect(123, 88, 16, 10); 
      
      context.fillStyle = "rgb(186, 186, 186)"; 
      context.fillRect(139, 88, 16, 10); 

      context.fillStyle = "rgb(169, 227, 168)";
      context.fillRect(155, 88, 17, 10);
      drawBatteryBorder();
      // after action 3
      if (isRobotOn == true && action >= 3) {
        context.clearRect(123, 88, 16, 10);
        
        context.fillStyle = "rgb(220, 220, 220)";  
        context.fillRect(123, 88, 16, 10); 
        
        context.fillStyle = "rgb(186, 186, 186)"; 
        context.fillRect(139, 88, 16, 10); 

        context.fillStyle = "rgb(107, 107, 107)";
        context.fillRect(155, 88, 17, 10);
        drawBatteryBorder();

        //wait for animation to finish and then turns off
        if (laserOn == true) {
          setTimeout(() => {
            stateOff();
          }, 1000);
        }
      }
    }
  }
  else if (isRobotOn == false) {
    context.clearRect(123,88,16,10);
    context.fillStyle = "rgb(182, 3, 3)";
    context.fillRect(124, 88, 48, 10);
  }
}

function chargeRobot() {
  restoreRobotState();
  //clear body
  stateOff();
  action = 0; 
  context.clearRect(121,45,54,54);

  chargingStatus("charging");
}

function batteryDecrease() { 
  console.log("Action count:", action);

  if (!isArrowClicked) {
    //updates battery
    context.clearRect(123,88,16,10);
    batteryStatus();
    if (action >= 1) {
      drawBatteryBorder();
    }
    
  }
}


/* Action 1 
Click on the canvas to make the robot 
fire lasers from its eyes at the clicked position */
let laser = {
  timePeriod: 500, // 0.5 seconds
  elapsedTime: 0, 
  leftPos: {x:127, y:19}, // left eye
  rightPos: {x:169, y:19}, // right eye
  currentPos: {x:127, y:19}, 
  target: null, 
  isAnimating: false
};

function getMouseXY(e) {
  let offsetX = boundingRect.left;
  let offsetY = boundingRect.top;

  let w = (canvas.width / boundingRect.width);
  let h = (canvas.height / boundingRect.height);

  let mx = (e.clientX - offsetX)*w;
  let my = (e.clientY - offsetY)*h;
  return {x:mx, y:my};
}

function animateLaser() {
  if (!laser.isAnimating) {
    return;
  }

  let date = new Date();
  let now = date.getTime();
  laser.elapsedTime = now - laser.startTime;
  
  let t = laser.elapsedTime / laser.timePeriod;
  if (t > 1) t = 1;
  
  //adjust x,y trajectory based on current mouse position
  laser.currentLeft = {
    x: laser.leftPos.x + t * (laser.target.x - laser.leftPos.x),
    y: laser.leftPos.y + t * (laser.target.y - laser.leftPos.y),
  };
  laser.currentRight = {
    x: laser.rightPos.x + t * (laser.target.x - laser.rightPos.x),
    y: laser.rightPos.y + t * (laser.target.y - laser.rightPos.y),
  };
  
  restoreRobotState();
  
  //laser from left eye
  context.strokeStyle = "rgb(255,0,0)";
  context.beginPath();
  context.moveTo(laser.leftPos.x, laser.leftPos.y);
  context.lineTo(laser.currentLeft.x, laser.currentLeft.y);
  context.stroke();
  // laser from right eye
  context.beginPath();
  context.moveTo(laser.rightPos.x, laser.rightPos.y);
  context.lineTo(laser.currentRight.x, laser.currentRight.y);
  context.stroke();
  // laser disappears 
  if (t >= 1) {
    laser.isAnimating = false;
    restoreRobotState();
    return;
  }
  requestAnimationFrame(animateLaser);
}


function drawLaser(e) {
  if (!laserOn || !isRobotOn) { 
    console.log("Laser is off");
    return;
  }
  console.log("Laser shot");
  
  batteryStatus();
  //make mouse click position the target for laser
  let mousePos = getMouseXY(e);
  laser.target = mousePos;

  laser.elapsedTime = 0;
  laser.startTime = Date.now();
  laser.isAnimating = true;

  saveRobotState();
  animateLaser();
}

function disableLaser() {
  stateOff();
  toggleLaser(false);
}

function activateLaser() {
  toggleLaser(true);
  console.log("Laser activated.");
}

/* Action 2
Click on an indicated side of the canvas to make 
the robot move to that position*/

function rightArrow(img,context) { 
  context.drawImage(img,250,60,35,25);
}

function leftArrow(img,context) {
  context.drawImage(img,15,60,35,25);
}

function drawArrows(context) {  
  //loads the left and right arrows 
  let img1 = new Image();
  let img2 = new Image();
  img1.src = "./js/rightArrow.png";
  img2.src = "./js/leftArrow.png";
  img1.onload = img2.onload = function() {
    rightArrow(img1,context);
    leftArrow(img2,context);
  }
}

function arrowClicked(event,context) {
  //scale canvas position based on window size
  let scaleX = canvas.width/boundingRect.width;
  let scaleY = canvas.height/boundingRect.height;
  //let mouse respond to window size
  let mouseX = (event.clientX-boundingRect.left)*scaleX;
  let mouseY = (event.clientY-boundingRect.top)*scaleY;

  //check if mouse clicks arrow area
  //right arrow
  if (mouseX >= 250 && mouseX <= 285 && mouseY >= 60 && mouseY <= 85 && isRobotOn == true) {
    if (action <3) {
      console.log("Walking Right");
      action++;
      laserOn = false;
      isArrowClicked = true;
      isRobotRight = true;
      stateOff();
      rightSideView(context);
    }
  }
  //left arrow 
  if (mouseX >= 15 && mouseX <= 50 && mouseY >= 60 && mouseY <= 85 && isRobotOn == true) {
    if (action <3) {
      console.log("Walking Left");
      action++;
      laserOn = false;
      isArrowClicked = true;
      isRobotRight = false;
      stateOff();
      leftSideView(context);
    }
  }
}

function sideHead() {
  context.fillStyle = "rgb(185, 185, 185)";
  context.beginPath();
    context.rect(128,5,40,37); //rect(xpos,ypos,width,height)
  context.fill();
}

function sideBody() {
  context.fillStyle = "rgb(152, 152, 152)";
  context.beginPath();
    context.rect(118,42,60,60); //rect(xpos,ypos,width,height)
  context.fill();
}

function sideLeg() { 
  //right leg 
  context.fillStyle = "rgb(193, 193, 193)";
  context.beginPath();
    context.rect(138,102,20,42);
  context.fill();
}

function turnLeftLeg() {
  sideLeg();

  setTimeout(() => {
    if (isRobotRight) {
      context.translate(128,104);
        context.rotate((45*Math.PI)/180); //turns rad to degrees
      context.translate(-165,-118);
    }
    else {
      //adjust left leg
      context.translate(128,104);
      context.rotate((45*Math.PI)/180); //turns rad to degrees
      context.translate(-165,-118);
    }
    
    //redraw
    sideLeg();
    context.restore();
    sideLeg();

    context.fillStyle = "rgb(193, 193, 193)";
    context.fillRect(139,105,18,38);
  }, 1000);
}

function sideArm() {
  //arms 
  context.fillStyle = "rgb(190, 190, 190)";
  context.beginPath();
    //right upper arm side view
    context.rect(140,45,16,30);
  context.fill();

  context.fillStyle = "rgb(123, 123, 123)";
  context.beginPath();
    //arm joint
    context.arc(148,83,8,0,2*Math.PI,false);
  context.fill();
  
}

function sideLowerArm() {
  context.fillStyle = "rgb(190, 190, 190)";
  context.beginPath();
    //lowerarm
    context.rect(140,92,16,30);
  context.fill();
  context.fillRect(141,93,14,28);
}

function turnRightArm() {
  sideArm();
  sideLowerArm();
  
  setTimeout(() => {
    //clear initial arm position
    context.clearRect(121,43,54,58);
    sideBody();
    //position upper arm
    context.translate(150,74);
    context.rotate((-30*Math.PI)/180); //turns rad to degrees
    context.translate(-150,-74);
    sideArm();

    //position lower arm
    context.translate(148,83);
    context.rotate((-45*Math.PI)/180);
    context.translate(-148,-83);
    sideLowerArm();
    
    context.restore();
  }, 1000); //1s
}


function rightSideView(context) {
  context.clearRect(90,4,120,150);
  context.lineWidth = "1.8";
  
  sideHead();
  sideBody();
  sideLeg();
  sideArm();
  turnRightArm();
  turnLeftLeg();

  setTimeout(() => {
    startWalking("right");
  }, 2000); //2s
}

function leftSideView(context) {
  context.save();
  
  context.clearRect(90,4,120,150);
  // flips everything from right side code
  context.scale(-1, 1); //(1 - no vertical scaling)
  context.translate(-296, 0); 
  
  sideHead();
  sideBody();
  sideLeg();
  sideArm();
  turnRightArm();
  turnLeftLeg();
  
  setTimeout(() => {
    startWalking("left");
  }, 2000); //2s
}

function startWalking(direction) {
  let currentX = 128; // start position
  //target positions to walk to
  const targetRight = 210;
  const targetLeft = 46;
  //let returnWalk = false;
  
  if (direction === "right") {
    context.translate(128,104);
    context.rotate((30*Math.PI)/180);
    context.translate(-128,-114);
  }

  if (direction === "rightToLeft") {
    context.scale(-1, 1);
    context.rotate(0);
    context.translate(-400, 2);
  }

  if (direction === "leftToRight") {
    context.translate(108,100);
    context.rotate(0);
    context.translate(-210, -98);
  }

  if (direction === "left") {
    context.scale(-1, 1);
    context.rotate((45*Math.PI)/180);
    context.translate(-210, 98);
  }

  const moveInterval = setInterval(() => {
    //clear canvas
    context.clearRect(0,0,canvas.width,canvas.height);
    
    if (isRobotOn) {
      drawBatteryBorder();
    }

    if (direction === "right" || direction === "leftToRight") {
      currentX += 2; // move by 2 pixels
    }
    else {
      //left
      currentX -= 2;
    }

    const moveAmount = currentX - 128; // distance moved
    
    //save the walking state
    context.save();

    if (direction === "right" || direction === "leftToRight") {
      context.translate(moveAmount, 0);
    } 
    else {
      //left
      context.translate(-moveAmount, 0);
    }
  
    sideHead();
    sideBody();
    sideLeg();
    
    // keep walking pose
    drawArmAndLeg(true);
    context.restore();

    let reachedEnd = 0;
    if (direction === "right" || direction === "leftToRight") {
      reachedEnd = currentX >= targetRight;
    }
    else {
      reachedEnd = currentX <= targetLeft;
    }

    if (reachedEnd /*&& !returnWalk*/) {
      clearInterval(moveInterval);
      //returnWalk = true;

      if (direction === "right") {
        setTimeout(() => {
          //resets 
          context.setTransform(1,0,0,1,0,0); 
          context.clearRect(0,0,canvas.width,canvas.height);
          //offset from animation
          currentX = 128;
          startWalking("rightToLeft");
        },1000);
      } 
      else if (direction === "left") {
        setTimeout(() => {
          //resets 
          context.setTransform(1,0,0,1,0,0); 
          context.clearRect(0,0,canvas.width,canvas.height);
          //offset from animation
          currentX = 128;
          startWalking("leftToRight");
        },1000);
      }
      else {
        setTimeout(() => {
          //resets 
          context.setTransform(1,0,0,1,0,0); 
          context.clearRect(0,0,canvas.width,canvas.height);
          //offset from animation
          currentX = 128;

          start(); // return to face front in centre
          stateOn();

          //redraw arrow 
          drawArrows(context);
          if (isRobotOn) {
            drawBatteryBorder();
            batteryStatus();
          }
        }, 1000);
      }
    }
  }, 50);
}

function drawArmAndLeg(isRotated) {
  if (!isRotated) {
    sideLeg();
    sideArm();
    sideLowerArm();
  } 
  else {
    context.save();
    
    context.translate(150,74);
    context.rotate((-30*Math.PI)/180);
    context.translate(-150,-74);
    sideArm();
    
    context.translate(148,83);
    context.rotate((-45*Math.PI)/180);
    context.translate(-148,-83);
    sideLowerArm();
    
    context.translate(128,104);
    context.rotate((45*Math.PI)/180);
    context.translate(-165,-118);
    sideLeg();
    
    context.restore();
    
    context.fillStyle = "rgb(193, 193, 193)";
    context.fillRect(139,105,18,38);
  }
}

/* Action 3
Click on an arm to make it spin for a few seconds (<5 seconds). 
*/
function armClicked(event,context) {

  let armScaleX = canvas.width/boundingRect.width;
  let armScaleY = canvas.height/boundingRect.height;
  
  let armMouseX = (event.clientX-boundingRect.left)*armScaleX;
  let armMouseY = (event.clientY-boundingRect.top)*armScaleY;

  //right arm
  if (armMouseX >=180 && armMouseX <=196 && armMouseY >= 45 && armMouseY <= 122 && isRobotOn == true) {
    if (action<3) {
      console.log("Spinning Right Arm");
      laserOn = false;
      isArmClicked = true;
      rightArmClicked(context);
    }
  }
  //left arm
  if (armMouseX >=100 && armMouseX <=116 && armMouseY >= 45 && armMouseY <= 122 && isRobotOn == true) {
    if (action<3) {
      console.log("Spinning Left Arm");
      laserOn = false;
      isArmClicked = true;
      leftArmClicked(context);
    }
  }
}

function rightArmClicked(context) {
  spinRightArm(context);
}

function leftArmClicked(context) {
  spinLeftArm(context);
}

function spinRightArm() {
  isRightArmSpinning = true;
  animateRightArm();
}

function animateRightArm() {
  if (!isRightArmSpinning) {
    return;
  }
  context.clearRect(178,44,20,79);

  context.save();

  context.translate(178, 46); //pivot pos
  context.rotate(angle);
  context.translate(-178, -46);
  
  drawRightArm();
  drawRightLowerArm();
  
  context.restore();
  
  //increases angle by 0.3 rad
  angle += 0.3;

  setTimeout(() => { 
    isRightArmSpinning = false;
    //redraw arms
    drawRightArm();
    drawRightLowerArm();
    return;
  }, 1000);

  requestAnimationFrame(animateRightArm);

  setTimeout(() => {
    //resets 
    context.setTransform(1,0,0,1,0,0);
    context.clearRect(0,0,canvas.width,canvas.height);

    start(); // returns to face front in centre
    stateOn();

    drawArrows(context);
    if (isRobotOn) {
      drawBatteryBorder();
      batteryStatus();
    }
  }, 50);
}


function spinLeftArm() {
  isLeftArmSpinning = true;
  animateLeftArm();
}

function animateLeftArm() {
  if (!isLeftArmSpinning) {
    return;
  }
  context.clearRect(99,44,19,79);

  context.save();

  context.translate(116, 46); //pivot pos
  context.rotate(angle);
  context.translate(-116, -46);

  //rotated arm 
  drawLeftArm();
  drawLeftLowerArm();
  
  context.restore();
  
  //increase by angle 0.3 rad 
  angle += 0.3;

  setTimeout(() => {
    isLeftArmSpinning = false;
    //redraw arms
    drawLeftArm();
    drawLeftLowerArm();
    return;  
  }, 1000);

  requestAnimationFrame(animateLeftArm);

  setTimeout(() => {
    //resets 
    context.setTransform(1,0,0,1,0,0);
    
    context.clearRect(0,0,canvas.width,canvas.height);
    //offset from animation

    start(); // returns to face front in centre
    stateOn();

    drawArrows(context);
    if (isRobotOn) {
      drawBatteryBorder();
      batteryStatus();
    }
  }, 50);
}

function drawText() {
  context.fillStyle = "rgb(0,0,255)";
  context.font = "12px sans-serif";
  context.fillText("Needs Charging", 10,20);
}
function start() {
  //draw robot body
  drawHead();
  drawBody();
  drawRightArm();
  drawRightLowerArm();
  drawLeftArm();
  drawLeftLowerArm();
  drawLegs();
  stateOff();
}

// main code 
let canvas = document.getElementById("robot_canvas");
let context = canvas.getContext("2d");
let boundingRect = canvas.getBoundingClientRect();
let isRobotOn = false;
start();

let statusOn = false; 

let onOffButton = document.getElementById("on_off_button");
onOffButton.addEventListener("click", function () {
  if (statusOn) {
    stateOff();
  } else {
    drawArrows(context);
    stateOn();
  }
  //cannot turn on if ran out of actions 
  if (action <3) {
    statusOn = !statusOn; 
  }
});

let laserOn = false; 
//counts number of actions robot does 
let action = 0; 

let isArrowClicked = false;
let isArmClicked = false;
let isRobotRight = false;
let isRightArmSpinning = false;
let isLeftArmSpinning = false;
let angle = 0;

let chargingButton = document.getElementById("charge_button");

chargingButton.addEventListener("click", function () {
  if (action>0) {
    chargeRobot();
    //charges for 3 seconds before turning back on
    setTimeout(() => {
      // clear facial expressions
      context.clearRect(110,6,70,32);
      //clear body
      context.clearRect(121,45,54,54);
      stateOn();
      drawArrows(context);
    }, 3000);
  }
});

canvas.addEventListener("click", function(e) {
  arrowClicked(e,context);
});

canvas.addEventListener("click", function(e) {
  armClicked(e,context);
})

canvas.addEventListener("click", function (e) {
  console.log("Robot on?:", isRobotOn);
  console.log("Laser on?:", laserOn);

  if (isRobotOn && laserOn && action<3 && !isArrowClicked && !isArmClicked) {
    action++;
    drawLaser(e); 
    batteryDecrease();
  } 
  else if (isArrowClicked && isRobotOn) {
    action++;
    drawLaser(e);
    batteryDecrease();

    if ((action>=3) && (!isRobotOn)) {
      //give animation 2s to end then switch off
      if ((laserOn) || (isLeftArmSpinning) || (isRightArmSpinning)) {
        setTimeout(() => {
          stateOff();
        }, 2000);
      }
      return;
    }
  }
  else if (isArmClicked && isRobotOn) {
    action++;
    drawLaser(e);
    batteryDecrease();
    laserOn = true;
    
    if ((action>=3) && (!isRobotOn)) {
      //give animation 2s to end then switch off
      if ((laserOn) || (isLeftArmSpinning) || (isRightArmSpinning)) {
        setTimeout(() => {
          stateOff();
        }, 2000);
      }
      return;
    }
  }
  if (action>=4) {
    //if additional action is tried, says needs charging
    setTimeout(() => {
      drawText();
    }, 2000);
    stateOff();
    return;
  }

});


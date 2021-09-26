song_1 = "";
song_2 = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist = "";
scoreRightWrist = "";

function preload()
{
  song_1 = loadSound("song_1.mp3");
  song_2 = loadSound("song_2.mp3");
}
function setup()
{
  canvas = createCanvas(800,800);
  canvas.center() 
  
  video = createCapture(VIDEO);
  video.hide();

  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on('pose', gotPoses);
}

function modelLoaded()
{
  console.log('PoseNet Is Initialized');
}

function gotPoses(results)
{
  if (results.length > 0) 
  {
    console.log(results);
    scoreRightWrist = results[0].pose.keypoints[10].score;
    scoreLeftWrist = results[0].pose.keypoints[9].score;
    console.log("scoreRightWrist = "+ scoreRightWrist +"scoreLeftWrist = " + scoreLeftWrist);

    leftWristX = results[0].pose.leftWrist.x;
    leftWristY = results[0].pose.leftWrist.y;
    console.log("leftWristX = " + leftWristX + " leftWristY = " + leftWristY);

    rightWristX = results[0].pose.rightWrist.x;
    rightWristY = results[0].pose.rightWrist.y;
    console.log("rightWristX = " + rightWristX + " rightWristY = " + rightWristY);
  }
}


function draw()
{
  image(video, 0, 0, 800, 800);
  fill("#03ffc4");
  stroke("#03ffc4");

if (scoreLeftWrist > 0.2)
{ 
  circle(leftWristX, leftWristY,100);
  
  if(leftWristY>0 && leftWristY<400)
{
  song_2.stop(); 
  song_1.play();
   
}

if(leftWristY>400 && leftWristY<800)
{
  song_1.stop(); 
  song_2.stop();
   
}

}

if (scoreRightWrist > 0.2)
{ 
  circle(rightWristX, rightWristY,100);
  
if (rightWristY>0 && rightWristY<400)
{
  song_1.stop(); 
  song_2.play();
   
}

if(rightWristY>400 && rightWristY<800)
{
  song_1.stop(); 
  song_2.stop();
   
}

}



}

song_1 = "";
song_2 = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;

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
}

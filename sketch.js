let messageIndex = 0;
let messages = [
  "My name is AVI. I am a digital assistant created by An for this project.",
  "Please hold my hand for a bit. (hold down your mousepad...) You are free to let go whenever you want.",
  "Thank you :). You have been assigned a number ()"
];

let typingSpeed = 50; // Adjust the typing speed (milliseconds per character)
let holdingMouse = false;
let startTime, endTime;
let assignedNumber;

function setup() {
  createCanvas(1920, 1080);
  displayMessage();
}

function draw() {
  if (holdingMouse) {
    // Visualize pressure (you can customize this part)
    let pressure = map(sin(frameCount * 0.1), -1, 1, 5, 20);
    background(255);
    ellipse(width / 2, height / 2, pressure, pressure);
  }
}

function mousePressed() {
  holdingMouse = true;
  startTime = millis();
}

function mouseReleased() {
  holdingMouse = false;
  endTime = millis();
  calculateAssignedNumber();
  messageIndex++;
  displayMessage();
}

function calculateAssignedNumber() {
  let holdDuration = (endTime - startTime) / 1000; // Convert to seconds

  if (holdDuration <= 3) {
    assignedNumber = Math.floor(random(20, 26));
  } else if (holdDuration <= 10) {
    assignedNumber = Math.floor(random(6, 20));
  } else {
    assignedNumber = Math.floor(random(1, 6));
  }

  // Update the message with the assigned number
  messages[2] = `Thank you :). You have been assigned a number (${assignedNumber}).`;
}

function displayMessage() {
  background(255);
  fill(0);
  textSize(16);
  textAlign(CENTER, CENTER);
  text(messages[messageIndex], width / 2, height / 2);

  // If it's a typing message, show characters one by one
  if (messageIndex === 0 || messageIndex === 1) {
    setTimeout(displayNextCharacter, typingSpeed);
  }
}

function displayNextCharacter() {
  let currentMessage = messages[messageIndex];
  if (frameCount % typingSpeed === 0 && currentMessage.length > 0) {
    messages[messageIndex] = currentMessage.substring(0, currentMessage.length - 1);
    displayMessage();
  }
}


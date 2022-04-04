//main website
let friendList = [];
//
// TABS :
// 0 -> add friends
// 1 -> friends
// 2 -> stats
// 3 -> leaderboard
let currentTab = 0;
//
let logging = false;
//
let max_weight = 100;
//
let headerHeight;
let headerTextSize = 35;
//
let tabTextSize = 30;
let tabWidth;
let tabHeight;
//COLORS
let headerColor;
let mainTextColor;
//
let buttonList = [];
let friendsButton, statsButton, leaderboardButton, addFriendButton;
//
let friendTab, addFriendTabO, statTab;
let LBtab;
//
//
let cam1;
//
let defaultFont;
//
let myCharacterX;
let myCharacterY;
//
let characterSize;
//
let activeTextBox = null;
//
//
let logStatus = 0;
//login stuff
let usernameBox, passwordBox
let loginButton, registerButton;
//
// customization stuff
let changeShirtButton, changeSkinTone, changeFace;
let acceptChoiceButton;
//
let loginStatus = "";
//

//USER DATA
let currentUser;
//
let customizeCharacter;
//
let spinCharacter = false;
let newRot = 0;
let characterRot = 0;
//
let lastMouseX= 0;
let mouseVel = 0;
let startMouseX = 0;
//
//
let lastRot = 0;
let rotVel = 0;
//
let userLiftData;//wtf
//
let faceList = [];
//
let comparing = false;
let compareTo;

let textScale = 0;

let attemptUsername = "";
let attemptPassword = "";

let storedDatabase;
function preload()
{
  face01 = loadImage('face01.png');
  face02 = loadImage('face02.png');
  face03 = loadImage('face03.png');
  face04 = loadImage('face04.png');
  face05 = loadImage('face05.png');
  face06 = loadImage('face06.png');
  face07 = loadImage('face07.png');
  face08 = loadImage('face08.png');
  face09 = loadImage('face09.png');
  face10 = loadImage('face10.png');
  face11 = loadImage('face11.png');
  face12 = loadImage('face12.png');
  face13 = loadImage('face13.png');
  face14 = loadImage('face14.png');
  
  defaultFont = loadFont('BebasKai.otf');
}
function drawCharacter(shirtColor, skinColor, charSize, yRot, faceTexture, armRotL, armRotR, liftDats)
{
  let armPosition = charSize/25; //2/3s up the torso
  let neckY = -charSize/2 - (charSize/7 / 2);
  let bodyThickness = charSize/4;
  let armThickness = charSize/12;
  let armRotation = 0;
  let shoulderSize = charSize / 7;
  let feetSize = charSize/8;
  let shoulderMod = 0;
  let charSizeMod = 0;
  let armMod = 0;
  let oldcharSize = charSize;
  // this.names = ["Squat", "Bench", "Deadlift", "Curl", "OHP"];
    // this.dat = newDat;
  if(liftDats != null)
    {
      shoulderMod = liftDats.dat[4] / 10;
      charSizeMod = (liftDats.dat[0] + liftDats.dat[1] + liftDats.dat[2]) / 110 * 5;
      armMod = liftDats.dat[3] / 25;
    }
  shoulderSize += shoulderMod;
  armThickness += armMod;
  
  let newCharSize = charSize + charSizeMod;
  bodyThickness = bodyThickness + charSizeMod / 4;
  push();
  // translate(width /2, height /2);
  rotateY(yRot);
  //
  // shoulders
  fill(shirtColor);
  push();
  translate(-bodyThickness - armThickness / 2, -newCharSize/2 +armPosition - shoulderSize / 5);
  sphere(shoulderSize,6,6);
  pop();
  push();
  translate(bodyThickness + armThickness / 2, -newCharSize/2 +armPosition - shoulderSize / 5);
  sphere(shoulderSize,6,6);
  pop();
  //
  //arms
  fill(skinColor);
  push();
  translate(0,-newCharSize/2 - armPosition);
  rotateX(armRotL);
  rotateZ(PI/20);
  push();
  translate(-bodyThickness - (armThickness / 1.5), newCharSize / 2 - armPosition);
  cylinder(armThickness, newCharSize/1.4);
  pop();
  pop();
  //arm2
  push();
  translate(0,-newCharSize/2 - armPosition);
  rotateX(armRotR);
  rotateZ(-PI/20);
  push();
  translate(bodyThickness + (armThickness / 1.5), newCharSize / 2 - armPosition);
  cylinder(armThickness, newCharSize/1.4);
  pop();
  pop();
  //
  //head
  fill(skinColor);
  push();
  translate(0,neckY - bodyThickness - charSizeMod/2);
  tint(skinColor);
  texture(faceTexture);
  sphere(bodyThickness,8,8);
  pop();
  //neck  
  push();
  translate(0, neckY - charSizeMod/2);
  rotate(PI);
  cone(bodyThickness,newCharSize/4);
  //body
  // fill(shirtColor);
  pop();
  fill(shirtColor);
  cylinder(bodyThickness, newCharSize);
  pop();
  //
  //
  fill(skinColor);
  push();
  translate(bodyThickness / 2, newCharSize / 2+ feetSize/2);
  sphere(feetSize + charSizeMod/4, 8,8);
  pop();
  //
  push();
  translate(-bodyThickness / 2, newCharSize / 2 + feetSize/2);
  sphere(feetSize + charSizeMod/4, 8,8);
  pop();
}
function setup() 
{
  createCanvas(windowWidth, windowHeight, WEBGL);
  textAlign(CENTER,CENTER);
  imageMode(CENTER);
  rectMode(CENTER);
  
  
  characterSize = (200/1000) * width;
  //
  characterRot = PI;
  //
  append(faceList, face01);
  append(faceList, face02);
  append(faceList, face03);
  append(faceList, face04);
  append(faceList, face05);
  append(faceList, face06);
  append(faceList, face07);
  append(faceList, face08);
  append(faceList, face09);
  append(faceList, face10);
  append(faceList, face11);
  append(faceList, face12);
  append(faceList, face13);
  append(faceList, face14);
  //
  textFont(defaultFont);
  //tab width is 60% of screenwidth
  tabWidth = 0.6 * width;
  tabHeight = 0.08 * height;
  //header is 5% of screenheight
  headerHeight = 0.08 * height;
  //
  headerColor = color(200);
  mainTextColor = color(0);
  //
  //TAB SETUP
  friendTab = new friendsTab(width - (tabWidth/2), height / 2 + (headerHeight - tabHeight)/2,tabWidth, (height - headerHeight - tabHeight));
  LBtab = new leaderboardTab(width - (tabWidth/2), height / 2 + (headerHeight - tabHeight)/2,tabWidth, (height - headerHeight - tabHeight));
  statTab = new statsTab(width - (tabWidth/2), height / 2 + (headerHeight - tabHeight)/2,tabWidth, (height - headerHeight - tabHeight));
  addFriendTabO = new addFriendTab(width - (tabWidth/2), height / 2 + (headerHeight - tabHeight)/2,tabWidth, (height - headerHeight - tabHeight));
  //
  //
  setupTabButtons();
}
function setupTabButtons()
{
    //(buttonText, x, y, buttonWidth, buttonHeight, buttonTextSize, buttonImage)
  addFriendButton = new Button("Add\nFriend", width - tabWidth, headerHeight + tabHeight, tabWidth * 1/4, tabHeight, tabTextSize);
  friendsButton = new Button("Friends", width - tabWidth+ (tabWidth * 1/4), headerHeight + tabHeight, tabWidth * 1/4, tabHeight, tabTextSize);
  statsButton = new Button("Stats", width - tabWidth + (tabWidth * 2/4), headerHeight + tabHeight, tabWidth * 1/4, tabHeight, tabTextSize);
  leaderboardButton = new Button("Leaderboard", width - tabWidth + 3*(tabWidth * 1/4), headerHeight + tabHeight, tabWidth * 1/4, tabHeight, tabTextSize);
  //
  let logButtonSizeX = 0.15 * width;
  let logButtonSizeY = 0.05 * height;
  loginButton = new Button("Login", width / 2 - logButtonSizeX /2 , height / 2 - 2.5 * logButtonSizeY, logButtonSizeX, logButtonSizeY, tabTextSize);
  registerButton = new Button("Register", width / 2 - logButtonSizeX /2 , height / 2 - logButtonSizeY, logButtonSizeX, logButtonSizeY, tabTextSize);
  //
  usernameBox = new TextBox(width / 2, height/2 , logButtonSizeX * 2, logButtonSizeY,20);
  passwordBox = new TextBox(width / 2, height/2 + 0.8 * (height / 12), logButtonSizeX * 2, logButtonSizeY,20);
  //
  //change shirt | change skin tone | change face
  let buttonSpace = width * 0.6;
  let buttonWidth = buttonSpace / 3;
  let buttonHeight = height *0.06;
  //[width]
  
  changeShirtButton = new Button("Change Shirt", (width - buttonSpace) / 2 + (buttonWidth * 1) - buttonWidth, 3 * headerHeight, buttonWidth * 0.9, buttonHeight, 30);
  changeSkinTone = new Button("Change Skintone", (width - buttonSpace) / 2 + (buttonWidth * 2) - buttonWidth, 3 * headerHeight, buttonWidth * 0.9, buttonHeight, 30);
  changeFace = new Button("Change Face", (width - buttonSpace) / 2 + (buttonWidth * 3) - buttonWidth, 3 * headerHeight, buttonWidth * 0.9, buttonHeight, 30);
  acceptChoiceButton = new Button("Accept", width/2, height - buttonHeight * 4, buttonWidth, buttonHeight, 30);
  //
  //add to the list
  append(buttonList, friendsButton);
  append(buttonList, statsButton);
  append(buttonList, leaderboardButton);
  append(buttonList, addFriendButton);
  //
}
function switchFace()
{
  customizeCharacter.faceType = int(random(0,faceList.length));
}
function switchShirt()
{
  customizeCharacter.shirtColor = color(random(0,255), random(0,255), random(0,255));
}
function switchSkin()
{
  customizeCharacter.skinColor = color(random(0,255), random(0,255), random(0,255));
}
function mousePressed()
{
  if(logStatus == 2)
    {
      if(mouseX <= tabWidth)
      {
          startMouseX = mouseX;
          spinCharacter = true;
      }
    }
}
function mouseReleased()
{
  if(logStatus == 2 && spinCharacter)
    {
      spinCharacter = false;
      characterRot += newRot;
      newRot = -mouseVel / 20;
    }
}
function saveLiftData(val)
{
  //reflect in json
  userLiftData.updateStats(val,userLiftData.get(val) + statTab.tempStats[val]);
  statTab.populate(userLiftData);
}
function mouseClicked()
{
  if(logStatus == 2)
  {
      
    if(addFriendButton.isOver())
      {
        currentTab = 0;
      }
    else if(friendsButton.isOver())
      {
        currentTab = 1;
      }
    else if(statsButton.isOver())
      {
        currentTab = 2;
      }
    else if(leaderboardButton.isOver())
      {
        currentTab = 3;
      }
    if(currentTab == 0) // check add friend button friend text box
      {
        if(addFriendTabO.addFriendTB.isOver())
          {
            activeTextBox = addFriendTabO.addFriendTB;

          }
        if(addFriendTabO.addFriendButton.isOver())
              {
                addNewFriend(addFriendTabO.addFriendTB.getText());
                
              }
        // for(let i = 0; i < 
      }
    else
      {
        activeTextBox = null;
      }
    if(currentTab == 1)
      {
        if(comparing){comparing = !comparing;}
        for(let i = 0; i < friendTab.friendCount; i++)
          {
            if(friendTab.friendButtons[i].isOver())
              {
                compareTo = friendTab.entries[i];
                comparing = true;
                break;
              }
          }
      }
    else
      {
          comparing = false;  
      }
    if(currentTab == 2) //stats
      {
        for(let i = 0; i < statTab.liftCount; i++)
          {
            if(statTab.plusButtons[i].isOver())
              {
                statTab.tempStats[i] += 5;
              }
            if(statTab.minusButtons[i].isOver())
              {
                statTab.tempStats[i] -= 5;
              }
            if(statTab.acceptButtons[i].isOver())
              {
                saveLiftData(i);
                statTab.tempStats[i] = 0;
              }
          }
      }
  }
  else if(logStatus == 1)
    {
      // changeShirtButton.render();
      // changeSkinTone.render();
      // changeFace.render();
      // acceptChoiceButton.render();
      if(changeShirtButton.isOver())
        {
          switchShirt();
        }
      else if(changeSkinTone.isOver())
        {
          switchSkin();
        }
      else if(changeFace.isOver())
      {
          switchFace();
      }
      else if(acceptChoiceButton.isOver())
      {
          finishRegister();
      }
    }
  else if(logStatus == 0)
    {
      if(usernameBox.isOver())
        {
          activeTextBox = usernameBox;
        }
      else if(passwordBox.isOver())
        {
          activeTextBox = passwordBox;
        }
      else
        {
          activeTextBox = null;
        }
      if(loginButton.isOver())
        {
          attemptLogin();
        }
      else if(registerButton.isOver())
        {
          attemptRegister();
        }
    }
}
function attemptRegister()
{
  let username = usernameBox.getText();
    let password = passwordBox.getText();
  if(!logging && username != "" && password != "")
    {
      storeDB();
    let failReason = "unknown error";
      //constructor(userName, shirtColor, skinColor, faceType, workoutData, friendList)
    
    loginStatus = "failed to register > " + failReason + "<";
     let liftDat = new liftStats([100,100,100,100,50]);
    customizeCharacter = new userData(username, color(random(0,255), random(0,255), random(0,255)),color(random(0,255), random(0,255), random(0,255)), int(random(0,faceList.length)), liftDat, []);
    logStatus = 1; // customization
    usernameBox.clearText();
    passwordBox.clearText();
    }
  
}
function attemptLogin()
{
  if(!logging)
    {
        logging = true;
      let username = usernameBox.getText();
      let password = passwordBox.getText();
    //query
      loginStatus = "attemping to login...";
      attemptUsername = username;
      attemptPassword = password;
      tryLogin();
    }
}
function finishLogin(status, userDat)
{
  logging = false;
  if(status == 1)
    {
      loginStatus = "login success";
      fillData(userDat);
      usernameBox.clearText();
      passwordBox.clearText();
      LBtab.populate(friendList);
      logStatus = 2;
    }
  else
    {
      loginStatus = "login failed, wrong username or password";
    }
  
}
function finishRegister()
{
  currentUser = customizeCharacter;
  logStatus = 2;
  setStats();
}
function setStats()
{ 
//   constructor(cSquat, cBench, cDeadlift, cCurl, cOhp)
  let liftDat = new liftStats([100,100,100,100,100]);
  userLiftData = liftDat;
  statTab.populate(userLiftData);
}
function draw() 
{
  background(235 + 20*sin(millis() / 3000),235 + 20*sin(millis() / 5000),235 + 20*sin(millis() / 4000));
  //
  //
  if(logStatus == 2)
    {
      if(mouseX - lastMouseX == 0)
        {
          mouseVel *= 0.8;
        }
      else
        {
          mouseVel = mouseX - lastMouseX;  
        }
    lastMouseX = mouseX;
    push();
    translate(-width /2, -height /2);
    if(currentTab == 0)
    {
      addFriendTabO.drawTab();
    }
    else if(currentTab == 1)
    {
      friendTab.drawTab();
    }
    else if(currentTab == 2)
      {
        statTab.drawTab();
      }
      else if(currentTab == 3)
        {
          LBtab.drawTab();
        }
    //draw header
    draw_header();
    drawMain();
    //shadow
    fill(200);
      if(!comparing)
        {
    ellipse(tabWidth / 3, height - characterSize /2,150,50);
        }
      else
        {
          ellipse(tabWidth / 3 - characterSize / 2, height - characterSize /2,150,50);
          ellipse(tabWidth / 3 +  characterSize / 2, height - characterSize /2,150,50);
        }
    //
    pop();
      //
    //should be stats of the persons lifts
    if(!comparing)
    {
      push();
      // translate(width / 2, height / 2);
      translate(-tabWidth / 2, characterSize / 2);
      noStroke();
      //shadow
      fill(150);
        if(spinCharacter)
          {
            newRot = (mouseX - (startMouseX)) / (width) * 4*PI;// / width * 4*PI;
          }
        else
          {
            newRot *= 0.88;
          }
        //need shoulder size and arm size
        if(lastRot - (characterRot + newRot) < 0.1)
        {
          rotVel *= 0.95;
        }
        else
        {
          rotVel = lastRot - (characterRot + newRot);
        }

        lastRot = characterRot + newRot;
        let armRot = (rotVel) * PI;
        //
      drawCharacter(currentUser.shirtColor,currentUser.skinColor, characterSize, characterRot + newRot, faceList[currentUser.faceType], armRot + 0.5*sin(millis()/300),armRot -0.5*sin(millis()/300), userLiftData);
        pop();
      }
      else // COMPARRRRRRRRRRRRRRING
        {
          push();
          translate(-width /2, -height /2);
          prepareGraph(width - (tabWidth/2), height / 2 + (headerHeight - tabHeight)/2,tabWidth, (height - headerHeight - tabHeight));
          pop();
          push();
          translate(-tabWidth / 2 - characterSize / 2, characterSize / 2 + sin(millis() / 550) * 10);
          noStroke();
          fill(150);

          drawCharacter(currentUser.shirtColor,currentUser.skinColor, characterSize / 1.2, PI +abs(sin(millis() / 1000) / 3 + PI /2), faceList[currentUser.faceType], 0.2*sin(millis()/2000),-0.2*sin(millis()/2000), userLiftData);
          pop();
          //
          push();
          translate(-tabWidth / 2 + characterSize / 2, characterSize / 2 + sin(millis() / 500) * 10);
          noStroke();
          fill(150);
          drawCharacter(compareTo.shirtColor,compareTo.skinColor, characterSize / 1.2, -PI/2 + -abs(sin(millis() / 1000) / 3) - PI/2, faceList[compareTo.getFace()], 0.2*sin(millis()/1000), -0.2*sin(millis()/2000), compareTo.liftData);
          pop();
        }
    }
  else if(logStatus == 1)
    {
      push();
      translate(-width /2, -height /2);
      // customization 
      let buttonHeight = height / 12;
      fill(0);
      textSize(50);
      text("Customize Your Character", width / 2, headerHeight + buttonHeight / 2);
      draw_header();
      changeShirtButton.render();
      changeSkinTone.render();
      changeFace.render();
      acceptChoiceButton.render();
      pop();
      //render character
      //
      push();
      // translate(width / 2, height / 2);
      translate(-tabWidth / 2, characterSize / 2);
      noStroke();
      //shadow
      fill(150);
      //need shoulder size and arm size
      drawCharacter(customizeCharacter.shirtColor,customizeCharacter.skinColor, characterSize + 20 * sin(millis() / 600), abs(sin(millis() / 2200)) * PI + PI/2, faceList[customizeCharacter.faceType], -.1*sin(millis()/4000), .1*sin(millis()/4000));
      pop();
      
    }
  
  else if(logStatus == 0)
    {
      push();
      translate(-width /2, -height /2);
      // login / register
      let buttonHeight = height / 12;
      fill(0);
      textSize(50 + 2.5*sin(millis()/1000));
      text("Welcome to Fittest Friends!", width / 2, headerHeight + buttonHeight / 2);
      textSize(30);
      text("Login or Register", width/2, headerHeight + buttonHeight);
      draw_header();
      //
      loginButton.render();
      registerButton.render();
      //
      usernameBox.render();
      passwordBox.render();
      //
      text("username:", width /4.1, height/2);
      text("password:", width /4.1, height/2 + 0.8 * buttonHeight);
      //
      if(loginStatus != "")
        {
          fill(255,0,0);
          textSize(15);
          text("Status: " + loginStatus, width / 2, headerHeight + buttonHeight * 1.5);
        }
      pop();
    }
  //
}
function draw_header()
{
  noStroke();
  fill(headerColor);
  rect(width/2,headerHeight / 2,width,headerHeight);
  //
  fill(mainTextColor);
  textSize(headerTextSize + 2*sin(millis() / 4000));
  textAlign(CENTER,CENTER);
  text("Fittest Friends", width/2, headerHeight / 2)
  if(logStatus == 2)
    {
      textSize(headerTextSize * .8);
      text("currently logged in: " + currentUser.userName, width/6, headerHeight / 2)
    }
  //
}
function drawMain()
{
    //LINE DIVIDING CHARACTER AND THE TABS
  strokeWeight(4);
  stroke(0,0,0);
  line(width - tabWidth,height,width - tabWidth, headerHeight);
  
  //DRAW TAB BUTTONS
  for(let i = 0; i < buttonList.length; i++)
    {
      buttonList[i].render();
    }
}
function keyTyped()
{

  if(key == ' ')
    {
      addRandomFriend();
    }
  if(activeTextBox != null)
    {
      if((unchar(key) >= 97 && unchar(key) <= 122) || (unchar(key) >= 65 && unchar(key) <= 90))
        {
          activeTextBox.addLetter(key);
        }
    }
}
function keyPressed()
{
  if(keyCode == BACKSPACE)
    {
       if(activeTextBox != null)
        {
          activeTextBox.removeLetter();
        }
    }
}
function mouseWheel(event) 
{
  if(currentTab == 1)
    {
       friendTab.updateVelocity(event.delta * 10);
    }
  else if(currentTab == 2)
    {
      statTab.updateVelocity(event.delta * 10);
    }
  else if(currentTab == 3)
    {
      LBtab.updateVelocity(event.delta * 10);
    }
}
function addNewFriend(friendName)
{
  getNewFriend(storedDatabase, friendName);
  // if(friendName != "")
  //   {
  //     let newFriend = new Friend(friendName, "data", int(random(0,faceList.length)),color(random(0,255), random(0,255), random(0,255)),color(random(0,255), random(0,255), random(0,255)));
  //     append(friendList, newFriend);
  //     friendTab.populate(friendList);
  //   }
}
function addRandomFriend()
{
  randomNames = ["Ryan", "Matthew", "Jared", "Eeperson", "Ronald", "Goldman", "Mr. B", "Goat", "otherName", "testName", "Mike", "Alan", "Row", "T dog", "Redbull"];  
  randName = randomNames[floor(random(0,randomNames.length -1))];
  let newStater = new liftStats([random(10,500), random(10,500), random(10,500), random(10,500), random(10,500)]);
  let newFriend = new Friend(randName, newStater, int(random(0,faceList.length)),color(random(0,255), random(0,255), random(0,255)),color(random(0,255), random(0,255), random(0,255)));
  append(friendList, newFriend);
  friendTab.populate(friendList);
}
function prepareGraph(x, y, x_width, y_height)
{
  usernames = [];
  colors = [];
  append(colors, currentUser.shirtColor);
  append(colors, compareTo.shirtColor);
  append(usernames, currentUser.userName);
  append(usernames, compareTo.name);
  let lifter1_data = [];// = [[1,100], [30,150], [40,175], [60, 180], [150, 200] , [250, 220], [300,250], [360,270]];
  let lifter2_data = [];//[[0,50],[100,75], [200,125], [300,200]];
  lifter_data = [lifter1_data, lifter2_data];
  for(let i = 0; i < userLiftData.dat.length; i++)
    {
      let l1t = [];
      let l2t = [];
      append(l1t, i);
      append(l1t, userLiftData.dat[i]);
      append(l2t, i);
      append(l2t, compareTo.liftData.dat[i]);
      append(lifter1_data, l1t);
      append(lifter2_data, l2t);
    }
  rectMode(CORNER);
  x_width *= 1;
  y_height *= 0.8;
    draw_chart(usernames, lifter_data, x - x_width / 2, y - y_height / 2, x_width, y_height, colors);
}
function parseCColor(Val)
  {
    // print(val);
    let val = str(Val);
    let newVal = val.substring(2,val.length-2);
    let goodVals = split(newVal, ',');
    if(int(goodVals[3]) == null)
      {
        return color(int(goodVals[0]), int(goodVals[1]), int(goodVals[2]), 255);
      }
    else
      {
        return color(int(goodVals[1]), int(goodVals[2]), int(goodVals[3]), 255);
      }
    
  }
function createUserFriend(dat)
{
  //this.names = ["Squat", "Bench", "Deadlift", "Curl", "OHP"];
    // this.dat = newDat;
  // let newSquat =  int(dat.squat.substring(2,5));
  // let newBench =  int(dat.bench.substring(2,5));
  // let newDeadlift =  int(dat.deadlift.substring(2,5));
  // let newCurl =  int(dat.curl.substring(2,5));
  // let newOHP =  int(dat.ohp.substring(2,5));
  // let newLiftData = new liftStats([newSquat, newBench, newDeadlift, newCurl, newOHP]);
  let newLiftData = new liftStats([int(dat.squat), int(dat.bench), int(dat.deadlift), int(dat.curl), int(dat.ohp)]);
  let newFriend = new Friend(dat.username, newLiftData, dat.faceType, parseCColor(dat.shirtColor), parseCColor(dat.skinColor));
  append(friendList, newFriend);
  friendTab.populate(friendList);
}
class Friend
{
  constructor(name, liftData, faceImage, shirtColor, skinColor)
  {
    this.name = name;
    this.liftData = liftData;
    this.faceImage = faceImage;
    this.shirtColor= shirtColor;
    this.skinColor = skinColor;
  }
  getName()
  {
    return this.name;
  }
  getData()
  {
    return this.liftData;
  }
  getFace()
  {
    return this.faceImage;
  }
}
class addFriendTab
{
  constructor(x, y, fWidth, fHeight)
  {
    this.x = x;
    this.y = y;
    this.fWidth = fWidth;
    this.fHeight = fHeight;
    //
    let buttonWidth = this.fWidth * 0.85;
    let buttonHeight = this.fHeight * 0.09;
    this.addFriendButton = new Button("Add Friend", this.x - buttonWidth/2, this.y - buttonHeight / 2, buttonWidth, buttonHeight, 25);
    this.addFriendTB = new TextBox(this.x, this.y - (this.fHeight / 2) + 0.25*this.fHeight, buttonWidth, buttonHeight, 20);
    //buttonText, x, y, buttonWidth, buttonHeight, buttonTextSize, buttonImage)
  }
  drawTab()
  {
    fill(0);
    textSize(35);
    text("Friend Name", this.x, this.y - (this.fHeight/2) + 0.15*this.fHeight);
    // text("[ _________ ]", this.x, this.y - (this.fHeight/2) + 0.25*this.fHeight);
    this.addFriendButton.render();
    this.addFriendTB.render();
  }
}
class friendsTab
{
  constructor(x, y, fWidth, fHeight)
  {
    this.x = x;
    this.y = y;
    this.fWidth = fWidth;
    this.fHeight = fHeight;
    this.entries = [];
    this.maxShownEntries = 5;
    this.entryOffset = 13;
    this.entryHeight = fHeight * 1/this.maxShownEntries + this.entryOffset;
    this.friendCount = 0;
    this.tabColor = color(255,255,255,100);
    this.scrollVelocity = 0;
    this.scrollY = 0;
    this.maxScroll = fWidth;
    this.friendButtons = [];
    this.scrollHeight = 0;
  }
  drawTab()
  {
    for(let i = 0; i < this.friendCount; i++)
      {
        let yPos = this.y - (this.fHeight / 2) + ((this.entryHeight) * (1+i)) - this.entryOffset / 2 + this.scrollHeight;
        let xPos = this.x// - this.fWidth / 2;
        let imgSize = this.entryHeight * 0.75;//this.fHeight * 0.09;
        fill(this.tabColor);
        // stroke(0,0,0,40);
        noStroke();
        rect(xPos, yPos, this.fWidth, this.entryHeight * 0.95,3);
        //
        fill(this.entries[i].shirtColor);
        rect(xPos - this.fWidth/2 + imgSize * 0.6,yPos, imgSize*1.1, imgSize*1.1);
        tint(this.entries[i].skinColor);
        // stroke(this.entries[i].shirtColor);
        image(faceList[this.entries[i].getFace()], xPos - this.fWidth/2 + imgSize * 0.6,yPos, imgSize, imgSize);
        //
        this.friendButtons[i].updateY(yPos+(this.entryHeight * 0.3))
        this.friendButtons[i].render();
        //
        noStroke();
        fill(0);
        textAlign(LEFT);
        textSize(38);
        text(this.entries[i].getName(), xPos - this.fWidth/2 + imgSize * 1.5, yPos);
      }
    this.scrollHeight += this.scrollVelocity;
    this.scrollVelocity *= 0.4;
    let minScroll = 0;
    if(this.friendCount * this.entryHeight > this.fHeight)
      {
            minScroll = this.fHeight - (this.friendCount * this.entryHeight);
      }
    else
      {
        minScroll = 0;
      }
    if(this.scrollHeight < minScroll)
    {
      this.scrollHeight -= (this.scrollHeight - minScroll) * .85;
    }
    else if (this.scrollHeight > 0)
      {
        this.scrollHeight *= 0.45;
      }
  }
  updateVelocity(addVel)
  {
    this.scrollVelocity -= 0.01 * addVel; 
  }
  populate(friendData)
  {
    if(currentUser != null)
      {
        LBtab.populate(friendData);
      }
    let buttonWidth = this.fWidth / 4;
    this.entries = friendData; // maybe change later
    this.friendCount = friendData.length;
    if(this.friendCount <= this.maxShownEntries)
      {
        this.maxScroll = this.fHeight;
      }
    for(let i = 0; i < this.friendCount; i++)
      {
        let newButton = new Button("Compare", (this.x + this.fWidth / 2) - buttonWidth * 1.2, 0, buttonWidth, this.entryHeight * 0.6, 20);
        append(this.friendButtons, newButton);
      }
  }
}
class leaderboardTab
{
  constructor(x, y, fWidth, fHeight)
  {
    this.x = x;
    this.y = y;
    this.fWidth = fWidth;
    this.fHeight = fHeight;
    this.entries = [];
    this.maxShownEntries = 5;
    this.entryOffset = 13;
    this.entryHeight = fHeight * 1/this.maxShownEntries + this.entryOffset;
    this.friendCount = 0;
    this.tabColor = color(255,255,255,100);
    this.scrollVelocity = 0;
    this.scrollY = 0;
    this.maxScroll = fWidth;
    this.scrollHeight = 0;
    this.totalLifts = [];
    this.sortedIndex = [];
  }
  drawTab()
  {
    //first place person
    //second place person
    //third place person
    let podiumPadding = this.fWidth * 0.01;
    let podiumWidth = (this.fWidth - podiumPadding * 2) / 3;
    let podiumHeight = this.fHeight * 0.1;
    let midPodiumZ = -podiumWidth/2;
    push();
    //radius, height, dX, detailY
    translate(this.x, this.y + podiumHeight * 3.5);
    scale(0.8);
    rotateY(sin(millis() / 4000) / 9 - PI/8);
    rotateX(sin(millis() /3000) /8.4 - PI/8);
    
    let tp_friend;
    let sp_friend;
    let fp_friend;
    
    let c_size = podiumWidth / 2;
    //left third place
    //// /constructor(name, liftData, faceImage, shirtColor, skinColor)
    if(this.sortedIndex.length >= 3)
      {
        tp_friend = this.entries[this.sortedIndex[2]];
        push();
        translate(-podiumWidth,-podiumHeight / 2 - c_size);
        noStroke();
        drawCharacter(tp_friend.shirtColor,tp_friend.skinColor, c_size, -(sin(millis() / 2000) / 3 + PI), faceList[tp_friend.faceImage], 0.2*sin(millis()/2000),-0.2*sin(millis()/2000), tp_friend.liftData);
        pop();
      }
    push();
    noStroke();
    translate(-podiumWidth,-podiumHeight / 2);
        push();
    translate(0,0,podiumWidth/2);
    if(this.sortedIndex.length>=3){fill(0);textSize(60);text(this.entries[this.sortedIndex[2]].name, 0, -podiumHeight * 4.5);}
    pop();
    fill(70);
    cylinder(podiumWidth/2, podiumHeight, 8,8);
    pop();
    
    //first place
      if(this.sortedIndex.length >= 1)
      {
        tp_friend = this.entries[this.sortedIndex[0]];
        
        push();
        translate(0,-podiumHeight * 3 - c_size);
        noStroke();
        //TROPHY
        translate(0,0,midPodiumZ);
        push();
        translate(0,-c_size*2.65);
        fill(252, 182, 3);
        cone(c_size/3, c_size/2,7,7);
        translate(0,c_size/3)
        // sphere(c_size/5.5,5,5);
        rotateX(PI);
        fill(200, 150, 3);
        cone(c_size/5,c_size/5,7,7)
        pop();
        //
        drawCharacter(tp_friend.shirtColor,tp_friend.skinColor, c_size, (sin(millis() / 2000) / 3 + PI), faceList[tp_friend.faceImage], 0.25*sin(millis()/400) + PI,-0.25*sin(millis()/400) + PI, tp_friend.liftData);
        pop();
      }
    push();
    noStroke();
    translate(0,-podiumHeight / 2 * 3, midPodiumZ);
        push();
    translate(0,0,podiumWidth/2);
    if(this.sortedIndex.length>=1){fill(0);textSize(40);text(this.entries[this.sortedIndex[0]].name, 0, -podiumHeight * 6.5);}
    pop();
      fill(97, 84, 49);
    cylinder(podiumWidth/2, podiumHeight*3, 8,8);
    pop();
    
    //second place
      if(this.sortedIndex.length >= 2)
      {
        tp_friend = this.entries[this.sortedIndex[1]];
        push();
        translate(podiumWidth,-podiumHeight * 2 - c_size);
        noStroke();
        drawCharacter(tp_friend.shirtColor,tp_friend.skinColor, c_size, -(sin(millis() / 2000) / 3 + PI), faceList[tp_friend.faceImage], 0.2*sin(millis()/2000),-0.2*sin(millis()/2000), tp_friend.liftData);
        pop();
      }
    push();
    noStroke();
    translate(podiumWidth, -podiumHeight / 2 * 2);
    push();
    translate(0,0,podiumWidth/2);
    if(this.sortedIndex.length>=1){fill(0);textSize(40);text(this.entries[this.sortedIndex[1]].name, 0, -podiumHeight * 5.5);}
    pop();
    fill(200);
    cylinder(podiumWidth/2, podiumHeight*2, 8,8);
    pop();
    
    pop();
    // for(let i = 0; i < this.friendCount; i++)
    //   {
    //     let yPos = this.y - (this.fHeight / 2) + ((this.entryHeight) * (1+i)) - this.entryOffset / 2 + this.scrollHeight;
    //     let xPos = this.x// - this.fWidth / 2;
    //     let imgSize = this.fHeight * 0.09;
    //     fill(this.tabColor);
    //     // stroke(0,0,0,40);
    //     noStroke();
    //     rect(xPos, yPos, this.fWidth, this.entryHeight * 0.95,3);
    //     //
    //     fill(this.entries[i].shirtColor);
    //     rect(xPos - this.fWidth/2 + imgSize * 0.6,yPos, imgSize*1.1, imgSize*1.1);
    //     tint(this.entries[i].skinColor);
    //     // stroke(this.entries[i].shirtColor);
    //     image(faceList[this.entries[this.sortedIndex[i]].getFace()], xPos - this.fWidth/2 + imgSize * 0.6,yPos, imgSize, imgSize);
    //     //
    //     // this.friendButtons[i].updateY(yPos+(this.entryHeight * 0.3))
    //     // this.friendButtons[i].render();
    //     //
    //     noStroke();
    //     fill(0);
    //     textAlign(LEFT);
    //     textSize(35);
    //     text(this.entries[this.sortedIndex[i]].getName(), xPos - this.fWidth/2 + imgSize * 1.5, yPos);
    //     text("Total:", xPos - this.fWidth/2 + imgSize * 3, yPos);
    //     text(this.totalLifts[this.sortedIndex[i]], xPos - this.fWidth/2 + imgSize * 4.25, yPos);
    //   }
    // this.scrollHeight += this.scrollVelocity;
    // this.scrollVelocity *= 0.4;
    // let minScroll = 0;
    // if(this.friendCount * this.entryHeight > this.fHeight)
    //   {
    //         minScroll = this.fHeight - (this.friendCount * this.entryHeight);
    //   }
    // else
    //   {
    //     minScroll = 0;
    //   }
    // if(this.scrollHeight < minScroll)
    // {
    //   this.scrollHeight -= (this.scrollHeight - minScroll) * .85;
    // }
    // else if (this.scrollHeight > 0)
    //   {
    //     this.scrollHeight *= 0.45;
    //   }
  }
  populate(friendData2)
  {
    let friendData = [];
    arrayCopy(friendData2,friendData);
    // /constructor(name, liftData, faceImage, shirtColor, skinColor)
    //userName, shirtColor, skinColor, faceType, workoutData, friendList)
    print(currentUser);
    append(friendData, (new Friend(currentUser.userName, userLiftData, currentUser.faceType, currentUser.shirtColor, currentUser.skinColor)));
    let buttonWidth = this.fWidth / 4;
    this.entries = friendData; // maybe change later
    this.friendCount = friendData.length;
    if(this.friendCount <= this.maxShownEntries)
      {
        this.maxScroll = this.fHeight;
      }
    let sortedList = [];
    this.totalLifts = [];
    for(let i = 0; i < this.friendCount; i++)
      {
        let totalLift = 0;
        for(let f = 0; f < 5; f++)
        {
          totalLift += this.entries[i].liftData.dat[f];
        }
        totalLift += 1*i;
        append(sortedList, totalLift);
        append(this.totalLifts, totalLift);
      }
    sortedList = sort(sortedList);
    sortedList.reverse();
    for(let i = 0; i < this.friendCount; i++)
      {
        for(let f = 0; f < this.friendCount; f++)
        {
          if(sortedList[i] == this.totalLifts[f])
            {
              this.sortedIndex[i] = f;
            }
        }
      }
    // for(let i = 0; i < this.friendCount; i++)
    //   {
    //     let newButton = new Button("Compare", (this.x + this.fWidth / 2) - buttonWidth * 1.2, 0, buttonWidth, this.entryHeight * 0.6, 20);
    //     append(this.friendButtons, newButton);
    //   }
  }
}
class userData
{
  constructor(userName, shirtColor, skinColor, faceType, workoutData, friendList)
  {
    this.userName = userName;
    this.shirtColor = shirtColor;
    this.skinColor = skinColor;
    this.faceType = faceType;
    this.workoutData = workoutData;
    this.friendList = "";
  }
}
class statsTab
{
  constructor(x, y, fWidth, fHeight)
  {
    this.x = x;
    this.y = y;
    this.fWidth = fWidth;
    this.fHeight = fHeight;
    this.entries = [];
    this.maxShownEntries = 5;
    this.entryOffset = 0;
    this.entryHeight = fHeight * 1/this.maxShownEntries + this.entryOffset;
    this.tabColor = color(255,255,255,100);
    this.scrollVelocity = 0;
    this.scrollY = 0;
    this.maxScroll = fWidth;
    this.plusButtons = [];
    this.minusButtons = [];
    this.acceptButtons = [];
    this.tempStats = [0,0,0,0,0];
    this.scrollHeight = 0;
    this.liftCount = 5;
  }
  drawTab()
  {
    for(let i = 0; i < this.liftCount; i++)
      {
        let yPos = this.y - (this.fHeight / 2) + ((this.entryHeight) * (1+i)) - this.entryOffset / 2 + this.scrollHeight;
        let xPos = this.x// - this.fWidth / 2;
        let imgSize = this.fHeight * 0.09;
        fill(this.tabColor);
        // stroke(0,0,0,40);
        noStroke();
        rect(xPos, yPos, this.fWidth, this.entryHeight * 0.95,3);
        //
        // image(this.entries[i].getFace(), xPos - this.fWidth/2 + imgSize * 0.6,yPos, imgSize, imgSize);
        //
        this.plusButtons[i].updateY(yPos+(this.entryHeight * 0.3))
        this.minusButtons[i].updateY(yPos+(this.entryHeight * 0.3))
        this.acceptButtons[i].updateY(yPos+(this.entryHeight * 0.3))
        this.plusButtons[i].render();
        this.minusButtons[i].render();
        this.acceptButtons[i].render();
        //
        noStroke();
        fill(0);
        textAlign(LEFT);
        textSize(45);
        text(int(this.entries.dat[i]) + this.tempStats[i], xPos - this.fWidth/2 + imgSize * 1.5, yPos);
        textSize(35);
        text(this.entries.names[i], xPos - this.fWidth/2 + imgSize *.3, yPos);
      }
    this.scrollHeight += this.scrollVelocity;
    this.scrollVelocity *= 0.4;
    let minScroll = 0;
    if(this.liftCount * this.entryHeight > this.fHeight)
      {
            minScroll = this.fHeight - (this.liftCount * this.entryHeight);
      }
    else
      {
        minScroll = 0;
      }
    if(this.scrollHeight < minScroll)
    {
      this.scrollHeight -= (this.scrollHeight - minScroll) * .85;
    }
    else if (this.scrollHeight > 0)
      {
        this.scrollHeight *= 0.45;
      }
  }
  updateVelocity(addVel)
  {
    this.scrollVelocity -= 0.01 * addVel; 
  }
  populate(liftData)
  {
    let textWidth = this.fWidth / 4;
    let smallWidth = this.fWidth / 6;
    this.entries = liftData;
    // this.liftCount = liftData.names.length; //not ndeeded
    this.maxScroll = this.fHeight;
    //buttonWidth
    let buttonWidth = (this.fWidth * .6) / 3;
    for(let i = 0; i < this.liftCount; i++)
      {
        let plusButton = new Button("+", this.x - buttonWidth /2, 0, buttonWidth * 0.9, this.entryHeight * 0.6, 35);
        let minusButton = new Button("-", this.x + buttonWidth - buttonWidth / 2, 0, buttonWidth * 0.9, this.entryHeight * 0.6, 35);
        let applyButton = new Button("Apply", this.x + buttonWidth * 2 - buttonWidth / 2, 0, buttonWidth * 0.9, this.entryHeight * 0.6, 35);
        append(this.plusButtons,plusButton);
        append(this.minusButtons,minusButton);
        append(this.acceptButtons,applyButton);
        // append(this.friendButtons, newButton);
      }
  }
}
class liftStats
{
  constructor(newDat)
  {
    this.names = ["Squat", "Bench", "Deadlift", "Curl", "OHP"];
    this.dat = newDat;
  }
  updateStats(index, val)
  {
    this.dat[index] = val;
  }
  get(index)
  {
    return this.dat[index];
  }
}


function draw_chart(usernames, lifter_data,x, y, x_width, y_height, colors) { 
  //console.log("START" );=
  //console.log("L00: " + lifter_data);
  max_weight = 0;
  for (li= 0; li  < lifter_data.length; li++){
    for(lj= 0; lj < lifter_data[li].length; lj++){
          //console.log(" Wt: " + lifter_data[li][lj][1]);
        if (lifter_data[li][lj][1] > max_weight){
          max_weight = lifter_data[li][lj][1];
        }
    }
  }
  graph_page(x,y,x_width, y_height, lifter_data,"Lift","Weight", usernames, colors);
  
}

function graph_page(x_cord, y_cord, x_width, y_height, lifter_data , x_label, y_label, usernames, colors){
  // fill("white");
  // stroke("black");
  noStroke();
  fill(255,255,255,50);
  rect(x_cord, y_cord, x_width, y_height);
  // colors = ["black", "red", "blue" , "purple", "pink" , "orange"];
  fill("");
  stroke("black");
//   let size = 100;

//   rect(x_cord + x_width -size *2, y_cord + y_height -size, size*2, size);
  

  //draw_graph(x_cord, y_cord, x_width, y_height, lifter_data[0])
  //console.log(lifter_data.length);
  for(n=0; n< lifter_data.length; n++){
      //console.log("L1: " + lifter_data);
      draw_graph(x_cord, y_cord, x_width, y_height, lifter_data[n] , colors[n]);
      // create_legend(x_cord, y_cord, x_width, y_height ,usernames[n], colors[n] , n+1, size);
  }
  fill("black");
  generate_x_axis(x_cord, y_cord, x_width, y_height, x_label);
  generate_y_axis(x_cord, y_cord, x_width, y_height, y_label);

  
}

function create_legend(x_cord, y_cord, x_width, y_height, username, color, user_number, size){
  //rect(x_cord + x_width -size *2, y_cord + y_height -size, size*2, size);

  //console.log("Create_legend called");
  stroke("black");
  textSize(20);
  textAlign(CENTER,CENTER);
  text(username + "= ", x_cord - x_width, y_cord - y_height + size * 2 + 20*user_number);
  fill(color);
  noStroke();
  rect(x_cord + x_width - size *2 + username.length* 6+ 40  , y_cord + y_height -size + 20*user_number -5  , 15 ,15 );

}


function generate_x_axis(x_cord, y_cord, x_width, y_height, x_label){
  // months = ["", "Feb","Mar", "Apr", "May","Jun", "Jul", "Aug", "Sep", "Oct", "Nov","Dec"];
  labels = ["Squat", "Bench", "Deadlift", "Curl", "OHP"];
  textSize(15);
  textStyle(NORMAL);
  for(i = 0; i < labels.length; i++)
  {
    stroke("black");
    line(x_cord + i*(x_width/5), y_cord+y_height, x_cord + i*(x_width/5), y_cord+ y_height -10);
    noStroke();
    text(labels[i], x_cord+ i*(x_width/5) , y_cord+y_height- 25);  
  }
  noStroke();
  text(x_label, x_cord + x_width * 0.5 -5 , y_cord + y_height + 40);
}

function generate_y_axis(x_cord, y_cord, x_width, y_height, y_label){
    textSize(15);
    textStyle(NORMAL);
    for(i = 0; i < max_weight/20; i++){
      stroke("black");
      line(x_cord + x_width, y_cord+y_height - i * (y_height/(max_weight/20)), x_cord + x_width - 10, y_cord+y_height - i * (y_height/(max_weight/20)));
      noStroke();
      if( i != 0){
      text( i*20, x_cord+ x_width - 25, y_cord+y_height - i * (y_height/(max_weight/20)) + 5) ;  
      }
    }
    noStroke();
    noStroke();
    text(y_label, x_cord + x_width + 50 , y_cord + y_height * 0.5 - 35);

}

//Draw one graph at a time
function draw_graph(x_cord, y_cord, x_width, y_height,lifter_data, color){
    //console.log(lifter_data);
    x_data = [];
    y_data = [];
    //Translate the points to the desired scale
    //console.log("110: " + lifter_data);
    for (i=0;i<lifter_data.length;i++){
        x_data.push(lifter_data[i][0] * (x_width/5));
        y_data.push(lifter_data[i][1] * (y_height/max_weight));
        //console.log(y_data);

    }
    //console.log("X data: " + x_data );
    //console.log("Y data: " + y_data + " Y_cord: " + y_cord);
    drawLines(x_data,y_data, x_width, y_height, x_cord, y_cord , color);
    drawEllipses(x_data,y_data, x_width, y_height, x_cord, y_cord);


}

function drawEllipses(x_data,y_data, x_width, y_height , x_cord, y_cord){
  
 
  noStroke();
    // draw ellipses
  var circle_size = (width/1000) * 20
  for(let i =0; i < x_data.length; i++){
      fill(0,0,0,30);
      ellipse(x_cord  + x_data[i] ,  y_cord + y_height  - y_data[i] , circle_size);
    fill(0,0,0,100);
    ellipse(x_cord  + x_data[i] ,  y_cord + y_height  - y_data[i] , circle_size/4);
      //console.log("Ellipse drawn");

  }
}

function drawLines(x_data,y_data, x_width, y_height , x_cord, y_cord, color ){
  stroke(color);
  //fill("red");
  //draw lines
  strokeWeight(10);
  let px = x_data[0];
  let py = y_data[0];

  for(let i =0; i < x_data.length; i++){
    
    line(px+ x_cord, y_cord + y_height -py , x_data[i]+x_cord, y_cord+y_height -y_data[i]);
    //console.log("Line drawn");
  	//store the last position
    px = x_data[i];
    py = y_data[i];
  } 
}
//
function fillData(uDat)
{
  let userDat = new liftStats([int(uDat.squat), int(uDat.bench), int(uDat.deadlift), int(uDat.curl), int(uDat.ohp)]);
  userLiftData = userDat;
  statTab.populate(userLiftData);
  let curUser = new userData(uDat.username, parseCColor(uDat.shirtColor), parseCColor(uDat.skinColor), int(uDat.faceType), userLiftData, uDat.friends);
  currentUser = curUser;
}
class UserData
{
  constructor(username, friends, curl , bench, squat, deadlift,ohp, email, password, shirtCol, skinCol, faceType)
  {
    this.username = username;
    this.friends = friends;
    this.curl = curl;
    this.bench = bench; 
    this.squat = squat;
    this.deadlift = deadlift;
    this.ohp = ohp;
    this.email = email;
    this.password = password;
    this.shirtColor = shirtCol;
    this.skinColor = skinCol;
    this.faceType = faceType;
  }
  parseColor(Val)
  {
    let val = str(Val);
    let newVal = Val.substring(2,val.length-2);
    let goodVals = split(newVal, ',');
    return color(int(goodVals[1]), int(goodVals[2]), int(goodVals[3]), 255);
  }
  setShirtColor(val)
  {
    this.shirtColor = this.parseColor(val);
  }
  setSkinColor(val)
  {
    this.skinColor = this.parseColor(val);
  }
}
function hasFriend(friendName)
{
  for(let i = 0; i < friendList.length; i++)
    {
      if(str(friendList[i].name).toLowerCase() == friendName.toLowerCase())
        {
          return true;
        }
    }
  return false;
}
function getNewFriend(userDat, friendName)
{
  let foundFriend = false;
  for(let r = 0; r < userDat.length; r++)
    {
        let curr_row = userDat[r];
        let user1 = new UserData();
        user1.username = JSON.parse(curr_row.Username);
        user1.friends = JSON.parse(curr_row.Friends);
        user1.shirtColor = str(curr_row.Shirt_Color);
        user1.skinColor = str(curr_row.Skin_Color);
        user1.faceType = int(JSON.parse(curr_row.Face_Number));
        user1.curl = JSON.parse(curr_row.Curl);
        user1.bench = JSON.parse(curr_row.Bench);
        user1.squat =JSON.parse(curr_row.Squat);
        user1.deadlift = JSON.parse(curr_row.Deadlift);
        user1.ohp= JSON.parse(curr_row.OHP);
        
        user1.email= JSON.parse(curr_row.Email);
        user1.password= JSON.parse(curr_row.Password);
        if(friendName.toLowerCase() == user1.username.toLowerCase() && !hasFriend(friendName.toLowerCase()))
          {
            foundFriend = true;
            addFriendTabO.addFriendTB.setTextTemp("added successfully...",25);
            createUserFriend(user1);
            break;
          }
    }
  if(foundFriend == false)
    {
      addFriendTabO.addFriendTB.setTextTemp("no user found...",25);
    }
}
function populateFriends(userDat, friendList)
{
  for(let r = 0; r < userDat.length; r++)
    {
      let curr_row = userDat[r];
        let user1 = new UserData();
        user1.username = JSON.parse(curr_row.Username);
        user1.friends = JSON.parse(curr_row.Friends);
        user1.shirtColor = str(curr_row.Shirt_Color);
        user1.skinColor = str(curr_row.Skin_Color);
        user1.faceType = int(JSON.parse(curr_row.Face_Number));
        user1.curl = JSON.parse(curr_row.Curl);
        user1.bench = JSON.parse(curr_row.Bench);
        user1.squat =JSON.parse(curr_row.Squat);
        user1.deadlift = JSON.parse(curr_row.Deadlift);
        user1.ohp= JSON.parse(curr_row.OHP);
        user1.email= JSON.parse(curr_row.Email);
        user1.password= JSON.parse(curr_row.Password);
        if(friendList.includes(user1.username))
          {
            createUserFriend(user1);
          }
    }
}
function storeDB()
{
  getData(0);
  // storedDatabase = userDat;
}
function loginAttempt(userDat)
{
  let loginSuccess = false;
  for(let r = 0; r < userDat.length; r++)
    {
        let curr_row = userDat[r];
        let user1 = new UserData();
        user1.username = JSON.parse(curr_row.Username);
        user1.friends = JSON.parse(curr_row.Friends);
        user1.shirtColor = str(curr_row.Shirt_Color);
        user1.skinColor = str(curr_row.Skin_Color);
        user1.faceType = int(JSON.parse(curr_row.Face_Number))
        user1.curl = JSON.parse(curr_row.Curl);
        user1.bench = JSON.parse(curr_row.Bench);
        user1.squat =JSON.parse(curr_row.Squat);
        user1.deadlift = JSON.parse(curr_row.Deadlift);
        user1.ohp= JSON.parse(curr_row.OHP);
        user1.email= JSON.parse(curr_row.Email);
        user1.password= JSON.parse(curr_row.Password);
        if(user1.username.toLowerCase() == attemptUsername.toLowerCase() && user1.password.toLowerCase() == attemptPassword.toLowerCase())
          {
            loginSuccess = true;
            // fillData(user1);
            
            populateFriends(userDat, user1.friends);
            storedDatabase = userDat;
            finishLogin(1,user1);
            break;
          }
    }
  if(!loginSuccess)
    {
      finishLogin(0,null);
    }
}
function tryLogin()
{
  userDat = getData(0);
  // if(foundUser){return userDat;}else{return null;}
}

async function getData(userVar)
{
  await read(userVar,"Username");
  //
  // return user1;
}

function successFunc(data){
  // parsed is the parsed array
  parsed = JSON.parse(data[rat][cat])
  // curr_row is the row (unparsed)
  // curr_row = data[rat]
  loginAttempt(data);
  storedDatabase = data;
}

function errorFunc(e) 
{
  console.log(e);
}

async function read(row,col)
{
  // row is a number
  // col is a column name
  cat = col
  rat = row
  await Sheetsu.read("https://sheetsu.com/apis/v1.0bu/c9e30468d9a8/", {}).then(successFunc, errorFunc);
  return parsed
}



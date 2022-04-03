class Button
{
  constructor(buttonText, x, y, buttonWidth, buttonHeight, buttonTextSize, buttonImage)
  {
    this.buttonText = buttonText;
    this.x = x;
    this.y = y;
    this.buttonWidth = buttonWidth;
    this.buttonHeight = buttonHeight;
    this.img = buttonImage;
    this.buttonTextSize = buttonTextSize;
    this.enabled = true;
  }
  render()
  {
    if(this.enabled)
      {
        if(this.img == null)
          {
            noStroke();
            rectMode(CENTER);
            if(this.isOver()){fill(160);}else{fill(240);}
            rect(this.x + this.buttonWidth / 2, this.y - this.buttonHeight / 2, this.buttonWidth, this.buttonHeight, 3);
            textAlign(CENTER, CENTER);
            textSize(this.buttonTextSize);
            fill(0);
            text(this.buttonText, this.x + this.buttonWidth / 2, this.y - this.buttonHeight / 2);
          }
        else
          {
            noStroke();
            imageMode(CENTER);
            if(isOver()){tint(color(100));}
            image(this.buttonImage, this.x, this.y, this.buttonWidth, this.buttonHeight);
          }
      }
  }
  isOver()
  {
    let xDist = mouseX - this.x;
    let yDist = this.y - mouseY;
    return(xDist > 0 && xDist <= this.buttonWidth && yDist > 0 && yDist <= this.buttonHeight);
  }
  enable()
  {
    this.enabled = true;
  }
  disable()
  {
    this.enabled = false;
  }
  updateY(newY)
  {
    this.y = newY;
  }
  updateX(newX)
  {
    this.x = newX;
  }
}
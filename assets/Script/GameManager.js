var randomParagraph = require('random-paragraph');
cc.Class({
  extends: cc.Component,

  properties: {
    avatar: cc.Sprite,
    arrow: cc.Node,
    userName: cc.Label,
    content: cc.Label,
    inputField: cc.EditBox,
    index: 0,
    Cover: cc.Sprite,
    time: 60,
    timer: 60,
    isStart: true,
    timeText: cc.Label,
    scoreTxt: cc.Label,
    wpmDisplay: cc.Node
  },


  onLoad() {
    this.content.richText = true;
    let string= randomParagraph({ sentences: 1 });
    this.Words = string.trim().split(/\s+/).filter(word => word.length > 0);
    this.content.string= this.Words[this.index]
    this.greenToYellow = 0;
    this.yellowToRed = 0;
    this.correctWords = 0;
    this.wrongWords = 0;
    this.scoreTxt.string = "Correct:" + this.correctWords;
    this.getPosition(this.Words[this.index]);
  },
  start() {

  },
  onTextChanged(event) {
    let string = this.inputField.string;
    if (string[string.length - 1] == " ") {
      let value = this.inputField.string.trim();
      this.inputField.string = '';
      this.inputField.blur();
      this.inputField.focus();
      console.log(this.inputField.string);
      this.CheckWord(value);
    }
  },
  CheckWord(word) {
    if (word == this.Words[this.index]) {
      this.correctWords++;
      this.scoreTxt.string = "Correct:" + this.correctWords;
    } else {
      this.wrongWords++;
    }
    this.index++;
    this.content.string= this.Words[this.index];
    this.getPosition(this.Words[this.index]);
  },
  onEnable() {
    this.jsonString = cc.sys.localStorage.getItem("playerData");
    this.jsonData = null;
    if (this.jsonString) {
      this.jsonData = JSON.parse(this.jsonString);
      this.userName.string = this.jsonData.name;
      this.avatar.getComponent("LoadAtlas").changeAvatar(this.jsonData.imageIndex);
    } else {
      cc.error("Không thấy data");
    }
  },
  getPosition(string) {
    let searchString = string;
    let labelText = this.content.string;
    let startIndex = labelText.indexOf(searchString);
    cc.log(startIndex);
    let x =10 * startIndex;
    let y = (10 * startIndex) / 500;
  
    if (y > 1) {
      x = x - y * 500;
      y
    }else{
      y=0;
    }
    cc.log("x:", x);
    cc.log("y:", y);
    this.arrow.x = x;
    this.arrow.y = -(Math.floor(y) * 10) + 10;
    cc.log("Arrow:", this.arrow.position);
  },
  update(dt) {
    if (this.isStart) {
      this.timer -= dt;
      let ratio = this.timer / this.time;
      if (ratio > 0.4) {
        this.greenToYellow += (255 / (0.6 * this.time)) * dt;
        if (this.greenToYellow > 1) {
          let newRed = this.Cover.node.color.r + this.greenToYellow;
          this.Cover.node.color = cc.color(newRed, 255, 0);
          this.greenToYellow = 0;
        }
      }
      if (ratio <= 0.4 && this.timer / this.time > 0.1) {
        this.yellowToRed += (255 / (0.3 * this.time)) * dt;
        if (this.yellowToRed > 1) {
          let newGreen = this.Cover.node.color.g - this.yellowToRed;
          if (newGreen <= 0) {
            newGreen = 0;
          }
          this.Cover.node.color = cc.color(255, newGreen, 0);
          this.yellowToRed = 0;
        }
      }
      // if(ratio<=0.1){
      //     this.Cover.node.color=cc.Color.RED;
      //  }
      if (this.timer <= 0) {
        this.inputField.blur();
        this.timer = 0;
        this.isStart = false;
        this.wpmDisplay.active = true;
        this.wpmDisplay.getComponent("WPMScore").display(this.correctWords, this.wrongWords);
      }
      this.Cover.fillRange = ratio;
    }
  },
});

var randomParagraph = require('random-paragraph');
cc.Class({
  extends: cc.Component,

  properties: {
    avatar: cc.Sprite,
    userName: cc.Label,
    content: cc.Label,
    inputField: cc.EditBox,
    index: 0,
    timeAttack: 7,
    timerShark:0,
    timer:0,
    timerPlay: 0,
    isStart: true,
    isWait:false,
    isEnd:false,
    scoreTxt: cc.Label,
    wpmDisplay: cc.Node,
    player:cc.Node,
    shark:cc.Node
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
    this.scoreTxt.string = "Score:" + this.correctWords;
  },
  start() {

  },
  onTextChanged(event) {
    let string = this.inputField.string;
    if (string[string.length - 1] == " ") {
      let value = this.inputField.string.trim();
      if(this.isWait==false){
        this.inputField.string = '';
        this.inputField.blur();
        this.inputField.focus();
        this.CheckWord(value);
      }else{
        this.inputField.string = value;
        this.inputField.blur();
        this.inputField.focus();
      }
      
    }
  },
  CheckWord(word) {
    if (word == this.Words[this.index]) {
      this.correctWords++;
      this.scoreTxt.string = "Score:" + this.correctWords;
      this.shark.getComponent('Shark').getHit(1);
      this.player.getComponent('Player').attack();
      this.shark.getComponent('Shark').engryControl(0.1,0);
      this.timerShark=0;
      this.blockEdittext();
      this.isWait=true;
    } else {
      this.wrongWords++;
      this.blockEdittext()
      this.isWait=true;
      this.shark.getComponent('Shark').attack();
      this.shark.getComponent('Shark').engryControl(0.1,0);
      this.player.getComponent('Player').getHit(1,0.1);
      this.timerShark=0;
      if(this.player.getComponent('Player').heath<=0){
        this.player.getComponent('Player').die(1);
        this.isEnd=true;
      }
    }
    this.index++;
    if(this.index%5==0&&this.timeAttack>3)this.timeAttack--
    if(this.index!=this.Words.length){
        this.content.string= this.Words[this.index];
    }else{
      this.blockEdittext();
      this.isWait=true;
      this.scoreTxt.string = "Score:" + this.correctWords;
      this.shark.getComponent('Shark').die(1);
      this.player.getComponent('Player').attack();
      this.shark.getComponent('Shark').engryControl(0.1,0);
      this.isEnd=true;
      //chiến thắng tính điểm
    }
  },
  onEnable() {
    this.inputField.focus();
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
  blockEdittext(){
    this.inputField.node.opacity=100;
  },
  openEditText(){
    this.inputField.node.opacity=255;
  },
  update(dt) {
    if(this.isEnd==true){
      if(this.player.getComponent('Player').isDeath==true||this.shark.getComponent('Shark').isDeath==true){
        this.wpmDisplay.active=true;
        this.wpmDisplay.getComponent('WPMScore').display(this.correctWords,this.wrongWords,this.timerPlay)
      }
    }
    if(this.shark.getComponent('Shark').checkAction()){
      
      this.openEditText();
      this.isWait=false;
    }
    if (this.isStart&&this.isWait==false&&this.isEnd==false) {
      this.timer+=dt;
      this.timerPlay+=dt;
      this.timerShark+=dt;
      if(this.timer>=1){
        this.timer=0;
        const alpha=parseFloat((this.timerShark/this.timeAttack).toFixed(1));
        this.shark.getComponent('Shark').engryControl(0.5,alpha);
        if(alpha>=1){
          this.shark.getComponent('Shark').attack();
          this.player.getComponent('Player').getHit(1,0.1);
          this.shark.getComponent('Shark').engryControl(0.1,0);
          if(this.player.getComponent('Player').heath<=0.01){
            this.player.getComponent('Player').die(1);
            this.isEnd=true;
          }
          this.timerShark=0;
          this.blockEdittext()
          this.isWait=true;
        }
      }
    }
  },
});

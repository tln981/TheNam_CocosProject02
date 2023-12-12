"use strict";
cc._RF.push(module, 'cc3980h291G0Yd3GKNp7WbX', 'ChosseAvatar');
// Script/ChosseAvatar.js

"use strict";

// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
   extends: cc.Component,

   properties: {
      loadAvatar: cc.Node,
      index: 0
   },

   // LIFE-CYCLE CALLBACKS:

   // onLoad () {},

   start: function start() {},
   setAvatar: function setAvatar() {
      this.loadAvatar.getComponent("LoadAtlas").changeAvatar(this.index);
   }
   // update (dt) {},

});

cc._RF.pop();
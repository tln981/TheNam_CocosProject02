"use strict";
cc._RF.push(module, 'c2b64mHOuNHTYovAz7NKNKN', 'SaveData');
// Script/SaveData.js

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
        avatar: cc.Node,
        nameEditbox: cc.EditBox
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        this.playerData = {
            name: "",
            imageIndex: 0
        };
        this.jsonString = '';
    },
    start: function start() {},
    saveData: function saveData() {
        this.playerData.name = this.nameEditbox.string;
        this.playerData.imageIndex = this.avatar.getComponent("LoadAtlas").indexAvatar;
        this.jsonString = JSON.stringify(this.playerData);
        cc.sys.localStorage.setItem("playerData", this.jsonString);
    }
    // update (dt) {},

});

cc._RF.pop();
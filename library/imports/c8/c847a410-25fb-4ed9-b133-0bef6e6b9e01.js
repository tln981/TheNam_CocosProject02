"use strict";
cc._RF.push(module, 'c847aQQJftO2bEzC+9ua54B', '_OnOffChoseAvatar');
// Script/_OnOffChoseAvatar.js

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
        choseAvatar: cc.Node
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        this.isOpen = false;
    },
    start: function start() {},
    openChoseAvatar: function openChoseAvatar() {
        this.isOpen = !this.isOpen;
        this.choseAvatar.active = this.isOpen;
    }
    // update (dt) {},

});

cc._RF.pop();
(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/LoadAtlas.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'a344a7xu2lHDJCLWvnmZp4d', 'LoadAtlas', __filename);
// Script/LoadAtlas.js

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
        avatar: cc.SpriteAtlas,
        indexAvatar: 0
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        this.spriteFrames = this.avatar.getSpriteFrames();
        this.changeAvatar(this.indexAvatar);
    },
    start: function start() {},
    update: function update(dt) {},
    changeAvatar: function changeAvatar(index) {
        if (isNaN(index)) {
            this.indexAvatar++;
            index = this.indexAvatar;
        }
        if (this.indexAvatar >= this.spriteFrames.length) {
            this.indexAvatar = 0;
            index = this.indexAvatar;
        } else {
            this.indexAvatar = index;
        }
        this.node.getComponent(cc.Sprite).spriteFrame = this.spriteFrames[index];
    }
});

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=LoadAtlas.js.map
        
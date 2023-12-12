(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/Player.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'b1806Oa3RZOVaC/6SRJC9mw', 'Player', __filename);
// Script/Player.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        spineboy: sp.Skeleton,
        hpBar: cc.ProgressBar,
        heath: 1
    },
    onLoad: function onLoad() {
        this.spineboy = this.node.getComponent(sp.Skeleton);
        this.spineboy.setAnimation(0, "idle", true);
        this.isDeath = null;
    },
    start: function start() {
        //this.die(0.5);
    },
    attack: function attack() {
        this.spineboy.setAnimation(1, 'shoot', false);
        //this.spineboy.setAnimation(0, "idle", true);
    },
    getHit: function getHit(duration, damage) {
        var _this = this;

        this.heath -= damage;
        if (this.heath < 0) {
            this.heath = 0;
            this.die(duration);
        } else {
            var action = cc.sequence(cc.delayTime(0.7), cc.spawn(cc.callFunc(function () {
                return _this.flash(duration);
            }), cc.callFunc(function () {
                cc.tween(_this.hpBar).to(duration, { progress: _this.heath }).start();
            }), cc.callFunc(function () {
                _this.spineboy.setAnimation(1, "run-to-idle", false);
            })));

            this.node.runAction(action);
        }
    },
    flash: function flash(duration) {
        var _this2 = this;

        var action = cc.sequence(cc.callFunc(function () {
            _this2.node.color = cc.Color.RED;
        }), cc.delayTime(duration / 6), cc.callFunc(function () {
            _this2.node.color = cc.Color.WHITE;
        }), cc.delayTime(duration / 6)).repeat(3);
        this.node.runAction(action);
    },
    die: function die(duration) {
        var _this3 = this;

        this.isDeath = false;
        var action = cc.callFunc(function () {
            cc.tween(_this3.hpBar).to(duration, { progress: 0 }).call(function () {
                _this3.spineboy.clearTracks();
                _this3.spineboy.setAnimation(0, "death", false);
            }).start();
        });
        this.node.runAction(action);
    },
    checkDeath: function checkDeath() {
        this.spineboy.setCompleteListener(function (entry) {
            if (entry.animation.name == "death") {
                return true;
            }
            return false;
        });
    },
    update: function update(dt) {
        var _this4 = this;

        if (this.isDeath == false) {
            this.spineboy.setCompleteListener(function (entry) {
                if (entry.animation.name == "death") {
                    _this4.isDeath = true;
                }
            });
        }
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
        //# sourceMappingURL=Player.js.map
        
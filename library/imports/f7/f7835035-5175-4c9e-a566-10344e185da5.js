"use strict";
cc._RF.push(module, 'f7835A1UXVMnqVmEDROGF2l', 'Shark');
// Script/Shark.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        shark: sp.Skeleton,
        engryBar: cc.ProgressBar

    },
    onLoad: function onLoad() {
        this.shark = this.node.getComponent(sp.Skeleton);
        var anim = this.shark.setAnimation(0, 'Attack_3', true);
        anim.timeScale = 0.3, this.action = false;
        this.isDeath = null;
    },
    start: function start() {},
    attack: function attack() {
        var _this = this;

        cc.tween(this.engryBar).to(1, { progress: 0 }).start();
        this.shark.setAnimation(0, 'Walk', true);
        var action = cc.sequence(cc.callFunc(function () {
            cc.tween(_this.node).to(0.5, { x: 300 }).call(function () {
                _this.shark.setAnimation(0, 'Attack_1', false);
            }).start();
        }), cc.callFunc(function () {
            _this.shark.setCompleteListener(function (entry) {
                if (entry.animation.name == "Attack_1") {
                    _this.shark.setAnimation(0, 'Walk', true);
                    cc.tween(_this.node).to(0.5, { x: 840 }).call(function () {
                        var anim = _this.shark.setAnimation(0, 'Attack_3', true);
                        anim.timeScale = 0.3;
                        _this.action = true;
                    }).start();
                }
            });
        }));
        this.node.runAction(action);
    },
    getHit: function getHit(duration) {
        var _this2 = this;

        var action = cc.callFunc(function () {
            return _this2.flash(duration);
        });
        this.node.runAction(action);
        this.schedule(function () {
            if (action.isDone()) {
                this.action = true;
                this.unscheduleAllCallbacks();
            }
        }, 0.16);
    },
    flash: function flash(duration) {
        var _this3 = this;

        var action = cc.sequence(cc.callFunc(function () {
            _this3.node.color = cc.Color.RED;
        }), cc.delayTime(duration / 6), cc.callFunc(function () {
            _this3.node.color = cc.Color.WHITE;
        }), cc.delayTime(duration / 6)).repeat(3);
        this.node.runAction(action);
    },
    die: function die(duration) {
        var _this4 = this;

        var action = cc.spawn(cc.callFunc(function () {
            return _this4.flash(duration);
        }), cc.callFunc(function () {
            _this4.shark.setAnimation(0, 'Dead', false);
            _this4.isDeath = false;
        }));
        this.node.runAction(action);
    },
    engryControl: function engryControl(duration, engry) {
        var _this5 = this;

        var action = cc.callFunc(function () {
            cc.tween(_this5.engryBar).to(duration, { progress: engry }).start();
        });
        this.node.runAction(action);
    },
    checkAction: function checkAction() {
        if (this.action) {
            this.action = false;
            return true;
        }
        return false;
    },
    update: function update(dt) {
        var _this6 = this;

        if (this.isDeath == false) {
            this.shark.setCompleteListener(function (entry) {
                if (entry.animation.name == "Dead") {
                    _this6.isDeath = true;
                }
            });
        }
    }
});

cc._RF.pop();
cc.Class({
    extends: cc.Component,

    properties: {
        shark: sp.Skeleton,
        engryBar: cc.ProgressBar,

    },
    onLoad() {
        this.shark = this.node.getComponent(sp.Skeleton);
        let anim = this.shark.setAnimation(0, 'Attack_3', true);
        anim.timeScale = 0.3,
            this.action = false;
        this.isDeath = null;
    },
    start() {
    },
    attack() {
        cc.tween(this.engryBar)
            .to(1, { progress: 0 })
            .start()
        this.shark.setAnimation(0, 'Walk', true);
        let action = cc.sequence(
            cc.callFunc(() => {
                cc.tween(this.node)
                    .to(0.5, { x: 300 })
                    .call(() => {
                        this.shark.setAnimation(0, 'Attack_1', false);
                    })
                    .start();
            })
            ,
            cc.callFunc(() => {
                this.shark.setCompleteListener((entry) => {
                    if (entry.animation.name == "Attack_1") {
                        this.shark.setAnimation(0, 'Walk', true);
                        cc.tween(this.node)
                            .to(0.5, { x: 840 })
                            .call(() => {
                                let anim = this.shark.setAnimation(0, 'Attack_3', true);
                                anim.timeScale = 0.3
                                this.action = true;
                            }
                            )
                            .start();
                    }
                })
            },
            )
        )
        this.node.runAction(action);
    },
    getHit(duration) {
        let action = cc.callFunc(() => this.flash(duration))
        this.node.runAction(action);
        this.schedule(function () {
            if (action.isDone()) {
                this.action = true
                this.unscheduleAllCallbacks();
            }
        }, 0.16);
    },
    flash(duration) {
        let action = cc.sequence(
            cc.callFunc(() => {
                this.node.color = cc.Color.RED;
            }),
            cc.delayTime(duration / 6),
            cc.callFunc(() => {
                this.node.color = cc.Color.WHITE;
            }),
            cc.delayTime(duration / 6),
        ).repeat(3)
        this.node.runAction(action)
    },
    die(duration) {
        let action = cc.spawn(
            cc.callFunc(() => this.flash(duration)),
            cc.callFunc(() => {
                this.shark.setAnimation(0, 'Dead', false);
                this.isDeath = false;
            }))
        this.node.runAction(action);
    },
    engryControl(duration, engry) {
        let action = cc.callFunc(() => {
            cc.tween(this.engryBar)
                .to(duration, { progress: engry })
                .start()
        })
        this.node.runAction(action)
    },
    checkAction() {
        if (this.action) {
            this.action = false;
            return true
        }
        return false
    },

    update(dt) {
        if (this.isDeath == false) {
            this.shark.setCompleteListener((entry) => {
                if (entry.animation.name == "Dead") {
                    this.isDeath = true;
                }
            })

        }
    }
});

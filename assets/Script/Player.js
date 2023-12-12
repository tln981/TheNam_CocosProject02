cc.Class({
    extends: cc.Component,

    properties: {
        spineboy: sp.Skeleton,
        hpBar: cc.ProgressBar,
        heath: 1
    },
    onLoad() {
        this.spineboy = this.node.getComponent(sp.Skeleton);
        this.spineboy.setAnimation(0, "idle", true);
        this.isDeath=null;
    },
    start() {
        //this.die(0.5);
    },
    attack() {
        this.spineboy.setAnimation(1, 'shoot', false);
        //this.spineboy.setAnimation(0, "idle", true);
    },
    getHit(duration, damage) {
        this.heath -= damage
        if (this.heath < 0) {
            this.heath = 0;
            this.die(duration);
        } else {
            let action = cc.sequence(
                cc.delayTime(0.7),
                cc.spawn(
                    cc.callFunc(() => this.flash(duration)),
                    cc.callFunc(() => {
                        cc.tween(this.hpBar)
                            .to(duration, { progress: this.heath })
                            .start()
                    }),
                    cc.callFunc(() => {
                        this.spineboy.setAnimation(1, "run-to-idle", false);
                    }),
                )
            )

            this.node.runAction(action);
        }
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
        this.isDeath = false;
        let action = cc.callFunc(() => {
            cc.tween(this.hpBar)
                .to(duration, { progress: 0 })
                .call(() => {
                    this.spineboy.clearTracks();
                    this.spineboy.setAnimation(0, "death", false);
                })
                .start()
        })
        this.node.runAction(action);

    },
    checkDeath() {
        this.spineboy.setCompleteListener((entry) => {
            if (entry.animation.name == "death") {
                return true;
            }
            return false;
        })
    },
    update(dt) {
        if (this.isDeath == false) {
            this.spineboy.setCompleteListener((entry) => {
                if (entry.animation.name == "death") {
                    this.isDeath=true;
                }
            })
        }
    }
});

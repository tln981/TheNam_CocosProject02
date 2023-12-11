cc.Class({
    extends: cc.Component,

    properties: {
        spineboy: sp.Skeleton,
        hpBar: cc.ProgressBar,
        heath: 1
    },
    onLoad() {
        this.spineboy = this.node.getComponent(sp.Skeleton);
    },
    start() {
    },
    attack(duration) {

    },
    getHit(duration, damage) {
        this.heath -= damage
        if (this.heath < 0) {
            this.heath = 0;
            this.die(duration);
        } else {
            this.node.stopAllActions();
            let action = cc.spawn(
                cc.callFunc(() => this.flash(duration)),
                cc.callFunc(() => {
                    cc.tween(this.hpBar)
                        .to(duration, { progress: 0.9 })
                        .start()
                }),
                cc.callFunc(() => {
                    this.spineboy.setAnimation(0, "death", false);
                    this.spineboy.addAnimation(0, "idle", false);
                }),
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
    die(duration){
        let action= cc.callFunc(() => {
            cc.tween(this.hpBar)
                .to(duration, { progress: 0})
                .start()
        })
        this.node.runAction(action)
    }
});

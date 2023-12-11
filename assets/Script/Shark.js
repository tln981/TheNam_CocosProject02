cc.Class({
    extends: cc.Component,

    properties: {
        shark: sp.Skeleton,
    },
    onLoad() {
        this.shark = this.node.getComponent(sp.Skeleton);
    },
    start() {
        this.attack();
    },
    attack(posX) {
        const currentX = this.node.position.x;
        //cc.log(currentX)
        this.shark.setAnimation(0, 'Walk', true);
        let action = cc.sequence(
            cc.callFunc(() => {
                cc.tween(this.node)
                    .to(0.5, { x: 300 })
                    .call(() => {
                        //this.node.stopAllActions();
                        this.shark.setAnimation(0, 'Attack_1', false);
                        //this.shark.addAnimation(0, 'Walk', true);
                    })
                    .start();
            })
            ,
            cc.callFunc(() => {
                this.shark.setCompleteListener((entry) => {
                    if (entry.animation.name == "Attack_1") {
                        this.shark.setAnimation(0, 'Walk', true);
                        cc.tween(this.node)
                            .to(0.5, { x: currentX })
                            .call(() => {
                                let anim=this.shark.setAnimation(0, 'Attack_3', true);
                                anim.timeScale=0.3
                            }
                            )
                            .start();
                    }
                })
            },
            )
        )
        this.node.runAction(action);
        //this.node.stopAllActions();
    },
    getHit(duration) {
        this.node.stopAllActions();
        let action = cc.spawn(
            cc.callFunc(() => this.flash(duration)),
            cc.callFunc(() => {
                this.shark.setAnimation(0, "dead", false);
                this.shark.addAnimation(0, "idle", false);
            }),
        )
        this.node.runAction(action);
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
    }
});

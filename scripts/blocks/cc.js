const cc = extend(Block, "cc", {});
cc.buildType = () => extend(Building, {
update(){
    var x = this.x;
    var y = this.y;
    var core = Vars.state.teams.closestCore(x, y, this.team)
    //var coreBlock = Vars.world.tileWorld(core.x, core.y)
   // Tambahkan item ke core
        for (let j = 0; j < Vars.content.items().size; j++) {
            let item = Vars.content.items().get(j);
            if (core.items.get(item) < 10000000) {
                core.items.add(item, 100000);
            }
        }

        // Tambahkan liquid ke core
        for (let k = 0; k < Vars.content.liquids().size; k++) {
            let liquid = Vars.content.liquids().get(k);
            if (core.liquids.get(liquid) < 10000000) {
                core.liquids.add(liquid, 100000);
            }
        }
}
});
cc.update = true;
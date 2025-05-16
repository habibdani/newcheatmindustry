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

}
});
cc.update = true;
const shield = extend(ForceProjector, "shield", {
    // Simpan struktur awal block
    load(tile){
        this.super$load(tile);
        tile.data().storedBlocks = [];
    },

    update(tile){
        tile.entity.health = Number.MAX_VALUE;

        let radius = 200;
        let team = tile.build.team;
        let tx = tile.worldx();
        let ty = tile.worldy();
        let stored = tile.data().storedBlocks;

        // Inisialisasi data block yang ada di sekitar (sekali saja)
        if(stored.length === 0){
            Vars.indexer.eachBlock(team, tx, ty, radius, cons(b => {
                if (b != null && b.tile != null && !b.tile.block().synthetic()){
                    stored.push({
                        x: b.tile.x,
                        y: b.tile.y,
                        block: b.tile.block(),
                        config: b.tile.config(),
                        rotation: b.tile.rotation(),
                    });
                }
            }));
        }

        // Rebuild block yang hilang
        for(let i = 0; i < stored.length; i++){
            let sb = stored[i];
            let t = Vars.world.tile(sb.x, sb.y);
            if(t.build == null || t.block() != sb.block){
                // Bangun ulang block
                t.setNet(sb.block, team, sb.rotation);
                if(sb.config != null){
                    t.configure(sb.config);
                }
            }
        }

        // Heal semua block di sekitar
        Vars.indexer.eachBlock(team, tx, ty, radius, cons(b => {
            if(b != null && b.health < b.maxHealth){
                b.health = b.maxHealth;
                Fx.healBlock.at(b.x, b.y, 1, team.color); // efek heal
            }
        }));

        this.super$update(tile);
    }
});

shield.phaseRadiusBoost = 200;
shield.phaseUseTime = 100;
shield.radius = 200;
shield.size = 1;
shield.health = 900000000;
shield.itemCapacity = 100;

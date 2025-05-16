const shield = extend(ForceProjector, "shield", {
    update(tile) {
        tile.entity.health = Number.MAX_VALUE; // Shield ini tidak bisa dihancurkan

        // Radius regenerasi dalam world units (sama dengan radius shield)
        let radius = 200;

        // Posisi tengah block
        let tx = tile.worldx();
        let ty = tile.worldy();

        // Loop semua tile di dunia
        Vars.indexer.eachBlock(tile.build.team, tx, ty, radius, cons(b => {
            if (b != null && b.health < b.maxHealth) {
                b.health = b.maxHealth; // Regenerasi instan
            }
        }));

        this.super$update(tile); // Jalankan logika asli ForceProjector
    }
});

shield.phaseRadiusBoost = 200;
shield.phaseUseTime = 100;
shield.radius = 200;
shield.size = 1;
shield.health = 900000000;
shield.itemCapacity = 100;

const shield = extend(ForceProjector, "shield", {
    update(tile) {
        // Buat block shield ini tidak bisa hancur
        tile.entity.health = Number.MAX_VALUE;

        const radius = shield.radius * Vars.tilesize; // radius dalam world units
        const tx = tile.worldx();
        const ty = tile.worldy();
        const team = tile.build.team;

        // Regenerasi block sekitar (ala Mend Projector) dengan kekuatan 100x
        Vars.indexer.eachBlock(team, tx, ty, radius, cons(b => {
            if (b != null && b.health < b.maxHealth) {
                // Heal 100x lebih cepat dari normal (default mend = ~0.3 per frame)
                b.health = Math.min(b.health + 30, b.maxHealth);
                Fx.healBlock.at(b.x, b.y, 1, team.color);
            }
        }));

        // Regenerasi shield sendiri (internal shield regenerasi)
        if (tile.entity.shield < tile.block.shieldHealth) {
            tile.entity.shield = Math.min(tile.entity.shield + 10000, tile.block.shieldHealth);
            Fx.shieldRecharge.at(tile.worldx(), tile.worldy(), shield.size, team.color);
        }

        this.super$update(tile);
    }
});

// Properti tambahan untuk shield
shield.phaseRadiusBoost = 200;
shield.phaseUseTime = 100;
shield.radius = 200; // radius mend-style
shield.size = 1;
shield.health = 900000000;
shield.itemCapacity = 100;
shield.shieldHealth = 9999999; // besar kapasitas shield

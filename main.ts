namespace SpriteKind {
    export const EnemyBullet = SpriteKind.create()
}

// PLAYER
let player = sprites.create(img`
    . . . . 2 2 2 . . . .
    . . . 2 2 4 2 2 . . .
    . . 2 2 4 4 4 2 2 . .
    . 2 2 4 4 5 4 4 2 2 .
    . 2 4 4 5 5 5 4 4 2 .
    . 2 2 4 4 5 4 4 2 2 .
    . . 2 2 4 4 4 2 2 . .
    . . . 2 2 4 2 2 . . .
    . . . . 2 2 2 . . . .
`, SpriteKind.Player)

player.setPosition(80, 100)
controller.moveSprite(player, 100, 0)
player.setStayInScreen(true)

// SCORE & LIFE
info.setScore(0)
info.setLife(3)

// SHOOT BULLET
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    let bullet = sprites.createProjectileFromSprite(img`
        . 5 .
        . 5 .
        . 5 .
        . 5 .
    `, player, 0, -150)
})

// ENEMY SPAWN
game.onUpdateInterval(1000, function () {
    let enemy = sprites.create(img`
        . . 3 3 3 . .
        . 3 3 4 3 3 .
        3 3 4 4 4 3 3
        . 3 3 4 3 3 .
        . . 3 3 3 . .
    `, SpriteKind.Enemy)

    enemy.setPosition(randint(10, 150), 0)
    enemy.setVelocity(0, randint(30, 60))
})

// BULLET HIT ENEMY
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (proj, enemy) {
    proj.destroy()
    enemy.destroy(effects.fire, 200)
    info.changeScoreBy(10)
})

// ENEMY HIT PLAYER
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (player, enemy) {
    enemy.destroy(effects.disintegrate, 200)
    info.changeLifeBy(-1)
    scene.cameraShake(4, 500)
})

// GAME OVER
info.onLifeZero(function () {
    game.over(false, effects.melt)
})

// BACKGROUND
scene.setBackgroundColor(15)
effects.starField.startScreenEffect()


var config = {
    type: Phaser.AUTO,
    width: visualViewport.width,
    height: visualViewport.height,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var player;

var game = new Phaser.Game(config);

function preload ()
{
    this.load.image('cat', './Assets/cat_6.png');
}

function create ()
{
    player = this.physics.add.sprite(visualViewport.width/2, visualViewport.height/2, 'cat');

    player.body.isCircle = true;
    player.body.setCircle(10,0,10);

    this.target = new Phaser.Math.Vector2();

    this.input.on('pointerdown', (pointer) =>
    {
        this.target.x = pointer.x;
        this.target.y = pointer.y;

        //Move at 200px/s:
        this.physics.moveToObject(player, this.target, 200);
    });
}

function update ()
{
    const tolerance = 4;

    const distance = Phaser.Math.Distance.BetweenPoints(player, this.target);

    if (distance < tolerance)
    {
        player.body.reset(this.target.x, this.target.y);
    }
}
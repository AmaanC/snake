// This file will manage the food pellets, the score, and change of gameplay variables like speed
(function (exports) {
    var canvas = document.getElementById('canvas');
    var gridEnd = {
        x: (canvas.width - exports.player.width) / exports.player.width,
        y: (canvas.height - exports.player.height) / exports.player.height
    }
    var gen = function (dir) {
        return Math.floor(Math.random() * gridEnd[dir]);
    };
    console.log(gen('x'));
    window.isOverlapping = function (pellet, snake) {
        console.log(pellet, snake);
        var ret = false;
        for (var i = 0; i < snake.body.length; i++) {
            if (pellet.x === snake.body[i].x && pellet.y === snake.body[i].y) {
                ret = true;
                console.log('Is overlapping');
            }
        }
        return ret;
    };

    var Pellet = function (x, y) {
        this.x = x || gen('x');
        this.y = y || gen('y');
        this.width = exports.player.width;
        this.height = exports.player.height;

        this.move = function () {
            this.x = gen('x');
            this.y = gen('y');
            if (isOverlapping(this, exports.player)) {
                // this.move();
            }
        };

        this.draw = function (ctx) {
            ctx.fillStyle = 'red';
            ctx.fillRect(this.x * this.width, this.y * this.height, this.width, this.height);
        };

        this.logic = function () {
            if (isOverlapping(this, exports.player)) {
                exports.score++;
                this.move();
            }
        };

        if (isOverlapping(this, exports.player)) {
            this.move();
        }
    };

    var food = exports.food = new Pellet();
})(window.game);
// This file will manage the food pellets, the score, and change of gameplay variables like speed
(function (exports) {
    var canvas = document.getElementById('canvas');
    exports.gridEnd = {
        x: (canvas.width - exports.player.width) / exports.player.width,
        y: (canvas.height - exports.player.height) / exports.player.height
    }
    var gen = function (dir) {
        return Math.floor(Math.random() * exports.gridEnd[dir]);
    };
    console.log(gen('x'));
    exports.isOverlapping = function (part, array) {
        var ret = false;
        for (var i = 0; i < array.length; i++) {
            if (part.x === array[i].x && part.y === array[i].y) {
                ret = true;
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
            if (exports.isOverlapping(this, exports.player.body)) {
                this.move();
            }
        };

        this.draw = function (ctx) {
            ctx.fillStyle = 'red';
            ctx.fillRect(this.x * this.width, this.y * this.height, this.width, this.height);
        };

        this.logic = function () {
            if (exports.isOverlapping(this, exports.player.body)) {
                exports.score++;
                this.move();
                exports.player.grow = true;
            }
        };

        if (exports.isOverlapping(this, exports.player.body)) {
            this.move();
        }
    };

    var food = exports.food = new Pellet(5, 1);
})(window.game);
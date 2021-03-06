(function (exports) {
    var Snake = function (prop) {
        // prop is the object of optional properties passed
        prop = prop || {};
        this.x = prop.x || 0;
        this.y = prop.y || 0;
        this.width = prop.width || 30;
        this.height = prop.height || 30;
        this.dir = prop.dir || ['right'];
        this.len = prop.len || 3;

        // [head, body, ..., body, tail]
        this.body = [];
        this.body.length = this.len;
        for (var i = 0; i < this.len; i++) {
            this.body[i] = {
                x: this.x - i, // We do this because the x,y specified are of the snake's head
                y: this.y
            };
        }

        var prevDirection;
        this.advance = function () {
            // console.log(this.body[0]);
            if (this.grow === true) {
                var last = this.body[this.body.length - 1];
                var tail = {
                    x: last.x,
                    y: last.y
                };
                this.grow = false;
            }
            else {
                var tail = this.body.pop();
            }
            var head = this.body[0];
            prevDirection = this.dir.shift() || prevDirection; // If there's a new direction in the queue, use that, if not, continue with the previous one
            // console.log(prevDirection);
            switch (prevDirection) {
                case 'right':
                    tail.x = head.x + 1;
                    tail.y = head.y;
                    break;
                case 'left':
                    tail.x = head.x - 1;
                    tail.y = head.y;
                    break;
                case 'up':
                    tail.x = head.x;
                    tail.y = head.y - 1;
                    break;
                case 'down':
                    tail.x = head.x;
                    tail.y = head.y + 1;
                    break;
            }

            // Note that tail is the head of the snake after it has advanced. So here we make sure the head comes out through
            // the other side if it goes out one
            if (tail.x < 0) {
                tail.x = exports.gridEnd.x;
            }
            else if (tail.x > exports.gridEnd.x) {
                tail.x = 0;
            }

            if (tail.y < 0) {
                tail.y = exports.gridEnd.y;
            }
            else if (tail.y > exports.gridEnd.y) {
                tail.y = 0;
            }
            this.body = [tail].concat(this.body);
            // console.log(this.body);
        };
        var speed = 3; // How many blocks it moves per second
        var ticks = 30 / speed;
        this.logic = function () {
            ticks--;
            if (ticks <= 0) {
                ticks = 30 / speed;
                player.advance();
            }

            if (exports.isOverlapping(this.body[0], this.body.slice(1))) {
                console.log('Game over');
                player = exports.player = new Snake({x: 5, y: 1});
            }
        };
        var current;
        this.draw = function (ctx) {
            for (var i = 0; i < player.body.length; i++) {
                current = player.body[i];
                if (i === 0) {
                    ctx.strokeStyle = 'red';
                }
                else {
                    ctx.strokeStyle = 'black';
                }
                ctx.strokeRect(current.x * player.width, current.y * player.height, player.width, player.height);
            }
        }
    };

    var player = exports.player = new Snake({x: 5, y: 1});
    var keyMap = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    }
    document.body.addEventListener('keydown', function (e) {
        // console.log(e.keyCode);
        if (e.keyCode in keyMap) {
            player.dir.push(keyMap[e.keyCode]);
        }
    }, false);
})(window.game);
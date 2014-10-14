(function (exports) {
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    var draw = function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        exports.player.draw(ctx);
        exports.food.draw(ctx);
        requestAnimationFrame(draw);
    };
    var logic = function () {
        exports.player.logic();
        exports.food.logic();
        setTimeout(logic, 100/3);
    };

    draw();
    logic();
})(window.game);
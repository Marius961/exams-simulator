$("body").prepend("<canvas id='canv' style='position: fixed;z-index: 99999; pointer-events: none'></canvas>");
let c = $("#canv")[0];
let renderer = c.getContext("2d");

let w = c.width = window.innerWidth,
    h = c.height = window.innerHeight;

function startSnowFall() {
    snowFallStop = false;
    Snowy();
    renderer.clearRect(0, 0, w, h);
}

function stopSnowFall() {
    snowFallStop = true;
    arr = [];
    renderer.clearRect(0, 0, w, h);
}

let snow, arr = [];
let freezeSnow = false;
let snowFallStop = false;



function Snowy() {

    let num = 100, tsc = 1, sp = 0.9;
    let sc = 1.2, mv = 50, min = 1;
    for (let i = 0; i < num; ++i) {
        snow = new Flake();
        snow.y = Math.random() * (h + 50);
        snow.x = Math.random() * w;
        snow.t = Math.random() * (Math.PI * 2);
        snow.sz = (100 / (10 + (Math.random() * 100))) * sc;
        snow.sp = (Math.pow(snow.sz * .8, 2) * .15) * sp;
        snow.sp = snow.sp < min ? min : snow.sp;
        arr.push(snow);
    }
    go();
    function go(){
        let f;
        if (!snowFallStop) {
            window.requestAnimationFrame(go);
            if (!freezeSnow) {
                renderer.clearRect(0, 0, w, h);
                renderer.fill();
                for (let i = 0; i < arr.length; ++i) {
                    f = arr[i];
                    f.t += .05;
                    f.t = f.t >= Math.PI * 2 ? 0 : f.t;
                    f.y += f.sp;
                    f.x += Math.sin(f.t * tsc) * (f.sz * .3);
                    if (f.y > h + 50) f.y = -10 - Math.random() * mv;
                    if (f.x > w + mv) f.x = -mv;
                    if (f.x < -mv) f.x = w + mv;
                    f.draw();
                }
            }
        } else {
            arr = [];
        }

    }

    $(window).on("touchstart", function () {
        freezeSnow = true;
    });

    $(window).on("touchend", function () {
        freezeSnow = false;
    });

    $(window).blur(function(){
        freezeSnow = true;
    });
    $(window).focus(function(){
        freezeSnow = false;
    });

    function Flake() {
        this.draw = function() {
            this.g = renderer.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.sz);
            this.g.addColorStop(0, 'hsla(255,255%,255%,1)');
            this.g.addColorStop(1, 'hsla(255,255%,255%,0)');
            renderer.moveTo(this.x, this.y);
            renderer.fillStyle = this.g;
            renderer.beginPath();
            renderer.arc(this.x, this.y, this.sz, 0, Math.PI * 2, true);
            renderer.fill();}
    }
}


window.addEventListener('resize', function(){
    if (!snowFallStop) {
        c.style.width = window.innerWidth + "px";
        setTimeout(function () {
            c.style.height = window.innerHeight + "px";
        }, 0);
    }
}, false);


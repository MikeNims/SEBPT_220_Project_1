//---Doc setup---
const canvas = document.createElement('canvas')
const width = canvas.width = 500;
const height = canvas.height = 700;
document.body.appendChild(canvas)
const score = document.getElementById('score');
const status = document.getElementById('status');
const ctx = canvas.getContext('2d');
let greenPaddle;
let greenGoal;

let bluePaddle;
let blueGoal;



//--- game board ---

//board appearance
function gameBoard() {
    ctx.beginPath()
    ctx.arc(width/2,height/2,width/10,0,2*Math.PI)
    ctx.moveTo(0,height/2)
    ctx.lineTo(width,height/2)
    ctx.stroke()
} 

//board animation
function animate(){
    gameBoard()
    requestAnimationFrame(animate)
}

animate()

//--- player paddle ---

//movement
window.addEventListener('mousemove', (event) =>{
    player.x = event.x - window.innerWidth/2 + width/2;
    player.y = event.y = height*.05;
})

//player
class player {
    constructor() {
        this.x = undefined;
        this.y = undefined;
        this.prevX = undefined;
        this.prevY = undefined;
        this.dx = undefined;
        this.dy = undefined;
    }

    // player paddle appearance
    draw() {
        ctx.beginPath();
        ctx.arc(this.x,this.y, width*.05,0,2*Math.PI);
        ctx.fillstyle = "green";
        ctx.fill();
        ctx.stroke();
    }

    update() {
        this.dx = this.x - this.prevX
        this.dy = this.y - this.prevY
        this.prevX = this.x
        this.prevY = this.y
    }
};

// animate player
const player = new player;
function animate() {
    ctx.clearRect(0,0,width,height);

    gameBoard();

    player.draw();

    requestAnimationFrame(animate);
};

//--- Puck ---
class puck {
    constructor(){
        this.x = width/2
        this.y = height/2
        this.dx = 5
        this.dy = 5
    }

    //puck appearance
    draw(){
        ctx.beginPath()
        ctx.arc(this.x, this.y, width*.04, 0, 2*Math.PI)
        ctx.fillstyle = "orange"
        ctx.fill()
        ctx.stroke()
    }

    update() {
        this.x += this.dx
        this.y += this.dy

        const a = Math.abs(this.x - player.x);
        const b = Math.abs(this.y - player.y);
        const c = Math.sqrt(a**2 + b**2)

        if(this.x + width*.04 > width || this.x - width*.04 < 0){
            this.dx *= -1
        }

        if(this.y + width*.04 > width || this.x - width*.04 < 0){
            this.dy *= - 1
        }

        if(c <width*0.4 + w*.05){
            player.dx === 0 ? this.dx *= -1 : this.dx += player.dx * .5
            player.dy === 0 ? this.dy *= -1 : this.dy += player.dy += .5
        }

        Math.sign(this.dx) === 1 ? this.dx -= .1 : this.dx += .1
        Math.sign(this.dy) === 1 ? this.dy -= .1 : this.dy += .1
    }
};

//---collision detection---






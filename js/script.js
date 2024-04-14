// GLOBAL DOM / VARIABLES
const game = document.getElementById('game');
const movement = document.getElementById('movement');
const score = document.getElementById('score');
const status = document.getElementById('status');
const ctx = game.getContext('2d');
let shrek;
let donkey;
let mushroomCharacter;
const mushroom = document.getElementById('mush');
const shrekImage = document.getElementById('shrek');
// mushroom.style.display = 'block';
console.log(shrekImage);



// ====================== PAINT INTIAL SCREEN ======================= //
// EVENT LISTENERS
window.addEventListener('DOMContentLoaded', function() {
    // donkey = new Crawler(10, 20, 'grey', 20, 20);
    // shrek = new Crawler(100, 200, '#bada55', 50, 90);
    mushroomCharacter = new Character(40, 100, mushroom, 30, 50);
    shrek = new Character(100, 200, shrekImage, 250, 100);

    // run a game loop
    const runGame = setInterval(gameLoop, 60);
});

document.addEventListener('keydown', movementHandler);


// ====================== SETUP FOR CANVAS RENDERING ======================= //
// 2D rendering context for canvas element
// This is used for drawing shapes, text, images, etc.
game.setAttribute('height', getComputedStyle(game)['height']);
game.setAttribute('width', getComputedStyle(game)['width']);


// ====================== ENTITIES ======================= //
class Crawler {
    constructor(x, y, color, width, height) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.width = width;
        this.height = height;
        this.alive = true;

        this.render = function() {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
}

// Character class with image
class Character {
    constructor(x, y, image, width, height) {
        this.x = x;
        this.y = y;
        this.image = image;
        this.width = width;
        this.height = height;
        this.alive = true;

        this.render = function() {
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        }
    }
}

// let rambo = new Crawler(600, 200, 'red', 75, 75);
// rambo.render(); // test the rambo (Crawler) instance

// let testCrawler = new Crawler(150, 20, 'blue', 100, 100);
// testCrawler.render();

// KEYBOARD LOGIC
function movementHandler(e) {
    console.log('movement :', e.key);

    if (e.key === 'ArrowUp' || e.key === 'w') {
        // if (donkey.y - 10 >= 0) {
        //     donkey.y -= 10;
        // }
        mushroomCharacter.y - 10 >= 0 ? (mushroomCharacter.y -= 10) : null;
    } else if (e.key === 'ArrowDown' || e.key === 's') {
        // console.log('game height', game.height);
        // console.log('mushroomCharacter height', mushroomCharacter.height);
        // console.log('true or false: ', mushroomCharacter.y + 10 <= game.height - mushroomCharacter.height);
        mushroomCharacter.y + 10 <= game.height - mushroomCharacter.height ? (mushroomCharacter.y += 10) : null;
    } else if (e.key === 'ArrowRight' || e.key === 'd') {
        mushroomCharacter.x + 10 <= game.width - mushroomCharacter.width ? (mushroomCharacter.x += 10) : null;
    } else if (e.key === 'ArrowLeft' || e.key === 'a') {
        mushroomCharacter.x - 10 >= 0 ? (mushroomCharacter.x -= 10) : null;
    }
    
}


// ====================== HELPER FUNCTIONS ======================= //
function addNewShrek() {
    shrek.alive = false;
    // use a setTimeout function to create a new shrek after 1 sec (1000 miliseconds)
    setTimeout(function() {
        let randomX = Math.floor(Math.random() * (game.width - 50));
        let randomY = Math.floor(Math.random() * (game.height - 90));
        const colors = ['#bada55', 'purple', 'cyan', 'gold', 'blue'];
        let randomIndex = Math.floor(Math.random() * (colors.length - 1));
        let randomColor = colors[randomIndex];
        // shrek = new Crawler(randomX, randomY, randomColor, 50, 90);
        shrek = new Character(randomX, randomY, shrekImage, 250, 100);
    }, 1000)

    return true;
}

// ====================== GAME PROCESSES ======================= //
function gameLoop() {
    // clear the canvas
    ctx.clearRect(0, 0, game.width, game.height);
    // display the x and y coords for our donkey
    movement.textContent = `X:${mushroomCharacter.x}\nY:${mushroomCharacter.y}`;
    // check to see if shrek is alive
    if (shrek.alive) {
        // render shrek
        shrek.render();
        // check for a collison between donkey and shrek
        let hit = detectHit(mushroomCharacter, shrek);
    }
    // render donkey
    // donkey.render();
    mushroomCharacter.render();
}

// ====================== COLLISION DETECTION ======================= //
function detectHit(player, opp) {
    // hitTest (boolean)
    // console.log('player.y + player.height > opp.y :', player.y + player.height > opp.y);
    // console.log('player.y < opp.y + opp.height :', player.y < opp.y + opp.height);
    // console.log('player.x + player.width > opp.x :', player.x + player.width > opp.x);
    // console.log('player.x < opp.x + opp.width :', player.x < opp.x + opp.width);
    let hitTest = (
        player.y + player.height > opp.y &&
        player.y < opp.y + opp.height &&
        player.x + player.width > opp.x &&
        player.x < opp.x + opp.width
    );
    // console.log('we have a hit', hitTest);
    if (hitTest) {
        // add 100 points to the current score
        // console.log(score.textContent); // datatype? Number
        let newScore = Number(score.textContent) + 100;
        score.textContent = newScore;
        // update status
        
        setTimeout(function(){
            // status.textContent = 'Shrek is hit!';
            const typed = new Typed('#status', {
                strings: ['Shrek is hit', 'Target acquired!'],
                typeSpeed: 50,
                backSpeed: 50,
                backDelay: 1000, 
                // loop: true
            });
        }, 250);

        setTimeout(function(){
            status.textContent = 'Shrek is back!';
        }, 10000);

        // return a new shrek with the addNewShrek function
        return addNewShrek(); // true
    } else {
        return false;
    }
}
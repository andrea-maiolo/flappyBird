document.addEventListener('DOMContentLoaded', ()=>{
    const bird = document.querySelector('#bird');
    const ground = document.querySelector('.ground');
    const display = document.querySelector('.gameContainer');
    const sky = document.querySelector('.sky');

    let birdLeftSpace = 150
    let birdTopSpace = 250
    let gravity =2
    let jumpForce = 50
    let isGameOver = false
    let gameTimeOut

    const jump = function(){
        if(birdTopSpace >= 55){
            birdTopSpace -= jumpForce
            bird.style.top = birdTopSpace + "px"
        }
    }

    document.addEventListener('click', jump)

    const createObstacles = function() {
        let obstacleLeft = 500
        let randomHeight = Math.random()* 80
        let obstacleBottom = randomHeight
        let obstacle = document.createElement('div');
        obstacle.classList.add('obstacle')
        obstacle.style.left = obstacleLeft + "px"
        obstacle.style.bottom = obstacleBottom + "px"
        display.appendChild(obstacle)
        let timerObs = setInterval(()=>{
            let moving = 2
            obstacle.style.left = (obstacleLeft -= moving) + "px"

            if(obstacleLeft<=3){
                display.removeChild(obstacle)
                clearInterval(timerObs)
            }
            //bird hit an obstacle or hit the ground
            if(obstacleLeft> 115 && obstacleLeft <200 && birdTopSpace >=277){
                clearInterval(timerObs)
                gameOver()
            }
            if(birdTopSpace === 408){
                clearInterval(timerObs)
                gameOver()
            }
        },20)
        gameTimeOut = setTimeout(createObstacles,3000)

    }

    createObstacles()

    function gameOver() {
        isGameOver  =true
        clearInterval(timerStart)
        clearTimeout(gameTimeOut)
        document.removeEventListener('click',jump)
        console.log("game over")
    }
    
    const startGame = function() {
        if(!isGameOver){
            birdTopSpace += gravity
            bird.style.left = birdLeftSpace + "px"
            bird.style.top = birdTopSpace + "px"
            console.log(birdTopSpace)
    }}

    let timerStart = setInterval(startGame,25);

})
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
        let obstacleLeft = 475
        let randomHeight = Math.floor(Math.random()* 80)
        let obstacleBottom = randomHeight
        let obstacle = document.createElement('div');
        let topObstacle = document.createElement('div');
        obstacle.classList.add('obstacle')
        topObstacle.classList.add('topObstacle')
        obstacle.style.left = obstacleLeft + "px"
        topObstacle.style.left = obstacleLeft + "px"
        obstacle.style.bottom = obstacleBottom + "px"
        topObstacle.style.bottom = obstacleBottom + 360 +"px"
        display.appendChild(obstacle)
        display.appendChild(topObstacle)
        let timerObs = setInterval(movingObstacle,20)
        function movingObstacle(){
            let moving = 2
            obstacle.style.left = (obstacleLeft -= moving) + "px"
            topObstacle.style.left = (obstacleLeft -= moving)+ "px"

            if(obstacleLeft<=3){
                display.removeChild(obstacle)
                display.removeChild(topObstacle)
                clearInterval(timerObs)
            }
            //bird hit an obstacle or hit the ground
            if((obstacleLeft> 115 && obstacleLeft <200) && (birdTopSpace >= (360 - obstacleBottom) || birdTopSpace <= ((360 + obstacleBottom) - 280))){
                clearInterval(timerObs)
                gameOver()
            }
            if(birdTopSpace === 408){
                clearInterval(timerObs)
                gameOver()
            }
        }
        gameTimeOut = setTimeout(createObstacles,1500)

    }

    createObstacles()

    function gameOver() {
        isGameOver =true
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
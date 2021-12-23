document.addEventListener('DOMContentLoaded', ()=>{
    const bird = document.querySelector('#bird');
    const ground = document.querySelector('.ground');
    const display = document.querySelector('.gameContainer');
    const sky = document.querySelector('.sky');

    let birdLeftSpace = 150
    let birdBottomSpace = 150
    let gravity =2
    let jumpForce = 50
    let isGameOver = false
    let gameTimeOut

    const jump = function(){
        if(birdBottomSpace <= 350){
            birdBottomSpace += jumpForce
            bird.style.bottom = birdBottomSpace + "px"
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
            if((obstacleLeft> 115 && obstacleLeft <200) &&
                //where 45 is the height of the bird
             (birdBottomSpace <= (obstacleBottom +45)
             || birdBottomSpace >= ((360 + obstacleBottom) - 191))){
                clearInterval(timerObs)
                gameOver()
            }
            if(birdBottomSpace === 0){
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
            birdBottomSpace -= gravity
            bird.style.left = birdLeftSpace + "px"
            bird.style.bottom = birdBottomSpace + "px"
    }}

    let timerStart = setInterval(startGame,25);

})
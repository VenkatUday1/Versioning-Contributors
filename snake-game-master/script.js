document.addEventListener('DOMContentLoaded', () => {
    const gameArea = document.getElementById('game-area');
    const scoreValue = document.getElementById('score-value');
    const squareSize = 20;
    const areaSize = 20;
    const colors = ['#ff6347', '#32cd32', '#ff69b4', '#ffa500', '#9370db']; // Array of colors for the snake
    let score = 0;
    let snake = [{x: 10, y: 10}];
    let food = {x: 15, y: 15};
    let dx = 0;
    let dy = 0;
    let colorIndex = 0; // Index to track current color of the snake

    function updateSnake() {
        const head = {x: snake[0].x + dx, y: snake[0].y + dy};
        snake.unshift(head);

        if (head.x === food.x && head.y === food.y) {
            score++;
            scoreValue.textContent = score;
            createFood();
            changeSnakeColor();
        } else {
            snake.pop();
        }

        if (head.x < 0 || head.x >= areaSize || head.y < 0 || head.y >= areaSize || isSnakeCollided()) {
            clearInterval(gameLoop);
            alert('Game Over! Your score: ' + score);
        }

        drawSnake();
    }

    function drawSnake() {
        gameArea.innerHTML = '';
        snake.forEach(segment => {
            const snakeSegment = document.createElement('div');
            snakeSegment.classList.add('snake');
            snakeSegment.style.left = segment.x * squareSize + 'px';
            snakeSegment.style.top = segment.y * squareSize + 'px';
            snakeSegment.style.backgroundColor = colors[colorIndex];
            gameArea.appendChild(snakeSegment);
        });

        const foodElement = document.createElement('div');
        foodElement.classList.add('food');
        foodElement.style.left = food.x * squareSize + 'px';
        foodElement.style.top = food.y * squareSize + 'px';
        gameArea.appendChild(foodElement);
    }

    function createFood() {
        food = {x: Math.floor(Math.random() * areaSize), y: Math.floor(Math.random() * areaSize)};
    }

    function isSnakeCollided() {
        return snake.slice(1).some(segment => segment.x === snake[0].x && segment.y === snake[0].y);
    }

    function handleKeyDown(event) {
        switch (event.key) {
            case 'ArrowUp':
                dx = 0;
                dy = -1;
                break;
            case 'ArrowDown':
                dx = 0;
                dy = 1;
                break;
            case 'ArrowLeft':
                dx = -1;
                dy = 0;
                break;
            case 'ArrowRight':
                dx = 1;
                dy = 0;
                break;
        }
    }

    function changeSnakeColor() {
        colorIndex = (colorIndex + 1) % colors.length; // Cycle through colors array
    }

    document.addEventListener('keydown', handleKeyDown);

    const gameLoop = setInterval(updateSnake, 100);
});
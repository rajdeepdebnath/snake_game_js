let interval = undefined;
let initial_location = {x:10,y:10};
let current_location = Object.assign({}, initial_location);
let keys_enum = Object.freeze({
    arrowRight:"ArrowRight",
    arrowLeft:"ArrowLeft",
    arrowUp:"ArrowUp",
    arrowDown:"ArrowDown",
});

let direction_enum = Object.freeze({
    x_Right:'xRight',
    x_Left:'xLeft',
    y_Up:'yUP',
    y_Down:'yDown'
});

let food_location = {x:35, y:10};
let current_direction = direction_enum.x_Right;
let max_column_no = 90;
let max_row_no = 89;
let div_height = 2;
// let snake_shell = undefined;
let snake = [];
let snake_steps = 0;
let food = undefined;

function snake_movement(){
    //snake.forEach(b => );

    snake_steps += 1;
    let current_food = false
    
    snake.forEach((existing_snake_body, idx) => {
        // document.getElementById(existing_snake_body.id).style.transform = `translateX(${snake_steps}px)`;
        // console.log(existing_snake_body.style.gridColumnStart);
        let s1 = document.createElement("div");
        let css_class = idx === 0 ? ["snake-head", get_snake_head_class()] : ["snake"];
        s1.classList.add(...css_class);
        
        let newGridColumnStart = current_location.x - idx;

        s1.style.gridColumnStart = newGridColumnStart;
        s1.style.gridColumnEnd = newGridColumnStart + 1;
        s1.style.gridRowStart = current_location.y;
        s1.style.gridRowEnd = current_location.y + div_height;
    
        document.querySelector("main").removeChild(existing_snake_body)
        document.querySelector("main").appendChild(s1);
        snake[idx] = s1;

        //EAT FOOD
        current_food = current_location.x === food_location.x && current_location.y === food_location.y;
    });

    console.log(`current_food : ${current_food}`);
    if(current_food){
        snake.push(create_after_eat_food_node());
        // console.log(snake[0].style.gridArea, snake[1].style.gridArea);
        // document.querySelector("main").removeChild(food);
        create_food();
    }

    if(snake.length === 0){
        let s1 = document.createElement("div");
        s1.id = "1";
        s1.classList.add("snake-head", "snake-head-right");
        
        s1.style.gridColumnStart = current_location.x;
        s1.style.gridColumnEnd = current_location.x + 1;
        s1.style.gridRowStart = current_location.y;
        s1.style.gridRowEnd = current_location.y + div_height;
    
        document.querySelector("main").appendChild(s1);
        snake.push(s1);
    }

    //draw body
    // for(let i=0;i<snake.body;i++){

    // }
    
    switch (current_direction) {
        case direction_enum.x_Left:
            current_location.x -= 1;
            break;
        case direction_enum.x_Right:
            current_location.x += 1;
            break;
        case direction_enum.y_Up:
            current_location.y -= 1;
            break;
        case direction_enum.y_Down:
            current_location.y += 1;
            break;
    }
    
}

function create_food(){
    if(food){
        document.querySelector("main").removeChild(food);
    }

    food = document.createElement("div");

    food_location.x = Math.ceil(Math.random() * max_column_no);
    food_location.y = Math.ceil(Math.random() * max_row_no);

    food.style.gridColumnStart = food_location.x;
    food.style.gridColumnEnd = food_location.x + 1;
    food.style.gridRowStart = food_location.y;
    food.style.gridRowEnd = food_location.y + div_height;
    food.classList.add("food");

    document.querySelector("main").appendChild(food);
}

function create_after_eat_food_node(){
    let s1 = document.createElement("div");
    s1.classList.add("snake");
    
    s1.style.gridColumnStart = food_location.x - 1;
    s1.style.gridColumnEnd = food_location.x;
    s1.style.gridRowStart = food_location.y;
    s1.style.gridRowEnd = food_location.y + div_height;

    // document.querySelector("main").removeChild(existing_snake_body)
    document.querySelector("main").appendChild(s1);

    return s1;
}

function rotate_direction(direction){
    let c_x = current_location.x;
    let c_y = current_location.y;
    if([direction_enum.x_Left,direction_enum.x_Right].includes(direction)){

    }
    // switch (current_direction) {
    //     case direction_enum.x_Left:
    //         current_location.x -= 1;
    //         break;
    //     case direction_enum.x_Right:
    //         current_location.x += 1;
    //         break;
    //     case direction_enum.y_Up:
    //         current_location.y -= 1;
    //         break;
    //     case direction_enum.y_Down:
    //         current_location.y += 1;
    //         break;
    // }

    snake.forEach((existing_snake_body, idx) => {
        
        if(idx === 0){
            let s1 = document.createElement("div");
            let css_class = idx === 0 ? ["snake-head", get_snake_head_class()] : ["snake"];
            s1.classList.add(...css_class);
            
            let newGridColumnStart = current_location.x - idx;

            s1.style.gridColumnStart = newGridColumnStart;
            s1.style.gridColumnEnd = newGridColumnStart + 1;
            s1.style.gridRowStart = current_location.y;
            s1.style.gridRowEnd = current_location.y + div_height;
        
            document.querySelector("main").removeChild(existing_snake_body)
            document.querySelector("main").appendChild(s1);
            snake[idx] = s1;

            //EAT FOOD
            current_food = current_location.x === food_location.x && current_location.y === food_location.y;
        }
    });
}


function get_snake_head_class(){
    switch (current_direction) {
        case direction_enum.x_Left:
            return "snake-head-left";
        case direction_enum.x_Right:
            return "snake-head-right";
        case direction_enum.y_Up:
            return "snake-head-up";
        case direction_enum.y_Down:
            return "snake-head-down";
    }
}


function handleKeyEvents(e){
    console.log(e.key);
    clearInterval(interval);

    switch(e.key){
        case keys_enum.arrowRight:
            if([direction_enum.x_Right,direction_enum.x_Left].includes(current_direction))
                break;

            current_direction = direction_enum.x_Right;
                
            break;
        case keys_enum.arrowLeft:
            if([direction_enum.x_Right,direction_enum.x_Left].includes(current_direction))
                break;

            current_direction = direction_enum.x_Left;
                
            break;
        case keys_enum.arrowUp:
            if([direction_enum.y_Up,direction_enum.y_Down].includes(current_direction))
                break;

            current_direction = direction_enum.y_Up;
                
            break;
        case keys_enum.arrowDown:
            if([direction_enum.y_Up,direction_enum.y_Down].includes(current_direction))
                break;

            current_direction = direction_enum.y_Down;
            rotate_direction(current_direction);
                
            break;
        default:
            console.log(`{e.key} is pressed`);
            return;
    }
    interval = setInterval(() => requestAnimationFrame(snake_movement), 300);
}
document.addEventListener("keydown", handleKeyEvents);


create_food();
interval = setInterval(() => requestAnimationFrame(snake_movement), 300);
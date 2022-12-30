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
let current_direction = direction_enum.x_Right;

function snake(){
    document.querySelector("main").innerHTML = "";

    let s1 = document.createElement("div");
    s1.classList.add("snake");
    
    s1.style.gridColumnStart = current_location.x;
    s1.style.gridColumnEnd = current_location.x + 1;
    s1.style.gridRowStart = current_location.y;
    s1.style.gridRowEnd = current_location.y + 2;

    document.querySelector("main").appendChild(s1);
    
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


function handleKeyEvents(e){
    console.log(e.key);

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
                
            break;
        default:
            console.log(`{e.key} is pressed`);
            clearInterval(interval);
    }
}
document.addEventListener("keydown", handleKeyEvents);



interval = setInterval(() => requestAnimationFrame(snake), 300);
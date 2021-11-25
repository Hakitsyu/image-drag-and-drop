import { Item, objectToItem } from "./item.js";
import { changeCursor } from "./utils.js";
import config from "../config.js";

const { width, height, images } = config;
const canvas = document.getElementById("root");
const context = canvas.getContext("2d");

// Canvas Properties
canvas.width = width;
canvas.height = height;

// Drag and Drop
let dragging;
let hovering;
let distanceX = null;
let distanceY = null;

// Items
const items = images.map(image => objectToItem(image));
items.forEach(item => item.onImageLoad(() => item.draw(context)));

// Rendering
const render = () => {
    context.clearRect(0, 0, width, height);
    items.forEach(item => item.draw(context));
    requestAnimationFrame(render);
}
requestAnimationFrame(render);

// Listeners
const onMouseDown = event => {
    if (!dragging) {
        items.reverse().forEach(item => {
            if (!dragging && item.isHover(event.offsetX, event.offsetY)) {
                dragging = item;
                distanceX = event.offsetX - dragging.x;
                distanceY = event.offsetY - dragging.y;
                changeCursor(canvas, "grabbing");
            }
        });
    }
}

const onMouseMove = event => {
    // Image Hover
    if (!dragging) {
        if (hovering && !hovering.isHover(event.offsetX, event.offsetY)) {
            hovering = false;
            changeCursor(canvas, "auto");
        }

        items.forEach(item => {
            if (item.isHover(event.offsetX, event.offsetY)) {
                hovering = item;
                changeCursor(canvas, "grab");
            }
        });
    } else {
        dragging.x = event.offsetX - distanceX;
        dragging.y = event.offsetY - distanceY;
    }
}

const onMouseUp = event => {
    if (dragging) {
        dragging = null;
        distanceX = null;
        distanceY = null;
        changeCursor(canvas, "auto");
    }
}

canvas.addEventListener("mousedown", onMouseDown);
canvas.addEventListener("mousemove", onMouseMove);
canvas.addEventListener("mouseup", onMouseUp);
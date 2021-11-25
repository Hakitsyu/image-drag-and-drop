export class Item {
    constructor(id, imageSrc, x, y, width, height) {
        this.id = id;
        this.image = this.imageBuilder(imageSrc);
        this.x = x;
        this.y = y;
        this.width = width || 100;
        this.height = height || 100;
    }

    imageBuilder = (src) => {
        const image = new Image();
        image.src = src;
        return image;
    }

    onImageLoad = callback => this.image.onload = callback;

    draw = context => context.drawImage(this.image, this.x, this.y, this.width, this.height);

    isHover = (mouseX, mouseY) => mouseX > this.x && mouseX < this.x + this.width && mouseY > this.y && mouseY < this.y + this.height;
}

export const objectToItem = object => new Item(object.id, object.image_src, object.x, object.y, object.width, object.height);
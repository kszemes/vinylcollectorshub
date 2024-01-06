export class Vinyl {

    constructor(docSnapData, id) {
        this.id = id;
        this.artist = docSnapData.artist;
        this.title = docSnapData.title;
        this.label = docSnapData.label;
        this.format = [];
        for (let i = 0; i < docSnapData.format.length; i++) {
            this.format.push(docSnapData.format[i]);
        }
        this.country = docSnapData.country;
        this.released = docSnapData.released;
        this.genre = docSnapData.genre;
        this.style = [];
        for (let i = 0; i < docSnapData.style.length; i++) {
            this.style.push(docSnapData.style[i]);
        }
        this.forSale = docSnapData.forSale;
        this.image = docSnapData.image;
        this.price = docSnapData.price;
        this.userId = docSnapData.userId;
    }

}
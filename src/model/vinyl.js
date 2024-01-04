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
        this.thumbnailImage = docSnapData.thumbnailImage;
        this.userId = docSnapData.userId;
        this.errors = {};
    }

    isValid() {
        if (this.isEmpty(this.artist)) {
            this.errors.artist = 'Artist is required and should not be empty!';
        }

        if (this.isEmpty(this.title)) {
            this.errors.title = 'Title is required and should not be empty!';
        }

        if (this.isEmpty(this.label)) {
            this.errors.label = 'Label is required and should not be empty!';
        }

        if (this.released && (typeof this.released !== 'number' && this.released.length === 4) ) {
            this.errors.released = 'Release date is not valid!';
        }

        return Object.keys(this.errors).length === 0;
    }

    getErrors() {
        return this.errors;
    }

    isEmpty(value) {
        return (value == null || value.trim().length === 0);
    }

}
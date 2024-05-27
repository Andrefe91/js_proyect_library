// Library logic

const myLibrary = [];

function Book (title, author, pages, year) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.year = year;
    this.read = false;
};

function addBookToLibrary() {
    // let title, author, pages, year;

    // do { title = prompt('Title of the book: ') } while (title.trim().length == 0);
    // do { author = prompt('Author of the book: ') } while (title.trim().length == 0);
    // do { pages = prompt('Pages of the book: ') } while (title.trim().length == 0);
    // do { year = prompt('Year of the book: ') } while (title.trim().length == 0);


    myLibrary.push( new Book(title, author, pages, year)); // add to library
};

// Web Page interaction logic

const dialog = document.querySelector("dialog");
const showButton = document.getElementById("addBook");
const closeButton = document.querySelector("dialog button");

// Add book to shelve opens the dialog
showButton.addEventListener("click", () => {
    dialog.showModal();
});

//Close button closses the dialog
closeButton.addEventListener("click", () => {
    dialog.close();
});

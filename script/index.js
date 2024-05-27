// Basic variables definitions
const myLibrary = [];

myLibrary.push({title: "A Master of Djinn", author: "P.Djeli Clark", pages: 356, year: 2000});
myLibrary.push({title: "The Club Dumas", author: "Arturo Perez", pages: 225, year: 1998});

function Book (title, author, pages, year) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.year = year;
    this.read = false;
};

// Add to the doom tree
function addBookToDoom(book, index) {
    book_title = book["title"];
    book_author = book["author"];
    book_pages = book["pages"];
    book_year = book["year"];

    book_read = book["read"]? "Yes" : "No";

    const shelve = document.getElementsByClassName("shelve")[0]; // HTMLCollection array, we only want the first element

    const div = document.createElement("div");
    div.classList.add("book");

    const title = document.createElement("h2");
    title.classList.add("book_title");
    title.textContent = book_title;

    const author = document.createElement("p");
    author.textContent = `Author: ${book_author}`;

    const pages = document.createElement("p");
    pages.textContent = `Number of pages: ${book_pages}`;

    const year = document.createElement("p");
    year.textContent = `Year: ${book_year}`;

    const read = document.createElement("p");
    read.textContent = `Readed?: ${book_read}`;

    const index_num = document.createElement("hidden");
    index_num.id = index;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete Book";

    div.appendChild(title);
    div.appendChild(author);
    div.appendChild(pages);
    div.appendChild(year);
    div.appendChild(read);
    div.appendChild(index_num);
    div.appendChild(deleteButton);

    shelve.appendChild(div);
};


// Initialize addition to doom tree from preexisting library
(function initializeLibrary() {
    myLibrary.forEach(
        (book, index) => {
            addBookToDoom(book, index);
        }
    );
})(); // Immediately Invoked Function Expression


// Logic function to add to the library

function addBookToLibrary(title, author, pages, year) {
    myLibrary.push(new Book(title, author, pages, year)); // add to library
    addBookToDoom(myLibrary.slice(-1)); // Add to doom
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

// Basic variables definitions
const myLibrary = [];

myLibrary.push({title: "A Master of Djinn", author: "P.Djeli Clark", pages: 356, year: 2000});
myLibrary.push({title: "The Club Dumas", author: "Arturo Perez", pages: 225, year: 1998});

function Book (title, author, pages, year, read = false) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.year = year;
    this.read = read;
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
    div.setAttribute("id", index);

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


    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete Book";
    deleteButton.setAttribute("value", index);
    deleteButton.classList.add("deleteBtn");

    div.appendChild(title);
    div.appendChild(author);
    div.appendChild(pages);
    div.appendChild(year);
    div.appendChild(read);
    div.appendChild(deleteButton);

    shelve.appendChild(div);
};

// Logic function to add to the library

function addBookToLibrary(title, author, pages, year, read) {
    myLibrary.push(new Book(title, author, pages, year, read)); // Add to library
    addBookToDoom(myLibrary.slice(-1)[0],myLibrary.length-1); // Add to doom
    updateDelBook(); // Updates the event listeners for the delete button created
};

// Initialize addition to doom tree from preexisting library
(function initializeLibrary() {
    myLibrary.forEach(
        (book, index) => {
            addBookToDoom(book, index);
        }
    );

    updateDelBook(); // Creates the delete button event listener
})(); // Immediately Invoked Function Expression


// Web Page interaction logic

const dialog = document.querySelector("dialog");
const showButton = document.getElementById("addBook");
const closeButton = dialog.querySelector("#closeBtn");
const confirmButton = dialog.querySelector("#confirmBtn");

// "Add book to the shelve" button opens the dialog
showButton.addEventListener("click", () => {
    dialog.showModal();
});

//"Close" button closses the dialog
closeButton.addEventListener("click", () => {
    dialog.close();
});

// Closes the form adding a book

confirmButton.addEventListener("click", (event) => {
    event.preventDefault() //Dont really want to send the form

    const title = dialog.querySelector("#title").value;
    const author = dialog.querySelector("#author").value;
    const pages = dialog.querySelector("#pages").value;
    const year = dialog.querySelector("#year").value;
    const read = dialog.querySelector("#read").value;


    addBookToLibrary(title, author, pages, year, read == "false" ? false : true);
    dialog.close();
});

// To Delete a Book
function updateDelBook() { // Required so we can update the event listener to all the created buttons
    const deleteBtn = document.getElementsByClassName("deleteBtn");

    for (const button of deleteBtn) {
        button.addEventListener("click", () => {
            myLibrary.splice(+button.getAttribute("value"), 1);

            const deleteDiv = document.getElementById(button.getAttribute("value")); //Select the div to delete
            document.getElementsByClassName("shelve")[0].removeChild(deleteDiv); //Delete div from the DOM tree
            alert("Book deleted successfully")


            console.log("Book deleted successfully");
            console.log("This is your library ");
            console.log(myLibrary);
        })
    };
};


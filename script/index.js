// Basic variables definitions
const myLibrary = [];

function Book (title, author, pages, year, read = false) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.year = year;
    this.read = read;

    //Add unique identifier
};

myLibrary.push(new Book("A Master of Djinn", "P.Djeli Clark", 356, 2000, false));
myLibrary.push(new Book("The Club Dumas", "Arturo Perez", 225, 1998, false));

Book.prototype.markAsRead =  function(){
    this.read  = this.read === false ? true : false;

    this.read === true ? alert("Excelent !!, well done!") : alert("In due time!");
};

// Web Page JavaScript Selections

const dialog = document.querySelector("dialog");
const showButton = document.getElementById("addBook");
const closeButton = dialog.querySelector("#closeBtn");
const confirmButton = dialog.querySelector("#confirmBtn");
const selectOptions = document.getElementsByName("selectOptions");

// Add to the doom tree
function addBookToDoom(book, index) {
    book_title = book["title"];
    book_author = book["author"];
    book_pages = book["pages"];
    book_year = book["year"];
    book_read = book["read"];

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

    const read = document.createElement("label");
    read.setAttribute("for", "read");
    read.textContent = "Read?: ";

    const readOption = document.createElement("select");
    readOption.setAttribute("name", "selectOptions");
    readOption.setAttribute("index", index);

    const yesRead = document.createElement("option");
    yesRead.setAttribute("value", "Yes");
    yesRead.textContent = "Yes";

    const noRead = document.createElement("option");
    noRead.setAttribute("value", "No");
    noRead.textContent = "No";

    // To select the correct option
    if (book_read === false) {
        noRead.setAttribute("selected", "selected");
    } else {
        yesRead.setAttribute("selected", "selected");
    };

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete Book";
    deleteButton.setAttribute("value", book_title);
    deleteButton.setAttribute("name", "deleteBtn");
    deleteButton.classList.add("deleteBtn");

    read.appendChild(readOption);
    readOption.appendChild(yesRead);
    readOption.appendChild(noRead);


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
    updateReadOpt(); // Creates the read event listeners
};

// Initialize addition to doom tree from preexisting library
(function initializeLibrary() {
    myLibrary.forEach(
        (book, index) => {
            addBookToDoom(book, index);
        }
    );

    updateDelBook(); // Creates the delete button event listener
    updateReadOpt(); // Creates the read event listeners
})(); // Immediately Invoked Function Expression

// To Delete a Book
function updateDelBook() { // Required so we can update the event listener to all the created buttons
    const deleteBtn = document.getElementsByName("deleteBtn");

    for (const button of deleteBtn) {
        if (!button.hasAttribute("anexed")) { //This check an attribute used to avoid adding double event listeners (when pre-existing library is anexed and a book is created)
            button.setAttribute("anexed", true);
            button.addEventListener("click", (event) => {
                const deleteDiv = event.target.parentNode;
                document.getElementsByClassName("shelve")[0].removeChild(deleteDiv);

                // myLibrary.splice(+button.getAttribute("value"), 1); //Delete the node in the myLibrary array of Books objects
                // console.log(myLibrary);
                // const deleteDiv = document.getElementById(button.getAttribute("value")); //Select the div to delete
                // console.log(deleteDiv);
                alert("Book deleted successfully")
                // console.log("Book deleted successfully");
            });
        };

    };
};

// Add Event Listeners to all the "read?"" options
function updateReadOpt() {
    for (const option of selectOptions) {
        if (!option.hasAttribute("anexed")) { //This check an attribute used to avoid adding double event listeners (when pre-existing library is anexed and a book is created)
            option.addEventListener("change", (event) => {
                myLibrary[event.target.getAttribute("index")].markAsRead();
                event.target.setAttribute("anexed", "yes");
                console.log("Book Changed: ");
                console.log(myLibrary[event.target.getAttribute("index")]);
            });
        };
    };
};


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



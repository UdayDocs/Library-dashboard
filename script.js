var sideNav = document.querySelector('.side-nav');
var sideDash = document.querySelector('#side-dash');

sideDash.addEventListener('click', () => {
    sideNav.classList.toggle('side-nav_toggle')
});


////////////// Book Library Management


const library = [];
const dialog = document.querySelector("dialog");
const addBookButtons = document.querySelectorAll(".add-book");
const closeDialogButton = document.querySelector("dialog > button");
const textDiv = document.querySelector(".text");
const bookContainer = document.querySelector(".book-container");
const form = document.querySelector("form");


// Event listeners for dialog and form
addBookButtons.forEach(button => button.addEventListener("click", () => dialog.showModal()));
closeDialogButton.addEventListener("click", () => dialog.close());


form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (form.checkValidity()) {
        const title = form.title.value;
        const author = form.author.value;
        const pages = form.pages.value;
        const read = form.read.checked;
        addBookToLibrary(new Book(title, author, pages, read));
        form.reset();
        dialog.close();
    } else {
        form.reportValidity();
    }
});


// Book constructor it give tit,auth,pag,read to specificaly to those div block only by using this.XXXXX
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}


// Add book to library and update UI => Manipulating the DOM (creating elements, updating styles).
function addBookToLibrary(book) {
    library.push(book); // PUSH this content to library array
    if (library.length === 1) showBooks(); // This condition checks if the library contains only one book after a new book is added

    const bookDiv = document.createElement("div"); // 
    bookDiv.classList.add("book"); // add book css 
    bookDiv.innerHTML = `
        <p class="book-index">Book ${library.length}</p>
        <p><em>${book.title}</em></p>
        <p>By ${book.author}</p>
        <p>Pages: ${book.pages}</p>
        <div class="buttons">
            <button class="read-button ${book.read ? "checked" : "unchecked"}">${book.read ? "Read" : "Not Read"}</button>
            <button class="remove-button">Remove</button>
        </div>`;
    bookContainer.insertBefore(bookDiv, bookContainer.querySelector(".add-book")); //inserts the newly created bookDiv (representing a book) into the bookContainer, just before the "Add Book" button (+) should be always be the last block .
    addEventListeners(bookDiv, library.length - 1); //Adds event listeners to the buttons inside the newly created bookDiv & 
}


// Toggle visibility of the "No books" message 
function showBooks() { 
    const isVisible = textDiv.style.display !== "none"; //textDiv.style.display is not "none", it means the message is visible.
    textDiv.style.display = isVisible ? "none" : "block"; //if isVisible is true, hide the message by setting its display to "none" or show the message by setting its display to "block"
    bookContainer.style.display = isVisible ? "grid" : "none"; //If the message is visible (isVisible is true), set the bookContainer display to "grid" to show the books.
} //only one of the two elements (textDiv or bookContainer) is visible at a time



// Add event listeners to book buttons
function addEventListeners(bookDiv, index) {
    const readButton = bookDiv.querySelector(".read-button");
    const removeButton = bookDiv.querySelector(".remove-button");

    readButton.addEventListener("click", () => toggleRead(index, readButton));
    removeButton.addEventListener("click", () => removeBook(index, bookDiv));
}


// Toggle book read status
function toggleRead(index, button) { //
    library[index].read = !library[index].read;
    button.classList.toggle("checked");
    button.classList.toggle("unchecked");
    button.textContent = library[index].read ? "Read" : "Not Read";
}


// Remove book from library and update UI
function removeBook(index, bookDiv) {
    library.splice(index, 1);
    bookDiv.remove();
    updateBookIndexes();
    if (library.length === 0) showBooks();
}



// Update book index labels after removal
function updateBookIndexes() {
    bookContainer.querySelectorAll(".book").forEach((bookDiv, i) => {
        bookDiv.querySelector(".book-index").textContent = `Book ${i + 1}`;
    });
}
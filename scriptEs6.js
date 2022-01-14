class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}
class UI {
  AddBookToList(newBook) {
    // **Bring Container for book listing */
    const list = document.querySelector("#book-list");

    // **Create element tr tableRow element*/
    const tableRow = document.createElement("tr");
    // **Insert Column Td */
    tableRow.innerHTML = `
    <td>${newBook.title}</td>
    <td>${newBook.author}</td>
    <td>${newBook.isbn}</td>
    <td><a href="#" class="delete"> X </a></td>`;

    list.appendChild(tableRow);
  }
  // <----------------------------------------------------->
  showAlert(message, className) {
    //**Construct Element*/
    const div = document.createElement("div");

    //**Construct class - Two classes*/
    div.className = `alert ${className}`;

    //**append and text node*/
    div.appendChild(document.createTextNode(message));

    //**insert Element into dom--------Get parent El*/
    const container = document.querySelector(".container");

    //**after that get second elem bcz message should come before the it. */
    const subContainer = document.querySelector(".content-area");

    //**Now insert using insert before method */
    container.insertBefore(div, subContainer);

    //**disappear after 3 sec */
    setTimeout(function () {
      document.querySelector(".alert").remove();
    }, 2000);
  }
  // <----------------------------------------------------->
  deleteBook(target) {
    if (target.className === "delete") {
      target.parentElement.parentElement.remove();
    }
  }
  // <----------------------------------------------------->
  clearFields() {
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("isbn").value = "";
  }
}

// <----------------------------------------------------->
//**Local Storage */
class Store {
  static getBook() {
    let books;
    if (localStorage.getItem("books") === null) {
      books = [];
    } else {
      // run this through JSON.parse() to make it JS object
      books = JSON.parse(localStorage.getItem("books"));
    }
    return books;
  }
  // <----------------------------------------------------->
  static displayBook() {
    const books = Store.getBook();
    books.forEach(function (newBook) {
      const addBook = new UI();

      addBook.AddBookToList(newBook);
    });
  }
  // <----------------------------------------------------->
  static addBook(newBook) {
    const books = Store.getBook();

    books.push(newBook);

    localStorage.setItem("books", JSON.stringify(books));
  }
  // <----------------------------------------------------->
  static removeBook(isbn) {
    const books = Store.getBook();

    books.forEach(function (newBook, index) {
      if (newBook.isbn === isbn) {
        books.splice(index, 1);
      }
    });

    localStorage.setItem("books", JSON.stringify(books));
  }
}

// <----------------------------------------------------->
//**DOM Event Load */
document.addEventListener("DOMContentLoaded", Store.displayBook);

// <----------------------------------------------------->
// **Event Listener */
document.getElementById("book-form").addEventListener("submit", function (e) {
  const title = document.querySelector("#title").value,
    author = document.querySelector("#author").value,
    isbn = document.querySelector("#isbn").value;

  //**Instantiate Book Object  */
  const newBook = new Book(title, author, isbn);

  // **Instantiate UI  */
  const addBook = new UI();

  // **Validate Form  */
  if (title === "" || author === "" || isbn === "") {
    // alert("Failed");

    //**Error Alert - it will take msg and class name */
    addBook.showAlert("Please insert all fields.", "error");
  } else {
    // **Add Books to list */
    addBook.AddBookToList(newBook);

    //**ADd Books to Local Storage */
    Store.addBook(newBook);

    //**Show Success */
    addBook.showAlert("Book successfully added!", "success");

    //**Clear fields */
    addBook.clearFields();
  }

  e.preventDefault();
});

// <----------------------------------------------------->
//**Event listener for remove */
document.getElementById("book-list").addEventListener("click", function (e) {
  // **Instantiate UI  */
  const addBook = new UI();

  addBook.deleteBook(e.target);
  //**remove from local storage */

  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

  //**Show Alert */

  addBook.showAlert("Book removed successfully!", "success");
  e.preventDefault();
});

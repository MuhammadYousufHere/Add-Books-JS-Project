//**Book Constructor */

function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}
// **UI Constructor */
function UI() {}

UI.prototype.AddBookToList = function (newBook) {
  // **Bring Container for book listing */
  const list = document.querySelector("#book-list");

  // **Create element tr tableRow element*/
  const row = document.createElement("tr");
  // **Insert Column Td */
  row.innerHTML = `
<td>${newBook.title}</td>
<td>${newBook.author}</td>
<td>${newBook.isbn}</td>
<td><a href="#" class="delete"> X </a></td>
`;

  list.appendChild(row);
};

//**Error Alert - Prototype */

UI.prototype.showAlert = function (message, className) {
  //**Construct Element*/

  const div = document.createElement("div");
  //**Construct class - Two classes*/

  div.className = `alert ${className}`;
  //**append and text node*/
  div.appendChild(document.createTextNode(message));

  //**insert Element into dom*/
  //**get parent */
  const container = document.querySelector(".container");

  //**after that get form el  bcz message should come before the form */
  const subContainer = document.querySelector(".content-area");

  //**Now insert using insert before method */

  // container.appendChild(div);
  container.insertBefore(div, subContainer);

  //**disappear after 3 sec */

  setTimeout(function () {
    document.querySelector(".alert").remove();
  }, 2500);
};
//**Delete book */

UI.prototype.deleteBook = function (target) {
  if (target.className === "delete") {
    target.parentElement.parentElement.remove();
  }
};
//**Clear fields */
UI.prototype.clearFields = function () {
  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("isbn").value = "";
};

// **Event Listener */
document.getElementById("book-form").addEventListener("submit", function (e) {
  const title = document.querySelector("#title").value,
    author = document.querySelector("#author").value,
    isbn = document.querySelector("#isbn").value;

  //**Instantiate Book Object  */
  const newBook = new Book(title, author, isbn);

  // **Instantiate UI  */
  const addingBook = new UI();

  // **Validate Form  */
  if (title === "" || author === "" || isbn === "") {
    // alert("Failed");

    //**Error Alert - it will tak msg and class name */
    addingBook.showAlert("Please insert all fields.", "error");
  } else {
    // **Add Books to list */
    addingBook.AddBookToList(newBook);

    //**Show Success */
    addingBook.showAlert("Book successfully added!", "success");

    //**Clear fields */
    addingBook.clearFields();
  }

  e.preventDefault();
});

//**Event listener for remove */
document.getElementById("book-list").addEventListener("click", function (e) {
  // **Instantiate UI  */
  const addingBook = new UI();

  addingBook.deleteBook(e.target);

  //**Show Alert */

  addingBook.showAlert("Book removed successfully!", "success");
  e.preventDefault();
});

const contact = document.querySelector('.contact');
const but1 = document.querySelector('.but1');
const myDialog = document.querySelector('.myDialog');
const but2 = document.querySelector('.but2');
const but3 = document.querySelector('.but3');
const title = document.querySelector('.title-inpt');
const author = document.querySelector('.author-inpt');
const pages = document.querySelector('.pages-inpt');
const checkbox = document.querySelector('.checkbox');
const cards = document.querySelector('.cards');

contact.addEventListener('click', (e) => {
    e.preventDefault();
    alert('WhatsApp: +923184470898')
})
but1.addEventListener('click', () => {
    myDialog.showModal();
})
but3.addEventListener('click', () => {
    myDialog.close();
})

let titleVal = '';
let authorVal = '';
let pagesVal = '';
let statusVal = '';
let index = 0;
let indexVal;
let books;

but2.addEventListener('click', () => {
    if (!title.value == '' && !author.value == '' && !pages.value == '') {
        titleVal = title.value;
        authorVal = author.value;
        pagesVal = pages.value;
        if(checkbox.checked){
            statusVal = 'Read';
        }
        else{
            statusVal = 'Unread';
        }
        indexVal = index;
        index++;
        bookToLibrary();
        myDialog.close();
        title.value = '';
        author.value = '';
        pages.value = '';
        checkbox.checked = false;
    }
    else{
        alert('Kindly Fill All Feilds!')
    }
})

let myLibrary = [];
function Book(title, author, pages, status, index) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
    this.index  = index;
}
Book.prototype.toggleFunc = function() {
    if (this.status == 'Read') {
        this.status = 'Unread';
    }
    else{
        this.status = 'Read';
    }
    displayBooks();
}
function bookToLibrary() {
    books = new Book(titleVal, authorVal, pagesVal, statusVal, indexVal);
    myLibrary.push(books);
    displayBooks();
}
function displayBooks() {
    cards.innerHTML = '';
    for (let i=0; i<myLibrary.length; i++) {
        
        const card = document.createElement('div');
        card.classList.add('card');
        const titleDiv = document.createElement('div');
        const authorDiv = document.createElement('div');
        const pageDiv = document.createElement('div');
        const statusDiv = document.createElement('div');
        titleDiv.classList.add('titleDiv');
        authorDiv.classList.add('authorDiv');
        pageDiv.classList.add('pageDiv');
        statusDiv.classList.add('statusDiv');
        titleDiv.textContent = myLibrary[i].title;
        authorDiv.textContent = '- Author: ' + myLibrary[i].author;
        pageDiv.textContent = '- No. of Pages: ' + myLibrary[i].pages;
        statusDiv.textContent = '- Status: ' + myLibrary[i].status;

        const butHolder = document.createElement('div');
        butHolder.classList.add('butHolder');


        const toggleBut = document.createElement('button');
        toggleBut.textContent = 'Toggle Status';
        toggleBut.classList.add('toggleBut');
        toggleBut.setAttribute('data-index', i);
        toggleBut.addEventListener('click', (e) => {
            let y = e.target.getAttribute('data-index');
            myLibrary[y].toggleFunc();
        })


        const delBut = document.createElement('button');
        delBut.classList.add('delBut');
        delBut.setAttribute('data-index', i);
        delBut.textContent = 'Delete';
        delBut.addEventListener('click', (e) => {
            let x = e.target.getAttribute('data-index');
            myLibrary.splice(x, 1);
            displayBooks();
        })

        cards.appendChild(card);
        card.appendChild(titleDiv);
        card.appendChild(authorDiv);
        card.appendChild(pageDiv);
        card.appendChild(statusDiv);
        card.appendChild(butHolder);
        butHolder.appendChild(toggleBut);
        butHolder.appendChild(delBut);
    }
}
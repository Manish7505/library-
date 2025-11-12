// Books Page
const BooksPage = {
    STORAGE_KEY: 'library_my_books',

    books: [
        {
            title: 'Wings Of Fire',
            author: 'APJ Abdul Kalam',
            category: 'Auto Biography',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQp16xiXu1ZtTzbLy-eSwEK4Ng6cUpUZnuGbQ&usqp=CAU'
        },
        {
            title: 'The Power Of Your Subconscious Mind',
            author: 'Joseph Murphy',
            category: 'Psychology',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-Rb2t6jA5ml7n57qdTZbAOWX1qSfsLCbaOA&usqp=CAU'
        },
        {
            title: 'Elon Musk',
            author: 'Ashlee Vance',
            category: 'Auto Biography',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRFiDRQ7a-Oo-CnMmnbIMApP1Cq9B5bYx-UA&usqp=CAU'
        },
        {
            title: 'The Subtle Art Of Not Giving A F*ck',
            author: 'Mark Manson',
            category: 'Self-Help',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-Rb2t6jA5ml7n57qdTZbAOWX1qSfsLCbaOA&usqp=CAU'
        },
        {
            title: 'Think and Grow Rich',
            author: 'Napoleon Hill',
            category: 'Personal Growth',
            image: 'https://images-na.ssl-images-amazon.com/images/I/71UypkUjStL.jpg'
        },
        {
            title: 'Atomic Habits',
            author: 'James Clear',
            category: 'Productivity',
            image: 'https://images-na.ssl-images-amazon.com/images/I/81wgcld4wxL.jpg'
        }
    ],

    myBooks: [],
    selectedBookIndex: null,

    render() {
        this.loadMyBooks();
        const content = document.getElementById('app-content');

        content.innerHTML = `
            <div class="books-page">
                <div class="books-layout">
                    <section class="books-catalog">
                        <div class="section-heading">
                            <h2>Browse Books</h2>
                            <p>Select a title to issue or add to your personal shelf.</p>
                        </div>
                        <div class="books-grid">
                            ${this.books.map((book, index) => this.createBookCard(book, index)).join('')}
                        </div>
                    </section>
                    <aside class="my-books-section">
                        <div class="my-books-header">
                            <h2>My Bookshelf</h2>
                            <button class="clear-btn" id="clear-my-books" ${this.myBooks.length === 0 ? 'disabled' : ''}>
                                Clear All
                            </button>
                        </div>
                        <p class="my-books-empty" ${this.myBooks.length ? 'style="display:none;"' : ''}>
                            Nothing here yet. Click on a book to issue or add it to your shelf.
                        </p>
                        <ul class="my-books-list">
                            ${this.myBooks.map((entry, index) => this.createMyBookItem(entry, index)).join('')}
                        </ul>
                    </aside>
                </div>
            </div>
            ${this.createModal()}
        `;

        this.attachEvents();
    },

    createBookCard(book, index) {
        return `
            <article class="book-card" data-index="${index}" tabindex="0">
                <img src="${book.image}" alt="${book.title}" class="book-cover">
                <div class="book-info">
                    <h3 class="book-title">${book.title}</h3>
                    <p class="book-author">By ${book.author}</p>
                    <div class="book-category">
                        <span class="category-tag">${book.category}</span>
                    </div>
                </div>
                <div class="book-card-footer">
                    <button class="book-action-link" data-index="${index}">
                        View Options <span class="material-icons">arrow_forward</span>
                    </button>
                </div>
            </article>
        `;
    },

    createMyBookItem(entry, index) {
        return `
            <li class="my-book-item">
                <div class="my-book-info">
                    <h4>${entry.title}</h4>
                    <p>${entry.author}</p>
                    <span class="my-book-tag">${entry.action === 'issue' ? 'Issued' : 'Wishlist'}</span>
                    <span class="my-book-date">${Utils.formatDate(entry.addedAt)}</span>
                </div>
                <button class="remove-btn" data-remove-index="${index}" title="Remove">
                    <span class="material-icons">delete</span>
                </button>
            </li>
        `;
    },

    createModal() {
        return `
            <div id="book-modal" class="book-modal hidden" aria-hidden="true">
                <div class="book-modal-overlay" data-dismiss></div>
                <div class="book-modal-content" role="dialog" aria-modal="true">
                    <button class="modal-close" data-dismiss aria-label="Close dialog">
                        <span class="material-icons">close</span>
                    </button>
                    <div class="modal-body">
                        <img id="modal-book-image" src="" alt="" class="modal-book-cover">
                        <div class="modal-book-details">
                            <h3 id="modal-book-title"></h3>
                            <p id="modal-book-author"></p>
                            <span id="modal-book-category" class="category-tag"></span>
                            <p class="modal-instructions">
                                What would you like to do with this book?
                            </p>
                            <div class="modal-actions">
                                <button class="modal-action-btn issue" data-action="issue">
                                    <span class="material-icons">library_add</span>
                                    Issue Book
                                </button>
                                <button class="modal-action-btn wishlist" data-action="wishlist">
                                    <span class="material-icons">favorite</span>
                                    Add to Wishlist
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    attachEvents() {
        // Card click handlers
        document.querySelectorAll('.book-card').forEach(card => {
            const index = Number(card.dataset.index);
            card.addEventListener('click', () => this.openModal(index));
            card.addEventListener('keypress', (event) => {
                if (event.key === 'Enter') {
                    this.openModal(index);
                }
            });
        });

        document.querySelectorAll('.book-action-link').forEach(btn => {
            const index = Number(btn.dataset.index);
            btn.addEventListener('click', (event) => {
                event.stopPropagation();
                this.openModal(index);
            });
        });

        // Modal events
        const modal = document.getElementById('book-modal');
        if (modal) {
            modal.querySelectorAll('[data-dismiss]').forEach(btn => {
                btn.addEventListener('click', () => this.closeModal());
            });

            modal.querySelectorAll('.modal-action-btn').forEach(btn => {
                btn.addEventListener('click', (event) => {
                    const action = event.currentTarget.dataset.action;
                    this.handleBookAction(action);
                });
            });
        }

        // Clear shelf
        const clearBtn = document.getElementById('clear-my-books');
        if (clearBtn) {
            clearBtn.addEventListener('click', () => {
                if (confirm('Remove all books from your shelf?')) {
                    this.myBooks = [];
                    this.saveMyBooks();
                    this.render();
                    // Refresh header to update badge count
                    if (window.Header) {
                        Header.render();
                    }
                }
            });
        }

        // Remove single book
        document.querySelectorAll('[data-remove-index]').forEach(btn => {
            btn.addEventListener('click', (event) => {
                const idx = Number(event.currentTarget.dataset.removeIndex);
                this.removeBook(idx);
            });
        });
    },

    openModal(index) {
        this.selectedBookIndex = index;
        const book = this.books[index];
        const modal = document.getElementById('book-modal');

        if (modal && book) {
            modal.querySelector('#modal-book-image').src = book.image;
            modal.querySelector('#modal-book-image').alt = book.title;
            modal.querySelector('#modal-book-title').textContent = book.title;
            modal.querySelector('#modal-book-author').textContent = `By ${book.author}`;
            modal.querySelector('#modal-book-category').textContent = book.category;

            modal.classList.remove('hidden');
            modal.setAttribute('aria-hidden', 'false');
        }
    },

    closeModal() {
        const modal = document.getElementById('book-modal');
        if (modal) {
            modal.classList.add('hidden');
            modal.setAttribute('aria-hidden', 'true');
            this.selectedBookIndex = null;
        }
    },

    handleBookAction(action) {
        if (this.selectedBookIndex === null) return;

        const book = this.books[this.selectedBookIndex];
        const entry = {
            ...book,
            action: action === 'issue' ? 'issue' : 'wishlist',
            addedAt: new Date().toISOString()
        };

        this.myBooks = [entry, ...this.myBooks];
        this.saveMyBooks();
        Utils.showAlert(
            action === 'issue'
                ? `"${book.title}" issued successfully!`
                : `"${book.title}" added to your wishlist!`,
            'success'
        );

        this.closeModal();
        this.render();
        
        // Refresh header to update badge count
        if (window.Header) {
            Header.render();
        }
    },

    removeBook(index) {
        this.myBooks.splice(index, 1);
        this.saveMyBooks();
        this.render();
        
        // Refresh header to update badge count
        if (window.Header) {
            Header.render();
        }
    },

    loadMyBooks() {
        try {
            const stored = localStorage.getItem(this.STORAGE_KEY);
            this.myBooks = stored ? JSON.parse(stored) : [];
        } catch (error) {
            console.error('Failed to load shelf from storage', error);
            this.myBooks = [];
        }
    },

    saveMyBooks() {
        try {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.myBooks));
        } catch (error) {
            console.error('Failed to save shelf to storage', error);
        }
    }
};


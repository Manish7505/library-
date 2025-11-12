// My Books Page - Dedicated page for user's book collection
const MyBooksPage = {
    STORAGE_KEY: 'library_my_books',
    myBooks: [],
    filterType: 'all', // 'all', 'issue', 'wishlist'

    render() {
        this.loadMyBooks();
        const content = document.getElementById('app-content');

        const issuedBooks = this.myBooks.filter(b => b.action === 'issue');
        const wishlistBooks = this.myBooks.filter(b => b.action === 'wishlist');

        content.innerHTML = `
            <div class="my-books-page">
                <div class="my-books-hero">
                    <div class="hero-content">
                        <h1><span class="material-icons">menu_book</span> My Personal Library</h1>
                        <p>Your curated collection of books and wishlist</p>
                    </div>
                    <div class="stats-cards">
                        <div class="stat-card issued">
                            <span class="material-icons">library_books</span>
                            <div class="stat-info">
                                <h3>${issuedBooks.length}</h3>
                                <p>Books Issued</p>
                            </div>
                        </div>
                        <div class="stat-card wishlist">
                            <span class="material-icons">favorite</span>
                            <div class="stat-info">
                                <h3>${wishlistBooks.length}</h3>
                                <p>In Wishlist</p>
                            </div>
                        </div>
                        <div class="stat-card total">
                            <span class="material-icons">auto_stories</span>
                            <div class="stat-info">
                                <h3>${this.myBooks.length}</h3>
                                <p>Total Books</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="my-books-container">
                    <div class="filter-bar">
                        <div class="filter-buttons">
                            <button class="filter-btn ${this.filterType === 'all' ? 'active' : ''}" data-filter="all">
                                <span class="material-icons">grid_view</span> All Books
                            </button>
                            <button class="filter-btn ${this.filterType === 'issue' ? 'active' : ''}" data-filter="issue">
                                <span class="material-icons">library_books</span> Issued
                            </button>
                            <button class="filter-btn ${this.filterType === 'wishlist' ? 'active' : ''}" data-filter="wishlist">
                                <span class="material-icons">favorite</span> Wishlist
                            </button>
                        </div>
                        ${this.myBooks.length > 0 ? `
                            <button class="clear-all-btn" id="clear-all-books">
                                <span class="material-icons">delete_sweep</span> Clear All
                            </button>
                        ` : ''}
                    </div>

                    ${this.myBooks.length === 0 ? this.renderEmptyState() : this.renderBookGrid()}
                </div>
            </div>
        `;

        this.attachEvents();
    },

    renderEmptyState() {
        return `
            <div class="empty-state">
                <span class="material-icons empty-icon">library_books</span>
                <h2>No Books Yet</h2>
                <p>Start building your personal library by browsing our collection</p>
                <a href="#/books" class="browse-btn">
                    <span class="material-icons">explore</span> Browse Books
                </a>
            </div>
        `;
    },

    renderBookGrid() {
        const filteredBooks = this.filterType === 'all' 
            ? this.myBooks 
            : this.myBooks.filter(book => book.action === this.filterType);

        if (filteredBooks.length === 0) {
            return `
                <div class="no-results">
                    <p>No books in this category</p>
                </div>
            `;
        }

        return `
            <div class="my-books-grid">
                ${filteredBooks.map((book, index) => this.renderBookCard(book, index)).join('')}
            </div>
        `;
    },

    renderBookCard(book, index) {
        const actualIndex = this.myBooks.indexOf(book);
        return `
            <article class="my-book-card">
                <div class="book-image-wrapper">
                    <img src="${book.image}" alt="${book.title}" class="my-book-image">
                    <div class="book-status-badge ${book.action}">
                        <span class="material-icons">
                            ${book.action === 'issue' ? 'library_books' : 'favorite'}
                        </span>
                        ${book.action === 'issue' ? 'Issued' : 'Wishlist'}
                    </div>
                </div>
                <div class="my-book-details">
                    <h3 class="my-book-title">${book.title}</h3>
                    <p class="my-book-author">
                        <span class="material-icons">person</span>
                        ${book.author}
                    </p>
                    <div class="my-book-meta">
                        <span class="book-category-pill">${book.category}</span>
                        <span class="book-added-date">
                            <span class="material-icons">schedule</span>
                            ${Utils.formatDate(book.addedAt)}
                        </span>
                    </div>
                    <div class="book-actions">
                        ${book.action === 'wishlist' ? `
                            <button class="action-btn issue-btn" data-convert-index="${actualIndex}">
                                <span class="material-icons">library_add</span>
                                Issue Now
                            </button>
                        ` : `
                            <button class="action-btn return-btn" data-return-index="${actualIndex}">
                                <span class="material-icons">assignment_return</span>
                                Mark Returned
                            </button>
                        `}
                        <button class="action-btn remove-btn" data-remove-index="${actualIndex}">
                            <span class="material-icons">delete</span>
                            Remove
                        </button>
                    </div>
                </div>
            </article>
        `;
    },

    attachEvents() {
        // Filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.filterType = e.currentTarget.dataset.filter;
                this.render();
            });
        });

        // Clear all button
        const clearAllBtn = document.getElementById('clear-all-books');
        if (clearAllBtn) {
            clearAllBtn.addEventListener('click', () => {
                if (confirm('Are you sure you want to remove all books from your library?')) {
                    this.myBooks = [];
                    this.saveMyBooks();
                    Utils.showAlert('All books removed from your library', 'info');
                    this.render();
                    // Refresh header to update badge count
                    if (window.Header) {
                        Header.render();
                    }
                }
            });
        }

        // Remove individual book
        document.querySelectorAll('[data-remove-index]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = Number(e.currentTarget.dataset.removeIndex);
                const book = this.myBooks[index];
                if (confirm(`Remove "${book.title}" from your library?`)) {
                    this.myBooks.splice(index, 1);
                    this.saveMyBooks();
                    Utils.showAlert('Book removed from your library', 'success');
                    this.render();
                    // Refresh header to update badge count
                    if (window.Header) {
                        Header.render();
                    }
                }
            });
        });

        // Convert wishlist to issued
        document.querySelectorAll('[data-convert-index]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = Number(e.currentTarget.dataset.convertIndex);
                this.myBooks[index].action = 'issue';
                this.myBooks[index].addedAt = new Date().toISOString();
                this.saveMyBooks();
                Utils.showAlert(`"${this.myBooks[index].title}" issued successfully!`, 'success');
                this.render();
            });
        });

        // Mark as returned
        document.querySelectorAll('[data-return-index]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = Number(e.currentTarget.dataset.returnIndex);
                const book = this.myBooks[index];
                if (confirm(`Mark "${book.title}" as returned and remove from issued books?`)) {
                    this.myBooks.splice(index, 1);
                    this.saveMyBooks();
                    Utils.showAlert('Book marked as returned', 'success');
                    this.render();
                    // Refresh header to update badge count
                    if (window.Header) {
                        Header.render();
                    }
                }
            });
        });
    },

    loadMyBooks() {
        try {
            const stored = localStorage.getItem(this.STORAGE_KEY);
            this.myBooks = stored ? JSON.parse(stored) : [];
        } catch (error) {
            console.error('Failed to load books from storage', error);
            this.myBooks = [];
        }
    },

    saveMyBooks() {
        try {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.myBooks));
        } catch (error) {
            console.error('Failed to save books to storage', error);
        }
    },

    getMyBooksCount() {
        this.loadMyBooks();
        return this.myBooks.length;
    }
};


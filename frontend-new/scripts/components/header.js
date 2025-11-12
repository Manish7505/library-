// Header Component
const Header = {
    allBooks: [
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

    render() {
        const user = Auth.getUser();
        const header = document.getElementById('main-header');
        
        // Get book count from storage
        const myBooksCount = this.getMyBooksCount();
        
        header.innerHTML = `
            <div class="library-header">
                <div class="logo-section">
                    <a href="#/" class="logo-link">LIBRARY</a>
                </div>
                <div class="nav-section">
                    <div class="search-container">
                        <input type="text" class="search-box" placeholder="Search a Book" id="search-input">
                        <span class="material-icons search-icon">search</span>
                        <div class="search-suggestions" id="search-suggestions"></div>
                    </div>
                    <nav class="main-nav" id="main-nav">
                        <a href="#/" class="nav-link">
                            <span class="material-icons">home</span> Home
                        </a>
                        <a href="#/books" class="nav-link">
                            <span class="material-icons">menu_book</span> Books
                        </a>
                        <a href="#/my-books" class="nav-link">
                            <span class="material-icons">auto_stories</span> My Books
                            ${myBooksCount > 0 ? `<span class="book-count-badge">${myBooksCount}</span>` : ''}
                        </a>
                        ${user ? `
                            <a href="#/dashboard/${user.isAdmin ? 'admin' : 'member'}" class="nav-link">
                                <span class="material-icons">dashboard</span> Dashboard
                            </a>
                            <a href="#" class="nav-link" id="logout-btn">
                                <span class="material-icons">logout</span> Logout
                            </a>
                        ` : `
                            <a href="#/signin" class="nav-link">
                                <span class="material-icons">login</span> Sign In
                            </a>
                        `}
                    </nav>
                    <button class="mobile-menu-btn" id="mobile-menu-btn">
                        <span class="material-icons">menu</span>
                    </button>
                </div>
            </div>
        `;

        this.attachEvents();
    },

    getMyBooksCount() {
        try {
            const stored = localStorage.getItem('library_my_books');
            const myBooks = stored ? JSON.parse(stored) : [];
            return myBooks.length;
        } catch (error) {
            return 0;
        }
    },

    attachEvents() {
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const mainNav = document.getElementById('main-nav');
        const logoutBtn = document.getElementById('logout-btn');
        const searchInput = document.getElementById('search-input');

        if (mobileMenuBtn) {
            mobileMenuBtn.addEventListener('click', () => {
                mainNav.classList.toggle('active');
                const icon = mobileMenuBtn.querySelector('.material-icons');
                icon.textContent = mainNav.classList.contains('active') ? 'close' : 'menu';
            });
        }

        if (logoutBtn) {
            logoutBtn.addEventListener('click', (e) => {
                e.preventDefault();
                if (confirm('Are you sure you want to logout?')) {
                    Auth.logout();
                }
            });
        }

        // Search functionality
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.handleSearch(e.target.value);
            });

            searchInput.addEventListener('focus', (e) => {
                if (e.target.value.trim()) {
                    this.handleSearch(e.target.value);
                }
            });

            // Close suggestions when clicking outside
            document.addEventListener('click', (e) => {
                const searchContainer = document.querySelector('.search-container');
                if (searchContainer && !searchContainer.contains(e.target)) {
                    this.closeSuggestions();
                }
            });
        }

        // Close mobile menu on link click
        const navLinks = mainNav.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mainNav.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('.material-icons');
                icon.textContent = 'menu';
            });
        });
    },

    handleSearch(query) {
        const suggestionsContainer = document.getElementById('search-suggestions');
        
        if (!query.trim()) {
            this.closeSuggestions();
            return;
        }

        const searchTerm = query.toLowerCase();
        const results = this.allBooks.filter(book => 
            book.title.toLowerCase().includes(searchTerm) ||
            book.author.toLowerCase().includes(searchTerm) ||
            book.category.toLowerCase().includes(searchTerm)
        );

        if (results.length === 0) {
            suggestionsContainer.innerHTML = `
                <div class="no-suggestions">
                    <span class="material-icons">search_off</span>
                    <p>No books found</p>
                </div>
            `;
            suggestionsContainer.classList.add('active');
            return;
        }

        suggestionsContainer.innerHTML = results.map(book => `
            <div class="suggestion-item" data-book='${JSON.stringify(book)}'>
                <img src="${book.image}" alt="${book.title}" class="suggestion-image">
                <div class="suggestion-details">
                    <h4>${this.highlightMatch(book.title, query)}</h4>
                    <p>${this.highlightMatch(book.author, query)}</p>
                    <span class="suggestion-category">${book.category}</span>
                </div>
                <span class="material-icons suggestion-arrow">arrow_forward</span>
            </div>
        `).join('');

        suggestionsContainer.classList.add('active');

        // Attach click events to suggestions
        document.querySelectorAll('.suggestion-item').forEach(item => {
            item.addEventListener('click', () => {
                const book = JSON.parse(item.dataset.book);
                this.selectBook(book);
            });
        });
    },

    highlightMatch(text, query) {
        const regex = new RegExp(`(${query})`, 'gi');
        return text.replace(regex, '<mark>$1</mark>');
    },

    selectBook(book) {
        // Navigate to books page and show modal for selected book
        window.location.hash = '#/books';
        this.closeSuggestions();
        document.getElementById('search-input').value = '';
        
        // Wait for books page to load, then trigger book selection
        setTimeout(() => {
            if (window.BooksPage) {
                const bookIndex = BooksPage.books.findIndex(b => b.title === book.title);
                if (bookIndex !== -1) {
                    BooksPage.openModal(bookIndex);
                }
            }
        }, 100);
    },

    closeSuggestions() {
        const suggestionsContainer = document.getElementById('search-suggestions');
        if (suggestionsContainer) {
            suggestionsContainer.classList.remove('active');
            suggestionsContainer.innerHTML = '';
        }
    }
};



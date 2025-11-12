// Home Page
const HomePage = {
    render() {
        const content = document.getElementById('app-content');
        content.innerHTML = `
            <!-- Image Slider -->
            <section class="hero-slider">
                <div id="heroCarousel" class="carousel slide" data-ride="carousel">
                    <div class="carousel-inner">
                        <div class="carousel-item active">
                            <img src="https://images.unsplash.com/photo-1616070152767-3eb99cf10509?w=1200&h=500&fit=crop" alt="Library" class="d-block w-100">
                            <div class="carousel-caption">
                                <h2>Welcome to Our Library</h2>
                                <p>Discover a world of knowledge</p>
                            </div>
                        </div>
                        <div class="carousel-item">
                            <img src="https://images.unsplash.com/photo-1502136969935-8d8eef54d77b?w=1200&h=500&fit=crop" alt="Books" class="d-block w-100">
                            <div class="carousel-caption">
                                <h2>Vast Collection</h2>
                                <p>Thousands of books at your fingertips</p>
                            </div>
                        </div>
                        <div class="carousel-item">
                            <img src="https://images.unsplash.com/photo-1608454367599-c133fcab1245?w=1200&h=500&fit=crop" alt="Reading" class="d-block w-100">
                            <div class="carousel-caption">
                                <h2>Read & Learn</h2>
                                <p>Knowledge is power</p>
                            </div>
                        </div>
                    </div>
                    <a class="carousel-control-prev" href="#heroCarousel" role="button" data-slide="prev">
                        <span class="carousel-control-prev-icon"></span>
                    </a>
                    <a class="carousel-control-next" href="#heroCarousel" role="button" data-slide="next">
                        <span class="carousel-control-next-icon"></span>
                    </a>
                </div>
            </section>

            <!-- Welcome Section -->
            <section class="welcome-section">
                <h1 class="welcome-title">WELCOME TO LIBRARY</h1>
                <p class="welcome-message">Feed Your Brain<br><span class="welcome-sub">Grab A Book To Read</span></p>
            </section>

            <!-- About Section -->
            <section class="about-section">
                <div class="container">
                    <h2 class="section-title">About the Library</h2>
                    <div class="about-content">
                        <div class="about-image">
                            <img src="https://images.unsplash.com/photo-1583468982228-19f19164aee2?w=700&h=500&fit=crop" alt="Library">
                        </div>
                        <div class="about-text">
                            <p>
                                Our library is a comprehensive learning resource center that serves students, faculty, and staff. 
                                With thousands of books, journals, and digital resources, we provide access to information 
                                that supports academic excellence and lifelong learning.
                            </p>
                            <p>
                                Established with the vision of creating a hub of knowledge, our library continues to evolve 
                                with modern technology while maintaining the charm of traditional reading spaces.
                            </p>
                            <p>
                                We offer a wide range of services including book lending, reservation systems, study spaces, 
                                and digital resources to support your learning journey.
                            </p>
                            <p><strong>Your suggestions for improvement are always welcome!</strong></p>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Stats Section -->
            <section class="stats-section">
                <div class="stat-card">
                    <span class="material-icons stat-icon">library_books</span>
                    <h3 class="stat-title">Total Books</h3>
                    <p class="stat-number">3,254</p>
                </div>
                <div class="stat-card">
                    <span class="material-icons stat-icon">people</span>
                    <h3 class="stat-title">Total Members</h3>
                    <p class="stat-number">254</p>
                </div>
                <div class="stat-card">
                    <span class="material-icons stat-icon">book_online</span>
                    <h3 class="stat-title">Reservations</h3>
                    <p class="stat-number">54</p>
                </div>
            </section>

            <!-- Recent Books Section -->
            <section class="recent-books-section">
                <h2 class="section-title">Recent Uploads</h2>
                <div class="books-scroll">
                    <div class="books-track">
                        ${this.generateBookImages()}
                    </div>
                    <div class="books-track">
                        ${this.generateBookImages()}
                    </div>
                </div>
            </section>

            <!-- Popular Books Section -->
            <section class="popular-books-section">
                <h2 class="section-title">Popular Books</h2>
                <div class="books-scroll">
                    <div class="books-track">
                        ${this.generatePopularBooks()}
                    </div>
                    <div class="books-track">
                        ${this.generatePopularBooks()}
                    </div>
                </div>
            </section>

            <!-- Reserved Books Section -->
            <section class="reserved-books-section">
                <div class="container">
                    <h2 class="section-title">Books On Hold</h2>
                    <table class="reserved-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Book</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr><td>Pranav</td><td>Rich Dad Poor Dad</td><td>12/7/2021</td></tr>
                            <tr><td>Sashank</td><td>The Subtle Art</td><td>10/7/2021</td></tr>
                            <tr><td>Tanishq</td><td>Wings Of Fire</td><td>15/9/2021</td></tr>
                            <tr><td>Akhil</td><td>The Secret</td><td>02/9/2021</td></tr>
                            <tr><td>Surya</td><td>Bad Guys</td><td>21/7/2021</td></tr>
                            <tr><td>Dinesh</td><td>Giovanni Rovelli</td><td>02/7/2021</td></tr>
                        </tbody>
                    </table>
                </div>
            </section>

            <!-- News Section -->
            <section class="news-section">
                <h2 class="section-title">Updates for You</h2>
                <div class="news-grid">
                    <div class="news-column">
                        <h3 class="news-subtitle">Competitions</h3>
                        ${this.generateNewsItems('Competition', 3)}
                    </div>
                    <div class="news-column">
                        <h3 class="news-subtitle">Online Quiz</h3>
                        ${this.generateNewsItems('Quiz', 3)}
                    </div>
                </div>
            </section>

            <!-- Footer -->
            <footer class="main-footer">
                <div class="footer-content">
                    <div class="footer-column">
                        <h4>Contact Us</h4>
                    </div>
                    <div class="footer-column">
                        <h4>Useful Links</h4>
                        <a href="#/">Home</a>
                        <a href="#/books">Books</a>
                        <a href="#/signin">Sign In</a>
                        <a href="#/">About</a>
                    </div>
                    <div class="footer-column">
                        <h4>Librarian</h4>
                        <p>Name: Harshit Rohila</p>
                        <p>Contact: +91 88650 67282</p>
                        <p>Education: B.tech / cs</p>
                        <p>Address: ABES engineering college, ghaziabad 201009</p>
                    </div>
                </div>
                <div class="footer-social">
                    <span class="material-icons social-icon">alternate_email</span>
                    <span class="material-icons social-icon">work</span>
                    <span class="material-icons social-icon">send</span>
                    <span class="material-icons social-icon">camera_alt</span>
                </div>
                <div class="footer-copyright">
                    <p>© 2020 copyright all right reserved<br><span>Made with ❤️ by Harshit Rohila</span></p>
                </div>
            </footer>
        `;
    },

    generateBookImages() {
        const books = [
            'https://inkinmytea.files.wordpress.com/2011/12/apj.jpg?w=640',
            'https://images-na.ssl-images-amazon.com/images/I/91VokXkn8hL.jpg',
            'https://images-na.ssl-images-amazon.com/images/I/81-QB7nDh4L.jpg',
            'https://images-na.ssl-images-amazon.com/images/I/71m-MxdJ2WL.jpg',
            'https://images-na.ssl-images-amazon.com/images/I/71t4GuxLCuL.jpg',
            'https://images-na.ssl-images-amazon.com/images/I/81mXQdi5x+L.jpg'
        ];
        return books.map(img => `<img src="${img}" alt="Book" class="book-img">`).join('');
    },

    generatePopularBooks() {
        const books = [
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRS34iIDoKVXOhKhdwsiGSLc9RJmtq_lSQDig&usqp=CAU',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfRHNwRyPkTxnMOzOvv5dOK4OS_lq4-2Yugg&usqp=CAU',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7ElcNy_v2Ri1H3VhYjYP1MzR6zBUwFQWbOirCkaqcfOqJnbrK5ZvdZNUwEfrlmJwn7pA&usqp=CAU'
        ];
        return books.map(img => `<img src="${img}" alt="Book" class="book-img">`).join('');
    },

    generateNewsItems(type, count) {
        let html = '';
        for (let i = 1; i <= count; i++) {
            html += `
                <div class="news-item">
                    <h5>${type}-${i}</h5>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                </div>
            `;
        }
        return html;
    }
};



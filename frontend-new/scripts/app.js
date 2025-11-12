// Main Application Entry Point
document.addEventListener('DOMContentLoaded', () => {
    // Make BooksPage globally accessible for search functionality
    window.BooksPage = BooksPage;

    // Register routes
    Router.register('/', () => {
        Header.render();
        HomePage.render();
    });

    Router.register('/signin', () => {
        Header.render();
        SigninPage.render();
    });

    Router.register('/signup', () => {
        Header.render();
        SignupPage.render();
    });

    Router.register('/books', () => {
        Header.render();
        BooksPage.render();
    });

    Router.register('/my-books', () => {
        Header.render();
        MyBooksPage.render();
    });

    Router.register('/dashboard/member', () => {
        Header.render();
        MemberDashboardPage.render();
    });

    Router.register('/dashboard/admin', () => {
        Header.render();
        AdminDashboardPage.render();
    });

    // Subscribe to auth changes
    Auth.onAuthChange(() => {
        if (document.getElementById('main-header')) {
            Header.render();
        }
    });

    // Initialize router
    Router.init();

    // Initialize Bootstrap carousel
    if (typeof $ !== 'undefined') {
        $('.carousel').carousel({
            interval: 3000
        });
    }

});



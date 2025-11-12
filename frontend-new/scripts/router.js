// Simple Hash-based Router
const Router = {
    routes: {},
    currentRoute: null,

    // Initialize router
    init() {
        window.addEventListener('hashchange', () => this.handleRoute());
        window.addEventListener('load', () => this.handleRoute());
    },

    // Register a route
    register(path, handler) {
        this.routes[path] = handler;
    },

    // Handle route change
    handleRoute() {
        const hash = window.location.hash.slice(1) || '/';
        const route = hash.split('?')[0];

        // Check authentication
        if (route.includes('/dashboard')) {
            if (!Auth.isAuthenticated()) {
                this.navigate('/signin');
                return;
            }
        }

        // Redirect logged in users from signin
        if (route === '/signin' && Auth.isAuthenticated()) {
            const user = Auth.getUser();
            this.navigate(user.isAdmin ? '/dashboard/admin' : '/dashboard/member');
            return;
        }

        // Find and execute route handler
        const handler = this.routes[route] || this.routes['/'];
        if (handler) {
            this.currentRoute = route;
            handler();
        }
    },

    // Navigate to a route
    navigate(path) {
        window.location.hash = '#' + path;
    },

    // Get current route
    getCurrentRoute() {
        return this.currentRoute;
    }
};



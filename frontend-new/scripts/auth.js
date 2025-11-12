// Simple Authentication Manager
const Auth = {
    USER_KEY: 'library_user',
    USERS_KEY: 'library_users', // For storing registered users

    // Initialize default users
    init() {
        const users = this.getUsers();
        
        // Add default demo users if they don't exist
        if (!users.find(u => u.userId === 'STU001')) {
            users.push({
                userId: 'STU001',
                password: 'student123',
                name: 'Demo Student',
                isStaff: false,
                isAdmin: false
            });
        }

        if (!users.find(u => u.userId === 'STAFF001')) {
            users.push({
                userId: 'STAFF001',
                password: 'staff123',
                name: 'Demo Staff',
                isStaff: true,
                isAdmin: true
            });
        }

        this.saveUsers(users);
    },

    // Get all registered users
    getUsers() {
        try {
            const usersStr = localStorage.getItem(this.USERS_KEY);
            return usersStr ? JSON.parse(usersStr) : [];
        } catch (error) {
            console.error('Error reading users:', error);
            return [];
        }
    },

    // Save users
    saveUsers(users) {
        try {
            localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
        } catch (error) {
            console.error('Error saving users:', error);
        }
    },

    // Get current user
    getUser() {
        const userStr = localStorage.getItem(this.USER_KEY);
        return userStr ? JSON.parse(userStr) : null;
    },

    // Set user
    setUser(user) {
        if (user) {
            localStorage.setItem(this.USER_KEY, JSON.stringify(user));
        } else {
            localStorage.removeItem(this.USER_KEY);
        }
        this.triggerAuthChange();
    },

    // Check if user is authenticated
    isAuthenticated() {
        return this.getUser() !== null;
    },

    // Check if user is admin
    isAdmin() {
        const user = this.getUser();
        return user && user.isAdmin === true;
    },

    // Login
    async login(credentials) {
        try {
            const { userId, password, isStaff } = credentials;
            const users = this.getUsers();

            // Find user
            const user = users.find(u => 
                u.userId.toLowerCase() === userId.toLowerCase() && 
                u.isStaff === isStaff
            );

            if (!user) {
                return { 
                    success: false, 
                    message: `No ${isStaff ? 'staff' : 'student'} found with this ID` 
                };
            }

            if (user.password !== password) {
                return { 
                    success: false, 
                    message: 'Incorrect password' 
                };
            }

            // Create user session
            const sessionUser = {
                userId: user.userId,
                name: user.name,
                isStaff: user.isStaff,
                isAdmin: user.isAdmin || false
            };

            this.setUser(sessionUser);
            return { success: true, user: sessionUser };

        } catch (error) {
            console.error('Login error:', error);
            return { success: false, message: 'An error occurred. Please try again.' };
        }
    },

    // Sign up
    async signup(userData) {
        try {
            const { name, userId, password, isStaff } = userData;
            const users = this.getUsers();

            // Check if user already exists
            const existingUser = users.find(u => 
                u.userId.toLowerCase() === userId.toLowerCase() && 
                u.isStaff === isStaff
            );

            if (existingUser) {
                return { 
                    success: false, 
                    message: `A ${isStaff ? 'staff' : 'student'} with this ID already exists` 
                };
            }

            // Create new user
            const newUser = {
                userId: userId.trim(),
                password: password,
                name: name.trim(),
                isStaff: isStaff || false,
                isAdmin: false // New users are not admin by default
            };

            users.push(newUser);
            this.saveUsers(users);

            // Auto login after signup
            const sessionUser = {
                userId: newUser.userId,
                name: newUser.name,
                isStaff: newUser.isStaff,
                isAdmin: newUser.isAdmin
            };

            this.setUser(sessionUser);
            return { success: true, user: sessionUser };

        } catch (error) {
            console.error('Signup error:', error);
            return { success: false, message: 'Failed to create account. Please try again.' };
        }
    },

    // Logout
    logout() {
        this.setUser(null);
        window.location.hash = '#/';
        window.location.reload();
    },

    // Auth change listeners
    authListeners: [],

    // Subscribe to auth changes
    onAuthChange(callback) {
        this.authListeners.push(callback);
    },

    // Trigger auth change
    triggerAuthChange() {
        const user = this.getUser();
        this.authListeners.forEach(callback => {
            try {
                callback(user);
            } catch (error) {
                console.error('Auth listener error:', error);
            }
        });
    }
};

// Initialize default users on load
if (typeof window !== 'undefined') {
    window.addEventListener('DOMContentLoaded', () => {
        Auth.init();
    });
}

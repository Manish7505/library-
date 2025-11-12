// Beautiful Sign In / Sign Up Page
const SigninPage = {
    isSignUp: false,

    render() {
        const content = document.getElementById('app-content');
        
        // Check if user is already authenticated
        if (Auth.isAuthenticated()) {
            const user = Auth.getUser();
            Router.navigate(user.isAdmin ? '/dashboard/admin' : '/dashboard/member');
            return;
        }

        content.innerHTML = `
            <div class="signin-container">
                <div class="auth-card">
                    <div class="auth-header">
                        <div class="library-logo">
                            <span class="material-icons logo-icon">local_library</span>
                            <h1>Library Management System</h1>
                        </div>
                        <p class="auth-subtitle">Welcome back! Please sign in to continue</p>
                    </div>

                    <div class="auth-tabs">
                        <button class="auth-tab ${!this.isSignUp ? 'active' : ''}" data-tab="signin">
                            <span class="material-icons">login</span> Sign In
                        </button>
                        <button class="auth-tab ${this.isSignUp ? 'active' : ''}" data-tab="signup">
                            <span class="material-icons">person_add</span> Sign Up
                        </button>
                    </div>

                    <div class="auth-form-container">
                        <!-- Sign In Form -->
                        <form id="signin-form" class="auth-form ${!this.isSignUp ? 'active' : ''}">
                            <div class="form-group">
                                <label for="signin-id">
                                    <span class="material-icons">badge</span>
                                    ${this.getUserTypeLabel()}
                                </label>
                                <input 
                                    type="text" 
                                    id="signin-id" 
                                    class="form-input" 
                                    placeholder="Enter your ${this.getUserTypeLabel().toLowerCase()}" 
                                    required
                                    autocomplete="username"
                                >
                            </div>

                            <div class="form-group">
                                <label for="signin-password">
                                    <span class="material-icons">lock</span>
                                    Password
                                </label>
                                <div class="password-input-wrapper">
                                    <input 
                                        type="password" 
                                        id="signin-password" 
                                        class="form-input" 
                                        placeholder="Enter your password" 
                                        required
                                        autocomplete="current-password"
                                    >
                                    <button type="button" class="password-toggle" data-target="signin-password">
                                        <span class="material-icons">visibility</span>
                                    </button>
                                </div>
                            </div>

                            <div class="user-type-toggle">
                                <label class="toggle-switch">
                                    <input type="checkbox" id="signin-user-type">
                                    <span class="toggle-slider"></span>
                                </label>
                                <span>Staff Member</span>
                            </div>

                            <div id="signin-error" class="error-message"></div>

                            <button type="submit" class="auth-submit-btn">
                                <span>Sign In</span>
                                <span class="material-icons">arrow_forward</span>
                            </button>

                            <div class="auth-divider">
                                <span>Quick Access</span>
                            </div>

                            <div class="quick-access">
                                <p>Demo Credentials:</p>
                                <div class="demo-credentials">
                                    <div class="demo-item">
                                        <strong>Student:</strong> ID: <code>STU001</code> | Pass: <code>student123</code>
                                    </div>
                                    <div class="demo-item">
                                        <strong>Staff:</strong> ID: <code>STAFF001</code> | Pass: <code>staff123</code>
                                    </div>
                                </div>
                            </div>
                        </form>

                        <!-- Sign Up Form -->
                        <form id="signup-form" class="auth-form ${this.isSignUp ? 'active' : ''}">
                            <div class="form-group">
                                <label for="signup-name">
                                    <span class="material-icons">person</span>
                                    Full Name
                                </label>
                                <input 
                                    type="text" 
                                    id="signup-name" 
                                    class="form-input" 
                                    placeholder="Enter your full name" 
                                    required
                                >
                            </div>

                            <div class="form-group">
                                <label for="signup-id">
                                    <span class="material-icons">badge</span>
                                    ${this.getUserTypeLabel()}
                                </label>
                                <input 
                                    type="text" 
                                    id="signup-id" 
                                    class="form-input" 
                                    placeholder="Enter your ${this.getUserTypeLabel().toLowerCase()}" 
                                    required
                                >
                            </div>

                            <div class="form-group">
                                <label for="signup-password">
                                    <span class="material-icons">lock</span>
                                    Password
                                </label>
                                <div class="password-input-wrapper">
                                    <input 
                                        type="password" 
                                        id="signup-password" 
                                        class="form-input" 
                                        placeholder="Create a password (min 6 characters)" 
                                        minlength="6"
                                        required
                                    >
                                    <button type="button" class="password-toggle" data-target="signup-password">
                                        <span class="material-icons">visibility</span>
                                    </button>
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="signup-confirm-password">
                                    <span class="material-icons">lock_outline</span>
                                    Confirm Password
                                </label>
                                <div class="password-input-wrapper">
                                    <input 
                                        type="password" 
                                        id="signup-confirm-password" 
                                        class="form-input" 
                                        placeholder="Confirm your password" 
                                        minlength="6"
                                        required
                                    >
                                    <button type="button" class="password-toggle" data-target="signup-confirm-password">
                                        <span class="material-icons">visibility</span>
                                    </button>
                                </div>
                            </div>

                            <div class="user-type-toggle">
                                <label class="toggle-switch">
                                    <input type="checkbox" id="signup-user-type">
                                    <span class="toggle-slider"></span>
                                </label>
                                <span>Staff Member</span>
                            </div>

                            <div id="signup-error" class="error-message"></div>

                            <button type="submit" class="auth-submit-btn">
                                <span>Create Account</span>
                                <span class="material-icons">person_add</span>
                            </button>
                        </form>
                    </div>

                    <div class="auth-footer">
                        <p>By signing in, you agree to our Terms of Service and Privacy Policy</p>
                    </div>
                </div>
            </div>
        `;

        this.attachEvents();
    },

    getUserTypeLabel() {
        const signinToggle = document.getElementById('signin-user-type');
        const signupToggle = document.getElementById('signup-user-type');
        const isStaff = signinToggle?.checked || signupToggle?.checked;
        return isStaff ? 'Employee ID' : 'Admission ID';
    },

    attachEvents() {
        // Tab switching
        document.querySelectorAll('.auth-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                const tabType = e.currentTarget.dataset.tab;
                this.isSignUp = tabType === 'signup';
                this.render();
            });
        });

        // User type toggle for sign in
        const signinToggle = document.getElementById('signin-user-type');
        if (signinToggle) {
            signinToggle.addEventListener('change', () => {
                const label = document.querySelector('label[for="signin-id"]');
                const input = document.getElementById('signin-id');
                if (label && input) {
                    label.innerHTML = `
                        <span class="material-icons">badge</span>
                        ${this.getUserTypeLabel()}
                    `;
                    input.placeholder = `Enter your ${this.getUserTypeLabel().toLowerCase()}`;
                }
            });
        }

        // User type toggle for sign up
        const signupToggle = document.getElementById('signup-user-type');
        if (signupToggle) {
            signupToggle.addEventListener('change', () => {
                const label = document.querySelector('label[for="signup-id"]');
                const input = document.getElementById('signup-id');
                if (label && input) {
                    label.innerHTML = `
                        <span class="material-icons">badge</span>
                        ${this.getUserTypeLabel()}
                    `;
                    input.placeholder = `Enter your ${this.getUserTypeLabel().toLowerCase()}`;
                }
            });
        }

        // Password toggle buttons
        document.querySelectorAll('.password-toggle').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const targetId = e.currentTarget.dataset.target;
                const input = document.getElementById(targetId);
                const icon = e.currentTarget.querySelector('.material-icons');
                
                if (input.type === 'password') {
                    input.type = 'text';
                    icon.textContent = 'visibility_off';
                } else {
                    input.type = 'password';
                    icon.textContent = 'visibility';
                }
            });
        });

        // Sign in form submission
        const signinForm = document.getElementById('signin-form');
        if (signinForm) {
            signinForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                await this.handleSignIn();
            });
        }

        // Sign up form submission
        const signupForm = document.getElementById('signup-form');
        if (signupForm) {
            signupForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                await this.handleSignUp();
            });
        }
    },

    async handleSignIn() {
        const signinForm = document.getElementById('signin-form');
        const errorDiv = document.getElementById('signin-error');
        const submitBtn = signinForm.querySelector('.auth-submit-btn');
        const originalText = submitBtn.innerHTML;

        errorDiv.textContent = '';
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span>Signing in...</span><span class="material-icons spin">refresh</span>';

        const userId = document.getElementById('signin-id').value.trim();
        const password = document.getElementById('signin-password').value;
        const isStaff = document.getElementById('signin-user-type').checked;

        const result = await Auth.login({
            userId,
            password,
            isStaff
        });

        if (result.success) {
            Utils.showAlert('Welcome back! Signing you in...', 'success');
            Router.navigate(result.user.isAdmin ? '/dashboard/admin' : '/dashboard/member');
        } else {
            errorDiv.textContent = result.message || 'Invalid credentials. Please try again.';
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
        }
    },

    async handleSignUp() {
        const errorDiv = document.getElementById('signup-error');
        const signupForm = document.getElementById('signup-form');
        const submitBtn = signupForm.querySelector('.auth-submit-btn');
        const originalText = submitBtn.innerHTML;

        errorDiv.textContent = '';
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span>Creating account...</span><span class="material-icons spin">refresh</span>';

        const name = document.getElementById('signup-name').value.trim();
        const userId = document.getElementById('signup-id').value.trim();
        const password = document.getElementById('signup-password').value;
        const confirmPassword = document.getElementById('signup-confirm-password').value;
        const isStaff = document.getElementById('signup-user-type').checked;

        // Validation
        if (password !== confirmPassword) {
            errorDiv.textContent = 'Passwords do not match!';
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
            return;
        }

        if (password.length < 6) {
            errorDiv.textContent = 'Password must be at least 6 characters long!';
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
            return;
        }

        const result = await Auth.signup({
            name,
            userId,
            password,
            isStaff
        });

        if (result.success) {
            Utils.showAlert('Account created successfully! Signing you in...', 'success');
            Router.navigate(result.user.isAdmin ? '/dashboard/admin' : '/dashboard/member');
        } else {
            errorDiv.textContent = result.message || 'Failed to create account. Please try again.';
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
        }
    }
};

// Sign Up Page (redirects to signin with signup tab)
const SignupPage = {
    render() {
        SigninPage.isSignUp = true;
        SigninPage.render();
    }
};

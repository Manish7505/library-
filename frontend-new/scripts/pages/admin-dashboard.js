// Admin Dashboard Page
const AdminDashboardPage = {
    activeTab: 'addbook',

    render() {
        if (!Auth.isAuthenticated() || !Auth.isAdmin()) {
            Router.navigate('/');
            return;
        }

        const content = document.getElementById('app-content');
        content.innerHTML = `
            <div class="dashboard-container">
                <div class="dashboard-sidebar" id="dashboard-sidebar">
                    <div class="dashboard-header">
                        <span class="material-icons">library_books</span>
                        <h2>LCMS</h2>
                    </div>
                    <div class="sidebar-menu">
                        <a href="#" class="menu-item active" data-tab="addbook">
                            <span class="material-icons">book</span> Add Book
                        </a>
                        <a href="#" class="menu-item" data-tab="addmember">
                            <span class="material-icons">person_add</span> Add Member
                        </a>
                        <a href="#" class="menu-item" data-tab="addtransaction">
                            <span class="material-icons">receipt</span> Add Transaction
                        </a>
                        <a href="#" class="menu-item" data-tab="getmember">
                            <span class="material-icons">account_box</span> Get Member
                        </a>
                        <a href="#" class="menu-item" data-tab="return">
                            <span class="material-icons">assignment_return</span> Return
                        </a>
                        <a href="#" class="menu-item" id="dashboard-logout">
                            <span class="material-icons">logout</span> Logout
                        </a>
                    </div>
                </div>
                <div class="dashboard-content">
                    <button class="sidebar-toggle" id="sidebar-toggle">
                        <span class="material-icons">menu</span>
                    </button>
                    <div id="tab-content">${this.renderAddBook()}</div>
                </div>
            </div>
        `;

        this.attachEvents();
    },

    renderAddBook() {
        return `
            <div class="form-section">
                <h2>Add a Book</h2>
                <form id="add-book-form" class="admin-form">
                    <div class="form-group">
                        <label>Book Name <span class="required">*</span></label>
                        <input type="text" name="bookName" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label>Author Name <span class="required">*</span></label>
                        <input type="text" name="author" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label>Available Copies <span class="required">*</span></label>
                        <input type="number" name="bookCountAvailable" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label>Language</label>
                        <input type="text" name="language" class="form-control">
                    </div>
                    <div class="form-group">
                        <label>Publisher</label>
                        <input type="text" name="publisher" class="form-control">
                    </div>
                    <button type="submit" class="btn-primary">Add Book</button>
                </form>
            </div>
        `;
    },

    renderAddMember() {
        return `
            <div class="form-section">
                <h2>Add Member</h2>
                <form id="add-member-form" class="admin-form">
                    <div class="form-group">
                        <label>Full Name <span class="required">*</span></label>
                        <input type="text" name="userFullName" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label>User Type <span class="required">*</span></label>
                        <select name="userType" class="form-control" required>
                            <option value="Student">Student</option>
                            <option value="Staff">Staff</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Admission ID (for Students)</label>
                        <input type="text" name="admissionId" class="form-control">
                    </div>
                    <div class="form-group">
                        <label>Employee ID (for Staff)</label>
                        <input type="text" name="employeeId" class="form-control">
                    </div>
                    <div class="form-group">
                        <label>Email <span class="required">*</span></label>
                        <input type="email" name="email" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label>Password <span class="required">*</span></label>
                        <input type="password" name="password" class="form-control" minlength="6" required>
                    </div>
                    <div class="form-group">
                        <label>Mobile Number <span class="required">*</span></label>
                        <input type="tel" name="mobileNumber" class="form-control" required>
                    </div>
                    <button type="submit" class="btn-primary">Add Member</button>
                </form>
            </div>
        `;
    },

    renderOtherSections(title) {
        return `
            <div class="form-section">
                <h2>${title}</h2>
                <p class="info-message">This feature is coming soon...</p>
            </div>
        `;
    },

    attachEvents() {
        const menuItems = document.querySelectorAll('.menu-item[data-tab]');
        const tabContent = document.getElementById('tab-content');
        const sidebarToggle = document.getElementById('sidebar-toggle');
        const sidebar = document.getElementById('dashboard-sidebar');
        const logoutBtn = document.getElementById('dashboard-logout');

        menuItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const tab = item.dataset.tab;
                
                menuItems.forEach(m => m.classList.remove('active'));
                item.classList.add('active');

                switch(tab) {
                    case 'addbook':
                        tabContent.innerHTML = this.renderAddBook();
                        this.attachFormEvents();
                        break;
                    case 'addmember':
                        tabContent.innerHTML = this.renderAddMember();
                        this.attachFormEvents();
                        break;
                    case 'addtransaction':
                        tabContent.innerHTML = this.renderOtherSections('Add Transaction');
                        break;
                    case 'getmember':
                        tabContent.innerHTML = this.renderOtherSections('Get Member');
                        break;
                    case 'return':
                        tabContent.innerHTML = this.renderOtherSections('Return Book');
                        break;
                }

                if (window.innerWidth <= 768) {
                    sidebar.classList.remove('active');
                }
            });
        });

        sidebarToggle.addEventListener('click', () => {
            sidebar.classList.toggle('active');
        });

        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (confirm('Are you sure you want to logout?')) {
                Auth.logout();
            }
        });

        this.attachFormEvents();
    },

    attachFormEvents() {
        const addBookForm = document.getElementById('add-book-form');
        const addMemberForm = document.getElementById('add-member-form');

        if (addBookForm) {
            addBookForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                const formData = new FormData(addBookForm);
                const bookData = {
                    bookName: formData.get('bookName'),
                    author: formData.get('author'),
                    bookCountAvailable: parseInt(formData.get('bookCountAvailable')),
                    language: formData.get('language'),
                    publisher: formData.get('publisher'),
                    categories: [],
                    isAdmin: true
                };

                try {
                    const response = await fetch(AppConfig.API_URL + 'api/books/addbook', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(bookData)
                    });

                    if (response.ok) {
                        Utils.showAlert('Book added successfully! 🎉', 'success');
                        addBookForm.reset();
                    } else {
                        Utils.showAlert('Failed to add book', 'danger');
                    }
                } catch (error) {
                    Utils.showAlert('Error adding book', 'danger');
                }
            });
        }

        if (addMemberForm) {
            addMemberForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                const formData = new FormData(addMemberForm);
                const memberData = {
                    userFullName: formData.get('userFullName'),
                    userType: formData.get('userType'),
                    admissionId: formData.get('admissionId') || undefined,
                    employeeId: formData.get('employeeId') || undefined,
                    email: formData.get('email'),
                    password: formData.get('password'),
                    mobileNumber: formData.get('mobileNumber')
                };

                try {
                    const response = await fetch(AppConfig.API_URL + 'api/auth/register', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(memberData)
                    });

                    if (response.ok) {
                        Utils.showAlert('Member added successfully!', 'success');
                        addMemberForm.reset();
                    } else {
                        const error = await response.json();
                        Utils.showAlert(error.message || 'Failed to add member', 'danger');
                    }
                } catch (error) {
                    Utils.showAlert('Error adding member', 'danger');
                }
            });
        }
    }
};



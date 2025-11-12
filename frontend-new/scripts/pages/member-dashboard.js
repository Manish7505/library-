// Member Dashboard Page
const MemberDashboardPage = {
    memberDetails: null,
    activeTab: 'profile',

    async render() {
        if (!Auth.isAuthenticated() || Auth.isAdmin()) {
            Router.navigate('/');
            return;
        }

        const content = document.getElementById('app-content');
        content.innerHTML = '<div class="loading-spinner"><div class="spinner-border"></div></div>';

        await this.fetchMemberDetails();

        content.innerHTML = `
            <div class="dashboard-container">
                <div class="dashboard-sidebar" id="dashboard-sidebar">
                    <div class="dashboard-header">
                        <span class="material-icons">library_books</span>
                        <h2>LCMS</h2>
                    </div>
                    <div class="sidebar-menu">
                        <a href="#" class="menu-item active" data-tab="profile">
                            <span class="material-icons">account_circle</span> Profile
                        </a>
                        <a href="#" class="menu-item" data-tab="active">
                            <span class="material-icons">local_library</span> Active Books
                        </a>
                        <a href="#" class="menu-item" data-tab="reserved">
                            <span class="material-icons">book</span> Reserved
                        </a>
                        <a href="#" class="menu-item" data-tab="history">
                            <span class="material-icons">history</span> History
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
                    <div id="tab-content">${this.renderProfile()}</div>
                </div>
            </div>
        `;

        this.attachEvents();
    },

    async fetchMemberDetails() {
        try {
            const user = Auth.getUser();
            const response = await fetch(AppConfig.API_URL + 'api/users/getuser/' + user._id);
            this.memberDetails = await response.json();
        } catch (error) {
            console.error('Error fetching member details:', error);
            this.memberDetails = Auth.getUser();
        }
    },

    renderProfile() {
        const member = this.memberDetails || {};
        return `
            <div class="profile-section">
                <div class="profile-header">
                    <img src="assets/images/Profile.png" alt="Profile" class="profile-img">
                    <div class="profile-info">
                        <h2>${member.userFullName || 'N/A'}</h2>
                        <p class="user-id">${member.userType === 'Student' ? member.admissionId : member.employeeId || 'N/A'}</p>
                        <p>${member.email || 'N/A'}</p>
                        <p>${member.mobileNumber || 'N/A'}</p>
                    </div>
                </div>
                <div class="profile-details">
                    <div class="detail-card">
                        <p><strong>Age:</strong> ${member.age || 'N/A'}</p>
                        <p><strong>Gender:</strong> ${member.gender || 'N/A'}</p>
                        <p><strong>DOB:</strong> ${member.dob || 'N/A'}</p>
                        <p><strong>Address:</strong> ${member.address || 'N/A'}</p>
                    </div>
                    <div class="detail-card">
                        <h3>Points</h3>
                        <p class="points-value">${member.points || 0}</p>
                    </div>
                </div>
            </div>
        `;
    },

    renderActiveBooks() {
        const transactions = this.memberDetails?.activeTransactions?.filter(t => t.transactionType === 'Issued') || [];
        return `
            <div class="transactions-section">
                <h2>Issued Books</h2>
                <table class="transactions-table">
                    <thead>
                        <tr>
                            <th>S.No</th>
                            <th>Book Name</th>
                            <th>From Date</th>
                            <th>To Date</th>
                            <th>Fine</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${transactions.length > 0 ? transactions.map((t, i) => `
                            <tr>
                                <td>${i + 1}</td>
                                <td>${t.bookName}</td>
                                <td>${Utils.formatDate(t.fromDate)}</td>
                                <td>${Utils.formatDate(t.toDate)}</td>
                                <td>₹${Utils.calculateFine(t.toDate)}</td>
                            </tr>
                        `).join('') : '<tr><td colspan="5">No active books</td></tr>'}
                    </tbody>
                </table>
            </div>
        `;
    },

    renderReservedBooks() {
        const transactions = this.memberDetails?.activeTransactions?.filter(t => t.transactionType === 'Reserved') || [];
        return `
            <div class="transactions-section">
                <h2>Reserved Books</h2>
                <table class="transactions-table">
                    <thead>
                        <tr>
                            <th>S.No</th>
                            <th>Book Name</th>
                            <th>From Date</th>
                            <th>To Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${transactions.length > 0 ? transactions.map((t, i) => `
                            <tr>
                                <td>${i + 1}</td>
                                <td>${t.bookName}</td>
                                <td>${Utils.formatDate(t.fromDate)}</td>
                                <td>${Utils.formatDate(t.toDate)}</td>
                            </tr>
                        `).join('') : '<tr><td colspan="4">No reserved books</td></tr>'}
                    </tbody>
                </table>
            </div>
        `;
    },

    renderHistory() {
        const transactions = this.memberDetails?.prevTransactions || [];
        return `
            <div class="transactions-section">
                <h2>History</h2>
                <table class="transactions-table">
                    <thead>
                        <tr>
                            <th>S.No</th>
                            <th>Book Name</th>
                            <th>From Date</th>
                            <th>To Date</th>
                            <th>Return Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${transactions.length > 0 ? transactions.map((t, i) => `
                            <tr>
                                <td>${i + 1}</td>
                                <td>${t.bookName}</td>
                                <td>${Utils.formatDate(t.fromDate)}</td>
                                <td>${Utils.formatDate(t.toDate)}</td>
                                <td>${Utils.formatDate(t.returnDate)}</td>
                            </tr>
                        `).join('') : '<tr><td colspan="5">No history</td></tr>'}
                    </tbody>
                </table>
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
                    case 'profile':
                        tabContent.innerHTML = this.renderProfile();
                        break;
                    case 'active':
                        tabContent.innerHTML = this.renderActiveBooks();
                        break;
                    case 'reserved':
                        tabContent.innerHTML = this.renderReservedBooks();
                        break;
                    case 'history':
                        tabContent.innerHTML = this.renderHistory();
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
    }
};



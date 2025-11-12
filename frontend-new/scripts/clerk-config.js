// Clerk Configuration
const ClerkConfig = {
    // Replace this with your actual Clerk Publishable Key from https://dashboard.clerk.com
    PUBLISHABLE_KEY: 'pk_test_c291Z2h0LWhhbXN0ZXItNzYuY2xlcmsuYWNjb3VudHMuZGV2JA',
    
    // Clerk instance will be initialized here
    clerk: null,
    initialized: false,
    initializationPromise: null,
    
    // Wait for Clerk SDK to load
    async waitForClerkSDK(maxAttempts = 50) {
        for (let i = 0; i < maxAttempts; i++) {
            // Check if there was an error loading the script
            if (window.clerkSDKError) {
                throw new Error('Clerk SDK script failed to load. Check your internet connection.');
            }
            
            // Check if Clerk is available
            if (typeof Clerk !== 'undefined' && typeof window.Clerk !== 'undefined') {
                console.log('✅ Clerk SDK loaded');
                return true;
            }
            
            // Log progress every 10 attempts
            if (i % 10 === 0 && i > 0) {
                console.log(`⏳ Waiting for Clerk SDK... (${i}/${maxAttempts})`);
            }
            
            await new Promise(resolve => setTimeout(resolve, 100));
        }
        return false;
    },
    
    // Initialize Clerk
    async initialize() {
        // If already initialized, return the clerk instance
        if (this.initialized && this.clerk) {
            return this.clerk;
        }
        
        // If initialization is in progress, return the promise
        if (this.initializationPromise) {
            return this.initializationPromise;
        }
        
        // Start initialization
        this.initializationPromise = this._doInitialize();
        return this.initializationPromise;
    },
    
    async _doInitialize() {
        try {
            console.log('🔄 Starting Clerk initialization...');
            
            // Wait for Clerk SDK to be loaded
            const sdkLoaded = await this.waitForClerkSDK(50);
            if (!sdkLoaded) {
                throw new Error('Clerk SDK failed to load. Check your internet connection and Clerk script tag.');
            }

            // Get the publishable key from the script tag or config
            const scriptTag = document.querySelector('[data-clerk-publishable-key]');
            let publishableKey = scriptTag?.getAttribute('data-clerk-publishable-key') || this.PUBLISHABLE_KEY;
            
            // Trim whitespace
            publishableKey = publishableKey?.trim();
            
            if (!publishableKey || publishableKey === 'pk_test_YOUR_PUBLISHABLE_KEY_HERE' || publishableKey.length < 20) {
                throw new Error('Clerk Publishable Key is missing or invalid. Please add your key to index.html');
            }

            // Validate key format
            if (!publishableKey.startsWith('pk_test_') && !publishableKey.startsWith('pk_live_')) {
                console.warn('⚠️ Clerk key format might be incorrect. Should start with pk_test_ or pk_live_');
            }

            console.log('🔑 Using Clerk key:', publishableKey.substring(0, 30) + '...');

            // Initialize Clerk with error handling
            try {
                this.clerk = new Clerk(publishableKey);
                console.log('📦 Clerk instance created');
                
                // Load Clerk with appearance config
                await this.clerk.load({
                    appearance: {
                        baseTheme: undefined,
                        variables: {
                            colorPrimary: '#4545b9',
                            colorBackground: '#ffffff',
                            colorInputBackground: '#ffffff',
                            colorInputText: '#1f1f1f',
                            borderRadius: '12px',
                            fontFamily: 'Poppins, sans-serif'
                        },
                        elements: {
                            formButtonPrimary: {
                                fontSize: '16px',
                                fontWeight: '600',
                                textTransform: 'none',
                                backgroundColor: '#4545b9',
                                '&:hover': {
                                    backgroundColor: '#323296'
                                }
                            },
                            card: {
                                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
                                borderRadius: '20px'
                            },
                            headerTitle: {
                                fontSize: '28px',
                                fontWeight: '800'
                            },
                            formFieldInput: {
                                borderRadius: '10px'
                            }
                        }
                    }
                });
                
                console.log('✅ Clerk loaded successfully');
                
                // Verify Clerk is ready
                if (!this.clerk) {
                    throw new Error('Clerk instance is null after load');
                }
                
                this.initialized = true;
                console.log('✅ Clerk initialized successfully');
            } catch (loadError) {
                console.error('❌ Clerk.load() failed:', loadError);
                // Try loading without appearance config as fallback
                try {
                    console.log('🔄 Retrying with minimal config...');
                    this.clerk = new Clerk(publishableKey);
                    await this.clerk.load();
                    this.initialized = true;
                    console.log('✅ Clerk initialized with minimal config');
                } catch (fallbackError) {
                    console.error('❌ Clerk fallback initialization failed:', fallbackError);
                    throw new Error(`Clerk initialization failed: ${fallbackError.message || fallbackError}`);
                }
            }
            
            // Notify app that Clerk is ready
            if (window.Auth) {
                Auth.onClerkReady();
            }

            return this.clerk;
        } catch (error) {
            console.error('❌ Failed to initialize Clerk:', error);
            this.initialized = false;
            this.initializationPromise = null;
            throw error;
        }
    },

    // Get Clerk instance
    getClerk() {
        return this.clerk;
    },

    // Check if user is signed in
    isSignedIn() {
        return this.clerk?.user !== null && this.clerk?.user !== undefined;
    },

    // Get current user
    getUser() {
        return this.clerk?.user;
    },

    // Sign out
    async signOut() {
        try {
            await this.clerk?.signOut();
            return true;
        } catch (error) {
            console.error('Sign out error:', error);
            return false;
        }
    }
};

// Initialize Clerk when DOM is ready
(function() {
    let initAttempted = false;
    
    function tryInitialize() {
        if (initAttempted) return;
        initAttempted = true;
        
        ClerkConfig.initialize().catch(error => {
            console.error('Failed to initialize Clerk:', error);
            initAttempted = false; // Allow retry
        });
    }
    
    // Try when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', tryInitialize);
    } else {
        // DOM already ready, wait a bit for Clerk script
        setTimeout(tryInitialize, 500);
    }
    
    // Also try on window load as backup
    window.addEventListener('load', () => {
        if (!ClerkConfig.initialized) {
            setTimeout(tryInitialize, 1000);
        }
    });
})();


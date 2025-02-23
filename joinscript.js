document.addEventListener('DOMContentLoaded', function() {
    // Form validation and submission
    const membershipForm = document.querySelector('.membership-form');

    membershipForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Basic form validation
        const fullName = document.getElementById('full-name').value.trim();
        const email = document.getElementById('email').value.trim();
        const graduationYear = document.getElementById('graduation-year').value.trim();
        const degree = document.getElementById('degree').value.trim();
        const occupation = document.getElementById('current-occupation').value.trim();

        if (!fullName || !email || !graduationYear || !degree || !occupation) {
            alert('Please fill in all required fields.');
            return;
        }

        if (!isValidEmail(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        if (!isValidYear(graduationYear)) {
            alert('Please enter a valid graduation year.');
            return;
        }

        // If all validations pass, submit the form
        console.log('Form submitted:', { fullName, email, graduationYear, degree, occupation });
        // Here you would typically send this data to your server
        // For demonstration, we're just logging to console

        // Show success message
        showSuccessMessage();
    });

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function isValidYear(year) {
        const currentYear = new Date().getFullYear();
        const yearNumber = parseInt(year, 10);
        return yearNumber >= 1900 && yearNumber <= currentYear;
    }

    function showSuccessMessage() {
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.textContent = 'Thank you for joining GradNet! We will review your application and get back to you soon.';
        membershipForm.innerHTML = '';
        membershipForm.appendChild(successMessage);
    }

    // Benefits list animation
    const benefitsList = document.querySelector('.benefits-list');
    const benefits = benefitsList.querySelectorAll('li');

    function animateBenefits() {
        benefits.forEach((benefit, index) => {
            setTimeout(() => {
                benefit.style.opacity = '1';
                benefit.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }

    // Trigger animation when the benefits list comes into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateBenefits();
                observer.unobserve(entry.target);
            }
        });
    });

    observer.observe(benefitsList);
});

// Registration form handler with validation and multi-step navigation
document.addEventListener('DOMContentLoaded', function() {
    // Main form controller class
    class RegistrationFormController {
        constructor() {
            // Initialize main form elements
            this.form = document.getElementById('registration-form');
            this.steps = Array.from(document.querySelectorAll('.form-step'));
            this.progressSteps = Array.from(document.querySelectorAll('.step'));
            this.currentStep = 1;
            this.maxSteps = this.steps.length;

            // Initialize navigation buttons
            this.nextButtons = document.querySelectorAll('.next-step');
            this.prevButtons = document.querySelectorAll('.prev-step');
            this.submitButton = document.querySelector('.submit-form');

            this.initializeForm();
        }

        initializeForm() {
            // Set up event listeners for navigation
            this.nextButtons.forEach(button => {
                button.addEventListener('click', () => this.handleNext());
            });

            this.prevButtons.forEach(button => {
                button.addEventListener('click', () => this.handlePrevious());
            });

            // Handle form submission
            this.form.addEventListener('submit', (e) => this.handleSubmit(e));

            // Initialize form fields with dynamic content
            this.populateGraduationYears();
            this.setupInputValidation();

            // Show initial step
            this.showStep(1);
        }

        // Populate graduation year dropdown with 50 years of options
        populateGraduationYears() {
            const graduationSelect = document.getElementById('graduationYear');
            const currentYear = new Date().getFullYear();
            
            for (let year = currentYear; year >= currentYear - 50; year--) {
                const option = document.createElement('option');
                option.value = year;
                option.textContent = year;
                graduationSelect.appendChild(option);
            }
        }

        // Set up real-time validation for input fields
        setupInputValidation() {
            const inputs = this.form.querySelectorAll('input, select, textarea');
            inputs.forEach(input => {
                input.addEventListener('blur', () => this.validateField(input));
                input.addEventListener('input', () => this.validateField(input));
            });
        }

        // Validation rules for different field types
        validationRules = {
            email: (value) => {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return {
                    isValid: emailRegex.test(value),
                    message: 'Please enter a valid email address'
                };
            },
            phone: (value) => {
                const phoneRegex = /^\+?[\d\s-]{10,}$/;
                return {
                    isValid: phoneRegex.test(value.replace(/[\s-]/g, '')),
                    message: 'Please enter a valid phone number'
                };
            },
            url: (value) => {
                if (!value) return { isValid: true }; // Optional field
                try {
                    new URL(value);
                    return { isValid: true };
                } catch {
                    return {
                        isValid: false,
                        message: 'Please enter a valid URL'
                    };
                }
            },
            required: (value) => ({
                isValid: value.trim().length > 0,
                message: 'This field is required'
            })
        };

        // Validate individual form field
        validateField(input) {
            // Clear existing error messages
            this.clearFieldError(input);

            // Skip validation for optional fields if empty
            if (!input.hasAttribute('required') && !input.value) {
                return true;
            }

            let isValid = true;
            const value = input.value.trim();

            // Check required fields
            if (input.hasAttribute('required')) {
                const requiredCheck = this.validationRules.required(value);
                if (!requiredCheck.isValid) {
                    this.showFieldError(input, requiredCheck.message);
                    isValid = false;
                }
            }

            // Check field-specific validation
            if (isValid && value) {
                const inputType = input.type;
                if (this.validationRules[inputType]) {
                    const validation = this.validationRules[inputType](value);
                    if (!validation.isValid) {
                        this.showFieldError(input, validation.message);
                        isValid = false;
                    }
                }
            }

            return isValid;
        }

        // Validate all fields in current step
        validateStep(stepNumber) {
            const currentStepElement = document.querySelector(`.form-step[data-step="${stepNumber}"]`);
            const inputs = currentStepElement.querySelectorAll('input, select, textarea');
            let isStepValid = true;

            inputs.forEach(input => {
                if (!this.validateField(input)) {
                    isStepValid = false;
                }
            });

            return isStepValid;
        }

        // Show error message for field
        showFieldError(input, message) {
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            errorDiv.textContent = message;
            errorDiv.style.color = '#ef4444';
            errorDiv.style.fontSize = '0.875rem';
            errorDiv.style.marginTop = '0.25rem';

            input.classList.add('error');
            input.parentNode.appendChild(errorDiv);
        }

        // Clear error message for field
        clearFieldError(input) {
            input.classList.remove('error');
            const errorMessage = input.parentNode.querySelector('.error-message');
            if (errorMessage) {
                errorMessage.remove();
            }
        }

        // Handle next button click
        handleNext() {
            if (this.validateStep(this.currentStep)) {
                this.currentStep = Math.min(this.currentStep + 1, this.maxSteps);
                this.showStep(this.currentStep);
            }
        }

        // Handle previous button click
        handlePrevious() {
            this.currentStep = Math.max(this.currentStep - 1, 1);
            this.showStep(this.currentStep);
        }

        // Update UI to show current step
        showStep(stepNumber) {
            // Update form steps visibility
            this.steps.forEach(step => {
                step.classList.remove('active');
                if (step.dataset.step === stepNumber.toString()) {
                    step.classList.add('active');
                }
            });

            // Update progress indicators
            this.progressSteps.forEach(step => {
                step.classList.remove('active');
                if (parseInt(step.dataset.step) <= stepNumber) {
                    step.classList.add('active');
                }
            });

            // Scroll to top of form
            this.form.scrollIntoView({ behavior: 'smooth' });
        }

        // Handle form submission
        async handleSubmit(e) {
            e.preventDefault();

            if (!this.validateStep(this.currentStep)) {
                return;
            }

            const submitButton = this.submitButton;
            submitButton.disabled = true;
            submitButton.textContent = 'Submitting...';

            try {
                // Gather form data
                const formData = new FormData(this.form);
                const data = Object.fromEntries(formData.entries());

                // Add loading state and animation
                this.showLoadingState();

                // Simulate API call (replace with actual API endpoint)
                const response = await this.submitFormData(data);

                if (response.success) {
                    this.showSuccessMessage();
                    // Redirect to dashboard or confirmation page
                    setTimeout(() => {
                        window.location.href = '/dashboard';
                    }, 2000);
                } else {
                    throw new Error('Submission failed');
                }
            } catch (error) {
                this.showErrorMessage(error.message);
                submitButton.disabled = false;
                submitButton.textContent = 'Complete Registration';
            }
        }

        // Show loading state during form submission
        showLoadingState() {
            const loadingOverlay = document.createElement('div');
            loadingOverlay.className = 'loading-overlay';
            loadingOverlay.innerHTML = `
                <div class="loading-spinner"></div>
                <p>Processing your registration...</p>
            `;
            this.form.appendChild(loadingOverlay);
        }

        // Simulate form submission (replace with actual API call)
        async submitFormData(data) {
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Simulate successful response
            return {
                success: true,
                message: 'Registration successful'
            };
        }

        

        // Show success message after form submission
        showSuccessMessage() {
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.innerHTML = `
                <div class="success-icon">✓</div>
                <h3>Registration Complete!</h3>
                <p>Welcome to our alumni network. Redirecting to your dashboard...</p>
            `;
            this.form.innerHTML = '';
            this.form.appendChild(successMessage);
        }

        // Show error message if submission fails
        showErrorMessage(message) {
            const errorBanner = document.createElement('div');
            errorBanner.className = 'error-banner';
            errorBanner.textContent = message || 'An error occurred. Please try again.';
            
            this.form.insertBefore(errorBanner, this.form.firstChild);
            setTimeout(() => errorBanner.remove(), 5000);
        }
    }

    // Initialize the form controller
    const registrationForm = new RegistrationFormController();
});
document.addEventListener('DOMContentLoaded', function() {
    const editProfileButton = document.getElementById('cta-button1');
    const modal = document.getElementById('edit-modal');
    const closeButton = modal.querySelector('.close');
    const editForm = document.getElementById('edit-profile-form');

    // Open modal
    editProfileButton.addEventListener('click', function() {
        modal.style.display = 'block';
        populateFormWithCurrentData();
    });

    // Close modal
    closeButton.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    // Close modal if clicked outside
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Handle form submission
    editForm.addEventListener('submit', function(e) {
        e.preventDefault();
        updateProfile();
        modal.style.display = 'none';
    });

    function populateFormWithCurrentData() {
        document.getElementById('edit-name').value = document.getElementById('user-name').textContent;
        document.getElementById('edit-university').value = document.getElementById('university-name').textContent;
        document.getElementById('edit-about').value = document.getElementById('about-me').textContent;
        
        const experiences = Array.from(document.querySelectorAll('.experience-item')).map(item => {
            return item.querySelector('h3').textContent + '\n' + 
                   item.querySelectorAll('p')[0].textContent + '\n' + 
                   item.querySelectorAll('p')[1].textContent;
        }).join('\n\n');
        document.getElementById('edit-experience').value = experiences;

        const socialLinks = Array.from(document.querySelectorAll('.social-links a')).map(link => link.getAttribute('href')).join(', ');
        document.getElementById('edit-social').value = socialLinks;
    }

    function updateProfile() {
        document.getElementById('user-name').textContent = document.getElementById('edit-name').value;
        document.getElementById('university-name').textContent = document.getElementById('edit-university').value;
        document.getElementById('about-me').textContent = document.getElementById('edit-about').value;

        const experienceList = document.getElementById('experience-list');
        experienceList.innerHTML = '';
        const experiences = document.getElementById('edit-experience').value.split('\n\n');
        experiences.forEach(exp => {
            const [title, period, description] = exp.split('\n');
            const expItem = document.createElement('div');
            expItem.className = 'experience-item';
            expItem.innerHTML = `
                <h3>${title}</h3>
                <p>${period}</p>
                <p>${description}</p>
            `;
            experienceList.appendChild(expItem);
        });

        const socialLinksContainer = document.getElementById('social-links');
        socialLinksContainer.innerHTML = '';
        const socialLinks = document.getElementById('edit-social').value.split(', ');
        const socialIcons = ['github', 'linkedin', 'twitter', 'instagram'];
        socialLinks.forEach((link, index) => {
            if (link) {
                const a = document.createElement('a');
                a.href = link;
                a.title = socialIcons[index];
                a.innerHTML = `<i class="fab fa-${socialIcons[index]}"></i>`;
                socialLinksContainer.appendChild(a);
            }
        });
    }
});
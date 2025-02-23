// University data
const universities = {
    1: {
        name: "Massachusetts Institute of Technology",
        description: "MIT is a private land-grant research university in Cambridge, Massachusetts. Established in 1861, MIT has played a key role in the development of modern technology and science, and is one of the most prestigious institutions of higher learning in the world.",
        students: 11500,
        alumni: 139000,
        location: "Cambridge, MA",
        programs: ["Engineering", "Computer Science", "Physics", "Business", "Architecture"],
        facilities: ["Research Labs", "Innovation Center", "Sports Complex", "Libraries", "Student Center"],
        rankings: {
            world: 1,
            national: 1,
            engineering: 1
        },
        imageUrl: "https://alum.mit.edu/sites/default/files/images/Slice_24_04_16_USNews.jpg"
    },
    2: {
        name: "JSPM University",
        description: "JSPM University is a private research university in Wagholi, Pune. Founded in 2022, JSPM is known for its academic excellence, wealth, proximity to Silicon Valley, and ranking as one of the world's top universities.",
        students: 2000,
        alumni: 42000,
        location: "Pune, IN",
        programs: ["Computer Science", "Business", "Medicine", "Law", "Engineering"],
        facilities: ["Research Centers", "Medical Center", "Athletic Facilities", "Libraries", "Art Museums"],
        rankings: {
            world: 2,
            national: 3,
            engineering: 2
        },
        imageUrl: "/api/placeholder/800/400"
    },
    3: {
        name: "Harvard University",
        description: "Harvard University is a private Ivy League research university in Cambridge, Massachusetts. Founded in 1636, Harvard is the oldest institution of higher learning in the United States and one of the most prestigious universities in the world.",
        students: 23700,
        alumni: 371000,
        location: "Cambridge, MA",
        programs: ["Liberal Arts", "Business", "Law", "Medicine", "Education"],
        facilities: ["Research Centers", "Museums", "Libraries", "Athletic Facilities", "Student Housing"],
        rankings: {
            world: 3,
            national: 2,
            business: 1
        },
        imageUrl: "/api/placeholder/800/400"
    },
    4: {
        name: "Stanford University",
        description: "Stanford University is a private research university in Stanford, California. It is known for its entrepreneurial culture, strong engineering programs, and proximity to Silicon Valley.",
        students: 16100,
        alumni: 220000,
        location: "Stanford, CA",
        programs: ["Computer Science", "Business", "Law", "Engineering", "Medicine"],
        facilities: ["Innovation Lab", "Athletic Complex", "Libraries", "Startup Incubators"],
        rankings: {
            world: 2,
            national: 2,
            engineering: 3
        },
        imageUrl: "https://www.stanford.edu/wp-content/uploads/2022/10/stanford-campus.jpg"
    },
    5: {
        name: "University of Oxford",
        description: "The University of Oxford is the oldest university in the English-speaking world. It is renowned for its rigorous academic programs and rich history.",
        students: 24000,
        alumni: 350000,
        location: "Oxford, UK",
        programs: ["Philosophy", "Politics", "Economics", "Medicine", "Engineering"],
        facilities: ["Historic Libraries", "Research Labs", "Colleges", "Museums"],
        rankings: {
            world: 4,
            national: 1,
            humanities: 1
        },
        imageUrl: "https://www.ox.ac.uk/sites/files/oxford/field/field_image_main/oxford-university-hero-2020.jpg"
    },
    6: {
        name: "University of Cambridge",
        description: "Founded in 1209, the University of Cambridge is one of the world's leading academic institutions, known for its excellence in science and humanities.",
        students: 22000,
        alumni: 300000,
        location: "Cambridge, UK",
        programs: ["Mathematics", "Physics", "History", "Medicine", "Engineering"],
        facilities: ["Research Centers", "Libraries", "Botanical Gardens", "Museums"],
        rankings: {
            world: 5,
            national: 2,
            science: 1
        },
        imageUrl: "https://www.cam.ac.uk/sites/www.cam.ac.uk/files/styles/og_image_style/public/news/research/2021/04/cambridge_covid_survey.jpg"
    }
};

// DOM Elements
const modal = document.getElementById('universityModal');
const modalContent = document.getElementById('universityDetails');
const closeBtn = document.getElementsByClassName('close')[0];
const searchInput = document.getElementById('searchUniversity');
const universityCards = document.querySelectorAll('.university-card');

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // University card click handlers
    universityCards.forEach(card => {
        card.addEventListener('click', () => {
            const universityId = card.getAttribute('data-id');
            showUniversityDetails(universityId);
        });
    });

    // Search functionality
    searchInput.addEventListener('input', filterUniversities);
});

// Close modal when clicking (x)
closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Close modal when clicking outside
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

// Show university details in modal
function showUniversityDetails(universityId) {
    const university = universities[universityId];
    
    const detailsHTML = `
        <div class="university-details">
            <img src="${university.imageUrl}" alt="${university.name}" style="width: 100%; height: 300px; object-fit: cover; border-radius: 8px;">
            <h2 style="color: #0066cc; margin: 20px 0;">${university.name}</h2>
            <p style="margin-bottom: 20px;">${university.description}</p>
            
            <div class="details-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin: 20px 0;">
                <div class="details-section">
                    <h3 style="color: #0066cc; margin-bottom: 10px;">Key Statistics</h3>
                    <p><strong>Students:</strong> ${university.students.toLocaleString()}</p>
                    <p><strong>Alumni:</strong> ${university.alumni.toLocaleString()}</p>
                    <p><strong>Location:</strong> ${university.location}</p>
                </div>
                
                <div class="details-section">
                    <h3 style="color: #0066cc; margin-bottom: 10px;">Rankings</h3>
                    <p><strong>World Rank:</strong> #${university.rankings.world}</p>
                    <p><strong>National Rank:</strong> #${university.rankings.national}</p>
                </div>
            </div>
            
            <div style="margin: 20px 0;">
                <h3 style="color: #0066cc; margin-bottom: 10px;">Popular Programs</h3>
                <div style="display: flex; flex-wrap: wrap; gap: 10px;">
                    ${university.programs.map(program => 
                        `<span style="background: #f0f8ff; padding: 5px 15px; border-radius: 20px; color: #0066cc;">${program}</span>`
                    ).join('')}
                </div>
            </div>
            
            <div style="margin: 20px 0;">
                <h3 style="color: #0066cc; margin-bottom: 10px;">Campus Facilities</h3>
                <div style="display: flex; flex-wrap: wrap; gap: 10px;">
                    ${university.facilities.map(facility => 
                        `<span style="background: #f0f8ff; padding: 5px 15px; border-radius: 20px; color: #0066cc;">${facility}</span>`
                    ).join('')}
                </div>
            </div>
        </div>
    `;
    
    modalContent.innerHTML = detailsHTML;
    modal.style.display = 'block';
}

// Filter universities based on search input
function filterUniversities() {
    const searchTerm = searchInput.value.toLowerCase();
    
    universityCards.forEach(card => {
        const universityName = card.querySelector('h3').textContent.toLowerCase();
        const universityLocation = card.querySelector('.university-stats p:last-child').textContent.toLowerCase();
        
        if (universityName.includes(searchTerm) || universityLocation.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}
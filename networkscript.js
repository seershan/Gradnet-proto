document.addEventListener('DOMContentLoaded', function() {
    const alumniData = [
        {
            name: "Eduardo Smith",
            graduationYear: 2015,
            jobTitle: "Software Engineer",
            company: "Facebook Inc.",
            photo: "images/person1.jpg"
        },
        {
            name: "Mike Pencerno",
            graduationYear: 2018,
            jobTitle: "Marketing Manager",
            company: "Microsoft Corp.",
            photo: "images/person2.jpg"
        },
        {
            name: "Brandon Cooper",
            graduationYear: 2010,
            jobTitle: "Financial Analyst",
            company: "Goldman Sachs",
            photo: "images/person3.jpg"
        },
        {
            name: "Rishi Sharma",
            graduationYear: 2020,
            jobTitle: "UI and UX Designer",
            company: "Apple Inc.",
            photo: "images/person4.jpg"
        },
        {
            name: "David Wilson",
            graduationYear: 2012,
            jobTitle: "Project Manager",
            company: "Netflix Inc.",
            photo: "images/person5.jpg"
        },
        {
            name: "Mathew Wossen",
            graduationYear: 1984,
            jobTitle: "Data Scientist",
            company: "Nvidia Corp.",
            photo: "images/person6.jpg"
        },
        {
            name: "Joshua Thompson",
            graduationYear: 2008,
            jobTitle: "Product Manager",
            company: "Google Inc.",
            photo: "images/person7.jpg"
        },
        {
            name: "Sophia Rodriguez",
            graduationYear: 2016,
            jobTitle: "HR Specialist",
            company: "Google Inc.",
            photo: "images/person8.jpg"
        },
        {
            name: "Andrew Parker",
            graduationYear: 2014,
            jobTitle: "Cybersecurity Analyst",
            company: "Microsoft Corp.",
            photo: "images/person9.jpg"
        }
    ];

    const alumniGrid = document.getElementById('alumni-grid');
    const searchForm = document.getElementById('search-form');

    function renderAlumniCards(alumni) {
        alumniGrid.innerHTML = '';
        alumni.forEach(person => {
            const card = document.createElement('div');
            card.className = 'alumni-card';
            card.innerHTML = `
                <img src="${person.photo}" alt="${person.name}" class="alumni-photo">
                <h3>${person.name}</h3>
                <p class="alumni-info">Class of ${person.graduationYear}</p>
                <p class="alumni-info">${person.jobTitle} at ${person.company}</p>
                <a href="#" class="connect-button">Connect</a>
            `;
            alumniGrid.appendChild(card);
        });
    }

    function filterAlumni(name, jobDescription, graduationYear) {
        return alumniData.filter(alumni => {
            const nameMatch = alumni.name.toLowerCase().includes(name.toLowerCase());
            const jobMatch = `${alumni.jobTitle} ${alumni.company}`.toLowerCase().includes(jobDescription.toLowerCase());
            const yearMatch = graduationYear === '' || alumni.graduationYear.toString() === graduationYear;
            return nameMatch && jobMatch && yearMatch;
        });
    }

    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const jobDescription = document.getElementById('job-description').value;
        const graduationYear = document.getElementById('graduation-year').value;

        const filteredAlumni = filterAlumni(name, jobDescription, graduationYear);
        renderAlumniCards(filteredAlumni);
    });

    // Initial render of all alumni
    renderAlumniCards(alumniData);

    // Connect button functionality
    alumniGrid.addEventListener('click', function(e) {
        if (e.target.classList.contains('connect-button')) {
            e.preventDefault();
            const alumniName = e.target.closest('.alumni-card').querySelector('h3').textContent;
            alert(`Connection request sent to ${alumniName}. They will be notified of your interest to connect.`);
        }
    });
});
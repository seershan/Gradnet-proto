document.addEventListener('DOMContentLoaded', function() {
    const jobSearchForm = document.getElementById('job-search-form');
    const jobList = document.getElementById('job-list');

    // Sample job data (in a real application, this would come from a backend API)
    const jobs = [
        {
            title: "Software Engineer",
            company: "Facebook Inc.",
            location: "San Francisco, CA",
            type: "full-time",
            description: "We are seeking a talented Software Engineer to join our dynamic team..."
        },
        {
            title: "Marketing Specialist",
            company: "Google Inc.",
            location: "New York, NY",
            type: "full-time",
            description: "Join our marketing team to develop and implement innovative marketing strategies..."
        },
        {
            title: "Data Analyst",
            company: "Microsoft Corp.",
            location: "Chicago, IL",
            type: "full-time",
            description: "We're looking for a skilled Data Analyst to help us uncover insights from complex datasets..."
        },
        {
            title: "UX Designer",
            company: "Apple Inc.",
            location: "Los Angeles, CA",
            type: "contract",
            description: "Help us create intuitive and engaging user experiences for our clients..."
        },
        {
            title: "Sales Representative",
            company: "Nvidia Corp.",
            location: "Bengaluru, IN",
            type: "full-time",
            description: "Join our high-performing sales team and drive business growth..."
        },
        {
            title: "Customer Support Specialist",
            company: "Amazon Inc.",
            location: "Remote",
            type: "part-time",
            description: "Provide excellent customer support for our growing user base..."
        }
    ];

    function renderJobs(jobsToRender) {
        jobList.innerHTML = '';
        jobsToRender.forEach(job => {
            const jobCard = document.createElement('div');
            jobCard.className = 'job-card';
            jobCard.innerHTML = `
                <h3>${job.title}</h3>
                <p class="company">${job.company}</p>
                <p class="location">${job.location}</p>
                <p>${job.description}</p>
                <a href="#" class="apply-button">Apply Now</a>
            `;
            jobList.appendChild(jobCard);
        });
    }

    jobSearchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const jobTitle = document.getElementById('job-title').value.toLowerCase();
        const location = document.getElementById('location').value.toLowerCase();
        const jobType = document.getElementById('job-type').value.toLowerCase();

        const filteredJobs = jobs.filter(job => {
            const titleMatch = job.title.toLowerCase().includes(jobTitle);
            const locationMatch = job.location.toLowerCase().includes(location);
            const typeMatch = jobType === '' || job.type === jobType;
            return titleMatch && locationMatch && typeMatch;
        });

        renderJobs(filteredJobs);
    });

    // Initial render of all jobs
    renderJobs(jobs);

    // Apply button functionality
    jobList.addEventListener('click', function(e) {
        if (e.target.classList.contains('apply-button')) {
            e.preventDefault();
            const jobTitle = e.target.closest('.job-card').querySelector('h3').textContent;
            alert(`Application submitted for ${jobTitle}. We'll be in touch soon!`);
        }
    });
});
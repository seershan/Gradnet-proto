document.addEventListener("DOMContentLoaded", () => {
    const profileForm = document.getElementById("profile-form")
    const generatedProfile = document.getElementById("generated-profile")
    const profileContent = document.getElementById("profile-content")
    const regenerateButton = document.getElementById("regenerate-button")
    const downloadImageButton = document.getElementById("download-image")
    const downloadPDFButton = document.getElementById("download-pdf")
    const downloadButtons = document.querySelector(".download-buttons")
  
/*

"Right now, we use a switch statement to pick from 4 pre-built templates (Professional, Creative, etc.). Think of these as ‘personality modes’—each applies different writing rules. For example, the Professional template emphasizes years of experience, while the Storytelling mode creates a narrative."

*/

    let currentSummaryIndex = 0
  
    profileForm.addEventListener("submit", (e) => {
      e.preventDefault()
      generateProfile()
    })
  
    regenerateButton.addEventListener("click", () => {
      currentSummaryIndex = (currentSummaryIndex + 1) % 4
      generateProfile()
    })
  
    downloadImageButton.addEventListener("click", downloadAsImage)
    downloadPDFButton.addEventListener("click", downloadAsPDF)

    /*
"For each template, we’ve handcrafted multiple summary variations. When you click ‘Regenerate,’ we cycle through these summaries using currentSummaryIndex. This simulates AI’s ability to refine outputs—today it’s manual, but tomorrow it’ll use NLP models to generate infinite unique versions.
    */
  
    function generateProfile() {
      const name = document.getElementById("name").value
      const profession = document.getElementById("profession").value
      const yearsExperience = document.getElementById("years-experience").value
      const keySkills = document
        .getElementById("key-skills")
        .value.split(",")
        .map((skill) => skill.trim())
      const education = document.getElementById("education").value
      const university = document.getElementById("university").value
      const dateOfBirth = document.getElementById("date-of-birth").value
      const location = document.getElementById("location").value
      const interests = document
        .getElementById("interests")
        .value.split(",")
        .map((interest) => interest.trim())
      const languages = document
        .getElementById("languages")
        .value.split(",")
        .map((language) => language.trim())
      const profileStyle = document.getElementById("profile-style").value
      const profileImage = document.getElementById("profile-image").files[0]
  
      let profileHTML = ""
  
      const profileData = {
        name,
        profession,
        yearsExperience,
        keySkills,
        education,
        university,
        dateOfBirth,
        location,
        interests,
        languages,
        profileImage,
      }
  
/* 
We clean and structure user inputs (like splitting skills by commas) to prepare the data for processing. This is critical for AI—structured data helps models understand patterns and relationships.
*/

      switch (profileStyle) {
        case "1":
          profileHTML = generateProfessionalProfile(profileData)
          break
        case "2":
          profileHTML = generateCreativeProfile(profileData)
          break
        case "3":
          profileHTML = generateConciseProfile(profileData)
          break
        case "4":
          profileHTML = generateStorytellingProfile(profileData)
          break
      }
  
      profileContent.innerHTML = profileHTML
      generatedProfile.classList.remove("hidden")
      downloadButtons.classList.remove("hidden")
      generatedProfile.scrollIntoView({ behavior: "smooth" })
  
      if (profileImage) {
        const reader = new FileReader()
        reader.onload = (e) => {
          const img = document.getElementById("profile-image-preview")
          img.src = e.target.result
        }
        reader.readAsDataURL(profileImage)
      }
    }
  
    function generateProfessionalProfile(data) {
      const summaries = [
        `A highly motivated and results-driven ${data.profession} with ${data.yearsExperience} years of experience. Leveraging a strong educational background from ${data.university}, I bring expertise in ${data.keySkills
          .slice(0, 3)
          .join(", ")} to deliver innovative solutions and drive success in challenging projects.`,
        `Experienced ${data.profession} with a proven track record of ${data.yearsExperience} years in the industry. Graduated from ${data.university}, I combine academic excellence with practical skills in ${data.keySkills
          .slice(0, 3)
          .join(", ")} to tackle complex problems and achieve outstanding results.`,
        `Dynamic and forward-thinking ${data.profession} with ${data.yearsExperience} years of hands-on experience. Armed with a degree from ${data.university}, I excel in ${data.keySkills
          .slice(0, 3)
          .join(", ")} consistently delivering high-quality outcomes and driving innovation in every project.`,
        `Dedicated ${data.profession} with a ${data.yearsExperience}-year career marked by continuous growth and achievement. My educational foundation from ${data.university} complements my expertise in ${data.keySkills
          .slice(0, 3)
          .join(", ")} enabling me to lead teams and projects to success.`,
      ]
  
      return `
              ${generateProfileImage(data.profileImage, data.name)}
              <h3>${data.name}</h3>
              <p>${data.profession} | ${data.location}</p>
              <div class="profile-section">
                  <h4>Professional Summary</h4>
                  <p>${summaries[currentSummaryIndex]}</p>
              </div>
              <div class="profile-section">
                  <h4>Key Skills</h4>
                  <ul>
                      ${data.keySkills.map((skill) => `<li>${skill}</li>`).join("")}
                  </ul>
              </div>
              <div class="profile-section">
                  <h4>Education</h4>
                  <p>${data.education}</p>
                  <p>University: ${data.university}</p>
              </div>
              <div class="profile-section">
                  <h4>Languages</h4>
                  <p>${data.languages.join(", ")}</p>
              </div>
              <div class="profile-section">
                  <h4>Interests</h4>
                  <p>${data.interests.join(", ")}</p>
              </div>
          `
    }
  
    function generateCreativeProfile(data) {
      return `
              ${generateProfileImage(data.profileImage, data.name)}
              <h3>${data.name} - Creative ${data.profession}</h3>
              <p>${data.location} | Earth Resident Since ${formatDate(data.dateOfBirth)}</p>
              <div class="profile-section">
                  <h4>My Creative Journey</h4>
                  <p>Imagine a ${data.profession} who brings ${data.yearsExperience} years of passion, creativity, and innovation to every project. That's me! I thrive on challenges and love pushing the boundaries of ${data.keySkills[0]} and ${data.keySkills[1]}.</p>
              </div>
              <div class="profile-section">
                  <h4>My Superpowers</h4>
                  <ul>
                      ${data.keySkills.map((skill) => `<li>${skill}</li>`).join("")}
                  </ul>
              </div>
              <div class="profile-section">
                  <h4>Where I Honed My Craft</h4>
                  <p>${data.education}</p>
              </div>
              <div class="profile-section">
                  <h4>Languages I Speak</h4>
                  <p>${data.languages.join(" | ")}</p>
              </div>
              <div class="profile-section">
                  <h4>What Inspires Me</h4>
                  <p>${data.interests.join(" • ")}</p>
              </div>
              <p>When I'm not ${data.profession.toLowerCase()}ing, you can find me exploring new ideas, collaborating with fellow creatives, and turning the ordinary into the extraordinary. Let's create something amazing together!</p>
          `
    }
  
    function generateConciseProfile(data) {
      return `
              ${generateProfileImage(data.profileImage, data.name)}
              <h3>${data.name}</h3>
              <p>${data.profession} | ${data.location}</p>
              <div class="profile-section">
                  <h4>Summary</h4>
                  <p>${data.yearsExperience} years of experience in ${data.profession}. Expertise in ${data.keySkills.slice(0, 3).join(", ")}.</p>
              </div>
              <div class="profile-section">
                  <h4>Education</h4>
                  <p>${data.education}</p>
              </div>
              <div class="profile-section">
                  <h4>Skills & Interests</h4>
                  <p>Skills: ${data.keySkills.join(", ")}</p>
                  <p>Languages: ${data.languages.join(", ")}</p>
                  <p>Interests: ${data.interests.join(", ")}</p>
              </div>
          `
    }
  
    function generateStorytellingProfile(data) {
      const randomStarters = [
        `In the world of ${data.profession}s, few stories are as compelling as that of ${data.name}.`,
        `${data.name}'s journey in the realm of ${data.profession} began on a fateful day in ${new Date(
          data.dateOfBirth,
        ).getFullYear()}.`,
        `If you're looking for a ${data.profession} who can turn ideas into reality, look no further than ${data.name}.`,
      ]
      const starter = randomStarters[Math.floor(Math.random() * randomStarters.length)]
  
      return `
              ${generateProfileImage(data.profileImage, data.name)}
              <h3>${data.name}'s Story</h3>
              <div class="profile-section">
                  <p>${starter} Born and raised in ${data.location}, ${data.name} has spent the last ${data.yearsExperience} years honing their craft and pushing the boundaries of what's possible in ${data.profession}.</p>
                  <p>Armed with a solid foundation from ${data.education}, ${data.name} set out to make their mark in the industry. Their expertise in ${data.keySkills
                    .slice(0, 3)
                    .join(", ")} quickly set them apart from their peers.</p>
                  <p>But ${data.name} is more than just a skilled ${data.profession}. They're a polyglot who can navigate conversations in ${data.languages.join(
                    " and ",
                  )}, and their interests in ${data.interests.join(", ")} bring a unique perspective to their work.</p>
                  <p>Whether it's tackling complex problems or collaborating on innovative projects, ${data.name} approaches each challenge with creativity, determination, and a dash of humor. Their story is still being written, and they're always excited to start the next chapter with new collaborators and exciting opportunities.</p>
              </div>
          `
    }
  
    function generateProfileImage(image, name) {
      if (image) {
        return `<img src="#" alt="${name}" id="profile-image-preview" class="profile-image">`
      } else {
        return `<div class="profile-image-placeholder">${name.charAt(0)}</div>`
      }
    }
  
    function formatDate(dateString) {
      const options = { year: "numeric", month: "long", day: "numeric" }
      return new Date(dateString).toLocaleDateString(undefined, options)
    }
  
    function downloadAsImage() {
      html2canvas(profileContent).then((canvas) => {
        const link = document.createElement("a")
        link.download = "my-profile.png"
        link.href = canvas.toDataURL()
        link.click()
      })
    }
  
    function downloadAsPDF() {
      const element = profileContent
      html2pdf().from(element).save("my-profile.pdf")
    }
  })
  
  
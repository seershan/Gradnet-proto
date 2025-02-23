document.addEventListener("DOMContentLoaded", () => {
  const chatbot = document.getElementById("chatbot")
  const chatbotBody = document.getElementById("chatbot-body")
  const chatbotMessages = document.getElementById("chatbot-messages")
  const chatbotForm = document.getElementById("chatbot-form")
  const chatbotInput = document.getElementById("chatbot-input")
  const chatbotToggle = document.getElementById("chatbot-toggle")
  const typingIndicator = document.getElementById("typing-indicator")

  let isOpen = true

  function toggleChatbot() {
    isOpen = !isOpen
    chatbotBody.style.maxHeight = isOpen ? "400px" : "0"
    chatbotToggle.innerHTML = isOpen ? '<i class="fas fa-minus"></i>' : '<i class="fas fa-plus"></i>'
    chatbotToggle.setAttribute("aria-label", isOpen ? "Minimize chatbot" : "Expand chatbot")
  }

  chatbotToggle.addEventListener("click", toggleChatbot)

  function addMessage(message, className) {
    const messageElement = document.createElement("div")
    messageElement.classList.add("message", className)
    messageElement.textContent = message
    chatbotMessages.appendChild(messageElement)
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight
  }

  function showTypingIndicator() {
    typingIndicator.classList.remove("hidden")
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight
  }

  function hideTypingIndicator() {
    typingIndicator.classList.add("hidden")
  }

  chatbotForm.addEventListener("submit", (e) => {
    e.preventDefault()
    const userMessage = chatbotInput.value.trim()
    if (userMessage === "") return

    addMessage(userMessage, "user-message")
    chatbotInput.value = ""

    showTypingIndicator()

    setTimeout(
      () => {
        hideTypingIndicator()
        const botResponse = generateResponse(userMessage)
        addMessage(botResponse, "bot-message")
      },
      1000 + Math.random() * 1000,
    )
  })

  function generateResponse(userInput) {
    const lowercaseInput = userInput.toLowerCase()

    if (lowercaseInput.includes("website") && lowercaseInput.includes("do")) {
      return "GradNet is an alumni networking platform that connects graduates, facilitates mentorship, and provides career resources. It helps alumni stay connected with their alma mater and fellow graduates while offering opportunities for professional growth."
    }

    if (lowercaseInput.includes("different") && lowercaseInput.includes("linkedin")) {
      return "While LinkedIn is a general professional networking platform, GradNet is specifically designed for alumni connections. It focuses on university-specific networking, mentorship programs, and tailored career resources for graduates. GradNet offers a more intimate and focused community for alumni to engage with their peers and alma mater."
    }

    if (lowercaseInput.includes("alumni") || lowercaseInput.includes("alumnus") || lowercaseInput.includes("alumna")) {
      return "Alumni (singular: alumnus for male, alumna for female) refers to graduates or former students of a school, college, or university. GradNet is designed to connect and support these alumni throughout their professional lives."
    }

    if (lowercaseInput.includes("features") || lowercaseInput.includes("offer")) {
      return "GradNet offers features such as an alumni directory, job listings, mentorship programs, networking events, and career resources. It's a comprehensive platform designed to support graduates in their professional journey."
    }

    if (lowercaseInput.includes("join") || lowercaseInput.includes("sign up")) {
      return "To join GradNet, you need to be an alumnus of a participating university. You can sign up by clicking the 'Join Now' button on the homepage and following the registration process. You may need to verify your alumni status during registration."
    }

    if (lowercaseInput.includes("benefit") || lowercaseInput.includes("advantage")) {
      return "The benefits of using GradNet include networking with fellow alumni, accessing exclusive job opportunities, finding mentors in your field, staying connected with your alma mater, and accessing valuable career resources and events tailored for graduates."
    }

    if (lowercaseInput.includes("mentorship") || lowercaseInput.includes("mentor")) {
      return "GradNet offers a mentorship program that connects experienced alumni with recent graduates or those seeking career guidance. Mentors can share their expertise, provide advice, and help mentees navigate their professional paths. You can sign up as a mentor or mentee through your GradNet profile."
    }

    if (
      lowercaseInput.includes("job") &&
      (lowercaseInput.includes("listing") ||
        lowercaseInput.includes("posting") ||
        lowercaseInput.includes("opportunity"))
    ) {
      return "GradNet features a job board with exclusive opportunities posted by alumni and partner companies. You can browse job listings, set up job alerts, and apply directly through the platform. Many of these positions are specifically targeted at alumni from your university."
    }

    if (lowercaseInput.includes("what") || lowercaseInput.includes("gradnet")) {
      return "GradNet is an Alumni Association platform that connects students and alumni through networking, mentorship, job opportunities, and project collaboration. It offers features like alumni directories, career guidance, learning resources, hackathons, and a freelance marketplace, helping users build professional connections and advance their careers."
    }

    if (lowercaseInput.includes("event") || lowercaseInput.includes("networking")) {
      return "GradNet regularly hosts both virtual and in-person networking events for alumni. These events include industry-specific meetups, career fairs, workshops, and social gatherings. You can find and RSVP to upcoming events in the 'Events' section of the platform."
    }

    if (lowercaseInput.includes("profile") || lowercaseInput.includes("generator")) {
      return "GradNet provides profile generator which you can use to generate your profiles, and make your resume's and e visiting cards that you can download as a pdf file or as an image file."
    }

    if (lowercaseInput.includes("project") || lowercaseInput.includes("ideas")) {
      return "GradNet provides project ideas feature which you can use to generate project ideas based on your interests and topics."
    }

    if (lowercaseInput.includes("seershan") || lowercaseInput.includes("mitra")) {
      return "Seershan Mitra is the founder team member at GradNet. They have a background in computer science and have experience in web development and networking. He handles the full workflow of GradNet and is responsible for the platform's technical architecture and user experience design."
    }

    if (lowercaseInput.includes("himanshu") || lowercaseInput.includes("maharaj")) {
      return "Himanshu Maharaj is team member at GradNet. They have a background in computer science and handles the backend development and clients relationship of GradNet."
    }

    if (lowercaseInput.includes("rohan") || lowercaseInput.includes("lokhande")) {
      return "Rohan Lokhande is team member at GradNet. They have a background in computer science and handles the backend development and overall management of GradNet."
    }

    if (lowercaseInput.includes("ashwani") || lowercaseInput.includes("maurya")) {
      return "Ashwani Maurya is team member at GradNet. They have a background in computer science and is the technical lead of GradNet."
    }

    if (lowercaseInput.includes("nihar") || lowercaseInput.includes("mengade")) {
      return "Nihar Mengade is team member at GradNet. They have a background in computer science and is the financial lead of GradNet."
    }

    if (lowercaseInput.includes("kanak") || lowercaseInput.includes("singh") || lowercaseInput.includes("girlfriend") || lowercaseInput.includes("himanshu")) {
      return "Himya ki bandi hai, zyada bolunga toh vivaad hojayega."
    }

    if (
      lowercaseInput.includes("profile") &&
      (lowercaseInput.includes("create") || lowercaseInput.includes("set up") || lowercaseInput.includes("complete"))
    ) {
      return "To create your GradNet profile, log in and navigate to the 'Profile' section. Fill in details about your education, work experience, skills, and interests. You can also add a profile picture and link to your other professional social media accounts. A complete profile helps you connect with other alumni and increases your visibility for job opportunities and mentorship."
    }

    if (lowercaseInput.includes("privacy") || lowercaseInput.includes("data")) {
      return "GradNet takes your privacy seriously. Your personal information is protected and only shared with other verified alumni based on your privacy settings. You can control who sees your profile information, and you can opt out of certain features like the alumni directory if you prefer. For more details, please review our Privacy Policy on the website."
    }

    if (lowercaseInput.includes("mobile") || lowercaseInput.includes("app")) {
      return "No, currently GradNet does not have a mobile app available for both iOS and Android devices. You can currently access GradNet on a web browser, which allows you to access all GradNet features on the go, including messaging, job listings, and event information through our website."
    }

    if (lowercaseInput.includes("event") || lowercaseInput.includes("networking")) {  
      return "GradNet regularly hosts both virtual and in-person networking events for alumni. These include industry-specific meetups, career fairs, workshops, and social gatherings. You can find and RSVP to upcoming events in the 'Events' section of the platform."  
    }
    
    if (lowercaseInput.includes("profile") || lowercaseInput.includes("generator")) {  
      return "GradNet provides a profile generator that allows you to create professional profiles, resumes, and e-visiting cards. You can download them as PDF or image files for easy sharing."  
    }
    
    if (lowercaseInput.includes("project") || lowercaseInput.includes("ideas")) {  
      return "GradNet offers a project ideas feature that generates personalized project suggestions based on your interests. You can also collaborate with alumni and students on exciting projects through the platform."  
    }
    
    if (lowercaseInput.includes("directory") || lowercaseInput.includes("connect") || lowercaseInput.includes("network")) {  
      return "GradNet features an extensive alumni directory where you can find and connect with fellow alumni based on graduation year, location, or industry. This feature helps expand your professional network and stay connected with your alma mater."  
    }
    
    if (lowercaseInput.includes("mentor") || lowercaseInput.includes("guidance")) {  
      return "GradNet connects students and professionals with experienced mentors across various industries. You can find mentors, schedule virtual or in-person sessions, and receive career guidance, job search tips, and industry insights."  
    }
    
    if (lowercaseInput.includes("jobs") || lowercaseInput.includes("internship") || lowercaseInput.includes("career")) {  
      return "GradNet provides an exclusive job portal where verified alumni can post job openings and internship opportunities. You can filter listings based on skills, industry, and experience level, and employers can reach out directly."  
    }
    
    if (lowercaseInput.includes("courses") || lowercaseInput.includes("learning") || lowercaseInput.includes("skills")) {  
      return "GradNet offers a dedicated section for online courses and workshops in various fields like web development, AI, blockchain, business strategies, and more. Alumni can upskill and stay competitive in their industries."  
    }
    
    if (lowercaseInput.includes("forum") || lowercaseInput.includes("discussion") || lowercaseInput.includes("community")) {  
      return "GradNet provides discussion forums where alumni can engage in meaningful conversations, share industry insights, and collaborate on ideas. Join topic-specific groups like technology, entrepreneurship, and research!"  
    }

    if (lowercaseInput.includes("startup") || lowercaseInput.includes("funding") || lowercaseInput.includes("investment")) {  
      return "GradNet supports entrepreneurs by offering startup showcase opportunities, investor connections, and mentorship. Alumni can pitch their ideas, seek funding, and collaborate with other founders through our startup network."  
    }
    
    if (lowercaseInput.includes("privacy") || lowercaseInput.includes("data")) {  
      return "GradNet takes your privacy seriously. Your personal information is protected and only shared with verified alumni based on your privacy settings. You can control who sees your profile information and opt out of the alumni directory if needed."  
    }
    
    if (lowercaseInput.includes("AI") || lowercaseInput.includes("assistant") || lowercaseInput.includes("chatbot")) {  
      return "GradNet features an AI-powered assistant that helps you navigate the platform, suggest networking opportunities, recommend jobs, and provide career advice tailored to your profile and interests."  
    }
    
    if (lowercaseInput.includes("success story") || lowercaseInput.includes("interview") || lowercaseInput.includes("featured alumni")) {  
      return "GradNet highlights inspiring success stories of alumni who have excelled in various industries. You can read exclusive interviews, learn from their journeys, and even get in touch with them for mentorship opportunities."  
    }

    if (lowercaseInput.includes("referral") || lowercaseInput.includes("rewards") || lowercaseInput.includes("invite")) {  
      return "GradNet offers a referral program where you can invite alumni to join the platform. Earn points for successful referrals, which can be redeemed for exclusive benefits like free mentorship sessions, priority job listings, and event discounts."  
    }

    if (lowercaseInput.includes("podcast") || lowercaseInput.includes("webinar") || lowercaseInput.includes("livestream")) {  
      return "GradNet hosts regular podcasts and webinars featuring industry leaders, career experts, and successful alumni. Tune in to gain valuable insights, ask questions, and stay updated with the latest trends."  
    }

    if (lowercaseInput.includes("marketplace") || lowercaseInput.includes("freelance") || lowercaseInput.includes("services")) {  
      return "GradNet features an alumni marketplace where members can showcase and sell services, from freelance work to specialized consulting. Whether you need a developer, designer, or writer, you can find trusted alumni professionals here."  
    }

    if (lowercaseInput.includes("hackathon") || lowercaseInput.includes("coding challenge") || lowercaseInput.includes("competition")) {  
      return "GradNet hosts hackathons and coding challenges where alumni and students can showcase their skills, collaborate on projects, and win exciting prizes. Stay tuned for upcoming competitions!"  
    }

    if (lowercaseInput.includes("international") || lowercaseInput.includes("chapter") || lowercaseInput.includes("global network")) {  
      return "GradNet supports international alumni chapters, allowing graduates to connect with peers in their region. Whether you're in the US, UK, Canada, or Australia, find alumni near you and grow your network globally."  
    }

    if (lowercaseInput.includes("book club") || lowercaseInput.includes("reading") || lowercaseInput.includes("knowledge sharing")) {  
      return "GradNet’s Book Club brings together alumni interested in literature, self-improvement, and industry-relevant reads. Join discussions, share recommendations, and expand your knowledge with peers."  
    }

    if (lowercaseInput.includes("mental health") || lowercaseInput.includes("stress") || lowercaseInput.includes("well-being")) {  
      return "GradNet prioritizes mental well-being by offering access to alumni psychologists, wellness webinars, and peer support groups. Whether you need career counseling or personal guidance, we're here to help."  
    }

    if (lowercaseInput.includes("discount") || lowercaseInput.includes("perk") || lowercaseInput.includes("exclusive deal")) {  
      return "GradNet partners with businesses and brands to offer exclusive discounts on courses, software, travel, and more. Check out the 'Perks' section for special alumni-only benefits."  
    }

    if (lowercaseInput.includes("job fair") || lowercaseInput.includes("recruiter") || lowercaseInput.includes("career expo")) {  
      return "GradNet organizes live job fairs where recruiters from top companies actively seek alumni for job openings. Attend, network, and secure your next big career move!"  
    }

    if (lowercaseInput.includes("points") || lowercaseInput.includes("leaderboard") || lowercaseInput.includes("badges")) {  
      return "GradNet makes networking fun with a gamified experience! Earn points for engagement, climb leaderboards, and unlock badges for milestones like mentoring, attending events, or sharing insights."  
    }    

    return "I'm sorry, I don't have specific information about that. Can you try rephrasing your question or ask about GradNet's features, alumni networking, mentorship, job opportunities, events, or how it differs from other platforms?"
  }

  // Add a welcome message
  setTimeout(() => {
    addMessage("Hello! I'm the GradNet Assistant. How can I help you today?", "bot-message")
  }, 500)
})


document.addEventListener("DOMContentLoaded", () => {
  const projectForm = document.getElementById("project-form")
  const projectIdeas = document.getElementById("project-ideas")
  const ideasList = document.getElementById("ideas-list")

  const projectIdeasData = {
    "ai-ml": [
      {
        title: "Emotion Recognition AI",
        description:
          "Develop an AI system that can recognize human emotions from facial expressions in real-time video streams.",
      },
      {
        title: "AI-Powered Personal Finance Assistant",
        description:
          "Create an AI assistant that helps users manage their finances, providing personalized advice and budget recommendations.",
      },
      {
        title: "Predictive Maintenance for Industrial Equipment",
        description:
          "Build a machine learning model that predicts when industrial equipment is likely to fail, allowing for proactive maintenance.",
      },
      {
        title: "AI-Generated Music Composer",
        description:
          "Develop an AI system that can compose original music in various genres based on user preferences and input parameters.",
      },
      {
        title: "Automated Essay Grading System",
        description:
          "Create an AI-powered system that can grade essays and provide detailed feedback to students, assisting educators in their work.",
      },
    ],
    "web-dev": [
      {
        title: "Virtual Event Platform",
        description:
          "Build a web-based platform for hosting and attending virtual events, with features like live streaming, networking, and interactive sessions.",
      },
      {
        title: "Collaborative Whiteboard Application",
        description:
          "Develop a real-time collaborative whiteboard tool for remote teams to brainstorm and share ideas visually.",
      },
      {
        title: "Personalized Recipe Recommendation Website",
        description:
          "Create a website that recommends recipes based on user preferences, dietary restrictions, and available ingredients.",
      },
      {
        title: "Interactive Data Visualization Dashboard",
        description:
          "Build a web-based dashboard for visualizing complex datasets with interactive charts, graphs, and filtering options.",
      },
      {
        title: "Online Peer-to-Peer Skill Exchange Platform",
        description:
          "Develop a platform where users can exchange skills and knowledge through virtual classes and mentoring sessions.",
      },
    ],
    "app-dev": [
      {
        title: "Augmented Reality Language Learning App",
        description:
          "Create a mobile app that uses AR to help users learn new languages by overlaying translations and pronunciations on real-world objects.",
      },
      {
        title: "Gamified Habit Tracking App",
        description:
          "Develop a mobile app that turns habit formation into a game, with rewards, challenges, and social features to keep users motivated.",
      },
      {
        title: "Local Community Marketplace App",
        description:
          "Build a location-based app for buying, selling, and trading goods and services within local communities.",
      },
      {
        title: "Mental Health Check-in and Support App",
        description:
          "Create an app that provides daily mental health check-ins, mood tracking, and connects users with support resources and professionals.",
      },
      {
        title: "Sustainable Living Assistant App",
        description:
          "Develop an app that helps users reduce their carbon footprint by providing personalized suggestions for sustainable living choices.",
      },
    ],
    cloud: [
      {
        title: "Serverless Microservices Architecture",
        description:
          "Design and implement a scalable microservices architecture using serverless computing platforms like AWS Lambda or Azure Functions.",
      },
      {
        title: "Multi-Cloud Backup and Disaster Recovery System",
        description:
          "Develop a system that automatically backs up data across multiple cloud providers and enables quick disaster recovery.",
      },
      {
        title: "Cloud-Based IoT Data Processing Pipeline",
        description:
          "Create a scalable data processing pipeline for IoT devices using cloud services for ingestion, storage, analysis, and visualization.",
      },
      {
        title: "Automated Cloud Cost Optimization Tool",
        description:
          "Build a tool that analyzes cloud usage patterns and recommends cost-saving measures, such as rightsizing instances or using spot instances.",
      },
      {
        title: "Secure Multi-Tenant SaaS Platform",
        description:
          "Develop a cloud-native SaaS platform that ensures data isolation and security for multiple tenants using containerization and microservices.",
      },
    ],
    robotics: [
      {
        title: "Autonomous Indoor Navigation Robot",
        description:
          "Build a robot that can navigate indoor environments, create maps, and perform tasks like delivery or cleaning.",
      },
      {
        title: "Robotic Arm for Sign Language Translation",
        description:
          "Develop a robotic arm that can translate spoken language into sign language gestures in real-time.",
      },
      {
        title: "Swarm Robotics for Environmental Monitoring",
        description:
          "Create a swarm of small robots that work together to monitor and collect data on environmental conditions in hard-to-reach areas.",
      },
      {
        title: "Assistive Robotics for Elderly Care",
        description:
          "Design a robot that can assist elderly individuals with daily tasks, monitor their health, and provide companionship.",
      },
      {
        title: "Agricultural Crop Monitoring and Harvesting Robot",
        description:
          "Develop a robot that can autonomously monitor crop health, detect diseases, and perform selective harvesting of ripe produce.",
      },
    ],
  }

  projectForm.addEventListener("submit", (e) => {
    e.preventDefault()
    const category = document.getElementById("project-category").value
    if (category) {
      generateIdeas(category)
    }
  })

  function generateIdeas(category) {
    const ideas = projectIdeasData[category]
    ideasList.innerHTML = ""
    ideas.forEach((idea) => {
      const ideaCard = document.createElement("div")
      ideaCard.classList.add("idea-card")
      ideaCard.innerHTML = `
                <h3>${idea.title}</h3>
                <p>${idea.description}</p>
            `
      ideasList.appendChild(ideaCard)
    })
    projectIdeas.classList.remove("hidden")
    projectIdeas.scrollIntoView({ behavior: "smooth" })
  }
})


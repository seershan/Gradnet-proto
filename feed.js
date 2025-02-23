document.addEventListener("DOMContentLoaded", () => {
  const postForm = document.getElementById("post-form")
  const postsContainer = document.getElementById("posts-container")
  const fileInput = document.getElementById("post-image")
  const fileLabel = document.querySelector(".file-input-label")

  // Update file input label when file is selected
  fileInput.addEventListener("change", () => {
    const fileName = fileInput.files[0]?.name
    fileLabel.innerHTML = fileName
      ? `<i class="fas fa-check"></i> ${fileName}`
      : '<i class="fas fa-image"></i> Add Photo'
  })

  postForm.addEventListener("submit", (e) => {
    e.preventDefault()
    const content = postForm.querySelector("textarea").value
    const imageFile = fileInput.files[0]

    if (content || imageFile) {
      createPost(content, imageFile)
      postForm.reset()
      fileLabel.innerHTML = '<i class="fas fa-image"></i> Add Photo'
    }
  })

  function createPost(content, imageFile, likes = 0, comments = []) {
    const post = document.createElement("div")
    post.className = "post"

    const postHeader = `
          <div class="post-header">
              <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80" alt="User Avatar" class="post-avatar">
              <div class="post-user-info">
                  <h3>Seershan Mitra</h3>
                  <p>JSPM University | Student</p>
              </div>
          </div>
      `

    let postImage = ""
    if (imageFile) {
      const imageUrl = URL.createObjectURL(imageFile)
      const aspectRatioPromise = getAspectRatio(imageFile)
      aspectRatioPromise.then((aspectRatio) => {
        postImage = `<img src="${imageUrl}" alt="Post image" class="post-image ${aspectRatio}">`
        appendPostContent()
      })
    } else {
      appendPostContent()
    }

    function appendPostContent() {
      const postContent = `
              <div class="post-content">
                  <p>${content}</p>
                  ${postImage}
              </div>
              <div class="post-actions">
                  <button class="post-action like-btn"><i class="fas fa-heart"></i> Like <span class="like-count">${likes}</span></button>
                  <button class="post-action comment-btn"><i class="fas fa-comment"></i> Comment</button>
                  <button class="post-action share-btn"><i class="fas fa-share"></i> Share</button>
              </div>
              <div class="comments-section" style="display: none;">
                  <div class="comments-list">
                      ${comments
                        .map(
                          (comment) => `
                          <div class="comment">
                              <img src="${comment.avatar}" alt="${comment.user}" class="comment-avatar">
                              <div class="comment-content">
                                  <h4>${comment.user}</h4>
                                  <p>${comment.content}</p>
                              </div>
                          </div>
                      `,
                        )
                        .join("")}
                  </div>
                  <form class="comment-form">
                      <input type="text" placeholder="Write a comment..." required>
                      <button type="submit">Post</button>
                  </form>
              </div>
          `

      post.innerHTML = postHeader + postContent
      postsContainer.prepend(post)

      addPostEventListeners(post)
    }
  }

  function getAspectRatio(file) {
    return new Promise((resolve) => {
      const img = new Image()
      img.onload = function () {
        const width = this.width
        const height = this.height
        const ratio = width / height

        if (Math.abs(ratio - 1) < 0.1) {
          resolve("aspect-ratio-1-1")
        } else if (Math.abs(ratio - 0.8) < 0.1) {
          resolve("aspect-ratio-4-5")
        } else if (Math.abs(ratio - 1.78) < 0.1) {
          resolve("aspect-ratio-16-9")
        } else {
          resolve("")
        }
      }
      img.src = URL.createObjectURL(file)
    })
  }

  function addPostEventListeners(post) {
    const likeBtn = post.querySelector(".like-btn")
    const commentBtn = post.querySelector(".comment-btn")
    const shareBtn = post.querySelector(".share-btn")
    const commentsSection = post.querySelector(".comments-section")
    const commentForm = post.querySelector(".comment-form")

    likeBtn.addEventListener("click", () => {
      likeBtn.classList.toggle("liked")
      const likeCount = likeBtn.querySelector(".like-count")
      const count = Number.parseInt(likeCount.textContent)
      if (likeBtn.classList.contains("liked")) {
        likeCount.textContent = count + 1
      } else {
        likeCount.textContent = count - 1
      }
    })

    commentBtn.addEventListener("click", () => {
      commentsSection.style.display = commentsSection.style.display === "none" ? "block" : "none"
    })

    commentForm.addEventListener("submit", (e) => {
      e.preventDefault()
      const input = commentForm.querySelector("input")
      const commentContent = input.value.trim()
      if (commentContent) {
        const newComment = `
                  <div class="comment">
                      <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80" alt="Your Avatar" class="comment-avatar">
                      <div class="comment-content">
                          <h4>You</h4>
                          <p>${commentContent}</p>
                      </div>
                  </div>
              `
        post.querySelector(".comments-list").insertAdjacentHTML("beforeend", newComment)
        input.value = ""
      }
    })

    shareBtn.addEventListener("click", () => {
      alert("Sharing functionality to be implemented")
    })
  }

  // Load initial posts
  const initialPosts = [
    {
      user: "Jane Smith",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
      university: "MIT | Alumni",
      content: "Just finished an amazing project! Excited to share the results soon.",
      image:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80",
      aspectRatio: "aspect-ratio-16-9",
      likes: 42,
      comments: [
        {
          user: "Alex Chen",
          avatar:
            "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
          content: "Looks like a productive session! Can't wait to hear more about it.",
        },
      ],
    },
    {
      user: "Michael Lee",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
      university: "Stanford | Student",
      content: "Looking for internship opportunities in tech. Any leads?",
      image: null,
      likes: 15,
      comments: [],
    },
    {
      user: "Emily Watson",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      university: "Harvard | Alumni",
      content: "Just published my research on AI ethics. Check it out!",
      image:
        "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      aspectRatio: "aspect-ratio-16-9",
      likes: 89,
      comments: [
        {
          user: "David Brown",
          avatar:
            "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
          content: "Fascinating read! Congrats on the publication.",
        },
      ],
    },
    {
      user: "Sophia Rodriguez",
      avatar:
        "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
      university: "Yale | Student",
      content: "Organizing a virtual alumni meetup next month. Who's in?",
      image: null,
      likes: 32,
      comments: [],
    },
    {
      user: "Daniel Kim",
      avatar:
        "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      university: "UC Berkeley | Alumni",
      content: "Just launched my startup! Excited for this new journey.",
      image:
        "https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      aspectRatio: "aspect-ratio-4-5",
      likes: 120,
      comments: [
        {
          user: "Sarah Johnson",
          avatar:
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
          content: "Congratulations! Wishing you all the best.",
        },
        {
          user: "Mike Chen",
          avatar:
            "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
          content: "That's awesome! Let me know if you need any advice.",
        },
      ],
    },
    {
      user: "Alex Thompson",
      avatar:
        "https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      university: "Columbia | Student",
      content: "Just finished my thesis! Time to celebrate!",
      image:
        "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      aspectRatio: "aspect-ratio-16-9",
      likes: 75,
      comments: [],
    },
    {
      user: "Olivia Martinez",
      avatar:
        "https://images.unsplash.com/photo-1619895862022-09114b41f16f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      university: "Princeton | Alumni",
      content: "Excited to announce my new position as lead researcher at Tech Innovations Inc!",
      image:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      aspectRatio: "aspect-ratio-4-5",
      likes: 132,
      comments: [
        {
          user: "Emma Wilson",
          avatar:
            "https://images.unsplash.com/photo-1619895862022-09114b41f16f?ixlib=rb-4.0.3&ixid=M3wxMjAavatar:'https://images.unsplash.com/photo-1619895862022-09114b41f16f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
          content: "Congratulations! You'll do great things there!",
        },
      ],
    },
    {
      user: "Ryan Patel",
      avatar:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      university: "Duke | Student",
      content: "Who's up for a study group this weekend? We can review for the upcoming exams together!",
      image: null,
      likes: 28,
      comments: [],
    },
    {
      user: "Aisha Patel",
      avatar:
        "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
      university: "Cornell | Alumni",
      content: "Just got back from an amazing alumni networking event. It's incredible to see how far we've all come!",
      image:
        "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80",
      aspectRatio: "aspect-ratio-16-9",
      likes: 95,
      comments: [
        {
          user: "Tom Harris",
          avatar:
            "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
          content: "Wish I could have been there! Looking forward to the next one.",
        },
      ],
    },
  ]

  initialPosts.forEach((post) => {
    createInitialPost(post)
  })

  function createInitialPost(postData) {
    const post = document.createElement("div")
    post.className = "post"

    const postHeader = `
          <div class="post-header">
              <img src="${postData.avatar}" alt="${postData.user}" class="post-avatar">
              <div class="post-user-info">
                  <h3>${postData.user}</h3>
                  <p>${postData.university}</p>
              </div>
          </div>
      `

    let postImage = ""
    if (postData.image) {
      postImage = `<img src="${postData.image}" alt="Post image" class="post-image ${postData.aspectRatio}">`
    }

    const postContent = `
          <div class="post-content">
              <p>${postData.content}</p>
              ${postImage}
          </div>
          <div class="post-actions">
              <button class="post-action like-btn"><i class="fas fa-heart"></i> Like <span class="like-count">${postData.likes}</span></button>
              <button class="post-action comment-btn"><i class="fas fa-comment"></i> Comment</button>
              <button class="post-action share-btn"><i class="fas fa-share"></i> Share</button>
          </div>
          <div class="comments-section" style="display: none;">
              <div class="comments-list">
                  ${postData.comments
                    .map(
                      (comment) => `
                      <div class="comment">
                          <img src="${comment.avatar}" alt="${comment.user}" class="comment-avatar">
                          <div class="comment-content">
                              <h4>${comment.user}</h4>
                              <p>${comment.content}</p>
                          </div>
                      </div>
                  `,
                    )
                    .join("")}
              </div>
              <form class="comment-form">
                  <input type="text" placeholder="Write a comment..." required>
                  <button type="submit">Post</button>
              </form>
          </div>
      `

    post.innerHTML = postHeader + postContent
    postsContainer.appendChild(post)

    addPostEventListeners(post)
  }
})


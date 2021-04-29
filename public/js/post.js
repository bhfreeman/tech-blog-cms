const submitPost = document.querySelector("#createPost");


const addPostHandler = async (event) => {
    event.preventDefault();
    
    const postTitle = document.querySelector("#postTitle").value;
    const postText = document.querySelector("#postText").value;

  if (postText && postTitle) {
    const response = await fetch("/user/post", {
      method: "POST",
      body: JSON.stringify({ postTitle, postText }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      window.location.reload();
    }
  }
};

submitPost.addEventListener("click", addPostHandler);
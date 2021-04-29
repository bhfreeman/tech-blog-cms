const newCommentButton = document.querySelector("#newCommentBtn");
const commentForm = document.querySelector("#commentForm");
const submitComment = document.querySelector("#submitComment");

function displayForm() {

  commentForm.style.display = "block";
}

const addCommentHandler = async (event) => {
  event.preventDefault();

  const url = window.location.href.split("/");
  const post_id = url[url.length - 1];
  const text = document.querySelector("#commentText").value;
  if (text) {
    const response = await fetch("/user/comment", {
      method: "POST",
      body: JSON.stringify({ text, post_id }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      window.location.reload();
    }
  }
};
newCommentButton.addEventListener("click", displayForm);
submitComment.addEventListener("click", addCommentHandler);


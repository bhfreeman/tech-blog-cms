const submitPost = document.querySelector("#createPost");
const updateForm = document.querySelector("#updateForm")
const updatePostBtn = document.querySelectorAll(".updatePostBtn")
const submitUpdateBtn = document.querySelectorAll(".submitUpdate")
const deletePostBtn = document.querySelectorAll('.deletePost')

updatePostBtn.forEach( (btn) => {
  btn.onclick = function(){
      let element = btn.parentElement.parentElement.parentElement;
      let fieldElement = element.lastElementChild
      // console.log(fieldElement)
      fieldElement.style.display = "block";
  }
})

submitUpdateBtn.forEach((btn) => {
  btn.onclick = async function() {
    let element = btn.parentElement.parentElement.children
    let text_field = element[1].children[3]
    let title_field = element[1].children[1]
    const update_text = text_field.value
    const update_title = title_field.value
    const post_id = btn.parentElement.parentElement.parentElement.firstElementChild.id

    
    if(update_text && update_title){

        await fetch(`/user/post/${post_id}`, {
            method: 'PUT',
            body: JSON.stringify({
                update_title,
                update_text,
            }),
            headers: {
                "Content-Type": "application/json"
            }
        });
      } else{
        alert("Must have both post text and title")
      }
      // window.location.replace()
      history.go(0)
}
})

deletePostBtn.forEach((btn) => {
  btn.onclick = async function() {
  const post_id = btn.parentElement.parentElement.parentElement.children[2].firstElementChild.id
  await fetch(`/user/post/${post_id}`, {
    method: 'DELETE',
    headers: {
        "Content-Type": "application/json"
    }
});
location.reload()
  }
})

function displayForm() {
  updateForm.style.display = "block";
}

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
// updatePostBtn.addEventListener("click", displayForm)
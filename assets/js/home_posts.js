{
    // method to submit the form data for new post using ajax
    let createPost = () => {
        let newPostForm = $('#new-post-form');
        // to prevent the auto submission of the form
        newPostForm.submit(function(e) {
            e.preventDefault();
            $.ajax({
                type: 'post',
                url: '/posts/create',
                // converts the form data into json
                data: newPostForm.serialize(), 
                success: function(data) {
                    // we will receive some data
                    let newPost = newPostDom(data.data.post);
                    $('#posts-list-container>ul').prepend(newPost);
                },
                error: function(error){
                    console.log(error.responseText);
                }
            });
        });
    }

    createPost();

    // method to create a post in DOM
    let newPostDom = (post) => {
        // backticks to interpolate strings ES6 feature
        return $(`<li id="post-${post._id}">
        <p>
            <small>
                <a class="delete-post-button" href="/posts/destroy/${post.id}">Delete </a>
            </small>
                ${post.content}
            <br>
            <small>
                ${post.user.name}
            </small>
        </p>
        <div class="post-comments">
            <form action="/comment/create" method="POST">
                <input type="text" name="content" placeholder="Type here to add comment..." required>
                <input type="hidden" name="post" value="${post._id}">
                <input type="submit" value="Add Comment">
            </form>
            <div class="post-comments-list">
                <ul id="post-comments-${post._id}">
                </ul>
            </div>
        </div>
    </li>`);
    }
}
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
                    $('#new-post-form textarea').val('');
                    let newPost = newPostDom(data.data.post, data.data.user.name);
                    $('#posts-list-container>ul').prepend(newPost);
                    deletePost($(' .delete-post-button', newPost));
                },
                error: function(error){
                    console.log(error.responseText);
                }
            });
        });
    }

    // method to create a post in DOM
    let newPostDom = (post, userName) => {
        // backticks to interpolate strings ES6 feature
        return $(`<li id="post-${post._id}">
        <p>
            <small>
                <a class="delete-post-button" href="/posts/destroy/${post._id}">Delete </a>
            </small>
                ${post.content}
            <br>
            <small>
                ${userName}
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

    // method to delete a post from dom

    let deletePost = (deleteLink) => {
        $(deleteLink).click(function(e) {
            e.preventDefault();
            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data) {
                    $(`#post-${data.data.post_id}`).remove();
                }, 
                error: function(error) {
                    console.log(error.responseText);
                }
            });
        });
    }

    createPost();
}
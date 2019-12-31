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
                    console.log(data);
                },
                error: function(error){
                    console.log(error.responseText);
                }
            });
        });
    }

    createPost();
    
    // method to create a post in DOM
}
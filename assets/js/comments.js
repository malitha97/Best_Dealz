$(document).ready(function () {
    let isUserLoggedIn = JSON.parse(localStorage.getItem('isUserLoggedIn'));
    const cur_user = JSON.parse(localStorage.getItem('loggedUser'));

    $.getJSON('../assets/json/user-credentials.json', function (user_credentials) {
        localStorage.setItem('user_credentials', JSON.stringify(user_credentials.items));

        let reg_users = JSON.parse(localStorage.getItem('user_credentials'));
        let commentsItems = JSON.parse(localStorage.getItem('comments'));
        if (isNullOrUndefinedOrEmpty(commentsItems) || commentsItems.length === 0){
            $.getJSON('../assets/json/comments.json', function (comments) {
                localStorage.setItem('comments', JSON.stringify(comments.items));
                handleComment(comments.items, reg_users);
            });
        } else {
            handleComment(commentsItems, reg_users);
        }
    });

    const handleComment = (commentsItems, reg_users) => {
        commentsItems = JSON.parse(localStorage.getItem('comments'));
        let current_product = parseInt($('.comments-container').attr('id'));
        let item_comments = commentsItems.filter(function (item){
            return item.product_id === current_product;
        })
        let main_comments = item_comments.filter(function (item){
            return item.parent_comment === null;
        })
        let replies = item_comments.filter(function (item){
            return item.parent_comment !== null;
        })


        let comments_content = ``;
        for (let i = 0; i < main_comments.length; i++) {
            let main_comment_user = reg_users.filter(function (item){
                return parseInt(item.user_id) === main_comments[i].user_id;
            })

            comments_content += `<div class="comment-container" id="${main_comments[i].comment_id}">
            <div class="main-comment">
                <img src=../${main_comment_user[0].image} class="user-image-main">
                <div class="comment-details">
                    <p class="commented-user">${main_comment_user[0].name}</p>
                    <p class="comment">${main_comments[i].comment}</p>
                </div>`;

            let replies_on_comment = null;
            if (!isNullOrUndefinedOrEmpty(replies) && replies.length !== 0){
                replies_on_comment = replies.filter(function (item){
                    return item.parent_comment === main_comments[i].comment_id;
                })
            }

            if (!isNullOrUndefinedOrEmpty(replies_on_comment) && replies_on_comment.length !== 0){
                comments_content += `<div class="comment-options">
                    <div class="comment-review">
                        <i class="fa fa-thumbs-up"></i>
                        <i class="fa fa-thumbs-down"></i>
                    </div>
                    <div class="add-reply" >REPLY</div>
                    <div class="view-reply">
                        <p>View Reply<p>
                        <i class="fa fa-caret-down"></i>
                    </div>
                    <div class="hide-reply">
                        <p>Hide Reply<p>
                        <i class="fa fa-caret-up"></i>
                    </div>
                </div>
            </div>`
            }else{
                comments_content += `<div class="comment-options">
                    <div class="comment-review">
                        <i class="fa fa-thumbs-up"></i>
                        <i class="fa fa-thumbs-down"></i>
                    </div>
                    <div class="add-reply">REPLY</div>
                    <div class="view-reply" style="visibility : hidden">
                        <p>View Reply<p>
                        <i class="fa fa-caret-down"></i>
                    </div>
                    <div class="hide-reply" style="visibility : hidden">
                        <p>Hide Reply<p>
                        <i class="fa fa-caret-up"></i>
                    </div>
                </div>
            </div>`
            }

            if (!isNullOrUndefinedOrEmpty(replies_on_comment) && replies_on_comment.length !== 0){
                comments_content += `<div class="comment-reply-container">`;
                for (let j =0; j < replies_on_comment.length; j++){
                    let replied_user = reg_users.filter(function (item){
                        return parseInt(item.user_id) === replies_on_comment[j].user_id;
                    });
                    comments_content += `<div class="comment-reply">
                    <img src=../${replied_user[0].image} class="user-image-sub">
                    <div class="reply-details">
                        <p class="replied-user">${replied_user[0].name}</p>
                        <p class="reply">${replies_on_comment[j].comment}</p>
                    </div>
                </div>`;
                }
                comments_content += `</div></div>`;
            }
            comments_content += `</div>`;
        }

        $('.comments-section').html(comments_content);

        $('.comments-section').on('click', '.fa-thumbs-up', function () {
            let element = $(this).parents().eq(2);
            let thumb_up = element.find('.fa-thumbs-up');
            let thumb_down = element.find('.fa-thumbs-down')
            if (String(thumb_up.css('color')) === 'rgb(124, 123, 123)'){
                thumb_up.css({'color': '#7F187F'});
                thumb_down.css({'color': '#7C7B7B'});
            }else if (String(thumb_up.css('color')) === 'rgb(127, 24, 127)'){
                thumb_up.css({'color': '#7C7B7B'});
            }
        });

        $('.comments-section').on('click', '.fa-thumbs-down', function () {
            let element = $(this).parents().eq(2);
            let thumb_up = element.find('.fa-thumbs-up');
            let thumb_down = element.find('.fa-thumbs-down')
            if (String(thumb_down.css('color')) === 'rgb(124, 123, 123)'){
                thumb_down.css({'color': '#7F187F'});
                thumb_up.css({'color': '#7C7B7B'});
            }else if (String(thumb_down.css('color')) === 'rgb(127, 24, 127)'){
                thumb_down.css({'color': '#7C7B7B'});
            }
        });


        function switchColors(thumd_up, thumb_down){

        }

        $('.comments-section').on('click', '.view-reply', function () {
            let element = $(this).parents().eq(2);
            element.find('.comment-reply-container').css({'display': 'grid'});
            element.find('.view-reply').css({'display': 'none'});
            element.find('.hide-reply').css({'display': 'grid'});
        });

        $('.hide-reply ').on('click', function () {
            let element = $(this).parents().eq(2);
            element.find('.comment-reply-container').css({'display': 'none'});
            element.find('.hide-reply').css({'display': 'none'});
            element.find('.view-reply').css({'display': 'grid'});
        });

        $('.add-comment-section-iphone').on('click', function () {
            if (isUserLoggedIn === true){
                let id = $('.comments-container').attr('id');
                $('.add-comment-modal').css({'display': 'grid'});
            }else{
                window.location.href = 'http://localhost:63342/best-dealz/login.html';
            }
        });

        $('.add-comment-modal-close').on('click', function () {
            $('.add-comment-modal').css({'display': 'none'});
        });

        $('.add-reply').on('click', function () {
            if (isUserLoggedIn === true){
                let id = $(this).parents().eq(2).attr('id');
                $('.add-reply-modal').css({'display': 'grid'});
                let main_comment = commentsItems.filter(function (item) {
                    return item.comment_id === parseInt(id);
                });
                let main_comment_user = reg_users.filter(function (item){
                    return parseInt(item.user_id) === main_comment[0].user_id;
                });
                $('.add-reply-parent-comment').attr("id",main_comment[0].comment_id)
                $('.user-add-reply-image-main').attr("src",'../'+main_comment_user[0].image)
                $('.add-reply-parent-comment .commented-user').html(main_comment_user[0].name) ;
                $('.add-reply-parent-comment .comment').html(main_comment[0].comment);
            }else{
                window.location.href = 'http://localhost:63342/best-dealz/login.html';
            }

        });

        $('.add-reply-modal-close').on('click', function () {
            $('.add-reply-modal').css({'display': 'none'});
        });


        $('.add-comment-modal-btn').on('click', function () {
            let comment_text = $("#add-comment-modal-input").val();
            if (comment_text !== "" && comment_text !== null){
                let product_id = $('.comments-container').attr('id');
                let commented_user = cur_user.user_id;
                let parent_comment = null;
                addComment(product_id, commented_user, parent_comment, comment_text, commentsItems);
                $("#add-comment-modal-input").attr('placeholder', 'Write your comment...')
            }
            location.reload();
        });

        $('.add-comment-btn').on('click', function () {
            if (isUserLoggedIn === true){
                let comment_text = $("#add-comment-input").val();
                if (comment_text !== "" && comment_text !== null){
                    let product_id = $('.comments-container').attr('id');
                    let commented_user = cur_user.user_id;
                    let parent_comment = null;
                    addComment(product_id, commented_user, parent_comment, comment_text, commentsItems);
                    $("#add-comment-input").attr('placeholder', 'Write your comment...')
                }
                location.reload();
            }else{
                window.location.href = 'http://localhost:63342/best-dealz/login.html';
            }

        });

        $('.add-reply-btn').on('click', function () {
            let reply_text = $("#add-reply-input").val();
            if (reply_text !== "" && reply_text !== null){
                let product_id = $('.comments-container').attr('id');
                let commented_user = cur_user.user_id;
                let parent_comment = $('.add-reply-parent-comment').attr('id');
                addComment(product_id, commented_user, parent_comment, reply_text, commentsItems);
                $("#add-reply-input").attr('placeholder', 'Write your reply...')
            }
            location.reload();
        });

        /*oninput functions*/
        $('.add-comment-modal-input').on('input',function(){
            if ($(this).val() !== ''){
                $('.add-comment-modal-btn').removeClass('button-disabled').attr('disabled', false);
                $('.add-comment-modal-input').css({'border-bottom': 'solid 2px rgba(127, 24, 127, 0.5)'})
            }else if ($(this).val() === ''){
                $('.add-comment-modal-btn').addClass('button-disabled').attr('disabled', true);
                $('.add-comment-modal-input').css({'border-bottom': 'solid 2px rgba(124, 123, 123, 0.5)'})
            }
        });


        $('.add-reply-input').on('input',function(){
            if ($(this).val() !== ''){
                $('.add-reply-btn').removeClass('button-disabled').attr('disabled', false);
                $('.add-reply-input').css({'border-bottom': 'solid 2px rgba(127, 24, 127, 0.5)'})
            }else if ($(this).val() === ''){
                $('.add-reply-btn').addClass('button-disabled').attr('disabled', true);
                $('.add-reply-input').css({'border-bottom': 'solid 2px rgba(124, 123, 123, 0.5)'})
            }
        });


        $('.add-comment-input').on('input',function(){
            if ($(this).val() !== ''){
                $('.add-comment-btn').removeClass('button-disabled').attr('disabled', false);
                $('.add-comment-input').css({'border-bottom': 'solid 2px rgba(127, 24, 127, 0.5)'})
            }else if ($(this).val() === ''){
                $('.add-comment-btn').addClass('button-disabled').attr('disabled', true);
                $('.add-comment-input').css({'border-bottom': 'solid 2px rgba(124, 123, 123, 0.5)'})
            }
        });
    };

});
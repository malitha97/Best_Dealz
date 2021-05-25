let loggedInStatus = JSON.parse(localStorage.getItem('isUserLoggedIn'));
if (isNullOrUndefinedOrEmpty(loggedInStatus) || loggedInStatus === false) {
    window.location.href = 'http://localhost:63342/best-dealz/login.html';
}

$(document).ready(function () {
    let isQuizResultsAvailable = JSON.parse(sessionStorage.getItem('isQuizResultsAvailable') || false);
    let quizResults = JSON.parse(localStorage.getItem('quizResults'));

    if (isQuizResultsAvailable) {
        let result = `${quizResults.correctCount}/${quizResults.questionCount}`;
        let storeCredits = quizResults.storeCredits;

        $('.result-score').text(result);
        $('.store-credit').text(storeCredits);

        sessionStorage.setItem('isQuizResultsAvailable','false')
    } else {
        let emptyContent = "<i class='fa fa-frown-o empty-icon'></i><div class='result-empty'>Your quiz results are empty</div>";
        $('.result-container').html(emptyContent).css({'display': 'flex', 'flex-direction': 'column', 'align-items': 'center', 'justify-content': 'center'});
    }
    $('.result-next-btn').on('click',function () {
        $(location).attr('href', './homepage.html');
    });

});

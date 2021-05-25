let max_quesitons = 5;
let max_choices = 3;
let local_questions = "";
let leaderBoardList = "";
let users = "";
$(document).ready(function () {
    if (isLoggedIn()) {
        const handleQuiz = (users, leaderBoardList) => {
            $.getJSON('assets/json/question-list.json', function (questions) {
                local_questions = questions;
                let questionList = ""

                for (let i = 0; i < max_quesitons; i++) {

                    questionList += `<div class="outer-box-div">
            <div class="question-number">
                Question  ${parseInt(i) + 1}
            </div>
            <div class="question-content">
                ${questions.items[i].question_description}
            </div>

            <div class="question-choices">
                <div class="select div-shadow">
                    <select class="select-target-class" name="slct" id="slct_${i}">`;

                    let options = `<option value=0 selected disabled>Choose an option</option>`;

                    for (let k = 0; k < max_choices; k++) {
                        options += `<option value=${k + 1}>${questions.items[i].question_choice[k]}</option>`
                    }

                    questionList += options + `</select>
                                </div>
                            </div>
                        </div>`;
                }
                ;

                $('.grid-items').html(questionList);
            });

            $('.reset-btn').on('click', function () {

                for (let i = 0; i < max_quesitons; i++) {
                    let id = '#slct_' + i;
                    $(id).prop('selectedIndex', 0);
                }
                $(window).scrollTop(0);
            });

            $('.submit-btn').on('click', function () {

                let totalCorrect = 0;

                for (let i = 0; i < max_quesitons; i++) {
                    let id = '#slct_' + i;

                    let conceptName = $(id).find(":selected").text();

                    if ($(id).find(":selected").text() === local_questions.items[i].question_answer) {
                        totalCorrect++;
                    }
                }
                let scoredPoints = totalCorrect * 2;

                if (userHasHistory() < 0) {
                    addUserToLocalLeader()
                }

                let currentHighScore = leaderBoardList[getLoggedUserHighScore(leaderBoardList)].high_score;

                if (scoredPoints > currentHighScore) {
                    leaderBoardList[getLoggedUserHighScore(leaderBoardList)].high_score = scoredPoints;
                    localStorage.setItem('players', JSON.stringify(leaderBoardList));
                    leaderBoardList = JSON.parse(localStorage.getItem('players'));
                }

                let quizResults={};
                let isQuizResultsAvailable = 'true';

                quizResults.correctCount=totalCorrect;
                quizResults.questionCount=5;
                quizResults.storeCredits=scoredPoints;

                localStorage.setItem('quizResults', JSON.stringify(quizResults));
                sessionStorage.setItem('isQuizResultsAvailable', JSON.stringify(isQuizResultsAvailable));

                $(location).attr('href', './gamification-result.html');
            });
        };

        if (isNullOrUndefinedOrEmpty(localStorage.getItem('users'))) {
            $.getJSON('assets/json/user-credentials.json', function (users) {
                localStorage.setItem('users', JSON.stringify(users.items));

                if (isNullOrUndefinedOrEmpty(localStorage.getItem('players'))) {
                    $.getJSON('assets/json/leaderboard-scores.json', function (players) {
                        localStorage.setItem('players', JSON.stringify(players.items));
                        handleQuiz(users.items, players.items);
                    });
                } else {
                    leaderBoardList = JSON.parse(localStorage.getItem('players'));
                    handleQuiz(users.items, leaderBoardList);
                }
            });
        } else {
            users = JSON.parse(localStorage.getItem('users'));
            if (isNullOrUndefinedOrEmpty(localStorage.getItem('players'))) {
                $.getJSON('assets/json/leaderboard-scores.json', function (players) {
                    localStorage.setItem('players', JSON.stringify(players.items));
                    handleQuiz(users, players.items);
                });
            } else {
                leaderBoardList = JSON.parse(localStorage.getItem('players'));
                handleQuiz(users, leaderBoardList);
            }
        }
    } else {
        $(location).attr('href', './login.html');
    }

});

const userHasHistory = () => {
    for (let i in leaderBoardList) {
        if (leaderBoardList[i].user_id === localStorage.getItem('loggedUser')) {
            return parseInt(i);
        }
    }
    return -1;
};
const addUserToLocalLeader = () => {
    for (let i in users) {
        if (users[i].user_id === JSON.parse(localStorage.getItem('loggedUser')).user_id) {
            let username = users[i].email;
            let user_id = users[i].user_id;
            let name = users[i].name;
            let high_score = 0;
            let image = users[i].image;

            leaderBoardList.push({"username": username,"user_id":user_id,"name":name,"high_score":high_score,"image":image})
            localStorage.setItem('players', JSON.stringify(leaderBoardList));
            leaderBoardList = JSON.parse(localStorage.getItem('players'));


        }
    }
};

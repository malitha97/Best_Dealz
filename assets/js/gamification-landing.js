
let leaderboard = JSON.parse(localStorage.getItem('leader_board'));
let border_color = ["#D4AF37", "#C0C0C0", "#CD7F32","black","black","black"];
let leaderBoardList = "";

$(document).ready(function () {
    const handleLeaderBoard = (leaderBoardList) => {
        let leaderBoardContent ="";

        for (let i in leaderBoardList) {
            if(i === '5'){
                break;
            }

            leaderBoardContent += `<div class="leaderboard-single-block">
                        <div class="div-single-block-number div-row-1">
                            ${parseInt(i)+1}
                        </div>`;
            let subBlock="";
            if (i==='0'){
                subBlock+= `<div class="div-single-block-image center first-place">
                            
                            <img src="${leaderBoardList[i].image}" >
                        </div>`
            } else if (i==='1'){
                subBlock+= `<div class="div-single-block-image center second-place">
                            
                            <img src="${leaderBoardList[i].image}" >
                        </div>`
            }else if (i==='2'){
                subBlock+= `<div class="div-single-block-image center third-place">
                            
                            <img src="${leaderBoardList[i].image}" >
                        </div>`

            }else{
                subBlock+= `<div class="div-single-block-image center">
                           
                            <img src="${leaderBoardList[i].image}" >
                        </div>`

            }

            leaderBoardContent+=subBlock+`
                        <div class="div-single-block-text div-row-1">
                            <div>
                                ${leaderBoardList[i].name}
                            </div>
                            <div class="leader-points-user">
                               <span class="leader-points-user-span">${leaderBoardList[i].high_score}</span> Points
                            </div>
                        </div>
                    </div>`

        }

        $('.leaderboard-main-container').html(leaderBoardContent);

        $('.quiz-btn').on('click', function () {

            if (isLoggedIn()){
                $('.conditions-modal').css({'display': 'flex'});
            } else{
                $(location).attr('href', './login.html');
            }
        });

        $('.conditions-modal-container .close-modal').on('click', function () {
            $('.conditions-modal').css({'display': 'none'});
        });

        $('.primary-button-unfilled').on('click', function () {
            $('.conditions-modal').css({'display': 'none'});
        });
        $('.start-btn').on('click', function () {

            if (isLoggedIn()){
                $(location).attr('href', './gamification-quiz-page.html');
            } else{
                $(location).attr('href', './login.html');
            }
        });
        let user_score = getLoggedUserHighScore(leaderBoardList)

        let myScore = 0;
        if (user_score > -1) {
            myScore = leaderBoardList[user_score].high_score;
        }

        let user_score_html = `<div class="center">
                                    <p>YOUR HIGH SCORE : <span id="user-high-score">${myScore}</span></p>
                               </div>`;

        $('.user-score').html(user_score_html);
    };

    //take from local storage
    if (isNullOrUndefinedOrEmpty(localStorage.getItem('players'))) {
        $.getJSON('assets/json/leaderboard-scores.json', function (players) {
            localStorage.setItem('players', JSON.stringify(players.items.sort(function (a, b) {
                return b.high_score - a.high_score
            })));

            leaderBoardList = players.items.sort(function (a, b) {
                return b.high_score - a.high_score
            });
            handleLeaderBoard(leaderBoardList);
        });
    } else {
        leaderBoardList = JSON.parse(localStorage.getItem('players')).sort(function (a, b) {
            return b.high_score - a.high_score
        });
        handleLeaderBoard(leaderBoardList);
    }
});

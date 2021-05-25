const generateRatingSection = (rating) => {
    let starContent = '';
    starContent += Array(Math.floor(rating)).fill(`<i class="fa fa-star"></i>`);
    starContent += (rating) - Math.floor(rating) === 0 ? ('') : (`<i class="fa fa-star-half-o"></i>`);
    let splitContent = starContent.split(`</i>`);
    let starCount = splitContent.length - 1;
    for (let i = 0; i < (5 - starCount); i++) {
        starContent += `<i class="fa fa-star-o"></i>`;
    }
    return starContent;
};

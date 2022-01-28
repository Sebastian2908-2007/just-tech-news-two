module.exports = {
    // this function will format our date to a morer readable format
    format_date: date => {
        return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(
            date 
        ).getFullYear()}`;
    },
    // this function will make it so we no longer need to use lazy pluralazation
    format_plural: (word,amount) => {
        if(amount !== 1) {
         return `${word}'s`;
        }
        return word;
    },
    // this function will simplify url's
    format_url:url => {
        return url
        .replace('http://','')
        .replace('https://','')
        .replace('www.', '')
        .split('/')[0]
        .split('?')[0];
    }
}
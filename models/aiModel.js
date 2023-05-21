function queryTags(images){
    console.log(images);
    fetch('https://www.nyckel.com/v1/functions/b2a5oliheud0po9y/invoke', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: images
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
        return data
    });
}

module.exports = {queryTags, toDataURL}
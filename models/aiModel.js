function toDataURL(src, callback){
    var image = new Image();
    image.crossOrigin = 'Anonymous';
    image.onload = function(){
       var canvas = document.createElement('canvas');
       var context = canvas.getContext('2d');
       canvas.height = this.naturalHeight;
       canvas.width = this.naturalWidth;
       context.drawImage(this, 0, 0);
       var dataURL = canvas.toDataURL('image/jpeg');
       callback(dataURL);
    };
    image.src = src;
}
function queryTags(images){
    console.log(images);
    fetch('https://www.nyckel.com/v1/functions/b2a5oliheud0po9y/invoke', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: toDataURL(images, function(dataURL){
            return dataURL
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
        return data
    });
}

module.exports = {queryTags, toDataURL}
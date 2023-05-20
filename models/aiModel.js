fetch('https://www.nyckel.com/v1/functions/<functionId>/invoke', {
    method: 'POST',
    headers: {
        'Authorization': 'Bearer ' + '<accessToken>',
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(
        {"data":{"field_76jk77g59vawcoz8":"John","field_b2jpqb1r2fsfs2s9":"Doe"}}
    )
})
.then(response => response.json())
.then(data => console.log(data));
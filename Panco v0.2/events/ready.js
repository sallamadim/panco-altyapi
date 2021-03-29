module.exports = async(client) => {
    var random = [
        "Web page: https://panco.glitch.me/home-page.html",
        "Ping for see the prefixes!",
        "To see commands type: panco help",
        "Not done yet!"
    ]
    setInterval(function() {
        var random1 = Math.floor(Math.random()*(random.length-0+1)+0);
        client.user.setActivity(random[random1], { type: 'PLAYING' });

    }, 3*2000)
}
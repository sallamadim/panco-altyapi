# Panco altyapı by sallamadım#0001

Merhabalar ben Mehmethan şahsen (sallamadım) panco altyapıyı sizler için paylaşıyorum. Ne zaman güncelliyceğim söz konusu değil. Bir bakarsınız bir daha hiç güncellemem :).
Neyse asıl konumuza gelelim; 

# Sıkça sorulan sorular;

### Bu altyapı neden farklı bir db kullanıyor quick.db hariç?

> Panco altyapıyı quick.db ile yapmak isterdim fakat, bunu kaldırıcak kadar güçlü bir db olmadığını farkettim. Ekonomi komutlarının dbnin toplam 20-30 mb yerini kaplıyor. O yüzdende quick.db kullanmayı göz ardı ettim. Bir diğer sorun ise quick.db çok fazla hata vermesi. Ama eğer kullanmak isterseniz kullanabilirsiniz. Sorun çıkarsada bunu benden bilmeyin.

### Mongodb url nasıl alabilirim?

> [Burayı okuyarak alabilirsiniz](http://devnot.com/2019/mongodb-atlas-nedir-ve-nasil-olusturulur/)

### Botu nasıl aktif edebilirim?

> Son paylaştığım altyapı kısmındaki config yerine geliniz.
Buradan **config.json** a tıklayınız.

**Config.json belirtileri;**
Anahtar | Değer
------------ | -------------
**token** | Botunuzun tokeni. (Developer kısmından bot kısmındaki intentleri açınız)
**owner** | Kendi idniz.
**mongo** | Mongodb urlniz.
**everyoneMention** | Çekiliş komutları için gerekli true/false.
**hostedBy** | true kalıcak.
**YOUTUBE_API_KEY** | Lazım değil ama genede siz bilirsiniz.

**Config.json örneği;**
```json
{
    "token":"Kendi botunuzun tokeni.",
    "owner":"755325329005871144",
    "mongo":"mongodb+srv://username:sifre@cluster0.q972g.mongodb.net/dbadi",
    "everyoneMention": false,
    "hostedBy": true,
    "YOUTUBE_API_KEY": "Sizin olması gerek."
}
```

**Config.js belirtileri;**
Anahtar | Değer
------------ | -------------
**off** | Kapalı emojisi.
**error** | Hata emojisi.
**queue** | Kuyruk emojisi.
**music** | Müzik emojisi.
**success** | Kabul emojisi.
**open** | Açık emojisi.
**yuklen** | Yüklenme emojisi.

**config.js deki filters kısmını ellemeyiniz.**

**Config.js örnek;**
```js
module.exports = {
    emojis: {
        off: "<:kapali:788340889806176298>",
        error:"<:ReddetmekPng:788369062869860382>",
        queue: "<:belge:788369061092393001>",
        music: ":musical_note:",
        success: "<:onaylandiii:788369063003947029>",
        open: "<:acik:788340881639473173>",
        yuklen: "<a:yklnm:788340539534868490>"
    },

    filters: [
        '8D', 'gate', 'haas', 'phaser', 'treble', 'tremolo', 'vibrato', 'reverse', 'karaoke', 'flanger', 'mcompand', 'pulsator', 'subboost', 'bassboost', 'vaporwave', 'nightcore', 'normalizer', 'surrounding'
    ]
}
```

### Bunların hepsini yaptım başka bir şey yapmama gerek varmı?

> Bunları yaptıysanız, son paylaştığım altyapıdaki index.js kısmında tbl apisini doldurunuz. [Almak için buraya gel](https://discord.gg/uwTtm3TG3n).

### Nasıl aktif tutarım?

> Ben aktif etmek için heroku kullandım. Siz nasıl aktif etmek isterseniz öyle aktif edebilirsiniz.


> Buraya kadar okuduğunuz (veya okumadığınız) için teşekkür ederim. Eğer bir hatanız olursa o hatayı google'a yazıp araştırıp bulabilirsiniz. İyi günler.






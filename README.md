# v13 Boş Altyapı

## Kurulum

```sh
npm i
```
yazarak botun dosyalarını indirip

```sh
npm start
```
yazarak botu başlatın.

Sonra botun bulunduğu bir sunucuda **`!kur`** yazarak slash komutlarını kurun.

Eğer slash komut eklemek istiyorsanız events/messageCreate.js de
```js
const data = [
  {
     name: "ping",
     description: "Botun pingini gösterir.",
  },
  {
    name: "komutun-adı",
    description: "komutun açıklaması"
  }
];

client.application?.commands.set(data)
```

## Destek
Bir hata olursa DC: [Tavuk Döner#7528](https://discord.com/users/729651204216455229)

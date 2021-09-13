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
yerine istediğiniz komutu yazıp botun bulunduğu bir sunucuda **`!kur`** yazarak slashları kurun.

Daha fazla bilgi: https://discordjs.guide

## Replit

Botu replitte çalıştırmak için;

İlk aşağıdaki butona tıkayarak replite aktarın.

- [![Replite aktar](https://repl.it/badge/github/TavukDoner7528/v13-Bos-Altyapi)](https://repl.it/github/TavukDoner7528/v13-Bos-Altyapi)

Sonra `Shell` kısmına gelip
```sh
npm i -D node@16.6.1
```
yazın

Bitti :D

## Destek
Bir hata olursa DC: [Tavuk Döner#7528](https://discord.com/users/729651204216455229)

<img src="https://contributors-img.web.app/image?repo=TavukDoner7528/v13-Bos-Altyapi" />

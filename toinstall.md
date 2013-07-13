# toinstall.md
[node_serial_demo](https://github.com/yutaono/node_serial_demo)のための環境構築をするメモです。OSはMacを想定しています。

## Xcode
AppleのIDEであるXcodeをインストールしてください。

[Xcode](https://developer.apple.com/xcode/)


## node.js
サーバサイドJavascript	ライブラリnode.jsをインストールしてください。

http://nodejs.org/

Homebrewの場合

```
$ brew install node
```

MacPortの場合

```
$ sudo port install nodejs
```

## npm

https://npmjs.org/

```
$ curl http://npmjs.org/install.sh | sh
```
shの前にsudoがいる場合もあるみたいです。

```
curl http://npmjs.org/install.sh | sudo sh
```


## git
[Git - Gitのインストール]
(http://git-scm.com/book/ja/%E4%BD%BF%E3%81%84%E5%A7%8B%E3%82%81%E3%82%8B-Git%E3%81%AE%E3%82%A4%E3%83%B3%E3%82%B9%E3%83%88%E3%83%BC%E3%83%AB)
(macのxcodeのcommand toolsでもインストールできます。)

初期設定

```
$ git config --global user.name "your name"
$ git config --global user.email your@ma.il
```

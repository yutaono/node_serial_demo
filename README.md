node_serial_demo
======================
This program is a demonstration for node_serialport.
 
## 実行環境

[toinstall.md](https://github.com/yutaono/node_serial_demo/blob/master/toinstall.md)にMac向けnode.jsやgit等のインストール方法をまとめました。
まずはじめにtoinstall.mdで開発環境を構築してください。

## リポジトリのクローン
作業ディレクトリ上で以下のコマンドを叩いてください。


	$ git clone git@github.com:yutaono/node_serial_demo.git


無事にクローンされればカレントディレクトリにnode_serial_demoディレクトリができています。

	$ cd node_serial_demo


## 実行

以下のコマンドで実行されます。

	$ node app.js

http://localhost:3000にアクセス。


## エラー対処

### serialportエラー


	$ node app.js

	/home/username/node_serial_demo/node_modules/serialport/node_modules/bindings/bindings.js:83
	        throw e
	              ^
	Error: /home/username/tmp/node_serial_demo/node_modules/serialport/build/Release/serialport.node: invalid ELF header


上記のエラーがでた場合、

	$ npm uninstall serialport
	$ npm install serialport

を実行してください。

### 端末の未検出エラー

	$ node app.js
	   info  - socket.io started
	Express server listening on port 3000
	err Error: Cannot open /dev/tty.usbmodemfd131

上記のエラーはArduino等の端末が見つからないときに起こります。

	$ ls /dev/tty*
または
	$ ls /dev/tty.usb*

で表示されるポート名app.jsの46行目

	var portName = '/dev/tty.usbmodemfd131';

を書き換えてください。

## 参考
[node-serialportを使ってNode.jsでArduinoと通信する - 人と技術のマッシュアップ]
(http://tomowatanabe.hatenablog.com/entry/2013/03/23/233554)

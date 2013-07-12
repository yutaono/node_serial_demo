# README
node_serial_demoのための環境構築をするメモです。OSはMacを想定しています。

## node.jsとnpmのインストール

http://nodejs.org/

Homebrewの場合

```
$ brew install node
```

MacPortの場合

```
$ sudo port install nodejs
```

Node.jsとnvmを初めてインストールするときのハマりポイントと対策 - mollifier delta blog
http://mollifier.hatenablog.com/entry/20110221/p1


## nvm

node.js はバージョンアップが早い上に module がバージョンに依存していることもあるので、ローカルマシンに1つだけバージョンが入ってるのはだんだんつらくなってきます。そこで便利なのが nvm で、簡単に node.js のバージョンをスイッチすることができます。

https://github.com/creationix/nvm

```
$ curl https://raw.github.com/creationix/nvm/master/install.sh | sh
```

とすると

```
$ nvm install 0.10
```

でインストールができて

```
$ nvm use 0.10
```

とするとインストールしたバージョンを使用することができます。このままでば毎回 ```source ~/.nvm/nvm.sh``` しなくてはいけないので ```~/.bashrc``` に


```
source ~/.nvm/nvm.sh
npm_dir=${NVM_PATH}_modules
export NODE_PATH=$npm_dir
nvm use 0.10
```

を追加するとシェルを起動したときに勝手に ```$ nvm use 0.10``` してくれるようになります。

## git

git はバージョン管理ツールです。git も OS によりますが適当な方法でインストールしましょう。Mac であれば XCode の Commandline Tools をインストールするだけで使えるようになります。最新版を使いたい場合には Homebrew からインストールしましょう。

git をインストールしたあとにまず初期設定をします。

```
$ git config --global user.name "your name"
$ git config --global user.email your@ma.il
```

git で使われる名前と Email アドレスを指定します。これでホームディレクトリに ```.gitconfig``` が生成されているはずです。

```
$ cat ~/.gitconfig
[user]
    name = your name
    email = your@ma.il
```

```

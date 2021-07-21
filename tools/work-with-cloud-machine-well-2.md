---
title: 云服务器使用指南（二）
date: 2021-07-21
categories:
  - 工具
tags:
  - team
  - linux
---

云服务器，作为我们组里面重要的资产，承载着众多提高团队协作效率的开源软件。要想成为一名合格的运维人员，免不了时不时地登录到服务器后台，进行软件的升级维护，同时对现有的软件进行配置上的更改。然而服务器自带的终端乏善可陈，无论是功能还是美观度上都让人提不起兴趣。所谓工欲善其事，必先利其器。我们有必要对 ssh 后的终端进行改造，增强其功能以提升我们的效率，美化其外观以愉悦我们的心情。

本篇是云服务器使用指南的第二篇，主要内容涵盖：

1. 切换 bash 到 zsh
2. zsh 效率插件推荐
3. zsh 美化插件推荐
4. 常用软件的介绍与安装

<!-- more -->

## 切换 bash 到 zsh

通常来说，我们通过 ssh 登录到服务器之后显示的那个命令提示行窗口所使用的 [shell](https://baike.baidu.com/item/shell/99702) 是 bash，我经常使用的 shell 是 zsh。二者在语言上的差异很小，只不过 zsh 具有更加良好的可扩展性，因而受到大家的青睐。

```bash
> cat $SHELL # 查看当前使用的 shell
/bin/bash

> cat /etc/shells # 查看当前支持的 shell
/bin/sh
/bin/bash
/usr/bin/bash
/bin/rbash
/usr/bin/rbash
/bin/dash
/usr/bin/dash
/usr/bin/tmux
/usr/bin/screen
```

通过以上两条命令，我们可以检查当前使用的 shell 以及系统支持的 shell。如果没有想要的 zsh 的话，可以使用 `sudo apt-get install zsh` 来安装，再次执行 `cat /etc/shells` 可以检查 zsh 是否安装成功。

```bash
chsh -s /bin/zsh
```

以上命令将系统默认的 shell 设置为 zsh，要想查看效果，需要先退出 ssh 并重新登录。

重新登录之后，或者首次使用 zsh 命令激活该 shell，zsh 会检查到当前用户的根目录下不存在 .zshrc 文件，进而弹出 prompt 询问如何生成该文件，选择哪个都可以，大家自己读英文选就行了。

## zsh 效率插件推荐

zsh 支持的插件挺多的，但是最常用的主要有以下几个：

- zsh-autosuggestions

  该插件主要用于历史命令的自动提示与快速补全。对于你已经使用过的命令，他会在你下次输入该命令的一部分（必须从头开始匹配）时将后续命令以提示的方式显示出来，此时按下方向键右键即可快速补全。

  ```bash
  git clone https://github.com/zsh-users/zsh-autosuggestions ~/.zsh/zsh-autosuggestions
  ```

- zsh-autocomplete

  该插件主要用于根据已有的命令部分自动补全缺失的部分，如果存在多个可选，则全部列出，用户可以通过方向键选择，回车键确认。

  ```bash
  git clone --depth 1 -- https://github.com/marlonrichert/zsh-autocomplete.git ~/.zsh/zsh-autocomplete
  ```

- zsh-syntax-highlighting

  该插件主要用于对输入的命令进行语法高亮。

  ```bash
  git clone --depth 1 -- https://github.com/zsh-users/zsh-syntax-highlighting.git ~/.zsh/zsh-syntax-highlighting
  ```

以上命令还只是将第三方插件下载到本地指定路径，要想在每次 ssh 到服务器时自动启用还需要在 `~/.zshrc` 中进行配置，大家可以将这个文件类比为 Windows 系统下开机自运行软件的配置文件，即每次启动 zsh 时都会先执行一遍该配置文件中的脚本命令。

我们通过 `vim` 命令将以下三行代码添加到 `.zshrc` 文件中。

```bash
source ~/.zsh/zsh-autosuggestions/zsh-autosuggestions.zsh
source ~/.zsh/zsh-autocomplete/zsh-autocomplete.plugin.zsh
source ~/.zsh/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh
```

## zsh 美化插件推荐

至于美化，其实就仁者见仁，智者见智了，如果你个人不喜欢花里胡哨，那么大可以跳过这一节。

如果你读到了这里，说明你对终端美化还有那么点想法，那么首先展示一下我个人的终端长这样。

![mac-iterm-oh-my-posh-profile](./assets/mac-iterm-oh-my-posh-profile.png)

无论你是否喜欢，都请先读下去，在本节的最后，我会指出如何自定义自己的终端样式。

我个人采用的终端美化插件是 [oh-my-posh](https://ohmyposh.dev/)，之所以没有采用网上最最流行的 [oh-my-zsh](https://ohmyz.sh/) 是因为我存在跨平台的需求。目前我在办公室使用的是 Windows 平台的 powershell core + Windows Terminal，在家里使用的是 Mac 平台的 zsh + ITerm，在各种云服务器上使用的是 zsh + 其他平台的终端工具，为了减少跨平台带来的割裂感，我希望能够只通过一份样式配置文件就能在不同平台的 shell 上展示一致的效果，oh-my-posh 恰恰提供了这样的功能。

安装 oh-my-posh

```bash
sudo wget https://github.com/JanDeDobbeleer/oh-my-posh/releases/latest/download/posh-linux-amd64 -O /usr/local/bin/oh-my-posh
sudo chmod +x /usr/local/bin/oh-my-posh
```

安装完成之后，你可以直接将我现在使用的[配置文件](https://gitee.com/taujiong/mac-dotfiles/blob/master/backups/Powerlevel10k.omp.json)拷贝到服务器的任意位置，这里怎么拷贝就八仙过海，各显神通了。命令流使用 `scp`，工具流使用 putty，GUI 流使用 vscode。这里假设我把配置文件拷贝到了 `~/.zsh/Powerlevel10k.omp.json`。

下一步，就是在 `.zshrc` 中启用 oh-my-posh 并配置指定的样式文件了。

```bash
eval "$(oh-my-posh --init --shell zsh --config ~/.zsh/Powerlevel10k.omp.json)"
```

完成之后，通过命令 `source ~/.zshrc` 或者重新 ssh 进入服务器就能够看到效果了。

关于样式自定义，如果你想采用 oh-my-posh，那么你就需要编写自己的 json 格式的样式配置文件，此时[官方文档](https://ohmyposh.dev/docs/)的 Configuration 和 Themes 章节就是你重点需要查阅的地方，我的配置文件可以作为参考去理解。

如果你想采用 oh-my-zsh，那么网上有大量的主题样式可供选择，我个人比较推荐 [powerlevel10k](https://github.com/romkatv/powerlevel10k)，因为它提供了十分方便的主题配置助手，在你首次应用时会提供大量的选项供你进行自助选择，实现一键生成样式主题。

## 常用软件的介绍与安装

关于常用软件，主要介绍两款，一款是用于构建大局域网的 zerotier-one，这个主要是方便我们组内的电脑相互之间的快捷连接；另一款是用于构建和部署其他应用的 Docker，这个主要是为了实现我们的服务器的可移植性，关于这一点，后面应该会有文章专门介绍，这里就不展开了。

偷个懒吧，这两款软件不想介绍了，关于怎么用大家去网上自行查阅吧，反正我也是这么过来的。

## 总结

说实话，这是一篇具有明显个人感情色彩的工具推荐文章，其目的在于帮助大家培养起构造自己工具链的意识，起一个抛砖引玉的作用。希望大家只借鉴而非全盘照抄，最终都能够形成自己独一无二的工作流。

以上。

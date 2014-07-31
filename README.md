metro-light
===========

Metro-light is inspired by Win 8, Metro-Light a flat, minimal and responsive theme for [Hexo](http://zespia.tw/hexo/), it is developed based on light

[Demo](http://halfer53.github.io)

##Installation
###Install
```
git clone https://github.com/halfer53/metro-light.git themes/metro-light
```
**Metro-light requires Hexo 2.4.5 and above.** 
###Enable
Modify `theme` setting in blog folder` _config.yml` to `metro-light`.
###Update
```
cd themes/metro-light
git pull
```
**please backup your `_config.yml` file before update.** 
##Configuration

```
menu:
  Home: /
  Archives: /archives

widgets:
- search
- recent_posts
- category
- tag

excerpt_link: Continue Reading

comment:
  duoshuo: false
  duoshuo_short_name: 
## to enable disqus, you need to fill in the disqus_shortname in config.yml
## to enable duoshuo, you need duoshuo id and set duosuo to true

#share plugins at the bottom of the article
share:
  enable: true
  jiathis: false ##a chinese sharing plugins for chinese users
  twitter: true
  google: true

bottom_link:
  google_plus: ##e.g. 104684175089936429154 for https://plus.google.com/u/0/104684175089936429154/posts
  github: ##e.g. ffff for https://github.com/ffff
  twitter: ##e.g. ffff for https://twitter.com/ffff
  weibo: ##e.g. 333333333 for http://www.weibo.com/333333333
  facebook: ##e.g. ffff for https://www.facebook.com/ffff
  renren: ##e.g. 333333333 for http://www.renren.com/333333333

#your personal page, could be your github account page, twitter or google plus personal page
## By default its your homepage
personal_site: 

fancybox: false

#you can change the custom font in head.ejs
CustomFont: true

#google analytics id, e.g.UA-28532742-2
google_analytics: 

##url of your rss
##it is highly recommanded to use rss plugins, https://github.com/hexojs/hexo-generator-feed
rss: ##e.g. https://ffff.github.io/rss2.xml

#for Chinese users
ChineseUser: false
##默认false. 如果你的访客大部分来自中国, 那么请设置为true, cdn将会调换为360和百度公共库, 同时lang和content-language也会被修改
```

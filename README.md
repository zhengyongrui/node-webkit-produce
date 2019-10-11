# node-webkit-produce
生产环境使用的node-webkit
<div>
  <h2>参考文档</h2>
  <p>https://nwjs.readthedocs.io/en/latest/</p>
  <h2>0.13版本开始弃用属性</h2>
  <p>
      <span>详情查看</span>
      <a href="http://docs.nwjs.io/en/latest/For%20Users/Migration/From%200.12%20to%200.13/">http://docs.nwjs.io/en/latest/For%20Users/Migration/From%200.12%20to%200.13/</a>
  </p>
  <h2>现有配置属性含义</h2>
  <code>
      {
          "name": "包的名字，必须为独一无二的，可由字母，数字，下划线组成，不能有空格",
          "main": "当node-webkit打开时的默认页面",
          "single-instance": "是否为单例模式,0.13版本开始弃用属性",
          "nodejs": "是否支持NW.js",
          "node-remote": "* 允许跨域",
          "chromium-args": [
              "--allow-running-insecure-content: 默认情况下，https 页面不允许从 http 链接引用 javascript/css/plug-ins。添加这一参数会放行这些内容。",
              "--ignore-certificate-errors: 忽略证书错误",
              "--disable-web-security: 不遵守同源策略",
              "--enable-file-cookies: 允许保存本地设置cookie"
          ],
          "window": {
              "show": "应用启动时是否显示",
              "resizable": "可改变应用大小",
              "toolbar": "是否显示地址栏",
              "frame": "窗口是否有边框,如果设置为无边框,可以使用css将dom元素指定为可拖动区域。",
              "position": "{String} be null or center or mouse控制窗口的出现位置",
              "fullscreen": "全屏",
              "icon": "图标",
              "title": "",
              "min_width": "最小宽度",
              "min_height": "最小高度"
          },
          "webkit": {
              "plugin": "是否加载flash等外部浏览器插件，默认为true"
          }
      }
  </code>
  <h2>chromium-args参考属性</h2>
  <p>
      <span>英文网址</span>
      <a href="https://peter.sh/experiments/chromium-command-line-switches/">https://peter.sh/experiments/chromium-command-line-switches/</a>
  </p>
  <p>部分翻译参考下面</p>
  <code>
      1 --allow-outdated-plugins 不停用过期的插件。
      2 --allow-running-insecure-content 默认情况下，https 页面不允许从 http 链接引用 javascript/css/plug-ins。添加这一参数会放行这些内容。
      3 --allow-scripting-gallery 允许拓展脚本在官方应用中心生效。默认情况下，出于安全因素考虑这些脚本都会被阻止。
      4 --disable-accelerated-video 停用 GPU 加速视频。
      5 --disable-dart 停用 Dart。
      6 --disable-desktop-notifications 禁用桌面通知，在 Windows 中桌面通知默认是启用的。
      7 --disable-extensions 禁用拓展。
      8 --disable-file-system 停用 FileSystem API。
      9 --disable-preconnect 停用 TCP/IP 预连接。
      10 --disable-remote-fonts 关闭远程字体支持。SVG 中字体不受此参数影响。
      11 --disable-speech-input 停用语音输入。
      12 --disable-web-security 不遵守同源策略。
      13 --disk-cache-dir 将缓存设置在给定的路径。
      14 --disk-cache-size 设置缓存大小上限，以字节为单位。
      15 --dns-prefetch-disable 停用DNS预读。
      16 --enable-print-preview 启用打印预览。
      17 --extensions-update-frequency 设定拓展自动更新频率，以秒为单位。
      18 --incognito 让浏览器直接以隐身模式启动。
      19 --keep-alive-for-test 最后一个标签关闭后仍保持浏览器进程。（某种意义上可以提高热启动速度，不过你最好得有充足的内存）
      20 --kiosk 启用kiosk模式。（一种类似于全屏的浏览模式）
      21 --lang 使用指定的语言。
      22 --no-displaying-insecure-content 默认情况下，https 页面允许从 http 链接引用图片/字体/框架。添加这一参数会阻止这些内容。
      23 --no-first-run 跳过 Chromium 首次运行检查。
      24 --no-referrers 不发送 Http-Referer 头。
      25 --no-sandbox 彻底停用沙箱。
      26 --no-startup-window 启动时不建立窗口。
      27 --proxy-pac-url 使用给定 URL 的 pac 代理脚本。（也可以使用本地文件，如 --proxy-pac-url="file:\\\c:\proxy.pac"）
      28 --proxy-server 使用给定的代理服务器，这个参数只对 http 和 https 有效。（例如 --proxy-server=127.0.0.1:8087 ）
      29 --single-process 以单进程模式运行 Chromium。（启动时浏览器会给出不安全警告）
      30 --start-maximized 启动时最大化。
      31 --user-agent 使用给定的 User-Agent 字符串
      32.download.default_directory": download_dir 设置下载路径
      33.directory_upgrade": True,
      34.safebrowsing.enabled": True 是否提示安全警告
  </code>
  <h2>window.frame参考属性</h2>
  <code>
      .drag-enable {
      -webkit-app-region: drag;
      }
      .drag-disable {
      -webkit-app-region: no-drag;
      }
  </code>
</div>
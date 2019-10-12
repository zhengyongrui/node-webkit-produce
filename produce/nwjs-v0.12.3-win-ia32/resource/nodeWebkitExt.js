var gui = require('nw.gui');
var win = gui.Window.get();
var package = require('../package.json');

var nodeWebkitExt = {
	buildTray: function () {
		try {
			var trayEnabled = package && package.custom && package.custom.tray;
			if (!trayEnabled) {
				return
			}
			var tray = new gui.Tray({
				title: package.name,
				tooltip: package.name,
				icon: package.window.icon
			});
			tray.on('click', function () {
				win.show();
			});
			var menu = new gui.Menu();
			menu.append(new gui.MenuItem({
				type: 'normal',
				label: '显示窗口',
				click: function () {
					win.show();
					win.emit('show');
				}
			}));
			menu.append(new gui.MenuItem({
				type: 'normal',
				label: '清除缓存',
				click: function () {
					gui.App.clearCache();
					win.reloadIgnoringCache();
				}
			}));
			menu.append(new gui.MenuItem({
				type: 'normal',
				label: '调试菜单',
				click: function () {
					win.showDevTools()
				}
			}));
			menu.append(new gui.MenuItem({
				type: 'separator'
			}));
			menu.append(new gui.MenuItem({
				type: 'normal',
				label: '关闭程序',
				click: function () {
					gui.App.closeAllWindows();
				}
			}));
			tray.menu = menu;
		} catch (e) {
			// 在普通Chrome调试，出现异常就忽略这段代码
		}
	}
}
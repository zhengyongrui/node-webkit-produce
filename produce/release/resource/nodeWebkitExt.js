var pkg = require('../package.json');
var gui = require('nw.gui');
var win = gui.Window.get();

const TRAY_TYPE = {
	SHOW_WINDOW: 'showWindow',
	DEL_CACHE: 'delCache',
	SHOW_DEBUG: 'showDebug',
	CLOSE_WINDOW: 'closeWindow'
}

var nodeWebkitExt = {
	buildTray: function () {
		try {
			var traySetting = pkg && pkg.custom && pkg.custom.tray;
			if (!traySetting) {
				return
			}
			var tray = new gui.Tray({
				title: pkg.name,
				tooltip: pkg.name,
				icon: pkg.window.icon
			});
			tray.on('click', function () {
				win.show();
			});
			var menu = new gui.Menu();
			if (traySetting.indexOf(TRAY_TYPE.SHOW_WINDOW) > -1) {
				menu.append(new gui.MenuItem({
					type: 'normal',
					label: '显示窗口',
					click: function () {
						win.show();
						win.emit('show');
					}
				}));
			}
			if (traySetting.indexOf(TRAY_TYPE.DEL_CACHE) > -1) {
				menu.append(new gui.MenuItem({
					type: 'normal',
					label: '清除缓存',
					click: function () {
						gui.App.clearCache();
						win.reloadIgnoringCache();
					}
				}));
			}
			if (traySetting.indexOf(TRAY_TYPE.SHOW_DEBUG) > -1) {
				menu.append(new gui.MenuItem({
					type: 'normal',
					label: '调试菜单',
					click: function () {
						win.showDevTools()
					}
				}));
			}
			if (traySetting.indexOf(TRAY_TYPE.CLOSE_WINDOW) > -1) {
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
			}
			tray.menu = menu;
		} catch (e) {
			// 在普通Chrome调试，出现异常就忽略这段代码
		}
	},
	autoUpdateCheck: function autoUpdateCheck(manualUpdateCheckCallBack) {
		setTimeout(function () {
			var updater = require('node-webkit-updater');
			delete global.require.cache[global.require.resolve('../package.json')];
			var upd = new updater(pkg);
			var ncp = require('fs-extra').copy;
			upd.checkNewVersion(function (error, newVersionExists, newPatchExists, manifest) {
				if (null != error) {
					return;
				}
				if (newVersionExists) {
					var updateWin = gui.Window.open('updater.html', {
						"position": "center",
						"title": "自动更新",
						"toolbar": false,
						"frame": true,
						"width": 550,
						"height": 350,
						"resizable": false,
						"always-on-top": true,
						"icon": pkg.window.icon,
						"focus": true
					});
					updateWin.on('loaded', function () {
						setTimeout(function () {
							updateWin.window.setParent(require('nw.gui').Window.get(), manifest);
						}, 100);
					});
				} else if (newPatchExists || manifest.patchNow === true) {
					upd.download(function (error, filename) {
						if (!error) {
							setTimeout(function () {
								upd.unpack(filename, function (error, newAppPath) {
									if (!error) {
										var dir;
										if (newAppPath.lastIndexOf('\\') > 0) {
											dir = newAppPath.substr(0, newAppPath.lastIndexOf('\\'));
										} else {
											dir = newAppPath.substr(0, newAppPath.lastIndexOf('/'));
										}
										ncp(dir, process.cwd(), function (error) {
											if (!error) {
												console.log('update patch success');
											} else {
												console.log("文件复制异常：请确认登录用户对当前安装目录有读写控制权限。(操作步骤：文件夹->属性->安全; 请设置当前登录用户对该安装目录有读写权限。");
											}
										});
									} else {
										console.log("文件解压异常：" + error);
									}
								}, manifest);
							}, 1000 * 5)
						}
					}, manifest, 'patch');
				} else if (manualUpdateCheckCallBack) {
					manualUpdateCheckCallBack();
				}
			})
		}, 0);
	}
}
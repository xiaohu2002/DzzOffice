function OpenFileManage() {
    var n = _config.sourcedata.folder[_config.space.typefid.home];
    _config.sourcedata.icos.home = {
        bz: "",
        dateline: "1375256549",
        deldateline: "0",
        ext: "",
        fdateline: "2013-7-31 15:42",
        flag: "home",
        name: n.fname,
        fsize: "   0 B ",
        fsperm: "0",
        ftype: __lang.type_folder,
        gid: "0",
        icoid: "home",
        icon: "dzz/images/default/system/home.png",
        iconum: "0",
        img: "dzz/images/default/system/home.png",
        isdelete: "0",
        oid: _config.space.typefid.home,
        path: "home",
        perm: "5",
        pfid: "0",
        size: "0",
        title: n.fname,
        type: "folder",
        uid: n.uid,
        url: "",
        username: n.username
    },
    OpenFolderWin("home", 1)
}
function OpenFolderWin(n, t, i) {
    var r, e, o, u, s, f;
    t || (t = 0),
    r = _config.sourcedata.icos[n];
    if (!r)
        return;
    e = r.oid,
    o = [];
    if (r.type == "shortcut") {
        if (r.tdata.type != "folder")
            return;
        e = r.tdata.oid,
        o = r.tdata.topfid
    } else {
        if (r.type != "folder" && r.type != "pan" && r.type != "storage" && r.type != "ftp" && r.type != "disk")
            return;
        o = _ico.getTopFid(e)
    }
    u = null;
    for (s in _window.windows) {
        f = _window.windows[s];
        if (f.type == "folder" && f.fid == e) {
            u = f;
            break
        }
    }
    return u ? (u.treeshow = t,
    u.Focus()) : (i = i ? i : windows.Folder.features,
    u = _window.OpenFolderWin(n, o, t, i),
    (!r.havetask || r.havetask > 0) && _dock.Ctask(n, u.id)),
    u
}
function OpenApp(n, t) {
    var r = _config.sourcedata.app[n], f, u;
    if (!r)
        return;
    t && (r.url = t);
    if (r.url.indexOf("dzzjs:") === 0) {
        eval(r.url.replace("dzzjs:", ""));
        return
    }
    if (r.open > 0) {
        window.open(r.url);
        return
    }
    r.img = r.appico,
    r.type = "app",
    r.name = r.appname,
    f = _window.mergeFuture(windows.App.features, r.feature),
    u = _window.windows["_W_app_" + n];
    if (u) {
        if (r.url && r.url != u.url)
            if (r.nodup > 0)
                try {
                    window.frames[u.iframe.name].window.multiOpen(r.url)
                } catch (e) {}
            else
                u.SetAppWinContent(r.url),
                u.url = r.url;
        u.Focus()
    } else
        u = _window.OpenApp(n, f),
        u.url = r.url;
    return r.havetask > 0 && _dock.Ctask("app_" + n, u.id, r),
    u.fileext = r.fileext || [],
    _ico.setTip(n, 0, "app"),
    jQuery.get(_config.systemurl + "&op=ajax&do=updateAppView&appid=" + n),
    u
}
function OpenAppWin(n, t, i, r) {
    var u = taskdata = _config.sourcedata.icos[n], o, c, e, s, h, f;
    if (!u)
        return;
    u.type == "shortcut" && (u = u.tdata),
    o = u.type == "app" ? "app_" + u.oid : n,
    c = u.icoid,
    h = _window.mergeFuture(windows.App.features, r);
    if (t && _config.extopen.all[t]) {
        e = _config.extopen.all[t];
        if (e.appid > 0) {
            jQuery.get(_config.systemurl + "&op=ajax&do=updateAppView&appid=" + e.appid),
            _ico.setTip(e.appid, 0, "app"),
            s = _config.sourcedata.app[e.appid];
            if (s.open > 0) {
                window.open(i ? i : s.url);
                return
            }
            u.havetask = s.havetask
        }
        e.feature && e.feature != "" && (h = _window.mergeFuture(windows.App.features, e.feature))
    } else
        u.havetask = 1,
        u.feature && u.feature != "" && (h = _window.mergeFuture(windows.App.features, u.feature)),
        jQuery.get(_config.systemurl + "&op=ajax&do=updateAppView&appid=" + u.oid),
        _ico.setTip(u.oid, 0, "app");
    return _window.windows["_W_" + o] ? (f = _window.windows["_W_" + o],
    i && i != f.url && f.SetAppWinContent(i),
    f.url = i,
    f.Focus()) : f = _window.OpenAppWin(o, u.icoid, i, h),
    u.havetask > 0 && _dock.Ctask(o, f.id, u),
    f.fileext = u.fileext || [],
    f
}
function OpenPicWin(n, t) {
    var i = _config.sourcedata.icos[n], r;
    if (!i)
        return;
    return i.type == "shortcut" && (i = i.tdata),
    i.type != "image" ? void 0 : (features = t ? t : windows.sys_pic.features,
    r = null,
    (r = _window.windows._W_sys_pic) ? (r.setTitleText(i.name),
    r.SetPicContent(i.icoid, i.url),
    _dock.Change("sys_pic", i.img, i.name)) : (r = _window.OpenPicWin(i.icoid, features),
    _dock.Ctask("sys_pic", "_W_sys_pic"),
    _dock.Change("sys_pic", i.img, i.name, "dzz/images/taskicon/image.png")),
    r.taskid = "sys_pic",
    r)
}
function OpenWindow(n, t, i, r, u) {
    var e, o, s, f, n;
    if (t)
        e = "[url]" + t,
        n || (n = "url"),
        o = i ? i : windows[n] ? windows[n].title : windows.url.title;
    else if (n) {
        if (!document.getElementById(n))
            return;
        e = "[id]" + n,
        o = i ? i : windows[n] ? windows[n].title : n
    } else
        return;
    s = _window.mergeFuture(windows[n] ? windows[n].features : windows.url.features, r),
    f = null,
    n == "url" ? (n = id1 = encodeURIComponent(e).replace(/\./g, "_").replace(/%/g, "_"),
    _window.windows["_W_" + id1] && (f = _window.windows["_W_" + id1])) : _window.windows["_W_" + n] && (f = _window.windows["_W_" + n]);
    if (f) {
        switch (f.status) {
        case 0:
            f.Show();
            break;
        case 1:
            f.Focus()
        }
        f.SetContent(e),
        f.SetTitle(o)
    } else
        f = _window.Open(n, e, o, s);
    return u !== !1 && (u || (u = {}),
    u.img = u.img || "dzz/images/default/e.png",
    u.name = u.name || o,
    _dock.Ctask(n, f.id, u)),
    f
}
function Alert(n, t, i, r, u) {
    u || (u = "alert"),
    showDialog(n, u, __lang.board_message, i, 1, i, "", r ? r : __lang.i_see, "", t)
}
function Confirm(n, t) {
    showDialog(n, "confirm", __lang.confirm_message, t, 1)
}
function _filemanage(n, t, i) {
    page = isNaN(parseInt(i.page)) ? 1 : parseInt(i.page),
    total = isNaN(parseInt(i.total)) ? 1 : parseInt(i.total),
    this.total = total,
    this.bz = i.bz || "",
    this.perpage = i.perpage,
    this.totalpage = Math.ceil(this.total / this.perpage),
    this.totalpage = this.totalpage < 1 ? 1 : this.totalpage,
    this.id = n,
    this.string = "_filemanage.cons." + this.id,
    this.fid = n.split("-")[1],
    this.winid = i.winid,
    this.keyword = i.keyword,
    this.localsearch = i.localsearch,
    this.folderdata = _config.sourcedata.folder[this.fid] || {},
    this.view = parseInt(this.folderdata.iconview || _filemanage.view),
    this.disp = parseInt(this.folderdata.disp || _filemanage.disp),
    this.asc = i.asc,
    this.detailper = _filemanage.detailper,
    this.data || (this.data = {}),
    this.data = t,
    this.currentpage = page,
    this.container = i.container,
    this.odata = [],
    this.sum = 0,
    _window.windows[this.winid].filemanageid = this.id,
    _filemanage.cons[this.id] = this,
    this.pageloadding = !0
}
function Search(n, t) {
    var r = {}, i;
    for (i in n)
        n[i].name.toLowerCase().indexOf(t.toLowerCase()) !== -1 && (r[i] = n[i]);
    return r
}
function Sort(n, t, i) {
    var u = [], e, r, f;
    if (!n)
        return [];
    for (r in n)
        switch (parseInt(t)) {
        case 0:
            u[u.length] = n[r].type == "folder" ? " " + n[r].name.replace(/_/g, "") + " ___" + r : n[r].name.replace(/_/g, "") + "___" + r;
            break;
        case 1:
            u[u.length] = n[r].size + "___" + r;
            break;
        case 2:
            u[u.length] = n[r].type == "folder" ? " ___" + r : n[r].ext + n[r].type + "___" + r;
            break;
        case 3:
            u[u.length] = n[r].dateline + "___" + r
        }
    u = parseInt(t) == 1 ? u.sort(function(n, t) {
        return parseInt(n) > parseInt(t) ? 1 : 0
    }) : u.sort(),
    e = {};
    if (i > 0)
        for (r = 0; r < u.length; r++)
            f = u[r].split("___"),
            e["icos_" + f[1]] = n[f[1]];
    else
        for (r = u.length - 1; r >= 0; r--)
            f = u[r].split("___"),
            e["icos_" + f[f.length - 1]] = n[f[f.length - 1]];
    return e
}
function get_ico_template(n, t, i) {
    var s, h, o, e, f, u, r;
    switch (i ? i : t) {
    case "image":
        s = '<img class="imageclass" src="{img}" style="display:none;" title="{name}" onload="_ico.image_resize(this,{width},{height},{ispng});" onerror="_ico.icoimgError(this,{width},{height});" error="{error}" >';
        break;
    case "video":
        s = n < 3 ? '<img class="videoclass{width}_{height}" src="{img}"  title="{name}" >' : '<img class="videoclass" src="{img}" style="display:none;" title="{name}" onload="_ico.image_resize(this,{width},{height},{ispng});"  onerror="_ico.icoimgError(this,{width},{height});" error="{error}">';
        break;
    case "user":
        s = n < 3 ? '<img class="userclass{width}_{height}" src="{img}"  title="{name}" >' : '<img class="userclass radius" src="{img}" style="display:none;" title="{name}" onload="_ico.image_resize(this,{width},{height},{ispng});"  onerror="_ico.icoimgError(this,{width},{height});" error="{error}">';
        break;
    default:
        s = '<img class="radius" src="{img}" style="display:none;" title="{name}" onload="_ico.image_resize(this,{width},{height},{ispng});"  onerror="_ico.icoimgError(this,{width},{height});" error="{error}">'
    }
    h = "icoimgContainer_" + t,
    o = "",
    o += '<div class="icoimgContainer ' + h + '" icoid="{icoid}" style="position:relative;width:{width}px;height:{height}px">',
    o += '<table width="100%" height="100%" cellpadding="0" cellspacing="0"><tr><td align="center" valign="middle">' + s + "</td></tr></table>",
    o += '<div class="icoimgCover_up" style="position:absolute;left:0px;top:0px;width:{width}px;height:{height}px;z-index:1"></div>',
    o += '<div class="icoimgtips" style="position:absolute;left:0px;top:0px;width:{width}px;height:{height}px;z-index:2"></div>',
    o += '<div class="icoimgCover_down" style="position:absolute;left:0px;top:0px;width:{width}px;height:{height}px;z-index:-1"></div>',
    o += "</div>",
    e = '<div style="width:{divwidth}px;height:{divheight}px;" class="toggleGlow">',
    e += '\t<table width="{divwidth}" height="{divheight}" style="table-layout:fixed;">',
    e += '\t\t<tr> <td  align="center" valign="middle"  width="{width_10}">' + o + "</td>",
    e += '\t\t<td align="left" valign="middle">',
    e += '\t\t\t<div class="IcoText_div" style="width:{text_width}px;" title="{name}">',
    e += '\t\t\t\t<table cellpadding="0" cellspacing="0" width="100%" height="100%"><tr><td valign="middle" align="left"><a id="file_text_{icoid}" class="IcoText_folder" style="overflow:hidden;" >{name}</a></td></tr></table>',
    e += "\t\t\t</div>",
    e += "\t\t</td></tr>",
    e += "\t</table>",
    e += "</div>",
    e += '\t<div class="icoblank_tip icoblank_rightbottom"></div>',
    e += '<div class="backgound_radius" style="position: absolute; left: 0px; top: 0px; z-index: -5; width: {divwidth_2}px; height: {divheight_2}px;"></div>',
    f = '<div style="width:{divwidth}px;height:{divheight}px;" class="toggleGlow">',
    f += '\t<table width="{divwidth}" height="{divheight}" style="table-layout:fixed;">',
    f += '\t\t<tr><td  align="center" valign="middle" style="" height="{divheight_45}">' + o + "</td></tr>",
    f += '\t    <tr><td align="center" valign="middle">',
    f += '\t\t\t<div  class="IcoText_div" style="width:{text_width}px;" title="{name}">',
    f += '\t\t\t\t<a id="file_text_{icoid}" class="ico_item ico_item_name IcoText_folder" style="width:{text_width}px;overflow:hidden" title="{name}">{name}</a>',
    f += "\t\t\t</div>",
    f += "\t\t</td></tr>",
    f += "\t</table>",
    f += "</div>",
    f += '\t<div class="icoblank_tip icoblank_rightbottom"></div>',
    f += '<div class="backgound_radius" style="position: absolute; left: 0px; top: 0px; z-index: -5; width: {divwidth_2}px; height: {divheight_2}px;"></div>',
    u = "",
    u += '<tr class="detail_tr Icoblock"  icoid="{icoid}">',
    u += '<td class="detail_item_td "  valign="middle" width="20" style="overflow:hidden">',
    u += '<div class="detail_item_td_div detail_item_td_select" title="' + __lang.multiple_choice + '" icoid="{icoid}">',
    u += '<a class="selectbox" icoid="{icoid}" title="' + __lang.choose_fetch + '"></a>',
    u += "</div>",
    u += "</td>",
    u += '<td class="detail_item_td "  valign="middle" width="' + _filemanage.detailper[0] + '%" style="overflow:hidden">',
    u += '<div class="detail_item_td_div detail_item_td_name toggleGlow" title="{name}" icoid="{icoid}">',
    u += '<a href="javascript:;"><img class="detail_item_name_icon" src="{img}" title="{name}" error="{error}" onerror="jQuery(this).attr(\'src\',jQuery(this).attr(\'error\'))"></a>',
    u += '<a href="javascript:;" id="file_text_{icoid}" class="detail_text detail_item_name_text IcoText_folder">{name}</a>',
    u += "</div>",
    u += "</td>",
    u += '<td class="detail_item_td detail_item_td_size" valign="middle" width="' + _filemanage.detailper[1] + '%" style="overflow:hidden">',
    u += '<div class="detail_item_td_div">',
    u += '<div class="detail_text detail_item_size_text">{size}</div>',
    u += "</div>",
    u += "</td>",
    u += '<td class="detail_item_td detail_item_td_type" valign="middle" width="' + _filemanage.detailper[2] + '%" style="overflow:hidden">',
    u += '<div class="detail_item_td_div">',
    u += '<div class="detail_text detail_item_size_type">{type}</div>',
    u += "</div>",
    u += "</td>",
    u += '<td class="detail_item_td detail_item_td_type" valign="middle" width="' + _filemanage.detailper[3] + '%" style="overflow:hidden">',
    u += '<div class="detail_item_td_div">',
    u += '<div class="detail_text detail_item_size_type">{dateline}</div>',
    u += "</div>",
    u += "</td>",
    u += "</tr>",
    r = "";
    switch (n) {
    case 0:
        r = f.replace(/{divwidth}/g, 150),
        r = r.replace(/{divheight}/g, 150),
        r = r.replace(/{divheight_2}/g, 148),
        r = r.replace(/{divwidth_2}/g, 148),
        r = r.replace(/{divheight_45}/g, 105),
        r = r.replace(/{width}/g, 100),
        r = r.replace(/{height}/g, 100),
        r = r.replace(/{width_10}/g, 90),
        r = r.replace(/{text_width}/g, 135),
        r = r.replace(/{textheight}/g, 45),
        r = r.replace(/{view_0}/g, ""),
        r = r.replace(/{\/view_0}/g, "");
        break;
    case 1:
        r = f.replace(/{divwidth}/g, 100),
        r = r.replace(/{divheight}/g, 103),
        r = r.replace(/{divheight_2}/g, 101),
        r = r.replace(/{divwidth_2}/g, 98),
        r = r.replace(/{divheight_45}/g, 58),
        r = r.replace(/{width}/g, 50),
        r = r.replace(/{height}/g, 50),
        r = r.replace(/{width_10}/g, 60),
        r = r.replace(/{text_width}/g, 85),
        r = r.replace(/{text_height}/g, 35),
        r = r.replace(/{textheight}/g, 45),
        r = r.replace(/{view_0}(.+?){\/view_0}/g, "");
        break;
    case 2:
        r = e.replace(/{divwidth}/g, 180),
        r = r.replace(/{divheight}/g, 70),
        r = r.replace(/{divheight_2}/g, 68),
        r = r.replace(/{divwidth_2}/g, 178),
        r = r.replace(/{width}/g, 50),
        r = r.replace(/{height}/g, 50),
        r = r.replace(/{width_10}/g, 75),
        r = r.replace(/{text_width}/g, 95);
        break;
    case 3:
        r = e.replace(/{divwidth}/g, 220),
        r = r.replace(/{divheight}/g, 42),
        r = r.replace(/{divheight_2}/g, 40),
        r = r.replace(/{divwidth_2}/g, 218),
        r = r.replace(/{width}/g, 32),
        r = r.replace(/{height}/g, 32),
        r = r.replace(/{width_10}/g, 42),
        r = r.replace(/{text_width}/g, 173);
        break;
    case 4:
        r = u.replace(/{width}/g, 40),
        r = r.replace(/{height}/g, 45),
        r = r.replace(/{width_10}/g, 50),
        r = r.replace(/{height_10}/g, 50)
    }
    return r
}
function _ico(n, t, i) {
    this.id = n,
    t.indexOf("icosContainer_body_") !== -1 ? (this.iconview = _config.iconview[_layout.iconview] || {},
    this.divwidth = parseInt(this.iconview.divwidth) || _ico.divwidth,
    this.divheight = parseInt(this.iconview.divheight) || _ico.divheight,
    this.width = parseInt(this.iconview.width) || _ico.width,
    this.height = parseInt(this.iconview.height) || _ico.height,
    this.paddingleft = parseInt(this.iconview.paddingleft) || _ico.paddingLeft,
    this.paddingtop = parseInt(this.iconview.paddingtop) || _ico.paddingTop) : (this.iconview = {
        cssname: "middleicon"
    },
    this.divwidth = _ico.divwidth,
    this.divheight = _ico.divheight,
    this.width = _ico.width,
    this.height = _ico.height,
    this.paddingleft = _ico.paddingLeft,
    this.paddingtop = _ico.paddingTop),
    this.string = "_ico.icos." + this.id,
    this.zIndex = ++_ico.zIndex,
    this.align = this.iconview.align * 1 || 0,
    this.sourceid = _config.sourcedata.icos[n].oid || 0,
    this.type = _config.sourcedata.icos[n].type || "",
    this.text = _config.sourcedata.icos[n].name,
    this.img = _config.sourcedata.icos[n].img || "dzz/images/default/icodefault.png",
    _config.sourcedata.icos[this.id].flag == "recycle" ? _config.sourcedata.folder[this.sourceid] && _config.sourcedata.folder[this.sourceid].iconum > 0 ? (_config.sourcedata.icos[this.id].img = this.img = "dzz/styles/thame/" + _config.thame.system.folder + "/system/recycle1.png",
    this.error = "dzz/images/default/system/recycle1.png") : (_config.sourcedata.icos[this.id].img = this.img = "dzz/styles/thame/" + _config.thame.system.folder + "/system/recycle.png",
    this.error = "dzz/images/default/system/recycle.png") : _config.sourcedata.icos[this.id].flag ? (this.img = "dzz/styles/thame/" + _config.thame.system.folder + "/system/" + _config.sourcedata.icos[this.id].flag + ".png",
    this.error = "dzz/images/default/system/" + _config.sourcedata.icos[this.id].flag + ".png") : _config.sourcedata.icos[this.id].type == "folder" ? _config.sourcedata.icos[this.id].gid > 0 ? (this.img = _config.sourcedata.icos[this.id].img ? _config.sourcedata.icos[this.id].img.replace("dzz/images/default", "dzz/styles/thame/" + _config.thame.system.folder) : "dzz/styles/thame/" + _config.thame.system.folder + "/system/folder-read.png",
    this.error = _config.sourcedata.icos[this.id].img || "dzz/images/default/system/folder-read.png") : (this.img = "dzz/styles/thame/" + _config.thame.system.folder + "/system/folder.png",
    this.error = "dzz/images/default/system/folder.png") : _config.sourcedata.icos[this.id].type == "shortcut" && _config.sourcedata.icos[this.id].ttype == "folder" ? _config.sourcedata.icos[this.id].tdata.gid > 0 ? (this.img = _config.sourcedata.icos[this.id].tdata.img ? _config.sourcedata.icos[this.id].tdata.img.replace("dzz/images/default", "dzz/styles/thame/" + _config.thame.system.folder) : "dzz/styles/thame/" + _config.thame.system.folder + "/system/folder-read.png",
    this.error = _config.sourcedata.icos[this.id].tdata.img || "dzz/images/default/system/folder-read.png") : (this.img = _config.sourcedata.icos[this.id].img || "dzz/styles/thame/" + _config.thame.system.folder + "/system/folder.png",
    this.error = "dzz/images/default/system/folder.png") : this.error = "dzz/images/default/icodefault.png",
    this.url = _config.sourcedata.icos[n].url || "",
    this.open = _config.sourcedata.icos[n].open * 1 || 0,
    this.notdelete = _config.sourcedata.icos[n].notdelete * 1 || 0,
    this.defaultopen = _config.sourcedata.icos[n].defaultopen * 1 || 0,
    this.wwidth = _config.sourcedata.icos[n].wwidth || 0,
    this.wheight = _config.sourcedata.icos[n].wheight || 0,
    this.move = _config.self > 0 ? "move" : "no",
    this.className = _ico.ClassName,
    this.pos = i,
    this.container = t,
    _ico.icos[this.id] = this
}
function getsum(n, t, i, r, u, f, e) {
    var s = Math.floor(t / u), o = Math.floor(n / r), c, h;
    return s < 1 && (s = 1),
    o < 1 && (o = 1),
    c = n - o * r,
    h = t - s * u,
    o * s < i ? [f, e] : o * s == i ? [o, s] : getsum(n - r, t - u, i, r, u, o, s)
}
function _window(n, t) {
    this.id = t ? this.name = "_W_" + t : this.name = "_W_" + ++_window.zIndex,
    this.string = "_window.windows." + this.id,
    this.zIndex = ++_window.zIndex;
    try {
        this.className = _window.getFeature(n, "class") || _config.thame.system.modules.window || "window_jd"
    } catch (i) {}
    _window.getFeature(n, "class") && (this.loadcss = _window.getFeature(n, "class")),
    this.bodyWidth = getcookie("win_" + this.id + "_width") != "" ? getcookie("win_" + this.id + "_width") : _window.getFeature(n, "width") || _window.getFeature(n, "width") || _window.Width,
    this.bodyHeight = getcookie("win_" + this.id + "_height") != "" ? getcookie("win_" + this.id + "_height") : _window.getFeature(n, "height") || _window.getFeature(n, "height") || _window.Height,
    this.left = getcookie("win_" + this.id + "_left") != "" ? parseInt(getcookie("win_" + this.id + "_left")) : _window.getFeature(n, "left"),
    this.top = getcookie("win_" + this.id + "_top") != "" ? parseInt(getcookie("win_" + this.id + "_top")) : _window.getFeature(n, "top"),
    this.right = _window.getFeature(n, "right"),
    this.bottom = _window.getFeature(n, "bottom"),
    this.move = _window.getFeature(n, "move").toLowerCase() || "move",
    this.moveable = this.move == "no" ? !1 : !0,
    this.button = _window.getFeature(n, "button").toUpperCase(),
    this.resize = _window.getFeature(n, "resize").toUpperCase() || "RESIZE|RESIZE-X|RESIZE-Y",
    this.resizeable = this.resize == "no" ? !1 : !0,
    this.size = _window.getFeature(n, "size").toUpperCase() || "NO",
    this.titleButton = _window.getFeature(n, "titlebutton").toUpperCase() || "",
    this.isModal = _window.getFeature(n, "ismodal").toLowerCase() == "yes" ? !0 : !1,
    this.tabs = {},
    this.buttons = {},
    this.type = null,
    this.isHide = null,
    this.Sequence = [],
    this.Csequence = 0,
    this.bodyWidth = isNaN(parseInt(this.bodyWidth)) ? 800 : parseInt(this.bodyWidth),
    this.bodyHeight = isNaN(parseInt(this.bodyHeight)) ? 500 : parseInt(this.bodyHeight),
    _window.windows[this.id] = this
}
function _layout(n) {
    _layout.fid = n.typefid.desktop || 0,
    _layout.taskbar = n.taskbar,
    jQuery("#taskbar").addClass("taskbar-" + _layout.taskbar).show(),
    jQuery("#startmenu").addClass(_layout.taskbar),
    jQuery("#noticeContainer").addClass(_layout.taskbar),
    jQuery("#copyrightmenu").addClass(_layout.taskbar),
    jQuery(document.body).addClass(_layout.taskbar),
    _layout.pageHeight = 20,
    _layout.MaxPageWidth = 50,
    _layout.pageWidth = _layout.MaxPageWidth,
    _layout.margintop = 10,
    _layout.marginright = 10,
    _layout.marginbottom = 10 + _layout.pageHeight,
    _layout.marginleft = 10,
    _layout._body_margintop = 0,
    _layout._body_marginright = 0,
    _layout._body_marginbottom = 0,
    _layout._body_marginleft = 0;
    switch (n.taskbar) {
    case "bottom":
        _layout._body_marginbottom += jQuery("#taskbar").height(),
        _layout.taskbar_direction = 1;
        break;
    case "left":
        _layout._body_marginleft += jQuery("#taskbar").width(),
        _layout.taskbar_direction = 2;
        break;
    case "top":
        _layout._body_margintop += jQuery("#taskbar").height(),
        _layout.taskbar_direction = 1;
        break;
    case "right":
        _layout._body_marginright += jQuery("#taskbar").width(),
        _layout.taskbar_direction = 2
    }
    _layout.iconview = n.iconview * 1 || 1,
    _layout.direction = n.direction * 1 || 0,
    _layout.autolist = n.autolist > 0 ? 1 : 0,
    _layout.iconposition = n.iconposition * 1 || 0,
    _layout.currentPage = 1,
    _layout.page = 1,
    _layout.zIndex = ++_layout.zIndex,
    _layout.initContainer()
}
function _start(n, t) {
    this.id = this.name = n,
    this.string = "_start.icos." + this.id,
    this.zIndex = ++_start.zIndex,
    this.data = _config.sourcedata.app[n],
    this.className = _start.className,
    this.container = "startmenu_app",
    this.width = _start.width,
    this.height = _start.height,
    this.divwidth = _start.divwidth,
    this.divheight = _start.divheight,
    this.pos = t || 0,
    _start.icos[this.id] = this
}
function _dock(n, t, i, r, u) {
    this.id = this.name = n,
    this.string = "_dock.icos." + this.id,
    this.zIndex = ++_ico.zIndex,
    this.data = _dock.getdata(n, i),
    this.text = this.data.text,
    this.img = this.data.img,
    this.type = this.data.type,
    this.data.icoid > 0 && (this.icoid = this.data.icoid,
    _config.sourcedata.icos[this.icoid].flag ? (this.data.img = "dzz/styles/thame/" + _config.thame.system.folder + "/system/" + _config.sourcedata.icos[this.icoid].flag + ".png",
    this.data.error = "dzz/images/default/system/" + _config.sourcedata.icos[this.icoid].flag + ".png") : _config.sourcedata.icos[this.icoid].type == "folder" ? _config.sourcedata.icos[this.icoid].gid > 0 ? _config.Permission_Container("admin", _config.sourcedata.icos[this.icoid].oid) ? (this.data.img = "dzz/styles/thame/" + _config.thame.system.folder + "/system/folder_write.png",
    this.data.error = "dzz/images/default/system/folder_write.png") : (this.data.img = "dzz/styles/thame/" + _config.thame.system.folder + "/system/folder_read.png",
    this.data.error = "dzz/images/default/system/folder_read.png") : (this.data.img = "dzz/styles/thame/" + _config.thame.system.folder + "/system/folder.png",
    this.data.error = "dzz/images/default/system/folder.png") : _config.sourcedata.icos[this.icoid].type == "shortcut" && _config.sourcedata.icos[this.icoid].ttype == "folder" ? _config.sourcedata.icos[this.icoid].tdata.gid > 0 ? _config.Permission_Container("admin", _config.sourcedata.icos[this.icoid].tdata.fid) ? (this.data.img = "dzz/styles/thame/" + _config.thame.system.folder + "/system/folder_write.png",
    this.data.error = "dzz/images/default/system/folder_write.png") : (this.data.img = "dzz/styles/thame/" + _config.thame.system.folder + "/system/folder_read.png",
    this.data.error = "dzz/images/default/system/folder_read.png") : (this.data.img = "dzz/styles/thame/" + _config.thame.system.folder + "/system/folder.png",
    this.data.error = "dzz/images/default/system/folder.png") : this.data.error = "dzz/images/default/icodefault.png"),
    this.error = this.data.error || "dzz/images/taskicon/unknown.png",
    this.className = _dock.className + " middleicon",
    this.container = "taskbar_dock",
    this.width = _dock.width,
    this.height = _dock.height,
    this.divwidth = _dock.divwidth,
    this.divheight = _dock.divheight,
    this.pos = u,
    this.winid = t,
    this.pined = r ? r : null,
    _dock.icos[this.id] = this
}
function _Drag(n, t) {
    this.id = this.name = n + "_" + t,
    this.string = "_Drag.icos." + this.id,
    this.icoid = String(n),
    this.width = _Drag.width,
    this.height = _Drag.height,
    this.top = 0,
    this.left = 0,
    this.text = "title",
    this.img = "dzz/images/b.gid",
    this.url = "#",
    this.container = t,
    t == "icosContainer_dim" ? (this.uid = n.replace("uid_", ""),
    this.data = {
        icoid: 0,
        type: "user",
        oid: this.uid
    }) : this.data = t == "chatbox" ? _config.sourcedata.icos[n] : _config.sourcedata.icos[n],
    this.icos = [],
    this.copy_data = {},
    _Drag.icos[this.id] = this
}
function _select(n) {
    this.id = this.name = n,
    this.string = "_select.icos." + this.id,
    this.board = document.getElementById(n),
    _select.icos[this.id] = this
}
function OpenFile(n, t, i, r, u, f) {
    _config.selectall.icos = [],
    n != "open" && n != "save" && n != "saveto" && (n = "open"),
    r || (r = {}),
    (n == "save" || n == "saveto") && (r.multiple = !1),
    _window.windows._W_openfile && _window.windows._W_openfile.Close();
    var e = _window.OpenFile(n, i, t, r, f, windows.OpenFile.features);
    e.OnOK = function() {
        var i = document.getElementById("file_select_input").value, f, o, t, h, s;
        if (n == "open") {
            if (document.getElementById("file_select_input").value == "") {
                Alert(__lang.please_select_file);
                return
            }
            if (checkeURL(i))
                r.multiple = !1,
                r.ishref = 1,
                t = {
                    params: r,
                    icodata: {
                        url: i,
                        name: i.substr(i.lastIndexOf("/") + 1)
                    }
                };
            else {
                if (_file.selected.length < 1) {
                    Alert(__lang.please_select_file);
                    return
                }
                t = {},
                f = [];
                for (o in _file.selected)
                    f[o] = _config.sourcedata.icos[_file.selected[o]];
                t.params = r,
                t.icodata = r.multiple ? f : f[0],
                t.position = _config.sourcedata.folder[e.fid].path
            }
        } else if (n == "save" || n == "saveto") {
            t = {},
            i = i.replace(/["'\/]/g, ""),
            h = document.getElementById("file_type_select").value,
            s = _file.exts[h][1][0],
            i.lastIndexOf(".") === -1 && (i = i + "." + s.toLowerCase());
            if (i && _file.selected && _file.selected.length > 0 && _config.sourcedata.icos[_file.selected[0]].name == i)
                if (confirm(__lang.cover_confirm + '"' + i + '?"'))
                    t.icodata = _config.sourcedata.icos[_file.selected[0]];
                else
                    return;
            if (document.getElementById("file_select_input").value == "") {
                Alert(__lang.input_filename_have_file);
                return
            }
            t.filecode = document.getElementById("file_code_select").value,
            t.params = r,
            t.name = i,
            t.position = _config.sourcedata.folder[e.fid].path
        }
        typeof u == "function" && u(t),
        e.Close()
    }
    ,
    e.OnCANCEL = function() {
        e.Close()
    }
}
function SelectPosition(n, t) {
    _config.selectPosition = "";
    var r = {
        object: null,
        title: __lang.selectposition,
        features: "titlebutton=close,width=300,height=200,button=OK|CANCEL,isModal=yes",
        width: 500,
        height: 400
    }
      , i = _window.OpenSelectPostion(r.title, r.features, t);
    i.OnOK = function() {
        if (!_config.selectPosition || _config.selectPosition.indexOf("-") === -1) {
            alert(__lang.selectposition);
            return
        }
        var u = _config.selectPosition.split("-")
          , r = _config.sourcedata.folder[u[1]].path;
        typeof n == "function" && n(r, t),
        i.Close()
    }
    ,
    i.OnCANCEL = function() {
        i.Close()
    }
}
function Html5notification() {
    var n = {};
    return n.issupport = function() {
        var n = !!window.webkitNotifications;
        return n && window.webkitNotifications.checkPermission() > 0 && (window.onclick = function() {
            window.webkitNotifications.requestPermission()
        }
        ),
        n
    }
    ,
    n.shownotification = function(n, t, i, r, u) {
        if (window.webkitNotifications.checkPermission() > 0)
            window.webkitNotifications.requestPermission();
        else {
            var f = window.webkitNotifications.createNotification(i, r, u);
            f.replaceId = n,
            f.onclick = function() {
                window.focus(),
                window.Html5notificationClick(n),
                f.cancel()
            }
            ,
            f.show()
        }
    }
    ,
    n
}
function Html5notificationClick() {}
var CurrentActive, imgReady;
_api = {},
_api.Open = function(n) {
    try {
        _config.sourcedata.icos[n.icoid] = n,
        _ico.Open(n.icoid)
    } catch (t) {
        Alert(__lang.parameter_error_examine)
    }
}
,
_notice = {},
_notice.delay = 1e4,
_notice.delay_add = 0,
_notice.error = 0,
_notice.timer = [],
_notice.noDisturb = 0,
_notice.noticelist = [],
_notice.message = [],
_notice.polltype = "short",
_notice.init = function() {
    for (var r = ["P", "owered", " B", "y <a", ' href="ht', "tp:/", "/ww", "w.dz", "zof", "fice.c", 'om" target="_blank">D', "zzOff", "ice</a>&nbsp;"], i = "", t, n = 0; n < r.length; n++)
        i += r[n];
    jQuery("#copyrightmenu .dzzcopyright").length ? jQuery("#copyrightmenu .dzzcopyright").html(i + _config.version + (_config.space.adminid > 0 && _config.space.upgrade > 0 ? '<img src="dzz/images/default/new.gif" title="' + __lang.new_version + '" style="margin-bottom:10px;cursor:pointer" onclick="_notice.openUpgrade()">' : "")) : jQuery('<div class="dzzcopyright">' + i + _config.version + (_config.space.adminid > 0 && _config.space.upgrade > 0 ? '<img src="dzz/images/default/new.gif" title="' + __lang.new_version + '" style="margin-bottom:10px;cursor:pointer" onclick="_notice.openUpgrade()">' : "") + "</div>").appendTo("#copyrightmenu"),
    _notice.normalTitle = document.title,
    _notice.poll();
    jQuery("#tray_notification").on("click", function() {
        jQuery("#noticeContainer").toggle(),
        jQuery(this).find(".gb_I,.gb_H").toggle(),
        jQuery("#pop_noticeContainer").empty()
    });
    jQuery(document).on("mousedown.notice", function(n) {
        n = n ? n : window.event;
        var t = n.srcElement ? n.srcElement : n.target;
        checkInDom(t, "noticeContainer") == !1 && (jQuery("#noticeContainer").hide(),
        jQuery("#tray_notification").find(".gb_I,.gb_H").hide())
    });
    _notice.filterList();
    jQuery("#notice_filter").on("click", function() {
        return jQuery("#noticeContainer_body").toggle(),
        jQuery("#noticeContainer_filter").toggle(),
        jQuery("#filter_return").toggleClass("filter-return"),
        !1
    });
    jQuery("#filter_return").on("click", function() {
        jQuery("#noticeContainer_body").show(),
        jQuery("#noticeContainer_filter").hide(),
        jQuery("#filter_return").removeClass("filter-return")
    });
    jQuery("#notice_mute").on("click", function() {
        _notice.noDisturb > 0 ? (jQuery(this).removeClass("mute-on"),
        _notice.noDisturb = 0) : (jQuery(this).addClass("mute-on"),
        _notice.noDisturb = 1)
    });
    jQuery("#notice_clear").on("click", function() {
        _notice.noticelist = [],
        jQuery("#noticelist").empty(),
        _notice.setStorage(),
        _notice.setTips()
    });
    t = _notice.getStorage();
    if (t)
        for (n in t)
            _notice.createNotice(t[n])
}
,
_notice.setStorage = function() {
    _config.myuid > 0 && (!BROWSER.ie || BROWSER.ie && BROWSER.ie > 6) && jQuery.jStorage.set("_notice_list_" + VERHASH + "_" + _config.myuid, _notice.noticelist)
}
,
_notice.getStorage = function() {
    if (_config.myuid > 0 && (!BROWSER.ie || BROWSER.ie && BROWSER.ie > 6)) {
        var n = jQuery.jStorage.get("_notice_list_" + VERHASH + "_" + _config.myuid);
        if (n)
            return n
    }
    return ""
}
,
_notice.openUpgrade = function() {
    var t = 0, i = "", n;
    for (n in _config.sourcedata.app)
        if (_config.sourcedata.app[n].appurl.indexOf("?mod=system") !== -1) {
            t = _config.sourcedata.app[n].appid,
            i = _config.sourcedata.app[n].appurl;
            break
        }
    t && (OpenApp(t, "admin.php?mod=system&op=upgrade"),
    jQuery("#copyrightmenu").hide())
}
,
_notice.poll = function() {
    if (_config.myspace.uid < 1)
        return;
    _notice.polling = !0,
    jQuery.ajax({
        type: "post",
        cache: !1,
        url: DZZSCRIPT + "?mod=notification&op=ajax&do=poll&type=" + _notice.polltype + "&t=" + +new Date,
        dataType: "json",
        success: function(n) {
            n && n.msg == "success" ? (_notice.applyNotice(n.noticelist),
            n.noticelist.length ? _notice.delay_add = _notice.delay : _notice.delay_add += _notice.delay,
            _config.polling = !1,
            _notice.polltype == "short" ? window.setTimeout(function() {
                _notice.poll()
            }, _notice.delay_add) : _notice.poll()) : n.msg == "needlogin" ? (_notice.polling = !1,
            _login.logging()) : n.msg == "needrefresh" && (_notice.polling = !1,
            Alert(__lang.js_needrefresh, 3e3, function() {
                window.location.reload()
            }))
        },
        error: function() {
            _notice.polling = !1,
            _notice.error++,
            window.setTimeout(function() {
                _notice.poll()
            }, _notice.delay * _notice.error)
        }
    })
}
,
_notice.applyNotice = function(n) {
    for (var t in n)
        _notice.noDisturb < 1 && _notice.showNotice(n[t]),
        _notice.createNotice(n[t])
}
,
_notice.createNotice = function(n) {
    var i, t;
    n = _notice.setNoticelist(n);
    if (document.getElementById("notice_" + n.id)) {
        jQuery("#notice_" + n.id + " .content .title").html(n.title + "(" + n.from_num + ")");
        return
    }
    n.img = parseInt(n.category) > 0 ? "dzz/images/default/notice_system.png" : n.authorid > 0 ? "avatar.php?uid=" + n.authorid + "&size=middle" : _config.sourcedata.app[n.app] ? _config.sourcedata.app[n.app].appico : "dzz/images/b.gif",
    i = "",
    parseInt(n.from_num) > 1 && (i = "(" + n.from_num + ")"),
    t = "",
    t += '<div id="notice_' + n.id + '"  class="notice-item" nid="' + n.id + '">',
    t += '   <div class="imgContainer"><table width="100%" height="100%" cellpadding="0" cellspacing="0"><tr><td align="center" valign="middle"><img  src="' + n.img + '" onload="notice_image_resize(this)" style="max-width:none"></td></tr></table></div>',
    t += '   <div class="content">',
    t += '      \t<div class="title">' + n.title + i + "</div>",
    t += '         <div class="message">' + n.note + "</div>",
    t += "   </div>",
    t += '   <a class="close" onclick="_notice.setIsread(\'' + n.id + "')\"></a>",
    t += "</div>",
    jQuery(t).appendTo("#noticelist")
}
,
_notice.showNotice = function(n) {
    var r, i, t, u;
    n.img = parseInt(n.category) > 0 ? "dzz/images/default/notice_system.png" : n.authorid > 0 ? "avatar.php?uid=" + n.authorid + "&size=middle" : _config.sourcedata.app[n.app] ? _config.sourcedata.app[n.app].appico : "dzz/images/b.gif",
    r = "",
    parseInt(n.from_num) > 1 && (r = "(" + n.from_num + ")"),
    i = "",
    i += '<div id="pop_notice_' + n.id + '"  class="notice-item" nid="' + n.id + '">',
    i += '   <div class="imgContainer"><table width="100%" height="100%" cellpadding="0" cellspacing="0"><tr><td align="center" valign="middle"><img  src="' + n.img + '" onload="notice_image_resize(this)" style="max-width:none"></td></tr></table></div>',
    i += '   <div class="content">',
    i += '      \t<div class="title">' + n.title + r + "</div>",
    i += '         <div class="message">' + n.note + "</div>",
    i += "   </div>",
    i += '   <a class="close" onclick="jQuery(this).parent().remove()"></a>',
    i += "</div>",
    t = jQuery(i).appendTo("#pop_noticeContainer"),
    _config.space.taskbar == "left" ? (t.show().css({
        width: 0,
        height: 0,
        "float": "left"
    }),
    t.animate({
        width: 340,
        height: 80
    }, 500, function() {
        _notice.timer[n.id] = window.setTimeout(function() {
            t.animate({
                width: 0,
                height: 0
            }, 500, function() {
                t.remove()
            })
        }, 5e3)
    })) : _config.space.taskbar == "top" ? (t.show().css({
        width: 0,
        height: 0,
        "float": "right"
    }),
    t.animate({
        width: 340,
        height: 80
    }, 500, function() {
        _notice.timer[n.id] = window.setTimeout(function() {
            t.animate({
                width: 0,
                height: 0
            }, 500, function() {
                t.remove()
            })
        }, 5e3)
    })) : _config.space.taskbar == "right" ? (t.show().css({
        width: 0,
        height: 0,
        "float": "right"
    }),
    t.animate({
        width: 340,
        height: 80
    }, 500, function() {
        _notice.timer[n.id] = window.setTimeout(function() {
            t.animate({
                width: 0,
                height: 0
            }, 500, function() {
                t.remove()
            })
        }, 5e3)
    })) : _config.space.taskbar == "bottom" && (t.show().css({
        width: 0,
        height: 0,
        "float": "right"
    }),
    t.animate({
        width: 340,
        height: 80
    }, 500, function() {
        _notice.timer[n.id] = window.setTimeout(function() {
            t.animate({
                width: 0,
                height: 0
            }, 500, function() {
                t.remove()
            })
        }, 5e3)
    })),
    u = new Html5notification,
    u.issupport() && !CurrentActive && u.shownotification("notice_" + n.id, "", n.img, n.title + r, n.note1),
    CurrentActive || _notice.flashTitle(),
    _sound.play("notice")
}
,
_notice.flashStep = 1,
_notice.flashTitle = function() {
    if (CurrentActive) {
        document.title = _notice.normalTitle,
        _notice.flashTitleRun = !1;
        return
    }
    _notice.flashTitleRun = !0,
    _notice.flashStep++,
    _notice.flashStep == 3 && (_notice.flashStep = 1),
    _notice.flashStep == 1 && (document.title = "\u3010" + __lang.new_notifications + "\u3011"),
    _notice.flashStep == 2 && (document.title = "\u3010\u3000\u3000\u3000\u3000\u3000\u3000\u3011"),
    setTimeout(function() {
        _notice.flashTitle()
    }, 500)
}
,
_notice.setIsread = function(n) {
    jQuery("#pop_notice_" + n).remove(),
    jQuery("#notice_" + n).slideUp("fast", function() {
        jQuery(this).remove()
    });
    for (var t = 0; t < _notice.noticelist.length; t++)
        _notice.noticelist[t].id == n && (_notice.noticelist.splice(t, 1),
        _notice.setStorage());
    _notice.setTips()
}
,
_notice.setNoticelist = function(n, t) {
    var i;
    if (t) {
        for (i = 0; i < _notice.noticelist.length; i++)
            _notice.noticelist[i].id == n.id && _notice.noticelist.splice(i, 1);
        _notice.setStorage(),
        _notice.setTips()
    } else {
        for (i = 0; i < _notice.noticelist.length; i++)
            if (_notice.noticelist[i].id == n.id)
                return _notice.noticelist[i].from_num += n.from_num,
                _notice.noticelist[i];
        return _notice.noticelist.push(n),
        _notice.setStorage(),
        _notice.setTips(),
        n
    }
}
,
_notice.setTips = function() {
    var t = _notice.noticelist.length, n;
    t > 0 ? (n = t < 10 ? 1 : t < 100 ? 2 : t < 1e3 ? 3 : 4,
    jQuery("#tray_notification .taskbar_tips").length > 0 ? jQuery("#tray_notification .taskbar_tips").html('<span class="taskbar_tips_inner tips_size_' + n + '">' + t + "</span>") : jQuery("#tray_notification").append('<div class="taskbar_tips"><span class="taskbar_tips_inner tips_size_' + n + '">' + t + "</span></div>")) : (jQuery("#tray_notification .taskbar_tips").remove(),
    jQuery("#tray_notification").trigger("click"))
}
,
_notice.filterList = function() {
    var i = _config.sourcedata.app, r = _config.noticebanlist, n = "", t;
    for (t in i) {
        if (i[t].noticeurl == "")
            continue;
        n += '<div class="filter-item clearfix">',
        n += "<label>",
        n += jQuery.inArray(t, r) > -1 ? '    \t<div class="appsel"><input type="checkbox" name="ban_' + t + '"  value="' + t + '"   /></div>' : '    \t<div class="appsel"><input type="checkbox" name="ban_' + t + '" value="' + t + '"  checked /></div>',
        n += '        <div class="appinfo">',
        n += '       \t <span class="appico"><img class="img_16_16" src="' + i[t].appico + '" /></span><span class="appname">' + i[t].appname + "</span>",
        n += "        </div>",
        n += "    </label></div>"
    }
    jQuery("#filterlist").html(n).find("input").change(function() {
        _notice.filterChange()
    })
}
,
_notice.filterChange = function() {
    var n = ["0"];
    jQuery("#filterlist").find("input").each(function() {
        this.checked || n.push(jQuery(this).val())
    }),
    _config.noticebanlist = n,
    _config.saveItem.noticebanlist = 1,
    _config.saveTimer && window.clearTimeout(_config.saveTimer),
    _config.saveTimer = setTimeout(function() {
        _config.sendConfig()
    }, _config.savetime)
}
,
_config.isPower = function(n, t) {
    var i = {
        flag: 1,
        read1: 2,
        read2: 4,
        delete1: 8,
        delete2: 16,
        edit1: 32,
        edit2: 64,
        download1: 128,
        download2: 256,
        copy1: 512,
        copy2: 1024,
        upload: 2048,
        newtype: 4096,
        folder: 8192,
        link: 16384,
        dzzdoc: 32768,
        video: 65536,
        shortcut: 131072,
        share: 262144
    };
    return parseInt(i[t]) < 1 ? !1 : (n & parseInt(i[t])) > 0 ? !0 : !1
}
,
_config.FolderSPower = function(n, t) {
    var i = {
        "delete": 1,
        folder: 2,
        link: 4,
        upload: 8,
        document: 16,
        dzzdoc: 32,
        app: 64,
        widget: 128,
        user: 256,
        shortcut: 512,
        discuss: 1024,
        download: 2048
    };
    return t == "copy" && (t = "delete"),
    parseInt(i[t]) < 1 ? !0 : (n & parseInt(i[t])) == parseInt(i[t]) ? !1 : !0
}
,
_config.FileSPower = function(n, t) {
    var i = {
        "delete": 1,
        edit: 2,
        rename: 4,
        move: 8,
        download: 16,
        share: 32,
        widget: 64,
        wallpaper: 128,
        cut: 256,
        shortcut: 512
    };
    return t == "copy" && (t = "delete"),
    parseInt(i[t]) < 1 ? !0 : (n & parseInt(i[t])) == parseInt(i[t]) ? !1 : !0
}
,
_config.getFidByContainer = function(n) {
    return n.indexOf("icosContainer_body_") !== -1 ? _config.space.typefid.desktop : n == "taskbar_dock" ? _config.space.typefid.dock : n == "_dock" ? _config.space.typefid.dock : n.indexOf("icosContainer_folder_") !== -1 ? n.replace("icosContainer_folder_", "") : void 0
}
,
_config.getContainerByFid = function(n) {
    var i = "", r, t;
    for (r in _config.space.typefid)
        n == _config.space.typefid[r] && (i = r);
    return t = "",
    t = i == "dock" ? "_dock" : i == "desktop" ? "icosContainer_body_" + _layout.fid : "icosContainer_folder_" + n
}
,
_config.Permission_Container = function(n, t) {
    if (!_config.sourcedata.folder[t])
        return !1;
    var i = _config.sourcedata.folder[t].perm
      , u = _config.sourcedata.folder[t].fsperm
      , r = _config.sourcedata.folder[t].gid;
    if (!_config.FolderSPower(u, n))
        return !1;
    if (_config.myuid < 1)
        return !1;
    if (r > 0)
        return n == "admin" ? _config.space.self > 1 || _config.sourcedata.folder[t].ismoderator > 0 ? !0 : !1 : (n == "rename" ? n = "delete" : n == "multiselect" && (n = "copy"),
        jQuery.inArray(n, ["read", "delete", "edit", "download", "copy"]) > -1 && (n += _config.myuid == _config.sourcedata.folder[t].uid ? "1" : "2"),
        _config.isPower(i, n));
    if (n == "admin" || n == "multiselect") {
        if (_config.myuid == _config.sourcedata.folder[t].uid)
            return !0;
        if (_config.sourcedata.folder[t].bz)
            return !0
    }
    return n == "rename" && (n = "delete"),
    jQuery.inArray(n, ["read", "delete", "edit", "download", "copy"]) > -1 && (n += _config.myuid == _config.sourcedata.folder[t].uid ? "1" : "2"),
    _config.isPower(i, n)
}
,
_config.Permission = function(n, t) {
    if (_config.myuid < 1)
        return !1;
    if (t.isdelete > 0)
        return !0;
    var i = t.pfid
      , r = t.sperm;
    if (n == "download") {
        if (t.type != "document" && t.type != "attach" && t.type != "image" && t.type != "folder")
            return !1
    } else if (n == "copy") {
        if (t.flag == "recycle")
            return !1;
        if (t.type == "app" || t.type == "storage" || t.type == "pan" || t.type == "ftp")
            return !1
    } else if (n == "paste") {
        if (_config.cut.icos.length < 1)
            return !1;
        n = _config.sourcedata.icos[_config.cut.icos[0]].type
    } else {
        if (n == "chmod")
            return t.bz && t.bz.split(":")[0] == "ftp" ? !0 : !1;
        if (n == "rename") {
            if (i == _config.space.typefid.dock)
                return !1;
            if (t.type == "folder" && t.bz && (t.bz.split(":")[0] == "ALIOSS" || t.bz.split(":")[0] == "qiniu"))
                return !1;
            n = "delete"
        } else
            n == "multiselect" ? n = "copy" : n == "drag" && (n = t.gid > 0 ? "copy" : "admin")
    }
    return _config.FileSPower(r, n) ? (jQuery.inArray(n, ["read", "delete", "edit", "download", "copy"]) > -1 && (n += _config.myuid == t.uid ? "1" : "2"),
    _config.Permission_Container(n, i)) : !1
}
,
_config.Permission_Container_write = function(n, t) {
    if (!_config.sourcedata.folder[n])
        return !1;
    var r = _config.sourcedata.folder[n].fsperm
      , u = _config.sourcedata.folder[n].gid
      , i = t;
    jQuery.inArray(t, ["folder", "link", "dzzdoc", "shortcut", "video"]) < 0 && (i = "newtype");
    if (!_config.FolderSPower(r, i))
        return !1;
    if (_config.myuid < 1)
        return !1;
    if (u > 0) {
        if (_config.space.self > 1 || _config.sourcedata.folder[n].ismoderator > 0)
            return !0
    } else {
        if (_config.myuid == _config.sourcedata.folder[n].uid)
            return !0;
        if (_config.sourcedata.folder[n].bz)
            return !0
    }
    return _config.Permission_Container(i, n)
}
;
jQuery(document).on("contextmenu", ".jstree li", function(n) {
    var t = this.id.split("-")[1];
    return _contextmenu.jstree_right_ico(n ? n : window.event, t),
    !1
});
_filemanage.speed = 5,
_filemanage.perpage = 100,
_filemanage.cons = {},
_filemanage.view = 1,
_filemanage.disp = 0,
_filemanage.asc = 1,
_filemanage.detailper = [47, 10, 20, 15, 8],
_filemanage.onmousemove = null,
_filemanage.onmouseup = null,
_filemanage.onselectstart = 1,
_filemanage.stack_data = {},
_filemanage.showicosTimer = {},
_filemanage.apicacheTimer = {},
_filemanage.viewstyle = ["bigicon", "middleicon", "middlelist", "smalllist", "detaillist"],
_filemanage.glow = function(n) {
    for (var i = 200, t = 0; t < 4; t++)
        window.setTimeout(function() {
            n.find(".toggleGlow").toggleClass("glow")
        }, i * t)
}
,
_filemanage.Arrange = function(n, t) {
    var u = _filemanage.cons[n], r;
    u.view = parseInt(t),
    r = u.fid,
    r > 0 && _config.Permission_Container("admin", r) && jQuery.post(_config.saveurl + "&do=folder", {
        fid: r,
        iconview: parseInt(t)
    }),
    u.view = parseInt(t),
    _config.sourcedata.folder[r].iconview = parseInt(t),
    u.showIcos(),
    jQuery("#right_contextmenu .menu-icon-iconview").each(function() {
        jQuery(this).attr("view") == t ? jQuery(this).removeClass("icon-notselect").addClass("icon-select") : jQuery(this).addClass("icon-notselect").removeClass("icon-select")
    })
}
,
_filemanage.Disp = function(n, t, i) {
    if (!_window.windows[i].filemanageid)
        return;
    var r = _filemanage.cons[n]
      , u = r.fid;
    u > 0 && _config.Permission_Container("admin", u) && jQuery.post(_config.saveurl + "&do=folder", {
        fid: u,
        disp: parseInt(t)
    }),
    r.disp = parseInt(t),
    _config.sourcedata.folder[u].disp = parseInt(t),
    r.bz.indexOf("ALIOSS") === 0 || r.bz.indexOf("JSS") === 0 ? r.showIcos() : r.pageClick(1),
    jQuery("#right_contextmenu .menu-icon-disp").each(function() {
        jQuery(this).attr("disp") == t ? jQuery(this).removeClass("icon-notselect").addClass("icon-select") : jQuery(this).addClass("icon-notselect").removeClass("icon-select")
    })
}
,
_filemanage.searchsubmit = function(n) {
    var i = document.getElementById("searchInput_" + n).value, t;
    i == __lang.search && (i = "");
    if (!_window.windows[n].filemanageid)
        return;
    t = _filemanage.cons[_window.windows[n].filemanageid];
    if (!t)
        return;
    t.localsearch ? (t.keyword = i,
    t.showIcos()) : t.pageClick(1)
}
,
_filemanage.prototype.delIcos = function(n) {
    var i = this, r, t;
    containerid = "content_" + this.winid,
    r = jQuery("#icosContainer_" + containerid + "_" + this.id + " .Icoblock[icoid=" + n.icoid + "]"),
    r.remove();
    if (n.type == "folder")
        for (t in _filemanage.cons)
            _filemanage.cons[t].fid == n.pfid && (jQuery("#jstree_area_" + _filemanage.cons[t].winid).jstree("refresh", jQuery("#f-" + n.pfid + "-" + i.winid)),
            jQuery("#jstree_area_" + _filemanage.cons[t].winid).jstree("correct_state", jQuery("#f-" + n.pfid + "-" + i.winid)));
    delete this.data[n.icoid],
    delete this.currentdata["icos_" + n.icoid],
    this.sum--,
    this.total--,
    _filemanage.stack_run(this.winid)
}
,
_filemanage.prototype.reCreateIcos = function(n) {
    var r = this, u, f, t, i;
    containerid = "content_" + this.winid,
    this.data[n.icoid] = n,
    u = get_ico_template(this.view, n.type, n.ttype),
    f = !0,
    n.flag != "" ? (n.img = "dzz/styles/thame/" + _config.thame.system.folder + "/system/" + n.flag + ".png",
    n.error = "dzz/images/default/system/" + n.flag + ".png") : n.type == "folder" ? n.gid > 0 ? (n.icon || (n.icon = n.img),
    n.error = n.icon || "dzz/images/default/system/folder-read.png",
    n.img = n.icon ? n.icon.replace("dzz/images/default", "dzz/styles/thame/" + _config.thame.system.folder) : "dzz/styles/thame/" + _config.thame.system.folder + "/system/folder-read.png") : (n.icon || (n.icon = n.img),
    n.error = n.icon || "dzz/images/default/system/folder.png",
    n.img = n.icon ? n.icon.replace("dzz/images/default", "dzz/styles/thame/" + _config.thame.system.folder) : "dzz/styles/thame/" + _config.thame.system.folder + "/system/folder.png") : n.type == "shortcut" && n.ttype == "folder" ? n.tdata.gid > 0 ? (n.error = n.tdata.img || "dzz/images/default/system/folder-read.png",
    n.img = (n.tdata.img + "").replace("dzz/images/default", "dzz/styles/thame/" + _config.thame.system.folder)) : (n.error = n.tdata.img || "dzz/images/default/system/folder.png",
    n.img == n.tdata.img ? (n.tdata.img + "").replace("dzz/images/default", "dzz/styles/thame/" + _config.thame.system.folder) : "dzz/styles/thame/" + _config.thame.system.folder + "/system/folder.png") : n.error = "dzz/images/default/icodefault.png",
    t = u.replace(/\{name\}/g, n.name),
    t = t.replace(/\{icoid\}/g, n.icoid),
    t = t.replace(/\{ispng\}/g, f),
    t = t.replace(/\{img\}/g, n.img),
    t = t.replace(/\{username\}/g, n.username),
    t = t.replace(/\{replynum\}/g, n.replynum ? n.replynum : "0"),
    t = t.replace(/\{fdateline\}/g, n.fdateline),
    t = t.replace(/\{name\}/g, n.name),
    t = t.replace(/\{icoid\}/g, n.icoid),
    t = t.replace(/\{img\}/g, n.img),
    t = t.replace(/\{error\}/g, n.error),
    t = t.replace(/\{size\}/g, n.type == "folder" ? "" : n.fsize),
    t = t.replace(/\{type\}/g, n.ftype),
    t = t.replace(/\{dateline\}/g, n.fdateline);
    if (this.view < 4) {
        i = jQuery("#" + containerid + " .Icoblock[icoid=" + n.icoid + "]"),
        i.html(t);
        if (_config.Permission_Container("multiselect", this.fid)) {
            i.find(".icoblank_rightbottom").on("click", function() {
                var t = !0
                  , n = jQuery(this).parent()
                  , i = n.attr("icoid");
                return n.hasClass("Icoselected") && (t = !1),
                _select.SelectedStyle(n.parent().attr("id"), i, t, !0),
                !1
            });
            i.off("click").on("click", function(n) {
                var r = n.srcElement ? n.srcElement : n.target, t, i;
                return /input|textarea/i.test(r.tagName) ? !0 : (t = !0,
                _hotkey.ctrl && jQuery(this).hasClass("Icoselected") && (t = !1),
                i = _hotkey.ctrl ? !0 : !1,
                _select.SelectedStyle(jQuery(this).parent().attr("id"), jQuery(this).attr("icoid"), t, i),
                !1)
            })
        } else
            i.find(".icoblank_rightbottom").remove();
        i.find(".IcoText_div a,.icoimgContainer").on("click", function(t) {
            var i = t.srcElement ? t.srcElement : t.target;
            return /input|textarea/i.test(i.tagName) ? !0 : (n.type == "folder" ? jQuery("#jstree_area_" + r.winid).jstree("select_node", jQuery("#f-" + n.oid + "-" + r.winid), !0) : _ico.Open(n.icoid),
            dfire("click"),
            !1)
        })
    } else {
        i = jQuery("#" + containerid + " .Icoblock[icoid=" + n.icoid + "]"),
        i.replaceWith(t),
        i = jQuery("#" + containerid + " .Icoblock[icoid=" + n.icoid + "]");
        i.find(".detail_item_td_name").on("contextmenu", function(n) {
            return _contextmenu.right_ico(n ? n : window.event, jQuery(this).attr("icoid"), r.id, r.fid),
            !1
        });
        this.winid != "_W_openfile" && i.find(".detail_item_td_name").each(function() {
            _config.Permission("drag", _config.sourcedata.icos[jQuery(this).attr("icoid")]) && _Drag.init(jQuery(this).attr("icoid"), this, r.id, r.container)
        }),
        i.bind("mouseenter", function() {
            return jQuery(this).addClass("hover"),
            !1
        }),
        i.bind("mouseleave", function() {
            return jQuery(this).removeClass("hover"),
            !1
        });
        i.find(".detail_item_td_name a,.icoimgContainer").on("click", function(t) {
            var i = t.srcElement ? t.srcElement : t.target;
            return /input|textarea/i.test(i.tagName) ? !0 : (n.type == "folder" ? jQuery("#jstree_area_" + r.winid).jstree("select_node", jQuery("#f-" + n.oid + "-" + r.winid), !0) : _ico.Open(n.icoid),
            !1)
        });
        if (_config.Permission_Container("multiselect", this.fid)) {
            i.off("click").on("click", function(n) {
                var u, r, t, i;
                return n = n ? n : window.event,
                u = n.srcElement ? n.srcElement : n.target,
                /input|textarea/i.test(u.tagName) ? !0 : (r = jQuery(this).parent().parent().parent(),
                t = !0,
                _hotkey.ctrl && r.hasClass("Icoselected") && (t = !1),
                i = _hotkey.ctrl ? !0 : !1,
                _select.SelectedStyle(r.attr("id"), jQuery(this).attr("icoid"), t, i),
                !1)
            });
            i.find(".selectbox").on("click", function() {
                var n = !0
                  , i = jQuery(this).parent().attr("icoid")
                  , t = jQuery(this).parent().parent().parent().parent().parent().parent();
                return jQuery(this).parent().parent().parent().hasClass("Icoselected") && (n = !1),
                _select.SelectedStyle(t.attr("id"), i, n, !0),
                !1
            })
        }
    }
    if (this.view < 5)
        i.find(".icoblank_tip .icon").on("click", function() {
            return this.onclick,
            !1
        });
    this.currentdata["icos_" + n.icoid] = n,
    n.type == "folder" && jQuery("#jstree_area_" + r.winid).jstree("refresh", jQuery("#f-" + n.pfid + "-" + r.winid))
}
,
_filemanage.prototype.filterOPIcon = function(n, t) {
    return (n.bz && n.bz != "" || _config.myuid < 1) && (t = t.replace(/\{like\}(.+?)\{\/like\}/g, "")),
    _config.Permission("download", this.container, n) || (t = t.replace(/\{download\}(.+?)\{\/download\}/g, "")),
    (n.bz && n.bz != "" || !_config.Permission("share", this.container, n)) && (t = t.replace(/\{share\}(.+?)\{\/share\}/g, "")),
    (_config.gid < 1 || n.bz && n.bz != "" || !_config.Permission("saveto", this.container, n)) && (t = t.replace(/\{saveto\}(.+?)\{\/saveto\}/g, "")),
    _config.space.typefid.recycle == this.fid && (t = t.replace(/\{\w+\}(.+?)\{\/\w+\}/g, "")),
    t = t.replace(/\{\w+\}/g, ""),
    t = t.replace(/\{\/\w+\}/g, "")
}
,
_filemanage.prototype.CreateIcos = function(n, t) {
    var u = this, e, o, i, f, r;
    containerid = "content_" + this.winid;
    if (!t && this.data[n.icoid]) {
        r = jQuery("#" + containerid + " .Icoblock[icoid=" + n.icoid + "]"),
        _filemanage.glow(r);
        return
    }
    n.type == "folder" && this.fid != _config.space.typefid.recycle && (document.getElementById("f-" + n.oid + "-" + this.winid) || jQuery("#jstree_area_" + this.winid).jstree("refresh", jQuery("#f-" + n.pfid + "-" + u.winid))),
    this.data[n.icoid] = n,
    e = get_ico_template(this.view, n.type, n.ttype),
    o = !0,
    n.flag != "" ? (n.img = "dzz/styles/thame/" + _config.thame.system.folder + "/system/" + n.flag + ".png",
    n.error = "dzz/images/default/system/" + n.flag + ".png") : n.type == "folder" ? n.gid > 0 ? (n.icon || (n.icon = n.img),
    n.error = n.icon || "dzz/images/default/system/folder-read.png",
    n.img = n.icon ? n.icon.replace("dzz/images/default", "dzz/styles/thame/" + _config.thame.system.folder) : "dzz/styles/thame/" + _config.thame.system.folder + "/system/folder-read.png") : (n.icon || (n.icon = n.img),
    n.error = n.icon || "dzz/images/default/system/folder.png",
    n.img = n.icon ? n.icon.replace("dzz/images/default", "dzz/styles/thame/" + _config.thame.system.folder) : "dzz/styles/thame/" + _config.thame.system.folder + "/system/folder.png") : n.type == "shortcut" && n.ttype == "folder" ? n.tdata.gid > 0 ? (n.error = n.tdata.img || "dzz/images/default/system/folder-read.png",
    n.img = (n.tdata.img + "").replace("dzz/images/default", "dzz/styles/thame/" + _config.thame.system.folder)) : (n.error = n.tdata.img || "dzz/images/default/system/folder.png",
    n.img == n.tdata.img ? (n.tdata.img + "").replace("dzz/images/default", "dzz/styles/thame/" + _config.thame.system.folder) : "dzz/styles/thame/" + _config.thame.system.folder + "/system/folder.png") : n.error = "dzz/images/default/icodefault.png",
    i = e.replace(/\{name\}/g, n.name),
    i = i.replace(/\{icoid\}/g, n.icoid),
    i = i.replace(/\{ispng\}/g, o),
    i = i.replace(/\{img\}/g, n.img),
    i = i.replace(/\{username\}/g, n.username),
    i = i.replace(/\{replynum\}/g, n.replynum ? n.replynum : "0"),
    i = i.replace(/\{fdateline\}/g, n.fdateline),
    i = i.replace(/\{name\}/g, n.name),
    i = i.replace(/\{icoid\}/g, n.icoid),
    i = i.replace(/\{img\}/g, n.img),
    i = i.replace(/\{error\}/g, n.error),
    i = i.replace(/\{size\}/g, n.type == "folder" || n.type == "app" || n.type == "shortcut" ? "" : n.fsize),
    i = i.replace(/\{type\}/g, n.ftype),
    i = i.replace(/\{dateline\}/g, n.fdateline);
    if (this.view < 4) {
        f = "file-icoitem " + _filemanage.viewstyle[this.view],
        r = jQuery('<div id="folder_Icoblock_' + n.icoid + '" icoid="' + n.icoid + '" oid="' + n.oid + '"  class="' + f + ' Icoblock  ">' + i + "</div>").appendTo("#icosContainer_inner_" + containerid + "_" + this.id),
        r.addTouch(),
        _config.icosTips[n.icoid] > 0 && _ico.setTip(n.icoid, _config.icosTips[n.icoid]),
        this.winid != "_W_openfile" && _config.Permission("drag", n) && _Drag.init(n.icoid, r.get(0), u.id, u.container);
        r.on("contextmenu", function(n) {
            return _contextmenu.right_ico(n ? n : window.event, jQuery(this).attr("icoid"), u.id, u.fid),
            !1
        });
        r.on("mouseenter", function() {
            jQuery(this).addClass("hover")
        });
        r.on("mouseleave", function() {
            jQuery(this).removeClass("hover")
        });
        if (this.winid == "_W_openfile") {
            if (_config.Permission_Container("multiselect", this.fid) && _file.params.multiple && _file.type != "save" && _file.type != "saveto")
                r.find(".icoblank_rightbottom").on("click", function() {
                    var t = !0
                      , n = jQuery(this).parent()
                      , i = n.attr("icoid");
                    return n.hasClass("Icoselected") && (t = !1),
                    _select.SelectedStyle(n.parent().attr("id"), i, t, !0),
                    !1
                });
            r.on("dblclick", function() {
                return _select.SelectedStyle(jQuery(this).parent().attr("id"), jQuery(this).attr("icoid"), !0, !1),
                _window.windows._W_openfile.OnOK(),
                !1
            });
            r.on("click", function(n) {
                var r = n.srcElement ? n.srcElement : n.target, t, i;
                return /input|textarea/i.test(r.tagName) ? !0 : (t = !0,
                _hotkey.ctrl && jQuery(this).hasClass("Icoselected") && (t = !1),
                i = _hotkey.ctrl && _file.params.multiple && _file.type != "save" && _file.type != "saveto" ? !0 : !1,
                _select.SelectedStyle(jQuery(this).parent().attr("id"), jQuery(this).attr("icoid"), t, i),
                !1)
            });
            r.find(".IcoText_div a,.icoimgContainer").on("click", function(t) {
                var i = t.srcElement ? t.srcElement : t.target;
                if (/input|textarea/i.test(i.tagName))
                    return !0;
                if (n.type == "folder")
                    jQuery("#jstree_area_" + u.winid).jstree("select_node", jQuery("#f-" + n.oid + "-" + u.winid), !0);
                else
                    return !0;
                return dfire("click"),
                !1
            })
        } else {
            if (_config.Permission_Container("multiselect", this.fid)) {
                r.find(".icoblank_rightbottom").on("click", function() {
                    var t = !0
                      , n = jQuery(this).parent()
                      , i = n.attr("icoid");
                    return n.hasClass("Icoselected") && (t = !1),
                    _select.SelectedStyle(n.parent().attr("id"), i, t, !0),
                    !1
                });
                r.on("click", function(n) {
                    var r = n.srcElement ? n.srcElement : n.target, t, i;
                    return /input|textarea/i.test(r.tagName) ? !0 : (t = !0,
                    _hotkey.ctrl && jQuery(this).hasClass("Icoselected") && (t = !1),
                    i = _hotkey.ctrl ? !0 : !1,
                    _select.SelectedStyle(jQuery(this).parent().attr("id"), jQuery(this).attr("icoid"), t, i),
                    !1)
                })
            } else
                r.find(".icoblank_rightbottom").remove();
            r.find(".IcoText_div a,.icoimgContainer").on("click", function(t) {
                var i = t.srcElement ? t.srcElement : t.target;
                return /input|textarea/i.test(i.tagName) ? !0 : (n.type == "folder" ? jQuery("#jstree_area_" + u.winid).jstree("select_node", jQuery("#f-" + n.oid + "-" + u.winid), !0) : _ico.Open(n.icoid),
                dfire("click"),
                !1)
            })
        }
    } else {
        r = jQuery(i).appendTo("#detail_inner_" + containerid + "_" + this.id + " table"),
        r.addTouch();
        r.find(".detail_item_td_name").on("contextmenu", function(n) {
            return _contextmenu.right_ico(n ? n : window.event, jQuery(this).attr("icoid"), u.id, u.fid),
            !1
        });
        this.winid != "_W_openfile" && r.find(".detail_item_td_name").each(function() {
            _config.Permission("drag", _config.sourcedata.icos[jQuery(this).attr("icoid")]) && _Drag.init(jQuery(this).attr("icoid"), this, u.id, u.container)
        }),
        r.bind("mouseenter", function() {
            return jQuery(this).addClass("hover"),
            !1
        }),
        r.bind("mouseleave", function() {
            return jQuery(this).removeClass("hover"),
            !1
        });
        r.find(".detail_item_td_name a,.icoimgContainer").on("click", function(t) {
            var i = t.srcElement ? t.srcElement : t.target;
            if (/input|textarea/i.test(i.tagName))
                return !0;
            if (n.type == "folder")
                jQuery("#jstree_area_" + u.winid).jstree("select_node", jQuery("#f-" + n.oid + "-" + u.winid), !0);
            else {
                if (u.winid == "_W_openfile")
                    return !0;
                _ico.Open(n.icoid)
            }
            return !1
        });
        r.on("click", function(n) {
            var f, i, r, t;
            return n = n ? n : window.event,
            f = n.srcElement ? n.srcElement : n.target,
            /input|textarea/i.test(f.tagName) ? !0 : (i = jQuery(this).parent().parent().parent(),
            r = !0,
            _hotkey.ctrl && i.hasClass("Icoselected") && (r = !1),
            t = _hotkey.ctrl && (u.winid != "_W_openfile" || u.winid == "_W_openfile" && _file.params.multiple && _file.type != "save" && _file.type != "saveto") ? !0 : !1,
            t = _hotkey.ctrl ? !0 : !1,
            _select.SelectedStyle(i.attr("id"), jQuery(this).attr("icoid"), r, t),
            !1)
        });
        if (_config.Permission_Container("multiselect", this.fid) && (u.winid != "_W_openfile" || u.winid == "_W_openfile" && _file.params.multiple && _file.type != "save" && _file.type != "saveto"))
            r.find(".selectbox").on("click", function() {
                var n = !0
                  , i = jQuery(this).parent().attr("icoid")
                  , t = jQuery(this).parent().parent().parent().parent().parent().parent();
                return jQuery(this).parent().parent().parent().hasClass("Icoselected") && (n = !1),
                _select.SelectedStyle(t.attr("id"), i, n, !0),
                !1
            })
    }
    if (this.view < 5)
        r.find(".icoblank_tip .icon").on("click", function() {
            return this.onclick,
            !1
        });
    t || (_filemanage.glow(r),
    this.sum++,
    this.total++,
    jQuery("#" + containerid).scrollTop(9999999),
    this.currentdata["icos_" + n.icoid] = n,
    n.type == "folder" && jQuery("#jstree_area_" + u.winid).jstree("refresh", jQuery("#f-" + n.pfid + "-" + u.winid)))
}
,
_filemanage.prototype.showIcos = function(n) {
    var r = this, i, u, e, t, f;
    _filemanage.showicosTimer[this.winid] && window.clearTimeout(_filemanage.showicosTimer[this.winid]),
    _window.windows[this.winid].filemanageid = this.id,
    i = "content_" + this.winid,
    jQuery("#" + i).empty(),
    this.createHeader(),
    this.createIcosContainer(),
    this.createBottom(),
    _config.Permission_Container("upload", this.fid) && (u = this.folderdata.bz && this.folderdata.bz != "" ? encodeURIComponent(this.folderdata.path) : this.folderdata.fid,
    document.getElementById("input_icosContainer_folder_" + this.folderdata.fid) ? jQuery("#input_icosContainer_folder_" + this.folderdata.fid).off() : jQuery('<input type="file" id="input_icosContainer_folder_' + this.folderdata.fid + '" style="position: absolute; z-index: -999999; width: 1px; height: 1px; border: medium none;" multiple="multiple" name="files[]">').appendTo("body"),
    _layout.createUpload("input_icosContainer_folder_" + this.folderdata.fid, "icosContainer_folder_" + u, jQuery("#icosContainer_" + i + "_" + this.id), jQuery("#icosContainer_" + i + "_" + this.id))),
    e = jQuery("#icosContainer_" + i + "_" + this.id),
    this.keyword ? (t = Sort(Search(this.data, this.keyword), this.disp, this.asc),
    jQuery("#searchInput_" + this.winid).val(this.keyword)) : t = Sort(this.data, this.disp, this.asc),
    n && (t = _file.Searchext(t, n)),
    this.currentdata = t,
    _filemanage.stack_data[r.winid] = Array();
    for (f in t)
        _filemanage.stack_data[r.winid].push({
            data: t[f],
            obj: r
        });
    window.setTimeout(function() {
        _filemanage.stack_run(r.winid)
    }, 1),
    jQuery("#filemanage_view" + this.winid).attr("class", "filemanage_view" + this.view + "_1"),
    this.pageloadding = !1
}
,
_filemanage.prototype.appendIcos = function(n) {
    var t = this, i;
    _filemanage.showicosTimer[this.winid] && window.clearTimeout(_filemanage.showicosTimer[this.winid]),
    _filemanage.stack_data[t.winid] = Array();
    for (i in n)
        _filemanage.stack_data[t.winid].push({
            data: n[i],
            obj: t
        });
    window.setTimeout(function() {
        _filemanage.stack_run(t.winid)
    }, 1),
    this.pageloadding = !1
}
,
_filemanage.prototype.createHeader = function() {
    var r = this, i = document.createElement("div"), u, n, t;
    for (i.className = "filemanage-header clearfix",
    i.id = "header_content_" + this.winid + "_" + this.id,
    document.getElementById("content_" + this.winid).appendChild(i),
    u = _window.windows[this.winid],
    n = "",
    n += '<ul class="nav nav-pills nav-pills-bottomguide clearfix">',
    n += '<div class="treeshow-guide" id="treeshow_' + this.winid + '" style="line-height:35px" onclick="_filemanage.treeshow(\'' + this.winid + '\')"><a href="javascript:;" class="treeshow-guide-left"></a></div>',
    n += '  <div class="input-group input-group-sm pull-left" style="width:130px;padding:3px 0 2px 0"><a href="javascript:;" class="input-group-addon" onclick="_filemanage.searchsubmit(\'' + this.winid + '\');jQuery(this).trigger(\'blur\');return false"><i class="glyphicon glyphicon-search"></i></a><input class="form-control" id="searchInput_' + this.winid + '" type="text" placeholder="' + __lang.search + '" onkeydown="if(event.keyCode==13){_filemanage.searchsubmit(\'' + this.winid + "');jQuery(this).trigger('blur');}\"  onblur=\"if(this.value==''){this.value='" + __lang.search + "';}\" onfocus=\"if(this.value=='" + __lang.search + "'){this.value='';}else{this.select();};dbind(this.id,'blur');\"></div>",
    n += '  <li class="dropdown pull-right">',
    n += '\t\t<a href="#" data-toggle="dropdown" class="dropdown-toggle"><span>' + __lang.arr_filemanage.disp[this.disp] + '</span> <b class="caret"></b></a>',
    n += '\t\t<ul class="dropdown-menu">',
    t = 0; t < 4; t++)
        n += '\t   \t <li><a href="#" onClick="_filemanage.Disp(\'' + this.id + "','" + t + "','" + this.winid + "')\">" + __lang.arr_filemanage.disp[t] + "</a></li>";
    for (n += "\t\t</ul>",
    n += "  </li>",
    n += '  <li class="dropdown pull-right">',
    n += '\t\t<a href="#" data-toggle="dropdown" class="dropdown-toggle"><span>' + __lang.arr_filemanage.view[this.view] + '</span> <b class="caret"></b></a>',
    n += '\t\t<ul class="dropdown-menu">',
    t = 0; t < 5; t++)
        n += '\t   \t <li><a href="#" onClick="_filemanage.Arrange(\'' + this.id + "','" + t + "','" + this.winid + "')\">" + __lang.arr_filemanage.view[t] + "</a></li>";
    n += "\t\t</ul>",
    n += "  </li>",
    this.fid != _config.space.typefid.recycle ? ((_config.Permission_Container("link", this.fid) || _config.Permission_Container("dzzdoc", this.fid) || _config.Permission_Container("newtype", this.fid) || _config.Permission_Container("folder", this.fid)) && (n += '  <li class="dropdown pull-right">',
    n += '\t\t<a href="#" data-toggle="dropdown" class="dropdown-toggle">' + __lang.create + ' <b class="caret"></b></a>',
    n += '\t\t<ul class="dropdown-menu">',
    _config.Permission_Container("folder", this.fid) && (n += "\t    <li><a href=\"#\" onclick=\"_ico.NewIco('Newfolder','" + this.fid + "');dfire('click')\">" + __lang.folderTabs.NEWFOLDER + "</a></li>",
    n += '\t    <li role="separator" class="divider" style="margin: 5px 0;"></li>'),
    _config.Permission_Container("link", this.fid) && (n += "\t    <li><a href=\"#\" onclick=\"_ico.NewIco('Newlink','" + this.fid + "');dfire('click')\">" + __lang.folderTabs.NEWLINK + "</a></li>"),
    _config.Permission_Container("dzzdoc", this.fid) && (n += "\t    <li><a href=\"#\" onclick=\"_ico.NewIco('NewDzzDoc','" + this.fid + "','" + this.id + "');dfire('click')\">" + __lang.folderTabs.NEWDZZDOC + "</a></li>"),
    _config.Permission_Container("newtype", this.fid) && (n += "\t    <li><a href=\"#\" onclick=\"_ico.NewIco('NewTxt','" + this.fid + "','" + this.id + "');dfire('click')\">" + __lang.folderTabs.NEWTXT + "</a></li>"),
    _config.Permission_Container("newtype", this.fid) && (n += '\t    <li role="separator" class="divider" style="margin: 5px 0;"></li>',
    n += "\t    <li><a href=\"#\" onclick=\"_ico.NewIco('newdoc','" + this.fid + "','" + this.id + '\');dfire(\'click\')"><img src="dzz/images/icons/docx.png" style="margin:-2px 5px 0 -15px" />' + __lang.folderTabs.NEWDOC + "</a></li>",
    n += "\t    <li><a href=\"#\" onclick=\"_ico.NewIco('newexcel','" + this.fid + "','" + this.id + '\');dfire(\'click\')"><img src="dzz/images/icons/xlsx.png" style="margin:-2px 5px 0 -15px" />' + __lang.folderTabs.NEWEXCEL + "</a></li>",
    n += "\t    <li><a href=\"#\" onclick=\"_ico.NewIco('newpowerpoint','" + this.fid + "','" + this.id + '\');dfire(\'click\')"><img src="dzz/images/icons/pptx.png" style="margin:-2px 5px 0 -15px" />' + __lang.folderTabs.NEWPOWERPOINT + "</a></li>"),
    n += "\t\t</ul>",
    n += "  </li>"),
    _config.Permission_Container("upload", this.fid) && (n += '  <li class="pull-right" style="position:relative;overflow:hidden;"><a id="buttonContainer_input_icosContainer_folder_' + this.fid + '" href="#" >' + __lang.folderTabs.UPLOAD + "</a></li>")) : _config.Permission_Container("admin", this.fid) && (n += '  <li class="pull-right"><a href="#" onclick="_ico.Empty(\'' + this.fid + "');return false\">" + __lang.empty_recycle + "</a></li>"),
    n += "</ul>",
    i.innerHTML = n,
    _config.Permission_Container("upload", this.fid) && (BROWSER.ie ? (jQuery('<input id="button_input_icosContainer_folder_' + this.fid + '" name="files[]" tabIndex="-1" style="position: absolute;outline:none; filter: alpha(opacity=0); PADDING-BOTTOM: 0px; margin: 0px; padding-left: 0px; padding-right: 0px; font-family: Arial; font-size: 14px; top: 0px; cursor: pointer; right: 0px; padding-top: 0px; opacity: 0;direction:ltr;background-image:none" type="file" multiple="multiple">').appendTo("#buttonContainer_input_icosContainer_folder_" + this.fid),
    _layout.createUpload("button_input_icosContainer_folder_" + this.fid, "icosContainer_folder_" + encodeURIComponent(this.folderdata.path), null, null, 2097152)) : jQuery("#buttonContainer_input_icosContainer_folder_" + this.fid).get(0).onclick = function() {
        jQuery("#input_icosContainer_folder_" + r.fid).trigger("click")
    }
    ),
    jQuery(i).find(".dropdown-menu li a").click(function() {
        jQuery(this).parent().parent().parent().find(".dropdown-toggle span").html(this.innerHTML)
    }),
    document.getElementById("searchInput_" + this.winid).value = this.keyword && this.keyword != __lang.search ? this.keyword : __lang.search,
    _window.windows[this.winid].right_minWidth + jQuery("#jstree_area_" + this.winid).width() > _window.windows[this.winid].width && _window.windows[this.winid].ResizeTo(_window.windows[this.winid].right_minWidth + jQuery("#jstree_area_" + this.winid).width(), _window.windows[this.winid].bodyHeight)
}
,
_filemanage.prototype.createIcosContainer = function() {
    var n = this, i = "content_" + this.winid, r = document.createElement("div"), t, u;
    r.className = "icosContainer",
    r.id = "icosContainer_content_" + this.winid + "_" + this.id,
    r.setAttribute("unselectable", "on"),
    r.setAttribute("onselectstart", "return event.srcElement.type== 'text';"),
    r.innerHTML = '<div id="icosContainer_inner_' + i + "_" + this.id + '" class="icosContainer_inner clearfix"></div>';
    jQuery(r).on("contextmenu", function(t) {
        return _contextmenu.right_folder(t ? t : window.event, n.winid),
        !1
    });
    document.getElementById("content_" + this.winid).appendChild(r),
    jQuery("#icosContainer_" + i + "_" + this.id).css("height", _window.windows[this.winid].bodyHeight - (jQuery("#header_" + i + "_" + this.id).outerHeight(!0) | 0) - (jQuery("#right_bottom").outerHeight(!0) | 0));
    if (this.view < 4) {
        jQuery(r).scroll(function() {
            if (jQuery("#icosContainer_" + i + "_" + n.id + " .Icoblock").last().offset().top - jQuery("#icosContainer_" + i + "_" + n.id).offset().top < jQuery("#icosContainer_" + i + "_" + n.id).height()) {
                if (n.currentpage >= n.totalpage || n.pageloadding)
                    return;
                n.pageloadding = !0,
                n.currentpage++,
                n.pageClick(n.currentpage)
            }
        }),
        _config.Permission_Container("multiselect", this.fid) && (this.winid != "_W_openfile" || this.winid == "_W_openfile" && _file.params.multiple) && _select.init("icosContainer_inner_" + i + "_" + this.id);
        jQuery(r).on("click", function(t) {
            var u, i;
            t = t ? t : window.event,
            u = t.srcElement ? t.srcElement : t.target;
            if (/input|textarea/i.test(u.tagName))
                return !0;
            i = this.id.replace("icosContainer_", "icosContainer_inner_"),
            i == _config.selectall.container && (_config.selectall.container = i,
            _config.selectall.icos = [],
            _config.selectall.position = {},
            jQuery(r).find(".Icoblock").removeClass("Icoselected")),
            jQuery("#bottom_content_" + n.winid + "_" + n.id).hide(),
            dfire("click")
        })
    } else {
        t = "",
        t += '<table class="table " width="100%" border="0"   style="table-layout:fixed;margin:0">',
        t += '<thead class="detail_header_tr">',
        t += '<th class="detail_header_select" width="40">',
        t += '<div class="detail_header_td_div">',
        t += '<a class="selectbox" icoid="{icoid}" title="' + __lang.select_all + '"></a>',
        t += "</div>",
        t += "</th>",
        t += '<th disp="0" class=" detail_header detail_header_0 ' + (this.disp == 0 ? "detail_header_hover" : "") + '" width="' + this.detailper[0] + '%">',
        t += '<div class="detail_header_td_div">',
        t += '<span class="detail_header_title">' + __lang.js_detail.name + "</span>",
        t += '<div disp="0"  class="detail_header_drag" ></div>',
        this.disp == 0 && (t += '<a class="detail_header_asc detail_header_asc_' + this.asc + '" style="display:inline-block;" ></a>'),
        t += "</div>",
        t += "</th>",
        t += '<th disp="1" class=" detail_header detail_header_1 ' + (this.disp == 1 ? "detail_header_hover" : "") + '"  width="' + this.detailper[1] + '%">',
        t += '<div class="detail_header_td_div">',
        t += '<span class="detail_header_title">' + __lang.js_detail.size + "</span>",
        this.disp == 1 && (t += '<a class="detail_header_asc detail_header_asc_' + this.asc + '" style="display:inline-block;" ></a>'),
        t += '<div disp="1"  class="detail_header_drag" ></div>',
        t += "</div>",
        t += "</th>",
        t += '<th disp="2" class=" detail_header detail_header_2 ' + (this.disp == 2 ? "detail_header_hover" : "") + '"  width="' + this.detailper[2] + '%">',
        t += '<div class="detail_header_td_div">',
        t += '<span class="detail_header_title">' + __lang.js_detail.type + "</span>",
        this.disp == 2 && (t += '<a class="detail_header_asc detail_header_asc_' + this.asc + '" style="display:inline-block;" ></a>'),
        t += '<div disp="2"  class="detail_header_drag" style="float:right" ></div>',
        t += "</div>",
        t += "</th>",
        t += '<th disp="3" class=" detail_header detail_header_3 ' + (this.disp == 3 ? "detail_header_hover" : "") + '"  width="' + this.detailper[3] + '%">',
        t += '<div class="detail_header_td_div">',
        t += '<span class="detail_header_title">' + __lang.js_detail.dateline + "</span>",
        this.disp == 3 && (t += '<a class="detail_header_asc detail_header_asc_' + this.asc + '" style="display:inline-block;" ></a>'),
        t += "</div>",
        t += "</th>",
        t += "</thead>",
        t += "</table>",
        u = "",
        u += '<table class="table " width="100%" border="0"   style="table-layout:fixed;margin:0"><tbody>';
        var e = "</tbody></table>"
          , s = ""
          , o = jQuery('<div class="filemanage-detail-header ">' + t + "</div>").appendTo("#icosContainer_inner_" + i + "_" + this.id)
          , f = jQuery('<div id="detail_' + i + "_" + this.id + '" style="height:' + (jQuery("#icosContainer_inner_" + i + "_" + this.id).height() - o.height()) + 'px;overflow-x:hidden;overflow-y:auto"><div id="detail_inner_' + i + "_" + this.id + '">' + u + s + e + "</div></div>").appendTo("#icosContainer_inner_" + i + "_" + this.id);
        jQuery("#icosContainer_" + i + "_" + this.id).css("overflow", "hidden"),
        jQuery("#detail_" + i + "_" + this.id).scroll(function() {
            if (jQuery("#detail_" + i + "_" + n.id + " .detail_tr").last().offset().top - jQuery("#icosContainer_" + i + "_" + n.id).offset().top < jQuery("#icosContainer_" + i + "_" + n.id).height()) {
                if (n.currentpage >= n.totalpage || n.pageloadding)
                    return;
                n.pageloadding = !0,
                n.currentpage++,
                n.pageClick(n.currentpage)
            }
        }),
        _config.Permission_Container("multiselect", this.fid) ? _select.init("detail_inner_" + i + "_" + this.id) : jQuery("#icosContainer_" + i + "_" + this.id).find(".detail_header_select").remove();
        f.on("click", function(t) {
            t = t ? t : window.event;
            var r = t.srcElement ? t.srcElement : t.target;
            if (/input|textarea/i.test(r.tagName))
                return !0;
            this.id == _config.selectall.container && (_config.selectall.container = this.id,
            _config.selectall.icos = [],
            _config.selectall.position = {},
            jQuery(f).find(".Icoblock").removeClass("Icoselected"),
            jQuery("#icosContainer_" + i + "_" + n.id).find(".detail_header_select").removeClass("Icoselected")),
            jQuery("#bottom_content_" + n.winid + "_" + n.id).hide(),
            dfire("click")
        });
        jQuery("#icosContainer_" + i + "_" + this.id).find(".detail_header_select").on("click", function() {
            var r = jQuery(this)
              , t = !0;
            r.hasClass("Icoselected") ? (r.removeClass("Icoselected"),
            t = !1,
            _config.selectall.icos = []) : (r.addClass("Icoselected"),
            t = !0,
            _config.selectall.icos = []),
            _config.selectall.container = "detail_" + i + "_" + n.id,
            jQuery("#detail_" + i + "_" + n.id).find(".Icoblock").each(function() {
                t ? (jQuery(this).addClass("Icoselected"),
                _config.selectall.icos.push(jQuery(this).attr("icoid"))) : jQuery(this).removeClass("Icoselected")
            }),
            n.selectInfo()
        });
        jQuery("#icosContainer_" + i + "_" + this.id).find(".detail_header:not(.detail_header_select)").on("click", function() {
            var t = parseInt(jQuery(this).attr("disp"));
            t * 1 == n.disp * 1 ? n.asc = n.asc > 0 ? 0 : 1 : (_filemanage.Disp(n.id, t, n.winid),
            n.asc = 1),
            n.disp = t,
            _config.sourcedata.folder[n.fid].disp = t,
            n.bz.indexOf("ALIOSS") === 0 || n.bz.indexOf("JSS") === 0 ? n.showIcos() : n.pageClick(1)
        })
    }
}
,
_filemanage.treeshow = function(n) {
    var t = _window.windows[n];
    t.treeHide(!t.treeshow)
}
,
_filemanage.prototype.createBottom = function() {
    var n = document.createElement("div");
    n.className = "filemanage-bottom",
    n.id = "bottom_content_" + this.winid + "_" + this.id,
    document.getElementById("content_" + this.winid).appendChild(n)
}
,
_filemanage.prototype.selectInfo = function() {
    var n = this;
    this.selectinfoTimer && window.clearTimeout(this.selectinfoTimer),
    this.selectinfoTimer = window.setTimeout(function() {
        n._selectInfo()
    }, 200)
}
,
_filemanage.prototype._selectInfo = function() {
    var f, u, e, r;
    this.bottomShowTimer && window.clearTimeout(this.bottomShowTimer),
    f = _config.selectall.icos.length;
    if (f < 1)
        this.PageInfo();
    else if (f == 1) {
        var i = _config.selectall.icos[0]
          , t = this.data[i]
          , n = "";
        n += '<ul class="nav nav-pills nav-pills-bottomguide clearfix">',
        u = _ico.getExtOpen(t.type == "shortcut" ? t.tdata : t);
        if (u === !0 || u.length == 1)
            n += '<li ><a href="javascript:;" onClick="_ico.Open(\'' + i + "')\">" + __lang.open + "</a></li>";
        else if (u.length > 1) {
            for (n += '<li class="dropdown">',
            n += '\t\t<a class="dropdown-toggle" data-toggle="dropdown" href="#"><span>' + __lang.open_mode + '</span> <b class="caret"></b></a>',
            n += '\t\t<ul class="dropdown-menu">',
            r = 0; r < u.length; r++)
                n += "\t\t\t<li><a onClick=\"_ico.Open('" + i + "','" + u[r].extid + '\')" href="#">' + u[r].name + "</a></li>";
            n += "\t\t\t<li><a onClick=\"_ico.setOpenDefault('" + i + '\');" href="#">' + __lang.set_default_open + "</a></li>",
            n += "\t\t</ul>",
            n += "</li>"
        }
        _config.Permission("download", t) && (n += '<li ><a href="javascript:;" onClick="_ico.downAttach(\'' + i + "')\">" + __lang.download + "</a></li>"),
        _config.Permission("delete", t) && (n += '<li ><a href="javascript:;" onClick="_ajax.delIco(\'' + i + "')\">" + __lang.delete + "</a></li>"),
        n += '<li ><a href="javascript:;" onClick="_ico.property(\'' + i + "')\">" + __lang.message + "</a></li>",
        t.type == "image" && t.isdelete < 1 && (n += '<li class="dropdown">',
        n += '\t\t<a class="dropdown-toggle" data-toggle="dropdown" href="#"><span>' + __lang.setwallpaper + '</span> <b class="caret"></b></a>',
        n += '\t\t<ul class="dropdown-menu">',
        n += "\t\t\t<li><a onClick=\"_config.setback('" + t.url + "',1,'','backimg')\" href=\"#\">" + __lang.stretch + "</a></li>",
        n += "\t\t\t<li><a onClick=\"_config.setback('" + t.url + "',2,'','backimg')\" href=\"#\">" + __lang.tiled + "</a></li>",
        n += "\t\t\t<li><a onClick=\"_config.setback('" + t.url + "',3,'','backimg')\" href=\"#\">" + __lang.custom_option_layout_3 + "</a></li>",
        n += "\t\t</ul>",
        n += "</li>"),
        n += '<li class="dropdown">',
        n += '\t\t<a class="dropdown-toggle" data-toggle="dropdown" href="#"><span>' + __lang.more + '</span> <b class="caret"></b></a>',
        n += '\t\t<ul class="dropdown-menu">',
        _config.Permission("delete", t) && (n += "\t\t\t<li><a onClick=\"_select.Cut('" + i + '\')" href="#">' + __lang.cut + "</a></li>"),
        _config.Permission("copy", t) && (n += "\t\t\t<li><a onClick=\"_select.Copy('" + i + '\')" href="#">' + __lang.copy + "</a></li>"),
        _config.Permission("rename", t) && (n += "\t\t\t<li><a onClick=\"_ico.Rename('" + i + "','" + this.id + '\')" href="#">' + __lang.rechristen + "</a></li>"),
        n += "</ul>",
        n += "</li>",
        n += "</ul>"
    } else {
        for (e = 0,
        r = 0; r < _config.selectall.icos.length; r++)
            e += this.data[_config.selectall.icos[r]].size * 1;
        var i = _config.selectall.icos[0]
          , t = this.data[i]
          , n = "";
        n += '<ul class="nav nav-pills nav-pills-bottomguide clearfix">',
        n += '<li style="line-height:34px">' + __lang.bottom_selectallinfo.replace("{n}", f).replace("{size}", formatSize(e)).replace("{total}", this.total) + "</li>",
        _config.Permission("delete", t) && (n += '\t<li class="pull-right"><a href="javascript:;" onClick="_ajax.delIco(\'' + i + "')\">" + __lang.delete + "</a></li>",
        n += '\t<li class="pull-right"><a onClick="_select.Cut(\'' + i + '\')" href="#">' + __lang.cut + "</a></li>"),
        _config.Permission("copy", t) && (n += ' <li class="pull-right"><a onClick="_select.Copy(\'' + i + '\')" href="#">' + __lang.copy + "</a></li>"),
        n += "</ul>"
    }
    jQuery("#bottom_content_" + this.winid + "_" + this.id).html(n),
    jQuery("#bottom_content_" + this.winid + "_" + this.id).show()
}
,
_filemanage.prototype.PageInfo = function() {
    var i = 0, r = 0, u, t, n;
    for (u in this.data)
        i++,
        r += this.data[u].size * 1;
    t = __lang.bottom_leftinfo.replace("{n}", i).replace("{size}", formatSize(r)).replace("{total}", this.total),
    jQuery("#bottom_content_" + this.winid + "_" + this.id).html('<div style="line-height:35px;">' + t + "</div>"),
    jQuery("#bottom_content_" + this.winid + "_" + this.id).show(),
    this.bottomShowTimer && window.clearTimeout(this.bottomShowTimer),
    n = this,
    this.bottomShowTimer = window.setTimeout(function() {
        jQuery("#bottom_content_" + n.winid + "_" + n.id).hide()
    }, 1e3)
}
,
_filemanage.getData = function(n, t) {
    jQuery.getJSON(n, function(n) {
        var r, u, i;
        if (n.error)
            alert(n.error);
        else {
            for (r in n.data)
                _config.sourcedata.icos[r] = n.data[r],
                _config.sourceids.icos.push(r);
            for (u in n.folderdata)
                _config.sourcedata.folder[u] = n.folderdata[u];
            n.param.page > 1 ? (i = _filemanage.cons[n.sid],
            i.appendIcos(n.data),
            i.total = parseInt(n.total),
            i.totalpage = Math.ceil(i.total / i.perpage)) : (i = new _filemanage(n.sid,n.data,n.param),
            i.showIcos())
        }
        typeof t == "function" && t()
    })
}
,
_filemanage.prototype.pageClick = function(n) {
    var i = this, t;
    this.pageloadding = !0,
    n || (n = 1),
    this.currentpage = n,
    t = document.getElementById("searchInput_" + this.winid).value,
    t == __lang.search && (t = ""),
    _filemanage.getData(_config.systemurl + "&op=explorer&do=filemanage&bz=" + this.bz + "&path=" + encodeURIComponent(_config.sourcedata.folder[this.fid].path) + "&id=" + this.id + "&winid=" + this.winid + "&disp=" + this.disp + "&asc=" + this.asc + "&perpage=" + this.perpage + "&iconview=" + this.view + "&keyword=" + encodeURI(t) + "&page=" + n + "&marker=" + _config.sourcedata.folder[this.fid].nextMarker + "&t=" + +new Date, function() {
        i.PageInfo()
    })
}
,
_filemanage.stack_run = function(n) {
    var i, t;
    if (_filemanage.stack_data[n].length > 0) {
        for (i = _filemanage.stack_data[n][0].obj,
        t = 0; t < _filemanage.speed; t++)
            if (_filemanage.stack_data[n].length > 0)
                _filemanage.stack_data[n][0].obj.CreateIcos(_filemanage.stack_data[n][0].data, 1),
                _filemanage.stack_data[n].splice(0, 1);
            else
                break;
        _filemanage.showicosTimer[n] = window.setTimeout(function() {
            _filemanage.stack_run(n)
        }, 1)
    }
}
,
_filemanage.prototype.tddrager_start = function(n) {
    this.XX = n.clientX,
    document.getElementById("_blank").style.cursor = "e-resize",
    jQuery("#_blank").show();
    var t = this;
    this.AttachEvent(n),
    eval("document.onmousemove=function(e){" + this.string + ".tddraging(e?e:window.event);};"),
    eval("document.onmouseup=function(e){" + this.string + ".tddraged(e?e:window.event);};")
}
,
_filemanage.prototype.tddraging = function() {
    document.body.style.cursor = "e-resize"
}
,
_filemanage.prototype.tddraged = function(n) {
    var o, f, e, t, r, s, h, u, i;
    for (this.DetachEvent(n),
    jQuery("#_blank").hide(),
    o = n.clientX - this.XX,
    f = _window.windows[this.winid].bodyWidth - jQuery("#jstree_area").width(),
    current_width = f * this.detailper[this.tddrager_disp] / 100,
    e = o + current_width,
    e < 50 && (e = 50),
    t = [],
    i = 0; i < 4; i++)
        t[i] = f * this.detailper[i] / 100;
    r = e - current_width;
    if (o > 0) {
        for (t[this.tddrager_disp + 1] - r > 50 ? t[this.tddrager_disp + 1] -= r : (s = r + (t[this.tddrager_disp + 1] - 50),
        t[this.tddrager_disp + 1] = 50,
        this.tddrager_disp + 1 + 1 < 4 && (t[this.tddrager_disp + 1 + 1] - s > 50 ? t[this.tddrager_disp + 1 + 1] -= r : (h = s + (t[this.tddrager_disp + 1 + 1] - 50),
        t[this.tddrager_disp + 1 + 1] = 50,
        this.tddrager_disp + 1 + 1 + 1 < 4 && (t[this.tddrager_disp + 1 + 1 + 1] - h > 50 ? t[this.tddrager_disp + 1 + 1 + 1] -= r : t[this.tddrager_disp + 1 + 1 + 1] = 50)))),
        u = 0,
        i = 0; i < 4; i++)
            i != this.tddrager_disp && (u += t[i]);
        t[this.tddrager_disp] = f - u
    } else
        t[this.tddrager_disp] = e,
        t[this.tddrager_disp + 1] -= r;
    for (u = 0,
    i = 0; i < 4; i++)
        i != this.tddrager_disp && (u += t[i]);
    for (t[this.tddrager_disp] = f - u,
    i = 0; i < 4; i++)
        this.detailper[i] = Math.floor(t[i] / f * 100);
    this.showIcos(this.winid)
}
,
_filemanage.prototype.DetachEvent = function() {
    document.onmousemove = _filemanage.onmousemove,
    document.onmouseup = _filemanage.onmouseup,
    document.onselectstart = _filemanage.onselectstart
}
,
_filemanage.prototype.AttachEvent = function(n) {
    _filemanage.onmousemove = document.onmousemove,
    _filemanage.onmouseup = document.onmouseup,
    _filemanage.onselectstart = document.onselectstart;
    try {
        document.onselectstart = function() {
            return !1
        }
        ,
        n.preventDefault ? n.preventDefault() : this.board.setCapture && this.board.setCapture()
    } catch (n) {}
}
,
_filemanage.prototype.Resize = function() {
    var n = _window.windows[this.winid];
    jQuery("#icosContainer_content_" + this.winid + "_" + this.id).css("height", n.bodyHeight - (jQuery("#header_content_" + this.winid + "_" + this.id).outerHeight(!0) | 0) - (jQuery("#right_bottom").outerHeight(!0) | 0)),
    jQuery("#detail_content_" + this.winid + "_" + this.id).css("height", (jQuery("#icosContainer_content_" + this.winid + "_" + this.id).height() | 0) - (jQuery(n.contentCase).find(".filemanage-detail-header").height() | 0))
}
,
_ico.ClassName = "Icoblock",
_ico._defaultbgcolor = "#eee",
_ico.padding = 5,
_ico.Timer = 10,
_ico.icos = {},
_ico.wIndex = 1e3,
_ico.zIndex = 1e3,
_ico.clientWidth = 0,
_ico.clientHeight = 0,
_ico.onmousemove = null,
_ico.onmouseup = null,
_ico.tach = null,
_ico.onselectstart = 1,
_ico.paddingLeft = 10,
_ico.paddingTop = 10,
_ico.Version = "dzz! js 1.0",
_ico.setTip = function(n, t, i) {
    var o = "", r, u, f, e;
    i ? (r = _ico.geticoidFromOid(n, i),
    i == "app" && (_start.setTip(n, t),
    o += ".task_Icoblock[icoid=app_" + n + "],")) : r = [n];
    if (r.length < 1)
        return;
    for (u = 0; u < r.length; u++)
        _config.icosTips[r[u]] = t,
        o += u == r.length - 1 ? ".Icoblock[icoid=" + r[u] + "]" : ".Icoblock[icoid=" + r[u] + "],";
    f = jQuery(o);
    if (f.length < 1)
        return;
    t > 0 ? (e = t < 10 ? 1 : t < 100 ? 2 : t < 1e3 ? 3 : 4,
    f.find(".icobutton_tips").length > 0 ? f.find(".icobutton_tips").html('<span class="icobutton_tips_inner tips_size_' + e + '">' + t + "</span></div>") : el1 = jQuery('<div  class="icobutton_tips"><span class="icobutton_tips_inner tips_size_' + e + '">' + t + "</span></div>").appendTo(f.find(".icoimgtips"))) : f.find(".icobutton_tips").remove()
}
,
_ico.setTip_icoimg = function(n, t, i) {
    var r;
    if (t < 1)
        return;
    r = i ? jQuery("#" + i + " .Icoblock[icoid=" + t + "] .icoimgtips") : jQuery(".Icoblock[icoid=" + t + "] .icoimgtips"),
    r.each(function() {
        switch (n) {
        case "share":
            jQuery(this).find(".icoimg_share_tips").length < 1 && jQuery('<div class="icoimg_share_tips"></div>').appendTo(jQuery(this));
            var i = jQuery(this).find(".icoimg_share_tips");
            _config.sourcedata.icos[t].urlsid > 0 && _config.sourcedata.icos[t].shareid > 0 ? i.html('<div class="icoimg_share_tips_3"></div>') : _config.sourcedata.icos[t].urlsid > 0 ? i.html('<div class="icoimg_share_tips_1"></div>') : _config.sourcedata.icos[t].shareid > 0 ? i.html('<div class="icoimg_share_tips_2"></div>') : i.html("");
            break;
        case "liked":
            _config.sourcedata.icos[t].liked > 0 ? jQuery(this).find(".icoimg_liked_tips").length < 1 && jQuery('<div class="icoimg_liked_tips"></div>').appendTo(jQuery(this)) : jQuery(this).find(".icoimg_liked_tips").remove()
        }
    })
}
,
_ico.geticoidFromOid = function(n, t) {
    var r = [], i;
    for (i in _config.sourcedata.icos)
        _config.sourcedata.icos[i].type == t && _config.sourcedata.icos[i].oid == n && r.push(i);
    return r
}
,
_ico.getPicIcos = function(n) {
    var i = {}
      , t = []
      , u = 0
      , r = jQuery('.Icoblock[icoid="' + n + '"]').parent();
    return r.find(".icoimgContainer.icoimgContainer_image").each(function() {
        t.push(jQuery(this).closest(".Icoblock").attr("icoid"))
    }),
    i.pos = jQuery.inArray(n + "", t),
    i.icos = t,
    i
}
,
_ico.geticoidFromfid = function(n) {
    for (var t in _config.sourcedata.icos)
        if (_config.sourcedata.icos[t].type == "folder" && _config.sourcedata.icos[t].oid == n)
            return t
}
,
_ico.isParentFid = function(n, t) {
    var r = !1, i;
    return n == t ? !0 : _config.sourcedata.folder[t] ? (i = _config.sourcedata.folder[t],
    _config.sourcedata.folder[n].isdelete > 0 && (n = _config.space.typefid.recycle),
    i.isdelete > 0 && (i.pfid = _config.space.typefid.recycle),
    r = String(i.pfid) == String(n) ? !0 : String(i.pfid) != "0" ? _ico.isParentFid(n, i.pfid) : !1) : !1
}
,
_ico.getTopFid = function(n) {
    var u = [], t = _config.sourcedata.folder[n], r, i;
    if (!t)
        return [];
    if (String(t.pfid) == "0")
        u.push(n);
    else {
        u.push(t.fid);
        if (t.fid != t.pfid) {
            r = _ico.getTopFid(t.pfid);
            if (r)
                for (i = 0; i < r.length; i++)
                    u.push(r[i])
        }
    }
    return u
}
,
_ico.createIco = function(n) {
    _ico.removeIcoid(n.icoid),
    _config.sourceids.icos.push(n.icoid),
    _config.sourcedata.icos[n.icoid] = n,
    _ico.appendIcoids([n.icoid])
}
,
_ico.getIcoidFromName = function(n, t, i) {
    for (var r in _config.sourcedata.icos)
        if (_config.sourcedata.icos[r].name == n && _config.sourcedata.icos[r].pfid == t && _config.sourcedata.icos[r].type == i)
            return r;
    return null
}
,
_ico.createFolder = function(n) {
    _ico.removeIcoid(n.icoarr.icoid),
    _config.sourceids.icos.push(n.icoarr.icoid),
    _config.sourcedata.icos[n.icoarr.icoid] = {},
    _config.sourcedata.icos[n.icoarr.icoid] = n.icoarr,
    _config.sourceids.folder || (_config.sourceids.folder = []),
    _config.sourceids.folder.push(n.folderarr.fid),
    _config.sourcedata.folder || (_config.sourcedata.folder = {}),
    _config.sourcedata.folder[n.folderarr.fid] = n.folderarr,
    _ico.appendIcoids([n.icoarr.icoid])
}
,
_ico.NewIco = function(n, t, i) {
    var r;
    r = _config.sourcedata.folder[t].bz && _config.sourcedata.folder[t].bz != "" ? encodeURIComponent(_config.sourcedata.folder[t].path) : t;
    switch (n) {
    case "Newfolder":
        showWindow("newfolder", _config.ajaxurl + "&do=newfolder&path=" + r);
        break;
    case "Newlink":
        showWindow("newlink", _config.ajaxurl + "&do=newlink&path=" + r, "get", 0);
        break;
    default:
        _ajax.NewIco(n, r, i)
    }
}
,
_ico.Arrange = function(n, t, i) {
    switch (i) {
    case "iconview":
        t == _layout.fid && (_layout.iconview = parseInt(n),
        _config.space.iconview = parseInt(n),
        _config.Permission_Container("admin", _layout.fid) && jQuery.post(_config.saveurl + "&do=userfield&datename=iconview", {
            iconview: parseInt(n)
        })),
        jQuery("#right_contextmenu .menu-icon-iconview").each(function() {
            jQuery(this).attr("pid") == "menu_icon_iconview_" + n ? jQuery(this).removeClass("icon-notselect").addClass("icon-select") : jQuery(this).addClass("icon-notselect").removeClass("icon-select")
        }),
        _ico.reCIcolist(t),
        _layout.resize();
        break;
    case "direction":
        if (t == _layout.fid)
            _layout.direction = parseInt(n),
            _config.space.direction = parseInt(n),
            _config.Permission_Container("admin", t) && jQuery.post(_config.saveurl + "&do=userfield&dataname=direction", {
                direction: parseInt(n)
            });
        else
            return;
        jQuery("#right_contextmenu .menu-icon-direction").each(function() {
            jQuery(this).attr("did") == "menu_icon_direction_" + n ? jQuery(this).removeClass("icon-notselect").addClass("icon-select") : jQuery(this).addClass("icon-notselect").removeClass("icon-select")
        }),
        _ico.refreshList(t);
        break;
    case "position":
        if (t == _layout.fid)
            _layout.iconposition = parseInt(n),
            _config.space.iconposition = parseInt(n),
            _config.Permission_Container("admin", t) && jQuery.post(_config.saveurl + "&do=userfield&dataname=iconposition", {
                iconposition: parseInt(n)
            });
        else
            return;
        jQuery("#right_contextmenu .menu-icon-position").each(function() {
            jQuery(this).attr("pid") == "menu_icon_position_" + n ? jQuery(this).removeClass("icon-notselect").addClass("icon-select") : jQuery(this).addClass("icon-notselect").removeClass("icon-select")
        }),
        _ico.refreshList(t);
        break;
    case "autolist":
        t == _layout.fid && (_layout.autolist = parseInt(n),
        _config.space.autolist = parseInt(n),
        _config.Permission_Container("admin", t) && jQuery.post(_config.saveurl + "&do=userfield&dataname=autolist", {
            autolist: parseInt(n)
        })),
        jQuery("#right_contextmenu .menu-icon-autolist").each(function() {
            jQuery(this).attr("pid") == "menu_icon_autolist_" + n ? jQuery(this).removeClass("icon-notselect").addClass("icon-select") : jQuery(this).addClass("icon-notselect").removeClass("icon-select")
        }),
        _layout.autolist > 0 && _ico.clearIconposition(t),
        _ico.refreshList(t)
    }
}
,
_ico.deleteFolderIcos = function(n) {
    var i, t, r;
    jQuery("#" + n).empty();
    for (i in _ico.icos) {
        t = _ico.icos[i];
        if (t.container == n) {
            for (r in t)
                delete t[r];
            delete _ico.icos[i]
        }
    }
}
,
_ico.reCIcolist = function(n) {
    var f = _config.getContainerByFid(n), u, i, e, r, t;
    jQuery("#" + f + " .Icoblock").remove();
    for (u in _ico.icos) {
        i = _ico.icos[u];
        if (i.container == f) {
            for (e in i)
                delete i[e];
            delete _ico.icos[u]
        }
    }
    for (n == _layout.fid && (r = _config.screenList),
    t = 0; t < r.length; t++)
        _ico.CIco(r[t], f, t)
}
,
_ico.clearIconposition = function() {
    var r = _layout.autolist, t = _config.screenList, i;
    for (i in t)
        _config.sourcedata.icos[t[i]].position = "";
    _config.Permission_Container("admin", _layout.fid) && jQuery.post(_config.saveurl + "&do=clearIcoposition&dataname=position&gid=" + _config.gid, {
        "icoid[]": t,
        fid: _layout.fid
    })
}
,
_ico.refreshList = function(n) {
    for (var e = _layout.autolist, r = _config.screenList, u = [], i, f, t = 0; t < r.length; t++)
        e < 1 ? _config.sourcedata.icos[r[t]] && _config.sourcedata.icos[r[t]].position != "" || u.push(r[t]) : u.push(r[t]);
    for (t = 0; t < u.length; t++) {
        i = _ico.icos[u[t]];
        if (!i)
            continue;
        i.pos = t,
        f = i.getpos(t, n, 2),
        i.left = f[0],
        i.top = f[1],
        jQuery(i.board).css({
            left: i.left,
            top: i.top
        })
    }
}
,
_ico.prototype.getpos = function(n, t, i) {
    var et = _layout.iconpositions || {}, y = _config.screenWidth - _layout.marginleft - _layout.marginright - _layout._body_marginleft - _layout._body_marginright, v = _config.screenHeight - _layout.margintop - _layout.marginbottom - _layout._body_margintop - _layout._body_marginbottom, c = this.divheight * 1, l = this.divwidth * 1, h = this.paddingtop * 1, s = this.paddingleft * 1, ft = 1, ut = 0, it = 0, rt, r, u, d, b, w, tt, nt, a, g, p, k, e, o, f;
    ft = _layout.autolist || 1,
    ut = _layout.direction || 0,
    a = _config.screenList.length || 0,
    it = _layout.iconposition * 1 || 0;
    if (_config.sourcedata.icos[this.id].position && ft < 1)
        return rt = _config.sourcedata.icos[this.id].position.split("_"),
        e = [0, 0],
        e[0] = isNaN(parseInt(rt[0])) ? 0 : parseInt(rt[0]),
        e[1] = isNaN(parseInt(rt[1])) ? 0 : parseInt(rt[1]),
        e[0] > y - this.divwidth ? e[0] = y - this.divwidth : e[0] < 0 && (e[0] = 0),
        e[1] > v - this.divheight ? e[1] = v - this.divheight : e[1] < 0 && (e[1] = 0),
        e;
    r = Math.floor((v + h) / (c + h)),
    r < 1 && (r = 1),
    u = Math.floor((y + s) / (l + s)),
    u < 1 && (u = 1),
    d = y - u * (l + s),
    b = v - r * (c + h),
    i != 2 && (i = ft);
    if (i > 0) {
        if (ut) {
            var w = Math.floor(n / (u * r))
              , n = n % (u * r)
              , e = [0, 0];
            switch (it) {
            case 0:
                n > u * r - 1 ? (o = u - 1,
                f = r - 1) : (f = Math.floor(n / u),
                o = n - f * u),
                e[0] = w * _config.screenWidth + o * (l + s),
                e[1] = f * (c + h);
                break;
            case 2:
                n > u * r - 1 ? (o = u - 1,
                f = 0) : (f = r - Math.floor(n / u) - 1,
                o = n - Math.floor(n / u) * u),
                e[0] = w * _config.screenWidth + o * (l + s),
                e[1] = f * (c + h) + b;
                break;
            case 1:
                n > u * r - 1 ? (o = 0,
                f = r - 1) : (f = Math.floor(n / u),
                o = u - (n - f * u) - 1),
                e[0] = w * _config.screenWidth + o * (l + s) + d,
                e[1] = f * (c + h);
                break;
            case 3:
                n > u * r - 1 ? (o = 0,
                f = 0) : (o = u - (n - Math.floor(n / u) * u) - 1,
                f = r - Math.floor(n / u) - 1),
                e[0] = w * _config.screenWidth + o * (l + s) + d,
                e[1] = f * (c + h) + b;
                break;
            case 4:
                a = 0;
                if (_layout.autolist < 1)
                    for (f in _config.screenList)
                        _config.sourcedata.icos[_config.screenList[f]].position == "" && a++;
                else
                    a = _config.screenList.length;
                g = u * r - a,
                g > 0 ? (p = getsum(y, v, a, l + s, c + h),
                u = p[0],
                r = p[1],
                nt = Math.ceil(a / u),
                w = Math.floor(n / (u * r)),
                s = Math.floor((y - u * l) / (u + 1)),
                h = Math.floor((v - nt * c) / (nt + 1))) : (s = Math.floor((y - u * l) / (u + 1)),
                h = Math.floor((v - r * c) / (r + 1))),
                n > u * r - 1 ? (o = u - 1,
                f = r - 1) : (f = Math.floor(n / u),
                o = n - f * u),
                e[0] = w * _config.screenWidth + s + o * (l + s),
                e[1] = h + f * (c + h)
            }
            return e
        }
        w = Math.floor(n / (u * r)),
        e = [0, 0];
        switch (it) {
        case 0:
            n > u * r - 1 ? (o = Math.floor(n % (u * r) / r),
            f = n % (u * r) - o * r) : (o = Math.floor(n / r),
            f = n - o * r),
            e[0] = w * _config.screenWidth + o * (l + s),
            e[1] = f * (c + h);
            break;
        case 2:
            n > u * r - 1 ? (o = Math.floor(n % (u * r) / r),
            f = r - (n % (u * r) - o * r) - 1) : (o = Math.floor(n / r),
            f = r - (n - o * r) - 1),
            e[0] = _config.screenWidth * w + o * (l + s),
            e[1] = f * (c + h) + b;
            break;
        case 1:
            n > u * r - 1 ? (o = u - Math.floor(n % (u * r) / r) - 1,
            f = n % (u * r) - Math.floor(n % (u * r) / r) * r) : (o = u - Math.floor(n / r) - 1,
            f = n - Math.floor(n / r) * r),
            e[0] = w * _config.screenWidth + o * (l + s) + d,
            e[1] = f * (c + h);
            break;
        case 3:
            if (n > u * r - 1)
                var o = 0
                  , f = 0
                  , o = u - Math.floor(n % (u * r) / r) - 1
                  , f = r - (n % (u * r) - Math.floor(n % (u * r) / r) * r) - 1;
            else
                o = u - Math.floor(n / r) - 1,
                f = r - (n - Math.floor(n / r) * r) - 1;
            e[0] = _config.screenWidth * w + o * (l + s) + d,
            e[1] = f * (c + h) + b;
            break;
        case 4:
            a = 0,
            a = _config.screenList.length,
            tt = _layout.page - 1;
            if (tt < 1) {
                g = u * r - a,
                p = getsum(y - s, v - h, a, l + s, c + h),
                u = p[0],
                r = p[1],
                k = Math.ceil(a / r),
                s = Math.floor((y - k * l) / (k + 1)),
                h = Math.floor((v - r * c) / (r + 1)),
                o = Math.floor(n / r),
                f = n - o * r,
                e[0] = s + o * (l + s),
                e[1] = h + f * (c + h);
                break
            } else if (n < tt * u * r) {
                s = Math.floor((y - u * l) / (u + 1)),
                h = Math.floor((v - r * c) / (r + 1)),
                w = Math.floor(n / (u * r));
                var n = n - w * u * r
                  , o = Math.floor(n / r)
                  , f = n - o * r;
                e[0] = w * _config.screenWidth + s + o * (l + s),
                e[1] = h + f * (c + h);
                break
            } else {
                a = a - tt * u * r,
                n = n - tt * u * r,
                g = u * r - a,
                p = getsum(y - s, v - h, a, l + s, c + h, u, r),
                u = p[0],
                r = p[1],
                k = Math.ceil(a / r),
                s = Math.floor((y - k * l) / (k + 1)),
                h = Math.floor((v - r * c) / (r + 1)),
                o = Math.floor(n / r),
                f = n - o * r,
                e[0] = tt * _config.screenWidth + s + o * (l + s),
                e[1] = h + f * (c + h);
                break
            }
        }
        return e
    }
    if (ut)
        switch (it) {
        case 0:
            for (e = [0, 0],
            f = 0; f < r; f++)
                for (o = 0; o < u; o++)
                    if (_ico.getposition(t, o, f, l, c, s, h))
                        return e[0] = o * (l + s) + 10,
                        e[1] = f * (c + h) + 10,
                        e;
            return e;
        case 2:
            for (e = [10, (r - 1) * (c + h) + 10],
            f = 0; f < u; f++)
                for (o = r - 1; o >= 0; o--)
                    if (_ico.getposition(t, o, f, l, c, s, h))
                        return e[0] = o * (l + s) + 10,
                        e[1] = f * (c + h) + b + 10,
                        e;
            return e;
        case 1:
            for (e = [(u - 1) * (l + s) + 10, 10],
            f = u - 1; f >= 0; f--)
                for (o = 0; o < r; o++)
                    if (_ico.getposition(t, o, f, l, c, s, h))
                        return e[0] = o * (l + s) + d + 10,
                        e[1] = f * (c + h) + 10,
                        e;
            return e;
        case 3:
            for (e = [(u - 1) * (l + s) + 10, (r - 1) * (c + h) + 10],
            f = u - 1; f >= 0; f--)
                for (o = r - 1; o >= 0; o--)
                    if (_ico.getposition(t, o, f, l, c, s, h))
                        return e[0] = o * (l + s) + d + 10,
                        e[1] = f * (c + h) + b + 10,
                        e;
            return e;
        case 4:
            a = 0;
            for (f in _config.screenList)
                _layout.autolist < 1 && _config.sourcedata.icos[_config.screenList[f]].position == "" && a++;
            for (g = u * r - a,
            g > 0 ? (p = getsum(y, v, a, l + s, c + h),
            u = p[0],
            r = p[1],
            nt = Math.ceil(a / u),
            s = Math.floor((y - u * l) / (u + 1)),
            h = Math.floor((v - nt * c) / (nt + 1))) : (s = Math.floor((y - u * l) / (u + 1)),
            h = Math.floor((v - r * c) / (r + 1))),
            e = [s, h],
            f = 0; f < r; f++)
                for (o = 0; o < u; o++)
                    if (_ico.getposition(t, o, f, l, c, s, h))
                        return e[0] = s + o * (l + s),
                        e[1] = h + f * (c + h),
                        e;
            return e
        }
    else
        switch (it) {
        case 0:
            for (e = [0, 0],
            o = 0; o < u; o++)
                for (f = 0; f < r; f++)
                    if (_ico.getposition(t, o, f, l, c, s, h))
                        return e[0] = o * (l + s),
                        e[1] = f * (c + h),
                        e;
            return e;
        case 2:
            for (e = [0, (r - 1) * (c + h)],
            o = 0; o < u; o++)
                for (f = r - 1; f >= 0; f--)
                    if (_ico.getposition(t, o, f, l, c, s, h))
                        return e[0] = o * (l + s),
                        e[1] = f * (c + h) + b,
                        e;
            return e;
        case 1:
            for (e = [(u - 1) * (l + s), 0],
            o = u - 1; o >= 0; o--)
                for (f = 0; f < r; f++)
                    if (_ico.getposition(t, o, f, l, c, s, h))
                        return e[0] = o * (l + s) + d,
                        e[1] = f * (c + h),
                        e;
            return e;
        case 3:
            for (e = [(u - 1) * (l + s), (r - 1) * (c + h)],
            o = u - 1; o >= 0; o--)
                for (f = r - 1; f >= 0; f--)
                    if (_ico.getposition(t, o, f, l, c, s, h))
                        return e[0] = o * (l + s) + d,
                        e[1] = f * (c + h) + b,
                        e;
            return e;
        case 4:
            a = 0;
            for (f in _config.screenList)
                _config.sourcedata.icos[_config.screenList[f]].position == "" && a++;
            for (g = u * r - a,
            g > 0 ? (p = getsum(y - s, v - h, a, l + s, c + h),
            u = p[0],
            r = p[1],
            k = Math.ceil(a / r),
            s = Math.floor((y - k * l) / (k + 1)),
            h = Math.floor((v - r * c) / (r + 1))) : (s = Math.floor((y - u * l) / (u + 1)),
            h = Math.floor((v - r * c) / (r + 1))),
            e = [s, h],
            o = 0; o < u; o++)
                for (f = 0; f < r; f++)
                    if (_ico.getposition(t, o, f, l, c, s, h))
                        return e[0] = s + o * (l + s),
                        e[1] = h + f * (c + h),
                        e;
            return e
        }
}
,
_ico.getposition = function(n, t, i, r, u, f, e) {
    var s, o;
    for (s in _ico.icos) {
        o = _ico.icos[s];
        if (_config.sourcedata.icos[s].position != "")
            continue;
        if (o.container == n) {
            if (o.left >= t * (r + f) && o.left < (t + 1) * (r + f) && o.top > i * (u + e) && o.top < (i + 1) * (u + e))
                return !1;
            if (o.left >= t * (r + f) && o.left < (t + 1) * (r + f) && o.top + o.divheight > i * (u + e) && o.top + o.divheight < (i + 1) * (u + e))
                return !1;
            if (o.left + o.divwidth > t * (r + f) && o.left + o.divwidth < (t + 1) * (r + f) && o.top > i * (u + e) && o.top < (i + 1) * (u + e))
                return !1;
            if (o.left + o.divwidth >= t * (r + f) && o.left + o.bodyWidth < t * (r + f) && o.top + o.height > i * (u + e) && o.top + o.height < (i + 1) * (u + e))
                return !1
        }
    }
    return !0
}
,
_ico.CIcolist = function() {
    var t, n, i;
    for (jQuery("#loading_info").fadeOut("slow"),
    t = _config.screenList,
    n = 0; n < t.length; n++)
        i = _ico.CIco(t[n], "icosContainer_body_" + _layout.fid, n)
}
,
_ico.reCIco = function(n) {
    var u, t, i;
    if (_ico.icos[n]) {
        var f = _ico.icos[n].container
          , e = _ico.icos[n].pos
          , r = [_ico.icos[n].left, _ico.icos[n].top];
        jQuery(_ico.icos[n].board).remove();
        for (u in _ico.icos[n])
            delete _ico.icos[n][u];
        delete _ico.icos[n],
        t = new _ico(n,f,e),
        r && (t.left = r[0],
        t.top = r[1],
        t.nopos = 1),
        t.CreatIco()
    }
    for (i in _filemanage.cons)
        _filemanage.cons[i].data[n] && _filemanage.cons[i].reCreateIcos(_config.sourcedata.icos[n])
}
,
_ico.CIco = function(n, t, i, r) {
    var f, u;
    if (_ico.icos[n]) {
        jQuery(_ico.icos[n].board).remove();
        for (f in _ico.icos[n])
            delete _ico.icos[n][f];
        delete _ico.icos[n]
    }
    return u = new _ico(n,t,i),
    r && (u.left = r[0],
    u.top = r[1],
    u.nopos = 1),
    u.CreatIco(),
    u
}
,
_ico.image_resize = function(n, t, i) {
    imgReady(n.src, function() {
        var f = this.width, e = this.height, u, r;
        if (f > 0 && e > 0) {
            f / e > 1 ? (r = f > t ? parseInt(t) : f,
            u = r * e / f) : (u = e > i ? parseInt(i) : e,
            r = u * f / e),
            r < 32 && u < 32 && jQuery(n).addClass("image_tosmall").css({
                padding: (i - u) / 2 - 1 + "px " + ((t - r) / 2 - 1) + "px"
            });
            try {
                n.style.width = r + "px",
                n.style.height = u + "px"
            } catch (o) {}
        }
        jQuery(n).show()
    })
}
,
_ico.icoimgError = function(n, t, i) {
    jQuery(n).attr("error") && imgReady(jQuery(n).attr("error"), function() {
        var f = this.width, e = this.height, u, r;
        if (f > 0 && e > 0) {
            f / e > 1 ? (r = f > t ? parseInt(t) : f,
            u = r * e / f) : (u = e > i ? parseInt(i) : e,
            r = u * f / e),
            r < 32 && u < 32 && jQuery(n).addClass("image_tosmall").css({
                padding: (i - u) / 2 - 1 + "px " + ((t - r) / 2 - 1) + "px"
            });
            try {
                n.style.width = r + "px",
                n.style.height = u + "px"
            } catch (o) {}
            n.src = jQuery(n).attr("error"),
            jQuery(n).show()
        }
    }, function() {}, function() {
        n.onerror = null,
        n.src = "dzz/images/default/icodefault.png",
        jQuery(n).show()
    })
}
,
_ico.prototype.CreatIco = function() {
    var u = this, n, o, i, c, t, e, s, l, f, r, h;
    this.board = document.createElement("div"),
    this.board.className = this.className + " " + _config.sourcedata.icos[this.id].flag + " " + this.iconview.cssname,
    this.board.style.position = "absolute",
    this.board.id = "icon_" + this.id,
    this.board.setAttribute("icoid", this.id),
    this.board.setAttribute("oid", this.sourceid),
    this.board.setAttribute("flag", _config.sourcedata.icos[this.id].flag),
    this.board.style.float = "left",
    this.board.style.zIndex = this.zIndex,
    document.getElementById(this.container).appendChild(this.board),
    n = "",
    o = this.type,
    o == "shortcut" && (o = _config.sourcedata.icos[this.id].ttype);
    switch (o) {
    case "user":
        document.getElementById("usercss_loaded").className = "userclass" + this.width + "_" + this.height,
        parseInt(jQuery("#usercss_loaded").css("width")) > 1 ? (n = "userclass" + this.width + "_" + this.height,
        i = '<img class="Icoblock_icon ' + n + '" src="' + this.img + '"  title="' + this.text + ' error="' + this.error + '" onerror="_ico.icoimgError(this)">') : i = '<img  class="Icoblock_icon userclass radius" src="' + this.img + '" style="display:none;" title="' + this.text + '" onload="_ico.image_resize(this,' + this.width + "," + this.height + ');" onerror="_ico.icoimgError(this,' + this.width + "," + this.height + ')" error="' + this.error + '">';
        break;
    case "image":
        n = "imageclass",
        i = '<img  class="Icoblock_icon ' + n + '" src="' + this.img + '" style="display:none;" title="' + this.text + '" onload="_ico.image_resize(this,' + this.width + "," + this.height + ');" onerror="_ico.icoimgError(this,' + this.width + "," + this.height + ')" error="' + this.error + '">';
        break;
    case "app":
        n = "radius",
        i = '<img  class="Icoblock_icon ' + n + '" src="' + this.img + '" style="display:none;" title="' + this.text + '" onload="_ico.image_resize(this,' + this.width + "," + this.height + ');" onerror="_ico.icoimgError(this,' + this.width + "," + this.height + ')" error="' + this.error + '">';
        break;
    case "video":
        document.getElementById("videocss_loaded").className = "videoclass" + this.width + "_" + this.height,
        parseInt(jQuery("#videocss_loaded").css("width")) > 1 ? (n = "videoclass" + this.width + "_" + this.height,
        i = '<img class="Icoblock_icon ' + n + '" src="' + this.img + '"  title="' + this.text + '" onerror="_ico.icoimgError(this)" error="' + this.error + '">') : i = '<img  class="Icoblock_icon videoclass radius" src="' + this.img + '" style="display:none;" title="' + this.text + '" onload="_ico.image_resize(this,' + this.width + "," + this.height + ');" onerror="_ico.icoimgError(this,' + this.width + "," + this.height + ')" error="' + this.error + '">';
        break;
    default:
        n = "radius",
        i = '<img  class="Icoblock_icon ' + n + '" src="' + this.img + '" style="display:none;" title="' + this.text + '" onload="_ico.image_resize(this,' + this.width + "," + this.height + ');" onerror="_ico.icoimgError(this,' + this.width + "," + this.height + ')" error="' + this.error + '">'
    }
    c = "icoimgContainer_" + this.type,
    t = "",
    t += '<div class="icoimgContainer ' + c + '" style="position:relative;width:' + this.width + "px;height:" + this.height + 'px">',
    t += '<table width="100%" height="100%" cellpadding="0" cellspacing="0"><tr><td align="center" valign="middle">' + i + "</td></tr></table>",
    t += '<div class="icoimgCover_up" style="position:absolute;left:0px;top:0px;width:' + this.width + "px;height:" + this.height + 'px;z-index:1"></div>',
    t += '<div class="icoimgtips" style="position:absolute;left:0px;top:0px;width:' + this.width + "px;height:" + this.height + 'px;z-index:2"></div>',
    t += '<div class="icoimgCover_down" style="position:absolute;left:0px;top:0px;width:' + this.width + "px;height:" + this.height + 'px;z-index:-1"></div>',
    t += "</div>",
    e = "",
    this.container != "taskbar_dock" && this.container != "taskbar_tray" && (s = "IcoText",
    this.container.indexOf("icosContainer_folder_") !== -1 && (s = "IcoText_folder"),
    this.align ? (l = "op_lefttop",
    e = '<td align="left" valign="middle"><div id="text_' + this.id + '" class="IcoText_div" style="width:' + (this.divwidth - this.width - _ico.padding * 2 - 25) + 'px;"><a class="' + s + '" >' + mb_cutstr_nohtml(this.text, this.iconview.textlength) + "</a></div></td>") : (l = "op_righttop",
    e = '<tr><td align="center" valign="middle"><div id="text_' + this.id + '" class="IcoText_div" style="width:' + (this.divwidth - 15) + 'px;height:38px;"><table cellpadding="0" cellspacing="0" width="100%" height="100%"><tr><td valign="middle" align="center"><a class="' + s + '">' + mb_cutstr_nohtml(this.text, this.iconview.textlength) + "</a></td></tr></table></div></td></tr>")),
    f = "",
    f += this.align ? '<table cellpadding="0" cellspacing="0"  width="' + this.divwidth + '" height="' + this.divheight + '" ><tr><td  align="center" valign="middle" style="overflow:hidden;" id="html_' + this.id + '" width="' + (this.width + _ico.padding * 2 + 15) + '" >' + t + "</td>  " + e + "</tr></table>" : '<table cellpadding="0" cellspacing="0"  width="' + this.divwidth + '" height="' + this.divheight + '" style="table-layout:fixed;"><tr><td  align="center" valign="middle"  style="overflow:hidden;" id="html_' + this.id + '" height="' + (this.divheight - 45) + 'px">' + t + "</td></tr>  " + e + "</table>",
    (this.notdelete < 1 || this.notdelete > 0 && _config.sourcedata.icos[this.id].type == "app") && _config.Permission("delete", _config.sourcedata.icos[this.id]) && (f += '\t<div class="icoblank_tip icoblank_rightbottom" style="z-index:' + this.zIndex + 2 + '"></div>'),
    this.board.innerHTML = f,
    u = this,
    f = "",
    this.board.title = this.text,
    r = jQuery(this.board);
    r.find(".icoblank_tip .icon").on("click", function() {
        return this.onclick(),
        !1
    });
    _config.selectall.container == this.container && jQuery.inArray(this.id, _config.selectall.icos) > -1 && jQuery(this.board).addClass("Icoselected"),
    _config.cut.iscut > 0 && jQuery.inArray(this.id, _config.cut.icos) > -1 && jQuery(this.board).addClass("iscut");
    if ((this.notdelete < 1 || this.notdelete > 0 && _config.sourcedata.icos[this.id].type == "app") && _config.Permission("delete", _config.sourcedata.icos[this.id]))
        r.find(".icoblank_rightbottom").on("click", function() {
            var n = !0;
            return jQuery(this).parent().hasClass("Icoselected") && (n = !1),
            _select.SelectedStyle("icosContainer_body_" + _layout.fid, u.id, n, !0),
            !1
        });
    r.mouseenter(function() {
        jQuery(u.board).addClass("hover")
    }).mouseleave(function() {
        jQuery(u.board).removeClass("hover")
    });
    r.on("contextmenu", function(n) {
        return _contextmenu.right_ico(n ? n : window.event, u.id, "", _layout.fid),
        !1
    });
    r.find(".IcoText_div a,.icoimgContainer").on("click", function() {
        return _ico.Open(u.id),
        !1
    });
    if ((this.notdelete < 1 || this.notdelete > 0 && _config.sourcedata.icos[this.id].type == "app") && _config.Permission("delete", _config.sourcedata.icos[this.id]))
        r.on("click", function(n) {
            var u, r, t, i;
            return n = n ? n : window.event,
            u = n.srcElement ? n.srcElement : n.target,
            /input|textarea/i.test(u.tagName) ? !0 : (r = jQuery(this).parent(),
            t = !0,
            _hotkey.ctrl && jQuery(this).hasClass("Icoselected") && (t = !1),
            i = _hotkey.ctrl ? !0 : !1,
            _select.SelectedStyle(r.attr("id"), jQuery(this).attr("icoid"), t, i),
            !1)
        });
    else
        r.on("click", function() {
            _ico.Open(u.id)
        });
    this.board_background = document.createElement("div"),
    this.board_background.className = "backgound_radius",
    this.board_background.style.cssText = "position:absolute;left:0px;top:0px;z-index:-5;width:" + (this.divwidth - 2) + "px;height:" + (this.divheight - 2) + "px;",
    this.board.appendChild(this.board_background),
    _config.icosTips[this.id] > 0 && _ico.setTip(this.id, _config.icosTips[this.id]),
    this.nopos || (h = this.getpos(this.pos, this.container),
    this.left = h[0],
    this.top = h[1]),
    this.board.style.left = this.left + "px",
    this.board.style.top = this.top + "px",
    this.board.style.width = this.divwidth + "px",
    this.board.style.height = this.divheight + "px",
    BROWSER.ie < 10 && BROWSER.ie > 0 && jQuery(this.board).find(".IcoText").FontEffect({
        shadow: !0,
        shadowColor: "#000",
        shadowOffsetTop: 1,
        shadowBlur: 1,
        shadowOffsetLeft: 1,
        shadowOpacity: .3
    }),
    this.board.style.overflow = "visible",
    _config.Permission("admin", _config.sourcedata.icos[this.id]) && _Drag.init(this.id, this.board, "", this.container),
    this.status = 1
}
,
_ico.OpenWin = function(n, t, i, r, u) {
    jQuery("#shadow").hide();
    if (_ico.icos[n])
        obj = _ico.icos[n];
    else {
        if (!_config.sourcedata.icos[n])
            return;
        obj = _config.sourcedata.icos[n],
        obj.id = obj.icoid,
        obj.text = obj.name
    }
    if (obj.type == "app")
        if (obj.url.indexOf("dzzjs:") === 0) {
            eval(obj.url.replace("dzzjs:", ""));
            return
        }
    if (typeof obj == "undefined" || !obj)
        return;
    switch (obj.open) {
    case 0:
    case 1:
        OpenAppWin(obj.id, null, null, null, i, r, u, t);
        break;
    case 2:
        OpenBrowser(obj.url, obj.text);
        break;
    case 3:
        obj.wwidth > 0 && obj.wheight > 0 ? window.open(obj.url, obj.text, "topbar=0,resizable=1,scrollbars=yes,location=no,menubar=no,status=1,width=" + obj.wwidth + ",height=" + obj.wheight) : window.open(obj.url);
        break;
    default:
        OpenAppWin(obj.id, null, null, null, i, r, u, t)
    }
}
,
_ico.OpenLocal = function(n, t) {
    var i = "dzzoffice://" + n + "." + t;
    BROWSER.ie ? window.open(i) : window.frames.hideframe.location = i
}
,
_ico.ExtOpen_Replace = function(n, t) {
    var r = _config.extopen.all[t], i;
    if (!n || !r)
        return !1;
    for (i in n)
        extdata_url = r.url.replace(/{(\w+)}/g, function(t) {
            return i = t.replace(/[{}]/g, ""),
            i == "url" ? encodeURIComponent(n[i]) : i == "did" ? n.ddid : i == "path" ? n.dpath : n[i]
        });
    return extdata_url.indexOf("dzzjs:") === -1 && extdata_url.indexOf("?") !== -1 && extdata_url.indexOf("path=") === -1 && (extdata_url = extdata_url + "&path=" + n.dpath),
    extdata_url
}
,
_ico.getExtOpen = function(n, t) {
    var r, f, u, i;
    if (n.type == "folder" || n.type == "user" || n.type == "app" || n.type == "pan" || n.type == "storage" || n.type == "disk")
        return !0;
    r = [],
    f = "dzz",
    n.bz == "" ? n.rbz ? (bzarr = n.rbz.split(":"),
    f = bzarr[0]) : f = "dzz" : (bzarr = n.bz.split(":"),
    f = bzarr[0]),
    u = f + ":" + n.ext;
    if (u && _config.extopen.ext[u]) {
        if (t && _config.extopen.all[_config.extopen.user[u]])
            return _config.extopen.user[u];
        for (i = 0; i < _config.extopen.ext[u].length; i++)
            if (_config.extopen.all[_config.extopen.ext[u][i]]) {
                if (t && _config.extopen.all[_config.extopen.ext[u][i]].isdefault > 0)
                    return _config.extopen.all[_config.extopen.ext[u][i]].extid;
                r.push(_config.extopen.all[_config.extopen.ext[u][i]])
            }
    }
    if (n.ext && _config.extopen.ext[n.ext]) {
        if (t && _config.extopen.all[_config.extopen.user[n.ext]])
            return _config.extopen.user[n.ext];
        for (i = 0; i < _config.extopen.ext[n.ext].length; i++)
            if (_config.extopen.all[_config.extopen.ext[n.ext][i]]) {
                if (t && _config.extopen.all[_config.extopen.ext[n.ext][i]].isdefault > 0)
                    return _config.extopen.all[_config.extopen.ext[n.ext][i]].extid;
                r.push(_config.extopen.all[_config.extopen.ext[n.ext][i]])
            }
    }
    if (n.type != n.ext && _config.extopen.ext[n.type]) {
        if (t && _config.extopen.all[_config.extopen.user[n.type]])
            return _config.extopen.user[n.type];
        for (i = 0; i < _config.extopen.ext[n.type].length; i++)
            if (_config.extopen.all[_config.extopen.ext[n.type][i]]) {
                if (t && _config.extopen.all[_config.extopen.ext[n.type][i]].isdefault > 0)
                    return _config.extopen.all[_config.extopen.ext[n.type][i]].extid;
                r.push(_config.extopen.all[_config.extopen.ext[n.type][i]])
            }
    }
    if (t)
        return r.length > 0 ? r[0].extid : !1;
    appids = [];
    for (i in r)
        jQuery.inArray(r[i].appid, appids) > -1 ? r.splice(i, 1) : appids.push(r[i].appid);
    return r.length > 0 ? r : !1
}
,
_ico.Open = function(n, t) {
    var i, r, u;
    jQuery("#shadow").hide(),
    i = _config.sourcedata.icos[n];
    if (!i.icoid)
        return;
    i.type == "shortcut" && (_config.sourcedata.icos[i.tdata.icoid] = i.tdata,
    i = i.tdata),
    i.id = _config.sourcedata.icos[n].icoid,
    i.text = _config.sourcedata.icos[n].name;
    if (i.type == "app") {
        if (_config.sourcedata.app[i.oid] && _config.sourcedata.app[i.oid].available < 1) {
            Alert(__lang.regret_app + _config.sourcedata.app[i.oid].appname + __lang.already_close, 5, null, null, "info");
            return
        }
        if (i.url.indexOf("dzzjs:") === 0) {
            eval(i.url.replace("dzzjs:", ""));
            return
        }
        if (i.open > 0) {
            window.open(i.url);
            return
        }
        OpenAppWin(i.id);
        return
    }
    if (i.type == "folder" || i.type == "pan" || i.type == "storage" || i.type == "ftp" || i.type == "disk") {
        OpenFolderWin(i.id, i.flag ? 1 : 0);
        return
    }
    if (i.type == "dzzdoc") {
        OpenAppWin(i.id, i.url);
        return
    }
    t || (t = _ico.getExtOpen(i, !0));
    if (t) {
        if (_config.extopen.all[t].appid > 0 && _config.sourcedata.app[_config.extopen.all[t].appid].available < 1) {
            Alert(__lang.regret_app + _config.sourcedata.app[_config.extopen.all[t].appid].appname + __lang.already_close, 5, null, null, "info");
            return
        }
        r = _ico.ExtOpen_Replace(i, t);
        if (r) {
            r = r.replace(/{\w+}/g, "");
            if (r.indexOf("dzzjs:") === 0) {
                eval(decodeURIComponent(r.replace("dzzjs:", "")));
                return
            }
            _config.extopen.all[t].nodup > 0 && _config.extopen.all[t].appid > 0 ? OpenApp(_config.extopen.all[t].appid, r) : OpenAppWin(i.icoid, t, r)
        }
    } else
        u = '<dl style="margin:0">',
        u += '\t<dt style="margin-bottom:10px;">' + __lang.support_application_file + "</dt>",
        u += '\t<dd  style="margin-bottom:10px;">1.&nbsp;' + __lang.open + "&nbsp;<a style=\"color:#08c\" href=\"javascrip:;\" onclick=\"_login.click('sys_market');hideMenu('fwin_dialog', 'dialog');return false\">" + __lang.WinTitle.market + "</a> &nbsp;" + __lang.select_relevant_app_installation + "</dd>",
        u += '\t<dd  style="margin-bottom:10px;">2.&nbsp;<a style="color:#08c" href="javascript:;" onclick="_ico.downAttach(\'' + n + "');hideMenu('fwin_dialog', 'dialog')\">" + __lang.promptly_download + "</a></dd>",
        u += "</dl>",
        Alert(u, 0, null, null, "info")
}
,
_ico.appendIcoids = function(n, t) {
    var o = _config.sourcedata.icos[n[0]].pfid, f, c, s, i;
    if (_config.sourcedata.icos[n[0]].isdelete > 0)
        o = _config.space.typefid.recycle;
    else
        for (i in n)
            _config.sourcedata.icos[n[i]].type == "folder" && (_config.sourcedata.folder[_config.sourcedata.icos[n[i]].oid].pfid = o);
    if (o == _config.space.typefid.desktop) {
        container = "icosContainer_body_" + o;
        var u = _config.screenList
          , e = 0
          , r = [];
        if (jQuery.inArray(t, u) > -1)
            for (i = 0; i < u.length; i++)
                u[i] == t ? (r = r.concat(n),
                r[r.length] = u[i],
                e = i) : r[r.length] = u[i];
        else
            r = u.concat(n);
        for (_config.screenList = r,
        e == 0 && (e = r.length - 1),
        i = 0; i < n.length; i++)
            c = _ico.CIco(n[i], container, e + i);
        _layout.resize()
    } else if (o == _config.space.typefid.dock) {
        var u = _config.dockTaskList
          , e = -1
          , r = []
          , h = [];
        for (i = 0; i < n.length; i++)
            f = _config.sourcedata.icos[n[i]].type == "app" ? "app_" + _config.sourcedata.icos[n[i]].oid : n[i],
            _dock.icos[f] ? _dock.icos[f].pined = 1 : h.push(f);
        if (jQuery.inArray(t, u) > -1)
            for (i = 0; i < u.length; i++)
                u[i] == t ? (r = r.concat(h),
                r[r.length] = u[i],
                e = i) : r[r.length] = u[i];
        else
            r = u.concat(h);
        for (_config.dockTaskList = r,
        e == -1 && (e = r.length - 1),
        i = 0; i < n.length; i++)
            f = _config.sourcedata.icos[n[i]].type == "app" ? "app_" + _config.sourcedata.icos[n[i]].oid : n[i],
            c = _dock.Ctask(f, null, _config.sourcedata.icos[n[i]], 1, e + i);
        _dock.refreshlist(),
        _dock.setDockSize()
    }
    for (s in _filemanage.cons)
        if (_filemanage.cons[s].fid == o)
            for (i = 0; i < n.length; i++)
                _filemanage.cons[s].CreateIcos(_config.sourcedata.icos[n[i]])
}
,
_ico.removeIcoid = function(n) {
    var l = _config.sourcedata.icos[n], s, i, h, v, a, r, u, t, f, e, c, o;
    if (!l)
        return;
    if (l.type == "folder")
        for (s in _window.windows)
            _window.windows[s].type == "folder" && _window.windows[s].fid == l.oid && _window.windows[s].Close();
    i = _config.sourcedata.icos[n].pfid,
    _config.sourcedata.icos[n].isdelete > 0 && (i = _config.space.typefid.recycle);
    if (i == _config.space.typefid.desktop) {
        for (u = [],
        h = _config.screenList,
        t = 0; t < h.length; t++)
            h[t] != n && (u[u.length] = h[t]);
        _config.screenList = u,
        v = _layout.autolist,
        v && (f = _ico.icos[n],
        _layout.iconposition < 4 ? jQuery("#icosContainer_body_" + _layout.fid).find(".Icoblock").each(function() {
            var i = this.id.replace("icon_", ""), n = _ico.icos[i], t;
            n.pos > f.pos && (n.pos -= 1,
            t = n.getpos(n.pos, "icosContainer_body_" + _layout.fid),
            n.left = t[0],
            n.top = t[1],
            n.board.style.left = n.left + "px",
            n.board.style.top = n.top + "px")
        }) : _ico.refreshList(i),
        _layout.resize()),
        _select.SelectedStyle(f.container, n, !1),
        jQuery(f.board).remove();
        for (e in _ico.icos[n])
            delete _ico.icos[n][e];
        delete _ico.icos[n]
    } else if (i == _config.space.typefid.dock) {
        for (a = _config.sourcedata.icos[n],
        r = a.type == "app" ? "app_" + a.oid : n,
        u = [],
        t = 0; t < _config.dockTaskList.length; t++)
            _config.dockTaskList[t] != r && u.push(_config.dockTaskList[t]);
        _config.dockTaskList = u,
        f = _dock.icos[r],
        jQuery("#taskbar_dock").find(".task_Icoblock").each(function() {
            var i = this.id.replace("task_", ""), n = _dock.icos[i], t;
            n.pos > f.pos && (n.pos -= 1,
            t = n.getpos(n.pos),
            n.left = t[0],
            n.top = t[1],
            n.board.style.left = n.left + "px",
            n.board.style.top = n.top + "px")
        }),
        jQuery("#task_" + r).remove();
        for (e in _dock.icos[r])
            delete _dock.icos[r][e];
        delete _dock.icos[r],
        _dock.setDockSize()
    } else
        i == _config.space.typefid.recycle && (_config.sourcedata.folder[i].iconum = parseInt(_config.sourcedata.folder[i].iconum) - 1,
        _ico.checkRecycleStatus());
    for (c in _filemanage.cons)
        o = _filemanage.cons[c],
        o.data[n] && (_select.SelectedStyle("icosContainer_content_" + o.winid + "_" + c, n, !1),
        o.delIcos(_config.sourcedata.icos[n]))
}
,
_ico.prototype.Focus = function() {
    this.zIndex < _ico.zIndex && (this.board.style.zIndex = this.zIndex = ++_ico.zIndex)
}
,
_ico.prototype.changeXY = function(n, t, i) {
    if (i)
        this.left = n,
        this.top = t;
    else {
        var r = jQuery("#" + this.container).offset();
        this.left = n - r.left,
        this.top = t - r.top
    }
    this.board.style.left = this.left + "px",
    this.board.style.top = this.top + "px",
    i ? _config.sourcedata.icos[this.id].position = "" : (_config.sourcedata.icos[this.id].position = this.left + "_" + this.top,
    _config.Permission_Container("admin", this.container) && jQuery.post(_config.saveurl + "&do=icoposition&dataname=position&gid=" + _config.gid, {
        icoid: this.id,
        position: this.left + "_" + this.top
    }),
    _config.saveTimer && window.clearTimeout(_config.saveTimer),
    _config.saveTimer = setTimeout(function() {
        _config.sendConfig()
    }, _config.savetime))
}
,
_ico.Rename = function(n, t) {
    var o, u, i, e, r, f;
    o = _ico.icos[n] ? _ico.icos[n].container : "";
    if (!_config.Permission("rename", _config.sourcedata.icos[n]))
        return;
    if (t) {
        u = _filemanage.cons[t],
        i = jQuery("#file_text_" + n),
        i.css("overflow", "visible"),
        jQuery("#folder_Icoblock_" + n).find(".IcoText_div").css("overflow", "visible"),
        u.oldtext = i.html(),
        e = u.view > 3 ? "<input type='text' class='' name='text'  id='input_" + n + "' style=\"width:" + (i.parent().parent().width() - 55) + 'px;height:22px;padding:2px; " value="' + u.oldtext + '">' : "<textarea type='textarea' class='textarea' name='text'  id='input_" + n + "' style=\"width:" + (i.parent().width() - 5) + 'px;height:30px;padding:2px; ">' + u.oldtext + "</textarea>",
        i.html(e),
        r = jQuery("#input_" + n),
        r.select();
        r.on("keyup", function(t) {
            (t = t ? t : event) && t.keyCode == 13 && jQuery(document).trigger("mousedown.file_text_" + n)
        });
        jQuery(document).on("mousedown.file_text_" + n, function(f) {
            var o, e;
            f = f ? f : window.event,
            o = f.srcElement ? f.srcElement : f.target,
            checkInDom(o, "file_text_" + n) == !1 && (jQuery(document).off(".file_text_" + n),
            e = r.val() || "",
            e = e.replace("\n", ""),
            u.oldtext != e ? _ajax.Rename(n, e, t) : (i.html(u.oldtext),
            i.css("overflow", "hidden"),
            jQuery("#folder_Icoblock_" + n).find(".IcoText_div").css("overflow", "hidden")))
        })
    } else {
        i = jQuery("#text_" + n),
        jQuery(_ico.icos[n].board).css("overflow", "visible").css("z-index", _ico.icos[n].zIndex + 9e3),
        i.css("overflow", "visible"),
        document.onselectstart = function() {
            return !0
        }
        ,
        _ico.icos[n].old_text_html = i.html(),
        document.getElementById("input_" + n) || (e = "<textarea class='IcoText_textarea' name='text'  id='input_" + n + "' style=\"resize:none;overflow:hidden;width:" + i.css("width") + '; "></textarea>',
        i.html(e),
        jQuery(_ico.icos[n].icoblank).css("z-index", -10)),
        document.getElementById("input_" + n).value = _ico.icos[n].text,
        r = jQuery("#input_" + n),
        f = jQuery("#input_"),
        f.css("width", _ico.icos[n].divwidth - 10),
        f.html(_ico.icos[n].text),
        BROWSER.ie || r.css("height", f.height() + 15),
        r.select();
        r.on("keyup", function(t) {
            t = t ? t : event,
            t.keyCode == 13 && jQuery(document).trigger("mousedown.text_" + n)
        });
        document.getElementById("input_" + n).onpopertychange = function() {
            var n = r.val() || "";
            n = n.replace("\n", ""),
            document.getElementById("input_").innerHTML = n,
            r.css("height", f.height() + 15)
        }
        ,
        window.addEventListener && document.getElementById("input_" + n).addEventListener("input", function() {
            var n = r.val() || "";
            n = n.replace("\n", ""),
            document.getElementById("input_").innerHTML = n,
            r.css("height", f.height() + 15)
        }, !1);
        jQuery(document).on("mousedown.text_" + n, function(t) {
            var f, u;
            t = t ? t : window.event,
            f = t.srcElement ? t.srcElement : t.target,
            checkInDom(f, "text_" + n) == !1 && (u = r.val() || "",
            u = u.replace("\n", ""),
            jQuery(document).off(".text_" + n),
            _ico.icos[n].text != u ? _ajax.Rename(n, r.val().replace("\n", "")) : (i.html(_ico.icos[n].old_text_html),
            i.css("overflow", "hidden").css("z-index", _ico.icos[n].zIndex),
            jQuery(_ico.icos[n].icoblank).css("z-index", _ico.icos[n].zIndex),
            jQuery(_ico.icos[n].board).css("z-index", _ico.icos[n].zIndex)))
        })
    }
}
,
_ico.chmod = function(n) {
    var t = _config.sourcedata.icos[n];
    showWindow("chmod", _config.ajaxurl + "&do=chmod&path=" + encodeURIComponent(t.path))
}
,
_ico.Share = function(n) {
    if (!_config.Permission("share", _config.sourcedata.icos[n])) {
        showDialog(__lang.privilege, "notice");
        return
    }
    var i = _config.sourcedata.icos[n];
    showWindow("share", _config.systemurl + "&op=ajax&do=share&path=" + i.dpath)
}
,
_ico.downAttach = function(n) {
    var i = _config.sourcedata.icos[n]
      , t = DZZSCRIPT + "?mod=io&op=download&path=" + encodeURIComponent(i.dpath) + "&t=" + +new Date;
    return BROWSER.ie ? window.open(t) : window.frames.hideframe.location = t,
    !1
}
,
_ico.downThumb = function(n) {
    var i = _config.sourcedata.icos[n]
      , t = i.url + "&filename=" + encodeURIComponent(i.name) + "&a=down&t=" + +new Date;
    return BROWSER.ie ? window.open(t) : window.frames.hideframe.location = t,
    !1
}
,
_ico.downpackage = function() {
    for (var f = "", e = [], t, r, u, i = 0; i < _config.selectall.icos.length; i++)
        t = _config.sourcedata.icos[_config.selectall.icos[i]],
        t.type == "folder" || t.type == "document" || t.type == "image" || t.type == "attach" ? e.push(t.dpath) : f += "<li>" + t.name + "</li>";
    if (f != "")
        return showmessage("<p>" + __lang.error_file_not_doenload + "</p><ul>" + f + "</ul>", "danger", 5e3, 1),
        !1;
    return r = encodeURIComponent(e.join(",")),
    r.length > 2048 ? (showmessage(__lang.choose_file_many, "danger", 3e3, 1),
    !1) : (u = DZZSCRIPT + "?mod=io&op=download&path=" + r + "&t=" + +new Date,
    BROWSER.ie ? window.open(u) : window.frames.hideframe.location = u,
    !1)
}
,
_ico.downselected = function() {
    for (var u = "", i = _config.selectall.icos, t, r, f, n = 0; n < i.length; n++)
        t = _config.sourcedata.icos[i[n]],
        t.type == "folder" || t.type == "document" || t.type == "image" || t.type == "attach" || (i.splice(n, 1),
        u += "<li>" + t.name + "</li>");
    for (u != "" && showmessage("<p>" + __lang.error_file_not_doenload + "</p><ul>" + u + "</ul>", "danger", 5e3, 1),
    jQuery("iframe.downselected").remove(),
    n = 0; n < i.length; n++)
        r = DZZSCRIPT + "?mod=io&op=download&path=" + _config.sourcedata.icos[i[n]].dpath + "&t=" + +new Date,
        BROWSER.ie ? window.open(r) : f = jQuery('<iframe id="iframe_' + i[n] + '" src="' + r + '" class="downselected"   frameborder="0" marginheight="0" marginwidth="0" width="0" height="0" allowtransparency="true" style="z-index:-99999" onload="jQuery(this).remove();console.log(this);"></iframe>').appendTo("body");
    return !1
}
,
_ico.Empty = function(n, t) {
    if (n > 0) {
        if (!t) {
            Confirm(__lang.js_empty_folder.replace("{name}", _config.sourcedata.folder[n].fname), function() {
                _ico.Empty(n, !0)
            });
            return
        }
        jQuery.getJSON(_config.systemurl + "&op=dzzcp&do=emptyFolder&fid=" + n + "&t=" + +new Date, function(t) {
            var r, i;
            if (t.msg == "success") {
                r = [];
                for (i in _config.sourcedata.icos)
                    n == _config.space.typefid.recycle ? _config.sourcedata.icos[i].isdelete > 0 && _ico.removeIcoid(i) : _config.sourcedata.icos[i].pfid == n && _ico.removeIcoid(i);
                _config.sourcedata.folder[n].iconum = 0,
                _config.space.typefid.recycle == n && _ico.checkRecycleStatus()
            } else
                Alert(t.error)
        })
    }
}
,
_ico.checkRecycleStatus = function() {
    var i = _config.space.typefid.recycle
      , n = jQuery(".Icoblock.recycle .icoimgContainer img")
      , t = n.attr("src").replace(/recycle\d*.png/i, "");
    _config.sourcedata.folder[i].iconum > 0 ? n.attr("src", t + "recycle1.png") : n.attr("src", t + "recycle.png")
}
,
_ico.Restore = function(n) {
    var i = _config.sourcedata.icos[n], t = [], r;
    _config.selectall.icos.length > 0 && jQuery.inArray(n, _config.selectall.icos) > -1 ? (i = {
        icoid: _config.selectall.icos.join(",")
    },
    t = _config.selectall.icos) : (i = {
        icoid: n
    },
    t = [n]),
    r = _config.systemurl + "&op=dzzcp&do=restore&" + jQuery.param(i) + "&t=" + +new Date,
    jQuery.getJSON(r, function(n) {
        var i, r;
        if (n.msg == "success")
            for (i = 0; i < t.length; i++)
                r = _config.sourcedata.icos[t[i]].pfid,
                _config.sourcedata.icos[t[i]].isdelete = 0,
                _select.IcoPasteTo([t[i]], [t[i]], r, 0, 0, 0, 1)
    })
}
,
_ico.property = function(n, t) {
    var f, r, i, u;
    if (t)
        f = _config.sourcedata.folder[n],
        n = encodeURIComponent("fid_" + f.path);
    else {
        r = [];
        if (_config.selectall.icos.length > 0 && jQuery.inArray(n, _config.selectall.icos) > -1)
            for (i = 0; i < _config.selectall.icos.length; i++)
                u = _config.sourcedata.icos[_config.selectall.icos[i]],
                r.push(u.dpath);
        else
            u = _config.sourcedata.icos[n],
            r = [u.dpath];
        n = encodeURIComponent(r.join(","))
    }
    showWindow("property", _config.ajaxurl + "&do=property&icoid=" + n)
}
,
_ico.setOpenDefault = function(n) {
    var r = _config.sourcedata.icos[n], t;
    r.type == "shortcut" && (r = r.tdata);
    var u = _ico.getExtOpen(r)
      , e = _ico.getExtOpen(r, !0)
      , i = '<ul  class="extopen list-unstyled">'
      , f = _config.extopen.all[e];
    for (i += '<li class="extopen-item active" icoid="' + n + '" extid="' + f.extid + '" onclick="jQuery(this).addClass(\'active\').siblings().removeClass(\'active\');"><img class="icon_32_32" src="' + f.icon + '"><a href="javascript:;">' + f.name + "</a></li>",
    t = 0; t < u.length; t++) {
        if (e == u[t].extid)
            continue;
        i += '<li class="extopen-item" icoid="' + n + '" extid="' + u[t].extid + '" onclick="jQuery(this).addClass(\'active\').siblings().removeClass(\'active\');"><img class="icon_32_32" src="' + u[t].icon + '"><a href="javascript:;">' + u[t].name + "</a></li>"
    }
    i += "</ul>",
    i += '<label class="checkbox-inline"><input type="checkbox" id="extopen_setDefault" checked="checked" value="1">&nbsp;' + __lang.always_choose_open_app + "</label>",
    showDialog(i, "message", __lang.choose_open_file_app, _ico.setOpenDefaultOK, 1)
}
,
_ico.setOpenDefaultOK = function() {
    var t = jQuery(".extopen-item.active")
      , n = t.attr("extid")
      , i = t.attr("icoid");
    jQuery("#extopen_setDefault").prop("checked") > 0 && jQuery.post(_config.ajaxurl + "&do=setExtopenDefault", {
        extid: n
    }, function() {
        _config.extopen.user[_config.extopen.all[n].ext] = n
    }),
    _ico.Open(i, n)
}
,
_ico.ShortCut = function(n) {
    var r = n.split("_"), t, i, u;
    t = r[0] == "icoid" ? _config.sourcedata.icos[r[1]] : _config.sourcedata.folder[r[1]];
    if (t.type == "shortcut")
        return;
    i = t.bz ? encodeURIComponent(t.path) : t.icoid == "home" ? "fid_" + t.oid : n,
    u = {
        flag: t.flag,
        sperm: t.sperm,
        path: i,
        pfid: _config.space.typefid.desktop
    },
    jQuery.getJSON(_config.systemurl + "&op=dzzcp&do=createShortCut&" + jQuery.param(u) + "&t=" + +new Date, function(n) {
        if (n.error)
            Alert(n.error, 3);
        else {
            _config.sourcedata.icos[n.tdata.icoid] = n.tdata;
            for (var t in n.tdata.folderarr)
                _config.sourcedata.folder[t] = n.tdata.folderarr[t];
            _ico.createIco(n)
        }
    })
}
,
_contextmenu = {},
_contextmenu.zIndex = 9999999,
_contextmenu.right_img = function(n, t) {
    var r, s, i, e, o;
    n = n ? n : window.event;
    var f = n.clientX
      , u = n.clientY
      , h = n.srcElement ? n.srcElement : n.target;
    if (/input|textarea/i.test(h.tagName))
        return !0;
    r = document.getElementById("right_img").innerHTML,
    s = _config.sourcedata.icos[t],
    r = r.replace(/XX/g, f),
    r = r.replace(/YY/g, u),
    r = r.replace(/_imgurl/g, s.url),
    r = r.replace(/_icoid/g, t),
    i = document.getElementById("right_contextmenu") ? jQuery(document.getElementById("right_contextmenu")) : jQuery('<div id="right_contextmenu" class="menu"></div>').appendTo(document.body),
    i.addTouch(),
    i.html(r),
    i.css({
        "z-index": _contextmenu.zIndex + 1
    }),
    i.show(),
    e = document.documentElement.clientWidth,
    o = document.documentElement.clientHeight,
    i.find(">div").each(function() {
        var n = jQuery(this), t = n.find(".menu"), r;
        t.length ? (r = n.find(".menu-shadow"),
        n.bind("mouseover", function() {
            _contextmenu.ppp && _contextmenu.ppp.hide(),
            _contextmenu.kkk && _contextmenu.kkk.hide(),
            _contextmenu.last && _contextmenu.last.removeClass("menu-active"),
            _contextmenu.kkk = r,
            _contextmenu.last = n,
            _contextmenu.ppp = t,
            n.addClass("menu-active");
            var s = n.find(".menu")
              , h = i.width() - 1;
            return suby = 0,
            f + i.width() * 2 > e && (h = h - s.width() - i.width() - 6),
            u + n.position().top + s.height() > o && (suby = suby - s.height() + n.height() - 5),
            s.css({
                left: h,
                top: suby,
                "z-index": _contextmenu.zIndex + 2,
                display: "block"
            }),
            r.css({
                display: "block",
                zIndex: _contextmenu.zIndex + 1,
                left: h,
                top: suby,
                width: s.outerWidth(),
                height: s.outerHeight()
            }),
            t.find(".menu-item").bind("mouseover", function() {
                jQuery(this).addClass("menu-active")
            }),
            t.find(".menu-item").bind("mouseout", function() {
                return jQuery(this).removeClass("menu-active"),
                !1
            }),
            !1
        }),
        n.bind("mouseout", function() {
            return n.removeClass("menu-active"),
            r.hide(),
            t.hide(),
            !1
        })) : (n.bind("mouseover", function() {
            return _contextmenu.last && _contextmenu.last.removeClass("menu-active"),
            _contextmenu.ppp && _contextmenu.ppp.hide(),
            _contextmenu.kkk && _contextmenu.kkk.hide(),
            jQuery(this).addClass("menu-active"),
            !1
        }),
        n.bind("mouseout", function() {
            jQuery(this).removeClass("menu-active")
        }))
    }),
    f + i.width() > e && (f = f - i.width()),
    u + i.height() > o && (u = u - i.height()),
    i.css({
        left: f,
        top: u
    }),
    jQuery("#shadow").css({
        display: "block",
        zIndex: _contextmenu.zIndex,
        left: f,
        top: u,
        width: i.outerWidth(),
        height: i.outerHeight()
    });
    jQuery(document).on("mousedown.right_contextmenu", function(n) {
        n = n ? n : window.event;
        var t = n.srcElement ? n.srcElement : n.target;
        checkInDom(t, "right_contextmenu") == !1 && (i.hide(),
        jQuery("#shadow").hide(),
        i.empty(),
        jQuery(document).unbind(".right_contextmenu"),
        _contextmenu.kkk = null,
        _contextmenu.ppp = null,
        _contextmenu.last = null)
    })
}
,
_contextmenu.right_body = function(n, t) {
    var h, i, o, s;
    n = n ? n : window.event,
    h = n.srcElement ? n.srcElement : n.target;
    if (/input|textarea/i.test(h.tagName))
        return !0;
    var u = n.clientX
      , f = n.clientY
      , e = _layout
      , c = t
      , r = document.getElementById("right_body").innerHTML;
    r = r.replace(/XX/g, u),
    r = r.replace(/YY/g, f),
    r = r.replace(/_filemanageid/g, ""),
    r = r.replace(/_container/g, t),
    i = document.getElementById("right_contextmenu") ? jQuery(document.getElementById("right_contextmenu")) : jQuery('<div id="right_contextmenu" class="menu"></div>').appendTo(document.body),
    i.html(r),
    i.find("span[pid=menu_icon_iconview_" + e.iconview + "]").removeClass("icon-notselect").addClass("icon-select"),
    i.find("span[pid=menu_icon_position_" + e.iconposition + "]").removeClass("icon-notselect").addClass("icon-select"),
    i.find("span[pid=menu_icon_autolist_" + e.autolist + "]").removeClass("icon-notselect").addClass("icon-select"),
    i.find("span[did=menu_icon_direction_" + e.direction + "]").removeClass("icon-notselect").addClass("icon-select"),
    _config.Permission_Container("app", t) || i.find(".appmarket").remove(),
    _config.Permission_Container("folder", t) || i.find(".newfolder").remove(),
    _config.Permission_Container("link", t) || i.find(".newlink").remove(),
    _config.Permission_Container("dzzdoc", t) || i.find(".newdzzdoc").remove(),
    _config.Permission_Container("newtype", t) || (i.find(".newtext").remove(),
    i.find(".newdoc").remove(),
    i.find(".newexcel").remove(),
    i.find(".newpowerpoint").remove()),
    i.find(".create .menu-item").length < 1 && i.find(".create").remove(),
    _config.cut.icos.length < 1 && i.find(".paste").remove(),
    _config.Permission_Container("upload", t) ? BROWSER.ie ? (jQuery('<input id="right_input_icosContainer_body_' + t + '" name="files[]" tabIndex="-1" style="position: absolute;outline:none; filter: alpha(opacity=0); PADDING-BOTTOM: 0px; margin: 0px; padding-left: 0px; padding-right: 0px; font-family: Arial; font-size: 180px;height:30px;width:200px;top: 0px; cursor: pointer; right: 0px; padding-top: 0px; opacity: 0;direction:ltr;background-image:none" type="file" multiple="multiple" >').appendTo(i.find(".upload")),
    _layout.createUpload("right_input_icosContainer_body_" + t, "icosContainer_body_" + t, null, null)) : i.find(".upload").get(0).onclick = function() {
        jQuery("#input_icosContainer_body_" + t).trigger("click"),
        i.hide(),
        jQuery("#shadow").hide()
    }
    : i.find(".upload").remove();
    if (i.find(".menu-item").length < 1) {
        i.hide();
        return
    }
    i.find(".menu-sep").each(function() {
        (!jQuery(this).next().first().hasClass("menu-item") || !jQuery(this).prev().first().hasClass("menu-item")) && jQuery(this).remove()
    }),
    i.css({
        "z-index": _contextmenu.zIndex + 1
    }),
    i.show(),
    o = document.documentElement.clientWidth,
    s = document.documentElement.clientHeight,
    i.find(">div").each(function() {
        var n = jQuery(this), t = n.find(".menu"), r;
        t.length ? (r = n.find(".menu-shadow"),
        n.bind("mouseover", function() {
            _contextmenu.ppp && _contextmenu.ppp.hide(),
            _contextmenu.kkk && _contextmenu.kkk.hide(),
            _contextmenu.last && _contextmenu.last.removeClass("menu-active"),
            _contextmenu.kkk = r,
            _contextmenu.last = n,
            _contextmenu.ppp = t,
            n.addClass("menu-active");
            var e = n.find(".menu")
              , h = i.width() - 1;
            return suby = 0,
            u + i.width() * 2 > o && (h = h - e.width() - i.width() - 6),
            f + n.position().top + e.height() > s && (suby = suby - e.height() + n.height() - 5),
            e.css({
                left: h,
                top: suby,
                "z-index": _contextmenu.zIndex + 2,
                display: "block"
            }),
            r.css({
                display: "block",
                zIndex: _contextmenu.zIndex + 1,
                left: h,
                top: suby,
                width: e.outerWidth(),
                height: e.outerHeight()
            }),
            t.find(".menu-item").bind("mouseover", function() {
                jQuery(this).addClass("menu-active")
            }),
            t.find(".menu-item").bind("mouseout", function() {
                return jQuery(this).removeClass("menu-active"),
                !1
            }),
            !1
        }),
        n.bind("mouseout", function() {
            return n.removeClass("menu-active"),
            r.hide(),
            t.hide(),
            !1
        })) : (n.bind("mouseover", function() {
            return _contextmenu.last && _contextmenu.last.removeClass("menu-active"),
            _contextmenu.ppp && _contextmenu.ppp.hide(),
            _contextmenu.kkk && _contextmenu.kkk.hide(),
            jQuery(this).addClass("menu-active"),
            !1
        }),
        n.bind("mouseout", function() {
            jQuery(this).removeClass("menu-active")
        }))
    }),
    u + i.width() > o && (u = u - i.width()),
    f + i.height() > s && (f = f - i.height()),
    i.css({
        left: u,
        top: f
    }),
    jQuery("#shadow").css({
        display: "block",
        zIndex: _contextmenu.zIndex,
        left: u,
        top: f,
        width: i.outerWidth(),
        height: i.outerHeight()
    });
    jQuery(document).on("mousedown.right_contextmenu", function(n) {
        n = n ? n : window.event;
        var t = n.srcElement ? n.srcElement : n.target;
        checkInDom(t, "right_contextmenu") == !1 && (i.hide(),
        jQuery("#shadow").hide(),
        jQuery(document).unbind(".right_contextmenu"),
        _contextmenu.kkk = null,
        _contextmenu.ppp = null,
        _contextmenu.last = null)
    })
}
,
_contextmenu.right_folder = function(n, t) {
    var c, i, s, h;
    n = n ? n : window.event,
    c = n.srcElement ? n.srcElement : n.target;
    if (/input|textarea/i.test(c.tagName))
        return !0;
    var f = n.clientX
      , e = n.clientY
      , o = _window.windows[t]
      , u = o.fid
      , l = _config.sourcedata.folder[u]
      , r = document.getElementById("right_folder").innerHTML;
    r = r.replace(/XX/g, f),
    r = r.replace(/YY/g, e),
    r = r.replace(/_filemanageid/g, o.filemanageid),
    r = r.replace(/_container/g, u),
    r = r.replace(/_winid/g, t),
    r = r.replace(/_icoid/g, t),
    r = r.replace(/_fid/g, o.fid),
    i = document.getElementById("right_contextmenu") ? jQuery(document.getElementById("right_contextmenu")) : jQuery('<div id="right_contextmenu" class="menu"></div>').appendTo(document.body),
    i.html(r),
    _config.Permission_Container("upload", u) ? BROWSER.ie ? (jQuery('<input id="right_input_icosContainer_folder_' + u + '" name="files[]" tabIndex="-1" style="position:absolute;outline:none; filter: alpha(opacity=0); PADDING-BOTTOM: 0px; margin: 0px; padding-left: 0px; padding-right: 0px; font-family: Arial; font-size: 180px;height:30px;z-index:100;width:150px; top: 0px; cursor: pointer; right: 0px; padding-top: 0px; opacity: 0;direction:ltr;background-image:none" type="file" multiple="multiple" >').appendTo(i.find(".upload")),
    _layout.createUpload("right_input_icosContainer_folder_" + u, "icosContainer_folder_" + encodeURIComponent(_config.sourcedata.folder[u].path), null, null)) : i.find(".upload").get(0).onclick = function() {
        jQuery("#input_icosContainer_folder_" + u).trigger("click"),
        i.hide(),
        jQuery("#shadow").hide()
    }
    : i.find(".upload").remove(),
    _config.Permission_Container("folder", u) || i.find(".newfolder").remove(),
    _config.Permission_Container("link", u) || i.find(".newlink").remove(),
    _config.Permission_Container("dzzdoc", u) || i.find(".newdzzdoc").remove(),
    _config.Permission_Container("newtype", u) || (i.find(".newtext").remove(),
    i.find(".newdoc").remove(),
    i.find(".newexcel").remove(),
    i.find(".newpowerpoint").remove()),
    i.find(".create .menu-item").length < 1 && i.find(".create").remove(),
    _config.cut.icos.length < 1 && i.find(".paste").remove();
    if (i.find(".menu-item").length < 1) {
        i.hide();
        return
    }
    _config.space.typefid.recycle == o.fid ? (i.find(".appmarket").remove(),
    i.find(".create").remove(),
    i.find(".autolist").remove(),
    i.find(".paste").remove(),
    i.find(".upload").remove(),
    i.find(".property").remove()) : i.find(".empty").remove(),
    i.find(".menu-sep").each(function() {
        (!jQuery(this).next().first().hasClass("menu-item") || !jQuery(this).prev().first().hasClass("menu-item")) && jQuery(this).remove()
    }),
    i.css({
        "z-index": _contextmenu.zIndex + 1
    }),
    i.find(".menu_icon_filemanageview_" + _filemanage.cons[o.filemanageid].view).removeClass("icon-notselect").addClass("icon-select"),
    i.find(".menu_icon_filemanagedisp_" + _filemanage.cons[o.filemanageid].disp).removeClass("icon-notselect").addClass("icon-select"),
    i.show(),
    s = document.documentElement.clientWidth,
    h = document.documentElement.clientHeight,
    i.find(">div").each(function() {
        var n = jQuery(this), t = n.find(".menu"), r;
        t.length ? (r = n.find(".menu-shadow"),
        n.bind("mouseover", function() {
            _contextmenu.ppp && _contextmenu.ppp.hide(),
            _contextmenu.kkk && _contextmenu.kkk.hide(),
            _contextmenu.last && _contextmenu.last.removeClass("menu-active"),
            _contextmenu.kkk = r,
            _contextmenu.last = n,
            _contextmenu.ppp = t,
            n.addClass("menu-active");
            var u = n.find(".menu")
              , o = i.width() - 1;
            return suby = 0,
            f + i.width() * 2 > s && (o = o - u.width() - i.width() - 6),
            e + n.position().top + u.height() > h && (suby = suby - u.height() + n.height() - 5),
            u.css({
                left: o,
                top: suby,
                "z-index": _contextmenu.zIndex + 2,
                display: "block"
            }),
            r.css({
                display: "block",
                zIndex: _contextmenu.zIndex + 1,
                left: o,
                top: suby,
                width: u.outerWidth(),
                height: u.outerHeight()
            }),
            t.find(".menu-item").bind("mouseover", function() {
                jQuery(this).addClass("menu-active")
            }),
            t.find(".menu-item").bind("mouseout", function() {
                return jQuery(this).removeClass("menu-active"),
                !1
            }),
            !1
        }),
        n.bind("mouseout", function() {
            return n.removeClass("menu-active"),
            r.hide(),
            t.hide(),
            !1
        })) : (n.bind("mouseover", function() {
            return _contextmenu.last && _contextmenu.last.removeClass("menu-active"),
            _contextmenu.ppp && _contextmenu.ppp.hide(),
            _contextmenu.kkk && _contextmenu.kkk.hide(),
            jQuery(this).addClass("menu-active"),
            !1
        }),
        n.bind("mouseout", function() {
            jQuery(this).removeClass("menu-active")
        }))
    }),
    f + i.width() > s && (f = f - i.width()),
    e + i.height() > h && (e = e - i.height()),
    i.css({
        left: f,
        top: e
    }),
    jQuery("#shadow").css({
        display: "block",
        zIndex: _contextmenu.zIndex,
        left: f,
        top: e,
        width: i.outerWidth(),
        height: i.outerHeight()
    });
    jQuery(document).on("mousedown.right_contextmenu", function(n) {
        n = n ? n : window.event;
        var t = n.srcElement ? n.srcElement : n.target;
        checkInDom(t, "right_contextmenu") == !1 && (i.hide(),
        jQuery("#shadow").hide(),
        i.empty(),
        jQuery(document).unbind(".right_contextmenu"),
        _contextmenu.kkk = null,
        _contextmenu.ppp = null,
        _contextmenu.last = null)
    })
}
,
_contextmenu.right_ico = function(n, t, i) {
    var f, r, y, v, o, s, u, e, l, a;
    n = n ? n : window.event,
    f = n.srcElement ? n.srcElement : n.target;
    if (/input|textarea/i.test(f.tagName))
        return !0;
    var c = n.clientX
      , h = n.clientY
      , f = _config.sourcedata.icos[t];
    r = document.getElementById("right_contextmenu") ? jQuery(document.getElementById("right_contextmenu")) : jQuery('<div id="right_contextmenu" class="menu"></div>').appendTo(document.body),
    t = t + "",
    u = document.getElementById("right_ico").innerHTML,
    u = u.replace(/XX/g, c),
    u = u.replace(/YY/g, h),
    u = u.replace(/_icoid/g, t),
    u = u.replace(/_imageurl/g, f.url),
    u = u.replace(/_filemanageid/g, i),
    u = u.replace(/_oid/g, f.oid),
    y = [];
    if (_config.selectall.icos.length > 0)
        for (e = 0; e < _config.selectall.icos.length; e++)
            o = _config.sourcedata.icos[_config.selectall.icos[e]],
            (o.type == "folder" || o.type == "document" || o.type == "image" || o.type == "attach") && y.push(o.icoid);
    f.type == "user" && (u = u.replace(/-uid-/g, f.oid)),
    r.html(u),
    (f.type == "shortcut" || f.type == "storage" || f.type == "pan" || _config.myuid < 1) && r.find(".shortcut").remove(),
    _config.Permission("copy", f) || r.find(".copy").remove(),
    _config.Permission("share", f) || r.find(".share").remove(),
    _config.Permission("edit", f) || r.find(".edit").remove(),
    _config.Permission("rename", f) || r.find(".rename").remove(),
    _config.Permission_Container("admin", _layout.fid) || (r.find(".setwallpaper").remove(),
    r.find(".setwidget").remove()),
    _config.Permission("download", f) || r.find(".download").remove(),
    _config.Permission("chmod", f) || r.find(".chmod").remove(),
    _config.Permission("delete", f) || (r.find(".cut").remove(),
    r.find(".delete").remove(),
    r.find(".realdelete").remove()),
    f.notdelete > 0 && f.type != "app" && (r.find(".delete").remove(),
    r.find(".realdelete").remove(),
    r.find(".edit").remove(),
    r.find(".cut").remove(),
    r.find(".copy").remove()),
    f.type != "image" && r.find(".setwallpaper").remove();
    if (_config.selectall.icos.length > 1 && jQuery.inArray(t, _config.selectall.icos) > -1) {
        for (r.find(".menu-item:not(.delete,.cut,.copy,.realdelete,.restore,.downpackage,.downselected,.property)").remove(),
        v = 0,
        e = 0; e < _config.selectall.icos.length; e++) {
            o = _config.sourcedata.icos[_config.selectall.icos[e]];
            if (o.type == "folder" || o.type == "document" || o.type == "image" || o.type == "attach")
                if (_config.Permission("download", o)) {
                    v = 1;
                    break
                }
        }
        v || (r.find(".downpackage").remove(),
        r.find(".downselected").remove())
    } else
        r.find(".downpackage").remove(),
        r.find(".downselected").remove();
    f.isdelete > 0 ? r.find(".menu-item:not(.cut,.realdelete,.restore)").remove() : (f.type == "folder" && f.oid == _config.space.typefid.recycle || r.find(".empty").remove(),
    r.find(".restore").remove());
    if (!r.find(".menu-item").length) {
        r.hide();
        return
    }
    s = _ico.getExtOpen(f.type == "shortcut" ? f.tdata : f);
    if (s === !0)
        r.find(".openwith").remove();
    else if (s === !1)
        r.find(".openwith").remove(),
        r.find(".open").remove();
    else if (s.length > 1) {
        for (u = '<span class="menu-icon icon-openwith" ></span><span class="menu-text">' + __lang.method_open + '</span><span class="menu-rightarrow"></span>',
        u += '<div class=" menu " style="display:none">',
        e = 0; e < s.length; e++)
            u += '<div class="menu-item" onClick="_ico.Open(\'' + t + "','" + s[e].extid + "');jQuery('#right_contextmenu').hide();jQuery('#shadow').hide();return false;\">",
            s[e].icon && (u += '<span class="menu-icon" style="background:none"><img width="100%" height="100%" src=' + s[e].icon + "></span>"),
            u += '<span class="menu-text">' + s[e].name + "</span>",
            u += "</div>";
        u += '<div class="menu-item" onClick="_ico.setOpenDefault(\'' + t + "');jQuery('#right_contextmenu').hide();jQuery('#shadow').hide();return false;\">",
        u += '<span class="menu-icon icon-config"></span>',
        u += '<span class="menu-text">' + __lang.set_default_open + "</span>",
        u += "</div>",
        u += "</div>",
        r.find(".openwith").html(u)
    } else
        r.find(".openwith").remove();
    r.find(".menu-sep").each(function() {
        (!jQuery(this).next().first().hasClass("menu-item") || !jQuery(this).prev().first().hasClass("menu-item")) && jQuery(this).remove()
    }),
    r.addClass(_window.className),
    r.css({
        "z-index": _contextmenu.zIndex + 1
    }),
    r.show(),
    l = document.documentElement.clientWidth,
    a = document.documentElement.clientHeight,
    r.find(">div").each(function() {
        var n = jQuery(this), t = n.find(".menu"), i;
        t.length ? (i = n.find(".menu-shadow"),
        n.bind("mouseover", function() {
            _contextmenu.ppp && _contextmenu.ppp.hide(),
            _contextmenu.kkk && _contextmenu.kkk.hide(),
            _contextmenu.last && _contextmenu.last.removeClass("menu-active"),
            _contextmenu.kkk = i,
            _contextmenu.last = n,
            _contextmenu.ppp = t,
            n.addClass("menu-active");
            var u = n.find(".menu")
              , f = r.width() - 1;
            return suby = 0,
            c + r.width() * 2 > l && (f = f - u.width() - r.width() - 6),
            h + n.position().top + u.height() > a && (suby = suby - u.height() + n.height() - 5),
            u.css({
                left: f,
                top: suby,
                "z-index": _contextmenu.zIndex + 2,
                display: "block"
            }),
            i.css({
                display: "block",
                zIndex: _contextmenu.zIndex + 1,
                left: f,
                top: suby,
                width: u.outerWidth(),
                height: u.outerHeight()
            }),
            t.find(".menu-item").bind("mouseover", function() {
                jQuery(this).addClass("menu-active")
            }),
            t.find(".menu-item").bind("mouseout", function() {
                return jQuery(this).removeClass("menu-active"),
                !1
            }),
            !1
        }),
        n.bind("mouseout", function() {
            return n.removeClass("menu-active"),
            i.hide(),
            t.hide(),
            !1
        })) : (n.bind("mouseover", function() {
            return _contextmenu.last && _contextmenu.last.removeClass("menu-active"),
            _contextmenu.ppp && _contextmenu.ppp.hide(),
            _contextmenu.kkk && _contextmenu.kkk.hide(),
            jQuery(this).addClass("menu-active"),
            !1
        }),
        n.bind("mouseout", function() {
            jQuery(this).removeClass("menu-active")
        }))
    }),
    c + r.width() > l && (c = c - r.width()),
    h + r.height() > a && (h = h - r.height()),
    r.css({
        left: c,
        top: h
    }),
    jQuery("#shadow").css({
        display: "block",
        zIndex: _contextmenu.zIndex,
        left: c,
        top: h,
        width: r.outerWidth(),
        height: r.outerHeight()
    });
    jQuery(document).on("mousedown.right_contextmenu", function(n) {
        n = n ? n : window.event;
        var t = n.srcElement ? n.srcElement : n.target;
        checkInDom(t, "right_contextmenu") == !1 && (r.hide(),
        jQuery("#shadow").hide(),
        r.empty(),
        jQuery(document).unbind(".right_contextmenu"),
        _contextmenu.kkk = null,
        _contextmenu.ppp = null,
        _contextmenu.last = null)
    })
}
,
_contextmenu.task_right_Ico = function(n, t) {
    var h, r, i, e, s, o;
    n = n ? n : window.event,
    h = n.srcElement ? n.srcElement : n.target;
    if (/input|textarea/i.test(h.tagName))
        return !0;
    var f = n.clientX
      , u = n.clientY
      , h = _dock.icos[t];
    _contextmenu.task_right_Ico_html = document.getElementById("task_right_Ico").innerHTML,
    r = document.getElementById("task_right_Ico").innerHTML,
    r = r.replace(/XX/g, f),
    r = r.replace(/YY/g, u),
    r = r.replace(/_dockid/g, t),
    i = document.getElementById("right_contextmenu") ? jQuery(document.getElementById("right_contextmenu")) : jQuery('<div id="right_contextmenu" class="menu"></div>').appendTo(document.body),
    i.html(r);
    try {
        e = _window.windows[h.winid].titleButton.split("|"),
        jQuery.inArray("MAX", e) == -1 && (i.find(".FOCUS").remove(),
        i.find(".MAX").remove()),
        jQuery.inArray("MIN", e) == -1 && i.find(".MIN").remove(),
        jQuery.inArray("CLOSE", e) == -1 && i.find(".CLOSE").remove(),
        i.find(".menu-item").length || i.remove()
    } catch (n) {}
    i.css({
        "z-index": _contextmenu.zIndex + 1
    }),
    i.show(),
    s = document.documentElement.clientWidth,
    o = document.documentElement.clientHeight,
    i.find(">div").each(function() {
        var n = jQuery(this), t = n.find(".menu"), r;
        t.length ? (r = n.find(".menu-shadow"),
        n.bind("mouseover", function() {
            _contextmenu.ppp && _contextmenu.ppp.hide(),
            _contextmenu.kkk && _contextmenu.kkk.hide(),
            _contextmenu.last && _contextmenu.last.removeClass("menu-active"),
            _contextmenu.kkk = r,
            _contextmenu.last = n,
            _contextmenu.ppp = t,
            n.addClass("menu-active");
            var e = n.find(".menu")
              , h = i.width() - 1;
            return suby = 0,
            f + i.width() * 2 > s && (h = h - e.width() - i.width() - 6),
            u + n.position().top + e.height() > o && (suby = suby - e.height() + n.height() - 5),
            e.css({
                left: h,
                top: suby,
                "z-index": _contextmenu.zIndex + 2,
                display: "block"
            }),
            r.css({
                display: "block",
                zIndex: _contextmenu.zIndex + 1,
                left: h,
                top: suby,
                width: e.outerWidth(),
                height: e.outerHeight()
            }),
            t.find(".menu-item").bind("mouseover", function() {
                jQuery(this).addClass("menu-active")
            }),
            t.find(".menu-item").bind("mouseout", function() {
                return jQuery(this).removeClass("menu-active"),
                !1
            }),
            !1
        }),
        n.bind("mouseout", function() {
            return n.removeClass("menu-active"),
            r.hide(),
            t.hide(),
            !1
        })) : (n.bind("mouseover", function() {
            return _contextmenu.last && _contextmenu.last.removeClass("menu-active"),
            _contextmenu.ppp && _contextmenu.ppp.hide(),
            _contextmenu.kkk && _contextmenu.kkk.hide(),
            jQuery(this).addClass("menu-active"),
            !1
        }),
        n.bind("mouseout", function() {
            jQuery(this).removeClass("menu-active")
        }))
    }),
    f + i.width() > s && (f = f - i.width()),
    u + i.height() > o && (u = u - i.height()),
    i.css({
        left: f,
        top: u
    }),
    jQuery("#shadow").css({
        display: "block",
        zIndex: _contextmenu.zIndex,
        left: f,
        top: u,
        width: i.outerWidth(),
        height: i.outerHeight()
    });
    jQuery(document).on("mousedown.right_contextmenu", function(n) {
        n = n ? n : window.event;
        var t = n.srcElement ? n.srcElement : n.target;
        checkInDom(t, "right_contextmenu") == !1 && (i.hide(),
        jQuery("#shadow").hide(),
        i.empty(),
        jQuery(document).unbind(".right_contextmenu"),
        _contextmenu.kkk = null,
        _contextmenu.ppp = null,
        _contextmenu.last = null)
    })
}
,
_contextmenu.startmenu = function(n, t) {
    var s, i, o, e;
    n = n ? n : window.event,
    s = n.srcElement ? n.srcElement : n.target;
    if (/input|textarea/i.test(s.tagName))
        return !0;
    var u = n.clientX
      , r = n.clientY
      , f = document.getElementById("start_menu").innerHTML;
    f = f.replace(/_appid/g, t),
    i = document.getElementById("right_contextmenu") ? jQuery(document.getElementById("right_contextmenu")) : jQuery('<div id="right_contextmenu" class="menu"></div>').appendTo(document.body),
    i.html(f),
    _config.sourcedata.app[t].notdelete > 0 && i.find(".uninstall").remove(),
    i.addClass(_window.className),
    i.css({
        "z-index": _contextmenu.zIndex + 1
    }),
    i.show(),
    o = document.documentElement.clientWidth,
    e = document.documentElement.clientHeight,
    i.find(">div").each(function() {
        var n = jQuery(this);
        n.bind("mouseover", function() {
            return jQuery(this).addClass("menu-active"),
            !1
        }),
        n.bind("mouseout", function() {
            jQuery(this).removeClass("menu-active")
        })
    }),
    u + i.width() > o && (u = u - i.width()),
    r + i.height() > e && (r = r - i.height()),
    i.css({
        left: u,
        top: r
    }),
    jQuery("#shadow").css({
        display: "block",
        zIndex: _contextmenu.zIndex,
        left: u,
        top: r,
        width: i.outerWidth(),
        height: i.outerHeight()
    });
    jQuery(document).on("mousedown.right_contextmenu", function(n) {
        n = n ? n : window.event;
        var t = n.srcElement ? n.srcElement : n.target;
        checkInDom(t, "right_contextmenu") == !1 && (i.hide(),
        jQuery("#shadow").hide(),
        jQuery(document).unbind(".right_contextmenu"))
    })
}
,
_contextmenu.jstree_right_ico = function(n, t) {
    var f, i, e, o;
    n = n ? n : window.event;
    var u = n.clientX
      , r = n.clientY
      , s = n.srcElement ? n.srcElement : n.target;
    if (/input|textarea/i.test(s.tagName))
        return !0;
    f = document.getElementById("jstree_right_Ico").innerHTML,
    f = f.replace(/{fid}/g, t),
    i = document.getElementById("right_contextmenu") ? jQuery(document.getElementById("right_contextmenu")) : jQuery('<div id="right_contextmenu" class="menu"></div>').appendTo(document.body),
    i.html(f),
    i.css({
        "z-index": _contextmenu.zIndex + 1
    }),
    i.show(),
    e = document.documentElement.clientWidth,
    o = document.documentElement.clientHeight,
    i.find(">div").each(function() {
        var n = jQuery(this);
        n.bind("mouseover", function() {
            return jQuery(this).addClass("menu-active"),
            !1
        }),
        n.bind("mouseout", function() {
            jQuery(this).removeClass("menu-active")
        })
    }),
    u + i.width() > e && (u = u - i.width()),
    r + i.height() > o && (r = r - i.height()),
    i.css({
        left: u,
        top: r
    }),
    jQuery("#shadow").css({
        display: "block",
        zIndex: _contextmenu.zIndex,
        left: u,
        top: r,
        width: i.outerWidth(),
        height: i.outerHeight()
    });
    jQuery(document).on("mousedown.right_contextmenu", function(n) {
        n = n ? n : window.event;
        var t = n.srcElement ? n.srcElement : n.target;
        checkInDom(t, "right_contextmenu") == !1 && (i.hide(),
        jQuery("#shadow").hide(),
        jQuery(document).unbind(".right_contextmenu"))
    })
}
,
_ajax = {},
jQuery.ajaxError = function(n, t, i) {
    alert(__lang.beg + i.url + ":" + t.status + "   " + t.statusText)
}
,
_ajax.newFolder = function(n, t, i) {
    jQuery("#shadow").hide(),
    t || (t = ""),
    jQuery.getJSON(_config.systemurl + "&op=dzzcp&do=newfolder&bz=" + t + "&container=" + decodeURIComponent(n) + "&t=" + +new Date, function(t) {
        t.msg == "success" ? (i && (n = "icosContainer_folder_" + i),
        _ico.createFolder(t, n)) : Alert(t.error)
    })
}
,
_ajax.NewIco = function(n, t, i) {
    jQuery("#shadow").hide(),
    jQuery.getJSON(_config.systemurl + "&op=dzzcp&do=NewIco&type=" + n + "&path=" + t + "&t=" + +new Date, function(n) {
        n.msg == "success" ? (_ico.createIco(n),
        _ico.Rename(n.icoid, i)) : Alert(n.error)
    })
}
,
_ajax.Rename = function(n, t, i) {
    var r = _config.sourcedata.icos[n];
    jQuery.ajax({
        type: "post",
        url: _config.systemurl + "&op=dzzcp&do=rename",
        data: {
            text: t,
            path: r.dpath,
            t: +new Date
        },
        dataType: "json",
        success: function(t) {
            var u, r;
            if (t.icoid) {
                _config.sourceids.icos.push(t.icoid),
                _config.sourcedata.icos[n] = t,
                _config.sourcedata.icos[n].icoid = n,
                _config.sourcedata.icos[t.icoid] = t,
                _ico.icos[n] && (u = _ico.CIco(n, _ico.icos[n].container, _ico.icos[n].pos));
                for (r in _filemanage.cons)
                    _filemanage.cons[r].data[n] && _filemanage.cons[r].reCreateIcos(_config.sourcedata.icos[n])
            } else
                i != "undefined" && _ico.icos[n] ? (jQuery("#text_" + n).html(_ico.icos[n].old_text_html),
                jQuery(_ico.icos[n].icoblank).css("z-index", _ico.icos[n].zIndex)) : jQuery("#file_text_" + n).html(_filemanage.cons[i].oldtext),
                t.error && showmessage(t.error, "danger", 3e3, 1)
        },
        error: function() {
            i != "undefined" && _ico.icos[n] ? (jQuery("#text_" + n).html(_ico.icos[n].old_text_html),
            jQuery(_ico.icos[n].icoblank).css("z-index", _ico.icos[n].zIndex)) : jQuery("#file_text_" + n).html(_filemanage.cons[i].oldtext),
            showmessage(__lang.js_network_error, "danger", 3e3, 1)
        }
    })
}
,
_ajax.delIco = function(n, t) {
    var i, r, f, u, o, e;
    jQuery("#shadow").hide(),
    i = _config.sourcedata.icos[n];
    if (!t) {
        if (_config.selectall.icos.length > 0 && jQuery.inArray(n, _config.selectall.icos) > -1) {
            _config.sourcedata.icos[_config.selectall.icos[0]].isdelete > 0 || _config.sourcedata.icos[_config.selectall.icos[0]].bz && _config.sourcedata.icos[_config.selectall.icos[0]].bz != "" ? Confirm(__lang.js_delete_selectall, function() {
                _ajax.delIco(n, 1)
            }) : Confirm(__lang.js_delete_selectall_recycle, function() {
                _ajax.delIco(n, 1)
            });
            return
        }
        if (_config.sourcedata.icos[n].type == "folder" && _config.sourcedata.folder[_config.sourcedata.icos[n].oid] && _config.sourcedata.folder[_config.sourcedata.icos[n].oid].iconum > 0) {
            _config.sourcedata.icos[n].isdelete > 0 || _config.sourcedata.icos[n].bz && _config.sourcedata.icos[n].bz != "" ? Confirm(__lang.js_delete_folder.replace("{name}", _config.sourcedata.icos[n].name), function() {
                _ajax.delIco(n, 1)
            }) : Confirm(__lang.js_delete_folder_recycle.replace("{name}", _config.sourcedata.icos[n].name), function() {
                _ajax.delIco(n, 1)
            });
            return
        }
        _config.sourcedata.icos[n].isdelete > 0 || _config.sourcedata.icos[n].bz && _config.sourcedata.icos[n].bz != "" ? Confirm(__lang.js_delete_confirm.replace("{name}", _config.sourcedata.icos[n].name), function() {
            _ajax.delIco(n, 1)
        }) : Confirm(__lang.js_delete_confirm_recycle.replace("{name}", _config.sourcedata.icos[n].name), function() {
            _ajax.delIco(n, 1)
        });
        return
    }
    if (_config.selectall.icos.length > 0 && jQuery.inArray(n, _config.selectall.icos) > -1)
        if (i.bz && i.bz != "") {
            r = [];
            for (f in _config.selectall.icos)
                r.push(_config.sourcedata.icos[_config.selectall.icos[f]].dpath);
            u = {
                icoids: r,
                bz: i.bz
            }
        } else {
            r = [];
            for (f in _config.selectall.icos)
                r.push(_config.sourcedata.icos[_config.selectall.icos[f]].dpath);
            u = {
                icoids: r
            }
        }
    else
        u = i.bz && i.bz != "" ? {
            icoids: [i.dpath],
            bz: i.bz
        } : {
            icoids: [i.dpath]
        };
    o = _config.systemurl + "&op=dzzcp&do=deleteIco&t=" + +new Date,
    e = '<div class="progress progress-striped active" style="margin:0"><div class="progress-bar" style="width:100%;"></div></div>',
    showmessage("<p>" + __lang.deleting_not_please_close + "</p>" + e, "info", 0, 1, "right-bottom"),
    jQuery.getJSON(o, u, function(n) {
        var u = 0, r = 0, t, i;
        for (t in n.msg)
            n.msg[t] == "success" ? (showmessage(_config.sourcedata.icos[t].name + __lang.delete_success, "success", 1e3, 1, "right-bottom"),
            _config.sourcedata.icos[t].bz && _config.sourcedata.icos[t].bz !== "" ? _ico.removeIcoid(t) : _config.sourcedata.icos[t].isdelete > 0 ? (u++,
            _ico.removeIcoid(t)) : (_ico.removeIcoid(t),
            _config.sourcedata.icos[t].isdelete = 1,
            _ico.appendIcoids([t]),
            r++)) : showmessage(n.msg[t], "error", 3e3, 1, "right-bottom");
        i = _config.space.typefid.recycle,
        _config.sourcedata.folder[i].iconum = parseInt(_config.sourcedata.folder[i].iconum) - u,
        _config.sourcedata.folder[i].iconum = parseInt(_config.sourcedata.folder[i].iconum) + r,
        _ico.checkRecycleStatus()
    }),
    jQuery(".Icoblock.recycle").removeClass("hover")
}
,
_window.Max = [],
_window.Version = "dzzdesktop js 1.0",
_window.Width = 400,
_window.Height = -1,
_window.Timer = 0,
_window.zIndex = 3100,
_window.wIndex = 3100,
_window.windows = {},
_window.clientWidth = jQuery("#_body>.icosContainer").width(),
_window.clientHeight = jQuery("#_body>.icosContainer").height(),
_window.onmousemove = null,
_window.onmouseup = null,
_window.onselectstart = 1,
_window.sum = 1,
_window.ceng = 0,
_window.padding = 40,
_window.ctrl = 0,
_window.alt = 0,
_window.hidetime = 500,
_window.imgSwitchDelay = 5e3,
_window.getFeature = function(n, t) {
    var i = new RegExp("(^|,|\\s)" + t + "\\s*=\\s*([^,]*)(\\s|,|$)","i");
    return i.test(n) ? RegExp.$2 : ""
}
,
_window.getMaxNumber = function() {
    for (var t = 0, n = 0; n < arguments.length; n++)
        arguments[n] > t && (t = arguments[n]);
    return t
}
,
_window.mergeFuture = function(n, t) {
    var u, s, f, h, c, i, e, o, r;
    if (!t || t == "")
        return n;
    u = [],
    s = n.split(",");
    for (r in s)
        i = s[r].split("="),
        i.length == 2 && (u[i[0]] = i[1]);
    f = [],
    h = t.split(",");
    for (c in h)
        i = h[c].split("="),
        i.length == 2 && (f[i[0]] = i[1]);
    for (e in f)
        u[e] = f[e];
    o = [];
    for (r in u)
        o.push(r + "=" + u[r]);
    return o.join(",")
}
,
_window.getWindowLT = function(n, t, i, r, u, f) {
    _window.clientWidth = jQuery("#_body>.icosContainer").width(),
    _window.clientHeight = jQuery("#_body>.icosContainer").height();
    var e = {};
    return isNaN(n) && (n = ""),
    isNaN(t) && (t = ""),
    isNaN(i) && (i = ""),
    isNaN(r) && (r = ""),
    n != "" ? jQuery.isNumeric(n) ? e.left = n < 20 ? 20 : n : n.indexOf("%") !== -1 && (e.left = _window.clientWidth * (parseInt(n) / 100),
    e.left > _window.clientWidth - 5 && (e.left = _window.clientWidth - 5)) : t != "" && (jQuery.isNumeric(t) ? e.left = _window.clientWidth - t - u : t.indexOf("%") !== -1 && (e.left = _window.clientWidth - _window.clientWidth * (parseInt(t) / 100) - u),
    e.left < u * -1 && (e.left = u * -1)),
    i != "" ? jQuery.isNumeric(i) ? e.top = i < 20 ? 20 : i : n.indexOf("%") !== -1 && (e.top = _window.clientHeight * (parseInt(i) / 100),
    e.top > _window.clientHeight - 5 && (e.top = _window.clientHeight - 5)) : r && (jQuery.isNumeric(r) ? e.top = _window.clientHeight - r - f : t.indexOf("%") !== -1 && (e.top = _window.clientHeight - _window.clientHeight * (parseInt(r) / 100) - f),
    e.top < f * -1 && (e.top = f * -1)),
    !e.left && !e.top && (n = i = _window.sum * _window.padding - _window.ceng * _window.padding / 2,
    (n + u > _window.clientWidth || i + f > _window.clientHeight) && (_window.ceng = _window.ceng ? 0 : 1,
    _window.sum = 1,
    n = i = _window.sum * _window.padding - _window.ceng * _window.padding / 2),
    _window.sum++,
    e.left = n,
    e.top = i),
    e.left < u * -1 + 1 && (e.left = u * -1 + 1),
    e.top < u * -1 + 1 && (e.left = i * -1 + 1),
    e.left > _window.clientWidth - 1 && (e.left = _window.clientWidth - 1),
    e.top > _window.clientHeight - 1 && (e.top = _window.clientHeight - 1),
    e
}
,
_window.getCurrentWindowId = function() {
    var t = 0, i = null, n;
    for (n in _window.windows)
        !_window.windows[n].isHide && !_window.windows[n].MIN && _window.windows[n].zIndex > t && (i = n,
        t = _window.windows[n].zIndex);
    return i
}
,
_window.currentWindow = function(n) {
    var i = _window.getCurrentWindowId(), t;
    if (!i)
        return;
    t = _window.windows[i];
    switch (n) {
    case "Close":
        t.Close();
        break;
    case "Max":
        t.MAX ? t.Restore() : t.Max();
        break;
    case "Min":
        t.Min()
    }
}
,
_window.CloseAppwinAll = function() {
    for (var n in _window.windows)
        _window.windows[n].Close()
}
,
_window.showDesktop = function() {
    var n;
    jQuery("#shadow").hide();
    if (_window.desktophide) {
        for (n in _window.windows)
            _window.windows[n].isHide && (_window.windows[n].board.style.display = "block",
            _window.windows[n].isHide = 0);
        _window.desktophide = 0
    } else {
        for (n in _window.windows)
            _window.windows[n].MIN || (_window.windows[n].board.style.display = "none",
            _window.windows[n].isHide = 1);
        _window.desktophide = 1
    }
}
,
_window.resize = function() {
    for (var n in _window.windows)
        _window.windows[n].MAX > 0 && _window.windows[n].Max(1)
}
,
_window.clearHide = function() {
    for (var n in _window.windows)
        _window.windows[n].isHide && (_window.windows[n].isHide = 0,
        _window.windows[n].Min());
    _window.desktophide = 0
}
,
_window.prototype.setTitleText = function(n) {
    this.type != "folder" && jQuery(this.titleCase).find(".titleText").html(n)
}
,
_window.prototype.SetTitle = function(n) {
    var r = this, s = 0, u, e, o, t, i, f;
    for (jQuery("#titleBar_" + this.id).remove(),
    u = document.createElement("div"),
    u.className = "titleBar",
    u.id = "titleBar_" + this.id,
    this.titleCase.appendChild(u),
    e = document.createElement("div"),
    e.className = "titleButtonBar",
    u.appendChild(e),
    o = this.titleButton.split("|"),
    t = 0; t < _config.titleButtons.length; t++) {
        i = document.createElement("a"),
        i.className = _config.titleButtons[t],
        i.setAttribute("bname", _config.titleButtons[t]),
        i.title = __lang.titleButton[_config.titleButtons[t]];
        if (jQuery.inArray(_config.titleButtons[t], o) < 0 || jQuery.inArray("MAX", o) > -1 && _config.titleButtons[t] == "RESTORE")
            if (_config.titleButtons[t] == "RESTORE")
                i.style.display = "none";
            else
                continue;
        jQuery(i).on("click", function() {
            switch (this.className) {
            case "CLOSE":
                r.Close();
                break;
            case "MAX":
                r.Max();
                break;
            case "RESTORE":
                r.Restore();
                break;
            case "MIN":
                r.Min();
                break;
            case "FULLSCREEN":
                document.getElementById("ifm_" + r.id) && toggleFullScreen(document.getElementById("ifm_" + r.id));
                break;
            case "REFRESH":
                try {
                    window.frames[document.getElementById("ifm_" + r.id).name].location.reload()
                } catch (n) {}
            }
            return !1
        });
        e.appendChild(i),
        s += jQuery(i).outerWidth(!0)
    }
    f = document.createElement("div"),
    f.id = "title_text_" + this.id,
    f.className = "titleText",
    f.innerHTML = n || "",
    u.appendChild(f),
    this.minTitleWidth = s + 50
}
,
_window.prototype.Create = function(n) {
    var r, i, h, u, t, o, f, e, s;
    this.isModal && (this.modal = document.createElement("div"),
    this.modal.className = "MODAL",
    this.modal.style.position = "absolute",
    this.modal.style.zIndex = this.zIndex,
    document.getElementById("MsgContainer").appendChild(this.modal),
    this.zIndex = ++_window.zIndex),
    this.board = document.createElement("div"),
    this.board.className = "window " + this.className,
    this.board.id = this.id,
    this.board.style.position = "absolute",
    this.board.style.zIndex = this.zIndex,
    this.board.style.visibility = "hidden",
    this.desktop = _config.currentDesktop,
    this.isModal ? (document.getElementById("MsgContainer").appendChild(this.board),
    jQuery("#MsgContainer").show()) : document.getElementById("_body").appendChild(this.board),
    _window.clientHeight || (this.board.style.left = "100%",
    this.board.style.top = "100%",
    _window.clientWidth = this.board.offsetLeft,
    _window.clientHeight = this.board.offsetTop),
    r = ["LEFT_TOP", "TOP", "RIGHT_TOP", "RIGHT", "RIGHT_BOTTOM", "BOTTOM", "LEFT_BOTTOM", "LEFT", "SHADOW_TOP", "SHADOW_RIGHT", "SHADOW_BOTTOM", "SHADOW_LEFT"],
    r[r.length] = "TITLE",
    r[r.length] = "CONTENT",
    this.sides = [],
    this.button && (r[4] = "RIGHT_BOTTOM_BY_BUTTON",
    r[5] = "BOTTOM_BY_BUTTON",
    r[6] = "LEFT_BOTTOM_BY_BUTTON",
    r[r.length] = "BUTTON"),
    i = this;
    if (this.resize != "no")
        for (h = this.resize.split("|"),
        u = 0; u < h.length; u++)
            r[r.length] = h[u];
    for (u = 0; u < r.length; u++) {
        t = document.createElement("div"),
        t.className = r[u],
        t.style.position = "absolute",
        t.innerHTML = '<div class="' + r[u] + '_inner inner" style="position:absolute;"></div>',
        this.board.appendChild(t);
        switch (r[u]) {
        case "TITLE":
            this.titleCase = t,
            t.style.width = this.bodyWidth + "px",
            this.SetTitle(n),
            jQuery(this.titleCase).addTouch(),
            jQuery(this.titleCase).bind("dblclick", function() {
                i.MAX ? jQuery(this).find(".RESTORE:visible").trigger("click") : jQuery(this).find(".MAX:visible").trigger("click")
            }),
            this.moveable && (jQuery(this.titleCase).bind("mousedown", function(n) {
                i.Mousedown(n ? n : window.event, i.titleCase)
            }),
            jQuery(this.titleCase).bind("mouseup", function(n) {
                i.Mouseup(n ? n : window.event, i.titleCase)
            }));
            break;
        case "CONTENT":
            this.contentCase = t,
            t.style.width = this.bodyWidth + "px",
            this.bodyHeight > 0 && (t.style.height = this.bodyHeight + "px"),
            t.style.left = this.sides[7].width + "px",
            t.style.top = this.sides[1].height + "px",
            this.width = this.bodyWidth + this.sides[3].width + this.sides[7].width,
            this.height = this.bodyHeight + this.sides[1].height + this.sides[5].height,
            this.minWidth = 0,
            this.minHeight = 0,
            this.width < this.minwidth && (this.width = this.minWidth),
            this.height < this.minHeight && (this.height = this.minHeight),
            this.board.style.height = this.height + "px",
            this.board.style.width = this.width + "px",
            this.blank = document.createElement("div"),
            this.blank.id = "_blank_" + this.id,
            this.blank.className = "window_blank",
            this.contentCase.appendChild(this.blank),
            this.loadding = document.createElement("div"),
            this.loadding.id = "window_content_loadding" + this.id,
            this.loadding.className = "window_loadding",
            this.loadding.innerHTML = '<table width="100%" height="100%"><tbody><tr><td valign="middle" align="center"><div class="loading_img"><div class="loading_process"></div></div></td></tr></tbody></table>',
            this.contentCase.appendChild(this.loadding);
            break;
        case "BUTTON":
            for (this.buttonCase = t,
            t.style.width = this.bodyWidth + "px",
            t.style.left = this.sides[7].width + "px",
            t.style.bottom = "0px",
            this.buttonCase.dx = this.width - t.offsetWidth,
            this.minWidth < this.buttonCase.dx && (this.minWidth = this.buttonCase.dx),
            o = this.button.split("|"),
            f = 0; f < o.length; f++)
                e = document.createElement("button"),
                e.className = o[f] == "OK" ? "btn btn-primary " + o[f] : "btn btn-default " + o[f],
                e.title = o[f],
                e.innerHTML = __lang.js_button[o[f]],
                t.appendChild(e),
                jQuery(e).addTouch(),
                jQuery(e).bind("click", function() {
                    eval(i.string + ".On" + this.title + "()")
                }),
                this.buttons[o[f]] = e;
            break;
        case "RESIZE":
            t.style.cursor = "url('dzz/images/cur/aero_nwse.cur'),auto",
            this.resizeCase = t,
            jQuery(t).addTouch(),
            jQuery(t).bind("mousedown", function(n) {
                i.resize = "yes",
                i.PreResize(n ? n : window.event, i.resizeCase)
            });
            break;
        case "RESIZE-X":
            this.resizexCase = t,
            t.style.cursor = "e-resize",
            jQuery(t).addTouch(),
            jQuery(t).bind("mousedown", function(n) {
                i.resize = "resize-x",
                i.PreResize(n ? n : window.event, i.resizexCase)
            });
            break;
        case "RESIZE-Y":
            this.resizeyCase = t,
            t.style.cursor = "s-resize",
            jQuery(t).addTouch(),
            jQuery(t).bind("mousedown", function(n) {
                i.resize = "resize-y",
                i.PreResize(n ? n : window.event, i.resizeyCase)
            });
            break;
        default:
            this.sides[u] = t,
            this.sides[u].width = t.offsetWidth,
            this.sides[u].height = t.offsetHeight,
            this.moveable && (t.style.cursor = "move",
            jQuery(t).addTouch(),
            jQuery(t).bind("mousedown", function(n) {
                i.Mousedown(n ? n : window.event, i.sides[u])
            }),
            jQuery(t).bind("mouseup", function(n) {
                i.Mouseup(n ? n : window.event, i.sides[u])
            }))
        }
    }
    this.sides[1].dx = this.sides[0].width + this.sides[2].width,
    this.width > this.sides[1].dx && (this.sides[1].style.width = this.width - this.sides[1].dx + "px"),
    this.sides[3].dy = this.sides[2].height + this.sides[4].height,
    this.height > this.sides[3].dy && (this.sides[3].style.height = this.height - this.sides[3].dy + "px"),
    this.sides[5].dx = this.sides[4].width + this.sides[6].width,
    this.width > this.sides[5].dx && (this.sides[5].style.width = this.width - this.sides[5].dx + "px"),
    this.sides[7].dy = this.sides[6].height + this.sides[0].height,
    this.height > this.sides[7].dy && (this.sides[7].style.height = this.height - this.sides[7].dy + "px"),
    this.sides[0].style.left = "0px",
    this.sides[0].style.top = "0px",
    this.sides[1].style.left = this.sides[0].width + "px",
    this.sides[1].style.top = "0px",
    this.sides[2].style.right = "0px",
    this.sides[2].style.top = "0px",
    this.sides[3].style.right = "0px",
    this.sides[3].style.top = this.sides[2].height + "px",
    this.sides[4].style.right = "0px",
    this.sides[4].style.bottom = "0px",
    this.sides[5].style.left = this.sides[6].width + "px",
    this.sides[5].style.bottom = "0px",
    this.sides[6].style.left = "0px",
    this.sides[6].style.bottom = "0px",
    this.sides[7].style.left = "0px",
    this.sides[7].style.top = this.sides[0].height + "px",
    s = _window.getWindowLT(this.left, this.right, this.top, this.bottom, this.width, this.height),
    this.left = s.left,
    this.top = s.top,
    this.board.style.left = this.left + "px",
    this.board.style.top = this.top + "px",
    this.board.style.visibility = "visible",
    this.status = 1;
    jQuery(this.board).on("mousedown", function() {
        i.Focus()
    });
    this.size != "NO" && in_array(this.size, _config.titleButtons) && jQuery("#titleBar_" + this.id).find("." + this.size).trigger("click"),
    _config.screenWidth < 1e3 && _config.screenHeight < 700 && jQuery("#titleBar_" + this.id).find(".MAX:visible").trigger("click"),
    _window.clearHide()
}
,
_window.OpenPicWin = function(n, t) {
    var i = new _window(t,"sys_pic");
    return i.taskid = "sys_pic",
    i.type = "image",
    i.icoid = n,
    i.Create(_config.sourcedata.icos[n].name),
    i.SetPicContent(n, _config.sourcedata.icos[n].url),
    i
}
,
_window.prototype.adjust = function() {
    this.bpanel_resize();
    if (this.type != "image")
        return;
    if (!document.getElementById("picWin_img"))
        return;
    var u = jQuery("#picWin_img .img_up")
      , n = parseInt(u.attr("w"))
      , t = parseInt(u.attr("h"))
      , r = jQuery("#picWin_img").width()
      , i = jQuery("#picWin_img").height()
      , e = r / i
      , f = n / t;
    e > f ? i < t ? (height = i,
    width = n / t * i) : (width = n,
    height = t) : r < n ? (width = r,
    height = t / n * r) : (width = n,
    height = t),
    this.imgwidth = width,
    this.imgheight = height,
    this.imgleft = (r - width) / 2 + 10,
    this.imgtop = (i - height) / 2 + 10,
    u.css({
        position: "absolute",
        width: this.imgwidth,
        height: this.imgheight,
        left: this.imgleft,
        top: this.imgtop
    }),
    this.scale = Math.round(width / n * 100),
    jQuery("#picWin_img .img_up").css({
        left: this.imgleft,
        top: this.imgtop,
        width: this.imgwidth,
        height: this.imgheight,
        "max-width": "none"
    }),
    this.scale == 100 ? jQuery("#picWin_img .toolbar .btn-imgtoggle").addClass("btn-imgtoggle-disable").html('<span class="b-before"></span>' + __lang.original_size + "<i>/i>") : jQuery("#picWin_img .toolbar .btn-imgtoggle").removeClass("btn-imgtoggle-disable").html('<span class="b-before"></span>' + __lang.suit_size + "<i>/i>"),
    jQuery("#picWin_img .toolbar .zoomScale").html(this.scale + "%")
}
,
_window.prototype.createPic = function() {
    var i = this, r;
    jQuery("#picWin_img").remove(),
    r = jQuery('<div id="picWin_img" class="docked"><img class="img_up" src="dzz/images/b.gif" style="max-width:none" /><img class="img_down" style="display:none;max-width:none" src="dzz/images/b.gif" /></div>').appendTo(this.contentCase),
    this.imgContainer = r.get(0),
    r.find("img").mousedown(function(n) {
        var f = function(n) {
            var r = n.clientX
              , t = n.clientY;
            i.imgleft = r - i.oldx,
            i.imgtop = t - i.oldy,
            jQuery("#picWin_img .img_up").css({
                left: i.imgleft,
                top: i.imgtop
            })
        }
          , u = function(n) {
            DetachEvent(n, i.imgContainer);
            var r = n.clientX
              , t = n.clientY;
            i.imgleft = r - i.oldx,
            i.imgtop = t - i.oldy,
            jQuery("#picWin_img .img_up").css({
                left: i.imgleft,
                top: i.imgtop
            })
        }
          , t = jQuery("#picWin_img").offset()
          , r = jQuery("#picWin_img .img_up").offset();
        i.oldx = n.clientX - r.left + t.left,
        i.oldy = n.clientY - r.top + t.top,
        AttachEvent(n, i.imgContainer),
        document.onmousemove = function(n) {
            return f(n ? n : window.event),
            !1
        }
        ,
        document.onmouseup = function(n) {
            return u(n ? n : window.event),
            !1
        }
    }).mouseup(function(n) {
        DetachEvent(n, i.imgContainer)
    }),
    i.picop_next = document.createElement("a"),
    i.picop_next.className = "picop_div_next",
    i.picop_next.innerHTML = '<table width="100%" height="100%" cellpadding="0" cellspacing="0"><tr><td align="right" valign="middle"><div id="picop_next" class="picop_next" style="display:none"></div></td></tr></table>',
    i.picop_next.title = __lang.pic_next;
    jQuery(i.picop_next).on("click", function() {
        OpenPicWin(i.data.icos[i.data.pos + 1]),
        i.autoplayTimer && (window.clearInterval(i.autoplayTimer),
        i.autoplayTimer = 0,
        jQuery("#picWin_img .toolbar .btn-autoplay").removeClass("pause").removeAttr("op").html('<span class="b-before"></span>\u64ad\u653e<i></i>'))
    });
    r.get(0).appendChild(i.picop_next),
    i.picop_pre = document.createElement("a"),
    i.picop_pre.className = "picop_div_pre",
    i.picop_pre.innerHTML = '<table width="100%" height="100%" cellpadding="0" cellspacing="0"><tr><td align="left" valign="middle"><div id="picop_pre" class="picop_pre" style="display:none"></div></td></tr></table>',
    i.picop_pre.title = __lang.pic_pre;
    jQuery(i.picop_pre).on("click", function() {
        OpenPicWin(i.data.icos[i.data.pos - 1]),
        i.autoplayTimer && (window.clearInterval(i.autoplayTimer),
        i.autoplayTimer = 0,
        jQuery("#picWin_img .toolbar .btn-autoplay").removeClass("pause").removeAttr("op").html('<span class="b-before"></span>' + __lang.play + "<i></i>"))
    });
    r.get(0).appendChild(i.picop_pre),
    jQuery(i.picop_pre).mouseenter(function() {
        jQuery("#picop_pre").show()
    }).mouseleave(function() {
        jQuery("#picop_pre").hide()
    }),
    jQuery(i.picop_next).mouseenter(function() {
        jQuery("#picop_next").show()
    }).mouseleave(function() {
        jQuery("#picop_next").hide()
    }),
    this.picwin_bpanel();
    r.find(".img_up,.img_down").on("contextmenu", function(n) {
        return _contextmenu.right_img(n ? n : window.event, i.icoid),
        !1
    });
    r.on("mousewheel", function(n, t) {
        return i.mouseTimer && window.clearTimeout(i.mouseTimer),
        i.mouseTimer = window.setTimeout(function() {
            t > 0 ? jQuery(i.picop_pre).trigger("click") : jQuery(i.picop_next).trigger("click")
        }, 300),
        !1
    });
    r.find(".img_up,.img_down").on("mousewheel", function(n, t) {
        var f = t * 100
          , e = f * i.ratio;
        return i.picWin_resize(e, f),
        !1
    })
}
,
_window.prototype.picwin_bpanel = function() {
    var r = this.data.pos, i, n, t;
    for (r >= this.data.icos.length && (r = 0),
    i = '<ul class="album-imglist clearfix">',
    n = 0; n < this.data.icos.length; n++)
        t = _config.sourcedata.icos[this.data.icos[n]],
        i += '<li class="imgitem' + (r == n ? " imgitem-focus" : "") + '" title="' + t.name + '" data-icoid="' + t.icoid + '"><div class="img-box"><img src="' + t.img + '" ></div></li>';
    return i += "</ul>",
    this.bpanel = jQuery('<div id="bpanel" class="album-pnl"><div class="toolbar"><span class="bar-btn btn-handler docked" op="imgshide" href="javascript:void(0);" hidefocus="true" ondragstart="return false;"><span class="b-before"></span>' + __lang.imageList + '<i></i></span><span class="bar-btn ZoomIn" op="ZoomIn" href="javascript:void(0);" id="btnZoomIn" title="' + __lang.enlarge_image + '" hidefocus="true"><span class="b-before"></span><i></i></span><label id="zoomScale" class="zoomScale">100%</label><span class="bar-btn ZoomOut" op="ZoomOut"  href="javascript:void(0);" id="btnZoomOut" title="' + __lang.shrink_image + '" hidefocus="true"><span class="b-before"></span><i></i></span><a class="bar-btn btn-imgtoggle" op="imgtoggle"  title="' + __lang.original_size + '" data-adapt=""><span class="b-before"></span>' + __lang.original_size + '<i></i></a><a class="bar-btn flash-btn btn-fullscr" op="fullscreen"  title="' + __lang.full_screen_browsing + '"><span class="b-before"></span>' + __lang.full_screen + '<i></i><span class="flashpnl"></span></a><div class="dropdown dropup" style="display:inline-block"> <a class="dropdown-toggle" data-toggle="dropdown"><span class="bar-btn btn-rotate"  href="javascript:;" title="' + __lang.rotation + '" hidefocus="true"><span class="b-before"></span>' + __lang.rotation + '<i></i></span></a><ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu1" style="min-width:100%"><li role="presentation"><a class="bar-btn" op="rotate" data-rotate="90" role="menuitem" tabindex="-1" href="#">' + __lang.clockwise + '</a></li><li role="presentation"><a class="bar-btn" op="rotate" data-rotate="-90" role="menuitem" tabindex="-1" href="#">' + __lang.anticlockwise + '</a></li><li role="presentation"><a class="bar-btn" op="rotate" data-rotate="180" role="menuitem" tabindex="-1" href="#">' + __lang.overturn + '</a></li> </ul></div><div class="dropdown dropup" style="display:inline-block"> <a class="dropdown-toggle" data-toggle="dropdown"><span class="bar-btn btn-autoplay" href="javascript:;" title="' + __lang.autoplay + '" hidefocus="true"><span class="b-before"></span>' + __lang.play + '<i></i></span></a><ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu1" style="min-width:100%"><li role="presentation"><a class="bar-btn" op="autoplay" data-delay="30" role="menuitem" tabindex="-1" href="#">30' + __lang.sec + '</a></li><li role="presentation"><a class="bar-btn" op="autoplay" data-delay="20" role="menuitem" tabindex="-1" href="#">20' + __lang.sec + '</a></li><li role="presentation"><a class="bar-btn" op="autoplay" data-delay="10" role="menuitem" tabindex="-1" href="#">10' + __lang.sec + '</a></li><li role="presentation"><a class="bar-btn" op="autoplay" data-delay="5" role="menuitem" tabindex="-1" href="#">5' + __lang.sec + '</a></li> </ul></div><div class="dropdown dropup" style="display:inline-block"> <a class="dropdown-toggle" data-toggle="dropdown"><span class="bar-btn btn-download"    href="javascript:;" title="' + __lang.save_original_image_computer + '" hidefocus="true"><span class="b-before"></span>' + __lang.download + '<i></i></span></a><ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu1" style="min-width:100%"><li role="presentation"><a class="bar-btn" op="download" data-size="large" role="menuitem" tabindex="-1" href="#">' + __lang.download_photo + '</a></li><li role="presentation"><a class="bar-btn" op="download" data-size="original" role="menuitem" tabindex="-1" href="#">' + __lang.download_original_image + '</a></li> </ul></div></div><div class="album-container"><div class="album-imgs">' + i + '</div><span class="slider-btn slider-btn-prev" href="javascript:void(0);" hidefocus="true" ondragstart="return false;" title=""><i></i></span><span class="slider-btn slider-btn-next" href="javascript:void(0);" hidefocus="true" ondragstart="return false;" title=""><i></i></span></div></div>'),
    this.bpanel.appendTo("#picWin_img"),
    this.item_w = jQuery("#picWin_img ul.album-imglist li:not(.imgitem-focus)").outerWidth(!0),
    this.item_focus_w = jQuery("#picWin_img ul.album-imglist li.imgitem-focus").outerWidth(!0),
    this.bpanel_resize(),
    this.bpanel_event(),
    !0
}
,
_window.prototype.bpanel_event = function() {
    jQuery("#picWin_img ul.album-imglist .imgitem").off("click").on("click", function() {
        return jQuery(this).addClass("imgitem-focus").siblings().removeClass("imgitem-focus"),
        OpenPicWin(jQuery(this).data("icoid")),
        t.autoplayTimer && (window.clearInterval(t.autoplayTimer),
        t.autoplayTimer = 0,
        jQuery("#picWin_img .toolbar .btn-autoplay").removeClass("pause").removeAttr("op").html('<span class="b-before"></span>' + __lang.play + "<i></i>")),
        !1
    });
    var t = this;
    jQuery("#picWin_img .slider-btn-next").off("click").on("click", function() {
        var r = jQuery("#picWin_img .album-imgs").width(), u = parseInt(jQuery("#picWin_img .album-imglist").css("left")), i;
        return isNaN(u) && (u = 0),
        i = u - r,
        i < r - t.imglist_w && (i = r - t.imglist_w),
        jQuery("#picWin_img .album-imglist").css("left", i),
        i >= 0 ? jQuery("#picWin_img .album-container .slider-btn-prev").addClass("slider-btn-disabled") : jQuery("#picWin_img .album-container .slider-btn-prev").removeClass("slider-btn-disabled"),
        r - i >= t.imglist_w ? jQuery("#picWin_img .album-container .slider-btn-next").addClass("slider-btn-disabled") : jQuery("#picWin_img .album-container .slider-btn-next").removeClass("slider-btn-disabled"),
        !1
    });
    jQuery("#picWin_img .slider-btn-prev").off("click").on("click", function() {
        var u = jQuery("#picWin_img .album-imgs").width(), r = parseInt(jQuery("#picWin_img .album-imglist").css("left")), i;
        return isNaN(r) && (r = 0),
        i = r + u,
        i >= 0 && (i = 0),
        jQuery("#picWin_img .album-imglist").css("left", i),
        i >= 0 ? jQuery("#picWin_img .album-container .slider-btn-prev").addClass("slider-btn-disabled") : jQuery("#picWin_img .album-container .slider-btn-prev").removeClass("slider-btn-disabled"),
        u - i >= t.imglist_w ? jQuery("#picWin_img .album-container .slider-btn-next").addClass("slider-btn-disabled") : jQuery("#picWin_img .album-container .slider-btn-next").removeClass("slider-btn-disabled"),
        !1
    });
    jQuery("#bpanel .bar-btn").click(function() {
        var s = jQuery(this).attr("op"), e, n, i, o, u, f, r;
        switch (s) {
        case "download":
            e = jQuery(this).data("size"),
            e == "large" ? _ico.downThumb(t.icoid) : _ico.downAttach(t.icoid);
            break;
        case "imgshide":
            jQuery(this).toggleClass("docked"),
            jQuery("#picWin_img").toggleClass("docked"),
            t.adjust();
            break;
        case "fullscreen":
            t.MAX > 0 ? t.Restore() : t.Max();
            break;
        case "imgtoggle":
            jQuery(this).hasClass("btn-imgtoggle-disable") ? (jQuery(this).removeClass("btn-imgtoggle-disable").html('<span class="b-before"></span>' + __lang.suit_size + "<i>/i>"),
            t.adjust()) : (t.picWin_resize(t.imgw - t.imgwidth, t.imgh - t.imgheight),
            jQuery(this).addClass("btn-imgtoggle-disable").html('<span class="b-before"></span>' + __lang.original_size + "<i>/i>"));
            break;
        case "ZoomIn":
            n = 100,
            i = n * t.ratio,
            t.picWin_resize(i, n);
            break;
        case "ZoomOut":
            n = -100,
            i = n * t.ratio,
            t.picWin_resize(i, n);
            break;
        case "rotate":
            o = parseInt(jQuery(this).data("rotate")),
            u = jQuery("#picWin_img .img_up"),
            t.angle += o,
            f = t.angle % 360 / 90,
            u.css({
                transform: "rotate(" + t.angle + "deg)",
                "-webkit-transform": "rotate(" + t.angle + "deg)",
                "-moz-transform": "rotate(" + t.angle + "deg)",
                "-o-transform": "rotate(" + t.angle + "deg)",
                "-ms-transform": "rotate(" + t.angle + "deg)",
                filter: "progid:DXImageTransform.Microsoft.BasicImage(Rotation=" + f + "))"
            });
            break;
        case "autoplay":
            return r = parseInt(jQuery(this).data("delay")),
            r > 0 && (_window.imgSwitchDelay = r * 1e3),
            jQuery(this).closest(".dropdown").find(".btn-autoplay").addClass("pause").attr("op", "pause").html('<span class="b-before"></span>' + __lang.stop + "<i></i>"),
            t.autoplayTimer = window.setInterval(function() {
                t.autoPlay()
            }, _window.imgSwitchDelay),
            !0;
        case "pause":
            return jQuery(this).closest(".dropdown").find(".btn-autoplay").removeClass("pause").removeAttr("op").html('<span class="b-before"></span>' + __lang.play + "<i></i>"),
            window.clearInterval(t.autoplayTimer),
            t.autoplayTimer = 0,
            !1
        }
        return !0
    })
}
,
_window.prototype.bpanel_resize = function() {
    this.imglist_w = this.item_w * (this.data.icos.length - 1) + this.item_focus_w,
    this.imglist_w < this.bodyWidth && (this.imglist_w = this.bodyWidth),
    jQuery("#picWin_img ul.album-imglist").width(this.imglist_w),
    this.bpanel_focus()
}
,
_window.prototype.bpanel_focus = function(n) {
    var t;
    n > 0 && jQuery("#picWin_img li.imgitem[data-icoid=" + this.data.icos[this.data.pos] + "]").addClass("imgitem-focus").siblings().removeClass("imgitem-focus");
    var i = jQuery("#picWin_img .album-imgs").width()
      , u = Math.floor(i / this.item_w) / 2
      , r = parseInt(jQuery("#picWin_img .album-imglist").css("left"));
    isNaN(r) && (r = 0),
    t = (jQuery("#picWin_img ul.album-imglist li.imgitem-focus").prevAll().length - u) * this.item_w,
    t + i > this.imglist_w && (t = this.imglist_w - i),
    t = t < 0 ? 0 : 0 - t,
    jQuery("#picWin_img .album-imglist").css("left", t),
    t >= 0 ? jQuery("#picWin_img .album-container .slider-btn-prev").addClass("slider-btn-disabled") : jQuery("#picWin_img .album-container .slider-btn-prev").removeClass("slider-btn-disabled"),
    i - t >= this.imglist_w ? jQuery("#picWin_img .album-container .slider-btn-next").addClass("slider-btn-disabled") : jQuery("#picWin_img .album-container .slider-btn-next").removeClass("slider-btn-disabled")
}
,
_window.prototype.autoPlay = function() {
    var n = this.data.pos + 1;
    n >= this.data.icos.length && (n = 0),
    this.data.icos[n] && OpenPicWin(this.data.icos[n])
}
,
_window.prototype.loadCheck = function(n, t) {
    var h = this, s = jQuery("#picWin_img").width(), e = jQuery("#picWin_img").height(), r;
    if (n.complete) {
        var u = loading.width
          , o = loading.height
          , f = u / o
          , i = s;
        i = u > i ? i : u,
        r = i / f,
        r > e && (r = e,
        i = r * f),
        this.showimage(t, Math.ceil(i), Math.ceil(r), u, o)
    } else
        setTimeout(function() {
            h.loadCheck(loading, t)
        }, 50)
}
,
_window.prototype.showloading = function(n) {
    var i = this;
    document.getElementById("img_loading_" + this.id) ? (i.loading = document.getElementById("img_loading_" + this.id),
    i.loading.style.left = (i.bodyWidth - 42) / 2 + "px",
    i.loading.style.top = (i.bodyHeight - 42 - jQuery("#picWin_img .album-pnl").outerHeight(!0)) / 2 + "px",
    i.loading.style.display = "") : (i.loading = document.createElement("img"),
    i.loading.id = "img_loading_" + this.id,
    i.loading.src = "dzz/images/default/imageloading.gif",
    i.loading.style.opacity = "0.8",
    i.loading.style.filter = "alpha(opacity=80)",
    i.loading.style.position = "absolute",
    i.loading.style.left = (i.bodyWidth - 42) / 2 + "px",
    i.loading.style.top = (i.bodyHeight - 42 - jQuery("#picWin_img .album-pnl").outerHeight(!0)) / 2 + "px",
    i.loading.style.zIndex = 1e5,
    i.imgContainer.appendChild(i.loading)),
    loading = new Image,
    setTimeout(function() {
        i.loadCheck(loading, n)
    }, 100),
    loading.src = n
}
,
_window.prototype.SetPicContent = function(n, t) {
    jQuery(this.loadding).hide(),
    this.contentCase.style.overflow = "hidden",
    this.contentCase.style.background = "#000";
    var r = _ico.getPicIcos(n)
      , i = !1;
    (!jQuery("#picWin_img").length || _config.sourcedata.icos[n].pfid != _config.sourcedata.icos[this.icoid].pfid || this.data.icos.length != r.icos.length) && (i = !0),
    this.icoid = n,
    this.data = r,
    i && this.createPic(n, t),
    this.data.pos == 0 && this.data.icos.length > 1 ? (jQuery(this.picop_next).show(),
    jQuery(this.picop_pre).hide()) : this.data.pos == this.data.icos.length - 1 && this.data.icos.length > 1 ? (jQuery(this.picop_next).hide(),
    jQuery(this.picop_pre).show()) : this.data.pos > 0 && (jQuery(this.picop_next).show(),
    jQuery(this.picop_pre).show()),
    this.showloading(t),
    this.bpanel_focus(1),
    this.Focus()
}
,
_window.prototype.picWin_resize = function(n, t) {
    this.imgleft -= n / 2,
    this.imgtop -= t / 2,
    this.imgwidth += n,
    this.imgheight += t,
    this.scale = Math.round(this.imgwidth / this.imgw * 100),
    jQuery("#picWin_img .img_up").css({
        left: this.imgleft,
        top: this.imgtop,
        width: this.imgwidth,
        height: this.imgheight,
        "max-width": "none"
    }),
    this.scale == 100 ? jQuery("#picWin_img .toolbar .btn-imgtoggle").addClass("btn-imgtoggle-disable").html('<span class="b-before"></span>' + __lang.original_size + "<i>/i>") : jQuery("#picWin_img .toolbar .btn-imgtoggle").removeClass("btn-imgtoggle-disable").html('<span class="b-before"></span>' + __lang.suit_size + "<i>/i>"),
    jQuery("#picWin_img .toolbar .zoomScale").html(this.scale + "%")
}
,
_window.prototype.showimage = function(n, t, i, r, u) {
    var o = this, f, e;
    jQuery(this.loading).fadeOut(),
    this.ratio = r / u,
    this.imgwidth = t,
    this.imgheight = i,
    this.imgw = r,
    this.imgh = u,
    this.angle = 0,
    this.imgleft = (this.bodyWidth - t) / 2,
    this.imgtop = (this.bodyHeight - jQuery("#bpanel").outerHeight(!0) - i) / 2,
    this.scale = Math.round(this.imgwidth / this.imgw * 100),
    this.scale == 100 ? jQuery("#picWin_img .toolbar .btn-imgtoggle").addClass("btn-imgtoggle-disable").html('<span class="b-before"></span>' + __lang.original_size + "<i>/i>") : jQuery("#picWin_img .toolbar .btn-imgtoggle").removeClass("btn-imgtoggle-disable").html('<span class="b-before"></span>' + __lang.suit_size + "<i>/i>"),
    jQuery("#picWin_img .toolbar .zoomScale").html(this.scale + "%"),
    f = jQuery("#picWin_img .img_down"),
    e = jQuery("#picWin_img .img_up"),
    f.attr("src", n).attr("w", r).attr("h", u).css({
        position: "absolute",
        width: t,
        height: i,
        left: this.imgleft,
        top: this.imgtop,
        transform: "none",
        filter: "none"
    }).fadeIn().attr("class", "img_up"),
    e.fadeOut().attr("class", "img_down")
}
,
_window.OpenFolderWin = function(n, t, i, r) {
    var u = new _window(r,++_window.wIndex);
    return u.type = "folder",
    u.fid = t[0],
    u.topfid = t,
    !i && t.length < 2 && (i = 1),
    u.icoid = n,
    u.taskid = n,
    u.treeshow = i,
    u.Create(_config.sourcedata.folder[u.fid].fname),
    u.SetFolderContent(n),
    u.treeHide(i),
    u
}
,
_window.prototype.treeHide = function(n) {
    n ? (jQuery("#jstree_area_" + this.id).show(),
    jQuery("#filemanage-ltdrager_" + this.id).show(),
    this.id == "_W_openfile" ? jQuery("#right_" + this.id).css("margin-left", jQuery("#jstree_area_" + this.id).width()) : jQuery("#content_" + this.id).css("margin-left", jQuery("#jstree_area_" + this.id).width()),
    this.treeshow = 1,
    jQuery("#treeshow_" + this.id).find("a").removeClass("treeshow-guide-right").addClass("treeshow-guide-left"),
    this.right_minWidth + jQuery("#jstree_area_" + this.id).width() > this.width && this.ResizeTo(this.right_minWidth + jQuery("#jstree_area_" + this.id).width(), this.bodyHeight)) : (jQuery("#jstree_area_" + this.id).hide(),
    jQuery("#filemanage-ltdrager_" + this.id).hide(),
    this.id == "_W_openfile" ? jQuery("#right_" + this.id).css("margin-left", 0) : jQuery("#content_" + this.id).css("margin-left", 0),
    this.treeshow = 0,
    jQuery("#treeshow_" + this.id).find("a").removeClass("treeshow-guide-left").addClass("treeshow-guide-right")),
    this.id == "_W_openfile" && (jQuery("#content__W_openfile").css("width", jQuery("#right__W_openfile").width()),
    jQuery("#right_bottom").css("width", jQuery("#right__W_openfile").width()))
}
,
_window.prototype.SetFolderContent = function() {
    var e, s, u, f, r, i;
    jQuery(this.contentCase).addClass("filemanage"),
    jQuery(this.loadding).hide();
    var t = this
      , h = ["f-" + this.fid + "-" + this.id]
      , o = [];
    for (e = this.topfid.length - 1; e >= 0; e--)
        o.push("f-" + this.topfid[e] + "-" + this.id);
    s = o,
    u = document.createElement("div"),
    u.id = "jstree_area_" + this.id,
    u.className = "filemanage-left",
    jQuery(u).mousedown(function() {
        return dfire("mousedown"),
        t.Focus(),
        !1
    }),
    this.contentCase.appendChild(u),
    f = document.createElement("div"),
    f.id = "content_" + this.id,
    f.className = "filemanage-right",
    this.contentCase.appendChild(f),
    r = document.createElement("div"),
    r.id = "filemanage-ltdrager_" + this.id,
    r.className = "filemanage-ltdrager",
    jQuery(r).bind("mousedown", function(n) {
        t.ltdrager_start(n ? n : window.event)
    }),
    this.contentCase.appendChild(r),
    i = "dzz/system",
    jQuery("#jstree_area_" + this.id).jstree({
        plugins: ["themes", "json_data", "ui", "types", "hotkeys"],
        json_data: {
            ajax: {
                url: _config.systemurl + "&op=explorer",
                data: function(n) {
                    if (n.attr)
                        var r = n.attr("id")
                          , i = r.split("-")[1]
                          , f = _config.sourcedata.folder[i].bz
                          , u = encodeURIComponent(_config.sourcedata.folder[i].path);
                    else
                        var r = 0
                          , f = _config.sourcedata.folder[t.topfid[t.topfid.length - 1]].bz
                          , u = encodeURIComponent(_config.sourcedata.folder[t.topfid[t.topfid.length - 1]].path);
                    return {
                        "do": "get_children",
                        id: r,
                        winid: t.id,
                        bz: f,
                        path: u,
                        t: +new Date
                    }
                },
                success: function(n) {
                    var t, r, i;
                    if (!n)
                        return;
                    if (n.error) {
                        alert(n.error);
                        return
                    }
                    t = n[n.length - 1];
                    if (!t)
                        return;
                    if (t.icosdata)
                        for (r in t.icosdata)
                            _config.sourcedata.icos[r] = t.icosdata[r],
                            _config.sourceids.icos.push(r);
                    if (t.folderdata)
                        for (i in t.folderdata)
                            _config.sourcedata.folder || (_config.sourcedata.folder = {}),
                            _config.sourcedata.folder[i] = t.folderdata[i],
                            _config.sourceids.folderids || (_config.sourceids.folderids = []),
                            _config.sourceids.folderids.push(i)
                }
            }
        },
        themes: {
            theme: "default",
            dots: !1
        },
        types: {
            valid_children: ["drive"],
            types: {
                "default": {
                    valid_children: "none",
                    icon: {
                        image: i + "/images/root.png"
                    }
                },
                folder: {
                    valid_children: ["default", "folder"],
                    icon: {
                        image: i + "/images/folder.png"
                    }
                },
                home: {
                    valid_children: [],
                    icon: {
                        image: i + "/images/home.png"
                    },
                    start_drag: !1,
                    move_node: !1,
                    delete_node: !1,
                    create_node: !1,
                    rename: !1,
                    remove: !1
                },
                document: {
                    valid_children: [],
                    icon: {
                        image: i + "/images/document.png"
                    },
                    start_drag: !1,
                    move_node: !1,
                    delete_node: !1,
                    create_node: !1,
                    rename: !1,
                    remove: !1
                },
                recycle: {
                    valid_children: [],
                    icon: {
                        image: i + "/images/recycle.png"
                    },
                    start_drag: !1,
                    move_node: !1,
                    delete_node: !1,
                    create_node: !1,
                    rename: !1,
                    remove: !1
                },
                dock: {
                    valid_children: [],
                    icon: {
                        image: i + "/images/dock.png"
                    },
                    start_drag: !1,
                    move_node: !1,
                    delete_node: !1,
                    create_node: !1,
                    rename: !1,
                    remove: !1
                },
                desktop: {
                    valid_children: ["folder"],
                    icon: {
                        image: i + "/images/desktop.png"
                    },
                    start_drag: !1,
                    move_node: !1,
                    delete_node: !1,
                    remove: !1,
                    rename: !1
                },
                organization: {
                    valid_children: [],
                    icon: {
                        image: i + "/images/organization.png"
                    },
                    start_drag: !1,
                    move_node: !1,
                    delete_node: !1,
                    remove: !1,
                    rename: !1
                },
                department: {
                    valid_children: [],
                    icon: {
                        image: i + "/images/department.png"
                    },
                    start_drag: !1,
                    move_node: !1,
                    delete_node: !1,
                    remove: !1,
                    rename: !1
                }
            }
        },
        ui: {
            initially_select: h
        },
        core: {
            initially_open: s
        }
    }).bind("select_node.jstree", function(n, i) {
        var h, f;
        i.rslt.obj.hasClass("jstree-closed") && jQuery("#jstree_area_" + t.id).jstree("open_node", i.rslt.obj),
        h = i.rslt.obj.attr("id").split("-"),
        t.fid = h[1],
        t.topfid = _ico.getTopFid(t.fid);
        if (_config.sourcedata.folder[t.fid]) {
            var r = _config.sourcedata.folder[t.fid]
              , e = r.icon || "dzz/images/default/system/folder.png"
              , u = "dzz/images/default/system/folder.png";
            r.flag == "recycle" ? (_config.sourcedata.icos[t.icoid].iconum > 0 ? (e = "dzz/styles/thame/" + _config.thame.system.folder + "/system/" + r.flag + "1.png",
            u = "dzz/images/default/system/" + r.flag + "1.png") : (e = "dzz/styles/thame/" + _config.thame.system.folder + "/system/" + r.flag + ".png",
            u = "dzz/images/default/system/" + r.flag + ".png"),
            u = "dzz/images/default/system/" + r.flag + ".png") : r.flag && r.flag != "folder" ? (e = "dzz/styles/thame/" + _config.thame.system.folder + "/system/" + r.flag + ".png",
            u = "dzz/images/default/system/" + r.flag + ".png") : r.flag && r.flag == "folder" && (r.gid > 0 ? (u = r.icon || "dzz/images/default/system/folder-read.png",
            e = r.icon ? r.icon.replace("dzz/images/default", "dzz/styles/thame/" + _config.thame.system.folder) : "dzz/styles/thame/" + _config.thame.system.folder + "/system/folder-read.png") : (u = r.icon || "dzz/images/default/system/folder.png",
            e = r.img ? r.icon.replace("dzz/images/default", "dzz/styles/thame/" + _config.thame.system.folder) : "dzz/styles/thame/" + _config.thame.system.folder + "/system/folder.png")),
            _dock.Change(t.taskid, e, r.fname, u)
        }
        var s = jQuery("#jstree_area_" + t.id).jstree("get_path", i.rslt.obj)
          , c = jQuery("#jstree_area_" + t.id).jstree("get_path", i.rslt.obj, !0)
          , o = "";
        for (f = 0; f < s.length; f++)
            o += '<a node="' + c[f] + '" class="title_path_item">' + mb_cutstr_nohtml(s[f], 30, "...") + "</a>",
            f != s.length - 1 && (o += '<span class="title_path_item_speacer">-></span>');
        jQuery("#title_text_" + t.id).html(o),
        jQuery("#title_text_" + t.id + " .title_path_item").each(function() {
            jQuery(this).bind("click", function() {
                jQuery("#jstree_area_" + t.id).jstree("select_node", jQuery("#" + jQuery(this).attr("node")), !0)
            })
        }),
        jQuery("#content_" + t.id).empty(),
        jQuery(t.loadding).show(),
        _filemanage.getData(_config.systemurl + "&op=explorer&do=filemanage&id=" + i.rslt.obj.attr("id") + "&winid=" + t.id + "&perpage=" + _filemanage.perpage + "&bz=" + _config.sourcedata.folder[t.fid].bz + "&asc=1&disp=" + _config.sourcedata.folder[t.fid].disp + "&iconview=" + _config.sourcedata.folder[t.fid].iconview + "&path=" + encodeURIComponent(_config.sourcedata.folder[t.fid].path) + "&t=" + +new Date, function() {
            jQuery(t.loadding).hide()
        }),
        t.filemanageid = null
    }),
    this.treeHide(this.treeshow),
    this.Focus()
}
,
_window.prototype.ChangeSequence = function(n, t) {
    if (this.Csequence <= 1 && n == "back" || this.Csequence >= this.Sequence.length && n == "next")
        return;
    n == "back" ? this.Csequence -= 1 : this.Csequence += 1,
    t == "storage" ? (this.fid = this.Sequence[this.Csequence - 1],
    this.path = _config.sourcedata.folder[this.fid].path,
    this.SetStorageTitle(),
    this.SetStorageContent(this.fid)) : (this.isCsquence = 1,
    jQuery("#jstree_area_" + this.id).jstree("select_node", jQuery("#" + this.Sequence[this.Csequence - 1]), !0))
}
,
_window.prototype.ltdrager_start = function(n) {
    n ? n : window.event,
    this.XX = n.clientX,
    this.AttachEvent(n, document.getElementById("filemanage-ltdrager_" + this.id)),
    document.getElementById("_blank").style.cursor = "e-resize",
    jQuery("#_blank").show();
    var t = this;
    this.ltdrager_left = jQuery("#jstree_area_" + this.id).width(),
    this.ltdrager_right = this.bodyWidth - this.ltdrager_left,
    eval("document.onmousemove=function(e){" + this.string + ".ltdraging(e?e:window.event);};"),
    eval("document.onmouseup=function(e){" + this.string + ".ltdraged(e?e:window.event);};")
}
,
_window.prototype.ltdraging = function(n) {
    n ? n : window.event;
    var i = n.clientX - this.XX
      , t = this.ltdrager_left + i
      , r = this.ltdrager_right - i;
    r < this.right_minWidth && (t = this.bodyWidth - this.right_minWidth),
    t < 15 && (t = 15),
    t > this.bodyWidth - 200 && (t = this.bodyWidth - 200),
    jQuery("#jstree_area_" + this.id).css("width", t),
    jQuery("#filemanage-ltdrager_" + this.id).css("left", t),
    this.id == "_W_openfile" ? (jQuery("#right_" + this.id).css("marginLeft", t),
    jQuery("#content__W_openfile").css("width", jQuery("#right__W_openfile").width()),
    jQuery("#right_bottom").css("width", jQuery("#right__W_openfile").width())) : jQuery("#content_" + this.id).css("marginLeft", t)
}
,
_window.prototype.ltdraged = function(n) {
    n ? n : window.event,
    this.DetachEvent(n, document.getElementById("filemanage-ltdrager_" + this.id)),
    jQuery("#_blank").hide(),
    document.getElementById("_blank").style.cursor = "url('dzz/images/cur/aero_arrow.cur'),auto"
}
,
_window.OpenApp = function(n, t) {
    var r = _config.sourcedata.app[n]
      , i = new _window(t,"app_" + n);
    return i.taskid = "app_" + n,
    i.appid = n,
    i.loadcss && !document.getElementById("css_window_" + i.loadcss) ? jcLoader().load({
        type: "css",
        ids: "css_window_" + i.loadcss,
        url: "dzz/styles/window/" + i.loadcss + "/style.css"
    }, function() {
        i.Create(r.appname),
        i.SetAppWinContent(r.url)
    }) : (i.Create(r.appname),
    i.SetAppWinContent(r.url)),
    i
}
,
_window.OpenAppWin = function(n, t, i, r) {
    var f = _config.sourcedata.icos[t], u = new _window(r,n), e;
    return i = i ? i : f.url,
    u.url = i,
    u.type = f.open == 1 ? "widget" : "appwin",
    f.idtype == "pluginid" && (u.idtype = "pluginid",
    u.pluginid = f.typeid),
    u.icoid = t,
    u.taskid = n,
    u.appid = u.id.indexOf("_W_app_") !== -1 ? u.id.replace("_W_app_", "") : 0,
    e = f.name,
    u.loadcss && !document.getElementById("css_window_" + u.loadcss) ? jcLoader().load({
        type: "css",
        ids: "css_window_" + u.loadcss,
        url: "dzz/styles/window/" + u.loadcss + "/style.css"
    }, function() {
        u.Create(e),
        u.SetAppWinContent(i)
    }) : (u.Create(e),
    u.SetAppWinContent(i)),
    u
}
,
_window.prototype.SetAppWinContent = function(n) {
    var r, i;
    if (this.iframe)
        this.contentCase.firstChild != this.iframe && this.contentCase.replaceChild(this.iframe, this.contentCase.firstChild),
        this.iframe.src = n;
    else {
        if (n.substr(n.lastIndexOf(".")).toLowerCase() == ".swf")
            this.contentCase.innerHTML = AC_FL_RunContent("width", "100%", "height", "100%", "allowNetworking", "internal", "allowScriptAccess", "never", "src", n, "quality", "high", "bgcolor", "", "wmode", "transparent", "allowfullscreen", "true"),
            this.contentCase.style.overflow = "hidden";
        else {
            r = {
                appid: this.appid,
                uid: _config.myuid,
                username: _config.myusername,
                self: _config.space.self,
                winid: this.id,
                time: +new Date
            },
            i = encodeURIComponent(jQuery.toJSON(r)),
            this.loaddingTimer = setTimeout(function() {
                jQuery(t.loadding).fadeOut()
            }, 5e3);
            var t = this
              , e = parseURL(n)
              , u = ""
              , f = jQuery('<iframe frameborder="0" name="' + i + '" id="ifm_' + this.id + '" marginheight="0" marginwidth="0" allowtransparency="true" src="' + n + '" class="appIframe" onload="jQuery(\'#window_content_loadding' + this.id + "').fadeOut();clearTimeout(" + t.loaddingTimer + ');" ' + u + "></iframe>").appendTo(this.contentCase);
            this.iframe = f.get(0)
        }
        this.bodyHeight < 0 && (this.bodyHeight = 300)
    }
    this.Focus()
}
,
_window.Open = function(n, t, i, r, u) {
    var e, f;
    return n == "url" && (e = n,
    n = encodeURIComponent(t).replace(/\./g, "_").replace(/%/g, "_")),
    f = new _window(r,n),
    n && !e && (f.type = "syswin",
    f.taskid = n),
    f.loadcss && !document.getElementById("css_window_" + f.loadcss) ? jcLoader().load({
        type: "css",
        ids: "css_window_" + f.loadcss,
        url: "dzz/styles/window/" + f.loadcss + "/style.css"
    }, function() {
        f.Create(i),
        f.SetContent(t, n, u)
    }) : (f.Create(i),
    f.SetContent(t, n, u)),
    f
}
,
_window.prototype.SetContent = function(n) {
    var h = n.slice(0, 5), u = n.slice(5), f, e, r;
    if (h == "[url]") {
        this.loadding || (this.loadding = jQuery('<div id="window_content_loadding' + this.id + '" style="position: absolute; left: 0px; top: 0px; width: 100%; height: 100%; margin: 0px; padding: 0px; overflow: hidden; z-index: 999999;" ><table width="100%" height="100%"><tbody><tr><td valign="middle" align="center"><div class="loading_img"><div class="loading_process"></div></div></td></tr></tbody></table></div>').appendTo(this.contentCase).get(0));
        if (this.iframe)
            this.contentCase.firstChild != this.iframe && this.contentCase.replaceChild(this.iframe, this.contentCase.firstChild),
            this.iframe.src = u;
        else {
            f = {
                uid: _config.myuid,
                username: _config.myusername,
                self: _config.space.self,
                winid: this.id,
                time: +new Date
            },
            e = encodeURIComponent(jQuery.toJSON(f)),
            this.loaddingTimer = setTimeout(function() {
                jQuery(o.loadding).fadeOut()
            }, 5e3);
            var o = this
              , c = parseURL(u)
              , s = ""
              , r = jQuery('<iframe frameborder="0" name="' + e + '" id="ifm_' + this.id + '" marginheight="0" marginwidth="0" allowtransparency="true" src="' + u + '" class="appIframe"  onload="jQuery(\'#window_content_loadding' + this.id + "').fadeOut();clearTimeout(" + o.loaddingTimer + ');" ' + s + "></iframe>").appendTo(this.contentCase);
            this.iframe = r.get(0),
            this.bodyHeight < 0 && (this.bodyHeight = 300)
        }
    } else
        jQuery(this.loadding).fadeOut(),
        this.form ? this.contentCase.firstChild != this.form && this.contentCase.replaceChild(this.form, this.contentCase.firstChild) : (this.form = document.createElement("form"),
        this.form.className = "FORM",
        this.form.method = "post",
        this.form.onsubmit = function() {
            return !1
        }
        ,
        this.contentCase.hasChildNodes() ? this.contentCase.replaceChild(this.form, this.contentCase.firstChild) : this.contentCase.appendChild(this.form)),
        n.slice(0, 4) == "[id]" ? (this.oldcontent = document.getElementById(n.slice(4)),
        r = jQuery(this.oldcontent).clone(),
        this.form.innerHTML = r.html()) : this.form.innerHTML = n,
        this.bodyHeight < 0 && (this.bodyHeight = jQuery(this.contentCase).height()),
        this.contentCase.style.overflow = "hidden";
    this.Focus()
}
,
_window.OpenMsgWin = function(n, t, i, r) {
    jQuery(this.loadding).hide();
    var u = new _window(r,n);
    return u.type = n == "alert" ? "alert" : n == "confirm" ? "confirm" : "message",
    u.loadcss && !document.getElementById("css_window_" + u.loadcss) ? jcLoader().load({
        type: "css",
        ids: "css_window_" + u.loadcss,
        url: "dzz/styles/window/" + u.loadcss + "/style.css"
    }, function() {
        u.Create(t),
        u.SetContent_msgWin(n, i)
    }) : (u.Create(t),
    u.SetContent_msgWin(n, i)),
    u
}
,
_window.prototype.SetContent_msgWin = function(n, t) {
    jQuery(this.loadding).hide(),
    this.form ? this.contentCase.firstChild != this.form && this.contentCase.replaceChild(this.form, this.contentCase.firstChild) : (this.form = document.createElement("form"),
    this.form.className = "FORM",
    this.form.method = "post",
    this.form.onsubmit = function() {
        return !1
    }
    ,
    this.contentCase.hasChildNodes() ? this.contentCase.replaceChild(this.form, this.contentCase.firstChild) : this.contentCase.appendChild(this.form)),
    this.form.innerHTML = t,
    this.Focus()
}
,
_window.prototype.Close = function() {
    var t, r, n, i;
    try {
        this.autoplayTimer && window.clearInterval(this.autoplayTimer)
    } catch (u) {}
    try {
        _filemanage && _filemanage.showicosTimer[this.id] && window.clearTimeout(_filemanage.showicosTimer[this.id])
    } catch (u) {}
    try {
        parseInt(this.uid) > 0 && startVideoShow(this.uid, !1)
    } catch (u) {}
    if (this.needsave == 1)
        if (confirm(__lang.need_save_confirm))
            try {
                window.frames[document.getElementById("ifm_" + this.id).name].autosave()
            } catch (u) {}
        else
            return !1;
    else if (this.needsave > 1)
        try {
            window.frames[document.getElementById("ifm_" + this.id).name].autosave()
        } catch (u) {}
    try {
        window.frames[document.getElementById("ifm_" + this.id).name].location = "about:blank"
    } catch (u) {}
    jQuery(this.board).hide().remove(),
    jQuery("#MsgContainer").hide(),
    jQuery(this.modal).remove();
    try {
        _dock.Dtask(this.taskid)
    } catch (u) {}
    for (t in _filemanage.cons) {
        r = t.split("-");
        if (r[2] == this.id) {
            for (n in _filemanage.cons[t])
                delete n;
            delete _filemanage.cons[t]
        }
    }
    delete _window.windows[this.id];
    for (n in this)
        delete this[n];
    return i = _window.getCurrentWindowId(),
    _window.windows[i] && _window.windows[i].Focus(),
    !1
}
,
_window.prototype.Min = function() {
    if (this.minmine == "no")
        return;
    jQuery(this.board).fadeOut(_ico.delay).removeClass("window_current"),
    this.MIN = 1,
    _dock.setCurrent()
}
,
_window.prototype.Showhide = function() {
    this.board.style.display = "block",
    this.isHide = 0
}
,
_window.prototype.Windowmenu = function() {}
,
_window.prototype.Max = function(n) {
    var t, i, r;
    if (this.maxmine == "no")
        return;
    this.isModal ? (t = jQuery("#MsgContainer").width(),
    i = jQuery("#MsgContainer").height()) : (t = jQuery("#_body").width(),
    i = jQuery("#_body").height()),
    this.board.style.height = i + this.sides[8].height + this.sides[10].height + "px",
    this.board.style.width = t + this.sides[9].width + this.sides[11].width + "px",
    this.board.style.left = -this.sides[11].width + "px",
    this.board.style.top = -this.sides[8].height + "px",
    n || (this.oldleft = this.left,
    this.oldtop = this.top,
    this.oldwidth = this.width,
    this.oldheight = this.height,
    this.oldbodyWidth = this.bodyWidth,
    this.oldbodyHeight = this.bodyHeight),
    this.left = -this.sides[11].width,
    this.top = -this.sides[8].height,
    this.width = t + this.sides[9].width + this.sides[11].width,
    this.height = i + this.sides[8].height + this.sides[10].height,
    this.bodyWidth = t + this.sides[9].width + this.sides[11].width - this.sides[7].width - this.sides[3].width,
    this.bodyHeight = i + this.sides[8].height + this.sides[10].height - this.sides[5].height - this.sides[1].height,
    this.contentCase.style.width = this.bodyWidth + "px",
    this.contentCase.style.height = this.bodyHeight + "px",
    this.titleCase.style.width = this.bodyWidth + "px",
    this.button && (this.buttonCase.style.width = t + this.sides[9].width + this.sides[11].width - this.sides[7].width - this.sides[3].width + "px",
    this.buttonCase.style.bottom = "0px"),
    this.sides[0].style.left = "0px",
    this.sides[0].style.top = "0px",
    this.sides[1].style.left = this.sides[0].width + "px",
    this.sides[1].style.width = t + this.sides[9].width + this.sides[11].width - this.sides[0].width - this.sides[2].width + "px",
    this.sides[1].style.top = "0px",
    this.sides[2].style.right = "0px",
    this.sides[2].style.top = "0px",
    this.sides[3].style.right = "0px",
    this.sides[3].style.top = this.sides[2].height + "px",
    this.sides[3].style.height = i + this.sides[8].height + this.sides[10].height - this.sides[2].height - this.sides[4].height + "px",
    this.sides[4].style.right = "0px",
    this.sides[4].style.bottom = "0px",
    this.sides[5].style.left = this.sides[6].width + "px",
    this.sides[5].style.width = t + this.sides[9].width + this.sides[11].width - this.sides[4].width - this.sides[6].width + "px",
    this.sides[5].style.bottom = "0px",
    this.sides[6].style.left = "0px",
    this.sides[6].style.bottom = "0px",
    this.sides[7].style.left = "0px",
    this.sides[7].style.top = this.sides[0].height + "px",
    this.sides[7].style.height = i + this.sides[8].height + this.sides[10].height - this.sides[0].height - this.sides[6].height + "px",
    this.move = "no",
    this.MAX = 1,
    _window.Max[this.id] = 1,
    n || this.Focus(),
    r = jQuery(this.titleCase),
    r.find(".RESTORE").show(),
    r.find(".MAX").hide(),
    this.id == "_W_openfile" && (jQuery("#content__W_openfile").css("width", jQuery("#right__W_openfile").width()),
    jQuery("#right_bottom").css("width", jQuery("#right__W_openfile").width())),
    this.filemanageid && _filemanage.cons[this.filemanageid].Resize();
    try {
        _filemanage.stack_run(this.id)
    } catch (u) {}
    if (this.type == "image")
        try {
            this.adjust()
        } catch (u) {}
    this.taskid && _dock.setCurrent(this.taskid)
}
,
_window.prototype.Restore = function() {
    if (!this.MAX)
        return;
    this.width = this.oldwidth,
    this.height = this.oldheight,
    this.left = this.oldleft,
    this.top = this.oldtop,
    this.bodyWidth = this.oldbodyWidth,
    this.bodyHeight = this.oldbodyHeight,
    this.contentCase.style.width = this.bodyWidth + "px",
    this.contentCase.style.height = this.bodyHeight + "px",
    this.id != "_W_sys_browser" && (this.titleCase.style.width = this.bodyWidth + "px"),
    this.board.style.height = this.height + "px",
    this.board.style.width = this.width + "px",
    this.button && (this.buttonCase.style.width = this.width - this.sides[7].width + "px",
    this.buttonCase.style.bottom = "0px"),
    this.board.style.left = this.left + "px",
    this.board.style.top = this.top + "px",
    this.sides[1].dx = this.sides[0].width + this.sides[2].width,
    this.width > this.sides[1].dx && (this.sides[1].style.width = this.width - this.sides[1].dx + "px"),
    this.sides[3].dy = this.sides[2].height + this.sides[4].height,
    this.height > this.sides[3].dy && (this.sides[3].style.height = this.height - this.sides[3].dy + "px"),
    this.sides[5].dx = this.sides[4].width + this.sides[6].width,
    this.width > this.sides[5].dx && (this.sides[5].style.width = this.width - this.sides[5].dx + "px"),
    this.sides[7].dy = this.sides[6].height + this.sides[0].height,
    this.height > this.sides[7].dy && (this.sides[7].style.height = this.height - this.sides[7].dy + "px"),
    this.sides[0].style.left = "0px",
    this.sides[0].style.top = "0px",
    this.sides[1].style.left = this.sides[0].width + "px",
    this.sides[1].style.top = "0px",
    this.sides[2].style.right = "0px",
    this.sides[2].style.top = "0px",
    this.sides[3].style.right = "0px",
    this.sides[3].style.top = this.sides[2].height + "px",
    this.sides[4].style.right = "0px",
    this.sides[4].style.bottom = "0px",
    this.sides[5].style.left = this.sides[6].width + "px",
    this.sides[5].style.bottom = "0px",
    this.sides[6].style.left = "0px",
    this.sides[6].style.bottom = "0px",
    this.sides[7].style.left = "0px",
    this.sides[7].style.top = this.sides[0].height + "px",
    this.move = "move",
    this.MAX = 0,
    _window.Max[this.id] = 0,
    this.Focus(),
    this.id == "_W_sys_browser" && (document.getElementById("tabs_container").style.left = document.getElementById("tabs_cover").offsetLeft + "px",
    document.getElementById("tabs_container").style.width = document.getElementById("tabs_cover").offsetWidth + "px",
    document.getElementById("leftrun") && (document.getElementById("leftrun").style.left = document.getElementById("tabs_cover").offsetLeft + "px"),
    _window.resetTabs()),
    this.id == "_W_openfile" && (jQuery("#content__W_openfile").css("width", jQuery("#right__W_openfile").width()),
    jQuery("#right_bottom").css("width", jQuery("#right__W_openfile").width())),
    this.id == "_W_dim" && _dim.setContainerHeight(),
    parseInt(this.uid) > 0 && (_dim.setContainerHeight_dimwin(this.uid),
    this.ResizeBy(0, 0));
    var n = jQuery(this.titleCase);
    n.find(".RESTORE").hide(),
    n.find(".MAX").show(),
    this.filemanageid && _filemanage.cons[this.filemanageid].Resize();
    try {
        _filemanage.stack_run(this.id)
    } catch (t) {}
    if (this.type == "image")
        try {
            this.adjust()
        } catch (t) {}
}
,
_window.prototype.Hide = function() {
    jQuery(this.board).fadeOut(_ico.delay),
    _dock.setCurrent()
}
,
_window.prototype.Show = function() {
    this.MIN || jQuery(this.board).fadeIn(_ico.delay),
    this.taskid && _dock.setCurrent(this.taskid)
}
,
_window.prototype.DetachEvent = function(n, t) {
    if (!_window.tach)
        return;
    document.onmousemove = _window.onmousemove,
    document.onmousemove = _window.onmousemove,
    document.onmouseup = _window.onmouseup,
    document.onselectstart = _window.onselectstart;
    try {
        t.releaseCapture && t.releaseCapture()
    } catch (n) {}
    _window.tach = 0,
    jQuery("#_blank").hide()
}
,
_window.prototype.AttachEvent = function(n, t) {
    if (_window.tach)
        return;
    _window.onmousemove = document.onmousemove,
    _window.onmouseup = document.onmouseup,
    _window.onselectstart = document.onselectstart;
    try {
        document.onselectstart = function() {
            return !1
        }
        ,
        n.preventDefault && n.preventDefault(),
        t.setCapture && t.setCapture(),
        window.event.returnValue = !1
    } catch (n) {}
    _window.tach = 1
}
,
_window.prototype.Focus = function(n) {
    this.isHide && this.Showhide(),
    this.zIndex < _window.zIndex && (this.board.style.zIndex = this.zIndex = ++_window.zIndex),
    jQuery(".window").removeClass("window_current"),
    jQuery("#" + this.id).addClass("window_current"),
    this.taskid && _dock.setCurrent(this.taskid),
    n || (jQuery(".window_blank").each(function() {
        var n = this.id.replace("_blank_", "");
        _window.windows[n] && _window.windows[n].type != "folder" && _window.windows[n].type != "image" && _window.windows[n].type != "dim_win" && jQuery(this).css("z-index", 100)
    }),
    jQuery(this.blank).css("z-index", -1)),
    this.MIN = 0;
    if (this.type == "dim_win" && !n) {
        var t = this.id.replace("_W_uid_", "");
        _dim.message_print(t)
    }
    return jQuery(this.board).show(),
    !1
}
,
_window.prototype.PreResize = function(n, t) {
    n = n ? n : window.event;
    if (this.move == "no")
        return;
    typeof this.ResizeTimer != "undefined" && clearTimeout(this.ResizeTimer),
    this.Focus(),
    this.resizeX = n.clientX - this.width - 4,
    this.resizeY = n.clientY - this.height - 4,
    this.AttachEvent(n, t),
    document.getElementById("_blank").style.cursor = this.resize == "resize-x" ? "e-resize" : this.resize == "resize-y" ? "s-resize" : "se-resize",
    document.getElementById("_blank").style.display = "";
    var i = this;
    document.onmousemove = function(n) {
        i.Resize(n ? n : window.event)
    }
    ,
    document.onmouseup = function(n) {
        i.Resized(n ? n : window.event, t)
    }
}
,
_window.prototype.Resize = function(n) {
    var r, f, i, t, u;
    n = n ? n : window.event,
    r = 0,
    f = 0,
    this.resize != "resize-y" && (i = n.clientX - this.resizeX - 4,
    t = this.treeshow > 0 ? jQuery("#jstree_area_" + this.id).width() + this.right_minWidth : this.right_minWidth,
    t = this.minWidth < t ? t : this.minWidth,
    i = i > t ? i : t,
    i + this.left > _config.screenWidth && (i = _config.screenWidth - this.left),
    r = i - this.width,
    this.bodyWidth + r < t && (r = t - this.bodyWidth),
    this.width += r * 1,
    this.board.style.width = this.width + "px",
    this.sides[1].style.width = this.width - this.sides[1].dx + "px",
    this.sides[5].style.width = this.width - this.sides[5].dx + "px",
    this.buttonCase && (this.buttonCase.style.width = this.width - this.buttonCase.dx + "px"),
    this.bodyWidth += r * 1,
    this.titleCase.style.width = this.bodyWidth + "px",
    this.contentCase.style.width = this.bodyWidth + "px",
    this.id == "_W_openfile" && (jQuery("#content__W_openfile").css("width", jQuery("#right__W_openfile").width()),
    jQuery("#right_bottom").css("width", jQuery("#right__W_openfile").width()))),
    this.resize != "resize-x" && (u = n.clientY - this.resizeY,
    u = u > this.minHeight * 1 ? u : this.minHeight * 1,
    u + this.top > _config.screenHeight && (u = _config.screenHeight - this.top),
    f = u - this.height,
    this.bodyHeight + f < this.minHeight * 1 && (r = this.minHeight * 1 - this.bodyHeight),
    this.height += f * 1,
    this.board.style.height = this.height + "px",
    this.sides[3].style.height = this.height - this.sides[3].dy + "px",
    this.sides[7].style.height = this.height - this.sides[7].dy + "px",
    this.bodyHeight += f * 1,
    parseInt(this.uid) > 0 && _dim.setContainerHeight_dimwin(this.uid),
    this.contentCase.style.height = this.bodyHeight + "px",
    this.filemanageid && _filemanage.cons[this.filemanageid].Resize()),
    this.id == "_W_dim" && _dim.setContainerHeight(),
    parseInt(this.uid) > 0 && _dim.setContainerHeight_dimwin(this.uid);
    if (this.type == "image")
        try {
            this.adjust()
        } catch (n) {}
}
,
_window.prototype.Resized = function(n, t) {
    n = n ? n : window.event,
    this.DetachEvent(n, t),
    document.getElementById("_blank").style.display = "none",
    document.getElementById("_blank").style.cursor = "url('dzz/images/cur/aero_arrow.cur'),auto",
    this.type != "folder" && (this.type == "dim_win" && jQuery("#chatBox_chatLogButton_" + this.uid).hasClass("hover") ? (setcookie("win_" + this.id + "_width", this.bodyWidth * 1 - _dim.chatlogWidth, 31536e3),
    setcookie("win_" + this.id + "_height", this.bodyHeight * 1, 31536e3)) : this.type == "dim_win" && jQuery("#chatBox_showButton_" + this.uid).hasClass("hover") ? (setcookie("win_" + this.id + "_width", this.bodyWidth * 1 - _dim.videoShowWidth, 31536e3),
    setcookie("win_" + this.id + "_height", this.bodyHeight * 1, 31536e3)) : (setcookie("win_" + this.id + "_width", this.bodyWidth * 1, 31536e3),
    setcookie("win_" + this.id + "_height", this.bodyHeight * 1, 31536e3)));
    try {
        _filemanage.stack_run(this.id)
    } catch (n) {}
    this.type == "image" && this.adjust()
}
,
_window.prototype.ResizeTo = function(n, t) {
    var r = n * 1 - this.bodyWidth * 1
      , i = t * 1 - this.bodyHeight * 1;
    this.ResizeBy(r, i)
}
,
_window.prototype.ResizeBy = function(n, t) {
    n && (this.width += n * 1,
    this.board.style.width = this.width + "px",
    this.board.style.left = this.left + "px",
    this.sides[1].style.width = this.width - this.sides[1].dx + "px",
    this.sides[5].style.width = this.width - this.sides[5].dx + "px",
    this.buttonCase && (this.buttonCase.style.width = this.width - this.buttonCase.dx + "px"),
    this.bodyWidth += n * 1,
    this.contentCase.style.width = this.bodyWidth + "px",
    this.id != "_W_sys_browser" && (this.titleCase.style.width = this.bodyWidth + "px"),
    this.id == "_W_openfile" && (jQuery("#content__W_openfile").css("width", jQuery("#right__W_openfile").width()),
    jQuery("#right_bottom").css("width", jQuery("#right__W_openfile").width()))),
    t && (this.height += t * 1,
    this.board.style.height = this.height + "px",
    this.board.style.top = this.top + "px",
    this.sides[3].style.height = this.height - this.sides[3].dy + "px",
    this.sides[7].style.height = this.height - this.sides[7].dy + "px",
    this.bodyHeight += t * 1,
    this.contentCase.style.height = this.bodyHeight + "px",
    this.filemanageid && _filemanage.cons[this.filemanageid].Resize()),
    this.id == "_W_dim" && _dim.setContainerHeight(),
    parseInt(this.uid) > 0 && _dim.setContainerHeight_dimwin(this.uid)
}
,
_window.prototype.ActResizeBy = function(n, t, i) {
    var u, r;
    BROWSER.ie ? this.ResizeBy(n, t) : (n != 0 || t != 0) && (u = n / 10,
    u = u > 0 ? Math.ceil(u) : Math.floor(u),
    r = t / 10,
    r = r > 0 ? Math.ceil(r) : Math.floor(r),
    this.ResizeBy(u, r),
    n -= u,
    t -= r,
    i && this.ResizeTimer && clearTimeout(this.ResizeTimer),
    this.ResizeTimer = window.setTimeout(this.string + ".ActResizeBy(" + n + "," + t + ")", 50))
}
,
_window.prototype.Mousedown = function(n, t) {
    var r, i, f, u;
    n = n ? n : window.event,
    this.Focus();
    if (!this.moveable)
        return !0;
    if (n.button == 2)
        return;
    r = n.clientX,
    i = n.clientY,
    this.oldxx = r,
    this.oldyy = i,
    this.draging = !0,
    this.moveX = r - this.left,
    this.moveY = i - this.top,
    f = n.srcElement ? n.srcElement : n.target;
    if (/input|textarea/i.test(f.tagName))
        return !0;
    this.AttachEvent(n, t),
    u = this,
    this.draging = !1,
    document.onmousemove = function(n) {
        u.Move(n ? n : window.event, t)
    }
}
,
_window.prototype.Mouseup = function(n, t) {
    n = n ? n : window.event,
    _window.tach && this.DetachEvent(n, t)
}
,
_window.prototype.PreMove = function(n) {
    jQuery("#_blank").empty().show();
    if (this.MAX > 0) {
        jQuery("#_blank").hide(),
        _window.tach && this.DetachEvent(_window.even, n);
        return
    }
    var t = this;
    this.draging = !0,
    document.onmouseup = function(i) {
        t.Moved(i ? i : window.event, n)
    }
}
,
_window.prototype.Move = function(n, t) {
    try {
        window.event.returnValue = !1
    } catch (n) {}
    var r = n.clientX
      , i = n.clientY;
    !this.draging && (this.oldxx != r || this.oldyy != i) && this.PreMove(t);
    if (!this.draging)
        return;
    r < 0 && (r = 0),
    i < 0 && (i = 0),
    r > _config.screenWidth && (r = _config.screenWidth),
    i > _config.screenHeight && (i = _config.screenHeight),
    this.move != "move-y" && (this.board.style.left = r - this.moveX + "px",
    this.left = r - this.moveX),
    this.move != "move-x" && (this.board.style.top = i - this.moveY + "px",
    this.top = i - this.moveY)
}
,
_window.prototype.Moved = function(n, t) {
    jQuery("#_blank").hide(),
    _window.tach && this.DetachEvent(n, t);
    var r = n.clientX
      , u = n.clientY
      , f = jQuery("#_body")
      , i = f.offset();
    r < i.left && (r = i.left),
    u < i.top && (u = i.top),
    r > i.left + f.width() && (r = i.left + f.width()),
    u > i.top + f.height() && (u = i.top + f.height()),
    this.move != "move-y" && (this.board.style.left = r - this.moveX + "px",
    this.left = r - this.moveX),
    this.move != "move-x" && (this.board.style.top = u - this.moveY + "px",
    this.top = u - this.moveY),
    this.type != "folder" && (setcookie("win_" + this.id + "_left", this.left * 1, 31536e3),
    setcookie("win_" + this.id + "_top", this.top * 1, 31536e3))
}
,
_window.prototype.DisableButton = function(n, t) {
    n = n.toUpperCase(),
    this.buttons[n].disabled = !0,
    this.buttons[n].className = (t ? t : "DISABLED") + " " + n
}
,
_window.prototype.EnableButton = function(n) {
    n = n.toUpperCase(),
    this.buttons[n].disabled = !1,
    this.buttons[n].className = n
}
,
_window.prototype.OnOK = function() {
    this.Close()
}
,
_window.prototype.OnCANCEL = function() {
    this.Close()
}
,
_window.prototype.reject = function() {
    jQuery("#_blank").empty().hide();
    var n = this;
    jQuery(this.board).animate({
        left: this.oldleft + "px",
        top: this.oldtop + "px"
    }, _config.delay, function() {
        n.left = n.oldleft,
        n.top = n.oldtop
    })
}
,
_window.prototype.save = function() {
    this.type !== "widget" || !_config.Permission_Container("admin", "icosContainer_body_" + this.desktop)
}
,
_window.prototype.FullScreen = function() {
    document.getElementById("ifm_" + this.id) && toggleFullScreen(document.getElementById("ifm_" + this.id))
}
,
_window.prototype.Loading = function(n) {
    n == "show" ? (jQuery(this.board).find(".window_loadding").show(),
    (function() {
        var n = this;
        window.setTimeout(function() {
            try {
                jQuery(n.board).find(".window_loadding").show()
            } catch (t) {}
        }, 1e4)
    }
    )()) : jQuery(this.board).find(".window_loadding").hide()
}
,
_layout.navbars = {},
_layout.zIndex = 0,
_layout.init = function() {
    var n = new _layout(_config.space);
    _layout.CIcoContainer(),
    _layout.createPage();
    jQuery("#tray_copyright").on("click", function() {
        jQuery("#copyrightmenu").toggle(),
        jQuery(this).find(".gb_I,.gb_H").toggle();
        jQuery(document).on("mousedown.try_copyright", function(n) {
            n = n ? n : window.event;
            var t = n.srcElement ? n.srcElement : n.target;
            jQuery(t).closest("#copyrightmenu").length || (jQuery("#copyrightmenu").hide(),
            jQuery("#tray_copyright").find(".gb_I,.gb_H").hide(),
            jQuery(document).off("mousedown.try_copyright"))
        })
    });
    jQuery("#tray_showdesktop").on("mousedown", function() {
        return _window.showDesktop(),
        !1
    });
    return n
}
,
_layout.setPageNext = function() {
    var n = _layout.currentPage + 1;
    n > _layout.page && (n = 1),
    _layout.setPage(n)
}
,
_layout.setPagePrev = function() {
    var n = _layout.currentPage - 1;
    n < 1 && (n = _layout.page),
    _layout.setPage(n)
}
,
_layout.setPage = function(n) {
    if (_layout.setpageTimer > 0)
        return;
    _layout.setpageTimer = 1,
    _layout.currentPage = n,
    jQuery("#page_nav_" + _layout.fid).find(".page_nav_item").removeClass("current"),
    jQuery("#page_nav_item_" + n).addClass("current").anim,
    jQuery("#icosContainer_body_" + _layout.fid).animate({
        left: -((n - 1) * _config.screenWidth - _layout.marginleft)
    }, 500, function() {
        _layout.setpageTimer = 0
    }),
    jQuery("#_shadow_icosContainer_body_" + _layout.fid).css({
        left: -((n - 1) * _config.screenWidth - _layout.marginleft)
    })
}
,
_layout.initContainer = function() {
    jQuery("#body_container").css({
        width: _config.screenWidth,
        height: _config.screenHeight
    }),
    jQuery("#_body").css({
        left: _layout._body_marginleft,
        top: _layout._body_margintop,
        width: _config.screenWidth - _layout._body_marginleft - _layout._body_marginright,
        height: _config.screenHeight - _layout._body_margintop - _layout._body_marginbottom
    }),
    jQuery("#icosContainer_body_" + _layout.fid).css({
        left: _layout.marginleft,
        top: _layout.margintop,
        width: _config.screenWidth * _layout.page - _layout.marginleft - _layout.marginright - _layout._body_marginleft - _layout._body_marginright,
        height: _config.screenHeight - _layout.margintop - _layout.marginbottom - _layout._body_margintop - _layout._body_marginbottom
    })
}
,
_layout.setTaskbarPosition = function(n) {
    if (n == _config.space.taskbar)
        return;
    var t = document.getElementById("taskbar");
    t.className = "taskbar taskbar-" + n,
    document.getElementById("startmenu").className = "startmenu fade in " + n,
    document.getElementById("noticeContainer").className = "noticeContainer fade in " + n,
    document.getElementById("copyrightmenu").className = "copyrightmenu fade in " + n,
    document.body.className = n,
    _config.space.taskbar = n,
    _layout._body_margintop = 0,
    _layout._body_marginright = 0,
    _layout._body_marginbottom = 0,
    _layout._body_marginleft = 0;
    switch (n) {
    case "bottom":
        _layout._body_marginbottom += jQuery("#taskbar").height(),
        _layout.taskbar_direction = 1;
        break;
    case "left":
        _layout._body_marginleft += jQuery("#taskbar").width(),
        _layout.taskbar_direction = 2;
        break;
    case "top":
        _layout._body_margintop += jQuery("#taskbar").height(),
        _layout.taskbar_direction = 1;
        break;
    case "right":
        _layout._body_marginright += jQuery("#taskbar").width(),
        _layout.taskbar_direction = 2
    }
    _layout.resize(),
    jQuery.post(_config.saveurl + "&do=userfield&datename=taskbar", {
        taskbar: n
    })
}
,
_layout.resize = function() {
    var e = _config.screenWidth - _layout.marginleft - _layout.marginright - _layout._body_marginleft - _layout._body_marginright, f = _config.screenHeight - _layout.margintop - _layout.marginbottom - _layout._body_margintop - _layout._body_marginbottom, s = parseInt(_config.iconview[_layout.iconview].divwidth) || _ico.divwidth, o = parseInt(_config.iconview[_layout.iconview].divheight) || _ico.divheight, u = parseInt(_config.iconview[_layout.iconview].paddingleft) || _ico.paddingLeft, r = parseInt(_config.iconview[_layout.iconview].paddingtop) || _ico.paddingTop, i = Math.floor((e + u) / (s + u)), t, n;
    i < 1 && (i = 1),
    t = Math.floor((f + r) / (o + r)),
    t < 1 && (t = 1),
    n = Math.ceil(_config.screenList.length / (i * t)),
    n < 1 && (n = 1),
    _config.createpageTimer && window.clearTimeout(_config.createpageTimer),
    _config.createpageTimer = window.setTimeout(function() {
        n != _layout.page && (_layout.page = n,
        _layout.currentPage > n && (_layout.currentPage = n),
        _config.createpageTimer && window.clearTimeout(_config.createpageTimer),
        _layout.createPage()),
        _layout.initContainer(),
        _start.setHeight(),
        _ico.refreshList(_layout.fid),
        _dock.refreshlist(),
        _dock.setDockSize(),
        _window.resize(),
        _layout.setCurrentPage(_layout.currentPage)
    }, 200)
}
,
_layout.createPage = function() {
    var t, r, n, i;
    _layout.currentPage > _layout.page && (_layout.currentPage = _layout.page);
    if (_layout.page > 1) {
        for (document.getElementById("page_nav_" + _layout.fid) ? t = jQuery("#page_nav_" + _layout.fid) : (t = jQuery('<div id="page_nav_' + _layout.fid + '" class="page_nav_container"></div>').appendTo("#_body"),
        _layout.pageHeight = t.outerHeight(!0),
        _layout.marginbottom = 10 + _layout.pageHeight,
        jQuery("#icosContainer_body_" + _layout.fid).css({
            width: _config.screenWidth * _layout.page - _layout.marginleft - _layout.marginright,
            height: _config.screenHeight - _layout.margintop - _layout.marginbottom - _layout._body_margintop - _layout._body_marginbottom
        })),
        r = (_config.screenWidth - _layout.marginleft - _layout.marginright) * .8,
        _layout.pageWidth = r / _layout.page > _layout.MaxPageWidth ? _layout.MaxPageWidth : Math.floor(r / _layout.page),
        n = "",
        i = 1; i <= _layout.page; i++)
            n += '<div id="page_nav_item_' + i + '" class="page_nav_item " page="' + i + '">',
            n += '\t   <table width="100%" height="100%">',
            n += '\t\t\t<tr><td valign="middle"><div class="page_nav_block" style="width:' + _layout.pageWidth + 'px"></div></td></tr>',
            n += "\t\t</table>",
            n += "</div>";
        t.html(n),
        t.css("margin-left", -_layout.pageWidth * _layout.page / 2);
        t.find(".page_nav_item").on("click", function() {
            var n = jQuery(this).attr("page");
            jQuery(this).parent().find(".page_nav_item").removeClass("current"),
            jQuery(this).addClass("current"),
            _layout.currentPage = n,
            jQuery("#icosContainer_body_" + _layout.fid).animate({
                left: -((n - 1) * _config.screenWidth - _layout.marginleft)
            }, 500)
        });
        jQuery("#page_nav_" + _layout.fid + " .page_nav_item[page=" + _layout.currentPage + "]").trigger("click")
    } else
        _layout.pageHeight = 0,
        _layout.marginbottom = 10 + _layout.pageHeight,
        jQuery("#page_nav_" + _layout.fid).remove(),
        jQuery("#icosContainer_body_" + _layout.fid).css({
            left: _layout.marginleft,
            top: _layout.margintop,
            width: _config.screenWidth - _layout.marginleft - _layout.marginright - _layout._body_marginleft - _layout._body_marginright,
            height: _config.screenHeight - _layout.margintop - _layout.marginbottom - _layout._body_margintop - _layout._body_marginbottom
        });
    _layout.resize()
}
,
_layout.setCurrentPage = function(n) {
    n > _layout.page && (n = _layout.page),
    jQuery("#icosContainer_body_" + _layout.fid).css({
        left: -((n - 1) * _config.screenWidth - _layout.marginleft)
    })
}
,
_layout.CIcoContainer = function() {
    var n = document.createElement("div"), t;
    n.id = "icosContainer_body_" + _layout.fid,
    n.className = "icosContainer",
    n.setAttribute("unselectable", "on"),
    n.setAttribute("onselectstart", "return event.srcElement.type== 'text';"),
    n.style.cssText = "width:" + (_config.screenWidth * _layout.page - _layout.marginleft - _layout.marginright - _layout._body_marginleft - _layout._body_marginright) + "px; height:" + (_config.screenHeight - _layout.margintop - _layout.marginbottom - _layout._body_margintop - _layout._body_marginbottom) + "px;left:" + (_layout.marginleft + _layout._body_marginleft) + "px;top:" + (_layout.margintop + _layout._body_margintop) + "px;",
    document.getElementById("_body").appendChild(n),
    jQuery(n).addTouch();
    jQuery(n).on("contextmenu", function(n) {
        return _contextmenu.right_body(n ? n : window.event, _layout.fid),
        !1
    });
    jQuery(n).on("mousedown", function(n) {
        _layout._body_Mousedown(n ? n : window.event, "icosContainer_body_" + _layout.fid)
    });
    jQuery(n).on("mouseup", function(n) {
        _layout._body_Mouseup(n ? n : window.event)
    });
    _config.Permission_Container("multiselect", _layout.fid) && _select.init("icosContainer_body_" + _layout.fid);
    jQuery("#icosContainer_body_" + _layout.fid).on("click", function(n) {
        n = n ? n : window.event;
        var t = n.srcElement ? n.srcElement : n.target;
        if (/input|textarea/i.test(t.tagName))
            return !0;
        this.id == _config.selectall.container && (_config.selectall.container = this.id,
        _config.selectall.icos = [],
        _config.selectall.position = {},
        jQuery(this).find(".Icoblock").removeClass("Icoselected"))
    });
    t = document.createElement("input"),
    t.id = "input_icosContainer_body_" + _layout.fid,
    t.style.cssText = "position:absolute;z-index:-999999;width:1px;height:1px;border:none;",
    t.setAttribute("multiple", "multiple"),
    t.setAttribute("type", "file"),
    t.setAttribute("name", "files[]"),
    document.body.appendChild(t),
    _config.Permission_Container("upload", _layout.fid) && _layout.createUpload("input_icosContainer_body_" + _layout.fid, "icosContainer_body_" + _layout.fid, jQuery("#icosContainer_body_" + _layout.fid), jQuery("#icosContainer_body_" + _layout.fid))
}
,
_layout.createUpload = function(n, t, i, r) {
    var u = _config.space.attachextensions.join("|"), e, f;
    u = u == "" ? ".*$" : "(.|/)(" + u + ")$",
    e = n.split("_"),
    f = e.pop();
    jQuery("#" + n).fileupload({
        url: DZZSCRIPT + "?mod=system&op=dzzcp&do=upload&container=" + t,
        dataType: "json",
        autoUpload: !0,
        maxChunkSize: parseInt(_config.myspace.maxChunkSize),
        dropZone: i,
        pasteZone: r,
        maxFileSize: parseInt(_config.myspace.maxattachsize) > 0 ? parseInt(_config.myspace.maxattachsize) : null,
        acceptFileTypes: new RegExp(u,"i"),
        sequentialUploads: !0
    }).on("fileuploadadd", function(n, t) {
        t.context = jQuery('<li class="list-group-item"></li>').appendTo(_upload.list),
        jQuery.each(t.files, function(n, i) {
            jQuery(_upload.getItemTpl(i)).appendTo(t.context),
            _upload.add()
        })
    }).on("fileuploadsubmit", function(n, t) {
        t.context.find(".upload-cancel").off("click").on("click", function() {
            t.abort(),
            _upload.done(),
            t.context.find(".upload-progress-mask").css("width", "0%"),
            t.context.find(".upload-cancel").hide(),
            t.context.find(".upload-item.percent").html('<span class="warning">' + __lang.already_cancel + "</span>")
        });
        _upload.submit(),
        jQuery.each(t.files, function(n, i) {
            var r = i.relativePath ? i.relativePath : "";
            t.formData = {
                relativePath: r
            };
            return
        })
    }).on("fileuploadprocessalways", function(n, t) {
        var r = t.index
          , i = t.files[r];
        i.error && (_upload.done(),
        t.context.find(".upload-item.percent").html('<span class="danger" title="' + i.error + '">' + i.error + "</span>"))
    }).on("fileuploadprogress", function(n, t) {
        _upload.bitrate = formatSize(t.bitrate / 8);
        var i = parseInt(t.loaded / t.total * 100, 10);
        t.context.find(".upload-progress-mask").css("width", i + "%"),
        t.context.find(".upload-item.percent").html(i + "%(" + _upload.bitrate + "/s)")
    }).on("fileuploadprogressall", function(n, t) {
        _upload.bitrate = formatSize(t.bitrate / 8);
        var i = parseInt(t.loaded / t.total * 100, 10);
        _upload.progress(_upload.bitrate + "/s", i + "%"),
        _upload.el.find(".panel-heading .upload-progress-mask").css("width", i + "%")
    }).on("fileuploaddone", function(n, t) {
        _upload.done(),
        t.context.find(".upload-progress-mask").css("width", "0%"),
        t.context.find(".upload-cancel").hide(),
        jQuery.each(t.result.files, function(n, i) {
            var u, r;
            if (i.error)
                u = i.relativePath ? i.relativePath : "",
                t.context.find(".upload-item.percent").html('<span class="danger" title="' + i.error + '">' + i.error + "</span>");
            else {
                t.context.find(".upload-item.percent").html('<i class="glyphicon glyphicon-ok"></i>');
                var u = i.relativePath || ""
                  , e = hex_md5(u + i.name)
                  , f = _ico.icos["uploader_" + self.id + "_" + e];
                f && jQuery(f.board).remove();
                if (i.data.folderarr)
                    for (r = 0; r < i.data.folderarr.length; r++)
                        _config.sourcedata.folder[i.data.folderarr[r].fid] = i.data.folderarr[r];
                if (i.data.icoarr)
                    for (r = 0; r < i.data.icoarr.length; r++)
                        _ico.createIco(i.data.icoarr[r])
            }
        })
    }).on("fileuploadfail", function(n, t) {
        jQuery.each(t.files, function(n, i) {
            _upload.done(),
            t.context.find(".upload-item.percent").html('<span class="danger" title="' + i.error + '">' + i.error + "</span>")
        })
    }).on("fileuploaddrop", function(n) {
        var i = n.dataTransfer.getData("text/plain");
        if (i) {
            n.preventDefault();
            if (_config.Permission_Container("link", f))
                return jQuery.getJSON(_config.systemurl + "&op=dzzcp&do=newlink&path=" + parseInt(f) + "&handlekey=handle_add_newlink&link=" + encodeURIComponent(i), function(n) {
                    n ? n.error ? Alert(n.error, 3) : _ico.createIco(n) : Alert(__lang.js_network_error, 1)
                }),
                !1
        }
    }).on("fileuploaddragover", function(n) {
        n.dataTransfer.dropEffect = "copy",
        n.preventDefault()
    })
}
,
_layout.DetachEvent = function() {
    if (!_layout.tach)
        return;
    document.onmousemove = _layout.onmousemove,
    document.onmouseup = _layout.onmouseup,
    document.onselectstart = _layout.onselectstart;
    try {
        _layout.board.releaseCapture && _layout.board.releaseCapture()
    } catch (n) {}
    _layout.tach = 0
}
,
_layout.AttachEvent = function(n) {
    if (_layout.tach)
        return;
    _layout.onmousemove = document.onmousemove,
    _layout.onmouseup = document.onmouseup,
    _layout.onselectstart = document.onselectstart;
    try {
        document.onselectstart = function() {
            return !1
        }
        ,
        n.preventDefault ? n.preventDefault() : this.board.setCapture && this.board.setCapture()
    } catch (n) {}
    _layout.tach = 1
}
,
_layout._body_Mousedown = function(n) {
    var u = n.srcElement ? n.srcElement : n.target, i, r;
    if (/input|textarea/i.test(u.tagName))
        return !0;
    if (n.button == 2)
        return !0;
    _layout.mousedowndoing = !1,
    i = n.clientX,
    r = n.clientY,
    _layout.oldx = i,
    _layout.oldY = r;
    if (_layout.page < 2 || _hotkey.ctrl > 0)
        return !0;
    _layout.tach || _layout.AttachEvent(n),
    document.onmousemove = function(n) {
        _layout._body_Move(n ? n : window.event)
    }
}
,
_layout._body_Mouseup = function(n) {
    var t = n.srcElement ? n.srcElement : n.target;
    if (/input|textarea/i.test(t.tagName))
        return !0;
    _layout.tach && _layout.DetachEvent(n),
    _layout.mousedowndoing && _layout._body_Moved(n)
}
,
_layout._body_PreMove = function() {
    jQuery("#_blank").empty().show(),
    _layout.mousedowndoing = !0,
    _layout.oldleft = parseInt(jQuery("#icosContainer_body_" + _layout.fid).css("left")),
    document.onmouseup = function(n) {
        _layout._body_Moved(n ? n : window.event)
    }
}
,
_layout._body_Move = function(n) {
    var i = n.clientX, r = n.clientY, t;
    !_layout.mousedowndoing && (Math.abs(_layout.oldx - i) > 5 || Math.abs(_layout.oldy - r) > 5) && _layout._body_PreMove();
    if (!_layout.mousedowndoing)
        return;
    t = jQuery("#icosContainer_body_" + _layout.fid),
    t.css("left", _layout.oldleft + (i - _layout.oldx))
}
,
_layout._body_Moved = function(n) {
    var t, r, i;
    jQuery("#_blank").hide(),
    t = n.clientX,
    r = n.clientY,
    _layout.tach && _layout.DetachEvent(n),
    i = jQuery("#icosContainer_body_" + _layout.fid),
    t - _layout.oldx < -50 ? _layout.setPageNext() : t - _layout.oldx > 50 ? _layout.setPagePrev() : i.animate({
        left: _layout.oldleft
    }, 500)
}
,
_start.opened = 0,
_start.noticeDelay = 1e4,
_start.min_timeout = 10,
_start.noticeTask = [],
_start.icoTips = {},
_start.icos = {},
_start.zIndex = 0,
_start.className = "startapp",
_start.divwidth = 70,
_start.divheight = 70,
_start.width = 40,
_start.height = 40,
_start.padding = 10,
_start.jumps = [],
_start.init = function() {
    var t, n, i;
    for (_start.setHeight(),
    t = _config.appList,
    n = 0; n < t.length; n++)
        i = _start.CIco(t[n], n);
    jQuery("#startmenu_app").kpdragsort({
        scrollContainer: jQuery("#startmenu_appContainer"),
        contentContainer: jQuery("#startmenu_app")
    }, function() {
        _start.sortApplist()
    });
    jQuery("#taskbar_start").on("mousedown touchstart", function() {
        return _start.opened > 0 ? _start.StartMenu("hide") : _start.StartMenu("show"),
        !1
    });
    jQuery("#taskbar").mousedown(function(n) {
        return _start.mousedown(n ? n : window.event),
        dfire("mousedown"),
        !1
    }).mouseup(function(n) {
        return _start.mouseup(n ? n : window.event),
        dfire("mouseup"),
        !1
    })
}
,
_start.StartMenu = function(n) {
    if (n == "show") {
        _start.opened = 1,
        _start.setStartTip(0),
        jQuery("#startmenu").show(),
        jQuery("#taskbar_start").addClass("startmenu-opened");
        jQuery(document).on("mousedown.startmenu", function(n) {
            n = n ? n : window.event;
            var t = n.srcElement ? n.srcElement : n.target;
            !jQuery(t).closest("#startmenu,#taskbar_start").length && !jQuery(t).closest("#right_contextmenu").length && (_start.StartMenu("hide"),
            jQuery(document).off("mousedown.startmenu"))
        })
    } else
        _start.opened = 0,
        jQuery("#startmenu").hide(),
        jQuery("#taskbar_start").removeClass("startmenu-opened")
}
,
_start.setHeight = function() {
    var t = 420, n = 380, i;
    _layout.taskbar_direction == 1 ? (t + jQuery("#taskbar").outerHeight(!0) > _config.screenHeight && (t = _config.screenHeight - jQuery("#taskbar").outerHeight(!0) - 10),
    n > _config.screenWidth && (n = _config.screenWidth - 10)) : (n + jQuery("#taskbar").outerWidth(!0) > _config.screenWidth && (n = _config.screenWidth - jQuery("#taskbar").outerWidth(!0) - 10),
    t > _config.screenHeight && (t = _config.screenHeight - 10)),
    i = jQuery("#startmenu_app .startapp").length ? jQuery("#startmenu_app .startapp").outerWidth(!0) : 90,
    n = Math.floor((n - 18) / i) * i + 20,
    jQuery("#startmenu").css({
        width: n,
        height: t
    }),
    jQuery("#startmenu_appContainer").css("height", jQuery("#startmenu").height() - jQuery("#startmenu_title").outerHeight(!0))
}
,
_start.setNoticeRun = function() {
    for (var i = _config.appList, n, t = 0; t < i.length; t++)
        n = _config.sourcedata.app[i[t]],
        n.noticeurl && n.noticeurl != "" && _start.noticeTask.push(n.appid);
    _start.noticeTaskRun()
}
,
_start.noticeTaskRun = function() {
    if (_start.noticeTask.length > 0)
        _start.getNotice(_start.noticeTask[0]),
        _start.noticeTask.splice(0, 1);
    else
        return;
    window.setTimeout(function() {
        _start.noticeTaskRun()
    }, _start.noticeDelay)
}
,
_start.getNotice = function(n) {
    var i = _config.sourcedata.app[n], t, r;
    if (!i.noticeurl)
        return;
    t = "&",
    i.noticeurl.indexOf("?") === -1 && (t = "?"),
    jQuery.inArray(n, _config.noticebanlist) < 0 ? (r = i.noticeurl + t + "appid=" + n + "&uid=" + _config.myuid,
    jQuery.ajax({
        url: r,
        dataType: "jsonp",
        jsonp: "callback",
        jsonpCallback: "noticeCallback",
        success: function(t) {
            _start.applyNotice(n, t)
        },
        error: function() {}
    })) : window.setTimeout(function() {
        _start.getNotice(n)
    }, 36e3)
}
,
_start.applyNotice = function(n, t) {
    _ico.setTip(n, t.sum, "app"),
    t.notice && (jQuery("#notice").show().html(decodeURIComponent(t.notice.html)),
    jQuery("#notice").find("a").attr("target", "_blank"),
    t.notice.closetime > 0 && window.setTimeout(function() {
        jQuery("#notice").hide()
    }, t.notice.closetime * 1e3)),
    t.timeout > 0 && (t.timeout < _start.min_timeout && (t.timeout = _start.min_timeout),
    window.setTimeout(function() {
        _start.getNotice(n)
    }, t.timeout * 1e3))
}
,
_start.refreshlist = function() {
    var n, t;
    for (jQuery("#startmenu_app").empty(),
    n = 0; n < _config.appList.length; n++)
        t = _start.CIco(_config.appList[n], n)
}
,
_start.CIco = function(n, t) {
    var i = new _start(n,t);
    return i.create(),
    i
}
,
_start.Operation = function(n, t) {
    switch (t) {
    case "todesktop":
        _start.appLinkTo(n, _layout.fid);
        break;
    case "todock":
        _start.appLinkTo(n, _config.space.typefid.dock);
        break;
    case "uninstall":
        _start.appUninstall(n)
    }
}
,
_start.appLinkTo = function(n, t) {
    jQuery.getJSON(_config.systemurl + "&op=dzzcp&do=applinkto&appid=" + n + "&pfid=" + t, function(n) {
        n.error ? showmessage(n.error, "error", 3e3, 1, "right-bottom") : _ico.createIco(n)
    })
}
,
_start.appUninstall = function(n) {
    jQuery.getJSON(_config.systemurl + "&op=dzzcp&do=appuninstall&appid=" + n, function(t) {
        t.error ? showmessage(t.error, "error", 3e3, 1, "right-bottom") : (t.icoid > 0 && _ico.removeIcoid(t.icoid),
        _start.removeIco(n))
    })
}
,
_start.removeIco = function(n) {
    var t = _start.icos[n], r = jQuery.inArray(n, _config.appList), i;
    r > -1 && _config.appList.splice(r, 1),
    jQuery(t.board).remove();
    for (i in t)
        delete t[i];
    delete _start.icos[n]
}
,
_start.Open = function(n) {
    var t = _config.sourcedata.app[n];
    if (t && t.available < 1) {
        Alert(__lang.regret_app + t.appname + __lang.already_close, 0, null, null, "alert");
        return
    }
    OpenApp(n),
    jQuery("#startmenu").hide()
}
,
_start.prototype.create = function() {
    var r, t, n;
    this.board = document.createElement("div"),
    this.board.className = this.className,
    this.board.setAttribute("appid", this.id),
    this.board.id = "startapp_" + this.id;
    var u = "radius"
      , f = '<img  class="' + u + '" src="' + this.data.appico + '"  title="' + this.data.appname + '" style="width:' + this.width + "px; height:" + this.height + 'px">'
      , e = "icoimgContainer_app"
      , i = "";
    i += '<div class="icoimgContainer ' + e + '" style="position:relative;width:' + this.width + "px;height:" + this.height + 'px">',
    i += '<table width="100%" height="100%" cellpadding="0" cellspacing="0"><tr><td align="center" valign="middle">' + f + "</td></tr></table>",
    i += '<div class="icoimgtips" style="position:absolute;left:0px;top:0px;width:' + this.width + "px;height:" + this.height + 'px;z-index:2"></div>',
    i += "</div>",
    r = "<tr ><td valign='middle' align='center'><a class='appname'>" + this.data.appname + "</a></td></tr>",
    this.board.innerHTML = "<table width='" + this.divwidth + "' height='" + this.divheight + "' ><tr height='" + (this.divheight - 24) + "'><td align='center' valign='middle' style=\"overflow:hidden;\" id='html_" + this.id + "'>" + i + "</td></tr>" + r + "</table>",
    t = this,
    this.icoblank = document.createElement("div"),
    this.icoblank.style.position = "absolute",
    this.icoblank.className = "task_icoblank",
    this.icoblank.title = this.data.appname,
    this.icoblank.id = "_blank_" + this.id,
    this.board.appendChild(this.icoblank),
    this.icoblank.style.cssText = "position:absolute;;left:0px;top:0px; background:url('dzz/images/b.gif');width:" + this.divwidth + "px; height:" + this.divheight + "px;z-index:" + (this.zIndex + 1),
    this.board_background = document.createElement("div"),
    this.board_background.className = "backgound_radius",
    this.board.appendChild(this.board_background),
    this.board_background.style.cssText = "position:absolute;left:0px;top:0px;z-index:-1;width:" + (this.divwidth - 2) + "px;height:" + (this.divheight - 2) + "px;",
    n = jQuery(this.icoblank);
    n.on("contextmenu", function(n) {
        return _contextmenu.startmenu(n ? n : window.event, t.id),
        !1
    });
    n.on("mouseenter", function() {
        jQuery(t.board).addClass("hover")
    });
    n.on("mouseleave", function() {
        jQuery(t.board).removeClass("hover")
    });
    n.on("click", function() {
        _start.Open(t.id)
    });
    document.getElementById(this.container).appendChild(this.board),
    _start.icoTips[this.id] > 0 && _ico.setTip(this.id, _start.icoTips[this.id], "app")
}
,
_start.setStartTip = function(n) {
    n > 0 ? jQuery("#taskbar_start .tips").html(n + (isNaN(parseInt(jQuery("#taskbar_start .tips").html())) ? 0 : parseInt(jQuery("#taskbar_start .tips").html()))).show() : jQuery("#taskbar_start .tips").html("").hide()
}
,
_start.setTip = function(n, t) {
    var r = jQuery("#startapp_" + n), i;
    _start.icoTips[n] = t,
    t > 0 ? (i = t < 10 ? 1 : t < 100 ? 2 : t < 1e3 ? 3 : 4,
    r.find(".icobutton_tips").length > 0 ? r.find(".icobutton_tips").html('<span class="icobutton_tips_inner tips_size_' + i + '">' + t + "</span></div>") : el1 = jQuery('<div  class="icobutton_tips"><span class="icobutton_tips_inner tips_size_' + i + '">' + t + "</span></div>").appendTo(r.find(".icoimgtips"))) : r.find(".icobutton_tips").remove()
}
,
_start.DetachEvent = function(n, t) {
    if (!_start.tach)
        return;
    document.onmousemove = _start.onmousemove,
    document.onmouseup = _start.onmouseup,
    document.onselectstart = _start.onselectstart;
    try {
        document.getElementById(t) && document.getElementById(t).releaseCapture && document.getElementById(t).releaseCapture()
    } catch (n) {}
    _start.tach = 0,
    jQuery("#_blank").hide()
}
,
_start.AttachEvent = function(n, t) {
    if (_start.tach)
        return;
    _start.onmousemove = document.onmousemove,
    _start.onmouseup = document.onmouseup,
    _start.onselectstart = document.onselectstart;
    try {
        document.onselectstart = function() {
            return !1
        }
        ,
        n.preventDefault ? n.preventDefault() : (document.getElementById(t) && document.getElementById(t).setCapture && document.getElementById(t).setCapture(),
        window.event.returnValue = !1)
    } catch (n) {}
    _start.tach = 1
}
,
_start.mouseup = function(n) {
    n = n ? n : window.event,
    _start.tach && _start.DetachEvent(n, "taskbar"),
    _start.mousedowndoing && _start.Moved(n)
}
,
_start.mousedown = function(n) {
    n = n ? n : window.event;
    if (n.button == 2)
        return;
    var i = n.clientX
      , t = n.clientY;
    _start.xx = i,
    _start.yy = t,
    _start.mousedowndoing = !1,
    _start.tach || _start.AttachEvent(n, "taskbar"),
    document.onmousemove = function(n) {
        _start.Move(n ? n : window.event)
    }
}
,
_start.PreMove = function() {
    jQuery("#_blank").empty().show(),
    _start.mousedowndoing = !0;
    var n = jQuery("#taskbar");
    jQuery('<div id="_shadow_taskbar" class="taskbar_' + _config.space.taskbar + '" style="position:absolute;border:2px dotted #CCC"></div>').appendTo("#_blank"),
    document.onmouseup = function(n) {
        _start.Moved(n ? n : window.event)
    }
}
,
_start.Move = function(n) {
    var i, t, r, u, f;
    n = n ? n : window.event,
    i = n.clientX,
    t = n.clientY,
    !_start.mousedowndoing && (Math.abs(_start.xx - i) > 5 || Math.abs(_start.yy - t) > 5) && _start.PreMove(),
    r = _config.screenWidth,
    u = _config.screenHeight,
    i < 0 && (i = 0),
    t < 0 && (t = 0),
    i > _config.screenWidth && (i = _config.screenWidth),
    t > _config.screenHeight && (t = _config.screenHeight),
    f = document.getElementById("_shadow_taskbar");
    try {
        i < t * (r / u) && t < u / r * (r - i) ? f.className = "taskbar-left" : i > t * (r / u) && t < u / r * (r - i) ? f.className = "taskbar-top" : i > t * (r / u) && t > u / r * (r - i) ? f.className = "taskbar-right" : i < t * (r / u) && t > u / r * (r - i) && (f.className = "taskbar-bottom")
    } catch (n) {}
}
,
_start.Moved = function(n) {
    var f;
    n = n ? n : window.event,
    jQuery("#_blank").hide(),
    _start.tach && _start.DetachEvent(n, "taskbar"),
    _start.mousedowndoing = !1;
    var r = n.clientX
      , i = n.clientY
      , t = _config.screenWidth
      , u = _config.screenHeight;
    r < 0 && (r = 0),
    i < 0 && (i = 0),
    r > _config.screenWidth && (r = _config.screenWidth),
    i > _config.screenHeight && (i = _config.screenHeight),
    r < i * (t / u) && i < u / t * (t - r) ? f = "left" : r > i * (t / u) && i < u / t * (t - r) ? f = "top" : r > i * (t / u) && i > u / t * (t - r) ? f = "right" : r < i * (t / u) && i > u / t * (t - r) && (f = "bottom"),
    _layout.setTaskbarPosition(f)
}
,
_start.sortApplist = function() {
    var n = [];
    jQuery("#startmenu_app .startapp").each(function() {
        var t = parseInt(jQuery(this).attr("appid"));
        t > 0 && n.push(t)
    }),
    _config.appList = n,
    _config.saveItem.appList = 1,
    _config.saveTimer && window.clearTimeout(_config.saveTimer),
    _config.saveTimer = setTimeout(function() {
        _config.sendConfig()
    }, _config.savetime)
}
,
_dock.icos = {},
_dock.className = "task_Icoblock",
_dock.divwidth = 42,
_dock.divheight = 42,
_dock.width = 32,
_dock.height = 32,
_dock.padding = 10,
_dock.jumps = [],
_dock.getdata = function(n, t) {
    var i = {
        sys_theme: {
            img: "dzz/images/taskicon/thame.png",
            type: "",
            text: __lang.WinTitle.theme
        },
        sys_hotkey: {
            img: "dzz/images/taskicon/hotkey.png",
            type: "",
            text: __lang.WinTitle.hotkey
        },
        profile: {
            img: "dzz/images/taskicon/profile.png",
            type: "",
            text: __lang.WinTitle.profile
        },
        sys_pic: {
            img: "dzz/images/taskicon/image.png",
            type: "image",
            text: __lang.WinTitle.pic
        },
        sys_market: {
            img: "dzz/images/taskicon/appmarket.png",
            type: "app",
            text: __lang.WinTitle.market
        },
        feed: {
            img: "dzz/images/taskicon/feed.png",
            type: "app",
            text: __lang.WinTitle.message_center
        }
    }, t, r;
    if (i[n])
        return i[n];
    i[n] = {};
    try {
        if (t)
            return t.text = t.name,
            t;
        if (_config.sourcedata.icos[n])
            return t = _config.sourcedata.icos[n],
            t.text = t.name,
            t.img = t.img,
            t.type = t.type || "",
            t
    } catch (u) {}
    return n.indexOf("uid_") === 0 ? (r = n.replace("uid_", ""),
    i[n].text = _config.sourcedata.user[r].username,
    i[n].img = _config.ucenterurl + "/avatar.php?uid=" + r + "&size=small",
    i[n].type = "user") : (i[n].text = t.name,
    i[n].img = t.img,
    i[n].error = "dzz/images/taskicon/unknown.png",
    i[n].type = t.type || ""),
    i[n]
}
,
_dock.init = function() {
    for (var u = _config.dockList, n, t, r, f, i = 0; i < u.length; i++)
        n = _config.sourcedata.icos[u[i]],
        t = n.type == "app" ? "app_" + n.oid : n.icoid,
        r = _config.dockTaskList.push(t) - 1,
        f = _dock.Ctask(t, null, n, 1, r);
    _dock.setDockSize(),
    jQuery("#taskbar").addTouch()
}
,
_dock.Ctask = function(n, t, i, r, u) {
    var e, f;
    if (t)
        if (_window.windows[t] && _window.windows[t].titleButton == "")
            return;
    return _dock.icos[n] ? (r = _dock.icos[n].pined,
    u = _dock.icos[n].pos,
    i && (_dock.icos[n].data = i),
    e = _dock.icos[n].icoid ? _dock.icos[n].icoid : null,
    t || (t = _dock.icos[n].winid),
    f = new _dock(n,t,i,r,u),
    e && (f.icoid = e),
    jQuery("#task_" + n).remove()) : (jQuery.isNumeric(u) || (u = _config.dockTaskList.push(n) - 1),
    f = new _dock(n,t,i,r,u)),
    f.create(),
    f
}
,
_dock.prototype.create = function() {
    var t, s, r, e, i, o, n, u, f;
    this.board = document.createElement("div"),
    this.board.className = this.className,
    this.board.setAttribute("icoid", this.id),
    this.pined > 0 && this.board.setAttribute("pined", 1),
    this.board.id = "task_" + this.id,
    this.board.style.position = "absolute",
    t = "",
    s = this.type == "shortcut" ? this.data.ttype : this.type;
    switch (s) {
    case "user":
        document.getElementById("usercss_loaded").className = "userclass" + this.width + "_" + this.height,
        parseInt(jQuery("#usercss_loaded").css("width")) > 1 ? (t = "userclass" + this.width + "_" + this.height,
        r = '<img class="' + t + '" src="' + this.img + '"  title="' + this.text + '" onerror="_ico.icoimgError(this,' + this.width + "," + this.height + ')">') : r = '<img  class="userclass radius" src="' + this.img + '" style="display:none;" title="' + this.text + '" onload="_ico.image_resize(this,' + this.width + "," + this.height + ');" onerror="_ico.icoimgError(this,' + this.width + "," + this.height + ')" error="' + this.error + '">';
        break;
    case "image":
        t = "imageclass",
        r = '<img  class="' + t + '" src="' + this.img + '" style="display:none;" title="' + this.text + '" onload="_ico.image_resize(this,' + this.width + "," + this.height + ');" onerror="_ico.icoimgError(this,' + this.width + "," + this.height + ')" error="' + this.error + '">';
        break;
    case "app":
        t = "radius",
        r = '<img  class="' + t + '" src="' + this.img + '" style="display:none;" title="' + this.text + '" onload="_ico.image_resize(this,' + this.width + "," + this.height + ');" onerror="_ico.icoimgError(this,' + this.width + "," + this.height + ')" error="' + this.error + '">';
        break;
    case "video":
        document.getElementById("videocss_loaded").className = "videoclass" + this.width + "_" + this.height,
        parseInt(jQuery("#videocss_loaded").css("width")) > 1 ? (t = "videoclass" + this.width + "_" + this.height,
        r = '<img class="' + t + '" src="' + this.img + '"  title="' + this.text + '" onerror="_ico.icoimgError(this,' + this.width + "," + this.height + ')" error="' + this.error + '">') : r = '<img  class="videoclass radius" src="' + this.img + '" style="display:none;" title="' + this.text + '" onload="_ico.image_resize(this,' + this.width + "," + this.height + ');" onerror="_ico.icoimgError(this,' + this.width + "," + this.height + ')" error="' + this.error + '">';
        break;
    default:
        t = "radius",
        r = '<img  class="' + t + '" src="' + this.img + '" style="display:none;" title="' + this.text + '" onload="_ico.image_resize(this,' + this.width + "," + this.height + ');" onerror="_ico.icoimgError(this,' + this.width + "," + this.height + ')" error="' + this.error + '">'
    }
    e = "icoimgContainer_" + this.type,
    i = "",
    i += '<div class="icoimgContainer ' + e + '" style="position:relative;width:' + this.width + "px;height:" + this.height + 'px">',
    i += '<table width="100%" height="100%" cellpadding="0" cellspacing="0"><tr><td align="center" valign="middle">' + r + "</td></tr></table>",
    i += '<div class="icoimgCover_up" style="position:absolute;left:0px;top:0px;width:' + this.width + "px;height:" + this.height + 'px;z-index:1"></div>',
    i += '<div class="icoimgtips" style="position:absolute;left:0px;top:0px;width:' + this.width + "px;height:" + this.height + 'px;z-index:2"></div>',
    i += '<div class="icoimgCover_down" style="position:absolute;left:0px;top:0px;width:' + this.width + "px;height:" + this.height + 'px;z-index:-1"></div>',
    i += "</div>",
    o = "",
    this.board.innerHTML = "<table width='" + this.divwidth + "' height='" + this.divheight + "' style=\"table-layout:fixed;\" ><tr><td align='center' valign='middle' style=\"overflow:hidden;\" id='html_" + this.id + "'>" + i + "</td>" + o + "</tr></table>",
    n = this,
    this.icoblank = document.createElement("div"),
    this.icoblank.style.position = "absolute",
    this.icoblank.className = "task_Icoblank",
    this.icoblank.title = this.text,
    this.board.appendChild(this.icoblank),
    this.icoblank.style.cssText = "position:absolute;;left:0px;top:0px; background:url('dzz/images/b.gif');width:" + this.divwidth + "px; height:" + this.divheight + "px;z-index:" + (this.zIndex + 1),
    this.board_background = document.createElement("div"),
    this.board_background.className = "backgound_radius",
    this.board.appendChild(this.board_background),
    this.board_background.style.cssText = "position:absolute;left:2px;top:2px;z-index:-5;width:" + (this.divwidth - 6) + "px;height:" + (this.divheight - 6) + "px;",
    u = jQuery(this.icoblank);
    u.on("mouseenter", function() {
        jQuery(n.board).addClass("hover")
    });
    u.on("mouseleave", function() {
        jQuery(n.board).removeClass("hover")
    });
    u.on("click", function() {
        n.winid ? jQuery("#" + n.winid + ":visible").hasClass("window_current") ? _dock.Min(n.id) : _window.windows[n.winid].Focus() : n.icoid ? _ico.Open(n.icoid) : OpenApp(n.id.replace("app_", ""))
    });
    if (this.winid) {
        jQuery(this.board).off();
        u.on("contextmenu", function(t) {
            return _contextmenu.task_right_Ico(t ? t : window.event, n.id),
            !1
        })
    } else {
        this.icoid > 0 && _Drag.init(this.icoid, this.board, "", "taskbar_dock");
        u.on("contextmenu", function(t) {
            return _contextmenu.right_ico(t ? t : window.event, n.icoid ? n.icoid : n.id, "", n.container),
            !1
        })
    }
    document.getElementById("taskbar_dock_inner").appendChild(this.board),
    f = this.getpos(),
    this.left = f[0],
    this.top = f[1],
    this.board.style.left = this.left + "px",
    this.board.style.top = this.top + "px",
    this.board.style.width = this.divwidth + "px",
    this.board.style.height = this.divheight + "px",
    this.board.style.zIndex = this.zIndex,
    this.board.style.position = "absolute",
    _dock.setDockSize(),
    this.winid && _dock.setCurrent(this.id)
}
,
_dock.prototype.getpos = function() {
    var n = [];
    return _layout.taskbar_direction < 2 ? (n[0] = this.pos * (this.divwidth + _dock.padding),
    n[1] = 0) : (n[1] = this.pos * (this.divheight + _dock.padding),
    n[0] = 0),
    n
}
,
_dock.getIndex = function(n) {
    for (var r = 0, i, t = 0; t < _config.dockTaskList.length; t++) {
        i = _dock.icos[_config.dockTaskList[t]],
        i.pined && (r = i.icoid);
        if (_config.dockTaskList[t] == n)
            break
    }
    if (r < 1)
        for (t = 0; t < _config.dockTaskList.length; t++) {
            i = _dock.icos[_config.dockTaskList[t]];
            if (i.pined) {
                r = i.icoid;
                break
            }
        }
    return r
}
,
_dock.setDockList = function() {
    var n = []
}
,
_dock.Change = function(n, t, i, r, u) {
    var f = _dock.icos[n];
    if (!f)
        return;
    f.img = t,
    f.text = i,
    jQuery(f.icoblank).attr("title", i),
    jQuery(f.board).find("img").replaceWith('<img  class="image" src="' + t + '" style="display:none;" title="' + f.text + '" onload="_ico.image_resize(this,' + f.width + "," + f.height + ');" onerror="_ico.icoimgError(this,' + f.width + "," + f.height + ')" error="' + r + '">'),
    f.data.type == "shortcut" && (u ? jQuery(f.board).find(".icoimgContainer").addClass("icoimgContainer_shortcut") : jQuery(f.board).find(".icoimgContainer").removeClass("icoimgContainer_shortcut"))
}
,
_dock.cancelCurrent = function(n) {
    jQuery("#task_" + n).removeClass("task-current")
}
,
_dock.setCurrent = function(n) {
    var u, t, i, e, r, f;
    jQuery("#taskbar_dock ." + _dock.className).removeClass("task-current"),
    u = jQuery("#task_" + n),
    u.addClass("task-current"),
    t = _dock.icos[n];
    if (!t)
        return;
    i = jQuery("#taskbar_dock_inner"),
    e = jQuery("#taskbar_dock").offset(),
    jQuery("#taskbar").hasClass("taskbar-bottom") || jQuery("#taskbar").hasClass("taskbar-top") ? (r = parseInt(jQuery("#taskbar_dock_inner").css("left")),
    r + t.left < 0 ? i.animate({
        left: r + t.left
    }, 500, function() {
        _dock.setDockScroller()
    }) : r + t.left > jQuery("#taskbar_dock").width() && i.animate({
        left: jQuery("#taskbar_dock").width() - t.left - u.width()
    }, 500, function() {
        _dock.setDockScroller()
    })) : (f = parseInt(jQuery("#taskbar_dock_inner").css("top")),
    f + t.top < 0 ? i.animate({
        top: -t.top + "px"
    }, 500, function() {
        _dock.setDockScroller()
    }) : f + t.top > jQuery("#taskbar_dock").height() && i.animate({
        top: jQuery("#taskbar_dock").height() - t.top - u.height()
    }, 500, function() {
        _dock.setDockScroller()
    }))
}
,
_dock.refreshlist = function() {
    for (var t = _config.dockTaskList, n = 0; n < t.length; n++) {
        if (!_dock.icos[t[n]])
            continue;
        _dock.icos[t[n]].pos = n,
        _layout.taskbar_direction > 1 ? (_dock.icos[t[n]].top = n * (_dock.divheight + _dock.padding),
        _dock.icos[t[n]].left = 0,
        jQuery("#task_" + t[n]).css("top", n * (_dock.divheight + _dock.padding)).css("left", 0)) : (_dock.icos[t[n]].left = n * (_dock.divwidth + _dock.padding),
        _dock.icos[t[n]].top = 0,
        jQuery("#task_" + t[n]).css("left", n * (_dock.divwidth + _dock.padding)).css("top", 0)),
        _dock.setDockSize()
    }
}
,
_dock.Dtask = function(n) {
    var t, r, f, u, i;
    if (_dock.icos[n] && _dock.icos[n].pined > 0) {
        t = _dock.icos[n],
        t.winid = null,
        r = jQuery(t.icoblank);
        r.on("click", function() {
            t.winid ? jQuery("#" + t.winid + ":visible").hasClass("window_current") ? _window.windows[t.winid].Min() : _window.windows[t.winid].Focus() : t.icoid ? _ico.Open(t.icoid) : OpenApp(t.id.replace("app_", ""))
        });
        t.icoid && _Drag.init(t.icoid, t.board, "", "taskbar_dock");
        if (t.winid)
            r.on("contextmenu", function(n) {
                return _contextmenu.task_right_Ico(n ? n : window.event, t.id),
                !1
            });
        else
            r.on("contextmenu", function(n) {
                return _contextmenu.right_ico(n ? n : window.event, t.icoid ? t.icoid : t.id, "", t.container),
                !1
            });
        _dock.Change(n, t.data.img, t.data.name, t.error, !0)
    } else {
        jQuery(_dock.icos[n].board).remove();
        for (f in _dock.icos[n])
            delete _dock.icos[n][f];
        for (delete _dock.icos[n],
        u = [],
        i = 0; i < _config.dockTaskList.length; i++)
            _config.dockTaskList[i] + "" != n + "" && u.push(_config.dockTaskList[i]);
        _config.dockTaskList = u,
        _dock.refreshlist()
    }
    _dock.cancelCurrent(n)
}
,
_dock.reCtask = function(n, t, i, r, u) {
    var e, f;
    jQuery(_dock.icos[n].board).remove();
    for (e in _dock.icos[n])
        delete _dock.icos[n][e];
    delete _dock.icos[n],
    f = new _dock(t,i,r),
    f.pos = u,
    f.create()
}
,
_dock.resetTask = function(n, t) {
    for (var e = [], r = _dock.icos[n], u = _config.dockTaskList.length - 1, f = {
        winid: r.winid,
        data: r.data
    }, i = 0; i < _config.dockTaskList.length; i++)
        if (_config.dockTaskList[i] == n) {
            _config.dockTaskList[i] = t,
            u = i;
            break
        }
    _dock.reCtask(n, t, f.winid, "", u)
}
,
_dock.prototype.jump = function(n) {
    var i = this, t;
    if (n) {
        if (jQuery.inArray(this.id, _dock.jumps) > -1)
            return;
        this.jumpTimer && window.clearInterval(this.jumpTimer),
        _dock.jumps.push(this.id),
        t = _dock.check_dock_up_ico_jump(),
        this.jumpTimer = window.setInterval(function() {
            t && jQuery("#dock_dock_up_ico").toggleClass("hover"),
            jQuery(i.board).toggleClass("hover")
        }, 300)
    } else
        _dock.jumps.splice(jQuery.inArray(this.id, _dock.jumps), 1),
        t = _dock.check_dock_up_ico_jump(),
        window.clearInterval(this.jumpTimer),
        jQuery(i.board).removeClass("hover"),
        t && jQuery("#dock_dock_up_ico").removeClass("hover")
}
,
_dock.Focus = function(n) {
    jQuery("#shadow").hide();
    var t = _dock.icos[n];
    _window.windows[t.winid].MAX ? jQuery("#titleBar_" + t.winid).find(".RESTORE").trigger("click") : _window.windows[t.winid].Focus()
}
,
_dock.Max = function(n) {
    jQuery("#shadow").hide();
    var t = _dock.icos[n];
    _window.windows[t.winid].MAX != 1 ? jQuery("#titleBar_" + t.winid).find(".MAX").trigger("click") : _window.windows[t.winid].Focus()
}
,
_dock.Min = function(n) {
    jQuery("#shadow").hide();
    var t = _dock.icos[n];
    jQuery("#titleBar_" + t.winid).find(".MIN").trigger("click")
}
,
_dock.Close = function(n) {
    jQuery("#shadow").hide();
    var t = _dock.icos[n];
    _dock.Change(n, t.data.img, t.data.name),
    jQuery("#titleBar_" + t.winid).find(".CLOSE").trigger("click")
}
,
_dock.setDockSize = function() {
    var t, r, n, i;
    jQuery("#taskbar").hasClass("taskbar-bottom") || jQuery("#taskbar").hasClass("taskbar-top") ? (t = {},
    r = 0,
    t.start = _config.dockWidth,
    r += jQuery("#taskbar_spacer_start").outerWidth(!0),
    jQuery("#taskbar_start").css("width", t.start),
    t.tray = jQuery("#taskbar_tray").outerWidth(),
    jQuery("#taskbar_tray").css("width", t.tray).css("height", "auto"),
    r += jQuery("#taskbar_spacer_tray").outerWidth(!0),
    jQuery("#taskbar_spacer_tray").show(),
    t.dock = _config.screenWidth - t.start - t.tray - r,
    jQuery("#taskbar_dock").css("width", t.dock).css("height", _config.dockHeight),
    jQuery("#taskbar_dock_inner").css("width", (_dock.divwidth + _dock.padding) * _config.dockTaskList.length - _dock.padding).css("height", _config.dockHeight)) : (n = {},
    i = 0,
    n.start = _config.dockHeight,
    i += jQuery("#taskbar_spacer_start").outerHeight(!0),
    jQuery("#taskbar_start").css("height", n.start),
    n.tray = jQuery("#taskbar_tray ").outerHeight(),
    jQuery("#taskbar_tray").css("height", n.tray).css("width", "auto"),
    i += jQuery("#taskbar_spacer_tray").outerHeight(!0),
    jQuery("#taskbar_spacer_tray").show(),
    n.dock = _config.screenHeight - n.start - n.tray - i,
    jQuery("#taskbar_dock").css("height", n.dock).css("width", _config.dockWidth),
    jQuery("#taskbar_dock_inner").css("height", (_dock.divheight + _dock.padding) * _config.dockTaskList.length - _dock.padding).css("width", _config.dockHeight)),
    _dock.setDockScroller()
}
,
_dock.setDockScroller = function() {
    var n;
    jQuery("#taskbar").hasClass("taskbar-bottom") || jQuery("#taskbar").hasClass("taskbar-top") ? (jQuery("#taskbar_dock_inner").width() < jQuery("#taskbar_dock").width() ? jQuery("#taskbar_dock_inner").css({
        left: 0,
        top: 0
    }) : jQuery("#taskbar_dock_inner").width() + parseInt(jQuery("#taskbar_dock_inner").css("left")) < jQuery("#taskbar_dock").width() && jQuery("#taskbar_dock_inner").css({
        left: jQuery("#taskbar_dock").width() - jQuery("#taskbar_dock_inner").width(),
        top: 0
    }),
    parseInt(jQuery("#taskbar_dock_inner").css("left")) < 0 ? jQuery("#taskbar_spacer_start").addClass("taskbar-spacer-left").off().mousedown(function() {
        return jQuery("#taskbar_dock_inner").animate({
            left: "0px"
        }, Math.abs(parseInt(jQuery("#taskbar_dock_inner").css("left")))),
        !1
    }).mouseup(function() {
        return jQuery("#taskbar_dock_inner").stop(),
        _dock.setDockScroller(),
        !1
    }) : jQuery("#taskbar_spacer_start").removeClass("taskbar-spacer-left").off(),
    jQuery("#taskbar_dock_inner").width() + parseInt(jQuery("#taskbar_dock_inner").css("left")) > jQuery("#taskbar_dock").width() ? (n = jQuery("#taskbar_dock_inner").width() - jQuery("#taskbar_dock").width(),
    jQuery("#taskbar_spacer_tray").addClass("taskbar-spacer-right").off().mousedown(function() {
        return jQuery("#taskbar_dock_inner").animate({
            left: "-" + n + "px"
        }, n),
        !1
    }).mouseup(function() {
        return jQuery("#taskbar_dock_inner").stop(),
        _dock.setDockScroller(),
        !1
    })) : jQuery("#taskbar_spacer_tray").removeClass("taskbar-spacer-right").off()) : (jQuery("#taskbar_dock_inner").height() < jQuery("#taskbar_dock").height() ? jQuery("#taskbar_dock_inner").css({
        top: "0px",
        left: "0px"
    }) : jQuery("#taskbar_dock_inner").height() + parseInt(jQuery("#taskbar_dock_inner").css("top")) < jQuery("#taskbar_dock").height() && jQuery("#taskbar_dock_inner").css({
        top: jQuery("#taskbar_dock").height() - jQuery("#taskbar_dock_inner").height(),
        left: 0
    }),
    parseInt(jQuery("#taskbar_dock_inner").css("top")) < 0 ? (n = jQuery("#taskbar_dock_inner").height() - jQuery("#taskbar_dock").height(),
    jQuery("#taskbar_spacer_start").addClass("taskbar-spacer-left").off().mousedown(function() {
        return jQuery("#taskbar_dock_inner").animate({
            top: "0px"
        }, Math.abs(parseInt(jQuery("#taskbar_dock_inner").css("top")))),
        !1
    }).mouseup(function() {
        return jQuery("#taskbar_dock_inner").stop(),
        _dock.setDockScroller(),
        !1
    })) : jQuery("#taskbar_spacer_start").removeClass("taskbar-spacer-left").off(),
    jQuery("#taskbar_dock_inner").height() + parseInt(jQuery("#taskbar_dock_inner").css("top")) > jQuery("#taskbar_dock").height() ? (n = jQuery("#taskbar_dock_inner").height() - jQuery("#taskbar_dock").height(),
    jQuery("#taskbar_spacer_tray").addClass("taskbar-spacer-right").off().mousedown(function() {
        return jQuery("#taskbar_dock_inner").animate({
            top: "-" + n + "px"
        }, n),
        !1
    }).mouseup(function() {
        return jQuery("#taskbar_dock_inner").stop(),
        _dock.setDockScroller(),
        !1
    })) : jQuery("#taskbar_spacer_tray").removeClass("taskbar-spacer-right").off())
}
,
_login = {},
_login.OpenWindows = function() {
    for (var o = _config.opens, i = o.split(":"), e, f, s, t, r, u, n = 0; n < i.length; n++)
        if (i[n].indexOf("icoid_") !== -1)
            e = i[n].replace("icoid_", ""),
            _ico.Open(e);
        else if (i[n].indexOf("appid_") !== -1)
            f = i[n].replace("appid_", ""),
            OpenApp(f);
        else
            switch (i[n]) {
            case "login":
                _login.logging();
                break;
            case "register":
                _login.register();
                break;
            case "profile":
                _login.configWindow("profile");
                break;
            case "avatar":
                _login.configWindow("avatar");
                break;
            case "password":
                _login.configWindow("password");
                break;
            case "thame":
                _login.click("sys_thame");
                break;
            case "market":
                _login.click("sys_market");
                break;
            case "filemanage":
                OpenFileManage();
                break;
            case "cloud":
                OpenFileManage()
            }
    s = _config.appList;
    for (n in _config.sourcedata.app)
        t = _config.sourcedata.app[n],
        t.feature && _window.getFeature(t.feature, "autorun") == "yes" && (r = OpenApp(t.appid),
        u = parseInt(_window.getFeature(t.feature, "closetime")),
        u > 0 && (function() {
            var i = r.id
              , n = parseInt(_window.getFeature(t.feature, "closetime"));
            window.setTimeout(function() {
                eval("_window.windows." + i + ".Close();")
            }, n * 1e3)
        }
        )())
}
,
_login.configWindow = function(n) {
    var t = "";
    switch (n) {
    case "profile":
        t = "user.php?mod=profile";
        break;
    case "avatar":
        t = "user.php?mod=avatar";
        break;
    case "password":
        t = "user.php?mod=password"
    }
    OpenWindow("profile", t, __lang.WinTitle.userprofile)
}
,
_login.click = function(n) {
    jQuery("#shadow").hide();
    switch (n) {
    case "index":
        _config.setHomepage(location.href);
        break;
    case "fav":
        _config.addFavorite(location.href, document.title);
        break;
    case "sys_market":
        OpenWindow("sys_market", _config.marketurl);
        break;
    case "sys_theme":
        OpenWindow("sys_theme", _config.systhameurl);
        break;
    case "logout":
        confirm(__lang.js_exit) && jQuery.get(_config.logouturl + "&formhash=" + _config.formhash + "&t=" + +new Date, function() {
            window.onbeforeunload = null,
            window.location.reload()
        })
    }
    return !1
}
,
_login.logging = function(n) {
    n || (n = "user.php?mod=logging&action=login&inajax=1"),
    jQuery("#popModal").modal("show"),
    jQuery("#popModal .modal-content").load(n, function() {
        window.setTimeout(function() {
            jQuery("#popModal input[type=text]").first().focus(),
            jQuery("#popModal .modal-backdrop").css("height", jQuery("#popModal").get(0).scrollHeight)
        }, 500)
    })
}
,
_login.register = function(n) {
    jQuery("#popModal").modal("show"),
    n || (n = "user.php?mod=register&inajax=1&handlekey=register"),
    jQuery("#popModal .modal-content").load(n, function() {
        window.setTimeout(function() {
            jQuery("#popModal input[type=text]").first().focus(),
            jQuery("#popModal .modal-backdrop").css("height", jQuery("#popModal").get(0).scrollHeight)
        }, 500)
    })
}
,
_config.topbackground = 0,
_login.showBackground = function() {
    _config.topbackground = !_config.topbackground,
    _config.topbackground ? (jQuery("#wrapper_div").css("z-index", 100001),
    jQuery("#hidebackground_button").show()) : (jQuery("#wrapper_div").css("z-index", 0),
    jQuery("#hidebackground_button").hide())
}
,
_login.showHotkey = function() {
    var n = "dzz/hotkey/hotkey.htm";
    _window.windows._W_sys_hotkey ? _window.windows._W_sys_hotkey.Close() : OpenWindow("sys_hotkey", n, __lang.WinTitle.hotkey)
}
,
_hotkey = {},
_hotkey.ctrl = 0,
_hotkey.alt = 0,
_hotkey.shift = 0,
_hotkey.init = function() {
    _hotkey.ctrl = 0,
    _hotkey.alt = 0,
    _hotkey.shift = 0
}
;
jQuery(document).on("keydown", function(n) {
    var i, t;
    n = n ? n : window.event,
    i = n.srcElement ? n.srcElement : n.target;
    if (/input|textarea/i.test(i.tagName))
        return !0;
    n.which != "" ? t = n.which : n.charCode != "" ? t = n.charCode : n.keyCode != "" && (t = n.keyCode);
    switch (t) {
    case 17:
        _hotkey.ctrl = 1;
        break;
    case 18:
        _hotkey.alt = 1;
        break;
    case 16:
        _hotkey.shift = 1
    }
});
jQuery(document).on("keyup", function(n) {
    var i, t;
    n = n ? n : window.event,
    i = n.srcElement ? n.srcElement : n.target;
    if (/input|textarea/i.test(i.tagName))
        return !0;
    n.which != "" ? t = n.which : n.charCode != "" ? t = n.charCode : n.keyCode != "" && (t = n.keyCode);
    switch (t) {
    case 17:
        _hotkey.ctrl = 0;
        break;
    case 18:
        _hotkey.alt = 0;
        break;
    case 16:
        _hotkey.shift = 0;
        break;
    case 67:
        _hotkey.alt && _window.currentWindow("Close");
        break;
    case 77:
        _hotkey.alt && _window.currentWindow("Max"),
        _hotkey.alt = 0;
        break;
    case 78:
        _hotkey.alt && _window.currentWindow("Min"),
        _hotkey.alt = 0;
        break;
    case 81:
        _hotkey.alt && _hotkey.shift && _window.CloseAppwinAll(),
        _hotkey.alt = 0,
        _hotkey.shift = 0;
        break;
    case 75:
        _hotkey.alt && _login.showHotkey();
        break;
    case 83:
        _hotkey.alt && jQuery("#taskbar_start").trigger("mousedown");
        break;
    case 37:
        _hotkey.ctrl && _hotkey.alt && _layout.setPagePrev();
        break;
    case 39:
        _hotkey.ctrl && _hotkey.alt && _layout.setPageNext();
        break;
    case 68:
        _hotkey.alt && _hotkey.ctrl && _window.showDesktop();
        break;
    case 145:
        _hotkey.alt && _hotkey.ctrl && _login.showBackground();
        break;
    case 46:
    case 110:
        _config.selectall.icos.length > 0 && (_hotkey.shift ? _ajax.delIco(_config.selectall.icos[0]) : _ajax.delIco(_config.selectall.icos[0]));
        break;
    case 69:
        _hotkey.alt && _hotkey.ctrl && _login.click("logout")
    }
});
_Drag.delay = 500,
_Drag.width = 120,
_Drag.height = 120,
_Drag.icos = {},
_Drag.Version = "dzz.cc js 1.0",
_Drag.onmousemove = null,
_Drag.onmouseup = null,
_Drag.tach = null,
_Drag.onselectstart = 1,
_Drag.init = function(n, t, i, r, u) {
    u || (u = "");
    var f = new _Drag(n,r,u);
    f.board = t,
    f.width = jQuery(t).outerWidth(!0),
    f.height = jQuery(t).outerHeight(!0);
    jQuery(f.board).on("mousedown.drag", function(n) {
        n = n ? n : window.event;
        var t = n.srcElement ? n.srcElement : n.target;
        return /input|textarea/i.test(t.tagName) ? !0 : (f.Mousedown(n ? n : window.event),
        dfire("mousedown"),
        !1)
    });
    jQuery(f.board).on("mouseup.drag", function(n) {
        n = n ? n : window.event;
        var t = n.srcElement ? n.srcElement : n.target;
        return /input|textarea/i.test(t.tagName) ? !0 : (f.Mouseup(n ? n : window.event),
        dfire("mouseup"),
        !1)
    });
    return f
}
,
_Drag.prototype.DetachEvent = function(n) {
    n = n ? n : window.event;
    if (!this.tach)
        return;
    document.onmousemove = _Drag.onmousemove,
    document.onmouseup = _Drag.onmouseup,
    document.onselectstart = _Drag.onselectstart;
    try {
        this.board.releaseCapture && this.board.releaseCapture()
    } catch (n) {}
    this.tach = 0
}
,
_Drag.prototype.AttachEvent = function(n) {
    n = n ? n : window.event;
    if (this.tach)
        return;
    _Drag.onmousemove = document.onmousemove,
    _Drag.onmouseup = document.onmouseup,
    _Drag.onselectstart = document.onselectstart;
    try {
        document.onselectstart = function() {
            return !1
        }
        ,
        n && n.preventDefault ? n.preventDefault() : (this.board.setCapture && this.board.setCapture(),
        window.event.returnValue = !1)
    } catch (n) {}
    this.tach = 1
}
,
_Drag.prototype.Duplicate = function() {
    var r, i, u, t, n;
    this.copy = document.createElement("div"),
    this.copy.className = "DragCopy",
    document.body.appendChild(this.copy),
    this.container == "icosContainer_dim" && (this.copy.className = jQuery("#DIM_buddyListPanel").attr("class"));
    if (this.icos.length > 1) {
        r = jQuery(this.board).offset(),
        this.copy.style.cssText = "position:absolute;left:" + r.left + "px;top:" + r.top + "px;width:" + this.width + "px;height:" + this.height + "px;z-index:5000; opacity:0.8;overflow:visible;";
        for (i in this.icos)
            u = _Drag.icos[this.icos[i] + "_" + this.container],
            this.copy_data[this.icos[i]] = {},
            t = document.createElement("div"),
            t.className = "icocopy",
            t.setAttribute("icoid", this.icos[i]),
            t.innerHTML = jQuery(u.board).html(),
            n = jQuery(u.board).offset(),
            this.copy_data[this.icos[i]].left = n.left,
            this.copy_data[this.icos[i]].top = n.top,
            t.style.cssText = "position:absolute;left:" + (n.left - r.left) + "px;top:" + (n.top - r.top) + "px;width:" + u.width + "px;height:" + u.height + "px;overflow:hidden",
            this.copy.appendChild(t)
    } else
        n = jQuery(this.board).offset(),
        this.copy.innerHTML = jQuery(this.board).html(),
        this.copy.style.cssText = "position:absolute;left:" + n.left + "px;top:" + n.top + "px;width:" + this.width + "px;height:" + this.height + "px;opacity:0.8;z-index:5000;";
    jQuery(this.copy).find(".backgound_radius,.icoblank").remove()
}
,
_Drag.prototype.Createblank = function() {
    var e, i;
    jQuery("#_blank").empty();
    var t = this
      , u = document.createDocumentFragment()
      , n = document.createElement("div");
    n.id = "_shadow_icosContainer_body_" + _layout.fid,
    n.style.position = "absolute",
    e = jQuery("#icosContainer_body_" + _layout.fid),
    n.style.width = e.width() + "px",
    n.style.height = e.height() + "px",
    n.style.left = parseInt(e.css("left")) + _layout._body_marginleft + "px",
    n.style.top = _layout.margintop + _layout._body_margintop + "px",
    n.style.oveflow = "visible",
    u.appendChild(n),
    jQuery("#page_nav_" + _layout.fid + " .page_nav_item").each(function() {
        var t = jQuery(this).attr("page")
          , i = jQuery(this).offset()
          , n = document.createElement("div");
        n.id = "_shadow_page_nav_item_" + t,
        n.style.cssText = "position:absolute;height:" + jQuery(this).outerHeight(!0) + "px;width:" + jQuery(this).outerWidth(!0) + "px;left:" + i.left + "px;top:" + i.top + "px;",
        jQuery(n).mouseenter(function() {
            _Drag.page_nav_delay_timer && window.clearTimeout(_Drag.page_nav_delay_timer),
            _Drag.page_nav_delay_timer = window.setTimeout(function() {
                _layout.setPage(t)
            }, 500)
        }).mouseleave(function() {
            _Drag.page_nav_delay_timer && window.clearTimeout(_Drag.page_nav_delay_timer)
        }),
        u.appendChild(n)
    });
    var s = jQuery("#taskbar")
      , h = s.offset()
      , f = document.createElement("div");
    f.id = "_shadow_taskbar",
    f.style.cssText = "position:absolute;height:" + s.height() + "px;width:" + s.width() + "px;left:" + h.left + "px;top:" + h.top + "px;z-index:10001;",
    u.appendChild(f);
    var o = jQuery("#taskbar_dock")
      , r = document.createElement("div")
      , c = o.position();
    r.id = "_shadow__dock",
    r.style.cssText = "position:absolute;height:" + o.height() + "px;width:" + o.width() + "px;left:" + c.left + "px;top:" + c.top + "px;overflow:hidden;",
    i = _dock.divwidth / this.divwidth,
    jQuery(r).mouseenter(function() {
        jQuery(t.copy).css({
            "-moz-transform": "scale(" + i + ")",
            "-webkit-transform": "scale(" + i + ")",
            "-o-transform": "scale(" + i + ")",
            transform: "scale(" + i + ")"
        })
    }).mouseleave(function() {
        jQuery(this.copy).css({
            "-moz-transform": "scale(1)",
            "-webkit-transform": "scale(1)",
            "-o-transform": "scale(1)",
            transform: "scale(1)"
        })
    }),
    f.appendChild(r),
    jQuery("#icosContainer_body_" + _layout.fid).find(".Icoblock").each(function() {
        var i = _ico.icos[this.id.replace("icon_", "")]
          , r = document.createElement("div");
        r.id = "_shadow_icon_" + i.id,
        r.style.cssText = "position:absolute;width:" + i.divwidth + "px;height:" + i.divheight + "px;left:" + i.left + "px;top:" + i.top + "px;z-index:" + i.zIndex + ";background: url(dzz/images/b.gif);",
        t.icoid != i.id && (_config.sourcedata.icos[i.id].type == "folder" || _config.sourcedata.icos[i.id].type == "shortcut" && _config.sourcedata.icos[i.id].ttype == "folder") && (_config.sourcedata.icos[i.id].flag == "recycle" ? jQuery(r).css("cursor", "url('dzz/images/cur/aero_shan.cur'),auto") : jQuery(r).css("cursor", "url('dzz/images/cur/aero_ru.cur'),auto"),
        jQuery(r).mouseenter(function() {
            var t = this.id.replace("_shadow_icon_", "");
            jQuery(_ico.icos[t].board).addClass("hover")
        }).mouseleave(function() {
            var t = this.id.replace("_shadow_icon_", "");
            jQuery(_ico.icos[t].board).removeClass("hover")
        })),
        n.appendChild(r)
    }),
    jQuery("#taskbar_dock").find(".task_Icoblock").each(function() {
        var n = _dock.icos[this.id.replace("task_", "")], i = document.createElement("div"), f, u;
        i.id = "_shadow_task_" + n.id,
        _layout.taskbar_direction > 1 ? (f = parseInt(jQuery("#taskbar_dock_inner").css("top")),
        i.style.cssText = "position:absolute;width:" + n.divwidth + "px;height:" + (n.divheight + _dock.padding) + "px;left:" + n.left + "px;top:" + (n.top + f) + "px;z-index:" + n.zIndex + ";background: url(dzz/images/b.gif);") : (u = parseInt(jQuery("#taskbar_dock_inner").css("left")),
        i.style.cssText = "position:absolute;width:" + (n.divwidth + _dock.padding) + "px;height:" + n.divheight + "px;left:" + (n.left + u) + "px;top:" + n.top + "px;z-index:" + n.zIndex + ";background: url(dzz/images/b.gif);"),
        t.icoid != n.icoid && ((n.data.type == "folder" || n.type == "shortcut" && n.ttype == "folder") && jQuery(i).css("cursor", "url('dzz/images/cur/aero_ru.cur'),auto"),
        jQuery(i).mouseenter(function() {
            var t = this.id.replace("_shadow_task_", ""), i;
            (_dock.icos[t].data.type == "folder" || _dock.icos[t].data.type == "shortcut" && _dock.icos[t].data.ttype == "folder") && jQuery(_dock.icos[t].board).addClass("hover");
            if (_layout.taskbar_direction < 2)
                for (i in _dock.icos) {
                    if (_dock.icos[t].data.type == "folder" || _dock.icos[t].data.type == "shortcut" && _dock.icos[t].data.ttype == "folder")
                        return;
                    _dock.icos[i].left >= _dock.icos[t].left && (_dock.icos[i].board.style.left = _dock.icos[i].left + _dock.icos[i].divwidth + _dock.padding + "px")
                }
            else
                for (i in _dock.icos) {
                    if (_dock.icos[t].data.type == "folder" || _dock.icos[t].data.type == "shortcut" && _dock.icos[t].data.ttype == "folder")
                        return;
                    _dock.icos[i].top >= _dock.icos[t].top && (_dock.icos[i].board.style.top = _dock.icos[i].top + _dock.icos[i].divheight + _dock.padding + "px")
                }
        }).mouseleave(function() {
            var i = this.id.replace("_shadow_task_", ""), t;
            (_dock.icos[i].data.type == "folder" || _dock.icos[i].data.type == "shortcut" && _dock.icos[i].data.ttype == "folder") && jQuery(_dock.icos[i].board).removeClass("hover");
            for (t in _dock.icos)
                _dock.icos[t].board.style.left = _dock.icos[t].left + "px",
                _dock.icos[t].board.style.top = _dock.icos[t].top + "px"
        })),
        r.appendChild(i)
    }),
    jQuery(".window_blank").each(function() {
        var l = this.id.replace("_blank_", ""), n = _window.windows[l], i = document.createElement("div"), f, e, c, o, h, r, s;
        i.style.position = "absolute",
        i.style.zIndex = n.zIndex,
        f = jQuery(this).offset(),
        i.style.left = f.left + "px",
        i.style.top = f.top + "px",
        i.style.overflow = "hidden",
        i.style.background = "url(dzz/images/b.gif)",
        i.style.width = jQuery(this).width() + "px",
        i.style.height = jQuery(this).height() + "px",
        u.appendChild(i),
        this.selectall && _config.sourcedata.icos[this.icoid] && jQuery.inArray(_config.sourcedata.icos[this.icoid].ext, n.fileext) > -1 ? (i.id = "_window_" + n.id,
        i.style.cursor = "url('dzz/images/cur/aero_ru.cur'),auto") : n.type == "folder" ? (i.id = "_window_" + n.id,
        n.treeshow && (e = document.createElement("div"),
        e.style.position = "absolute",
        e.style.left = "0px",
        e.style.top = "0px",
        e.style.width = jQuery("#jstree_area_" + n.id).width() + "px",
        e.style.height = "100%",
        e.style.overflow = "hidden",
        e.style.zIndex = n.zIndex + 1,
        e.id = "_shadow_jstree_" + n.id,
        i.appendChild(e),
        jQuery("#jstree_area_" + n.id + " li:visible").each(function() {
            var r = this.id.split("-")
              , t = jQuery(this).find("a:first")
              , i = t.offset()
              , n = document.createElement("div");
            n.id = "_window_icosContainer_folder_" + r[1],
            n.style.cssText = "position:absolute;left:" + (i.left - f.left) + "px;top:" + (i.top - f.top) + "px;width:" + t.width() + "px;height:" + t.height() + 'px;cursor:url("dzz/images/cur/aero_ru.cur"),auto;',
            jQuery(n).bind("mouseover", function() {
                t.addClass("jstree-hovered")
            }),
            jQuery(n).bind("mouseout", function() {
                t.removeClass("jstree-hovered")
            }),
            e.appendChild(n)
        })),
        c = 0,
        n.filemanageid && (o = _filemanage.cons[n.filemanageid],
        h = o.bz ? ["f", o.fid] : n.filemanageid.split("-"),
        r = document.createElement("div"),
        r.style.position = "absolute",
        r.style.left = n.treeshow ? jQuery("#jstree_area_" + n.id).width() + "px" : "0px",
        r.style.top = "0px",
        r.style.width = n.treeshow ? n.bodyWidth - jQuery("#jstree_area_" + n.id).width() + "px" : "100%",
        r.style.height = "100%",
        r.style.overflow = "hidden",
        r.id = "_window_icosContainer_folder_" + h[1],
        i.appendChild(r),
        n.fid != _config.space.typefid.recycle && (c = 1)),
        c && (s = n.treeshow ? jQuery("#jstree_area_" + n.id).width() : 0,
        parseInt(o.view) == 5 ? jQuery(n.contentCase).find(".detail_item_name").each(function() {
            var o = this, h = jQuery(this).attr("icoid"), u = _config.sourcedata.icos[h], i, e;
            u.type == "shortcut" && (u = u.tdata);
            if (u.type != "folder")
                return;
            i = document.createElement("div"),
            i.id = "_window_icosContainer_folder_" + u.oid,
            e = jQuery(this).offset(),
            i.style.cssText = "position:absolute;width:" + jQuery(this).width() + "px;height:" + jQuery(this).height() + "px;left:" + (e.left - f.left - s) + "px;top:" + (e.top - f.top) + "px;z-index:" + n.zIndex + ';background: url(dzz/images/b.gif);cursor:url("dzz/images/cur/aero_ru.cur"),auto',
            jQuery(i).bind("mouseover", function() {
                var i = this.id.replace("_shadow_icon_", "");
                if (t.icoid == i)
                    return;
                jQuery(o).addClass("hover")
            }),
            jQuery(i).bind("mouseout", function() {
                jQuery(o).removeClass("hover")
            }),
            r.appendChild(i)
        }) : parseInt(o.view) == 4 ? jQuery(n.contentCase).find(".detail_item_td_name").each(function() {
            var o = this, h = jQuery(this).attr("icoid"), u = _config.sourcedata.icos[h], i, e;
            u.type == "shortcut" && (u = u.tdata);
            if (u.type != "folder")
                return;
            i = document.createElement("div"),
            i.id = "_window_icosContainer_folder_" + u.oid,
            e = jQuery(this).offset(),
            i.style.cssText = "position:absolute;width:" + jQuery(this).width() + "px;height:" + jQuery(this).height() + "px;left:" + (e.left - f.left - s) + "px;top:" + (e.top - f.top) + "px;z-index:" + n.zIndex + ';background: url(dzz/images/b.gif);cursor:url("dzz/images/cur/aero_ru.cur"),auto',
            jQuery(i).bind("mouseover", function() {
                var i = this.id.replace("_shadow_icon_", "");
                if (t.icoid == i)
                    return;
                jQuery(o).addClass("hover")
            }),
            jQuery(i).bind("mouseout", function() {
                jQuery(o).removeClass("hover")
            }),
            r.appendChild(i)
        }) : jQuery(n.contentCase).find(".file-icoitem").each(function() {
            var o = this, h = jQuery(this).attr("icoid"), u = _config.sourcedata.icos[h], i, e;
            u.type == "shortcut" && (u = u.tdata);
            if (u.type != "folder")
                return;
            i = document.createElement("div"),
            i.id = "_window_icosContainer_folder_" + u.oid,
            e = jQuery(this).offset(),
            i.style.cssText = "position:absolute;width:" + jQuery(this).width() + "px;height:" + jQuery(this).height() + "px;left:" + (e.left - f.left - s) + "px;top:" + (e.top - f.top) + "px;z-index:" + n.zIndex + ';background: url(dzz/images/b.gif);cursor:url("dzz/images/cur/aero_ru.cur"),auto;',
            jQuery(i).bind("mouseover", function() {
                var i = this.id.replace("_shadow_icon_", "");
                if (t.icoid == i)
                    return;
                jQuery(o).addClass("hover")
            }),
            jQuery(i).bind("mouseout", function() {
                jQuery(o).removeClass("hover")
            }),
            r.appendChild(i)
        }))) : i.id = "_window_" + l
    }),
    document.getElementById("_blank").appendChild(u),
    document.getElementById("_blank").style.display = "block"
}
,
_Drag.prototype.Mousedown = function(n) {
    var r, i, t, u;
    n = n ? n : window.event;
    if (n.button == 2)
        return;
    r = n.clientX,
    i = n.clientY,
    this.oldxx = r,
    this.oldyy = i,
    t = jQuery(this.board).offset(),
    this.tl = r - t.left,
    this.tt = i - t.top,
    this.draging = !1,
    this.tach = !1,
    u = this,
    this.tach || this.AttachEvent(n),
    document.onmousemove = function(n) {
        u.Move(n)
    }
}
,
_Drag.prototype.Mouseup = function(n) {
    n = n ? n : window.event,
    this.tach && this.DetachEvent(n),
    this.draging && this.Moved(n)
}
,
_Drag.prototype.PreMove = function() {
    this.draging = !0;
    var n = this;
    jQuery(this.board).removeClass("hover"),
    this.width = jQuery(this.board).outerWidth(!0),
    this.height = jQuery(this.board).outerHeight(!0),
    _config.selectall.icos.length > 0 && this.container != "chatbox" && this.container != "taskbar_dock" && jQuery.inArray(this.icoid, _config.selectall.icos) > -1 ? (this.icos = _config.selectall.icos,
    this.selectall = !0) : (this.icos = [this.icoid],
    this.selectall = !1),
    this.Duplicate(),
    this.Createblank(),
    document.onmouseup = function(t) {
        n.Moved(t)
    }
}
,
_Drag.prototype.Move = function(n) {
    n = n ? n : window.event;
    try {
        window.event.returnValue = !1
    } catch (n) {}
    var t = n.clientX
      , i = n.clientY;
    !this.draging && (Math.abs(t - this.oldxx) > 5 || Math.abs(i != this.oldyy) > 5) && this.PreMove();
    if (!this.draging)
        return;
    t < 0 && (t = 0),
    i < 0 && (i = 0),
    t >= _config.screenWidth - 10 && (t = _config.screenWidth),
    i > _config.screenHeight && (i = _config.screenHeight),
    t >= _config.screenWidth - 10 && _layout.currentPage < _layout.page && _layout.setPageNext(),
    t <= 10 && _layout.currentPage > 1 && _layout.setPagePrev(),
    this.copy.style.left = t - this.tl + "px",
    this.copy.style.top = i - this.tt + "px"
}
,
_Drag.prototype.Moved = function(n) {
    var l, r, i, u, t;
    n = n ? n : window.event,
    l = this,
    this.draging = !1,
    this.tach && this.DetachEvent(n),
    jQuery("#_blank").empty().hide(),
    r = n.clientX,
    i = n.clientY,
    r < 0 && (r = 0),
    i < 0 && (i = 0),
    r > _config.screenWidth && (r = _config.screenWidth),
    i > _config.screenHeight && (i = _config.screenHeight);
    var c = n.srcElement ? n.srcElement : n.target
      , a = this.id
      , f = c.id;
    if (f) {
        if (f.indexOf("_window__W_") !== -1) {
            var s = f.replace("_window_", "")
              , e = _window.windows[s]
              , h = document.getElementById("ifm_" + s).name
              , o = 0;
            if (e.fileext)
                if (this.icos.length > 0)
                    for (u in this.icos)
                        (jQuery.inArray(_config.sourcedata.icos[this.icos[u]].ext, e.fileext) > -1 || jQuery.inArray(_config.sourcedata.icos[this.icos[u]].type, e.fileext) > -1) && (t = {},
                        t.icodata = _config.sourcedata.icos[this.icos[u]].type == "shortcut" ? _config.sourcedata.icos[this.icos[u]].tdata : _config.sourcedata.icos[this.icos[u]],
                        t.params = {},
                        t.params.multiple = !1,
                        _config.sendDataTo(h, t),
                        o++);
                else
                    (jQuery.inArray(this.data.ext, e.fileext) > -1 || jQuery.inArray(this.data.type, e.fileext) > -1) && (t = {},
                    t.icodata = this.data.type == "shortcut" ? this.data.tdata : this.data,
                    t.params = {},
                    t.params.multiple = !1,
                    _config.sendDataTo(h, t),
                    o++);
            if (o > 0) {
                jQuery(this.copy).remove(),
                jQuery("#_blank").empty().hide();
                return
            }
            this.reject();
            return
        }
    } else {
        this.reject();
        return
    }
    if (this.checkMoveTo(f, r, i))
        this.IcoMoveSave(f, r, i);
    else {
        this.reject();
        return
    }
}
,
_Drag.prototype.checkMoveTo = function(n) {
    var h, e, f, s, o, u, r;
    if (n.indexOf("_shadow_icon_") !== -1) {
        e = n.replace("_shadow_icon_", "");
        if (!_ico.icos[e])
            return !1;
        h = _ico.icos[e],
        f = _config.sourcedata.icos[e],
        f.type == "shortcut" && (f = _config.sourcedata.icos[e].tdata);
        if (jQuery.inArray(e, this.icos) > -1)
            if (_layout.autolist)
                return !1;
        if (this.data.isdelete > 0)
            return !0;
        for (u in this.icos) {
            r = _config.sourcedata.icos[this.icos[u]];
            if (!_config.Permission("delete", r) && this.data.pfid != _config.space.typefid.desktop)
                return !1;
            if (r.type == "folder" && r.flag != "" && r.isdelete < 1 && r.pfid != _config.space.typefid.desktop)
                return !1
        }
        if (f.type == "folder") {
            for (u in this.icos) {
                r = _config.sourcedata.icos[this.icos[u]];
                if (r.type == "folder" && r.flag != "" && r.isdelete < 1 && r.pfid != f.oid)
                    return !1;
                if (r.type == "folder" && _ico.isParentFid(r.oid, f.oid))
                    return !1
            }
            if (f.oid == _config.space.typefid.recycle) {
                if (!_config.Permission("delete", this.data))
                    return !1
            } else
                for (u in this.icos) {
                    r = _config.sourcedata.icos[this.icos[u]];
                    if (!_config.Permission_Container_write(f.oid, r.type))
                        return !1
                }
        }
    } else if (n.indexOf("_shadow_task_") !== -1) {
        e = n.replace("_shadow_task_", "");
        if (!_dock.icos[e])
            return !1;
        f = _dock.icos[e].data,
        f.type == "shortcut" && (f = _config.sourcedata.icos[e].tdata),
        s = !1,
        _dock.icos[e].data.icoid && jQuery.inArray(_dock.icos[e].data.icoid, this.icos) > -1 && (s = !0);
        if (s)
            return !1;
        if (this.data.isdelete > 0)
            return !0;
        for (u in this.icos) {
            r = _config.sourcedata.icos[this.icos[u]];
            if (!_config.Permission("delete", r) && this.data.pfid == _config.space.typefid.dock)
                return !1;
            if (r.type == "folder" && r.flag != "" && r.isdelete < 1 && r.pfid != _config.space.typefid.dock)
                return !1
        }
        if (f.type == "folder") {
            for (u in this.icos) {
                r = _config.sourcedata.icos[this.icos[u]];
                if (r.type == "folder" && r.flag != "" && r.isdelete < 1 && r.pfid != f.oid)
                    return !1;
                if (r.type == "folder" && _ico.isParentFid(r.oid, f.oid))
                    return !1
            }
            if (f.oid == _config.space.typefid.recycle) {
                if (!_config.Permission("delete", this.data))
                    return !1
            } else
                for (u in this.icos) {
                    r = _config.sourcedata.icos[this.icos[u]];
                    if (!_config.Permission_Container_write(f.oid, r.type))
                        return !1
                }
        }
    } else if (n.indexOf("_shadow_icosContainer_body_") !== -1) {
        if (this.data.isdelete > 0)
            return !0;
        if (this.data.isdelete < 1 && this.data.pfid == _config.space.typefid.desktop)
            return !0;
        for (u in this.icos) {
            r = _config.sourcedata.icos[this.icos[u]];
            if (!_config.Permission("delete", r))
                return !1;
            if (!_config.Permission_Container_write(_config.space.typefid.desktop, r.type))
                return !1;
            if (r.type == "folder" && r.flag != "" && r.isdelete < 1 && r.pfid != _config.space.typefid.desktop)
                return !1;
            if (r.type == "folder" && _ico.isParentFid(r.oid, _config.space.typefid.desktop))
                return !1
        }
    } else if (n.indexOf("_window_icosContainer_folder_") !== -1) {
        o = n.replace("_window_icosContainer_folder_", "");
        if (this.data.isdelete > 0)
            return o != _config.space.typefid.recycle ? !0 : !1;
        if (this.data.pfid == o)
            return !1;
        for (u in this.icos) {
            r = _config.sourcedata.icos[this.icos[u]];
            if (!_config.Permission("delete", r))
                return !1;
            if (!_config.Permission_Container_write(o, r.type))
                return !1;
            if (r.type == "folder" && r.flag != "" && r.isdelete < 1 && r.pfid != o)
                return !1;
            if (r.type == "folder" && _ico.isParentFid(r.oid, o))
                return !1
        }
    } else if (n.indexOf("_shadow__dock") !== -1) {
        if (this.data.pfid == _config.space.typefid.dock)
            return !0;
        if (this.data.isdelete > 0)
            return !0;
        for (u in this.icos) {
            r = _dock.icos[this.icos[u]] ? _dock.icos[this.icos[u]].data : _config.sourcedata.icos[this.icos[u]];
            if (!_config.Permission("delete", r))
                return !1;
            if (!_config.Permission_Container_write(o, r.type))
                return !1;
            if (r.type == "folder" && r.flag != "" && r.pfid != _config.space.typefid.dock)
                return !1;
            if (r.type == "folder" && _ico.isParentFid(r.oid, _config.space.typefid.dock))
                return !1
        }
    } else
        return !1;
    return !0
}
,
_Drag.prototype.DimMoveTo = function(n, t, i) {
    var f, u, r;
    jQuery(this.copy).remove(),
    jQuery("#_blank").empty().hide(),
    n.indexOf("_shadow_dim_group_") !== -1 ? (f = n.replace("_shadow_dim_group_", ""),
    _dim.changeGroup(this.uid, f),
    jQuery(this.copy).remove(),
    jQuery("#_blank").empty().hide()) : n.indexOf("_shadow_dim_user_") !== -1 ? (u = n.replace("_shadow_dim_user_", ""),
    r = jQuery("#DIMBuddy_" + u).attr("gid"),
    _dim.changeGroup(this.uid, r)) : this.IcoMoveSave(n, t, i)
}
,
_Drag.prototype.IcoMoveSave = function(n, t, i) {
    var s = this, r, h, f, u, c, o, e, l;
    if (this.icos.length > 0) {
        for (h = [],
        e = 0; e < this.icos.length; e++)
            h.push(_config.sourcedata.icos[this.icos[e]].dpath);
        r = {
            obz: "",
            tbz: "",
            sourcetype: "icoid",
            icoid: h.join(","),
            ticoid: 0,
            container: ""
        }
    } else
        r = {
            obz: "",
            tbz: "",
            sourcetype: "icoid",
            icoid: _config.sourcedata.icos[this.icoid].dpath,
            ticoid: 0,
            container: ""
        };
    if (this.container == "icosContainer_dim")
        r.sourcetype = "uid",
        r.icoid = this.uid,
        r.obz = "";
    else if (this.container == "chatbox")
        r.sourcetype = "icoid",
        r.iscut = 2,
        r.obz = this.data.bz || "";
    else if (this.container == "_dock")
        r.sourcetype = "icoid",
        r.icoid = _config.sourcedata.icos[_dock.icos[this.icoid].icoid].dpath,
        r.obz = "";
    else {
        r.sourcetype = "icoid",
        r.obz = this.data.bz || "";
        if (r.obz)
            if (this.icos.length > 0) {
                for (h = [],
                e = 0; e < this.icos.length; e++)
                    h.push(_config.sourcedata.icos[this.icos[e]].dpath);
                r.icoid = h.join(",")
            } else
                r.icoid = this.data.dpath
    }
    if (n.indexOf("_shadow_icon_") !== -1) {
        f = n.replace("_shadow_icon_", "");
        if (!_ico.icos[f]) {
            this.reject();
            return
        }
        u = _config.sourcedata.icos[f],
        u.type == "shortcut" && (u = u.tdata);
        if (u.type != "folder" && !_config.Permission_Container("admin", u.pfid)) {
            this.reject();
            return
        }
        u.type == "folder" ? (pfid = u.oid,
        r.ticoid = 0,
        r.tbz = u.bz,
        r.container = r.tbz ? "icosContainer_folder_" + encodeURIComponent(u.path) : "icosContainer_folder_" + encodeURIComponent(u.oid)) : (pfid = _config.sourcedata.icos[f].pfid,
        r.ticoid = _config.sourcedata.icos[f].dpath,
        r.tbz = "")
    } else if (n.indexOf("_shadow_task_") !== -1) {
        f = n.replace("_shadow_task_", "");
        if (!_dock.icos[f]) {
            this.reject();
            return
        }
        u = _dock.icos[f].data,
        u.type == "shortcut" && (u = u.tdata);
        if (u.type != "folder" && !_config.Permission_Container("admin", _config.space.typefid.dock)) {
            this.reject();
            return
        }
        _dock.icos[f] && (u.type == "folder" ? (r.ticoid = 0,
        pfid = u.oid,
        r.tbz = u.bz,
        r.container = r.tbz ? "icosContainer_folder_" + u.dpath : "icosContainer_folder_" + u.oid) : (_dock.icos[f].pined ? (r.ticoid = _config.sourcedata.icos[_dock.icos[f].data.icoid].dpath,
        pfid = _dock.icos[f].data.pfid) : (c = _dock.getIndex(f),
        c > 0 ? r.ticoid = c : r.container = "_dock_" + _config.space.typefid.dock,
        pfid = _config.space.typefid.dock),
        r.tbz = ""))
    } else
        n == "_shadow__dock" || n == "_window__dock" ? (r.container = "_dock_" + _config.space.typefid.dock,
        pfid = _config.space.typefid.dock,
        r.tbz = "") : n.indexOf("_shadow_icosContainer_body_") !== -1 ? (o = n.replace("_shadow_icosContainer_body_", ""),
        r.container = "icosContainer_body_" + o,
        pfid = o,
        r.tbz = "") : n.indexOf("_window_icosContainer_folder_") !== -1 && (o = n.replace("_window_icosContainer_folder_", ""),
        pfid = o,
        r.tbz = _config.sourcedata.folder[o].bz || "",
        r.container = r.tbz ? "icosContainer_folder_" + encodeURIComponent(_config.sourcedata.folder[o].path) : "icosContainer_folder_" + o);
    if (pfid == _config.space.typefid.recycle) {
        _ajax.delIco(this.icoid, !0),
        jQuery(this.copy).remove(),
        jQuery("#_blank").empty().hide();
        return
    }
    for (e in this.icos) {
        if (r.iscut < 2 && pfid != _config.space.typefid.recycle && r.sourcetype == "icoid" && _config.sourcedata.icos[this.icos[e]])
            if (_config.sourcedata.icos[this.icos[e]].pfid != pfid) {
                s.reject();
                return
            }
        if (r.container != "" && r.container != "chatbox" && !_config.Permission_Container_write(pfid, _config.sourcedata.icos[this.icos[e]].type)) {
            s.reject();
            return
        }
    }
    l = '<div class="progress progress-striped active" style="margin:0"><div class="progress-bar" style="width:100%;"></div></div>',
    showmessage("<p>" + __lang.file_drag_processing + "</p>" + l, "info", 0, 1, "right-bottom"),
    jQuery(this.copy).remove(),
    jQuery.getJSON(_config.saveurl + "&do=move&" + jQuery.param(r), function(r) {
        var f, u;
        if (r.msg == "success") {
            s.icos = [],
            s.oicos = [];
            for (f in r.successicos)
                s.icos.push(r.successicos[f]),
                s.oicos.push(f);
            r.iscopy > 0 ? showmessage(__lang.file_copy_success, "success", 3e3, 1, "right-bottom") : (showmessage(__lang.move_files_success, "success", 3e3, 1, "right-bottom"),
            s.remove());
            for (u in r.icoarr)
                _config.sourcedata.icos[r.icoarr[u].icoid] = r.icoarr[u];
            for (u in r.folderarr)
                _config.sourcedata.folder[r.folderarr[u].fid] = r.folderarr[u];
            s.IcoMoveTo(n, t, i, r.iscopy)
        } else
            showmessage(r.error, "error", 3e3, 1, "right-bottom")
    })
}
,
_Drag.prototype.remove = function() {
    for (var n = 0; n < this.oicos.length; n++)
        _ico.removeIcoid(this.oicos[n])
}
,
_Drag.prototype.IcoMoveTo = function(n) {
    var f = this, u;
    u = n.indexOf("_shadow_icon_") !== -1 ? n.replace("_shadow_icon_", "") : n.indexOf("_shadow_task_") !== -1 ? n.replace("_shadow_task_", "") : "",
    _ico.appendIcoids(f.icos, u),
    jQuery(this.copy).remove()
}
,
_Drag.prototype.reject = function() {
    jQuery("#_blank").empty().hide(),
    jQuery("#navbar").css("z-index", 4e3);
    var t = jQuery(this.copy)
      , n = jQuery(this.board).offset();
    t.animate({
        left: n.left + "px",
        top: n.top + "px"
    }, _config.delay, function() {
        jQuery(this).remove()
    }),
    jQuery("#taskbar_dock_inner").find(".task_Icoblock").each(function() {
        var n = _dock.icos[this.id.replace("task_", "")];
        n.board.style.left = n.left + "px",
        n.board.style.top = n.top + "px"
    }),
    this.icos = []
}
,
_select.delay = 500,
_select.width = 120,
_select.height = 120,
_select.icos = {},
_select.onmousemove = null,
_select.onmouseup = null,
_select.tach = null,
_select.onselectstart = 1,
_select.init = function(n) {
    var t = new _select(n);
    jQuery(t.board).on("mousedown", function(i) {
        if (n.indexOf("icosContainer_body") !== -1 && _layout.page > 1 && _hotkey.ctrl < 1)
            return;
        i = i ? i : window.event;
        var r = i.srcElement ? i.srcElement : i.target;
        if (/input|textarea/i.test(r.tagName))
            return !0;
        if (i.button == 2)
            return !0;
        dfire("mousedown"),
        t.Mousedown(i ? i : window.event)
    });
    jQuery(t.board).on("mouseup", function(n) {
        n = n ? n : window.event;
        var i = n.srcElement ? n.srcElement : n.target;
        if (/input|textarea/i.test(i.tagName))
            return !0;
        t.Mouseup(n ? n : window.event),
        dfire("mouseup")
    });
    return t
}
,
_select.prototype.DetachEvent = function() {
    if (!_select.tach)
        return;
    document.onmousemove = _select.onmousemove,
    document.onmouseup = _select.onmouseup,
    document.onselectstart = _select.onselectstart;
    try {
        this.board.releaseCapture && this.board.releaseCapture()
    } catch (n) {}
    _select.tach = 0,
    _select.finishblank = 0
}
,
_select.prototype.AttachEvent = function(n) {
    if (_select.tach)
        return;
    _select.onmousemove = document.onmousemove,
    _select.onmouseup = document.onmouseup,
    _select.onselectstart = document.onselectstart;
    try {
        document.onselectstart = function() {
            return !1
        }
        ,
        n.preventDefault ? n.preventDefault() : this.board.setCapture && this.board.setCapture()
    } catch (n) {}
    _select.tach = 1
}
,
_select.prototype.Duplicate = function() {
    this.copy = document.createElement("div"),
    document.body.appendChild(this.copy),
    this.copy.style.cssText = "position:absolute;left:0px;top:0px;width:0px;height:0px;filter:Alpha(opacity=50);opacity:0.5;z-index:10002;overflow:hidden;background:#000;border:1px solid #000;"
}
,
_select.prototype.Mousedown = function(n) {
    var i, t, r;
    this.mousedowndoing = !1,
    i = n.clientX,
    t = n.clientY,
    _select.oldxx = i,
    _select.oldyy = t,
    this.tl = i,
    this.tt = t,
    this.oldx = i,
    this.oldy = t,
    r = this,
    _select.tach || this.AttachEvent(n),
    document.onmousemove = function(n) {
        return r.Move(n ? n : window.event),
        !1
    }
}
,
_select.prototype.Mouseup = function(n) {
    _select.tach && this.DetachEvent(n),
    this.mousedowndoing && this.Moved(n)
}
,
_select.prototype.PreMove = function() {
    var n, t;
    jQuery("#_blank").empty().show();
    if (this.move == "no")
        return;
    this.Duplicate(),
    n = this,
    this.mousedowndoing = !0,
    t = jQuery(this.board).offset(),
    this.copy.style.left = this.tl + "px",
    this.copy.style.top = this.tt + "px",
    _hotkey.ctrl > 0 && _config.selectall.container == this.id || (_config.selectall.container && jQuery("#" + _config.selectall.container).find(".Icoblock").removeClass("Icoselected"),
    _config.selectall.container = this.id,
    _config.selectall.icos = [],
    _config.selectall.position = {}),
    jQuery(this.board).find(".Icoblock").each(function() {
        var n = jQuery(this)
          , i = n.offset()
          , t = n.attr("icoid");
        t && (_config.selectall.position[t] = {
            icoid: t,
            left: i.left,
            top: i.top,
            width: n.width(),
            height: n.height()
        })
    }),
    document.onmouseup = function(t) {
        return n.Moved(t ? t : window.event),
        !1
    }
}
,
_select.prototype.Move = function(n) {
    var i = n.clientX, t = n.clientY, r;
    !this.mousedowndoing && (Math.abs(this.oldx - i) > 5 || Math.abs(this.oldy - t) > 5) && this.PreMove();
    if (!this.mousedowndoing)
        return;
    r = 0,
    i - this.oldx > 0 ? this.copy.style.width = i - this.oldx + "px" : (this.copy.style.width = Math.abs(i - this.oldx) + "px",
    this.copy.style.left = this.tl + (i - this.oldx) + "px"),
    t - this.oldy > 0 ? this.copy.style.height = t - this.oldy + "px" : (this.copy.style.height = Math.abs(t - this.oldy) + "px",
    this.copy.style.top = this.tt + (t - this.oldy) + "px"),
    BROWSER.ie || (i > this.oldx && t > this.oldy ? (Math.abs(i - _select.oldxx) > 20 || Math.abs(t - _select.oldyy) > 20) && (_select.oldxx = i,
    _select.oldyy = t,
    this.setSelected(!0)) : (Math.abs(i - _select.oldxx) > 20 || Math.abs(t - _select.oldyy) > 20) && (_select.oldxx = i,
    _select.oldyy = t,
    this.setSelected()))
}
,
_select.prototype.Moved = function(n) {
    var r = this, t, i;
    jQuery("#_blank").hide(),
    _select.tach && this.DetachEvent(n),
    t = n.clientX,
    i = n.clientY,
    BROWSER.ie && (t > this.oldx && i > this.oldy ? this.setSelected(!0) : this.setSelected()),
    jQuery(this.copy).remove()
}
,
_select.prototype.setSelected = function(n) {
    var t, i;
    _select.sum++;
    var r = jQuery(this.copy).offset()
      , f = []
      , u = {
        left: r.left,
        top: r.top,
        width: jQuery(this.copy).width(),
        height: jQuery(this.copy).height()
    };
    for (t in _config.selectall.position)
        i = _config.selectall.position[t],
        _select.checkInArea(u, i, n) ? _select.SelectedStyle(this.id, t, !0, !0) : _hotkey.ctrl < 1 && _select.SelectedStyle(this.id, t, !1, !0)
}
,
_select.checkInArea = function(n, t, i) {
    var r = {
        minx: 0,
        miny: 0,
        maxx: 0,
        maxy: 0
    }, f, u;
    return r.minx = Math.max(t.left, n.left),
    r.miny = Math.max(t.top, n.top),
    r.maxx = Math.min(t.left + t.width, n.left + n.width),
    r.maxy = Math.min(t.top + t.height, n.top + n.height),
    i ? r.minx > r.maxx || r.miny > r.maxy ? !1 : (f = (r.maxx - r.minx) * (r.maxy - r.miny),
    u = t.width * t.height,
    u == f ? !0 : !1) : r.minx > r.maxx || r.miny > r.maxy ? !1 : !0
}
,
_select.SelectedStyle = function(n, t, i, r) {
    var e = _config.selectall.icos || [], f = n.split("-"), l = parseInt(f[1]), c = f[2], h = "f-" + f[1] + "-" + f[2], u, o, s;
    if (i) {
        if (!_config.FileSPower(_config.sourcedata.icos[t].sperm, "delete"))
            return;
        if (!_config.Permission("drag", _config.sourcedata.icos[t]))
            return;
        if (_config.sourcedata.icos[t].notdelete > 0 && _config.sourcedata.icos[t].type != "app")
            return;
        if (!_config.FileSPower(_config.sourcedata.icos[t].sperm, "move"))
            return
    }
    u = jQuery("#" + n).find(".Icoblock[icoid=" + t + "]");
    if (i)
        _config.selectall.container == "" && (_config.selectall.container = n),
        r && _config.selectall.container == n ? jQuery.inArray(t, _config.selectall.icos) < 0 && _config.selectall.icos.push(t) : (jQuery("#" + _config.selectall.container).find(".Icoblock").removeClass("Icoselected"),
        _config.selectall.container = n,
        _config.selectall.icos = [t],
        _config.selectall.position = {}),
        u.addClass("Icoselected");
    else {
        u.each(function() {
            if (jQuery(this).hasClass("file-line")) {
                var n = jQuery(this);
                n.off(".drag")
            }
        }),
        o = [];
        if (_config.selectall.container == n)
            for (s in e)
                e[s] != t && o.push(e[s]);
        _config.selectall.icos = o,
        u.removeClass("Icoselected")
    }
    c == "_W_openfile" && _file.setSelect(),
    _filemanage.cons[h] && _filemanage.cons[h].selectInfo()
}
,
_select.Cut = function(n) {
    var t;
    if (_config.cut.iscut > 0 && _config.cut.icos.length > 0)
        for (t in _config.cut.icos)
            jQuery(".Icoblock[icoid=" + _config.cut.icos[t] + "]").removeClass("iscut");
    _config.cut.iscut = 1,
    _config.cut.icos = jQuery.inArray(n, _config.selectall.icos) > -1 ? _config.selectall.icos : [n];
    for (t in _config.cut.icos)
        jQuery(".Icoblock[icoid=" + _config.cut.icos[t] + "]").addClass("iscut")
}
,
_select.Copy = function(n) {
    if (_config.cut.iscut > 0 && _config.cut.icos.length > 0)
        for (var t in _config.cut.icos)
            jQuery(".Icoblock[icoid=" + _config.cut.icos[t] + "]").removeClass("iscut");
    _config.cut.iscut = 0,
    _config.cut.icos = jQuery.inArray(n, _config.selectall.icos) > -1 ? _config.selectall.icos : [n]
}
,
_select.Paste = function(n) {
    var f, e, u, r, o, h, s;
    if (_config.cut.icos.length < 1)
        return;
    f = _config.sourcedata.folder[n].bz || "",
    e = f ? encodeURIComponent(_config.sourcedata.folder[n].path) : n;
    if (_config.sourcedata.icos[_config.cut.icos[0]].bz && _config.sourcedata.icos[_config.cut.icos[0]].bz != "") {
        for (u = [],
        r = 0; r < _config.cut.icos.length; r++)
            u.push(_config.sourcedata.icos[_config.cut.icos[r]].dpath);
        o = {
            obz: _config.sourcedata.icos[_config.cut.icos[0]].bz,
            tbz: f,
            sourcetype: "icoid",
            icoid: u.join(","),
            ticoid: 0,
            container: "icosContainer_folder_" + e,
            iscut: _config.cut.iscut > 0 ? 1 : 2
        }
    } else {
        for (u = [],
        r = 0; r < _config.cut.icos.length; r++)
            u.push(_config.sourcedata.icos[_config.cut.icos[r]].dpath);
        o = {
            obz: "",
            tbz: f,
            sourcetype: "icoid",
            icoid: u.join(","),
            ticoid: 0,
            container: "icosContainer_folder_" + e,
            iscut: _config.cut.iscut > 0 ? 1 : 2
        }
    }
    h = _config.getContainerByFid(n),
    s = '<div class="progress progress-striped active" style="margin:0"><div class="bar" style="width:100%;"></div></div>',
    showmessage("<p>" + __lang.file_drag_processing + "</p>" + s, "info", 0, 1, "right-bottom"),
    jQuery.getJSON(_config.saveurl + "&do=move&" + jQuery.param(o), function(n) {
        var i, t;
        if (n.msg == "success") {
            _config.cut.icos = [],
            _config.cut.successicos = [],
            _config.cut.osuccessicos = [];
            for (i in n.successicos)
                _config.cut.successicos.push(n.successicos[i]),
                _config.cut.osuccessicos.push(i);
            n.iscopy > 0 ? showmessage(__lang.file_copy_success, "success", 3e3, 1, "right-bottom") : (showmessage(__lang.crop_files_success, "success", 3e3, 1, "right-bottom"),
            _select.remove(_config.cut.osuccessicos));
            for (t in n.icoarr)
                _config.sourcedata.icos[n.icoarr[t].icoid] = n.icoarr[t];
            for (t in n.folderarr)
                _config.sourcedata.folder[n.folderarr[t].fid] = n.folderarr[t];
            _ico.appendIcoids(_config.cut.successicos),
            n.error && showmessage(__lang.operate_files_error, "error", 3e3, 1, "right-bottom")
        } else
            showmessage(__lang.operate_files_error, "error", 3e3, 1, "right-bottom")
    })
}
,
_select.remove = function(n) {
    for (var t = 0; t < n.length; t++)
        _ico.removeIcoid(n[t])
}
,
windows.OpenFile = {
    object: null,
    title: "",
    features: "titlebutton=max|close,width=700,height=500,isModal=yes",
    width: 700,
    height: 500
},
_window.OpenFile = function(n, t, i, r, u, f) {
    var e = new _window(f,"openfile");
    return e.type = "openfile",
    e.topfid = u || [_config.space.typefid.document, _config.space.typefid.home],
    e.fid = e.topfid[0],
    _file.init(n, t, r),
    e.Create(i),
    e.SetContent_OpenFile(n, t, r),
    e.Focus(),
    e
}
,
_window.prototype.SetContent_OpenFile = function(n, t, i) {
    var a, v, l, o, c, s, r, f, u, h, e;
    jQuery(this.contentCase).addClass("filemanage"),
    jQuery(this.loadding).hide();
    var u = this
      , p = ["f-" + this.fid + "-" + this.id]
      , y = [];
    for (a = this.topfid.length - 1; a >= 0; a--)
        y.push("f-" + this.topfid[a] + "-" + this.id);
    v = y,
    l = document.createElement("div"),
    l.id = "jstree_area_" + this.id,
    l.className = "filemanage-left",
    jQuery(l).mousedown(function() {
        return dfire("mousedown"),
        u.Focus(),
        !1
    }),
    this.contentCase.appendChild(l),
    o = document.createElement("div"),
    o.id = "right_" + this.id,
    o.className = "filemanage-right",
    this.contentCase.appendChild(o),
    c = document.createElement("div"),
    c.id = "filemanage-ltdrager_" + this.id,
    c.className = "filemanage-ltdrager",
    jQuery(c).bind("mousedown", function(n) {
        u.ltdrager_start(n ? n : window.event)
    }),
    this.contentCase.appendChild(c),
    s = document.createElement("div"),
    s.id = "right_bottom",
    s.style.bottom = "0px",
    s.style.cssText = "position:absolute;bottom:0px;left:0px;width:" + jQuery(o).width() + "px;",
    s.className = "right-bottom",
    r = "",
    r += '<table width="100%" height="100%" cellpadding="5"  cellspacing="0" style="padding:5px;">',
    r += '<tr height="36">',
    r += '<td align="center" width="60">' + __lang.js_OpenFile.filename + "</td>",
    r += i.name ? '<td align="center" ><input id="file_select_input" class="file-select-input form-control input-sm" type="text" style="width:100%;padding:4px" value="' + i.name + '"></td>' : '<td align="center" ><input id="file_select_input" class="file-select-input form-control input-sm" type="text" style="width:100%;padding:4px" value=""></td>',
    r += '<td align="center"  width="60"><button  class="btn btn-default  btn-sm" id="file_OK" class="file-ok">' + __lang.js_OpenFile.OpenFileOK["ok_" + n] + "</button></td>",
    r += "</tr>",
    r += '<tr height="36">',
    r += '<td align="center" width="70">' + __lang.js_OpenFile.filetype + "</td>",
    _file.exts = t ? this.exts = t : this.exts = __lang.OpenFile_Filetype1,
    r += '<td align="center" >',
    r += '<select id="file_type_select" class="file-type-input form-control input-sm" style="width:100%" onchange="_file.file_type_select_change(this.value);">';
    for (f in this.exts)
        r += this.exts[f][2] ? '<option value="' + f + '" selected="' + this.exts[f][2] + '">' + this.exts[f][0] + "</option>" : '<option value="' + f + '" >' + this.exts[f][0] + "</option>";
    r += "</select></td>",
    r += '<td align="center"  width="70"><button class="btn btn-default btn-sm" id="file_CANCEL" class="file-cancel">' + __lang.js_OpenFile.cancel + "</button></td>",
    r += "</tr>";
    if (n == "save" || n == "saveto") {
        r += '<tr height="36">',
        r += '<td align="center" width="70">' + __lang.js_OpenFile.fileEncode + "</td>",
        r += '<td align="center" >',
        r += '<select id="file_code_select" class="file-code-input form-control  input-sm" style="width:100%">',
        this.filecode = i.fileencode ? i.fileencode : __lang.js_OpenFile_Filecode;
        for (f in this.filecode)
            r += this.filecode[f][2] ? '<option value="' + this.filecode[f][1] + '" selected="' + this.filecode[f][2] + '">' + this.filecode[f][0] + "</option>" : '<option value="' + this.filecode[f][1] + '" >' + this.filecode[f][0] + "</option>";
        r += "</select></td>",
        r += '<td align="center"  width="80">&nbsp;</td>',
        r += "</tr>"
    }
    r += "</table>",
    s.innerHTML = r,
    o.appendChild(s),
    u = this;
    jQuery("#file_OK").focus().on("click", function() {
        eval(u.string + ".OnOK()")
    });
    jQuery("#file_CANCEL").on("click", function() {
        eval(u.string + ".OnCANCEL()")
    });
    h = document.createElement("div"),
    h.id = "content_" + this.id,
    h.className = "right-top",
    h.innerHTML = '<div class="right-top-inner" style="position:absolute"><div id="right_list" class="right-list"></div></div>',
    o.appendChild(h),
    e = "dzz/system",
    jQuery("#jstree_area_" + this.id).jstree({
        plugins: ["themes", "json_data", "ui", "types", "hotkeys"],
        json_data: {
            ajax: {
                url: _config.systemurl + "&op=explorer",
                data: function(n) {
                    var r, t;
                    if (n.attr)
                        var r = n.attr("id")
                          , f = r.split("-")[1]
                          , t = _config.sourcedata.folder[f].bz
                          , e = encodeURIComponent(_config.sourcedata.folder[f].path);
                    else
                        r = 0,
                        t = i.bz ? i.bz : "";
                    return {
                        "do": "get_children",
                        id: r,
                        winid: u.id,
                        bz: t,
                        path: e,
                        t: +new Date
                    }
                },
                success: function(n) {
                    var t, r, i;
                    if (!n)
                        return;
                    if (n.error) {
                        alert(n.error);
                        return
                    }
                    t = n[n.length - 1];
                    if (!t)
                        return;
                    if (t.icosdata)
                        for (r in t.icosdata)
                            _config.sourcedata.icos[r] = t.icosdata[r],
                            _config.sourceids.icos.push(r);
                    if (t.folderdata)
                        for (i in t.folderdata)
                            _config.sourcedata.folder || (_config.sourcedata.folder = {}),
                            _config.sourcedata.folder[i] = t.folderdata[i],
                            _config.sourceids.folderids || (_config.sourceids.folderids = []),
                            _config.sourceids.folderids.push(i)
                }
            }
        },
        themes: {
            theme: "default",
            dots: !1
        },
        types: {
            valid_children: ["drive"],
            types: {
                "default": {
                    valid_children: "none",
                    icon: {
                        image: e + "/images/root.png"
                    }
                },
                folder: {
                    valid_children: ["default", "folder"],
                    icon: {
                        image: e + "/images/folder.png"
                    }
                },
                home: {
                    valid_children: [],
                    icon: {
                        image: e + "/images/home.png"
                    },
                    start_drag: !1,
                    move_node: !1,
                    delete_node: !1,
                    create_node: !1,
                    rename: !1,
                    remove: !1
                },
                document: {
                    valid_children: [],
                    icon: {
                        image: e + "/images/document.png"
                    },
                    start_drag: !1,
                    move_node: !1,
                    delete_node: !1,
                    create_node: !1,
                    rename: !1,
                    remove: !1
                },
                recycle: {
                    valid_children: [],
                    icon: {
                        image: e + "/images/recycle.png"
                    },
                    start_drag: !1,
                    move_node: !1,
                    delete_node: !1,
                    create_node: !1,
                    rename: !1,
                    remove: !1
                },
                dock: {
                    valid_children: [],
                    icon: {
                        image: e + "/images/dock.png"
                    },
                    start_drag: !1,
                    move_node: !1,
                    delete_node: !1,
                    create_node: !1,
                    rename: !1,
                    remove: !1
                },
                desktop: {
                    valid_children: ["folder"],
                    icon: {
                        image: e + "/images/desktop.png"
                    },
                    start_drag: !1,
                    move_node: !1,
                    delete_node: !1,
                    remove: !1,
                    rename: !1
                },
                organization: {
                    valid_children: [],
                    icon: {
                        image: e + "/images/organization.png"
                    },
                    start_drag: !1,
                    move_node: !1,
                    delete_node: !1,
                    remove: !1,
                    rename: !1
                },
                department: {
                    valid_children: [],
                    icon: {
                        image: e + "/images/department.png"
                    },
                    start_drag: !1,
                    move_node: !1,
                    delete_node: !1,
                    remove: !1,
                    rename: !1
                }
            }
        },
        ui: {
            initially_select: p
        },
        core: {
            initially_open: v
        }
    }).bind("select_node.jstree", function(n, t) {
        t.rslt.obj.hasClass("jstree-closed") && jQuery("#jstree_area_" + u.id).jstree("open_node", t.rslt.obj);
        var i = t.rslt.obj.attr("id").split("-");
        u.fid = i[1],
        u.topfid = _ico.getTopFid(u.fid),
        jQuery("#content_" + u.id).empty(),
        jQuery(u.loadding).show(),
        jQuery(u.blank).css("z-index", 100),
        _file.getData(_config.systemurl + "&op=explorer&do=filemanage&id=" + t.rslt.obj.attr("id") + "&winid=" + u.id + "&perpage=" + _filemanage.perpage + "&bz=" + _config.sourcedata.folder[u.fid].bz + "&asc=1&disp=" + _config.sourcedata.folder[u.fid].disp + "&iconview=" + _config.sourcedata.folder[u.fid].iconview + "&path=" + encodeURIComponent(_config.sourcedata.folder[u.fid].path) + "&t=" + +new Date, function() {
            jQuery(u.loadding).hide(),
            jQuery(u.blank).css("z-index", -1)
        })
    }),
    this.treeHide(1)
}
,
_file = {},
_file.init = function(n, t, i) {
    _file.params = i,
    _file.type = n,
    _file.exts = t,
    _file.filepath = []
}
,
_file.getData = function(n, t) {
    jQuery.getJSON(n, function(n) {
        var r, u, i;
        if (n.error)
            alert(n.error);
        else {
            for (r in n.data)
                _config.sourcedata.icos[r] = n.data[r],
                _config.sourceids.icos.push(r);
            for (u in n.folderdata)
                _config.sourcedata.folder[u] = n.folderdata[u];
            n.param.page > 1 ? (i = _filemanage.cons[n.sid],
            i.total = parseInt(n.total),
            i.totalpage = Math.ceil(i.total / i.perpage),
            _file.appendIcos(n.data)) : (i = new _filemanage(n.sid,n.data,n.param),
            _file.showIcos()),
            typeof t == "function" && t()
        }
    })
}
,
_file.setSelect = function() {
    var i = _config.selectall.icos, r, t, n;
    _file.selected = [],
    r = 0;
    for (n in i)
        _config.sourcedata.icos[i[n]].type != "folder" && _file.selected.push(i[n]);
    t = [];
    for (n in _file.selected)
        t[n] = _config.sourcedata.icos[_file.selected[n]].name;
    document.getElementById("file_select_input").value = '"' + t.join('","') + '"',
    document.getElementById("file_OK").focus()
}
,
_file.file_type_select_change = function(n) {
    var t = document.getElementById("file_select_input").value, i;
    t && n != "All" && n != "video" && n != "app" && n != "music" && n != "link" && n != "attach" && (i = _file.exts[n][1][0],
    t = t.replace(/["'\/]/g, ""),
    t.lastIndexOf(".") !== -1 && (t = t.substr(0, t.lastIndexOf("."))),
    t = t + "." + i.toLowerCase(),
    document.getElementById("file_select_input").value = '"' + t + '"'),
    _file.showIcos()
}
,
_file.Searchext = function(n, t) {
    var r = t, f, i;
    if (r.length < 1)
        return n;
    f = {};
    for (i in n) {
        if (!n[i].type)
            continue;
        var u = n[i].ext ? n[i].ext.toUpperCase() : ""
          , s = u ? u.toLowerCase() : ""
          , o = n[i].type.toUpperCase()
          , e = n[i].type.toLowerCase();
        (n[i].type == "folder" || jQuery.inArray(u, r) > -1 || jQuery.inArray(s, r) > -1 || jQuery.inArray(o, r) > -1 || jQuery.inArray(e, r) > -1) && (f[i] = n[i])
    }
    return f
}
,
_file.appendIcos = function(n) {
    var i, t, r;
    _file.selected = [],
    i = jQuery("#file_type_select").val(),
    t = i ? _file.exts[i][1] : [],
    r = _filemanage.cons[_window.windows._W_openfile.filemanageid],
    r.appendIcos(_file.Searchext(n, t))
}
,
_file.showIcos = function() {
    var t, n, i;
    _file.selected = [],
    t = jQuery("#file_type_select").val(),
    n = t ? _file.exts[t][1] : [],
    i = _filemanage.cons[_window.windows._W_openfile.filemanageid],
    i.showIcos(n)
}
,
_window.OpenSelectPostion = function(n, t, i) {
    var r = new _window(t,"SelectPosition");
    return r.Create(n),
    r.SetContent_SelectPostion(i),
    r.Focus(),
    r
}
,
_window.prototype.SetContent_SelectPostion = function(n) {
    var i = this
      , t = "dzz/system";
    jQuery(this.contentCase).jstree({
        plugins: ["themes", "json_data", "ui", "types", "cookies", "hotkeys"],
        json_data: {
            ajax: {
                url: _config.systemurl + "&op=explorer",
                data: function(t) {
                    var u, r;
                    if (t.attr)
                        var u = t.attr("id")
                          , f = u.split("-")[1]
                          , r = _config.sourcedata.folder[f].bz
                          , e = encodeURIComponent(_config.sourcedata.folder[f].path);
                    else
                        u = 0,
                        r = n.bz ? n.bz : "";
                    return {
                        "do": "get_children",
                        id: u,
                        winid: i.id,
                        bz: r,
                        path: e,
                        t: +new Date
                    }
                },
                success: function(n) {
                    var t, r, i;
                    if (!n)
                        return;
                    if (n.error) {
                        alert(n.error);
                        return
                    }
                    t = n[n.length - 1];
                    if (!t)
                        return;
                    if (t.icosdata)
                        for (r in t.icosdata)
                            _config.sourcedata.icos[r] = t.icosdata[r],
                            _config.sourceids.icos.push(r);
                    if (t.folderdata)
                        for (i in t.folderdata)
                            _config.sourcedata.folder || (_config.sourcedata.folder = {}),
                            _config.sourcedata.folder[i] = t.folderdata[i],
                            _config.sourceids.folderids || (_config.sourceids.folderids = []),
                            _config.sourceids.folderids.push(i)
                }
            }
        },
        themes: {
            theme: "default",
            dots: !1
        },
        types: {
            valid_children: ["drive"],
            types: {
                "default": {
                    valid_children: "none",
                    icon: {
                        image: t + "/images/root.png"
                    }
                },
                folder: {
                    valid_children: ["default", "folder"],
                    icon: {
                        image: t + "/images/folder.png"
                    }
                },
                home: {
                    valid_children: [],
                    icon: {
                        image: t + "/images/home.png"
                    },
                    start_drag: !1,
                    move_node: !1,
                    delete_node: !1,
                    create_node: !1,
                    rename: !1,
                    remove: !1
                },
                document: {
                    valid_children: [],
                    icon: {
                        image: t + "/images/document.png"
                    },
                    start_drag: !1,
                    move_node: !1,
                    delete_node: !1,
                    create_node: !1,
                    rename: !1,
                    remove: !1
                },
                recycle: {
                    valid_children: [],
                    icon: {
                        image: t + "/images/recycle.png"
                    },
                    start_drag: !1,
                    move_node: !1,
                    delete_node: !1,
                    create_node: !1,
                    rename: !1,
                    remove: !1
                },
                dock: {
                    valid_children: [],
                    icon: {
                        image: t + "/images/dock.png"
                    },
                    start_drag: !1,
                    move_node: !1,
                    delete_node: !1,
                    create_node: !1,
                    rename: !1,
                    remove: !1
                },
                desktop: {
                    valid_children: ["folder"],
                    icon: {
                        image: t + "/images/desktop.png"
                    },
                    start_drag: !1,
                    move_node: !1,
                    delete_node: !1,
                    remove: !1,
                    rename: !1
                },
                organization: {
                    valid_children: [],
                    icon: {
                        image: t + "/images/organization.png"
                    },
                    start_drag: !1,
                    move_node: !1,
                    delete_node: !1,
                    remove: !1,
                    rename: !1
                }
            }
        }
    }).bind("select_node.jstree", function(n, t) {
        _config.selectPosition = t.rslt.obj.attr("id"),
        t.rslt.obj.hasClass("jstree-closed") && jQuery(i.contentCase).jstree("open_node", t.rslt.obj),
        t.rslt.obj.siblings().each(function() {
            jQuery(i.contentCase).jstree("close_node", jQuery(this))
        })
    })
}
,
"onfocusin"in document ? (document.onfocusin = function() {
    CurrentActive = !0
}
,
document.onfocusout = function() {
    CurrentActive = !1,
    _hotkey.init()
}
) : (window.onfocus = function() {
    CurrentActive = !0
}
,
window.onblur = function() {
    CurrentActive = !1,
    _hotkey.init()
}
),
imgReady = function() {
    var n = []
      , t = null
      , r = function() {
        for (var t = 0; t < n.length; t++)
            n[t].end ? n.splice(t--, 1) : n[t]();
        !n.length && i()
    }
      , i = function() {
        clearInterval(t),
        t = null
    };
    return function(i, u, f, e) {
        var s, l, a, c, h, o = new Image;
        o.src = i;
        if (o.complete) {
            u.call(o),
            f && f.call(o);
            return
        }
        l = o.width,
        a = o.height,
        o.onerror = function() {
            e && e.call(o),
            s.end = !0,
            o = o.onload = o.onerror = null
        }
        ,
        s = function() {
            try {
                c = o.width,
                h = o.height
            } catch (n) {
                s.end = !0
            }
            (c !== l || h !== a || c * h > 1024) && (u.call(o),
            s.end = !0)
        }
        ,
        s(),
        o.onload = function() {
            !s.end && s(),
            f && f.call(o),
            u.call(o),
            o = o.onload = o.onerror = null
        }
        ,
        s.end || (n.push(s),
        t === null && (t = setInterval(r, 40)))
    }
}(),
_upload = {},
_upload.total = 0,
_upload.completed = 1,
_upload.ismin = 1,
_upload.el = jQuery("#pop_upload_Container"),
_upload.init = function() {
    var t = '<div class="panel panel-primary ismin" > <div class="panel-heading ">\t<div class="upload-progress-mask"></div>\t<div class="panel-heading-wrap" >\t\t<span class="upload-sum">\t\t\t<span class="upload-sum-title">' + __lang.are_uploading1 + ':</span>\t\t\t<span class="upload-sum-completed"></span> \t\t </span>\t\t <span class="upload-speed">\t\t\t<span class="upload-speed-title">' + __lang.uploading_speed + ':</span>\t\t\t<span class="upload-speed-value"></span>\t\t </span>\t\t <span class="upload-button-all"><span class="upload-cancel-all"></span></span>\t\t <span class="upload-button-min"><span type="button" class="upload-min"></span></span>\t</div> </div> <ul class="list-group"> </ul></div>'
      , n = jQuery(t).appendTo("#pop_upload_Container");
    n.find(".panel-heading").on("click", function() {
        _upload.ismin ? (n.removeClass("ismin"),
        _upload.ismin = 0) : (n.addClass("ismin"),
        _upload.ismin = 1)
    });
    n.find(".upload-button-all").on("click", function() {
        return _upload.close(),
        !1
    });
    _upload.list = n.find(".list-group")
}
,
_upload.close = function() {
    _upload.el.find(".upload-cancel:visible").length ? Confirm(__lang.list_give_upload, function() {
        _upload.el.find(".upload-cancel:visible").trigger("click"),
        _upload.el.hide(),
        _upload.el.find(".list-group").empty(),
        _upload.total = 0,
        _upload.completed = 1
    }) : (_upload.el.hide(),
    _upload.el.find(".list-group").empty(),
    _upload.total = 0,
    _upload.completed = 1)
}
,
_upload.add = function() {
    _upload.total++,
    _upload.el.show(),
    _upload.el.find(".upload-sum-completed").html(_upload.completed + "/" + _upload.total),
    _upload.completed <= _upload.total && _upload.el.find(".upload-sum-title").html(__lang.are_uploading1 + ":")
}
,
_upload.submit = function() {
    _upload.el.find(".upload-sum-completed").show().html(_upload.completed + "/" + _upload.total)
}
,
_upload.done = function() {
    _upload.completed++,
    _upload.completed > _upload.total ? (_upload.el.find(".upload-sum-title").html(__lang.upload_finish + ":"),
    _upload.el.find(".panel").addClass("ismin"),
    _upload.ismin = 1,
    _upload.el.find(".panel-heading  .upload-progress-mask").css("width", "0%")) : _upload.el.find(".upload-sum-completed").show().html(_upload.completed + "/" + _upload.total)
}
,
_upload.progress = function(n) {
    _upload.el.find(".upload-speed").show().find(".upload-speed-value").html(n),
    _upload.speedTimer && window.clearTimeout(_upload.speedTimer),
    _upload.speedTimer = window.setTimeout(function() {
        _upload.el.find(".upload-speed").hide()
    }, 2e3)
}
,
_upload.getItemTpl = function(n) {
    var t = n.relativePath ? n.relativePath : "";
    return '\t<div class="upload-progress-mask" style="width:0%;"></div>\t<div class="upload-item-wrap" >\t\t<table width="100%" height="100%" cellpadding="0" cellspacing="0" style="table-layout:fixed">\t\t<tr><td width="55%" valign=""><div class="upload-item filename" title="' + (t + n.name) + '">' + (t + n.name) + '</div></td>\t\t<td width="15%"><div class="upload-item filesize">' + (n.size ? formatSize(n.size) : "") + '</div></td>\t\t <td width="25%"><div class="upload-item percent">0%</div> </td>\t\t<td><button type="button" class="upload-cancel close"><i class="glyphicon glyphicon-remove"</i></button></td>\t\t</tr></table>\t</div>'
}

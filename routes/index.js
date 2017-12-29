
/*
 * GET home page.
 */
var pins = [{
    id:1,
    username:'czc555',
    url:'http://i.huffpost.com/gen/1155836/images/o-AWESOME-GIFS-facebook.jpg',
    title:'Skating Turtle',
    hasDelete: false
},
{
    id:2,
    username:'czc555',
    url:'http://www.wedoboxes.co.uk/ekmps/shops/boxesformoves/resources/Design/once-used-medium-box-21-p.png',
    title:'Skating Turtle',
    hasDelete: false
},
{
    id:3,
    username:'czc555',
    url:'http://www.wedoboxes.co.uk/ekmps/shops/boxesformoves/resurces/Design/once-used-medium-box-21-p.png',
    title:'Skating Turtle',
    hasDelete: false
}];

exports.index = function(req, res) {
  res.render('index', { title: '图钉', pins: pins.filter(function(val){return !val.hasDelete;}), message: req.flash('info'), user:req.user});
};

exports.my = function(req, res) {
  res.render('my', { title: '我的图钉', pins: pins.filter(function(val){return !val.hasDelete && val.username==req.user.username;}), message: req.flash('info'), user:req.user});
};

exports.user = function(req, res) {
    var username = req.params.username;
    res.render('index', { title: username + '的图钉' , message: req.flash('info'), user:req.user, pins: pins.filter(function(val){return !val.hasDelete && val.username==username;})});
};

exports.add = function(req, res) {
  res.render('add', { title: '添加图钉' , message: req.flash('info'), user:req.user});
};

exports.create = function(req, res) {
    var title = req.body.title;
    var url = req.body.url;
    if (title == '') {
        req.flash('info', '标题不能为空');
        return res.redirect('/add');
    }
    if (url == '') {
        req.flash('info', '图片网址不能为空');
        return res.redirect('/add');
    }
    pins.push({
        id:pins.length+1,
        username: req.user.username,
        title: title,
        url: url,
        hasDelete: false
    });
    console.log(pins);
    req.flash('info', '图钉添加成功');
    res.redirect('/');
};

exports.delete = function(req, res) {
    var pin = req.params.pin;
    var find = false;
    for (var i=0;i<pins.length;i++) {
        if (pins[i].id == pin) {
            pins[i].hasDelete = true;
            find = true;
            break;
        }
    }
    if (!find) {
        req.flash('info', '图钉删除失败');
        res.redirect('/my');
    } else {
        req.flash('info', '图钉删除成功');
        res.redirect('/my')
    }
};
var myLogger = function (req, res, next) {
  //console.log(req.session.id);
 console.log('body', req.body);
 console.log('query', req.query);
 console.log('params', req.params);
 console.log('path', req.path);
  //console.log(req.session);
  //var sess = req.session;
  //if (sess.views) {
  //  sess.views++;
  //  console.log('views: ' + sess.views );
  //  console.log('expires in: ' + (sess.cookie.maxAge ) );
  //} else {
  //  sess.views = 1;
  //  console.log('welcome to the session demo. refresh!')
  //}

  next();
};

module.exports = myLogger;
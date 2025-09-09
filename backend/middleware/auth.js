const jwt = require('jsonwebtoken');

function auth(req, res, next) {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
}

function admin(req, res, next) {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ msg: 'Access denied' });
  }
  next();
}

function hr(req, res, next) {
  if (req.user.role !== 'hr') {
    return res.status(403).json({ msg: 'Access denied' });
  }
  next();
}

function employee(req, res, next) {
  if (req.user.role !== 'employee') {
    return res.status(403).json({ msg: 'Access denied' });
  }
  next();
}

module.exports = { auth, admin, hr, employee };
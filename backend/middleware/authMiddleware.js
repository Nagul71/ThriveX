import jwt from 'jsonwebtoken';

export const protect = (req, res, next) => {
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach the user object to the request
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};
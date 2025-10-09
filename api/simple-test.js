module.exports = function handler(req, res) {
  res.status(200).json({ 
    message: 'Simple test endpoint working!',
    method: req.method,
    timestamp: new Date().toISOString()
  });
}

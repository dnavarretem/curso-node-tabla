const { response } = require('express');


const validarArchivo = (req, res = response, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({ 
      msg: 'No files were uploaded.' 
    });
  }
  next();
}

module.exports = {
  validarArchivo
}
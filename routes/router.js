const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'..','public','1.html'));
})

module.exports = router;
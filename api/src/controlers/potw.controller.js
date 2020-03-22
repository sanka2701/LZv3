const express = require('express');
const formidable = require('formidable');

const router = express.Router();

router.post('/potw',  (req, res) => {
    new formidable.IncomingForm().parse(req)
        .on('field', (name, field) => {
            console.log('Field', name, field)
        })
        .on('fileBegin', (name, file) => {
            let path = `${process.env.UPLOADS_DIR}/${file.name}`;
            console.log('File folder', path);
            file.path = path;
        })
        .on('file', (name, file) => {
            console.log('Uploaded file:', name)
        })
        .on('end', () => {
            res.end()
        });
});

// router.get('/tags', async (req, res) => {
//     const tags = await Tag.find();
//     res.json({ tags });
// });


module.exports = router;
const express = require('express');
const router = express.Router();
//import path from 'path';
//const __dirname = path.resolve();

router.get('/add?:type', async function (req, res) {
    try {
        const type = await Type.findOne({ title: req.query.type });

        res.render('auto/add-auto', {
            auto: new auto(),
            type: type,
        });
    } catch (e) {
        console.error(e);
        res.redirect('/');
    }
});

router.get('/:id', async (req, res) => {
    try {
        const auto = await Auto.findById(req.params.id);
        const type = await Type.findById(auto.type);
        if (auto == null) res.redirect('/');
        res.render('auto/view-auto', { auto: auto, type: type });
    } catch {
        res.redirect('/');
    }
});

router.get('/:id/edit', async (req, res) => {
    try {
        const auto = await auto.findById(req.params.id);
        if (auto == null) res.redirect('/');

        const type = await type.findById(auto.type);

        res.render('auto/edit-auto', {
            auto: auto,
            type: type,
        });
    } catch (e) {
        console.error(e);
        res.redirect('/');
    }
});

router.post('/', async (req, res) => {
    let auto = new auto({
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
    });

    try {
        const type = await type.findById(req.body.type);
        auto.type = type;
        auto = await auto.save();
        res.redirect(`/types/${req.body.type}`);
    } catch (e) {
        console.error(e);
        res.render('auto/add-auto', {
            auto: auto,
            type: req.body.type,
        });
    }
});

router.put('/:id', async (req, res) => {
    const auto = auto.findById(req.params.id);

    try {
        await auto.updateOne(
            { _id: req.params.id },
            {
                title: req.body.title,
                description: req.body.description,
                price: req.body.price,
            },
        );
        res.redirect(`/auto/${req.params.id}`);
    } catch (e) {
        console.error(e);
        res.render('auto/edit-type', {
            auto: auto,
            type: auto.type,
        });
    }
});

router.delete('/:id', async (req, res) => {
    await auto.findByIdAndDelete(req.params.id);
    res.redirect('/');
});
module.exports = router;
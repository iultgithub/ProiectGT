const express = require('express');
const router = express.Router();
//const { type, auto } = require('./../models/auto');

router.get('/add', function (_, res) {
    res.render('types/add-type', {
        auto: null,
        type: new Type(),
    });
});

router.get('/:id', async (req, res) => {
    try {
        const type = await Type.findById(req.params.id);
        if (type == null) res.redirect('/');

        const auto = await Auto.find({ type: type });

        res.render('types/view-type', {
            type: type,
            auto: auto,
        });
    } catch (e) {
        console.error(e);
        res.redirect('/');
    }
});

router.get('/:id/edit', async (req, res) => {
    try {
        const type = await Type.findById(req.params.id);
        if (type == null) res.redirect('/');

        res.render('types/edit-type', {
            auto: null,
            type: type,
        });
    } catch (e) {
        console.error(e);
        res.redirect('/');
    }
});

router.post('/', async (req, res) => {
    let type = new type({
        title: req.body.title,
    });

    try {
        type = await Type.save();
        res.redirect(`/types/${type.id}`);
    } catch (e) {
        console.error(e);
        res.render('types/add-type', {
            auto: null,
            type: type,
        });
    }
});

router.put('/:id', async (req, res) => {
    try {
        await Type.findOneAndUpdate(
            { _id: req.params.id },
            { title: req.body.title },
        );
        res.redirect(`/types/${req.params.id}`);
    } catch (e) {
        console.error(e);
        res.render('types/edit-type', {
            auto: null,
            type: type,
        });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const type = await Type.findById(req.params.id);
        await auto.deleteMany({ type: type.id });
        await type.deleteOne(type);
        res.redirect('/');
    } catch (e) {
        console.error(e);
        res.redirect(`/types/${type.id}`);
    }
});

module.exports = router;

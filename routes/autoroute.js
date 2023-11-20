const express = require('express');
const router = express.Router();
const { Auto, Type } = require('./../models/auto');
//import path from 'path';
//const __dirname = path.resolve();

router.get('/add', function (_, res) {
    res.render('auto/add-auto', {
        auto: new Auto(),
        type: new Type(),
    });
});


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
        const auto = await Auto.findById(req.params.id);
        if (auto == null) res.redirect('/');

        const type = await Type.findById(auto.type);

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
    let auto = new Auto({
        nrauto: req.body.nrauto,
        descriere: req.body.descriere,
        consum: req.body.consum,
    });

    try {
        const type = await Type.findById(req.body.type);
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
    const auto = Auto.findById(req.params.id);

    try {
        await auto.updateOne(
            { _id: req.params.id },
            {
                nrauto: req.body.nrauto,
                descriere: req.body.descriere,
                consum: req.body.consum,
            },
        );
        res.redirect(`/autoroute/${req.params.id}`);
    } catch (e) {
        console.error(e);
        res.render('auto/edit-type', {
            auto: auto,
            type: auto.type,
        });
    }
});

router.delete('/:id', async (req, res) => {
    await Auto.findByIdAndDelete(req.params.id);
    res.redirect('/');
});
module.exports = router;
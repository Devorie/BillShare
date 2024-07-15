const router = require('express').Router();
const db = require('../db/index');

router.post('/addperson', async (req, res) => {
    await db.addPerson(req.body);
    res.json({ status: 'ok' });
});

router.get('/getallpeople', async (req, res) => {
    res.json(await db.getPeople());
})

router.post('/addbill', async (req, res) => {
    await db.addBill(req.body);
    res.json({ status: 'ok' });
});

router.get('/getallbills', async (req, res) => {
    res.json(await db.getBills());
})

router.get('/getbilldetails', async (req, res) => {
    res.json(await db.getWithPeople(req.query.id));
})

module.exports = router;
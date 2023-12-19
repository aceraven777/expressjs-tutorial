const { Router } = require('express');

const router = Router();

const groceryList = [
    {
        item: 'milk',
        quantity: 2,
    },
    {
        item: 'cereal',
        quantity: 1,
    },
    {
        item: 'pop-tarts',
        quantity: 1,
    },
];

router.get('/', (req, res) => {
    res.send(groceryList);
});

router.post('/', (req, res) => {
    groceryList.push(req.body);
    res.send(201);
});

router.get('/:item', (req, res) => {
    const { item } = req.params;
    const groceryItem = groceryList.find((g) => g.item === item);
    res.send(groceryItem);
});

module.exports = router;
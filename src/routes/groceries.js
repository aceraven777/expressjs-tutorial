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
    res.cookie('visited', true, {
        maxAge: 60000,
    });
    res.send(groceryList);
});

router.post('/', (req, res) => {
    groceryList.push(req.body);
    res.send(201);
});

router.get('/:item', (req, res) => {
    console.log(req.cookies);
    const { item } = req.params;
    const groceryItem = groceryList.find((g) => g.item === item);
    res.send(groceryItem);
});

router.get('/shopping/cart', (req, res) => {
    const { cart } = req.session;
    
    if (! cart) {
        res.send('You have no cart session');
        return;
    }

    res.send(cart);
});

router.post('/shopping/cart/item', (req, res) => {
    const { item, quantiry } = req.body;
    const cartItem = { item, quantity };
    const { cart } = req.session;
    
    if (! cart) {
        req.session.cart = {
            items: [],
        };
    }
    
    req.session.cart.items.push(cartItem);

    res.send(201);
});

module.exports = router;
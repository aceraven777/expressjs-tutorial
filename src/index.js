const express = require('express');

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(express.urlencoded());

app.use((req, res, next) => {
    console.log(`${req.method}:${req.url}`);
    next();
});

app.listen(PORT, () => console.log(`Running Express Server on Port ${PORT}!`));

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

app.get('/groceries', (req, res) => {
    res.send(groceryList);
});

app.post('/groceries', (req, res) => {
    groceryList.push(req.body);
    res.send(201);
});

app.get('/groceries/:item', (req, res) => {
    const { item } = req.params;
    const groceryItem = groceryList.find((g) => g.item === item);
    res.send(groceryItem);
});

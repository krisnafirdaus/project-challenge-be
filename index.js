const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

let users = [];

app.get('/users', (req, res) => {
    res.json(users);
});

app.post('/users', (req, res) => {
    const { username, firstName, lastName } = req.body;

    const existingUser = users.find(u => u.username === username);
    if (existingUser) {
        return res.status(400).json({ message: 'Username already exists' });
    }

    users.push({ username, firstName, lastName });
    res.status(201).json({ message: 'User created' });
});

app.put('/users/:username', (req, res) => {
    const { username } = req.params;
    const { firstName, lastName } = req.body;
    const user = users.find(u => u.username === username);
    if (user) {
        user.firstName = firstName;
        user.lastName = lastName;
        res.json({ message: 'User updated' });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

app.delete('/users/:username', (req, res) => {
    const { username } = req.params;
    users = users.filter(u => u.username !== username);
    res.json({ message: 'User deleted' });
});

app.listen(3001, () => {
    console.log('Server started on http://localhost:3001');
});
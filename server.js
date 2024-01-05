import express from 'express';


const app = express();

app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

// Hanlde GET request to fetch users
app.get('/users', (req, res) => {
    setTimeout(async () => {
        const limit = req.query.limit;
        const response = await fetch(`https://jsonplaceholder.typicode.com/users?_limit=${limit}`);
        const users = await response.json();
        res.send(`
        <h1 class="text-center">Users</h1>
        <ul>
            ${users.map(user => `<li>${user.name}</li>`).join('')} 
        </ul>
    `);
    }, 2000);
});

// Handle POST request to convert units
app.post('/convert', (req, res) => {
    const { farenheit } = req.body;
    const celcius = (farenheit - 32) * 5 / 9;
    setTimeout(() => res.send(`<p>${farenheit} degrees Farenheit is equal to ${celcius} degrees celsius</p>`), 2000);
});

let vote = 0
// Handle poll request
app.get('/poll', (req, res) => {
    vote++;
    res.send(`<p>You voted for ${vote}</p>`);
});

// Handle POST request to search for a user
app.post('/search', (req, res) => {
    const { name } = req.body;
    setTimeout(() => res.send(`<p>You searched for ${name}</p>`), 2000);
});


app.listen(3000, () => console.log('Server listening on port 3000'));
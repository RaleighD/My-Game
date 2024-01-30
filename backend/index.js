const app = require('./server');

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


console.log("Good morning Vietnam!")
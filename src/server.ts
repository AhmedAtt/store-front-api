import express from 'express';
import db from './database';
import routes from './routes/index.route';

const app = express();
const port = 3000

app.use(express.json());
app.use(routes);

db.connect().then(() => {
    console.log('Database connected');
}).catch((err) => {
    console.log(err);
});
app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
});


export default app;
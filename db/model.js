import mongoose from 'mongoose';
import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import cors from 'cors';
import jsonwebtoken from 'jsonwebtoken';

var mongoDB =
    'mongodb+srv://vijay:1234@cluster0.mcuqt.mongodb.net/MCQ?retryWrites=true&w=majority';
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;

const app = express();
app.use(cors());
app.use(express.json());
app.use('/public', express.static('public'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const petSchema = new mongoose.Schema({
    name: String,
    type: String,
    vaccinated: Boolean,
    description: String,
    image: String,
    color: String,
});
const Pet = mongoose.model('Pets', petSchema);

const usersSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    access: String,
});
const User = mongoose.model('User', usersSchema);

// var newPet = new Pet({
//     name: 'Dog',
//     type: 'Dog',
//     vaccinated: true,
//     description:
//         'A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it is the most popular of the four domestic animals.',
//     image: 'https://images.unsplash.com/photo-1588795909846-f9f8f9f8f9f8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
//     color: 'Black',
// });
// newPet.save(function (err, newUser) {
//     console.log(newPet);
// });

// app.get('/', (req, res) => {});

app.get('/checkAuth', (req, res) => {
    const token = req.headers.authorization;
    if (token) {
        jsonwebtoken.verify(token, 'secret', (err, decoded) => {
            if (err) {
                res.status(401).json({
                    success: false,
                    message: 'Failed to authenticate token.',
                });
            } else {
                res.status(200).json({
                    success: true,
                    message: 'Token is valid.',
                });
            }
        });
    } else {
        res.status(401).json({
            success: false,
            message: 'No token provided.',
        });
    }
});

app.post('/authenticate', (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        if (err) {
            res.json({
                success: true,
                message: 'Error',
            });
        } else if (!user) {
            res.json({
                success: true,
                message: 'User not found',
            });
        } else if (user.password != req.body.password) {
            res.json({
                success: true,
                message: 'Password is incorrect',
            });
        } else {
            var token = jsonwebtoken.sign(
                {
                    email: user.email,
                },
                'secret',
                { expiresIn: '1h' }
            );
            res.json({
                success: true,
                message: 'Authentication successful!',
                token: token,
            });
        }
    });
});

app.get('/', function (req, res) {
    res.send('<h1>Welcome to the Pet Store</h1>');
});
app.get('/pets', function (req, res) {
    Pet.find({}, function (err, pets) {
        if (err) {
            console.log(err);
        } else {
            res.send(pets);
        }
    });
});
app.get('/pets/:id', function (req, res) {
    Pet.findById(req.params.id, function (err, pet) {
        if (err) {
            console.log(err);
        } else {
            res.send(pet);
        }
    });
});

app.post('/pets', function (req, res) {
    console.log(req.body, 'req.body');
    var newPet = new Pet({
        name: req.body.name,
        type: req.body.type,
        vaccinated: req.body.vaccinated,
        description: req.body.description,
        color: req.body.color,
    });
    newPet.save(function (err, newUser) {
        if (err) {
            console.log(err);
        } else {
            res.send(newUser);
        }
    });
});

app.put('/pets/:id', function (req, res) {
    Pet.findByIdAndUpdate(req.params.id, req.body, function (err, pet) {
        if (err) {
            console.log(err);
        } else {
            res.send(pet);
        }
    });
});

app.delete('/pets/:id', function (req, res) {
    Pet.findByIdAndDelete(req.params.id, function (err, pet) {
        if (err) {
            console.log(err);
        } else {
            res.send(pet);
        }
    });
});
app.listen(3001, () => {
    console.log('Server is running on port 3001');
});

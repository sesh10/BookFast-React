const express = require('express');
const router = express.Router();
const Rental = require('../model/rental');
const UserCtrl = require('../controllers/user');
const { normalizeErrors } = require('../helper/mongoose');
const User = require('../model/user');

router.get('/secret', UserCtrl.authMiddleware, function (req, res) {
    res.json({"secret": true});
});

router.get('/manage', UserCtrl.authMiddleware, function (req, res) {
    const user = res.locals.user;

    Rental.where({user}).populate('bookings').exec(function (err, foundRentals) {
        if (err) {
            return res.status(422).send({errors: normalizeErrors(err.errors)});
        }

        return res.json(foundRentals);
    });
});

router.get('/:id', function (req, res) {
    const rentalId = req.params.id;
    
    Rental.findById(rentalId).populate('user', 'username -_id').populate('bookings', 'startAt endAt -_id').exec(function (err, foundRental) {
        if (err) {
            return res.status(422).send({errors: [{title: 'Rental Error', detail: 'Could not find rental'}]});
        }
        return res.json(foundRental);
    });   
});

router.delete('/:id', UserCtrl.authMiddleware, function (req, res) {
    const user = res.locals.user;
    Rental.findById(req.params.id).populate('user', '_id').populate({
        path: 'bookings',
        select: 'startAt',
        match: {startAt: {$gt: new Date()}}
    }).exec(function (err, foundRental) {
        if (err) {
            return res.status(422).send({errors: normalizeErrors(err.errors)});
        }

        if (user.id !== foundRental.user.id) {
            return res.status(422).send({errors: [{title: 'Invalid User', detail: 'You are not rental owner'}]});
        }

        if (foundRental.bookings.length > 0) {
            return res.status(422).send({errors: [{title: 'Active bookings', detail: 'Cannot delete rental with active bookings'}]});
        }

        foundRental.remove(function (err) {
            if (err) {
                return res.status(422).send({errors: normalizeErrors(err.errors)});
            }

            return res.json({'status': deleted});
        });
    });
});

router.post('', UserCtrl.authMiddleware, function (req, res) {
    const { title, city, street, category, image, shared, bedrooms, description, rate } = req.body;
    const user = res.locals.user;
    const rental = new Rental({ title, city, street, category, image, shared, bedrooms, description, rate });
    rental.user = user;

    Rental.create(rental, function (err, newRental) {
        if (err) {
            return res.status(422).send({errors: normalizeErrors(err.errors)});
        }

        User.updateMany({_id: user.id}, {$push: {rentals: newRental}}, function () {
            
        });

        return res.json(newRental);
    });
});

router.get('', function (req, res) {
    const city = req.query.city;
    const query = city ? {city: city.toLowerCase()} : {};

    Rental.find(query).select('-bookings').exec(function (err, foundRentals) {
        if (err) {
            return res.status(422).send({errors: normalizeErrors(err.errors)});
        }

        if (city && foundRentals.length === 0) {
            return res.status(422).send({errors: [{title: 'No such rentals found', detail: `There are no rentals for city ${city}`}]});
        }

        return res.json(foundRentals);       
    });
});

module.exports = router;
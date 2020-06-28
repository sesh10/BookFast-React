const Rental = require('./model/rental');
const User = require('./model/user');
const Booking = require('./model/booking');
const fakeDbData = require('./data.json');


class FakeDb {
    constructor() {
        this.rentals = fakeDbData.rentals;

        this.users = fakeDbData.users;
    }

    async cleanDb() {
        await User.deleteMany({});
        await Rental.deleteMany({});
        await Booking.deleteMany({});
    }

    pushDataToDb() {
        const user = new User(this.users[0]);
        const user1 = new User(this.users[1]);

        this.rentals.forEach((rental) => {
            const newRental = new Rental(rental);
            newRental.user = user;
            user.rentals.push(newRental);
            newRental.save();
        });
        user.save();
        user1.save();
    }

    async seedDb() {
        await this.cleanDb();
        this.pushDataToDb();
    }
}


module.exports = FakeDb;
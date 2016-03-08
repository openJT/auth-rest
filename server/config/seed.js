var User = require("../api/user/user.model");
var Client = require("../api/client/client.model");
var config = require("./environment");
var async = require('async');
var Product = require("../api/product/product.model");

var fakeProducts = [
    {
        name: "Boots",
        price: 200,
        quantity: 50,
        brand: "Sorel",
        origin: "Canada",
        returnable: true,
        rating: 5,
        description: ""
    },
    {
        name: "Underwear",
        price: 15,
        quantity: 500,
        brand: "Calvin Klein",
        origin: "U.S.A",
        returnable: false,
        rating: 5,
        description: ""
    },
    {
        name: "Television",
        price: 2000,
        quantity: 50,
        brand: "Panasonic",
        origin: "Japan",
        returnable: true,
        rating: 4,
        description: "60 inch"
    },
    {
        name: "Boots",
        price: 140,
        quantity: 350,
        brand: "Merrell",
        model: "Hicker V",
        origin: "U.S.A",
        returnable: true,
        rating: 4,
        description: ""
    },
    {
        name: "Headset",
        price: 300,
        quantity: 50,
        brand: "Sony",
        origin: "Japan",
        returnable: true,
        rating: 4,
        description: "Wireless"
    },
    {
        name: "Gloves",
        price: 15,
        quantity: 28,
        brand: "Isotoner",
        origin: "U.S.A",
        returnable: true,
        rating: 3,
        description: "Leather"
    }
];
var fakeClients = [
    {
        lastName: "Thompson",
        firstName: "Keisha",
        company: "WebBox",
        position: "Designer"
    },
    {
        lastName: "Calderon",
        firstName: "Tego",
        company: "Latin Grooves",
        position: "D.J."
    },
    {
        lastName: "Smith",
        firstName: "David",
        company: "Starbucks",
        position: "Barista"
    },
    {
        lastName: "Clown",
        firstName: "Bozo",
        company: "Bozo's Circus",
        position: "Boss"
    },
    {
        lastName: "Carrera",
        firstName: "Steve",
        company: "B.V.T. International",
        position: "Manager"
    },
    {
        lastName: "Dedeyan",
        firstName: "Astor",
        company: "Marjor Corp.",
        position: "Engineer"
    },
    {
        lastName: "Greene",
        firstName: "Ray",
        company: "Home Brews",
        position: "Brewer"
    }
];
User.find({}).remove(function () {
    User.create({
        provider: "local",
        role: "user",
        name: "john",
        email: "john@doe.com",
        password: "johnnyd"
    }, function (err, user) { })
});
function reset() {
    Client.find({}).remove(function () {
        async.each(fakeClients, function (clientData, callback) {
            var client = new Client({
                lastName: clientData.lastName,
                firstName: clientData.firstName,
                company: clientData.company,
                position: clientData.position
            });
            client.save(function (err, item) {
                if (err) {
                    console.log(err);
                }
                callback();
            });
        });
    });
    Product.find({}).remove(function () {
        async.each(fakeProducts, function (productData, callback) {
            var product = new Product({
                name: productData.name,
                price: productData.price,
                quantity: productData.quantity,
                brand: productData.brand,
                origin: productData.origin,
                returnable: productData.returnable,
                rating: productData.rating,
                description: productData.description
            });
            product.save(function (err, item) {
                if (err) {
                    console.log(err);
                }
                callback();
            });
        });
    });
}
reset();

exports.seed = function () {
    reset();
}
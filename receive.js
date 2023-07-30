const amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function(error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function(error1, channel) {
        if (error1) {
            throw error1;
        }

        const queue = 'hello';

        channel.assertQueue(queue, {
            durable: false
        });

        console.log(" Waiting for messages  from ", queue);

        channel.consume(queue, function(msg) {
            console.log(" !! Received  = ", msg.content.toString());
        }, {
            noAck: true
        });
    });
});
const amqp = require('amqplib');

amqp.connect('amqp://localhost')
    .then(conn => {
        return conn.createChannel().then(ch => {
            const ok = ch.assertQueue('Nama', { durable: false });
            console.log('Mencari Nama!'); // Pindahkan pesan sebelum ch.consume()
            ok.then(() => {
                return ch.consume('Nama', msg => console.log('Nama Masuk : ', msg.content.toString()), { noAck: true });
            });
        });
    }).catch(console.warn);

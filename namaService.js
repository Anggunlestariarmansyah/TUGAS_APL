const amqp = require('amqplib')

console.log('Masukan Nama: ')
process.stdin.once('data', (chunk) => {
    let Nama = chunk.toString().trim()
    console.log('Pesan Terkirim : ' + Nama + '|')
    
    amqp.connect('amqp://localhost')
        .then(conn => {
            return conn.createChannel().then(ch => {
                const q = 'Nama'
                const msg = Nama
                const ok = ch.assertQueue(q, { durable: false })
                return ok.then(() => {
                    ch.sendToQueue(q, Buffer.from(msg))
                    return ch.close()
                }).finally(()=> conn.close())
            }).catch(console.warn)
        })

})
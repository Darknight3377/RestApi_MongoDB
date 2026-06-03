const dns = require('dns');
console.log(dns.getServers());

dns.resolveSrv(
  '_mongodb._tcp.cluster0.vb8n8hu.mongodb.net',
  (err, records) => {
    console.log('Error:', err);
    console.log('Records:', records);
  }
);
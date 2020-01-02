/*global describe, it */
var server;

describe('MQTT Proxy Test Case', function () {
    describe('server', function () {
        it('start the service', function (done) {
            server = require('../server');
            done();
        });
    });
});

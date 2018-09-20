import { Port } from '/conduit.js';

let port = new Port('panel');

port.send({
  type: 'greeting',
  text: 'hello from panel'
});

port.send({

})

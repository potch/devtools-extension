import { Dispatcher } from '/conduit.js';

let port = new Dispatcher();

browser.runtime.onConnect.addListener(port.connectHandler);

port.on('panel', m => console.log('panel says: ', m));
port.on('panel.greeting', m => console.log('greetings from panel: ', m.text));

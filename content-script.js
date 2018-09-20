console.log('content script on duty');

let port = browser.runtime.connect({ name: 'content' });

port.onMessage.addListener(m => {
  switch (m.type) {
    case 'greeting':
      console.log('greetings', m.text);
      break;
    default:
      console.log(m);
  }
});

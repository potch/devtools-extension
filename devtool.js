const panels = browser && browser.devtools && browser.devtools.panels;

console.log('tool on the scene');

if (panels) {
  panels.create(
    "Extension",
    "/panel-icon.svg",
    "/devtools-panel.html"
  ).then((newPanel) => {
  });
}

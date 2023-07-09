export default async function promiseClick(button) {
  return new Promise(function(resolve) {
    button.addEventListener('click', e => {
      resolve(e);
    }, {
      once: true
    });
  });
}

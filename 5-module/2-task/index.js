function toggleText() {
  if (document.querySelector('.toggle-text-button') && document.getElementById('text')) {
    const toggleAttribute = () => {
      document.getElementById('text').hidden = !document.getElementById('text').hidden;
    };

    document.querySelector('.toggle-text-button').addEventListener('click', toggleAttribute);
  }
}

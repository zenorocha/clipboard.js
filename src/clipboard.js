function clipboard() {
  return {
    copy: (input) => {
      const isRTL = document.documentElement.getAttribute('dir') == 'rtl';

      const fakeElem = document.createElement('textarea');
      // Prevent zooming on iOS
      fakeElem.style.fontSize = '12pt';
      // Reset box model
      fakeElem.style.border = '0';
      fakeElem.style.padding = '0';
      fakeElem.style.margin = '0';
      // Move element out of screen horizontally
      fakeElem.style.position = 'absolute';
      fakeElem.style[isRTL ? 'right' : 'left'] = '-9999px';
      // Move element to the same position vertically
      let yPosition = window.pageYOffset || document.documentElement.scrollTop;
      fakeElem.style.top = `${yPosition}px`;

      fakeElem.setAttribute('readonly', '');
      fakeElem.value = input;

      document.body.append(fakeElem);

      fakeElem.select();

      return document.execCommand('copy');
    },
  };
}
export default clipboard();

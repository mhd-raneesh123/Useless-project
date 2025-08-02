chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: () => {
      function getVisibleText() {
        let walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
          acceptNode: node => {
            return node.parentNode.offsetParent !== null ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
          }
        });
        let text = '';
        while (walker.nextNode()) {
          text += walker.currentNode.nodeValue + ' ';
        }
        return text.trim();
      }

      function reverseText(text) {
        return text.split('').reverse().join('');
      }

      let text = getVisibleText();
      let reversed = reverseText(text);

      let utterance = new SpeechSynthesisUtterance(reversed);
      utterance.lang = 'en-US';
      utterance.rate = 1;
      speechSynthesis.cancel();
      speechSynthesis.speak(utterance);
    }
  });
});

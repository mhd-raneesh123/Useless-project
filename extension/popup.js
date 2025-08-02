function executeInTab(func) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs[0]) {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        func: func
      });
    }
  });
}

document.getElementById("read-all").addEventListener("click", () => {
  executeInTab(() => {
    const text = document.body.innerText;
    const reversed = text.split('').reverse().join('');
    const utterance = new SpeechSynthesisUtterance(reversed);
    utterance.lang = 'en-US';
    speechSynthesis.speak(utterance);
  });
});

document.getElementById("read-selected").addEventListener("click", () => {
  executeInTab(() => {
    const selection = window.getSelection().toString();
    if (selection) {
      const reversed = selection.split('').reverse().join('');
      const utterance = new SpeechSynthesisUtterance(reversed);
      utterance.lang = 'en-US';
      speechSynthesis.speak(utterance);
    } else {
      alert("No text selected.");
    }
  });
});

document.getElementById("stop").addEventListener("click", () => {
  executeInTab(() => {
    speechSynthesis.cancel();
  });
});

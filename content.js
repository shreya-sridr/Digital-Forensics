window.addEventListener("load", wait, false);

function wait()
{
  setTimeout(initScan, 500);
}

function initScan()
{
  var bodyContent = document.getElementsByTagName("body")[0].textContent;
  
  var key = new RegExp('\u{200C}|\u{200E}|\u{2060}|\u{180E}');
  var res = key.test(bodyContent);
  if (res)
  {
    var izs1p2 = false;
    var nodeList = document.querySelectorAll("p, h1, h2, h3, h4, h5, h6");
    for (var i = nodeList.length - 1; i > 0; i--)
    {
      var innerContent = nodeList[i].textContent;
      var innerRes = key.test(innerContent);
      if (innerRes)
      {
        var stripped = innerContent.replace(/[^\u200B\u200C\u200D\u2060\u00AD\uFEFF\u200E\u180E]/g, "");
        if (stripped.substring(0, 6) === "\u{200C}\u{200E}\u{FEFF}\u{00AD}\u{200D}\u{FEFF}")
        {
          izs1p2 = true;
          var para = document.createElement("p");
          var node = document.createTextNode("This block contains hidden text.");
          if (nodeList[i].outerHTML.substring(0, 2) === "<h")
          {
            nodeList[i].setAttribute("id", "zerosight-1p2-node");
            nodeList[i].setAttribute("class", "cancel");
          }
          else
          {
            nodeList[i].setAttribute("id", "zerosight-1p2-node");
          }
          para.setAttribute("id", "zerosight-notice");
          para.appendChild(node);
          nodeList[i].appendChild(para);
        }
        else
        {
          var para = document.createElement("p");
          var node = document.createTextNode("NOTICE: Zero Width Character(s) spotted in this block.");
          if (nodeList[i].outerHTML.substring(0, 2) === "<h")
          {
            nodeList[i].setAttribute("id", "zerosight-pre-node");
            nodeList[i].setAttribute("class", "cancel");
            node = document.createTextNode("NOTICE: Zero Width Character(s) spotted in this header.");
          }
          else
          {
            nodeList[i].setAttribute("id", "zerosight-pre-node");
          }
          para.setAttribute("id", "zerosight-notice");
          para.appendChild(node);
          nodeList[i].appendChild(para);
        }
      }
    }
    if (izs1p2 === true)
    {
      var div = document.createElement('div');
      var buttonsSpan = document.createElement('span');
      var textSpan = document.createElement('span');
      var btn = document.createElement("button");
      var quitbtn = document.createElement("button");
      div.setAttribute("id", "zerosight-div");
      buttonsSpan.setAttribute("id", "zerosight-buttons-span");
      textSpan.setAttribute("id", "zerosight-text-span");
      btn.setAttribute("id", "zerosight-button");
      btn.setAttribute("class", "pure-button pure-button-primary");
      btn.setAttribute("href", "#");
      quitbtn.setAttribute("id", "zerosight-button-quit");
      quitbtn.setAttribute("class", "pure-button");
      quitbtn.setAttribute("href", "#");
      textSpan.textContent = 'Blocks highlighted in blue contain hidden text';
      btn.innerHTML = "deobfuscate";
      quitbtn.innerHTML = "X";
      buttonsSpan.appendChild(btn);
      buttonsSpan.appendChild(quitbtn);
      div.appendChild(textSpan);
      div.appendChild(buttonsSpan);
      document.body.appendChild(div);
      var inlineScript = document.createElement('script');
      inlineScript.src = browser.runtime.getURL('inlineScript.js');
      inlineScript.onload = function()
      {
        this.remove();
      };
      document.head.appendChild(inlineScript);
    }
  }
}
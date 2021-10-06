setInterval(() => {
  posts = document.querySelectorAll('div[class="post-code"]');
  posts.forEach((elem) => {
    if (!elem.querySelector('div[data-copy="true"]')) {
      const div = divCreate();

      div.addEventListener("click", (event) => {
        
        let content = elem.querySelector('div[class="hljs"] > code').textContent 
        let language = elem.querySelector('span[class="post-code__language"]').textContent.trim().toLowerCase()
        
        navigator.clipboard.writeText(
          sanatization(content, language).trim();
        );
      });

      elem.querySelector('span[class="post-code__language"]').append(div);
    }
  });
}, 1000);

function divCreate() {
  const div = document.createElement("div");
  div.style.width = "40px";
  div.style.height = "15px";
  div.style.background = "red";
  div.setAttribute("id", Date.now());
  div.style.backgroundColor = "red";
  div.style.zIndex = 100;
  div.setAttribute("data-copy", "true");

  return div;
}


function sanatization(content, language){
  switch(language){
    case 'bash':{
      if(content.indexOf('$') == 0){
        return content.replace('$', '');
      }
    }

    default: {
      return content;
      break;
    }
  }
}
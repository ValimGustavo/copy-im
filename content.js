setInterval(() => {
  let id = 11111111111111111111111;
  posts = document.querySelectorAll('div[class="post-code"]');
  posts.forEach((elem) => {
    if (!elem.querySelector('div[data-copy="true"]')) {
      const div = document.createElement("div");
      div.style.width = "40px";
      div.style.height = "15px";
      div.style.background = "red";
      id++;
      div.setAttribute("id", id);
      div.style.backgroundColor = "red";
      div.style.zIndex = 100;
      div.setAttribute("data-copy", "true");
      
      div.addEventListener("click", (event) => {
        navigator.clipboard.writeText(
          elem.querySelector('div[class="hljs"] > code').textContent
        );
      });

      elem.querySelector('span[class="post-code__language"]').append(div);
    }
  });
}, 1000);

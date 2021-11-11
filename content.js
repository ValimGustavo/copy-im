let lastUpdatePostNumber = 0;
class Events {
  events = {};

  add(eventName, cb) {
    if (this.events[eventName]) {
      this.events[eventName].push(cb);
    } else {
      this.events[eventName] = [cb];
    }
  }

  emit(eventName, ...params) {
    if (this.events[eventName]) {
      const cbs = this.events[eventName];
      for (const cb of cbs) {
        console.log("running callback");
        cb(...params);
      }
    }
  }
}

const eventEmitter = new Events();

eventEmitter.add("change", (posts) => {
  posts.forEach((elem) => {
    if (!elem.querySelector('div[data-copy="true"]')) {
      const div = divCreate();

      div.addEventListener("click", (event) => {
        let content = elem.querySelector(
          'div[class="hljs"] > code'
        ).textContent;

        let language = elem
          .querySelector('span[class="post-code__language"]')
          .textContent.trim()
          .toLowerCase();

        navigator.clipboard.writeText(sanitization(content, language).trim());
      });

      elem.querySelector('span[class="post-code__language"]').append(div);
    }
  });
});

function getMessagesCodeType() {
  return document.querySelectorAll('div[class="post-code"]');
}

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

function sanitization(content, language) {
  switch (language) {
    case "bash": {
      if (content.indexOf("$") == 0) {
        return content.replace("$", "");
      }
    }

    default: {
      return content;
      break;
    }
  }
}

setTimeout(() => {
  console.log('AAAAAAAAAAAAAA')
  input = document.getElementById('post_textbox')

  toggle = new DOMParser().parseFromString('<button type="button" width="250px" height="250px" id="toggleInput" class="style--none post-action">A</button>', 'text/xml').documentElement
  
  toggle.addEventListener('click', (e) => {
   input.disabled = !input.disabled
   button = document.getElementById('toggleInput')
   button.innerHTML  = input.disabled ? 'D' : 'A'
  })
  
  actions = document.querySelector('span[class="post-body__actions"]')
  
  actions.appendChild(toggle)
}, 5000)


setInterval(() => {
  posts = document.querySelectorAll('div[class="post-code"]');
  const postNumber = posts.length;

  if (postNumber != lastUpdatePostNumber) {
    lastUpdatePostNumber = postNumber;
    eventEmitter.emit("change", posts);
  }
}, 1000);

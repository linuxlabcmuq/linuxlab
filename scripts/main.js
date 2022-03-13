const app = document.querySelector("#app");
const BASE_URL = "https://linuxlab-back-itk9y.ondigitalocean.app";
let signing = false;
const form_url =
  "https://docs.google.com/forms/d/e/1FAIpQLSdcE8KjkzscgDT471-BF5cWPMdyJ6FDXtE40yhBqLYxCTb5kA/viewform?usp=sf_link";

const commands = {
  about: {
    text: "Who are we and what are we doing?",
    action: async () => {
      console.log("Test");
      createText("A real computer scientist knows how to use unix.");
      createText(
        "During our major, we have only minor exposure to a unix environment and we want to change that!"
      );
      createText(
        "Our proposal is to have a computer lab whose machines have only linux, so we have no other choice but to learn how to use it!"
      );
      createText("If you support this idea, sign our petition!");
      createText(
        "(If you had trouble figuring it out how this webapp works, you should sign the petition!!)"
      );
    },
  },
  clear: {
    text: "Clear screen",
    action: async () => {
      document
        .querySelectorAll("p")
        .forEach((e) => e.parentNode.removeChild(e));
      document
        .querySelectorAll("section")
        .forEach((e) => e.parentNode.removeChild(e));
    },
  },
  help: {
    text: "See all commands.",
    action: async () => {
      for (const [key, { text }] of Object.entries(commands)) {
        if (key != "ls"){
          createCode(key, text);
        }
      }
    },
  },
  ls: {
    text: "I got you!",
    action: async () => {
      start();
      createText("Congrats, you found me, but really enter 'sign' command");
      stop();
    },
  },
  sign: {
    text: "Support our initiation - sign the petition by submitting the google form",
    action: async () => {
      start();
      createText("The google form will be opened in the new tab.");
      stop();
      await new Promise((r) => setTimeout(r, 1500));
      window.open(form_url, "_blank").focus();
      
    },
  },
};

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

app.addEventListener("keypress", async function (event) {
  if (event.key === "Enter") {
    await delay(150);
    await getInputValue();

    removeInput();
    await delay(100);
    new_line();
  }
});

app.addEventListener("click", function (event) {
  const input = document.querySelector("input");
  input.focus();
});

async function open_terminal() {
  createText("Welcome");
  await delay(700);
  createText("Starting the server...");
  await delay(800);
  createText("You can run several commands:");

  for (const [key, { text }] of Object.entries(commands)) {
    if (key != "ls"){
      createCode(key, text);
    }
  }

  await delay(500);
  new_line();
}

function new_line() {
  const p = document.createElement("p");
  const span1 = document.createElement("span");
  const span2 = document.createElement("span");
  p.setAttribute("class", "path");
  p.textContent = "# user";
  span1.textContent = " in";
  span2.textContent = " ~/linux_lab";
  p.appendChild(span1);
  p.appendChild(span2);
  app.appendChild(p);
  const div = document.createElement("div");
  div.setAttribute("class", "type");
  const i = document.createElement("i");
  i.setAttribute("class", "fas fa-angle-right icone");
  const input = document.createElement("input");
  div.appendChild(i);
  div.appendChild(input);
  app.appendChild(div);
  input.focus();
}

function removeInput() {
  const div = document.querySelector(".type");
  app.removeChild(div);
}

async function getInputValue() {
  const value = document.querySelector("input").value;
  if (commands.hasOwnProperty(value)) {
    trueValue(value);
    await commands[value].action();
  } else {
    falseValue(value);
    createText(`command not found: ${value}`);
  }
  window.scrollTo(0, app.scrollHeight);
}

function trueValue(value) {
  const div = document.createElement("section");
  div.setAttribute("class", "type2");
  const i = document.createElement("i");
  i.setAttribute("class", "fas fa-angle-right icone");
  const mensagem = document.createElement("h2");
  mensagem.setAttribute("class", "sucess");
  mensagem.textContent = `${value}`;
  div.appendChild(i);
  div.appendChild(mensagem);
  app.appendChild(div);
  window.scrollTo(0, app.scrollHeight);
}

function falseValue(value) {
  const div = document.createElement("section");
  div.setAttribute("class", "type2");
  const i = document.createElement("i");
  i.setAttribute("class", "fas fa-angle-right icone error");
  const mensagem = document.createElement("h2");
  mensagem.setAttribute("class", "error");
  mensagem.textContent = `${value}`;
  div.appendChild(i);
  div.appendChild(mensagem);
  app.appendChild(div);
  window.scrollTo(0, app.scrollHeight);
}

function createText(text, classname) {
  const p = document.createElement("p");

  p.innerHTML = text;
  app.appendChild(p);
  window.scrollTo(0, app.scrollHeight);
}

function createCode(code, text) {
  const p = document.createElement("p");
  p.setAttribute("class", "code");
  p.innerHTML = `${code} <br/><span class='text'> ${text} </span>`;
  app.appendChild(p);
  window.scrollTo(0, app.scrollHeight);
}

const stats = async () => {
  return axios
    .get(BASE_URL + "/stat")
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error);
      return { isSuccess: false, message: "Server error happened, sorry :(" };
    });
};

async function mobile() {
  createText("Welcome");
  await delay(700);
  createText("Starting the server...");
  await delay(800);
  falseValue("This mobile phone is not running Linux, so open it on your laptop!");
  await delay(1000);
  createText(`But you can submit a google form at <a class="formlink" href=${form_url}> link <a>`)
}

if (window.innerWidth < 700) {
  mobile();
} else{
  open_terminal();
}

const start = () => {
  setTimeout(function() {
      confetti.start()
  }, 1000); // 1000 is time that after 1 second start the confetti ( 1000 = 1 sec)
};

//  Stop

const stop = () => {
  setTimeout(function() {
      confetti.stop()
  }, 5000); // 5000 is time that after 5 second stop the confetti ( 5000 = 5 sec)
};
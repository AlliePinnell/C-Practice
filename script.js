let questionsCompleted = 0;
let currentShuffledOptions = [];

const questionCountSelect = document.getElementById("question-count");
let totalQuestions = 20; // default
const questionNumberEl = document.getElementById("question-number");


const questionPool = [
    {
        question: "[Chapter 1] What year was C++ first released?",
        options: ["1972", "1985", "1996", "2002"],
        answer: 1
    },
    {
        question: "[Chapter 1] Which of the following is NOT a reason to learn C++ today?",
        options: ["Speed", "Portability", "Limited job opportunities", "Scalability"],
        answer: 2
    },
    {
        question: "[Chapter 1] What type of applications is C++ commonly used for?",
        options: ["Web design only", "Embedded systems, games, and operating systems", "Spreadsheet macros", "Social media platforms"],
        answer: 1
    },
    {
        question: "[Chapter 1] What does an IDE like Visual Studio or Xcode provide?",
        options: ["Only a text editor", "Code completion, debugging, and compilation tools", "A database engine", "A web browser"],
        answer: 1
    },
    {
        question: "[Chapter 1] What happens when you press Ctrl+F5 in Visual Studio?",
        options: ["The project is deleted", "The project is compiled and run without debugging", "The project is saved to the cloud", "The project opens in Xcode"],
        answer: 1
    },
    {
        question: "[Chapter 1] Which of the following is a benefit of using an IDE like Visual Studio or Xcode?",
        options: ["Manual compilation", "Limited debugging tools", "Code completion and error detection", "No support for C++"],
        answer: 2
    },
    {
        question: "[Chapter 1] What does the 'Start Without Debugging' option in Visual Studio do?",
        options: ["Deletes the project", "Runs the project and closes the console immediately", "Compiles and runs the project, keeping the console open", "Opens the project in Xcode"],
        answer: 2
    },
    {
        question: "[Chapter 1] Which C++ standard introduced major modern features like auto and lambda expressions?",
        options: ["C++98", "C++03", "C++11", "C++17"],
        answer: 2
    },
    {
        question: "[Chapter 1] What is the purpose of the main() function in a C++ program?",
        options: ["To declare variables", "To define the program’s entry point", "To display errors", "To compile the code"],
        answer: 1
    },
    {
        question: "[Chapter 1] Which of the following is NOT a general-purpose programming language listed in the slides?",
        options: ["C", "C++", "Java", "Python"],
        answer: 3
    },
    {
        question: "[Chapter 2] Which function from the cmath header rounds a number to the nearest whole number?",
        options: ["round()", "ceil()", "floor()", "pow()"],
        answer: 0
    },
    {
        question: "[Chapter 2] What does the pow() function do in C++?",
        options: ["Returns the square root", "Rounds a number", "Raises a base to an exponent", "Finds the absolute value"],
        answer: 2
    },
    {
        question: "[Chapter 2] What is the purpose of the srand() function?",
        options: ["To generate a random number", "To seed the random number generator", "To round a number", "To simulate a dice roll"],
        answer: 1
    },
    {
        question: "[Chapter 2] What header file must be included to use the string class?",
        options: ["<iostream>", "<cmath>", "<string>", "<cstdlib>"],
        answer: 2
    },
    {
        question: "[Chapter 2] What does the getline() function do?",
        options: ["Reads a single word", "Reads a single character", "Reads an entire line of text", "Clears the input buffer"],
        answer: 2
    },
    {
        question: "[Chapter 2] What does the expression round(x * 100) / 100 accomplish?",
        options: ["Rounds x to the nearest whole number", "Rounds x to 1 decimal place", "Rounds x to 2 decimal places", "Rounds x to the nearest hundred"],
        answer: 2
    },
    {
        question: "[Chapter 2] What does the expression rand() % 6 + 1 simulate?",
        options: ["A coin flip", "A random number between 0 and 5", "A random number between 1 and 6", "A random number between 1 and 49"],
        answer: 2
    },
    {
        question: "[Chapter 2] What is the purpose of cin.ignore() after cin >> account_num?",
        options: ["To clear the screen", "To discard leftover newline characters", "To reset the input stream", "To ignore the next input"],
        answer: 1
    },
    {
        question: "[Chapter 2] What is the result of the string expression: first_name + ' ' + middle_initial + ' ' + last_name?",
        options: ["Concatenates first and last name only", "Creates a full name with middle initial", "Returns only the middle initial", "Throws a syntax error"],
        answer: 1
    },
    {
        question: "[Chapter 2] Which escape sequence represents a tab character?",
        options: ["\\n", "\\t", "\\r", "\\\\"],
        answer: 1
    },
    {
        question: "[Chapter 3] What does the == operator do in C++?",
        options: ["Assigns a value", "Checks for inequality", "Checks for equality", "Negates a Boolean expression"],
        answer: 2
    },
    {
        question: "[Chapter 3] Which of the following is a logical operator?",
        options: ["==", "&&", "++", "="],
        answer: 1
    },
    {
        question: "[Chapter 3] What is the result of tolower(choice) == 'y'?",
        options: ["True only if choice is 'y'", "True if choice is 'Y' or 'y'", "Always false", "True only if choice is 'Y'"],
        answer: 1
    },
    {
        question: "[Chapter 3] Which statement correctly uses a conditional operator?",
        options: ["if (x > 0) ? 1 : 0;", "x = (x > 0) ? 1 : 0;", "x ? x > 0 : 0;", "x = x > 0 : 1 ? 0;"],
        answer: 1
    },
    {
        question: "[Chapter 3] What is the purpose of a switch statement?",
        options: ["To compare strings", "To loop through values", "To select code based on a variable’s value", "To declare multiple variables"],
        answer: 2
    },
    {
        question: "[Chapter 3] What is the result of the expression (subtotal >= 100) ? .1 : .05?",
        options: ["It assigns .1 if subtotal is less than 100", "It assigns .05 if subtotal is greater than 100", "It assigns .1 if subtotal is at least 100, otherwise .05", "It always assigns .1"],
        answer: 2
    },
    {
        question: "[Chapter 3] Which statement best describes how C++ evaluates clauses in an if statement?",
        options: ["From bottom to top", "Randomly", "From top to bottom, stopping at the first true clause", "All clauses are evaluated regardless of condition"],
        answer: 2
    },
    {
        question: "[Chapter 3] What is the purpose of the break statement in a switch block?",
        options: ["To skip the current case", "To exit the switch block after a case is executed", "To continue to the next case", "To restart the switch block"],
        answer: 1
    },
    {
        question: "[Chapter 3] What happens if you omit the break statement in a switch case?",
        options: ["The program crashes", "The case is skipped", "Execution falls through to the next case", "The switch block ends immediately"],
        answer: 2
    },
    {
        question: "[Chapter 3] Which of the following is a valid use of a switch statement?",
        options: ["switch (subtotal > 100)", "switch (customer_type)", "switch (discount_percent > .1)", "switch (subtotal >= 100 ? 1 : 0)"],
        answer: 1
    },
        {
        question: "[Chapter 4] Which loop guarantees at least one execution of its body?",
        options: ["while loop", "do-while loop", "for loop", "infinite loop"],
        answer: 1
    },
    {
        question: "[Chapter 4] What is the correct syntax for a while loop?",
        options: ["while { condition }", "while (condition) { statements }", "loop while (condition)", "do while (condition)"],
        answer: 1
    },
    {
        question: "[Chapter 4] What does the continue statement do in a loop?",
        options: ["Ends the loop", "Skips the current iteration and jumps to the next", "Exits the program", "Repeats the last iteration"],
        answer: 1
    },
    {
        question: "[Chapter 4] Which arithmetic operator is unary?",
        options: ["+", "*", "++", "%"],
        answer: 2
    },
    {
        question: "[Chapter 4] What is the result of prefixing an increment operator (++x)?",
        options: ["Returns x before incrementing", "Returns x after incrementing", "Decrements x", "Multiplies x by 2"],
        answer: 1
    },
    {
        question: "[Chapter 4] What is the correct syntax for a for loop?",
        options: ["for (condition)", "for (initialization; condition; increment)", "for {initialization; condition; increment}", "loop (initialization; condition; increment)"],
        answer: 1
    },
    {
        question: "[Chapter 4] What is the result of the loop: for (int i = 8; i > 0; i -= 2)?",
        options: ["Adds 1 through 8", "Adds 8, 6, 4, 2", "Adds 2, 4, 6, 8", "Infinite loop"],
        answer: 1
    },
    {
        question: "[Chapter 4] Which loop structure is best for repeating until a user enters 'n'?",
        options: ["for loop", "while loop", "do-while loop", "switch statement"],
        answer: 2
    },
    {
        question: "[Chapter 4] What does a nested loop allow you to do?",
        options: ["Repeat a loop once", "Skip loop conditions", "Run one loop inside another", "Terminate all loops"],
        answer: 2
    },
    {
        question: "[Chapter 4] What is the purpose of the break statement in a loop?",
        options: ["Skip to the next iteration", "Exit the loop immediately", "Restart the loop", "Pause the loop"],
        answer: 1
    },
    {
        question: "[Chapter 5] What does cin.fail() check for?",
        options: ["End of file", "Successful input", "Invalid input operation", "Empty stream"],
        answer: 2
    },
    {
        question: "[Chapter 5] Which stream manipulator sets the number of decimal places?",
        options: ["setw()", "fixed", "setprecision()", "endl"],
        answer: 2
    },
    {
        question: "[Chapter 5] What does ios::app do when opening a file?",
        options: ["Reads from the file", "Overwrites the file", "Appends data to the file", "Closes the file"],
        answer: 2
    },
    {
        question: "[Chapter 5] What is the purpose of cin.ignore(numeric_limits<streamsize>::max(), '\\n')?",
        options: ["To reset the stream", "To discard all remaining input up to a newline", "To read a string", "To flush the output buffer"],
        answer: 1
    },
    {
        question: "[Chapter 5] Which file stream class allows both input and output?",
        options: ["ifstream", "ofstream", "fstream", "iostream"],
        answer: 2
    },
    {
        question: "[Chapter 5] What does the stream manipulator fixed do?",
        options: ["Displays numbers in scientific notation", "Rounds numbers to whole integers", "Displays floating-point numbers with fixed decimal places", "Clears the input stream"],
        answer: 2
    },
    {
        question: "[Chapter 5] Which stream manipulator forces trailing zeros?",
        options: ["setw()", "showpoint", "endl", "setprecision()"],
        answer: 1
    },
    {
        question: "[Chapter 5] What does the getline() function do when a newline character is left in the input stream?",
        options: ["Reads the next word", "Skips the newline", "Reads the newline as input", "Clears the stream"],
        answer: 2
    },
    {
        question: "[Chapter 5] What is the result of opening a file with ios::out | ios::trunc?",
        options: ["Appends data to the file", "Reads data from the file", "Deletes existing data and writes new data", "Opens the file in binary mode"],
        answer: 2
    },
    {
        question: "[Chapter 5] Which header file is required to use file stream classes like ifstream and ofstream?",
        options: ["<iostream>", "<fstream>", "<string>", "<limits>"],
        answer: 1
    },
    {
        question: "[Chapter 6] Which of the following is a fundamental data type in C++?",
        options: ["string", "vector", "double", "array"],
        answer: 2
    },
    {
        question: "[Chapter 6] What does the sizeof operator return?",
        options: ["The number of elements in a vector", "The size of a type or variable in bytes", "The length of a string", "The maximum value of a type"],
        answer: 1
    },
    {
        question: "[Chapter 6] What does the expression static_cast<int>(93.67) do?",
        options: ["Promotes 93.67 to a double", "Demotes 93.67 to an int", "Converts 93.67 to a string", "Rounds 93.67 to the nearest integer"],
        answer: 1
    },
    {
        question: "[Chapter 6] Which vector member function adds an element to the end of the vector?",
        options: ["push_back()", "insert()", "append()", "add()"],
        answer: 0
    },
    {
        question: "[Chapter 6] What happens when you access scores[3] in a vector with only 3 elements?",
        options: ["Returns the last element", "Throws an out-of-bounds error", "Returns 0", "Accesses an undefined value"],
        answer: 3
    },
    {
        question: "[Chapter 6] What does the expression vector<int> scores = {99, 87, 91}; do?",
        options: ["Creates a vector with 0 elements", "Creates a vector with 3 elements initialized to 0", "Creates a vector with 3 elements and assigns values", "Creates a string of scores"],
        answer: 2
    },
    {
        question: "[Chapter 6] Which string member function removes the last character?",
        options: ["pop_back()", "clear()", "erase()", "remove()"],
        answer: 0
    },
    {
        question: "[Chapter 6] What does the find_first_of() function do?",
        options: ["Finds the first character not in a set", "Finds the first matching character from a set", "Finds the last matching character", "Finds the first whitespace character"],
        answer: 1
    },
    {
        question: "[Chapter 6] What is the result of numeric_limits<int>::max()?",
        options: ["The smallest possible int", "The largest possible int", "The average int value", "The number of bytes in an int"],
        answer: 1
    },
    {
        question: "[Chapter 6] What does the expression name.substr(0, index) return?",
        options: ["The last character of name", "The full name string", "A substring starting at index", "A substring from the beginning up to index"],
        answer: 3
    },
    {
        question: "[Chapter 2] What is the output of this code?\n\ncout << round(10.315);",
        options: ["10", "10.3", "10.32", "11"],
        answer: 0
    },
    {
        question: "[Chapter 4] What is the output of this loop?\n\nint i = 1;\nwhile (i < 4) {\n  cout << i << ' ';\n  ++i;\n}",
        options: ["1 2 3", "1 2 3 4", "0 1 2 3", "2 3 4"],
        answer: 0
    },
    {
        question: "[Chapter 3] What is the output?\n\nint x = 5;\nint y = 10;\ncout << (x > y ? x : y);",
        options: ["5", "10", "true", "false"],
        answer: 1
    },
    {
        question: "[Chapter 6] What is the output?\n\nstring name = \"Grace\";\ncout << name[0];",
        options: ["G", "r", "Grace", "0"],
        answer: 0
    },
    {
        question: "[Chapter 5] What is the output?\n\ncout << fixed << setprecision(2) << 19.5;",
        options: ["19.5", "19.50", "19.500", "19"],
        answer: 1
    },
    {
        question: "[Chapter 2] What is the output?\n\ncout << \"Code: CPP\\nPrice: $49.50\";",
        options: ["Code: CPP Price: $49.50", "Code: CPP\nPrice: $49.50", "Code: CPP\\nPrice: $49.50", "CPP $49.50"],
        answer: 1
    },
    {
        question: "[Chapter 3] What is the output?\n\nint score = 105;\nif (score >= 0 && score <= 100)\n  cout << \"Valid\";\nelse\n  cout << \"Invalid\";",
        options: ["Valid", "Invalid", "Error", "Nothing"],
        answer: 1
    },
    {
        question: "[Chapter 4] What is the output?\n\nfor (int i = 1; i <= 3; ++i)\n  cout << i << ' ';",
        options: ["1 2 3", "0 1 2", "1 2 3 4", "2 3 4"],
        answer: 0
    },
    {
        question: "[Chapter 5] What is the output?\n\ncout << setw(6) << \"Hi\" << endl;",
        options: ["Hi", "    Hi", "Hi    ", "Error"],
        answer: 1
    },
    {
        question: "[Chapter 6] What is the output?\n\nvector<int> scores = {99, 87, 91};\ncout << scores.at(1);",
        options: ["99", "87", "91", "Error"],
        answer: 1
    }
];

const followUpMessages = [
  "Would you like me to generate another question for you?",
  "You should know this next one...",
  "Y'know, I think I do like animals in cages...",
  "Are all these questions the same colour? Wait... No I'm just seeing things...",
  "Let's get started! Yahoo!",
  "Let’s see what you’ve got next!",
  "you were AMAZINGU!!",
  "Hi Murad",
  "Jamari, did you know this one?",
  "Let's get rolling with the next question!",
  "Maretu, where are you?",
  "I'M BACK IN THE FUCKING BUILDING AGAIN",
  "Hint: Press X to doubt",
  "Hint: It's on paper",
  "Hint: It's on the board",
  "Hint: It's in your notes..wait you didn't make notes?",
  "Hi Owen (guess which one)",
  "Arby's Steak Nuggets huh? Notice the lack of raccoon's lately...",
  "Stop asking me to generate more questions you absolute unit",
  "I hope you're enjoying the quiz so far!",
  "Keep up the great work!",
    "You're doing fantastic!",
    "Wow you suck...or you don't, i don't know you",
    "This is fun, right?",
    "Did you know? The Eiffel Tower can be 15 cm taller during the summer.",
    "Fun fact: Honey never spoils. Archaeologists have found edible honey in ancient Egyptian tombs.",
    "Did you know? Octopuses have three hearts and blue blood.",
    "Fun fact: Bananas are berries, but strawberries aren't.",
    "Turkeys have unique personalities, just like dogs and cats. Some are social, and some are loners. People who live with turkeys in animal sanctuaries report that they even have varying tastes in music.",
    "Did you know? A group of flamingos is called a 'flamboyance'.",
    "Did you know? I'm failing this midterm!",
];


let selectedQuestions = [];
let current = 0;
let score = 0;
let timer;
let timeLeft = 30;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const resultBox = document.getElementById("result-box");
const scoreEl = document.getElementById("score");
const timerEl = document.getElementById("timer");

const startScreen = document.getElementById("start-screen");
const startBtn = document.getElementById("start-btn");
const playerInput = document.getElementById("player-name");
const playerDisplay = document.getElementById("player-display");
const quizBox = document.querySelector(".effect-wrapper");

let playerName = "";

startBtn.onclick = () => {
  let name = playerInput.value.trim();
  const lowerName = name.toLowerCase();

  if (name === "") {
    alert("Please enter your name to begin.");
    return;
  }

  // ✅ Strict Owen format enforcement
  if (
    lowerName.includes("owen") &&
    name !== "Owen (With Hat)" &&
    name !== "Owen (Without Hat)"
  ) {
    alert("Please specify: Owen (With Hat) or Owen (Without Hat)");
    return;
  }

  // ✅ Emma / Emmalyssa becomes darling <3
  if (lowerName === "emma" || lowerName === "emmalyssa") {
    name = "darling <3";
  }

   if (lowerName === "murad") {
    name = "Murad (where is burd 2?)";
  }

    if (lowerName === "matthew" || lowerName === "augoboss") {
    name = "Let's Do Pumpkin";
  }

    if (lowerName === "aiden" || lowerName === "darkness") {
    name = "Little Cheese IV";
  }

    if (lowerName === "remy") {
    name = "Remy (Pool master)";
  }

  if (lowerName === "jamari" || lowerName === "bread and jam" || lowerName === "breadnjam") {
  name = "You should know your own name...";
}

// ✅ Blocked names: Blanc, Saeed, Sergio, Sultan
if (
  ["blanc", "saeed", "sergio", "sultan", "mccully", "fuck you", "bitch", "alyssa sucks", "allie sucks"].includes(lowerName)
) {
  alert("Access denied.");
  window.close(); // May not work in all browsers unless opened via script
  window.location.href = "https://www.google.com"; // Fallback redirect
  return;
}










  playerName = name;
  playerDisplay.textContent = `Player: ${playerName}`;
  playerDisplay.classList.remove("hidden");

  startScreen.classList.add("hidden");
  quizBox.classList.remove("hidden");

  totalQuestions = parseInt(questionCountSelect.value);
  selectedQuestions = questionPool.sort(() => 0.5 - Math.random()).slice(0, totalQuestions);


  showQuestion();
};





function startTimer() {
  timeLeft = 30;
  timerEl.textContent = `Time left: ${timeLeft}s`;

  const wrapper = document.querySelector(".effect-wrapper");
  const banner = document.getElementById("times-up-banner");

  wrapper.style.transform = "scale(1)";
  wrapper.classList.remove("shake");
  banner.classList.add("hidden");

  timer = setInterval(() => {
    timeLeft--;
    timerEl.textContent = `Time left: ${timeLeft}s`;

    // ✅ Zoom in gradually
    const scale = 1 + (30 - timeLeft) * 0.02;
    wrapper.style.setProperty("--zoom", scale.toFixed(2));
    wrapper.style.transform = `scale(${scale.toFixed(2)})`;

    // ✅ Start shaking at 6 seconds
    if (timeLeft === 6) {
      wrapper.classList.add("shake");
    }

    // ✅ Time's up
    if (timeLeft <= 0) {
      clearInterval(timer);

      // ✅ Stop shaking
      wrapper.classList.remove("shake");

      // ✅ Show banner
      banner.classList.remove("hidden");

      setTimeout(() => {
        banner.classList.add("hidden");
        showAnswer(-1);
      }, 2500);
    }
  }, 1000);
}



nextBtn.onclick = () => {
  current++;

  // ✅ Reset zoom, shake, and banner
  const wrapper = document.querySelector(".effect-wrapper");
  wrapper.style.transform = "scale(1)";
  document.getElementById("times-up-banner").classList.add("hidden");

  if (current < selectedQuestions.length) {
    showQuestion();
  } else {
    showResult();
  }
};


function showQuestion() {
  const q = selectedQuestions[current];
  questionEl.textContent = `Q${current + 1}: ${q.question}`;
  questionNumberEl.textContent = `Question ${current + 1} / ${totalQuestions}`;
  optionsEl.innerHTML = "";
  nextBtn.style.display = "none";

  // ✅ Hide follow-up box
  document.getElementById("follow-up-box").classList.add("hidden");
  const followUpBox = document.getElementById("follow-up-box");
const randomMessage = followUpMessages[Math.floor(Math.random() * followUpMessages.length)];
followUpBox.innerHTML = `<p>${randomMessage}</p>`;

currentShuffledOptions = q.options.map((text, index) => ({ text, index }))
                                  .sort(() => Math.random() - 0.5);


currentShuffledOptions.forEach(({ text }, index) => {
  const li = document.createElement("li");
  li.textContent = text;
  li.onclick = () => {
    clearInterval(timer);
    showAnswer(index);
  };
  optionsEl.appendChild(li);
});


  startTimer();

  
}

  const endBtn = document.getElementById("end-btn");

endBtn.onclick = () => {
  clearInterval(timer); // stop timer if running
  showResult(); // go straight to results
};

const skipBtn = document.getElementById("skip-btn");

skipBtn.onclick = () => {
  clearInterval(timer); // stop timer
  current++;            // move to next question
  if (current < selectedQuestions.length) {
    showQuestion();     // show next question immediately
  } else {
    showResult();       // if last question, show results
  }
};



function showAnswer(selectedIndex) {
  const q = selectedQuestions[current];
  const items = optionsEl.querySelectorAll("li");

  // ✅ Reset zoom scale immediately
  const wrapper = document.querySelector(".effect-wrapper");
  wrapper.style.transform = "scale(1)";

  // ✅ Reveal answers one by one
  items.forEach((li, i) => {
    setTimeout(() => {
      const originalIndex = q.options.indexOf(li.textContent);
      if (originalIndex === q.answer) {
        li.classList.add("correct");
        li.innerHTML += " ✅";
      } else {
        li.classList.add("incorrect");
        li.innerHTML += " ❌";
      }
      li.onclick = null;
    }, i * 30); // 300ms delay between each item
  });

  // ✅ Score only if user clicked the correct answer
const selectedText = currentShuffledOptions[selectedIndex].text;
if (q.options[q.answer] === selectedText) {
  score++;
}


  if (selectedIndex !== -1) {
  questionsCompleted++;
}


  nextBtn.style.display = "block";

  // ✅ Show randomized follow-up message
  const followUpBox = document.getElementById("follow-up-box");
  const randomMessage = followUpMessages[Math.floor(Math.random() * followUpMessages.length)];
  followUpBox.innerHTML = `<p>${randomMessage}</p>`;
  followUpBox.classList.remove("hidden");

              // ✅ Stop shaking
      wrapper.classList.remove("shake");
}




function showResult() {
  endBtn.style.display = "none";
  document.getElementById("quiz-box").classList.add("hidden");
  resultBox.classList.remove("hidden");
  scoreEl.textContent = `${score} out of ${questionsCompleted}`;


}

nextBtn.onclick = () => {
  current++;
  if (current < selectedQuestions.length) {
    showQuestion();
  } else {
    showResult();
  }
};






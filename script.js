const basicModeToggle = document.getElementById("basic-mode-toggle");
let basicMode = false;

let questionsCompleted = 0;
let currentShuffledOptions = [];

const questionCountSelect = document.getElementById("question-count");
let totalQuestions = 20; // default
const questionNumberEl = document.getElementById("question-number");

// Theme Switching
const themeSelect = document.getElementById("theme-select");

function applyTheme(themeName) {
  document.body.classList.remove("theme-default", "theme-demonic", "theme-maziar");

  if (themeName === "demonic") {
    document.body.classList.add("theme-demonic");
  } else if (themeName === "maziar") {
    document.body.classList.add("theme-maziar");
  } else {
    document.body.classList.add("theme-default");
  }
}

// Live theme switching on menu
themeSelect.addEventListener("change", () => {
  applyTheme(themeSelect.value);
});

// Default theme on load
themeSelect.addEventListener("change", () => {
  applyTheme(themeSelect.value);
});

const sparkleLayer = document.getElementById("sparkle-layer");

function createSparkles() {
  for (let i = 0; i < 100; i++) {
    const s = document.createElement("div");
    s.classList.add("sparkle");

    s.style.left = Math.random() * 100 + "%";
    s.style.top = Math.random() * 100 + "%";

    s.style.animationDuration = 4 + Math.random() * 6 + "s";

    sparkleLayer.appendChild(s);
  }
}

createSparkles();

const fireLayer = document.getElementById("fire-layer");

// Generate 50 flames
for (let i = 0; i < 50; i++) {
  const flame = document.createElement("div");
  flame.classList.add("fire");
  flame.style.left = Math.random() * 100 + "%";
  flame.style.width = 10 + Math.random() * 20 + "px";
  flame.style.height = 50 + Math.random() * 120 + "px";
  flame.style.animationDuration = 0.8 + Math.random() * 1.5 + "s";
  flame.style.background = `linear-gradient(to top,
    #${Math.floor(255).toString(16)}${Math.floor(204).toString(16)}00,
    #ff${Math.floor(102 + Math.random()*153).toString(16)}00,
    #${Math.floor(255).toString(16)}0000,
    #990000)`;
  fireLayer.appendChild(flame);
}

// Generate 30 smoke wisps
for (let i = 0; i < 30; i++) {
  const smoke = document.createElement("div");
  smoke.classList.add("smoke");
  smoke.style.left = Math.random() * 100 + "%";
  smoke.style.width = 10 + Math.random() * 20 + "px";
  smoke.style.height = 40 + Math.random() * 80 + "px";
  smoke.style.animationDuration = 3 + Math.random() * 5 + "s";
  smoke.style.opacity = 0.2 + Math.random() * 0.5;
  fireLayer.appendChild(smoke);
}




const questionPool = [
    // ---------------- CHAPTER 1 ----------------
    {
        question: "[Chapter 1] What is the purpose of the compiler in C++?",
        options: [
            "To execute the source code directly",
            "To translate source code into machine code",
            "To check for logical errors only",
            "To display runtime errors"
        ],
        answer: 1
    },
    {
        question: "[Chapter 1] Which file extension is used for a C++ source file?",
        options: [".exe", ".cpp", ".class", ".txt"],
        answer: 1
    },
    {
        question: "[Chapter 1] What does the statement '#include <iostream>' do?",
        options: [
            "Includes functions for file I/O",
            "Includes standard input/output stream objects",
            "Creates a main() function",
            "Defines integer data types"
        ],
        answer: 1
    },
    {
        question: "[Chapter 1] In Visual Studio, what does 'Start Without Debugging' do?",
        options: [
            "Runs the program and closes the console immediately",
            "Runs the program and keeps the console window open",
            "Runs only part of the code",
            "Starts in debug mode with breakpoints"
        ],
        answer: 1
    },

    // ---------------- CHAPTER 2–3 ----------------
    {
        question: "[Chapter 3] Which of the following is a valid 'if' statement?",
        options: [
            "if x > 5 { cout << x; }",
            "if (x > 5) cout << x;",
            "if (x > 5); cout << x;",
            "if x > 5 then cout << x;"
        ],
        answer: 1
    },
    {
        question: "[Chapter 3] What will happen if 'break' is missing in a switch case?",
        options: [
            "The program will crash",
            "The program skips to default automatically",
            "The next case statements will also execute",
            "It repeats the same case forever"
        ],
        answer: 2
    },
    {
        question: "[Chapter 3] Which logical operator has the highest precedence?",
        options: ["||", "&&", "==", "!"],
        answer: 3
    },
    {
        question: "[Chapter 3] What is the output of the expression (5 > 3 && 2 < 1)?",
        options: ["true", "false", "1", "0"],
        answer: 1
    },
    {
        question: "[Chapter 3] Which statement is TRUE about if...else if...else structures?",
        options: [
            "All conditions are checked even after one is true",
            "Only one block executes once a condition is true",
            "An else block must always be included",
            "They cannot contain nested if statements"
        ],
        answer: 1
    },

    // ---------------- CHAPTER 4 ----------------
    {
        question: "[Chapter 4] Which loop is guaranteed to run at least once?",
        options: ["while", "for", "do-while", "infinite while"],
        answer: 2
    },
    {
        question: "[Chapter 4] What does the 'continue' statement do?",
        options: [
            "Terminates the program",
            "Skips the rest of the loop and starts next iteration",
            "Exits the loop immediately",
            "Repeats the previous iteration"
        ],
        answer: 1
    },
    {
        question: "[Chapter 4] Which of the following correctly defines a for loop?",
        options: [
            "for (int i = 0; i < 10; ++i)",
            "for i = 0 to 10",
            "loop(i < 10)",
            "for i++ until 10"
        ],
        answer: 0
    },
    {
        question: "[Chapter 4] What will this loop display: for(int i=1; i<=3; ++i) cout << i;",
        options: ["123", "012", "1 2 3", "Error"],
        answer: 0
    },
    {
        question: "[Chapter 4] What is the main difference between 'while' and 'do-while' loops?",
        options: [
            "while loops always run once, do-while may not",
            "do-while checks the condition after executing the loop body",
            "while loops require braces, do-while does not",
            "They are identical"
        ],
        answer: 1
    },

    // ---------------- CHAPTER 5 ----------------
    {
        question: "[Chapter 5] What does the stream manipulator setprecision(3) do?",
        options: [
            "Sets field width to 3 characters",
            "Rounds numbers to 3 decimal places",
            "Displays 3 digits total",
            "Limits input to 3 characters"
        ],
        answer: 1
    },
    {
        question: "[Chapter 5] What is the purpose of 'cin.fail()'?",
        options: [
            "Checks if the last input operation failed",
            "Clears the input buffer",
            "Stops reading from cin",
            "Displays an error message automatically"
        ],
        answer: 0
    },
    {
        question: "[Chapter 5] Which of these opens a file for appending data?",
        options: [
            'ofstream file("data.txt", ios::out);',
            'ofstream file("data.txt", ios::trunc);',
            'ofstream file("data.txt", ios::app);',
            'ofstream file("data.txt");'
        ],
        answer: 2
    },
    {
        question: "[Chapter 5] What does 'cin.ignore(numeric_limits<streamsize>::max(), '\\n')' do?",
        options: [
            "Ignores only one character",
            "Clears the input buffer up to a newline",
            "Reads input until the end of file",
            "Flushes all output to the screen"
        ],
        answer: 1
    },
    {
        question: "[Chapter 5] Which header is needed for setw() and setprecision()?",
        options: ["<fstream>", "<iostream>", "<iomanip>", "<string>"],
        answer: 2
    },

    // ---------------- CHAPTER 6 ----------------
    {
        question: "[Chapter 6] Which statement correctly declares a vector of integers?",
        options: [
            "int vector[];",
            "vector<int> nums;",
            "array<int> nums;",
            "vector nums<int>;"
        ],
        answer: 1
    },
    {
        question: "[Chapter 6] What does 'scores.push_back(100);' do?",
        options: [
            "Adds 100 to the start of the vector",
            "Adds 100 to the end of the vector",
            "Removes the last element of the vector",
            "Replaces all values with 100"
        ],
        answer: 1
    },
    {
        question: "[Chapter 6] Which method returns the number of elements in a vector?",
        options: [".count()", ".length()", ".size()", ".total()"],
        answer: 2
    },
    {
        question: "[Chapter 6] What is the result of static_cast<int>(7.9)?",
        options: ["7", "8", "7.9", "Error"],
        answer: 0
    },
    {
        question: "[Chapter 6] Which function checks if a character is a letter?",
        options: ["isalpha()", "isdigit()", "isspace()", "isalnum()"],
        answer: 0
    },
    {
        question: "[Chapter 6] What does s.substr(1,3) return if s = 'Hello'?",
        options: ["Hel", "ell", "llo", "He"],
        answer: 1
    },
    {
        question: "[Chapter 6] What is true about vectors in C++?",
        options: [
            "They have a fixed size once declared",
            "They automatically resize when elements are added",
            "They can only hold integers",
            "They must be manually deleted"
        ],
        answer: 1
    },
    // ---------------- CHAPTER 3: IF / SWITCH ----------------
    {
        question: `[Chapter 3] What is the output of this code?\n\nint x = 3;\nint y = 4;\nif (x > y)\n    cout << "A";\nelse if (x == y)\n    cout << "B";\nelse\n    cout << "C";`,
        options: ["A", "B", "C", "No output"],
        answer: 2
    },
    {
        question: `[Chapter 3] What is displayed?\n\nint a = 5;\nint b = 10;\nif (a = b)\n    cout << "Equal";\nelse\n    cout << "Not equal";`,
        options: ["Equal", "Not equal", "Error", "No output"],
        answer: 0
    },
    {
        question: `[Chapter 3] What is printed?\n\nint num = 2;\nswitch(num) {\n  case 1: cout << "One"; break;\n  case 2: cout << "Two";\n  case 3: cout << "Three"; break;\n  default: cout << "Default";\n}`,
        options: ["Two", "TwoThree", "Three", "Default"],
        answer: 1
    },

    // ---------------- CHAPTER 4: LOOPS ----------------
    {
        question: `[Chapter 4] Guess the output:\n\nint a = 5;\nwhile (a > 0) {\n  cout << a << " ";\n  a--;\n}`,
        options: ["5 4 3 2 1", "4 3 2 1 0", "5 4 3 2", "Infinite loop"],
        answer: 0
    },
    {
        question: `[Chapter 4] What does this print?\n\nfor (int i = 0; i < 3; ++i)\n  cout << i << " ";`,
        options: ["1 2 3", "0 1 2", "0 1 2 3", "1 2"],
        answer: 1
    },
    {
        question: `[Chapter 4] Output of the nested loop:\n\nfor (int i = 1; i <= 2; ++i)\n  for (int j = 1; j <= 3; ++j)\n    cout << i << j << " ";`,
        options: ["11 12 13 21 22 23", "12 13 21 22 23", "11 22 33", "123123"],
        answer: 0
    },
    {
        question: `[Chapter 4] What is displayed?\n\nint total = 0;\nfor (int i = 1; i <= 4; ++i)\n  total += i;\ncout << total;`,
        options: ["4", "10", "6", "0"],
        answer: 1
    },
    {
        question: `[Chapter 4] Guess the output:\n\nint x = 1;\ndo {\n  cout << x << " ";\n  ++x;\n} while (x < 4);`,
        options: ["1 2 3", "1 2 3 4", "0 1 2", "Infinite loop"],
        answer: 0
    },
    {
        question: `[Chapter 4] What happens here?\n\nfor (int i = 1; i <= 5; ++i) {\n  if (i == 3) continue;\n  cout << i << " ";\n}`,
        options: ["1 2 3 4 5", "1 2 4 5", "1 2", "1 2 3"],
        answer: 1
    },

    // ---------------- CHAPTER 5: I/O STREAMS ----------------
    {
        question: `[Chapter 5] What is the output?\n\ndouble d = 3.14159;\ncout << fixed << setprecision(2) << d;`,
        options: ["3.14", "3.1", "3.142", "3"],
        answer: 0
    },
    {
        question: `[Chapter 5] Predict the output:\n\ncout << setw(5) << 42 << setw(5) << 7;`,
        options: ["42---7", "42-7", "---42---7", "427"],
        answer: 2
    },

    // ---------------- CHAPTER 6: STRINGS ----------------
    {
        question: `[Chapter 6] What is displayed?\n\nstring s = "Hello";\ncout << s.substr(1, 3);`,
        options: ["Hel", "ell", "llo", "He"],
        answer: 1
    },
    {
        question: `[Chapter 6] What is printed?\n\nstring s = "C++";\nfor (int i = s.size() - 1; i >= 0; --i)\n  cout << s[i];`,
        options: ["C++", "++C", "C+", "Error"],
        answer: 1
    },
    {
        question: `[Chapter 6] What does this output?\n\nint i = 3;\ncout << i++ << " ";\n\ncout << ++i;`,
        options: ["3 4", "3 5", "4 5", "Error"],
        answer: 1
    },
    {
        question: `[Chapter 6] What is displayed?\n\nvector<int> nums {2, 4, 6};\nfor (int n : nums)\n  cout << n * 2 << " ";`,
        options: ["2 4 6", "4 8 12", "8 16 24", "Error"],
        answer: 1
    },
    {
        question: `[Chapter 6] What will this display?\n\nint x = 10;\nif (x > 5)\n  if (x > 15)\n    cout << "A";\n  else\n    cout << "B";\nelse\n  cout << "C";`,
        options: ["A", "B", "C", "No output"],
        answer: 1
    },
    {
        question: `[Chapter 6] Predict the output:\n\ncout << (3 < 2 || 5 > 4 && 2 < 1);`,
        options: ["1", "0", "true", "false"],
        answer: 1
    },
    {
        question: `[Chapter 6] What will be printed?\n\nint i = 1;\nwhile (i <= 3) {\n  cout << i++ << " ";\n}`,
        options: ["1 2 3", "0 1 2", "1 2", "1 2 3 4"],
        answer: 0
    },
    {
        question: "[Chapter 5] What does cin.fail() return if the last input operation failed?",
        options: ["true", "false", "0", "It throws an exception"],
        answer: 0
    },
    {
        question: "[Chapter 5] What is the purpose of cin.clear()?",
        options: ["Clears the screen", "Resets the input stream's error state", "Skips to the next line", "Flushes the output buffer"],
        answer: 1
    },
    {
        question: "[Chapter 5] What does cin.ignore(1000, '\\n') do?",
        options: ["Skips 1000 characters", "Skips up to 1000 characters or until a newline", "Clears the output buffer", "Reads a line of input"],
        answer: 1
    },
    {
        question: "[Chapter 5] What happens if you try to read a string into an int variable using cin?",
        options: ["The string is converted to 0", "The program crashes", "cin enters a fail state", "The string is ignored"],
        answer: 2
    },
    {
        question: "[Chapter 5] What is the correct sequence to recover from invalid numeric input?",
        options: ["cin.clear(); cin.ignore();", "cin.ignore(); cin.clear();", "cin.fail(); cin.clear();", "cin.clear(); cin.get();"],
        answer: 0
    },
    {
        question: "[Chapter 6] What happens if you call v.at(10) on a vector with only 5 elements?",
        options: ["Returns 0", "Returns garbage", "Throws an out_of_range exception", "Returns the last element"],
        answer: 2
    },
    {
        question: "[Chapter 6] What is the safest way to access a vector element with bounds checking?",
        options: ["v[i]", "v.get(i)", "v.at(i)", "v.index(i)"],
        answer: 2
    },
    {
        question: "[Chapter 6] What does string::npos represent?",
        options: ["The first index of a string", "The last character", "An invalid position or 'not found'", "The null terminator"],
        answer: 2
    },
    {
        question: "[Chapter 6] What should you check before calling substr(pos, len) on a string?",
        options: ["That pos is less than the string's length", "That len is greater than 0", "That the string is empty", "That pos is a multiple of len"],
        answer: 0
    },
    {
        question: "[Chapter 5] What is a common cause of infinite loops when using cin in a loop?",
        options: ["Using cin.ignore() too early", "Failing to clear the error state after invalid input", "Using endl instead of '\\n'", "Using setprecision() incorrectly"],
        answer: 1
    },
  // ---------------- CHAPTER 7 ----------------
  {
    question: "[Chapter 7] What is the purpose of a function prototype?",
    options: [
      "It executes the function",
      "It declares a function before it’s used",
      "It imports a library",
      "It allocates memory on the heap"
    ],
    answer: 1
  },
  {
    question: "[Chapter 7] What happens when a variable inside a function has the same name as a global variable?",
    options: [
      "The program crashes",
      "The global variable is deleted",
      "The local variable shadows the global variable",
      "Both variables merge into one"
    ],
    answer: 2
  },
  {
    question: "[Chapter 7] Which of the following correctly creates a reference parameter?",
    options: [
      "void add(int x)",
      "void add(int &x)",
      "void add(&int x)",
      "void add(ref int x)"
    ],
    answer: 1
  },
  {
    question: "[Chapter 7] What is function overloading?",
    options: [
      "Writing functions inside other functions",
      "Using the same function name with different parameters",
      "Creating too many functions in a program",
      "Calling multiple functions at once"
    ],
    answer: 1
  },
  {
    question: "[Chapter 7] What must every header file include?",
    options: [
      "A main() function",
      "Using namespace std;",
      "Include guards",
      "A class definition"
    ],
    answer: 2
  },

  // ---------------- CHAPTER 8 ----------------
  {
    question: "[Chapter 8] What is the main goal of testing?",
    options: [
      "To optimize performance",
      "To find all bugs before release",
      "To rewrite the program",
      "To add new features"
    ],
    answer: 1
  },
  {
    question: "[Chapter 8] What type of error occurs when a program compiles but produces wrong results?",
    options: [
      "Syntax error",
      "Runtime error",
      "Logic error",
      "Hardware error"
    ],
    answer: 2
  },
  {
    question: "[Chapter 8] What does a breakpoint do in a debugger?",
    options: [
      "Speeds up execution",
      "Stops the program at a specific line",
      "Deletes that line of code",
      "Runs the program without compiling"
    ],
    answer: 1
  },
  {
    question: "[Chapter 8] Why is comparing floating-point values using == dangerous?",
    options: [
      "They can store only whole numbers",
      "Floating-point precision errors make exact equality unreliable",
      "The == operator is disabled for doubles",
      "It always causes a compiler warning"
    ],
    answer: 1
  },
  {
    question: "[Chapter 8] Which of the following is a common testing mistake?",
    options: [
      "Testing both valid and invalid input",
      "Creating a test plan first",
      "Assuming results are correct because they 'look right'",
      "Running the program multiple times"
    ],
    answer: 2
  },

  // ---------------- CHAPTER 13 ----------------
  {
    question: "[Chapter 13] What is the purpose of a try block?",
    options: [
      "To crash the program on error",
      "To contain code that may throw exceptions",
      "To ignore all errors",
      "To restart program execution"
    ],
    answer: 1
  },
  {
    question: "[Chapter 13] What happens when a function throws an exception and no catch block handles it?",
    options: [
      "The exception is ignored",
      "The program continues normally",
      "Stack unwinding stops and the program terminates",
      "The compiler rewrites the code automatically"
    ],
    answer: 2
  },
  {
    question: "[Chapter 13] Which of the following throws an exception correctly?",
    options: [
      "throw;",
      "catch(error);",
      "throw value;",
      "throwException(value);"
    ],
    answer: 2
  },
  {
    question: "[Chapter 13] Why should exceptions be thrown by value and caught by reference?",
    options: [
      "To prevent copying and slicing",
      "Because pointers cannot be thrown",
      "Because references are faster to type",
      "Because throw only works with references"
    ],
    answer: 0
  },
  {
    question: "[Chapter 13] Which statement about exception handling is TRUE?",
    options: [
      "Only one catch block is allowed",
      "You can catch different exception types with multiple catch blocks",
      "Exceptions must always end the program",
      "try blocks cannot contain function calls"
    ],
    answer: 1
  },

  // ---------------- CHAPTER 14 ----------------
  {
    question: "[Chapter 14] What is encapsulation?",
    options: [
      "Writing all code in main()",
      "Restricting access to data inside a class",
      "Combining multiple classes into one",
      "Allowing all code to access all variables"
    ],
    answer: 1
  },
  {
    question: "[Chapter 14] What is the purpose of a constructor?",
    options: [
      "To destroy objects",
      "To initialize object data",
      "To print debug messages",
      "To create functions inside a class"
    ],
    answer: 1
  },
  {
    question: "[Chapter 14] Why are member variables usually private?",
    options: [
      "To make the program run faster",
      "To prevent other code from modifying the data directly",
      "C++ requires it",
      "Private variables use less memory"
    ],
    answer: 1
  },
  {
    question: "[Chapter 14] What does the 'this' pointer refer to?",
    options: [
      "The parent class",
      "The object that called the member function",
      "The global namespace",
      "The most recent exception"
    ],
    answer: 1
  },
  {
    question: "[Chapter 14] Which is a correct way to define a class?",
    options: [
      "class Car {}",
      "class Car();",
      "Car class {}",
      "define class Car {}"
    ],
    answer: 0
  },

  // ---------------- TYPE OF ERRORS ----------------
  {
    question: "[Type of Error] What type of error occurs when the compiler detects invalid syntax?",
    options: [
      "Runtime error",
      "Logic error",
      "Syntax error",
      "Linker error"
    ],
    answer: 2
  },
  {
    question: "[Type of Error] What type of error occurs when a program compiles but crashes during execution?",
    options: [
      "Syntax error",
      "Runtime error",
      "Logic error",
      "Compilation error"
    ],
    answer: 1
  },
  {
    question: "[Type of Error] Which type of error occurs when the program runs but produces incorrect output?",
    options: [
      "Logic error",
      "Syntax error",
      "Runtime error",
      "Linker error"
    ],
    answer: 0
  },
  {
    question: "[Type of Error] What kind of error is caused by dividing by zero at runtime?",
    options: [
      "Logic error",
      "Syntax error",
      "Runtime error",
      "Compile-time warning"
    ],
    answer: 2
  },
  {
    question: "[Type of Error] Forgetting a semicolon at the end of a statement will produce what type of error?",
    options: [
      "Logic error",
      "Syntax error",
      "Runtime error",
      "Memory error"
    ],
    answer: 1
  },
  {
    question: "[Type of Error] Using an uninitialized variable may result in what type of error?",
    options: [
      "Syntax error",
      "Logic error",
      "Runtime error",
      "Compilation error"
    ],
    answer: 2
  },
  {
    question: "[Type of Error] Using the wrong operator in a condition (e.g., = instead of ==) is classified as what type of error?",
    options: [
      "Syntax error",
      "Logic error",
      "Runtime error",
      "Linker error"
    ],
    answer: 1
  },
  {
    question: "[Type of Error] A program that references a variable outside its scope will cause what type of error?",
    options: [
      "Logic error",
      "Runtime error",
      "Syntax error",
      "Memory leak"
    ],
    answer: 2
  },
  {
    question: "[Type of Error] Accessing an array element out of bounds is considered which type of error?",
    options: [
      "Syntax error",
      "Logic error",
      "Runtime error",
      "Compile-time error"
    ],
    answer: 2
  },
  {
    question: "[Type of Error] Forgetting to include a required header file can result in what type of error?",
    options: [
      "Syntax error",
      "Linker or compile-time error",
      "Runtime error",
      "Logic error"
    ],
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
    "Did you know? C++ supports both procedural and object-oriented programming paradigms.",
    "Did you know? Applebee's serves a dsert called 'The Perfectly Imperfect Cheesecake'.",
    "Did you know? As an AI model, I don't have personal experiences or feelings, but I'm here to help you!",
    "Did you know? The longest recorded flight of a chicken is 13 seconds.",
    "Did you know? The shortest war in history was between Britain and Zanzibar on August 27, 1896. Zanzibar surrendered after 38 minutes.",
    "Did you know? Did you know! Did you know... Did you know?",
    "Did you know? Sonic the Hedgehog was originally named 'Mr. Needlemouse'.",
    "Did you know? Sonic's original design was created by artist Naoto Ohshima, who based the character on a combination of a hedgehog and a human.",
    "Did you know? Sonic's iconic red shoes were inspired by Michael Jackson's boots from the 'Bad' album cover.",
    "Did you know? Sonic's sidekick, Tails, was named after his two tails that allow him to fly.",
    "Did you know? Sonic's design has undergone several changes over the years, with the most notable redesign occurring in 1998 for the game 'Sonic Adventure'.",
    "Did you know? Sonic's popularity has led to a dedicated fanbase and numerous fan-made games and content.",
    "Did you know? Sonic's catchphrase is 'Gotta go fast!'",
    "Did you know? Sonic's favorite food is chili dogs.",
    "Did you know? Sonic is fast because of his shoes, just ask Emma!",
    "Did you know? Sonic is fast because of his shoes, just ask Emma!",
    "Did you know? Sonic is fast because of his shoes, just ask Emma!",
    "Did you know? Sonic is fast because of his shoes, just ask Emma!",
    "Did you know? Sonic is fast because of his shoes, just ask Emma!",
    "Did you know? Sonic is fast because of his shoes, just ask Emma!",
    "STEM HUB ALERT",
    "STEM HUB ALERT",
    "STEM HUB ALERT",
    "STEM HUB ALERT",
    "STEM HUB ALERT",
    "STEM HUB ALERT",
    "STEM HUB ALERT",
    "STEM HUB ALERT",
    "STEM HUB ALERT",
    "You should know this!",
    "bitch.",
    "cloud compute motherfucker",
    "Sonic Unleashed",
    "Remy, why did you purchase the textbook?",
    "Remy, why did you purchase the textbook?",
    "Remy, why did you purchase the textbook?",
    "Remy, why did you purchase the textbook?",
    "Remy, why did you purchase the textbook?",
    "Remy, why did you purchase the textbook?",
    "Remy, why did you purchase the textbook?",
    "Remy, why did you purchase the textbook?",
    "Remy, why did you purchase the textbook?",
    "Remy, why did you purchase the textbook?",
    "Remy, why did you purchase the textbook?",
    "Remy, why did you purchase the textbook?",
    "Remy, why did you purchase the textbook?",
    "Remy, why did you purchase the textbook?",
    "Remy, why did you purchase the textbook?",
    "Remy, why did you purchase the textbook?",
    "Remy, why did you purchase the textbook?",
    "Remy, why did you purchase the textbook?",
    "Remy, why did you purchase the textbook?",
    "Remy, why did you purchase the textbook?",
    "Remy, why did you purchase the textbook?"
];


let selectedQuestions = [];
let current = 0;
let score = 0;
let timer;
let timeLeft = 60;

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

const liveNameSpan = document.getElementById("live-name");

playerInput.addEventListener("input", () => {
  const name = playerInput.value.trim();
  liveNameSpan.textContent = name ? `${name}` : "";
});

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

      if (lowerName === "cole") {
    name = "My Friend Cole";
  }

  if (lowerName === "jamari" || lowerName === "bread and jam" || lowerName === "breadnjam") {
  name = "You should know your own name...";
}

// ✅ Blocked names: Blanc, Saeed, Sergio, Sultan
if (
  ["blanc", "saeed", "sergio", "sultan", "mccully", "harry", "test", "fuck you", "bitch", "alyssa sucks", "allie sucks"].includes(lowerName)
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
  basicMode = basicModeToggle.checked;

  showQuestion();
};





function startTimer() {
  timerEl.textContent = `Time left: ${timeLeft}s`;

  const wrapper = document.querySelector(".effect-wrapper");
  const banner = document.getElementById("times-up-banner");

  wrapper.style.transform = "scale(1)";
  wrapper.classList.remove("shake");
  banner.classList.add("hidden");

  timer = setInterval(() => {
    timeLeft--;
    timerEl.textContent = `Time left: ${timeLeft}s`;

if (!basicMode) {
  const scale = 1 + (60 - timeLeft) * 0.02;
  wrapper.style.setProperty("--zoom", scale.toFixed(2));
  wrapper.style.transform = `scale(${scale.toFixed(2)})`;

  if (timeLeft === 6) {
    wrapper.classList.add("shake");
  }
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
  timeLeft = 60; // set timer to original value
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
if (!basicMode) {
  wrapper.style.transform = "scale(1)";
  wrapper.classList.remove("shake");
}

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
}




function showResult() {
  endBtn.style.display = "none";
  document.getElementById("quiz-box").classList.add("hidden");
  resultBox.classList.remove("hidden");
  scoreEl.textContent = `${score} out of ${questionsCompleted}`;


}

nextBtn.onclick = () => {
  timeLeft = 60; // set timer to original value
  current++;
  if (current < selectedQuestions.length) {
    showQuestion();
  } else {
    showResult();
  }
};






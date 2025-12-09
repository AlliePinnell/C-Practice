const basicModeToggle = document.getElementById("basic-mode-toggle");
let basicMode = false;

let questionsCompleted = 0;
let currentShuffledOptions = [];

const questionCountSelect = document.getElementById("question-count");
let totalQuestions = 20; // default
const questionNumberEl = document.getElementById("question-number");

const modeSelect = document.getElementById("mode-select");
const chapterSelect = document.getElementById("chapter-select");


// Toggle visibility
modeSelect?.addEventListener("change", () => {
if (modeSelect.value === "chapter") {
questionCountSelect.classList.add("hidden");
chapterSelect.classList.remove("hidden");
} else {
chapterSelect.classList.add("hidden");
questionCountSelect.classList.remove("hidden");
}
});

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
        question: `[Chapter 3] What is the output of this code?\n\nint x = 3;\nint y = 4;\nif (x > y)\n    cout << "A";\nelse if (x == y)\n    cout << "B";\nelse\n    cout << "C";C`,
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
        question: `[Chapter 4] Guess the output:\n\nint a = 5;\nwhile (a > 0) {\n  cout << a << " ";\n  a--;\n}C`,
        options: ["5 4 3 2 1", "4 3 2 1 0", "5 4 3 2", "Infinite loop"],
        answer: 0
    },
    {
        question: `[Chapter 4] What does this print?\n\nfor (int i = 0; i < 3; ++i)\n  cout << i << " ";C`,
        options: ["1 2 3", "0 1 2", "0 1 2 3", "1 2"],
        answer: 1
    },
    {
        question: `[Chapter 4] Output of the nested loop:\n\nfor (int i = 1; i <= 2; ++i)\n  for (int j = 1; j <= 3; ++j)\n    cout << i << j << " ";C`,
        options: ["11 12 13 21 22 23", "12 13 21 22 23", "11 22 33", "123123"],
        answer: 0
    },
    {
        question: `[Chapter 4] What is displayed?\n\nint total = 0;\nfor (int i = 1; i <= 4; ++i)\n  total += i;\ncout << total;C`,
        options: ["4", "10", "6", "0"],
        answer: 1
    },
    {
        question: `[Chapter 4] Guess the output:\n\nint x = 1;\ndo {\n  cout << x << " ";\n  ++x;\n} while (x < 4);C`,
        options: ["1 2 3", "1 2 3 4", "0 1 2", "Infinite loop"],
        answer: 0
    },
    {
        question: `[Chapter 4] What happens here?\n\nfor (int i = 1; i <= 5; ++i) {\n  if (i == 3) continue;\n  cout << i << " ";\n}C`,
        options: ["1 2 3 4 5", "1 2 4 5", "1 2", "1 2 3"],
        answer: 1
    },

    // ---------------- CHAPTER 5: I/O STREAMS ----------------
    {
        question: `[Chapter 5] What is the output?\n\ndouble d = 3.14159;\ncout << fixed << setprecision(2) << d;C`,
        options: ["3.14", "3.1", "3.142", "3"],
        answer: 0
    },
    {
        question: `[Chapter 5] Predict the output:\n\ncout << setw(5) << 42 << setw(5) << 7;C`,
        options: ["42---7", "42-7", "---42---7", "427"],
        answer: 2
    },
        {
        question: "[Chapter 5] What does cin.fail() return if the last input operation failed?",
        options: ["true", "false", "0", "It throws an exception"],
        answer: 0
    },
        {
        question: "[Chapter 5] What is a common cause of infinite loops when using cin in a loop?",
        options: ["Using cin.ignore() too early", "Failing to clear the error state after invalid input", "Using endl instead of '\\n'", "Using setprecision() incorrectly"],
        answer: 1
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

    // ---------------- CHAPTER 6: STRINGS ----------------
    {
        question: `[Chapter 6] What is displayed?\n\nstring s = "Hello";\ncout << s.substr(1, 3);C`,
        options: ["Hel", "ell", "llo", "He"],
        answer: 1
    },
    {
        question: `[Chapter 6] What is printed?\n\nstring s = "C++";\nfor (int i = s.size() - 1; i >= 0; --i)\n  cout << s[i];C`,
        options: ["C++", "++C", "C+", "Error"],
        answer: 1
    },
    {
        question: `[Chapter 6] What does this output?\n\nint i = 3;\ncout << i++ << " ";\n\ncout << ++i;C`,
        options: ["3 4", "3 5", "4 5", "Error"],
        answer: 1
    },
    {
        question: `[Chapter 6] What is displayed?\n\nvector<int> nums {2, 4, 6};\nfor (int n : nums)\n  cout << n * 2 << " ";C`,
        options: ["2 4 6", "4 8 12", "8 16 24", "Error"],
        answer: 1
    },
    {
        question: `[Chapter 6] What will this display?\n\nint x = 10;\nif (x > 5)\n  if (x > 15)\n    cout << "A";\n  else\n    cout << "B";\nelse\n  cout << "C";C`,
        options: ["A", "B", "C", "No output"],
        answer: 1
    },
    {
        question: `[Chapter 6] Predict the output:\n\ncout << (3 < 2 || 5 > 4 && 2 < 1);C`,
        options: ["1", "0", "true", "false"],
        answer: 1
    },
    {
        question: `[Chapter 6] What will be printed?\n\nint i = 1;\nwhile (i <= 3) {\n  cout << i++ << " ";\n}C`,
        options: ["1 2 3", "0 1 2", "1 2", "1 2 3 4"],
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
      {
        question: "[Chapter 7] What is the purpose of a function prototype?",
        options: [
            "To define the body of a function",
            "To declare a function before it’s used",
            "To automatically optimize a function",
            "To create a new namespace"
        ],
        answer: 1
    },
    {
        question: "[Chapter 7] Which term refers to the area of a program where a variable can be used?",
        options: [
            "Hierarchy",
            "Lifetime",
            "Scope",
            "Declaration"
        ],
        answer: 2
    },
    {
        question: "[Chapter 7] What is the syntax for defining a function?",
        options: [
            "function return_type(arguments) { }",
            "def function(arguments):",
            "return_type function_name(parameters) { }",
            "function_name return_type(parameters);"
        ],
        answer: 2
    },
    {
        question: "[Chapter 7] What type of variable exists only inside a function?",
        options: [
            "Static variable",
            "Global variable",
            "Constant variable",
            "Local variable"
        ],
        answer: 3
    },
    {
        question: "[Chapter 7] What is a hierarchy chart used for?",
        options: [
            "Showing the order of precedence",
            "Visualizing function relationships",
            "Displaying program output",
            "Tracking memory usage"
        ],
        answer: 1
    },
    {
        question: "[Chapter 7] Which parameter type allows a function to modify the argument variable?",
        options: [
            "Value parameter",
            "Reference parameter",
            "Constant parameter",
            "Pointer parameter only"
        ],
        answer: 1
    },
    {
        question: "[Chapter 7] Why can reference parameters improve efficiency?",
        options: [
            "They copy the entire object",
            "They avoid copying large objects",
            "They require more memory",
            "They prevent recursion"
        ],
        answer: 1
    },
    {
        question: "[Chapter 7] What is an include guard used for?",
        options: [
            "To prevent global variables from changing",
            "To prevent a header file from being included multiple times",
            "To hide private functions",
            "To protect memory from overflow"
        ],
        answer: 1
    },
    {
        question: "[Chapter 7] Which of the following SHOULD NOT be placed in a header file?",
        options: [
            "Function prototypes",
            "Class declarations",
            "Using namespace directives",
            "Include guards"
        ],
        answer: 2
    },
    {
        question: "[Chapter 7] What keyword defines a namespace?",
        options: [
            "scope",
            "group",
            "namespace",
            "module"
        ],
        answer: 2
    },
    {
        question: "[Chapter 7] How do you access a function inside a namespace without using 'using namespace'?",
        options: [
            "functionName::namespace()",
            "namespace.functionName()",
            "namespace::functionName()",
            "Call with parentheses only"
        ],
        answer: 2
    },
    {
        question: "[Chapter 7] What is a function signature?",
        options: [
            "The return value only",
            "The combination of a function name and its parameter list",
            "A hash of the function body",
            "A description comment above the function"
        ],
        answer: 1
    },
    {
        question: "[Chapter 7] Which is TRUE about global variables?",
        options: [
            "They should be used frequently",
            "They increase program safety",
            "They can be accessed from anywhere",
            "They are always constant"
        ],
        answer: 2
    },
    {
        question: "[Chapter 7] What happens if a local variable has the same name as a global variable?",
        options: [
            "The global variable is deleted",
            "The local variable overwrites the global value",
            "The global variable is renamed automatically",
            "The local variable shadows the global variable"
        ],
        answer: 3
    },
    {
        question: "[Chapter 7] Which file typically contains the *definitions* of functions?",
        options: [
            "main.cpp",
            "header (.h) files",
            "implementation (.cpp) files",
            "namespace files"
        ],
        answer: 2
    },
    {
        question: "[Chapter 7] What is the purpose of default parameter values?",
        options: [
            "To overload functions automatically",
            "To allow functions to be declared without prototypes",
            "To allow calls that omit some arguments",
            "To skip validation"
        ],
        answer: 2
    },
    {
        question: "[Chapter 7] When storing functions in header files, why are they often put inside namespaces?",
        options: [
            "To shorten the code",
            "To prevent naming conflicts",
            "To avoid prototypes",
            "To improve runtime speed"
        ],
        answer: 1
    },
    {
        question: "[Chapter 7] What type of variable should generally NOT be used?",
        options: [
            "Constant",
            "Local",
            "Global",
            "Reference"
        ],
        answer: 2
    },
    {
        question: "[Chapter 7] What is the correct way to declare a function?",
        options: [
            "function name(parameters)",
            "return_type name(parameters);",
            "declare return_type name()",
            "void(name)"
        ],
        answer: 1
    },
    {
        question: "[Chapter 7] The statement `#ifndef FILE_H` in a header file is part of:",
        options: [
            "A preprocessor loop",
            "An include guard",
            "A namespace",
            "A compiler directive for optimization"
        ],
        answer: 1
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
      {
        question: "[Chapter 8] What is the primary goal of testing a program?",
        options: [
            "To optimize performance",
            "To find all errors before the program is released",
            "To improve code formatting",
            "To reduce file size"
        ],
        answer: 1
    },
    {
        question: "[Chapter 8] What is the main goal of debugging?",
        options: [
            "To write new features",
            "To find syntax errors",
            "To fix errors found during testing",
            "To remove unused code"
        ],
        answer: 2
    },
    {
        question: "[Chapter 8] Which type of error is caught BEFORE running the program?",
        options: [
            "Logic error",
            "Runtime error",
            "Compile-time error",
            "Data error"
        ],
        answer: 2
    },
    {
        question: "[Chapter 8] Which type of error produces incorrect results but does NOT crash the program?",
        options: [
            "Runtime error",
            "Compilation error",
            "Logic error",
            "Syntax error"
        ],
        answer: 2
    },
    {
        question: "[Chapter 8] Which tool can you use to trace program execution?",
        options: [
            "cin",
            "cout statements",
            "linker",
            "compiler"
        ],
        answer: 1
    },
    {
        question: "[Chapter 8] When testing with invalid data, what is the purpose?",
        options: [
            "To generate warnings",
            "To intentionally crash the program",
            "To ensure the program handles incorrect input safely",
            "To test compiler performance"
        ],
        answer: 2
    },
    {
        question: "[Chapter 8] What happens when the user enters the wrong data type, such as 'ten' for an integer?",
        options: [
            "The program skips the rest of the code",
            "The program produces a syntax error",
            "The program extracts no valid value and sets failbit",
            "The program automatically converts it"
        ],
        answer: 2
    },
    {
        question: "[Chapter 8] Which Visual Studio feature pauses the program at a specific line?",
        options: [
            "Watch window",
            "Breakpoint",
            "Stack trace",
            "Code formatter"
        ],
        answer: 1
    },
    {
        question: "[Chapter 8] What is stepping through code used for?",
        options: [
            "Running the entire program quickly",
            "Executing one statement at a time for inspection",
            "Formatting source code",
            "Compiling multiple files"
        ],
        answer: 1
    },
    {
        question: "[Chapter 8] Which type of error occurs when the program is running?",
        options: [
            "Compile-time error",
            "Logic error",
            "Runtime error",
            "Syntax error"
        ],
        answer: 2
    },
    {
        question: "[Chapter 8] What is the first phase in a typical testing plan?",
        options: [
            "Test with invalid data",
            "Check the user interface",
            "Debug with breakpoints",
            "Deploy the program"
        ],
        answer: 1
    },
    {
        question: "[Chapter 8] What does a breakpoint allow you to do?",
        options: [
            "Skip over functions",
            "Pause program execution at a specific line",
            "Generate more compiler warnings",
            "Automatically fix errors"
        ],
        answer: 1
    },
    {
        question: "[Chapter 8] What is a common problem associated with floating-point numbers?",
        options: [
            "They always round incorrectly",
            "They cannot represent integers",
            "They can produce slight precision errors",
            "They crash the program automatically"
        ],
        answer: 2
    },
    {
        question: "[Chapter 8] Which technique helps diagnose where a program is failing?",
        options: [
            "Removing comments",
            "Using cout for tracing",
            "Disabling input validation",
            "Recompiling repeatedly"
        ],
        answer: 1
    },
    {
        question: "[Chapter 8] What does the stack trace show?",
        options: [
            "Memory addresses only",
            "The sequence of function calls",
            "All variables in the program",
            "Compiler errors only"
        ],
        answer: 1
    },
    {
        question: "[Chapter 8] Which error type is demonstrated by forgetting to close a parenthesis?",
        options: [
            "Runtime error",
            "Logic error",
            "Compile-time (syntax) error",
            "Floating-point error"
        ],
        answer: 2
    },
    {
        question: "[Chapter 8] What is the recommended final step after debugging?",
        options: [
            "Refactor code",
            "Deploy the program",
            "Delete all testing data",
            "Rewrite all functions"
        ],
        answer: 1
    },
    {
        question: "[Chapter 8] Which testing phase tries to deliberately break the program?",
        options: [
            "Valid input testing",
            "Invalid data testing",
            "Interface testing",
            "Debugging"
        ],
        answer: 1
    },
    {
        question: "[Chapter 8] Which type of error occurs when a value is valid syntax but logically incorrect?",
        options: [
            "Runtime error",
            "Logical error",
            "Grammar error",
            "Input error"
        ],
        answer: 1
    },
    {
        question: "[Chapter 8] What feature allows you to inspect variables while paused at a breakpoint?",
        options: [
            "Debugger watch/locals window",
            "Compiler options",
            "Project settings",
            "Trace log"
        ],
        answer: 0
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
      {
        question: "[Chapter 13] What is an exception in C++?",
        options: [
            "A syntax error detected during compilation",
            "A mechanism for handling unexpected or invalid conditions",
            "A type of data structure",
            "A compiler optimization"
        ],
        answer: 1
    },
    {
        question: "[Chapter 13] Which class is at the top of the C++ exception hierarchy?",
        options: [
            "invalid_argument",
            "runtime_error",
            "exception",
            "logic_error"
        ],
        answer: 2
    },
    {
        question: "[Chapter 13] Which exception class is typically thrown when a function receives an invalid argument?",
        options: [
            "invalid_argument",
            "overflow_error",
            "range_error",
            "runtime_error"
        ],
        answer: 0
    },
    {
        question: "[Chapter 13] Which keyword is used to trigger an exception?",
        options: [
            "throw",
            "raise",
            "error",
            "catch"
        ],
        answer: 0
    },
    {
        question: "[Chapter 13] What is the purpose of a try block?",
        options: [
            "To declare exception objects",
            "To test expressions for truth",
            "To wrap code that may throw an exception",
            "To convert warnings into errors"
        ],
        answer: 2
    },
    {
        question: "[Chapter 13] What function of an exception object returns the error message?",
        options: [
            "info()",
            "why()",
            "message()",
            "what()"
        ],
        answer: 3
    },
    {
        question: "[Chapter 13] What happens if an exception is thrown and not caught?",
        options: [
            "The compiler fixes it automatically",
            "The program displays a warning but continues",
            "The program terminates immediately",
            "The exception is ignored"
        ],
        answer: 2
    },
    {
        question: "[Chapter 13] Why should you prevent exceptions from being thrown when possible?",
        options: [
            "They slow down compilation",
            "They require rewriting the entire program",
            "They cause programs to crash if uncaught",
            "They make input validation impossible"
        ],
        answer: 2
    },
    {
        question: "[Chapter 13] Which statement correctly catches ALL standard exceptions?",
        options: [
            "catch(all)",
            "catch(exception e)",
            "catch(const exception& e)",
            "catch(std_error)"
        ],
        answer: 2
    },
    {
        question: "[Chapter 13] Where should more specific catch clauses be placed?",
        options: [
            "Before general catch clauses",
            "After general catch clauses",
            "In any order",
            "Outside the try block"
        ],
        answer: 0
    },
    {
        question: "[Chapter 13] What is the purpose of rethrowing an exception?",
        options: [
            "To restart the program",
            "To pass the exception to another catch block",
            "To delete the exception",
            "To prevent the exception from being handled"
        ],
        answer: 1
    },
    {
        question: "[Chapter 13] Which of the following is a subclass of logic_error?",
        options: [
            "overflow_error",
            "invalid_argument",
            "underflow_error",
            "range_error"
        ],
        answer: 1
    },
    {
        question: "[Chapter 13] Which of these would likely throw a runtime_error?",
        options: [
            "Passing the wrong type to a function",
            "Using a null pointer",
            "Providing a negative array index",
            "Misspelling a keyword"
        ],
        answer: 1
    },
    {
        question: "[Chapter 13] What is the primary benefit of exception handling?",
        options: [
            "It replaces all conditional checks",
            "It separates normal logic from error-handling logic",
            "It eliminates syntax errors",
            "It automatically fixes input errors"
        ],
        answer: 1
    },
    {
        question: "[Chapter 13] What does the call stack represent?",
        options: [
            "All active variables in memory",
            "A list of all exceptions thrown",
            "The chain of function calls leading to the exception",
            "The program's output buffer"
        ],
        answer: 2
    },
    {
        question: "[Chapter 13] What happens when a function throws an exception?",
        options: [
            "The nearest matching catch block handles it",
            "The program immediately quits",
            "The function continues normally",
            "The compiler rewrites the function"
        ],
        answer: 0
    },
    {
        question: "[Chapter 13] Which code example is recommended for handling invalid_argument exceptions?",
        options: [
            "try-catch block",
            "goto statement",
            "while(true) loop",
            "assert()"
        ],
        answer: 0
    },
    {
        question: "[Chapter 13] When should you create custom exception classes?",
        options: [
            "Whenever possible",
            "Only when built-in exceptions don’t describe the error well",
            "Only for file I/O",
            "Never"
        ],
        answer: 1
    },
    {
        question: "[Chapter 13] What happens to local variables when an exception is thrown?",
        options: [
            "They persist indefinitely",
            "They are automatically destroyed as stack frames unwind",
            "They become global variables",
            "They are saved for later use"
        ],
        answer: 1
    },
    {
        question: "[Chapter 13] Which of the following is TRUE about exception handling?",
        options: [
            "Exceptions must always be caught",
            "Only one catch block is allowed",
            "Exceptions propagate up the call stack until handled",
            "Exceptions cannot be thrown from functions"
        ],
        answer: 2
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
      {
        question: "[Chapter 14] What is a class in C++?",
        options: [
            "A function that stores data",
            "A blueprint for creating objects",
            "A type of namespace",
            "A special type of array"
        ],
        answer: 1
    },
    {
        question: "[Chapter 14] What keyword is used to create an object from a class?",
        options: [
            "new",
            "create",
            "object",
            "No keyword is required"
        ],
        answer: 3
    },
    {
        question: "[Chapter 14] Which term refers to the variables inside a class?",
        options: [
            "Attributes (data members)",
            "Constructors",
            "Methods",
            "Interfaces"
        ],
        answer: 0
    },
    {
        question: "[Chapter 14] Which of the following is TRUE about constructors?",
        options: [
            "They must return an int",
            "They have no return type",
            "They must follow the name of the file",
            "They must be public"
        ],
        answer: 1
    },
    {
        question: "[Chapter 14] What is the purpose of a constructor?",
        options: [
            "To destroy objects",
            "To initialize an object when it is created",
            "To overload operators",
            "To compile class code"
        ],
        answer: 1
    },
    {
        question: "[Chapter 14] What is the keyword used to refer to the calling object inside a class?",
        options: [
            "self",
            "this",
            "caller",
            "object"
        ],
        answer: 1
    },
    {
        question: "[Chapter 14] What is private encapsulation used for?",
        options: [
            "To allow global access",
            "To hide implementation details",
            "To slow down execution",
            "To prevent object creation"
        ],
        answer: 1
    },
    {
        question: "[Chapter 14] What is a class method also called?",
        options: [
            "Data member",
            "Function member",
            "Static variable",
            "Pointer function"
        ],
        answer: 1
    },
    {
        question: "[Chapter 14] Where are member function definitions usually stored?",
        options: [
            "In header files only",
            "In .cpp implementation files",
            "Inside main()",
            "In namespaces only"
        ],
        answer: 1
    },
    {
        question: "[Chapter 14] What is the purpose of a destructor?",
        options: [
            "To copy an object",
            "To destroy an object and free resources",
            "To initialize class constants",
            "To declare private variables"
        ],
        answer: 1
    },
    {
        question: "[Chapter 14] What symbol is used to define the scope of a class function?",
        options: [
            "->",
            "::",
            ":=",
            "<>"
        ],
        answer: 1
    },
    {
        question: "[Chapter 14] What is the default access level for class members?",
        options: [
            "public",
            "protected",
            "private",
            "global"
        ],
        answer: 2
    },
    {
        question: "[Chapter 14] What is an accessor function?",
        options: [
            "A function that modifies data",
            "A function that retrieves data without changing it",
            "A constructor with parameters",
            "A destructor that cleans memory"
        ],
        answer: 1
    },
    {
        question: "[Chapter 14] What is a mutator function?",
        options: [
            "A function that deletes a variable",
            "A function that changes a data member",
            "A function that returns a constant reference",
            "A function that overloads an operator"
        ],
        answer: 1
    },
    {
        question: "[Chapter 14] What is the purpose of a header file for a class?",
        options: [
            "To store data for runtime",
            "To declare class definitions and member prototypes",
            "To execute class functions",
            "To replace .cpp files"
        ],
        answer: 1
    },
    {
        question: "[Chapter 14] Which function automatically gets called when an object goes out of scope?",
        options: [
            "constructor",
            "destructor",
            "copy constructor",
            "initializer"
        ],
        answer: 1
    },
    {
        question: "[Chapter 14] How is a class typically split across files?",
        options: [
            "Class in .cpp only",
            "Class in main.cpp",
            "Declaration in .h, definition in .cpp",
            "Entire class inside a namespace"
        ],
        answer: 2
    },
    {
        question: "[Chapter 14] Which special function is used to make a copy of an object?",
        options: [
            "copy constructor",
            "initializer",
            "mutator",
            "duplicate()"
        ],
        answer: 0
    },
    {
        question: "[Chapter 14] What happens if you do NOT define a constructor?",
        options: [
            "The class becomes invalid",
            "The compiler creates a default constructor",
            "Objects cannot be created",
            "All data members become private"
        ],
        answer: 1
    },
    {
        question: "[Chapter 14] Which of the following correctly creates an object?",
        options: [
            "class Car();",
            "Car myCar;",
            "Car = new Car();",
            "new Car myCar;"
        ],
        answer: 1
    },

  // ---------------- TYPE OF ERRORS ----------------
      {
        question: "[Chapter Type of Error] What type of error is shown?\n\nint x = 'hello';\nC",
        options: ["Syntax error", "Logic error", "Runtime error", "Compile-time error"],
        answer: 3
    },
    {
        question: "[Chapter Type of Error] What type of error is shown?\n\ncout << \"Value: \" << value\nC",
        options: ["Syntax error", "Runtime error", "Logic error", "No error"],
        answer: 0
    },
    {
        question: "[Chapter Type of Error] What type of error is shown?\n\nint x = 10 / 0;\nC",
        options: ["Runtime error", "Compile-time error", "Logic error", "Syntax error"],
        answer: 0
    },
    {
        question: "[Chapter Type of Error] What type of error is shown?\n\nif (value = 5) { }\nC",
        options: ["Logic error", "Syntax error", "Runtime error", "Compile-time error"],
        answer: 0
    },
    {
        question: "[Chapter Type of Error] What type of error is shown?\n\nint numbers[3];\nnumbers[5] = 10;\nC",
        options: ["Logic error", "Syntax error", "Runtime error", "Compile-time error"],
        answer: 2
    },
    {
        question: "[Chapter Type of Error] What type of error is shown?\n\nstring name;\ncin >> nam;\nC",
        options: ["Compile-time error", "Runtime error", "Logic error", "Syntax error"],
        answer: 0
    },
    {
        question: "[Chapter Type of Error] What type of error is shown?\n\nfor (int i=0; i<=5; i++) { total += values[i]; }\nC",
        options: ["Logic error", "Syntax error", "Runtime error", "Compile-time error"],
        answer: 0
    },
    {
        question: "[Chapter Type of Error] What type of error is shown?\n\ncout << \"Hello\"\nC",
        options: ["Syntax error", "Runtime error", "Logic error", "None"],
        answer: 0
    },
    {
        question: "[Chapter Type of Error] What type of error is shown?\n\nint x; cout << x;\nC",
        options: ["Runtime error", "Logic error", "Compile-time error", "Syntax error"],
        answer: 1
    },
    {
        question: "[Chapter Type of Error] What type of error is shown?\n\nwhile(true) { }\nC",
        options: ["Logic error", "Runtime error", "Syntax error", "Compile-time error"],
        answer: 1
    },
    {
        question: "[Chapter Type of Error] What type of error is shown?\n\ndouble result = sqrt(-25);\nC",
        options: ["Logic error", "Runtime error", "Syntax error", "Compile-time error"],
        answer: 1
    },
    {
        question: "[Chapter Type of Error] What type of error is shown?\n\nint x = 10;\nif (x > 5) cout << \"low\";\nC",
        options: ["Logic error", "Syntax error", "Compile-time error", "Runtime error"],
        answer: 0
    },
    {
        question: "[Chapter Type of Error] What type of error is shown?\n\ncout << \"Test\" << endl))\nC",
        options: ["Syntax error", "Runtime error", "Logic error", "None"],
        answer: 0
    },
    {
        question: "[Chapter Type of Error] What type of error is shown?\n\ndouble price = \"nine\";\nC",
        options: ["Compile-time error", "Logic error", "Syntax error", "Runtime error"],
        answer: 0
    },
    {
        question: "[Chapter Type of Error] What type of error is shown?\n\nint x = 2;\nint y = x / (x - 2);\nC",
        options: ["Logic error", "Runtime error", "Syntax error", "Compile-time error"],
        answer: 1
    },
    {
        question: "[Chapter Type of Error] What type of error is shown?\n\nfloat x = 0.1 + 0.2;\nif (x == 0.3) {}\nC",
        options: ["Logic error", "Runtime error", "Compile-time error", "Syntax error"],
        answer: 0
    },
    {
        question: "[Chapter Type of Error] What type of error is shown?\n\nstring input;\ncin >> input;\nint num = stoi(input);\nC",
        options: ["Runtime error", "Logic error", "Syntax error", "Compile-time error"],
        answer: 0
    },
    {
        question: "[Chapter Type of Error] What type of error is shown?\n\nint main( { return 0; }\nC",
        options: ["Syntax error", "Runtime error", "Logic error", "Compile-time error"],
        answer: 0
    },
    {
        question: "[Chapter Type of Error] What type of error is shown?\n\nint age;\ncout << \"Age: \" << age;\nC",
        options: ["Logic error", "Compile-time error", "Runtime error", "Syntax error"],
        answer: 0
    },
    {
        question: "[Chapter Type of Error] What type of error is shown?\n\nint* p = nullptr;\n*p = 10;\nC",
        options: ["Runtime error", "Compile-time error", "Logic error", "Syntax error"],
        answer: 0
    },
    {
        question: "[Chapter Type of Error] What type of error is shown?\n\nif (x > 0);\n{ cout << x; }\nC",
        options: ["Logic error", "Syntax error", "Compile-time error", "Runtime error"],
        answer: 0
    },
    {
        question: "[Chapter Type of Error] What type of error is shown?\n\nfor i in range(5):\nC",
        options: ["Syntax error", "Logic error", "Runtime error", "Compile-time error"],
        answer: 0
    },
    {
        question: "[Chapter Type of Error] What type of error is shown?\n\nint x = \"5\" + 3;\nC",
        options: ["Compile-time error", "Logic error", "Runtime error", "Syntax error"],
        answer: 0
    },
    {
        question: "[Chapter Type of Error] What type of error is shown?\n\nint nums[2] = {1,2,3};\nC",
        options: ["Compile-time error", "Logic error", "Runtime error", "Syntax error"],
        answer: 0
    },
    {
        question: "[Chapter Type of Error] What type of error is shown?\n\nwhile(x = 5) { }\nC",
        options: ["Logic error", "Syntax error", "Compile-time error", "Runtime error"],
        answer: 0
    },
    {
        question: "[Chapter Type of Error] What type of error is shown?\n\ncout << \"Result: \" << (5/2) << endl;\nC",
        options: ["Logic error", "Runtime error", "Compile-time error", "Syntax error"],
        answer: 0
    },
    {
        question: "[Chapter Type of Error] What type of error is shown?\n\nint arr[3];\ncout << arr[100];\nC",
        options: ["Runtime error", "Logic error", "Syntax error", "Compile-time error"],
        answer: 0
    },
    {
        question: "[Chapter Type of Error] What type of error is shown?\n\nif (true)\n    cout << \"Hi\"\nelse\n    cout << \"Bye\";\nC",
        options: ["Syntax error", "Logic error", "Compile-time error", "Runtime error"],
        answer: 0
    },
    {
        question: "[Chapter Type of Error] What type of error is shown?\n\ndouble d = sqrt('a');\nC",
        options: ["Compile-time error", "Runtime error", "Logic error", "Syntax error"],
        answer: 0
    },
    {
        question: "[Chapter Type of Error] What type of error is shown?\n\nint num = stoi(\"xyz\");\nC",
        options: ["Runtime error", "Logic error", "Syntax error", "Compile-time error"],
        answer: 0
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

// --------------------------------------------------
// START BUTTON (modified to include chapter selection)
// --------------------------------------------------
startBtn.onclick = () => {
let name = playerInput.value.trim();
const lowerName = name.toLowerCase();


if (name === "") {
alert("Please enter your name to begin.");
return;
}


// Your original name rules preserved 100%
if (lowerName.includes("owen") && name !== "Owen (With Hat)" && name !== "Owen (Without Hat)") {
alert("Please specify: Owen (With Hat) or Owen (Without Hat)");
return;
}
if (["emma", "emmalyssa"].includes(lowerName)) name = "darling <3";
if (lowerName === "murad") name = "Murad (where is burd 2?)";
if (["matthew", "augoboss"].includes(lowerName)) name = "Let's Do Pumpkin";
if (["aiden", "darkness"].includes(lowerName)) name = "Little Cheese IV";
if (lowerName === "remy") name = "Remy (Pool master)";
if (lowerName === "cole") name = "My Friend Cole";
if (["jamari", "bread and jam", "breadnjam"].includes(lowerName)) name = "You should know your own name...";


const blocked = ["blanc", "saeed", "sergio", "sultan", "mccully", "harry", "test", "fuck you", "bitch", "alyssa sucks", "allie sucks"];
if (blocked.includes(lowerName)) {
alert("Access denied.");
window.location.href = "https://www.google.com";
return;
}


playerName = name;
playerDisplay.textContent = `Player: ${playerName}`;
playerDisplay.classList.remove("hidden");


startScreen.classList.add("hidden");
quizBox.classList.remove("hidden");


basicMode = basicModeToggle.checked;


// ------------ MODE HANDLING ------------
if (modeSelect.value === "chapter") {
const chap = chapterSelect.value;
selectedQuestions = questionPool.filter(q => q.question.includes(`[Chapter ${chap}]`));
totalQuestions = selectedQuestions.length;
} else {
totalQuestions = parseInt(questionCountSelect.value);
selectedQuestions = questionPool.sort(() => 0.5 - Math.random()).slice(0, totalQuestions);
}


current = 0;
score = 0;
questionsCompleted = 0;
timeLeft = 60;


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

  let questionText = q.question;

// If question ends with "C", treat everything after two linebreaks as code
if (questionText.endsWith("C")) {
    questionText = questionText.slice(0, -1); // remove the 'C' marker

    // Split text: before code vs code block
    const parts = questionText.split(/\n\s*\n/); // detect blank line separating text/code
    const intro = parts[0];
    const codeBlock = parts.slice(1).join("\n\n");

    questionEl.innerHTML =
        `Q${current + 1}: ${intro}<pre><code>${codeBlock}</code></pre>`;
} else {
    // Normal (non-code) display
    questionEl.textContent = `Q${current + 1}: ${q.question}`;
}


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






Personal project game where the goal is to make the phrase "Hello World" appear as output, with constraints of varying difficulty in each 'World' (level). 

Currently the game is being made using only HTML/CSS/Vanilla JS, but the plan is to refactor the project into a fullstack MERN app once the layout and transition between levels is done.

Current MERN ideas:
MongoDB: For storing World objects representing each level.
Express & Node: API calls to fetch World objects from DB to use in games. 
React: For frontend. 

One major refactor will be turning the levels into objects, with the following properties:
-Name
-Difficulty
-input handler (function to act as event handler for keyboard and/or mouse)
-hint
-type (ex: keyboard, click, etc.)
-usesGameArea (boolean to determine weather gameArea section is displayed on screen)


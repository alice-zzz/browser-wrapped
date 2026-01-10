# Browser Wrapped
Discover your browser history with fun statistics and narration, much like "Spotify Wrapped"!

# Why I Built This
Spotify Wrapped is my music highlight of the year, and I was recently introduced to a fanmande "Youtube Wrapped" that made me question if this fun data summary concept could be applied to other platforms as well. Browser history seemed like the perfect next choice. Additionally, I wanted to gain familiarity with frontend tools like ReactJS and TailwindCSS, so a browser wrapped project that required a dynamic UI to give the summary a narrative flow seemed perfect.

# Tools and Technologies
Frontend: I went into this project knowing that I wanted to learn to use React. It was a strong choice because it allowed me to build reusable components like the slide transitions and it is great for dynamic UIs. I styled my front-end with TailwindCSS, which allowed me to iterate quickly without long CSS files.

Backend: Since many consider their browser history to be private information, I chose not to store anything. As such, this project did not require a backend, as all the data processing can be done on the user-side.

Parsing: To take the raw browser history and turn it into fun insights, I used FileReaderAPI to read the uploaded file, and Javascript to sort through parse the information. 

# Installation and Setup
Clone this project: git clone https://github.com/alice-zzz/browser-wrapped.git

Navigate to project directory: cd browser-wrapped

Install dependencies: npm install

Run the development server: npm run dev

Visit the local URL in your terminal


# Future Improvements
UI: While the slides are dynamic and the base has been made, I have yet to add a fun layout. This will be added as soon as I think of a theme, as it will enhance the storytelling experience.

Parsing multiple formats: Currently, the user must upload their browser history as a JSON file to be parsed. I would like to expand this. 

Creative Dalaal Frontend Assignment
Build a simple frontend application where the user can upload and search text files, displaying total occurrences and highlighted results

Features

File Upload: Users can upload text files (.txt) to the application.
File Search: Users can search for words or phrases within the uploaded file content.
Content Display: The content of the uploaded file is displayed in the application.
Occurrence Count: The application shows the total number of occurrences of the searched text within the file content.
Highlighted Results: The searched text is highlighted within the displayed file content for better visibility.
Keyboard Shortcuts: The application supports keyboard shortcuts for file upload (Cmd+U or Ctrl+U) and focusing on the search input (Cmd+F or Ctrl+F).
Search History: The application keeps track of the user's search history (only when the search query is entered and the user presses Enter).

Design Decisions

Search Behavior: The search functionality starts as the user types, providing a better user experience. However, the search query is added to the search history only when the user presses Enter, to avoid populating the history with incomplete strings.

Tech Stack

React: A JavaScript library for building user interfaces.
Tailwind CSS: A utility-first CSS framework for rapidly building custom designs.
Sonner: A lightweight and accessible React toast library.
Lucide React: A set of beautiful and consistent icons for React applications.

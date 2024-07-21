# Cryptonite

Cryptonite is a cryptocurrency tracking application that uses the CoinGecko API to provide real-time information on various cryptocurrencies. Built with Next.js, Tailwind CSS, and TypeScript, it offers a modern and responsive user interface with dynamic features.

## Tech Stack

- Next.js
- Tailwind CSS
- TypeScript

## Features

1. **Suggestive Search Bar**
   - Implements debounce for efficient API calls
   - Provides real-time suggestions as you type

2. **Drag and Drop Functionality**
   - Easily add cryptocurrencies to your tracking list
   - Rearrange tracked cryptocurrencies with intuitive drag and drop

3. **Real-time Data Updates**
   - Automatically refetches data every 1 minute
   - Ensures you always see the latest prices and market information

4. **Caching Implementation**
   - Optimizes performance by caching frequently accessed data
   - Reduces unnecessary API calls

5. **Dynamic Theme Switching**
   - Supports both dark and light modes
   - Seamlessly switch between themes for comfortable viewing in any environment

6. **API Rate Limit Handling**
   - Gracefully handles CoinGecko API rate limits
   - Displays appropriate error messages to users when limits are reached

7. **Comprehensive Cryptocurrency Graphs**
   - Displays interactive charts for each cryptocurrency
   - Includes graphs for daily, weekly, monthly, and yearly price trends
   - Visualizes market capitalization over time
   - Shows trading volume fluctuations
   - Allows users to toggle between different time frames and metrics for detailed analysis


## Demo


https://github.com/user-attachments/assets/83805111-efda-454d-8c1d-c73b70342cfd


   

### Home Page

![image](https://github.com/user-attachments/assets/a50af8e0-a143-42b7-bd2e-f0dcbb3b8fcc)

### Trending Page

![image](https://github.com/user-attachments/assets/cc0c5d02-af49-415b-8ef4-52f2556cc196)

### Explore Page

![image](https://github.com/user-attachments/assets/99297d79-bf3b-4db7-b1dc-663a46726316)


### WatchList Page

![image](https://github.com/user-attachments/assets/3a03de68-2cf7-483f-97fa-12f233064835)

### Coin Page

![image](https://github.com/user-attachments/assets/635ee876-9365-4dde-9a02-1e86fd6bf2c0)


## Installation

Follow these steps to set up the Cryptonite application on your local machine:

1. **Clone the Repository:**

    ```bash
    git clone https://github.com/harshpathakzz/cryptonite.git
    ```

2. **Navigate to the Project Directory:**

    ```bash
    cd cryptonite
    ```

3. **Install Dependencies:**

    Install the necessary dependencies for the project:

    ```bash
    npm install
    ```

4. **Set Up Environment Variables:**

    Create a .env file in the project root and add your CoinGecko API key:

    ```bash
    NEXT_PUBLIC_API_KEY=your_coingecko_api_key
    ```

5. **Run the Development Server:**

    Start the Next.js development server:

    ```bash
    npm run dev
    ```

    After running this command, the application will be available locally at [http://localhost:3000](http://localhost:3000).
















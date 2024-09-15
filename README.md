# RTSP-Tracker

**RTSP-Tracker** (Real Time Stock Price - Tracker) is a web application that allows users to track the real-time stock prices of various stock tickers. The application fetches stock data from Yahoo Finance and displays it in a user-friendly interface with dynamic updates and visual indicators.

## Features

- **Add Stocks:** Users can add stock tickers to track.

- **Real-Time Updates:** The application updates stock prices every few seconds.

- **Visual Indicators:** Stocks are visually indicated with color codes based on price changes.

- **Loader Animation:** A dynamic circular loader with synchronized animations.

## Technologies Used

- **Front-End:** HTML, CSS, JavaScript, jQuery

- **Back-End:** Flask (Python)

- **API:** Yahoo Finance (via `yfinance` library)

## Getting Started

### Prerequisites

- Python 3.x

- Flask

- `yfinance` library

- A modern web browser

### Installation

1.  **Clone the Repository:**

```bash

git clone https://github.com/ankitpakhale/RTSP-Tracker.git

cd RTSP-Tracker

```

2.  **Set Up Python Environment:**

- **On Linux/Mac:**

```bash

python3 -m venv venv

source venv/bin/activate

```

- **On Windows:**

```bash

python -m venv venv

venv\Scripts\activate

```

3.  **Install Required Python Packages:**

Ensure you have the `requirements.txt` file in your project directory and then run:

```bash

pip install -r requirements.txt

```

4.  **Run the Application:**

```bash

python app.py

```

The application will be available at `http://127.0.0.1:5000/` in your web browser.

### File Structure

- **`app.py`**: Flask application backend that handles requests and provides stock data.

- **`templates/index.html`**: HTML file that serves the front-end of the application.

- **`static/style.css`**: CSS file for styling the application.

- **`static/script.js`**: JavaScript file for handling front-end logic and interactions.

- **`requirements.txt`**: Python dependencies required for the project.

### Customization

- **Change the Update Interval:**

Edit the `COUNT_TIME` variable in `static/script.js` at line no 3 to adjust how often the stock prices are updated (in seconds). The loader's animation duration will automatically synchronize with this value, ensuring that the loader adjusts its timing and size based on the new update interval.

### Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes. Ensure your code adheres to the project's coding standards and includes relevant tests.

### License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

### Contact

For any questions or feedback, please contact [akp3067@gmail.com](mailto:akp3067@gmail.com) or visit [www.ankitpakhale.netlify.app](http://ankitpakhale.netlify.app).

---

Thank you for using **RTSP-Tracker**. Happy tracking!

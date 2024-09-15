var tickers = JSON.parse(localStorage.getItem('tickers')) || [];
var lastPrices = {};
const COUNT_TIME = 10;
var counter = COUNT_TIME;
var initialLoaderSize = 80; // Initial size of the loader

// Function to set the CSS variable for animation duration
function setLoaderAnimationDuration(duration) {
    document.documentElement.style.setProperty('--count-time', duration + 's');
}

function startUpdateCycle() {
    updatePrices();
    // Set the loader animation duration dynamically
    setLoaderAnimationDuration(COUNT_TIME);

    setInterval(function () {
        counter--;
        $('#counter').text(counter);
        var newSize = Math.max(0, (initialLoaderSize * counter) / COUNT_TIME); // Calculate new size
        $('#loader').css({
            width: newSize + 'px',
            height: newSize + 'px'
        });

        if (counter <= 0) {
            updatePrices();
            counter = COUNT_TIME;
            $('#loader').css({
                width: initialLoaderSize + 'px',
                height: initialLoaderSize + 'px'
            }); // Reset loader size
        }
    }, 1000);
}

$(document).ready(function () {
    tickers.forEach(function (ticker) {
        addTickerToGrid(ticker);
    });

    $('#add-ticker-form').submit(function (e) {
        e.preventDefault();
        var newTicker = $('#new-ticker').val().toUpperCase();
        if (!tickers.includes(newTicker)) {
            $.ajax({
                url: '/get_stock_data',
                type: 'POST',
                data: JSON.stringify({ 'ticker': newTicker }),
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                success: function (data) {
                    tickers.push(newTicker);
                    localStorage.setItem('tickers', JSON.stringify(tickers));
                    addTickerToGrid(newTicker);
                    updatePrices(); // Update immediately after adding
                },
                error: function (xhr, status, error) {
                    if (xhr.status === 500) {
                        alert('Error: Unable to fetch stock data. Please check the ticker symbol and try again.');
                    } else {
                        alert('An error occurred: ' + error);
                    }
                }
            });
        }
        $('#new-ticker').val(''); // Clear the input
    });

    $('#tickers-grid').on('click', '.remove-btn', function () {
        var tickerToRemove = $(this).data('ticker');
        tickers = tickers.filter(t => t !== tickerToRemove);
        localStorage.setItem('tickers', JSON.stringify(tickers));
        $(`#${tickerToRemove}`).remove();
    });

    startUpdateCycle();
});

function addTickerToGrid(ticker) {
    if ($(`#${ticker}`).length === 0) { // Avoid duplicates
        $('#tickers-grid').append(`
            <div id="${ticker}" class="stock-box">
                <h2>${ticker}</h2>
                <p id="${ticker}--price"></p>
                <p id="${ticker}--pct"></p>
                <button class="remove-btn" data-ticker="${ticker}">Remove</button>
            </div>
        `);
    }
}

function updatePrices() {
    tickers.forEach(function (ticker) {
        $.ajax({
            url: '/get_stock_data',
            type: 'POST',
            data: JSON.stringify({ 'ticker': ticker }),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: function (data) {
                var changePercent = ((data.currentPrice - data.openPrice) / data.openPrice) * 100;
                var colorClass;
                if (changePercent <= -2) {
                    colorClass = 'dark-red';
                } else if (changePercent < 0) {
                    colorClass = 'red';
                } else if (changePercent == 0) {
                    colorClass = 'gray';
                } else if (changePercent <= 2) {
                    colorClass = 'green';
                } else {
                    colorClass = 'dark-green';
                }

                $(`#${ticker}--price`).text(`$${data.currentPrice.toFixed(2)}`);
                $(`#${ticker}--pct`).text(`${changePercent.toFixed(2)}%`);
                $(`#${ticker}--price`).removeClass('dark-red red gray green dark-green').addClass(colorClass);
                $(`#${ticker}--pct`).removeClass('dark-red red gray green dark-green').addClass(colorClass);

                var flashClass;
                if (lastPrices[ticker] > data.currentPrice) {
                    flashClass = 'red-flash';
                } else if (lastPrices[ticker] < data.currentPrice) {
                    flashClass = 'green-flash';
                } else {
                    flashClass = 'gray-flash';
                }
                lastPrices[ticker] = data.currentPrice;

                $(`#${ticker}`).addClass(flashClass);
                setTimeout(function () {
                    $(`#${ticker}`).removeClass(flashClass);
                }, 1000);
            },
            error: function (xhr, status, error) {
                if (xhr.status === 500) {
                    alert('Error: Unable to fetch stock data for ' + ticker);
                } else {
                    alert('An error occurred: ' + error);
                }
            }
        });
    });
}

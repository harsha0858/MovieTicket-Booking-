import {
    getMovies,
    createBooking
} from "./api.js";

import {
    getCurrentUser,
    logoutUser
} from "./auth.js";

import {
    addBooking,
    getBookings,
    cancelBooking,
    clearBookings,
    getBookedSeats
} from "./storage.js";


const currentUser =
    getCurrentUser();


if (!currentUser) {

    window.location.href =
        "./login.html";

}


const movieContainer =
    document.querySelector(
        "#movieContainer"
    );

const searchInput =
    document.querySelector(
        "#searchInput"
    );

const bookingSection =
    document.querySelector(
        "#bookingSection"
    );

const moviesSection =
    document.querySelector(
        "#movies"
    );

const selectedMovieInfo =
    document.querySelector(
        "#selectedMovieInfo"
    );

const dateContainer =
    document.querySelector(
        "#dateContainer"
    );

const theatreContainer =
    document.querySelector(
        "#theatreContainer"
    );

const timeContainer =
    document.querySelector(
        "#timeContainer"
    );

const seatContainer =
    document.querySelector(
        "#seatContainer"
    );

const summaryContent =
    document.querySelector(
        "#summaryContent"
    );

const bookingHistory =
    document.querySelector(
        "#bookingHistory"
    );

const userName =
    document.querySelector(
        "#userName"
    );

const toast =
    document.querySelector(
        "#toast"
    );

const toastMessage =
    document.querySelector(
        "#toastMessage"
    );


userName.innerText =
    `Hi, ${currentUser.name}`;


let allMovies = [];

let selectedMovie = null;

let selectedDate = null;

let selectedTheatre = null;

let selectedTime = null;

let selectedSeats = [];


const theatres = [
    "PVR Cinemas",
    "INOX",
    "KG Cinemas"
];


const times = [
    "10:00 AM",
    "1:30 PM",
    "4:30 PM",
    "7:30 PM",
    "10:00 PM"
];


const showToast = (
    message
) => {

    toastMessage.innerText =
        message;

    toast.classList.add(
        "show"
    );

    setTimeout(() => {

        toast.classList.remove(
            "show"
        );

    }, 2500);

};


const renderMovies = (
    movieList
) => {

    movieContainer.innerHTML = "";


    if (!movieList.length) {

        movieContainer.innerHTML =
            `<p class="empty">
                No movies found.
            </p>`;

        return;

    }


    movieList.forEach(movie => {

        const card =
            document.createElement(
                "div"
            );

        card.className =
            "movie-card";


        card.innerHTML = `

            <img
                src="${movie.image}"
                alt="${movie.title}"
            >

            <div class="movie-info">

                <h3>
                    ${movie.title}
                </h3>

                <div class="movie-meta">

                    <span>
                        ${movie.genre}
                    </span>

                    <span>
                        ⭐ ${movie.rating}
                    </span>

                </div>

                <p>
                    ${movie.language}
                    •
                    ${movie.duration}
                </p>

                <button
                    class="primary-btn book-movie"
                    data-id="${movie.id}"
                >
                    Book Now
                </button>

            </div>

        `;


        movieContainer.appendChild(
            card
        );

    });


    document
        .querySelectorAll(
            ".book-movie"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    openBooking(
                        button.dataset.id
                    );

                }
            );

        });

};


const openBooking = async id => {

    selectedMovie =
        allMovies.find(
            movie =>
                movie.id === Number(id)
        );


    selectedDate = null;

    selectedTheatre = null;

    selectedTime = null;

    selectedSeats = [];


    moviesSection.classList.add(
        "hidden"
    );

    bookingSection.classList.remove(
        "hidden"
    );


    renderSelectedMovie();

    renderDates();

    renderTheatres();

    renderTimes();

    renderSeats();

    updateSummary();


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

};


const renderSelectedMovie = () => {

    selectedMovieInfo.innerHTML = `

        <img
            src="${selectedMovie.image}"
            alt="${selectedMovie.title}"
        >

        <div>

            <p class="small-title">
                SELECTED MOVIE
            </p>

            <h2>
                ${selectedMovie.title}
            </h2>

            <p>
                ${selectedMovie.genre}
                •
                ${selectedMovie.language}
                •
                ${selectedMovie.duration}
            </p>

            <strong>
                ⭐ ${selectedMovie.rating}
                &nbsp; ₹${selectedMovie.price} / seat
            </strong>

        </div>

    `;

};


const renderDates = () => {

    dateContainer.innerHTML = "";


    for (
        let i = 0;
        i < 5;
        i++
    ) {

        const date =
            new Date();

        date.setDate(
            date.getDate() + i
        );


        const value =
            date
                .toISOString()
                .split("T")[0];


        const button =
            document.createElement(
                "button"
            );


        button.innerText =
            date.toLocaleDateString(
                "en-IN",
                {
                    weekday: "short",
                    day: "numeric",
                    month: "short"
                }
            );


        button.dataset.date =
            value;


        button.addEventListener(
            "click",
            () => {

                selectedDate =
                    value;

                selectedSeats = [];

                document
                    .querySelectorAll(
                        ".date-container button"
                    )
                    .forEach(
                        item =>
                            item.classList.remove(
                                "active"
                            )
                    );

                button.classList.add(
                    "active"
                );

                renderSeats();

                updateSummary();

            }
        );


        dateContainer.appendChild(
            button
        );

    }

};


const renderTheatres = () => {

    theatreContainer.innerHTML = "";


    theatres.forEach(
        theatre => {

            const button =
                document.createElement(
                    "button"
                );

            button.innerHTML = `

                <span>
                    ${theatre}
                </span>

                <small>
                    Premium Cinema
                </small>

            `;


            button.addEventListener(
                "click",
                () => {

                    selectedTheatre =
                        theatre;

                    selectedSeats = [];

                    document
                        .querySelectorAll(
                            ".theatre-container button"
                        )
                        .forEach(
                            item =>
                                item.classList.remove(
                                    "active"
                                )
                        );

                    button.classList.add(
                        "active"
                    );

                    renderSeats();

                    updateSummary();

                }
            );


            theatreContainer.appendChild(
                button
            );

        }
    );

};


const renderTimes = () => {

    timeContainer.innerHTML = "";


    times.forEach(
        time => {

            const button =
                document.createElement(
                    "button"
                );


            button.innerText =
                time;


            button.addEventListener(
                "click",
                () => {

                    selectedTime =
                        time;

                    selectedSeats = [];

                    document
                        .querySelectorAll(
                            ".time-container button"
                        )
                        .forEach(
                            item =>
                                item.classList.remove(
                                    "active"
                                )
                        );

                    button.classList.add(
                        "active"
                    );

                    renderSeats();

                    updateSummary();

                }
            );


            timeContainer.appendChild(
                button
            );

        }
    );

};


const renderSeats = () => {

    seatContainer.innerHTML = "";


    const rows =
        ["A", "B", "C", "D", "E"];


    let bookedSeats = [];


    if (
        selectedDate &&
        selectedTheatre &&
        selectedTime
    ) {

        bookedSeats =
            getBookedSeats(
                selectedMovie.id,
                selectedDate,
                selectedTheatre,
                selectedTime
            );

    }


    rows.forEach(row => {

        const rowDiv =
            document.createElement(
                "div"
            );

        rowDiv.className =
            "seat-row";


        const label =
            document.createElement(
                "strong"
            );

        label.innerText =
            row;


        rowDiv.appendChild(
            label
        );


        for (
            let i = 1;
            i <= 8;
            i++
        ) {

            const seatId =
                `${row}${i}`;


            const button =
                document.createElement(
                    "button"
                );


            button.innerText =
                i;


            button.className =
                "seat";


            if (
                bookedSeats.includes(
                    seatId
                )
            ) {

                button.classList.add(
                    "booked"
                );

                button.disabled = true;

            }


            button.addEventListener(
                "click",
                () => {

                    if (
                        selectedSeats.includes(
                            seatId
                        )
                    ) {

                        selectedSeats =
                            selectedSeats.filter(
                                seat =>
                                    seat !== seatId
                            );

                        button.classList.remove(
                            "selected"
                        );

                    }
                    else {

                        selectedSeats.push(
                            seatId
                        );

                        button.classList.add(
                            "selected"
                        );

                    }

                    updateSummary();

                }
            );


            rowDiv.appendChild(
                button
            );

        }


        seatContainer.appendChild(
            rowDiv
        );

    });

};


const updateSummary = () => {

    const seats =
        selectedSeats.length;


    const total =
        seats *
        (
            selectedMovie
                ? selectedMovie.price
                : 0
        );


    summaryContent.innerHTML = `

        <div class="summary-row">
            <span>Movie</span>
            <strong>
                ${
                    selectedMovie
                        ? selectedMovie.title
                        : "Not selected"
                }
            </strong>
        </div>

        <div class="summary-row">
            <span>Date</span>
            <strong>
                ${
                    selectedDate
                        ? selectedDate
                        : "Not selected"
                }
            </strong>
        </div>

        <div class="summary-row">
            <span>Theatre</span>
            <strong>
                ${
                    selectedTheatre
                        ? selectedTheatre
                        : "Not selected"
                }
            </strong>
        </div>

        <div class="summary-row">
            <span>Time</span>
            <strong>
                ${
                    selectedTime
                        ? selectedTime
                        : "Not selected"
                }
            </strong>
        </div>

        <div class="summary-row">
            <span>Seats</span>
            <strong>
                ${
                    selectedSeats.length
                        ? selectedSeats.join(", ")
                        : "Not selected"
                }
            </strong>
        </div>

        <div class="summary-row">
            <span>Ticket Price</span>
            <strong>
                ₹${selectedMovie
                    ? selectedMovie.price
                    : 0}
            </strong>
        </div>

        <h3 class="total">
            Total: ₹${total}
        </h3>

    `;

};


document
    .querySelector("#bookBtn")
    .addEventListener(
        "click",
        async () => {

            if (
                !selectedDate ||
                !selectedTheatre ||
                !selectedTime
            ) {

                showToast(
                    "Please select date, theatre and time"
                );

                return;

            }


            if (
                selectedSeats.length === 0
            ) {

                showToast(
                    "Please select at least one seat"
                );

                return;

            }


            try {

                const booking = {

                    id: Date.now(),

                    userId:
                        currentUser.id,

                    userName:
                        currentUser.name,

                    movieId:
                        selectedMovie.id,

                    movie:
                        selectedMovie.title,

                    date:
                        selectedDate,

                    theatre:
                        selectedTheatre,

                    time:
                        selectedTime,

                    seats:
                        selectedSeats,

                    price:
                        selectedMovie.price,

                    total:
                        selectedSeats.length *
                        selectedMovie.price

                };


                const result =
                    await createBooking(
                        booking
                    );


                addBooking(
                    result.data
                );


                showToast(
                    "Booking successful 🎟️"
                );


                renderBookingHistory();


                setTimeout(() => {

                    document
                        .querySelector(
                            "#bookings"
                        )
                        .scrollIntoView({
                            behavior:
                                "smooth"
                        });

                }, 700);

            }
            catch (error) {

                showToast(
                    error.message
                );

            }

        }
    );


const renderBookingHistory = () => {

    const bookings =
        getBookings().filter(
            booking =>
                booking.userId ===
                currentUser.id
        );


    bookingHistory.innerHTML = "";


    if (!bookings.length) {

        bookingHistory.innerHTML = `

            <div class="empty-bookings">

                <div>
                    🎟️
                </div>

                <h3>
                    No bookings yet
                </h3>

                <p>
                    Your booked tickets will
                    appear here.
                </p>

            </div>

        `;

        return;

    }


    bookings
        .reverse()
        .forEach(
            booking => {

                const card =
                    document.createElement(
                        "div"
                    );


                card.className =
                    "booking-card";


                card.innerHTML = `

                    <div>

                        <h3>
                            🎬 ${booking.movie}
                        </h3>

                        <p>
                            📅 ${booking.date}
                        </p>

                        <p>
                            🏢 ${booking.theatre}
                        </p>

                        <p>
                            🕐 ${booking.time}
                        </p>

                        <p>
                            💺 ${booking.seats.join(", ")}
                        </p>

                    </div>

                    <div class="booking-right">

                        <strong>
                            ₹${booking.total}
                        </strong>

                        <button
                            class="cancel-btn"
                            data-id="${booking.id}"
                        >
                            Cancel
                        </button>

                    </div>

                `;


                bookingHistory.appendChild(
                    card
                );

            }
        );


    document
        .querySelectorAll(
            ".cancel-btn"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    cancelBooking(
                        Number(
                            button.dataset.id
                        )
                    );

                    renderBookingHistory();

                    showToast(
                        "Booking cancelled"
                    );

                }
            );

        });

};


document
    .querySelector("#clearBookingsBtn")
    .addEventListener(
        "click",
        () => {

            clearBookings();

            renderBookingHistory();

            showToast(
                "All bookings cleared"
            );

        }
    );


document
    .querySelector("#backBtn")
    .addEventListener(
        "click",
        () => {

            bookingSection.classList.add(
                "hidden"
            );

            moviesSection.classList.remove(
                "hidden"
            );

            document
                .querySelector("#movies")
                .scrollIntoView({
                    behavior: "smooth"
                });

        }
    );


document
    .querySelector("#exploreBtn")
    .addEventListener(
        "click",
        () => {

            document
                .querySelector("#movies")
                .scrollIntoView({
                    behavior: "smooth"
                });

        }
    );


searchInput.addEventListener(
    "input",
    () => {

        const value =
            searchInput.value
                .toLowerCase()
                .trim();


        const filtered =
            allMovies.filter(
                movie =>
                    movie.title
                        .toLowerCase()
                        .includes(value)
            );


        renderMovies(
            filtered
        );

    }
);


document
    .querySelectorAll(
        ".filter-btn"
    )
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                document
                    .querySelectorAll(
                        ".filter-btn"
                    )
                    .forEach(
                        item =>
                            item.classList.remove(
                                "active"
                            )
                    );


                button.classList.add(
                    "active"
                );


                const genre =
                    button.dataset.genre;


                const filtered =
                    genre === "All"
                        ? allMovies
                        : allMovies.filter(
                            movie =>
                                movie.genre ===
                                genre
                        );


                renderMovies(
                    filtered
                );

            }
        );

    });


document
    .querySelector("#logoutBtn")
    .addEventListener(
        "click",
        () => {

            logoutUser();

            window.location.href =
                "./login.html";

        }
    );


document
    .querySelector("#themeBtn")
    .addEventListener(
        "click",
        () => {

            document.body.classList.toggle(
                "dark"
            );

            const dark =
                document.body.classList.contains(
                    "dark"
                );

            localStorage.setItem(
                "movieTheme",
                dark
                    ? "dark"
                    : "light"
            );

        }
    );


if (
    localStorage.getItem(
        "movieTheme"
    ) === "dark"
) {

    document.body.classList.add(
        "dark"
    );

}


const init = async () => {

    allMovies =
        await getMovies();

    renderMovies(
        allMovies
    );

    renderBookingHistory();

};


init();
const STORAGE_KEY = "movieBookings";

export const getBookings = () => {

    const data = localStorage.getItem( STORAGE_KEY );
    return data ? JSON.parse(data) : [];
};
export const saveBookings = ( booking ) => {

    localStorage.setItem( STORAGE_KEY, JSON.stringify(bookings)
    );
};

export const addBooking = ( booking ) => {

    const bookings = getBookings();
    bookings.push( booking );
    saveBookings( bookings);
};
export const cancelBooking = ( bookingId) => {

    const bookings = getBookings();
    const updated = bookings.filter(booking => booking.id !== bookingId );
    saveBookings(updated);
};

export const clearBookings = () => {

  localStorage.removeItem(STORAGE_KEY);
}; g
export const getBookedSeats = (
    movieId,
    date,
    theatre,
    time
) => {

    const bookings = getBookings();

    return bookings.filter(booking =>

                booking.movieId === movieId &&
                booking.date === date &&
                booking.theatre === theatre &&
                booking.time === time
        )
        .flatMap(booking => booking.seats);
    };
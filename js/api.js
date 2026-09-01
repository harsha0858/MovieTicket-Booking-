import {
    movies
} from "./movies.js";


const delay = (
    time = 500
) => {

    return new Promise(
        resolve =>
            setTimeout(
                resolve,
                time
            )
    );

};


export const getMovies =
    async () => {

        await delay();

        return movies;

    };


export const getMovieById =
    async id => {

        await delay(300);

        const movie =
            movies.find(
                item =>
                    item.id === Number(id)
            );

        if (!movie) {

            throw new Error(
                "Movie not found"
            );

        }

        return movie;

    };


export const createBooking =
    async booking => {

        await delay(600);

        if (
            !booking.movie ||
            booking.seats.length === 0
        ) {

            throw new Error(
                "Invalid booking"
            );

        }

        return {

            success: true,

            message:
                "Booking successful",

            data:
                booking

        };

    };
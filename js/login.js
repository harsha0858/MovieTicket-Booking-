import {
    registerUser,
    loginUser,
    getCurrentUser
} from "./auth.js";


const loginForm =
    document.querySelector("#loginForm");

const registerForm =
    document.querySelector("#registerForm");

const showRegister =
    document.querySelector("#showRegister");

const showLogin =
    document.querySelector("#showLogin");

const toast =
    document.querySelector("#toast");

const toastMessage =
    document.querySelector("#toastMessage");


if (getCurrentUser()) {

    window.location.href =
        "./index.html";

}


const showToast = (
    message
) => {

    toastMessage.innerText =
        message;

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 2500);

};


showRegister.addEventListener(
    "click",
    () => {

        loginForm.classList.add(
            "hidden"
        );

        registerForm.classList.remove(
            "hidden"
        );

    }
);


showLogin.addEventListener(
    "click",
    () => {

        registerForm.classList.add(
            "hidden"
        );

        loginForm.classList.remove(
            "hidden"
        );

    }
);


registerForm.addEventListener(
    "submit",
    event => {

        event.preventDefault();

        const name =
            document
                .querySelector("#registerName")
                .value
                .trim();

        const email =
            document
                .querySelector("#registerEmail")
                .value
                .trim()
                .toLowerCase();

        const password =
            document
                .querySelector("#registerPassword")
                .value;


        if (password.length < 6) {

            showToast(
                "Password must be at least 6 characters"
            );

            return;

        }


        try {

            const newUser = {

                id: Date.now(),

                name,

                email,

                password

            };


            registerUser(
                newUser
            );


            loginUser(
                email,
                password
            );


            showToast(
                "Account created successfully 🎬"
            );


            setTimeout(() => {

                window.location.href =
                    "./index.html";

            }, 800);

        }
        catch (error) {

            showToast(
                error.message
            );

        }

    }
);


loginForm.addEventListener(
    "submit",
    event => {

        event.preventDefault();


        const email =
            document
                .querySelector("#loginEmail")
                .value
                .trim()
                .toLowerCase();


        const password =
            document
                .querySelector("#loginPassword")
                .value;


        try {

            loginUser(
                email,
                password
            );


            showToast(
                "Login successful 🎬"
            );


            setTimeout(() => {

                window.location.href =
                    "./index.html";

            }, 700);

        }
        catch (error) {

            showToast(
                error.message
            );

        }

    }
);
// ========================================
// CHECK LOGIN
// ========================================

const currentUser =
    sessionStorage.getItem(
        "currentUser"
    );


const userRole =
    sessionStorage.getItem(
        "userRole"
    );


if (!currentUser) {

    window.location.href =
        "login.html";

}


// ========================================
// LOAD PROFILE
// ========================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const username =
            sessionStorage.getItem(
                "currentUser"
            ) || "User";


        const role =
            sessionStorage.getItem(
                "userRole"
            ) || "user";


        // Avatar

        const avatar =
            document.getElementById(
                "profileAvatar"
            );


        if (avatar) {

            avatar.textContent =
                username
                    .charAt(0)
                    .toUpperCase();

        }


        // Username

        const profileUsername =
            document.getElementById(
                "profileUsername"
            );


        if (profileUsername) {

            profileUsername.textContent =
                username;

        }


        const infoUsername =
            document.getElementById(
                "infoUsername"
            );


        if (infoUsername) {

            infoUsername.textContent =
                username;

        }


        // Role

        const roleText =
            role === "admin"
                ? "Administrator"
                : "User";


        const profileRole =
            document.getElementById(
                "profileRole"
            );


        if (profileRole) {

            profileRole.textContent =
                roleText;


            if (role === "admin") {

                profileRole.classList.add(
                    "admin"
                );

            }

        }


        const infoRole =
            document.getElementById(
                "infoRole"
            );


        if (infoRole) {

            infoRole.textContent =
                roleText;

        }


        // ========================================
        // BOOKING COUNT
        // ========================================

        const bookings =
            JSON.parse(
                localStorage.getItem(
                    "bookings"
                ) || "[]"
            );


        let myBookings;


        if (role === "admin") {

            myBookings =
                bookings;

        } else {

            myBookings =
                bookings.filter(
                    function (booking) {

                        return (
                            booking.username ===
                            username
                        );

                    }
                );

        }


        const bookingCount =
            document.getElementById(
                "infoBookingCount"
            );


        if (bookingCount) {

            bookingCount.textContent =
                myBookings.length;

        }


        // ========================================
        // ADMIN BUTTON
        // ========================================

        const adminButton =
            document.getElementById(
                "adminProfileButton"
            );


        if (adminButton) {

            if (role !== "admin") {

                adminButton.style.display =
                    "none";

            }

        }

    }
);


// ========================================
// LOGOUT
// ========================================

const profileLogout =
    document.getElementById(
        "profileLogout"
    );


if (profileLogout) {

    profileLogout.addEventListener(
        "click",
        function () {

            sessionStorage.removeItem(
                "currentUser"
            );

            sessionStorage.removeItem(
                "userRole"
            );


            window.location.href =
                "login.html";

        }
    );

}
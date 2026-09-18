// ========================================
// AUTHENTICATION
// ========================================

const currentUser =
    sessionStorage.getItem("currentUser");

const userRole =
    sessionStorage.getItem("userRole");


// ถ้ายังไม่ได้ Login

if (!currentUser) {

    window.location.href =
        "login.html";
}


// ========================================
// USER INFORMATION
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


        // Username

        const usernameElement =
            document.getElementById(
                "username"
            );

        if (usernameElement) {

            usernameElement.textContent =
                username;

        }


        // Sidebar Username

        const sidebarUsername =
            document.getElementById(
                "sidebarUsername"
            );

        if (sidebarUsername) {

            sidebarUsername.textContent =
                username;

        }


        // Role

        const roleElements =
            document.querySelectorAll(
                "[data-user-role]"
            );

        roleElements.forEach(function (element) {

            if (role === "admin") {

                element.textContent =
                    "Administrator";

            } else {

                element.textContent =
                    "User";

            }

        });


        // Avatar

        const avatar =
            document.getElementById(
                "sidebarAvatar"
            );

        if (avatar) {

            avatar.textContent =
                username
                    .charAt(0)
                    .toUpperCase();

        }


        // ========================================
        // ADMIN MENU
        // ========================================

        const adminMenu =
            document.getElementById(
                "adminMenu"
            );

        if (adminMenu) {

            if (role === "admin") {

                adminMenu.style.display =
                    "block";

            } else {

                adminMenu.style.display =
                    "none";

            }

        }

    }
);


// ========================================
// LOGOUT
// ========================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const logoutButtons =
            document.querySelectorAll(
                "#logoutBtn, #sidebarLogout"
            );


        logoutButtons.forEach(
            function (button) {

                button.addEventListener(
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
        );

    }
);


// ========================================
// BOOKING DATA
// ========================================

function getBookings() {

    return JSON.parse(
        localStorage.getItem(
            "bookings"
        ) || "[]"
    );

}


function saveBookings(bookings) {

    localStorage.setItem(
        "bookings",
        JSON.stringify(bookings)
    );

}


// ========================================
// GET MY BOOKINGS
// ========================================

function getMyBookings() {

    const username =
        sessionStorage.getItem(
            "currentUser"
        );


    const role =
        sessionStorage.getItem(
            "userRole"
        );


    const bookings =
        getBookings();


    // Admin เห็นทั้งหมด

    if (role === "admin") {

        return bookings;

    }


    // User เห็นเฉพาะของตัวเอง

    return bookings.filter(
        function (booking) {

            return (
                booking.username ===
                username
            );

        }
    );

}


// ========================================
// BOOKING FORM
// ========================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const form =
            document.getElementById(
                "bookingForm"
            );


        if (!form) {
            return;
        }


        form.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const username =
                    sessionStorage.getItem(
                        "currentUser"
                    );


                const name =
                    document
                        .getElementById("name")
                        .value
                        .trim();


                const room =
                    document.getElementById(
                        "room"
                    ).value;


                const date =
                    document.getElementById(
                        "date"
                    ).value;


                const time =
                    document.getElementById(
                        "time"
                    ).value;


                const equipment =
                    document.getElementById(
                        "equipment"
                    ).value;


                // ตรวจสอบ

                if (
                    !name ||
                    !room ||
                    !date ||
                    !time
                ) {

                    showBookingMessage(
                        "กรุณากรอกข้อมูลให้ครบ",
                        "error"
                    );

                    return;
                }


                let bookings =
                    getBookings();


                // ========================================
                // CHECK ROOM DUPLICATE
                // ========================================

                const duplicate =
                    bookings.some(
                        function (booking) {

                            return (
                                booking.room === room &&
                                booking.date === date &&
                                booking.time === time
                            );

                        }
                    );


                if (duplicate) {

                    showBookingMessage(
                        "ห้องนี้ถูกจองในวันและเวลานี้แล้ว",
                        "error"
                    );

                    return;
                }


                // ========================================
                // CREATE BOOKING
                // ========================================

                const newBooking = {

                    id: Date.now(),

                    username: username,

                    name: name,

                    room: room,

                    date: date,

                    time: time,

                    equipment:
                        equipment || "ไม่มี"

                };


                bookings.push(
                    newBooking
                );


                saveBookings(
                    bookings
                );


                form.reset();


                showBookingMessage(
                    "จองห้องประชุมสำเร็จ",
                    "success"
                );


                renderBookings();

            }
        );

    }
);


// ========================================
// MESSAGE
// ========================================

function showBookingMessage(
    text,
    type
) {

    const message =
        document.getElementById(
            "message"
        );


    if (!message) {
        return;
    }


    message.textContent =
        text;


    message.className =
        "message " + type;


    setTimeout(
        function () {

            message.textContent =
                "";

            message.className =
                "message";

        },
        3000
    );

}


// ========================================
// RENDER BOOKINGS
// ========================================

function renderBookings() {

    const list =
        document.getElementById(
            "bookingList"
        );


    if (!list) {
        return;
    }


    const bookings =
        getMyBookings();


    if (bookings.length === 0) {

        list.innerHTML = `
            <tr>
                <td
                    colspan="6"
                    class="empty"
                >
                    ยังไม่มีรายการจอง
                </td>
            </tr>
        `;


        updateDashboardStats();

        return;
    }


    list.innerHTML =
        bookings.map(
            function (booking) {

                return `
                    <tr>

                        <td>
                            <strong>
                                ${escapeHTML(
                                    booking.name
                                )}
                            </strong>
                        </td>

                        <td>
                            ${escapeHTML(
                                booking.room
                            )}
                        </td>

                        <td>
                            ${escapeHTML(
                                booking.date
                            )}
                        </td>

                        <td>
                            ${escapeHTML(
                                booking.time
                            )}
                        </td>

                        <td>
                            ${escapeHTML(
                                booking.equipment
                            )}
                        </td>

                        <td>

                            <button
                                class="delete-btn"
                                onclick="deleteBooking(${booking.id})"
                            >
                                ยกเลิก
                            </button>

                        </td>

                    </tr>
                `;

            }
        ).join("");


    updateDashboardStats();

}


// ========================================
// DELETE BOOKING
// ========================================

function deleteBooking(id) {

    const currentUser =
        sessionStorage.getItem(
            "currentUser"
        );


    const role =
        sessionStorage.getItem(
            "userRole"
        );


    const confirmDelete =
        confirm(
            "ต้องการยกเลิกการจองนี้หรือไม่?"
        );


    if (!confirmDelete) {
        return;
    }


    let bookings =
        getBookings();


    if (role === "admin") {

        // Admin ลบของใครก็ได้

        bookings =
            bookings.filter(
                function (booking) {

                    return booking.id !== id;

                }
            );

    } else {

        // User ลบได้เฉพาะของตัวเอง

        bookings =
            bookings.filter(
                function (booking) {

                    return !(
                        booking.id === id &&
                        booking.username ===
                        currentUser
                    );

                }
            );

    }


    saveBookings(
        bookings
    );


    renderBookings();

}


// ========================================
// DASHBOARD STATS
// ========================================

function updateDashboardStats() {

    const bookings =
        getMyBookings();


    const total =
        document.getElementById(
            "totalBooking"
        );


    const roomCount =
        document.getElementById(
            "roomCount"
        );


    const equipmentCount =
        document.getElementById(
            "equipmentCount"
        );


    if (total) {

        total.textContent =
            bookings.length;

    }


    if (roomCount) {

        const rooms =
            new Set(
                bookings.map(
                    function (booking) {

                        return booking.room;

                    }
                )
            );


        roomCount.textContent =
            rooms.size;

    }


    if (equipmentCount) {

        const equipment =
            bookings.filter(
                function (booking) {

                    return (
                        booking.equipment &&
                        booking.equipment !==
                            "ไม่มี"
                    );

                }
            );


        equipmentCount.textContent =
            equipment.length;

    }

}


// ========================================
// ESCAPE HTML
// ========================================

function escapeHTML(value) {

    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


// ========================================
// INITIALIZE
// ========================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        renderBookings();

        updateDashboardStats();

    }
);
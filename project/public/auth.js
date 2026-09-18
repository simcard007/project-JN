// ========================================
// ADMIN ACCOUNT
// ========================================

const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "admin123";


// ========================================
// REGISTER
// ========================================

const registerForm =
    document.getElementById("registerForm");

if (registerForm) {

    registerForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            const username =
                document
                    .getElementById("registerUsername")
                    .value
                    .trim();

            const password =
                document
                    .getElementById("registerPassword")
                    .value;

            const confirmPassword =
                document
                    .getElementById("confirmPassword")
                    .value;

            const message =
                document.getElementById(
                    "registerMessage"
                );


            // ตรวจสอบ Username

            if (username === "") {

                showMessage(
                    message,
                    "กรุณากรอกชื่อผู้ใช้",
                    "error"
                );

                return;
            }


            // ป้องกันใช้ชื่อ admin

            if (
                username.toLowerCase() ===
                ADMIN_USERNAME
            ) {

                showMessage(
                    message,
                    "ไม่สามารถใช้ชื่อผู้ใช้นี้ได้",
                    "error"
                );

                return;
            }


            // ตรวจสอบ Password

            if (password === "") {

                showMessage(
                    message,
                    "กรุณากรอกรหัสผ่าน",
                    "error"
                );

                return;
            }


            // ตรวจสอบ Confirm Password

            if (confirmPassword === "") {

                showMessage(
                    message,
                    "กรุณายืนยันรหัสผ่าน",
                    "error"
                );

                return;
            }


            if (password !== confirmPassword) {

                showMessage(
                    message,
                    "รหัสผ่านไม่ตรงกัน",
                    "error"
                );

                return;
            }


            // โหลด Users

            let users =
                JSON.parse(
                    localStorage.getItem("users")
                ) || [];


            // ตรวจสอบชื่อซ้ำ

            const exists =
                users.some(function (user) {

                    return (
                        user.username === username
                    );

                });


            if (exists) {

                showMessage(
                    message,
                    "ชื่อผู้ใช้นี้มีอยู่แล้ว",
                    "error"
                );

                return;
            }


            // สร้าง User

            const user = {

                username: username,

                password: password,

                role: "user"

            };


            users.push(user);


            // บันทึก

            localStorage.setItem(
                "users",
                JSON.stringify(users)
            );


            showMessage(
                message,
                "สมัครสมาชิกสำเร็จ",
                "success"
            );


            setTimeout(function () {

                window.location.href =
                    "login.html";

            }, 1000);

        }
    );
}


// ========================================
// LOGIN
// ========================================

const loginForm =
    document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const username =
                document
                    .getElementById("loginUsername")
                    .value
                    .trim();

            const password =
                document
                    .getElementById("loginPassword")
                    .value;

            const message =
                document.getElementById(
                    "loginMessage"
                );


            // ตรวจสอบช่องว่าง

            if (username === "") {

                showMessage(
                    message,
                    "กรุณากรอกชื่อผู้ใช้",
                    "error"
                );

                return;
            }


            if (password === "") {

                showMessage(
                    message,
                    "กรุณากรอกรหัสผ่าน",
                    "error"
                );

                return;
            }


            // ========================================
            // ADMIN LOGIN
            // ========================================

            if (
                username === ADMIN_USERNAME &&
                password === ADMIN_PASSWORD
            ) {

                sessionStorage.setItem(
                    "currentUser",
                    ADMIN_USERNAME
                );

                sessionStorage.setItem(
                    "userRole",
                    "admin"
                );


                showMessage(
                    message,
                    "เข้าสู่ระบบ Admin สำเร็จ",
                    "success"
                );


                setTimeout(function () {

                    window.location.href =
                        "admin.html";

                }, 700);


                return;
            }


            // ========================================
            // USER LOGIN
            // ========================================

            const users =
                JSON.parse(
                    localStorage.getItem("users")
                ) || [];


            const user =
                users.find(function (user) {

                    return (
                        user.username === username &&
                        user.password === password
                    );

                });


            if (!user) {

                showMessage(
                    message,
                    "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง",
                    "error"
                );

                return;
            }


            // Login User

            sessionStorage.setItem(
                "currentUser",
                user.username
            );

            sessionStorage.setItem(
                "userRole",
                "user"
            );


            showMessage(
                message,
                "เข้าสู่ระบบสำเร็จ",
                "success"
            );


            setTimeout(function () {

                window.location.href =
                    "index.html";

            }, 700);

        }
    );
}


// ========================================
// MESSAGE
// ========================================

function showMessage(
    element,
    text,
    type
) {

    if (!element) {
        return;
    }

    element.textContent = text;

    element.className =
        "message " + type;
}
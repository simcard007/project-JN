<!DOCTYPE html>
<html lang="th">

<head>

    <meta charset="UTF-8">

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
    >

    <title>Admin | Meeting Room</title>

    <link
        rel="stylesheet"
        href="style.css"
    >

    <link
        rel="stylesheet"
        href="admin.css"
    >

</head>


<body>


<!-- ========================================
     SIDEBAR
======================================== -->

<aside class="sidebar">

    <div class="sidebar-logo">

        <div class="sidebar-logo-icon">
            M
        </div>

        <div>

            <h2>Meeting Room</h2>

            <span>
                Admin Panel
            </span>

        </div>

    </div>


    <nav class="sidebar-menu">

        <a
            href="index.html"
            class="sidebar-item"
        >
            🏠
            <span>Dashboard</span>
        </a>


        <a
            href="room.html"
            class="sidebar-item"
        >
            📅
            <span>การจองห้อง</span>
        </a>


        <a
            href="meet.html"
            class="sidebar-item"
        >
            🏢
            <span>ห้องประชุม</span>
        </a>


        <a
            href="status.html"
            class="sidebar-item"
        >
            📊
            <span>สถิติ</span>
        </a>


        <a
            href="admin.html"
            class="sidebar-item active"
        >
            ⚙️
            <span>Admin</span>
        </a>

    </nav>


    <div class="sidebar-bottom">

        <a
            href="profile.html"
            class="sidebar-profile"
        >

            <div
                id="sidebarAvatar"
                class="sidebar-avatar"
            >
                A
            </div>

            <div class="sidebar-user-info">

                <strong id="sidebarUsername">
                    admin
                </strong>

                <span>
                    Administrator
                </span>

            </div>

        </a>


        <button
            id="sidebarLogout"
            class="sidebar-logout"
        >
            🚪 ออกจากระบบ
        </button>

    </div>

</aside>



<!-- ========================================
     CONTENT
======================================== -->

<main class="content">


    <header class="page-header">

        <div>

            <h1>
                Admin Dashboard
            </h1>

            <p>
                จัดการข้อมูลการจองของผู้ใช้งานทั้งหมด
            </p>

        </div>

    </header>



    <!-- ========================================
         ADMIN STATS
    ======================================== -->

    <section class="stats">


        <div class="stat-card">

            <div class="stat-icon">
                📅
            </div>

            <div>

                <p>
                    การจองทั้งหมด
                </p>

                <h2 id="adminTotalBooking">
                    0
                </h2>

            </div>

        </div>


        <div class="stat-card">

            <div class="stat-icon">
                👥
            </div>

            <div>

                <p>
                    ผู้ใช้งาน
                </p>

                <h2 id="adminUserCount">
                    0
                </h2>

            </div>

        </div>


        <div class="stat-card">

            <div class="stat-icon">
                🏢
            </div>

            <div>

                <p>
                    ห้องที่ใช้งาน
                </p>

                <h2 id="adminRoomCount">
                    0
                </h2>

            </div>

        </div>


        <div class="stat-card">

            <div class="stat-icon">
                🎥
            </div>

            <div>

                <p>
                    การใช้อุปกรณ์
                </p>

                <h2 id="adminEquipmentCount">
                    0
                </h2>

            </div>

        </div>


    </section>



    <!-- ========================================
         ROOM SUMMARY
    ======================================== -->

    <section class="admin-room-grid">


        <div class="admin-room-card">

            <span>
                Meeting Room A
            </span>

            <strong id="adminRoomA">
                0
            </strong>

            <small>
                รายการจอง
            </small>

        </div>


        <div class="admin-room-card">

            <span>
                Meeting Room B
            </span>

            <strong id="adminRoomB">
                0
            </strong>

            <small>
                รายการจอง
            </small>

        </div>


        <div class="admin-room-card">

            <span>
                Meeting Room C
            </span>

            <strong id="adminRoomC">
                0
            </strong>

            <small>
                รายการจอง
            </small>

        </div>


    </section>



    <!-- ========================================
         ALL BOOKINGS
    ======================================== -->

    <section class="card">


        <div class="card-title admin-title">

            <div>

                <h2>
                    รายการจองทั้งหมด
                </h2>

                <p>
                    Admin สามารถดูและลบรายการของทุก User
                </p>

            </div>


            <button
                id="refreshAdmin"
                class="refresh-btn"
            >
                🔄 รีเฟรช
            </button>

        </div>


        <div class="table-wrapper">

            <table>

                <thead>

                    <tr>

                        <th>
                            Username
                        </th>

                        <th>
                            ชื่อผู้จอง
                        </th>

                        <th>
                            ห้อง
                        </th>

                        <th>
                            วันที่
                        </th>

                        <th>
                            เวลา
                        </th>

                        <th>
                            อุปกรณ์
                        </th>

                        <th>
                            จัดการ
                        </th>

                    </tr>

                </thead>


                <tbody id="adminBookingList">

                    <tr>

                        <td
                            colspan="7"
                            class="empty"
                        >
                            ยังไม่มีรายการจอง
                        </td>

                    </tr>

                </tbody>

            </table>

        </div>


    </section>


</main>


<script src="script.js"></script>

<script src="admin.js"></script>


</body>

</html>
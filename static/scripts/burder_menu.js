document.addEventListener('DOMContentLoaded', function () {
    const burgerMenuIcon = document.getElementById('burgerMenuIcon');
    const sidebar = document.getElementById('sidebar');
    const closeBtn = document.getElementById('closeBtn');

    burgerMenuIcon.addEventListener('click', function () {
        sidebar.style.right = '0';
    });

    closeBtn.addEventListener('click', function () {
        sidebar.style.right = '-100%';
    });
});
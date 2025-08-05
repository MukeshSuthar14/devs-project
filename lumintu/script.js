function handleToggleMenu(thisitem) {
    const navbar = document.getElementById('navbar');
    if (navbar) {
        if (navbar.classList.contains('open')) {
            navbar.classList.remove('open')
            if (thisitem) thisitem.setAttribute('src', 'public/menu-toggle.png');
        } else {
            navbar.classList.add('open')
            if (thisitem) thisitem.setAttribute('src', 'public/close.png');
        }
    }
}
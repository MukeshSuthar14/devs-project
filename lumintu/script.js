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
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('contact-us-form').addEventListener('submit', event => {
        event.preventDefault();
        alert(`Thank You For Connecting Us. Here is you details: ${JSON.stringify(Object.fromEntries(new FormData(event.target).entries()))}`)
        return false
    })
})
const films = [
    { id: 1, title: "Дюна: Часть вторая", year: "2024", rating: "8.9", duration: "166 мин", genre: "Фантастика", country: "США", director: "Дени Вильнёв", actors: "Тимоти Шаламе, Зендая, Ребекка Фергюсон", description: "Пол Атрейдес объединяется с фременами, чтобы отомстить за свою семью и спасти Арракис.", poster: "https://avatars.mds.yandex.net/get-kinopoisk-image/6201401/029e502d-22da-474a-8759-2c5fd045cd06/1920x", price: 550 },
    { id: 2, title: "Оппенгеймер", year: "2023", rating: "8.8", duration: "180 мин", genre: "Биография", country: "США", director: "Кристофер Нолан", actors: "Киллиан Мерфи, Эмили Блант, Мэтт Дэймон", description: "История американского физика Роберта Оппенгеймера.", poster: "https://i.pinimg.com/736x/25/74/bc/2574bcaa1d5a9fe6a54e4fd058aefb55.jpg", price: 550 },
    { id: 3, title: "Мастер и Маргарита", year: "2024", rating: "8.5", duration: "157 мин", genre: "Драма", country: "Россия", director: "Михаил Локшин", actors: "Евгений Цыганов, Юлия Снигирь", description: "Экранизация знаменитого романа Михаила Булгакова.", poster: "https://cdn.ruwiki.ru/ruwiki/files/thumb/8/89/Мастер_и_Маргарита_%28фильм%2C_2024%29.webp/600px-Мастер_и_Маргарита_%28фильм%2C_2024%29.webp.png", price: 550 },
    { id: 4, title: "Гладиатор 2", year: "2024", rating: "8.2", duration: "148 мин", genre: "Боевик", country: "США", director: "Ридли Скотт", actors: "Пол Мескал, Дензел Вашингтон", description: "Продолжение легендарного фильма.", poster: "https://media.kg-portal.ru/movies/g/gladiator2/posters/gladiator2_11.jpg", price: 550 },
    { id: 5, title: "Игра в кальмара 2", year: "2024", rating: "8.9", duration: "60 мин x 8", genre: "Триллер", country: "Корея", director: "Хван Дон Хёк", actors: "Ли Джон Джэ", description: "Новые участники, новые игры.", poster: "https://avatars.mds.yandex.net/get-mpic/4314340/2a00000194780a92d9c518bae5e862f8fe05/orig", price: 550 },
    { id: 6, title: "Дом Дракона", year: "2024", rating: "8.7", duration: "65 мин x 10", genre: "Фэнтези", country: "США", director: "Мигель Сапочник", actors: "Мэтт Смит", description: "Приквел 'Игры престолов'.", poster: "https://www.kino-teatr.ru/movie/poster/150321/140626.jpg", price: 550 },
    { id: 7, title: "Слово пацана", year: "2023", rating: "9.2", duration: "50 мин x 8", genre: "Драма", country: "Россия", director: "Жора Крыжовников", actors: "Иван Янковский", description: "История о казанских группировках.", poster: "https://images.kinorium.com/movie/poster/10400195/w1500_53408999.jpg", price: 550 },
    { id: 8, title: "Король и Шут", year: "2023", rating: "9.0", duration: "55 мин x 8", genre: "Биография", country: "Россия", director: "Рустам Мосафир", actors: "Константин Плотников", description: "История легендарной группы.", poster: "https://www.castlerock.ru/upload/medialibrary/03d/w00nmgx0uji0hexvmaut4r1c7xxatjbq.jpg", price: 550 },
    { id: 9, title: "Чебурашка 2", year: "2026", rating: "9.3", duration: "103 мин", genre: "Семейный", country: "Россия", director: "Дмитрий Дьяченко", actors: "Сергей Гармаш", description: "Приключения любимого героя.", poster: "https://avatars.mds.yandex.net/get-kinopoisk-image/10853012/735da4eb-4e5c-40ab-a795-8c6eb00c5ac5/1920x", price: 550 },
    { id: 10, title: "Буратино", year: "2026", rating: "8.6", duration: "102 мин", genre: "Семейный", country: "Россия", director: "Игорь Волошин", actors: "Артур Бесчастный", description: "Новая версия сказки.", poster: "https://cdn.premierzal.ru/files/image/vswoa2ey0o53fay.jpg", price: 550 }
];

let users = JSON.parse(localStorage.getItem('users')) || [];
let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;
let userBalance = JSON.parse(localStorage.getItem('userBalance')) || 5000;
let userTickets = JSON.parse(localStorage.getItem('userTickets')) || [];

const main = document.getElementById('mainContent');
const authBlock = document.getElementById('authBlock');
const modal = document.getElementById('authModal');
const buyModal = document.getElementById('buyModal');
const topupModal = document.getElementById('topupModal');
const confirmModal = document.getElementById('confirmModal');
const logo = document.getElementById('logo');
const myTicketsLink = document.getElementById('myTicketsLink');
const alertBox = document.getElementById('alertMessage');
const successToast = document.getElementById('successToast');
const ticketsToast = document.getElementById('ticketsToast');
const searchInput = document.getElementById('searchInput');
const searchClear = document.getElementById('searchClear');
const searchSuggestions = document.getElementById('searchSuggestions');

let currentFilm = null;
let selectedSeats = [];
let selectedPayment = 'card';
let takenSeats = JSON.parse(localStorage.getItem('takenSeats')) || {};
let pendingPurchase = null;

function showAlert(message, icon = '⚠️') {
    alertBox.querySelector('.alert__icon').textContent = icon;
    alertBox.querySelector('.alert__text').textContent = message;
    alertBox.classList.add('active');
    setTimeout(() => alertBox.classList.remove('active'), 3000);
}

function showToast(toast, message) {
    const textEl = toast.querySelector('.toast__text');
    if (textEl && message) textEl.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 4000);
}

function updateBalanceUI() {
    if (currentUser) {
        const balanceSpan = document.querySelector('.user-balance');
        if (balanceSpan) balanceSpan.textContent = `${userBalance} ₽`;
    }
}

function renderMain() {
    main.innerHTML = `
        <div class="container">
            <div class="categories"><ul class="categories__list">
                <li class="categories__item"><a class="categories__link categories__link--active" data-cat="all">Все</a></li>
                <li class="categories__item"><a class="categories__link" data-cat="movies">Фильмы</a></li>
                <li class="categories__item"><a class="categories__link" data-cat="series">Сериалы</a></li>
                <li class="categories__item"><a class="categories__link" data-cat="popular">Популярное</a></li>
                <li class="categories__item"><a class="categories__link" data-cat="top">Топ недели</a></li>
            </ul></div>
            <section class="section"><h2 class="section__title" id="sectionTitle">Все фильмы и сериалы</h2><div class="movies-grid" id="moviesGrid"></div></section>
        </div>`;
    const grid = document.getElementById('moviesGrid');
    grid.innerHTML = films.map(f => `<div class="movie-card" data-id="${f.id}"><div class="movie-card__poster" style="background-image: url('${f.poster}')"><div class="movie-card__rating">⭐ ${f.rating}</div></div><div class="movie-card__info"><div class="movie-card__title">${f.title}</div><div class="movie-card__year">${f.year} • ${f.duration}</div></div></div>`).join('');
    document.querySelectorAll('.movie-card').forEach(card => card.onclick = () => renderFilm(films.find(f => f.id == card.dataset.id)));
    document.querySelectorAll('.categories__link').forEach(link => link.onclick = (e) => {
        e.preventDefault();
        document.querySelectorAll('.categories__link').forEach(l => l.classList.remove('categories__link--active'));
        link.classList.add('categories__link--active');
        const cat = link.dataset.cat;
        document.getElementById('sectionTitle').textContent = cat === 'all' ? 'Все фильмы и сериалы' : cat === 'movies' ? 'Фильмы' : cat === 'series' ? 'Сериалы' : cat === 'popular' ? 'Популярное' : 'Топ недели';
        const grid = document.getElementById('moviesGrid');
        grid.style.opacity = '0'; grid.style.transform = 'translateY(20px)';
        setTimeout(() => {
            let filtered = films;
            if (cat === 'movies') filtered = films.slice(0,6);
            else if (cat === 'series') filtered = films.slice(4,6);
            else if (cat === 'popular') filtered = films.slice(6,8);
            else if (cat === 'top') filtered = films.slice(7,10);
            grid.innerHTML = filtered.map(f => `<div class="movie-card" data-id="${f.id}"><div class="movie-card__poster" style="background-image: url('${f.poster}')"><div class="movie-card__rating">⭐ ${f.rating}</div></div><div class="movie-card__info"><div class="movie-card__title">${f.title}</div><div class="movie-card__year">${f.year} • ${f.duration}</div></div></div>`).join('');
            grid.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            grid.style.opacity = '1'; grid.style.transform = 'translateY(0)';
            document.querySelectorAll('.movie-card').forEach(card => card.onclick = () => renderFilm(films.find(f => f.id == card.dataset.id)));
        }, 150);
    });
}

function renderFilm(film) {
    main.innerHTML = `<div class="container"><div class="movie-page"><div class="movie-page__hero" style="background-image: linear-gradient(to top, rgba(0,0,0,0.85), transparent), url('${film.poster}')"><div class="movie-page__hero-content"><h1 class="movie-page__title">${film.title}</h1><div class="movie-page__info"><span class="movie-page__rating">⭐ ${film.rating}</span><span>${film.year}</span><span>${film.duration}</span><span>${film.genre}</span><span>${film.country}</span></div></div></div><div class="movie-page__content"><div class="movie-page__description">${film.description}</div><div class="movie-page__details"><div class="detail-item"><span class="detail-label">Режиссёр</span><span class="detail-value">${film.director}</span></div><div class="detail-item"><span class="detail-label">В ролях</span><span class="detail-value">${film.actors}</span></div><div class="detail-item"><span class="detail-label">Страна</span><span class="detail-value">${film.country}</span></div><div class="detail-item"><span class="detail-label">Жанр</span><span class="detail-value">${film.genre}</span></div></div><div class="movie-page__actions"><button class="btn btn--primary btn--large" id="buyBtn">🎫 Купить билет</button><button class="btn btn--outline btn--large" id="backBtn">На главную</button></div></div></div></div>`;
    document.getElementById('buyBtn').onclick = () => { if (!currentUser) { showToast(ticketsToast, 'Войдите в аккаунт'); return; } currentFilm = film; openBuyModal(); };
    document.getElementById('backBtn').onclick = renderMain;
}

function renderTicketsPage() {
    if (!currentUser) { showToast(ticketsToast, 'Войдите в аккаунт'); renderMain(); return; }
    if (userTickets.length === 0) {
        main.innerHTML = `<div class="container"><div class="tickets-page"><h1 class="tickets-page__title">Мои билеты</h1><div class="empty-tickets"><svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1"><path d="M4 4h16v16H4z"/><path d="M8 8h8v8H8z"/></svg><p>У вас пока нет купленных билетов</p><button class="btn btn--primary" id="backToMovies">Перейти к афише</button></div></div></div>`;
        document.getElementById('backToMovies')?.addEventListener('click', renderMain);
        return;
    }
    main.innerHTML = `<div class="container"><div class="tickets-page"><h1 class="tickets-page__title">Мои билеты</h1><div class="tickets-grid" id="ticketsGrid"></div></div></div>`;
    const grid = document.getElementById('ticketsGrid');
    grid.innerHTML = userTickets.map(t => {
        const qrCode = Math.random().toString(36).substring(2, 10).toUpperCase();
        const time = `${Math.floor(Math.random() * 12) + 10}:${Math.random() > 0.5 ? '00' : '30'}`;
        const hall = Math.floor(Math.random() * 5) + 1;
        return `
            <div class="ticket-card">
                <div class="ticket-card__header">
                    <div class="ticket-card__film">${t.filmTitle}</div>
                    <div class="ticket-card__date">📅 ${t.date} • ${time}</div>
                </div>
                <div class="ticket-card__body">
                    <div class="ticket-card__info">
                        <div class="ticket-card__info-item"><strong>Зал:</strong> ${hall}</div>
                        <div class="ticket-card__info-item"><strong>Места:</strong> <span class="ticket-card__seats">${t.seats.join(', ')}</span></div>
                        <div class="ticket-card__info-item"><strong>Оплата:</strong> ${t.payment === 'card' ? '💳 Карта' : t.payment === 'sbp' ? '📱 СБП' : '💰 Наличные'}</div>
                    </div>
                    <div class="ticket-card__price">${t.total} ₽</div>
                </div>
                <div class="ticket-card__footer">
                    <div class="ticket-card__qr"><span>📱</span></div>
                    <div class="ticket-card__id">#${qrCode}</div>
                </div>
            </div>
        `;
    }).join('');
}

function openBuyModal() {
    selectedSeats = [];
    const filmKey = `film_${currentFilm.id}`;
    const taken = takenSeats[filmKey] || [];
    const rows = ['A','B','C','D','E','F'];
    let seatsHtml = '<div class="seats-grid">';
    for (let row of rows) for (let i=1;i<=8;i++) { let sid=`${row}${i}`, cls='seat'; if(taken.includes(sid)) cls+=' taken'; if(selectedSeats.includes(sid)) cls+=' selected'; seatsHtml+=`<div class="${cls}" data-seat="${sid}">${sid}</div>`; }
    seatsHtml += '</div>';
    document.getElementById('seatsContainer').innerHTML = seatsHtml;
    document.getElementById('paymentMethods').innerHTML = `<button class="payment-btn ${selectedPayment==='card'?'active':''}" data-payment="card">💳 Карта</button><button class="payment-btn ${selectedPayment==='sbp'?'active':''}" data-payment="sbp">📱 СБП</button><button class="payment-btn ${selectedPayment==='cash'?'active':''}" data-payment="cash">💰 Наличные</button>`;
    document.getElementById('buyModalTitle').textContent = `Выбор места — ${currentFilm.title}`;
    document.getElementById('totalPrice').textContent = `Итого: 0 ₽`;
    buyModal.classList.add('active');
    document.querySelectorAll('.payment-btn').forEach(btn => btn.onclick = () => { selectedPayment = btn.dataset.payment; document.querySelectorAll('.payment-btn').forEach(b=>b.classList.remove('active')); btn.classList.add('active'); });
    document.getElementById('confirmBuyBtn').onclick = confirmPurchase;
    document.getElementById('cancelBuyBtn').onclick = () => buyModal.classList.remove('active');
    document.querySelectorAll('.seat').forEach(seat => { if(seat.classList.contains('taken')) return; seat.onclick = () => { let sid=seat.dataset.seat; if(selectedSeats.includes(sid)){ selectedSeats=selectedSeats.filter(s=>s!==sid); seat.classList.remove('selected'); } else { selectedSeats.push(sid); seat.classList.add('selected'); } document.getElementById('totalPrice').textContent = `Итого: ${selectedSeats.length*550} ₽`; }; });
}

function confirmPurchase() {
    if(selectedSeats.length===0){ showAlert('Выберите хотя бы одно место', '🎫'); return; }
    let total=selectedSeats.length*550;
    if(userBalance<total){ 
        document.getElementById('currentBalance').textContent = userBalance;
        document.getElementById('neededAmount').textContent = total;
        confirmModal.classList.add('active');
        buyModal.classList.remove('active');
        return; 
    }
    completePurchase(total);
}

function completePurchase(total) {
    userBalance-=total;
    localStorage.setItem('userBalance', JSON.stringify(userBalance));
    let filmKey=`film_${currentFilm.id}`;
    if(!takenSeats[filmKey]) takenSeats[filmKey]=[];
    takenSeats[filmKey]=[...takenSeats[filmKey],...selectedSeats];
    localStorage.setItem('takenSeats', JSON.stringify(takenSeats));
    userTickets.push({id:Date.now(), filmTitle:currentFilm.title, seats:selectedSeats, total:total, date:new Date().toLocaleDateString(), payment:selectedPayment});
    localStorage.setItem('userTickets', JSON.stringify(userTickets));
    updateBalanceUI();
    buyModal.classList.remove('active');
    showToast(successToast, `Билеты куплены! Списанно ${total} ₽`);
}

function openTopupModal() {
    document.getElementById('topupAmount').value = '';
    topupModal.classList.add('active');
}

function closeTopupModal() {
    topupModal.classList.remove('active');
}

function confirmTopup() {
    const amount = parseInt(document.getElementById('topupAmount').value);
    if (isNaN(amount) || amount <= 0) {
        showAlert('Введите корректную сумму', '💰');
        return;
    }
    userBalance += amount;
    localStorage.setItem('userBalance', JSON.stringify(userBalance));
    updateBalanceUI();
    showToast(successToast, `Баланс пополнен на ${amount} ₽`);
    closeTopupModal();
}

function renderAuth() {
    if(currentUser){
        authBlock.innerHTML = `<div class="user-profile"><div class="user-avatar">👤</div><span class="user-name">${currentUser}</span><div class="balance-actions"><span class="user-balance">${userBalance} ₽</span><button class="topup-icon" id="topupBtn">➕ Пополнить</button></div><button class="user-logout" id="logoutBtn">Выйти</button></div>`;
        document.getElementById('logoutBtn').onclick = () => { currentUser=null; localStorage.removeItem('currentUser'); renderAuth(); };
        document.getElementById('topupBtn').onclick = () => openTopupModal();
    } else {
        authBlock.innerHTML = `<button class="btn btn--primary" id="loginBtn">Войти</button>`;
        document.getElementById('loginBtn').onclick = () => modal.classList.add('active');
    }
}

document.getElementById('closeModal').onclick = () => modal.classList.remove('active');
document.getElementById('switchToRegister').onclick = (e) => { e.preventDefault(); document.getElementById('loginForm').classList.remove('active'); document.getElementById('registerForm').classList.add('active'); document.getElementById('modalTitle').textContent = 'Регистрация'; };
document.getElementById('switchToLogin').onclick = (e) => { e.preventDefault(); document.getElementById('registerForm').classList.remove('active'); document.getElementById('loginForm').classList.add('active'); document.getElementById('modalTitle').textContent = 'Вход в аккаунт'; };
document.getElementById('loginForm').onsubmit = (e) => { e.preventDefault(); const name=document.getElementById('loginUsername').value, pass=document.getElementById('loginPassword').value, user=users.find(u=>u.name===name && u.pass===pass); if(user){ currentUser=name; localStorage.setItem('currentUser',JSON.stringify(currentUser)); renderAuth(); modal.classList.remove('active'); } else { const err=document.getElementById('errorMessage'); err.textContent='Неверное имя или пароль'; err.classList.add('show'); setTimeout(()=>err.classList.remove('show'),2000); } };
document.getElementById('registerForm').onsubmit = (e) => { e.preventDefault(); const name=document.getElementById('regUsername').value, pass=document.getElementById('regPassword').value, confirm=document.getElementById('regConfirmPassword').value; if(!name.trim()) return; if(pass.length<3) return; if(pass!==confirm) return; if(users.find(u=>u.name===name)) return; users.push({name,pass}); localStorage.setItem('users',JSON.stringify(users)); currentUser=name; localStorage.setItem('currentUser',JSON.stringify(currentUser)); renderAuth(); modal.classList.remove('active'); };
myTicketsLink.onclick = (e) => { e.preventDefault(); if(!currentUser) showToast(ticketsToast, 'Войдите в аккаунт'); else renderTicketsPage(); };
logo.onclick = renderMain;

document.getElementById('cancelTopupBtn').onclick = closeTopupModal;
document.getElementById('confirmTopupBtn').onclick = confirmTopup;

document.getElementById('confirmLaterBtn').onclick = () => {
    confirmModal.classList.remove('active');
    buyModal.classList.remove('active');
};
document.getElementById('confirmYesBtn').onclick = () => {
    confirmModal.classList.remove('active');
    openTopupModal();
};

document.querySelectorAll('.toast__close').forEach(btn => {
    btn.onclick = () => btn.closest('.toast').classList.remove('show');
});
document.querySelector('.alert__close').onclick = () => alertBox.classList.remove('active');

searchInput.oninput = (e) => { const q=e.target.value.trim().toLowerCase(); if(!q){ searchSuggestions.classList.remove('active'); return; } const f=films.filter(f=>f.title.toLowerCase().includes(q)).slice(0,5); if(!f.length){ searchSuggestions.classList.remove('active'); return; } searchSuggestions.innerHTML=f.map(f=>`<div class="suggestion-item" data-id="${f.id}"><div class="suggestion-title">${f.title}</div><div class="suggestion-category">${f.genre} • ${f.year}</div></div>`).join(''); searchSuggestions.classList.add('active'); document.querySelectorAll('.suggestion-item').forEach(s=>s.onclick=()=>{ const film=films.find(f=>f.id==s.dataset.id); searchInput.value=''; searchSuggestions.classList.remove('active'); renderFilm(film); }); };
searchClear.onclick = () => { searchInput.value=''; searchInput.focus(); searchSuggestions.classList.remove('active'); };
document.addEventListener('click',(e)=>{ if(!searchInput.contains(e.target) && !searchSuggestions.contains(e.target)) searchSuggestions.classList.remove('active'); });

if(!users.length) users.push({name:'demo',pass:'123'});
localStorage.setItem('users',JSON.stringify(users));
if(!localStorage.getItem('userBalance')) localStorage.setItem('userBalance',JSON.stringify(5000));
if(!localStorage.getItem('userTickets')) localStorage.setItem('userTickets',JSON.stringify([]));
userBalance = JSON.parse(localStorage.getItem('userBalance'));
userTickets = JSON.parse(localStorage.getItem('userTickets'));
renderAuth();
renderMain();
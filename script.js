const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');

const setHeader = () => header.classList.toggle('scrolled', window.scrollY > 24);
setHeader();
window.addEventListener('scroll', setHeader, { passive: true });

menuButton.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
  const labels = {uk:['Відкрити меню','Закрити меню'],cs:['Otevřít nabídku','Zavřít nabídku'],pl:['Otwórz menu','Zamknij menu'],en:['Open menu','Close menu']};
  menuButton.setAttribute('aria-label', labels[window.recruiterCurrentLanguage || 'uk'][open ? 1 : 0]);
  document.body.style.overflow = open ? 'hidden' : '';
});

nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}));

document.getElementById('year').textContent = '2021';

if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: .12 });
  document.querySelectorAll('.section-heading, .about-grid, .job-card, .employers-grid, .contact-grid').forEach(el => {
    el.classList.add('reveal');
    observer.observe(el);
  });
}

const phoneDialog = document.getElementById('phone-choice');
const phoneClose = phoneDialog.querySelector('.phone-dialog-close');
let lastPhoneTrigger = null;
document.querySelectorAll('.phone-choice-trigger').forEach(trigger => {
  trigger.addEventListener('click', event => {
    event.preventDefault();
    lastPhoneTrigger = trigger;
    if (nav.classList.contains('open')) {
      nav.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
    if (!phoneDialog.open) phoneDialog.showModal();
  });
});
phoneClose.addEventListener('click', () => phoneDialog.close());
phoneDialog.addEventListener('click', event => {
  if (event.target === phoneDialog) phoneDialog.close();
});
phoneDialog.addEventListener('close', () => lastPhoneTrigger?.focus());

const whatsappDialog = document.getElementById('whatsapp-choice');
document.querySelectorAll('.whatsapp-choice-trigger').forEach(trigger => {
  trigger.addEventListener('click', event => {
    event.preventDefault();
    if (!whatsappDialog.open) whatsappDialog.showModal();
  });
});
whatsappDialog.querySelector('.phone-dialog-close').addEventListener('click', () => whatsappDialog.close());
whatsappDialog.addEventListener('click', event => {
  if (event.target === whatsappDialog) whatsappDialog.close();
});

document.querySelectorAll('.channel-choice-trigger').forEach(trigger => {
  const dialog = document.querySelector(trigger.getAttribute('href'));
  trigger.addEventListener('click', event => {
    event.preventDefault();
    dialog.showModal();
  });
  dialog.querySelector('.phone-dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    if (event.target === dialog) dialog.close();
  });
  dialog.querySelector('.choose-call').addEventListener('click', () => {
    dialog.close();
    lastPhoneTrigger = trigger;
    phoneDialog.showModal();
  });
});


/* Four-language site localization; original Ukrainian content remains the source of truth. */
(() => {
  const translations = {"Перейти до змісту":{"cs":"Přejít na obsah","pl":"Przejdź do treści","en":"Skip to content"},"Про компанію":{"cs":"O společnosti","pl":"O firmie","en":"About us"},"Вакансії":{"cs":"Volná místa","pl":"Oferty pracy","en":"Jobs"},"Роботодавцям":{"cs":"Pro zaměstnavatele","pl":"Dla pracodawców","en":"For employers"},"Контакти":{"cs":"Kontakty","pl":"Kontakt","en":"Contact"},"Зателефонувати":{"cs":"Zavolat","pl":"Zadzwoń","en":"Call us"},"Робота, що змінює життя":{"cs":"Práce, která mění život","pl":"Praca, która zmienia życie","en":"Work that changes lives"},"Ваша надійна робота":{"cs":"Vaše spolehlivá práce","pl":"Twoja pewna praca","en":"Your reliable job"},"у Чехії":{"cs":"v Česku","pl":"w Czechach","en":"in Czechia"},"Допомагаємо кандидатам знайти гідну роботу, а компаніям — відповідальних і вмотивованих працівників.":{"cs":"Pomáháme uchazečům najít dobrou práci a firmám zodpovědné a motivované zaměstnance.","pl":"Pomagamy kandydatom znaleźć dobrą pracę, a firmom odpowiedzialnych i zmotywowanych pracowników.","en":"We help candidates find good jobs and companies find reliable, motivated employees."},"Переглянути вакансії":{"cs":"Zobrazit nabídky","pl":"Zobacz oferty","en":"View jobs"},"Знайти працівників":{"cs":"Najít zaměstnance","pl":"Znajdź pracowników","en":"Find staff"},"напрямів роботи":{"cs":"pracovních oborů","pl":"branż zatrudnienia","en":"job sectors"},"країни на зв’язку":{"cs":"země v kontaktu","pl":"kraje w kontakcie","en":"countries connected"},"супровід кандидата":{"cs":"podpora uchazeče","pl":"wsparcie kandydata","en":"candidate support"},"Гортайте":{"cs":"Posuňte","pl":"Przewiń","en":"Scroll"},"Про RECRUITER CZ":{"cs":"O RECRUITER CZ","pl":"O RECRUITER CZ","en":"About RECRUITER CZ"},"Поєднуємо людей":{"cs":"Spojujeme lidi","pl":"Łączymy ludzi","en":"Connecting people"},"і можливості":{"cs":"a příležitosti","pl":"i możliwości","en":"and opportunities"},"Ми — рекрутингова компанія, що спеціалізується на працевлаштуванні в Чехії та підборі надійного персоналу для бізнесу.":{"cs":"Jsme personální společnost specializující se na zaměstnání v Česku a nábor spolehlivých pracovníků pro firmy.","pl":"Jesteśmy firmą rekrutacyjną specjalizującą się w zatrudnieniu w Czechach i doborze rzetelnych pracowników dla firm.","en":"We are a recruitment company specializing in jobs in Czechia and reliable staffing for businesses."},"Говоримо зрозуміло, підбираємо вакансії відповідно до досвіду та супроводжуємо на кожному етапі — від першої розмови до виходу на роботу.":{"cs":"Komunikujeme srozumitelně, hledáme práci podle zkušeností a pomáháme od prvního rozhovoru až po nástup.","pl":"Komunikujemy jasno, dobieramy pracę do doświadczenia i wspieramy od pierwszej rozmowy do rozpoczęcia pracy.","en":"We communicate clearly, match jobs to experience, and support candidates from first contact to their first day."},"Чесність":{"cs":"Poctivost","pl":"Uczciwość","en":"Honesty"},"Відкрито розповідаємо про умови, оплату та вимоги.":{"cs":"Otevřeně vysvětlujeme podmínky, mzdu a požadavky.","pl":"Otwarcie wyjaśniamy warunki, wynagrodzenie i wymagania.","en":"We explain conditions, pay, and requirements openly."},"Підтримка":{"cs":"Podpora","pl":"Wsparcie","en":"Support"},"Залишаємося поруч до успішного працевлаштування.":{"cs":"Pomáháme až do úspěšného nástupu do práce.","pl":"Pomagamy aż do rozpoczęcia pracy.","en":"We support you until you start your job."},"Результат":{"cs":"Výsledek","pl":"Rezultat","en":"Results"},"Шукаємо точну відповідність між людиною та роботою.":{"cs":"Hledáme správné propojení lidí a práce.","pl":"Dobieramy właściwych ludzi do odpowiedniej pracy.","en":"We match the right people with the right jobs."},"Актуальні напрями":{"cs":"Aktuální obory","pl":"Aktualne branże","en":"Current sectors"},"Знайдіть свою вакансію":{"cs":"Najděte si práci","pl":"Znajdź pracę","en":"Find your job"},"Оберіть сферу — ми уточнимо актуальні пропозиції, умови та допоможемо з наступними кроками.":{"cs":"Vyberte si obor. Ověříme aktuální nabídky, podmínky a poradíme s dalším postupem.","pl":"Wybierz branżę. Sprawdzimy aktualne oferty i warunki oraz pomożemy w kolejnych krokach.","en":"Choose a sector. We'll check current openings and conditions and help with next steps."},"Готелі та ресторани":{"cs":"Hotely a restaurace","pl":"Hotele i restauracje","en":"Hotels and restaurants"},"Покоївки, кухарі, офіціанти, помічники на кухню":{"cs":"Pokojské, kuchaři, číšníci, pomocníci v kuchyni","pl":"Pokojowe, kucharze, kelnerzy, pomoc kuchenna","en":"Housekeepers, chefs, waiters, kitchen assistants"},"Виробництво":{"cs":"Výroba","pl":"Produkcja","en":"Manufacturing"},"Заводи":{"cs":"Továrny","pl":"Fabryki","en":"Factories"},"Оператори лінії, комплектувальники, контроль якості":{"cs":"Operátoři linek, kompletace, kontrola kvality","pl":"Operatorzy linii, kompletacja, kontrola jakości","en":"Line operators, pickers, quality control"},"Логістика":{"cs":"Logistika","pl":"Logistyka","en":"Logistics"},"Склади":{"cs":"Sklady","pl":"Magazyny","en":"Warehouses"},"Пакувальники, працівники складу, оператори техніки":{"cs":"Baliči, skladníci, obsluha techniky","pl":"Pakowacze, magazynierzy, operatorzy sprzętu","en":"Packers, warehouse workers, equipment operators"},"Ремесла":{"cs":"Řemesla","pl":"Rzemiosło","en":"Trades"},"Будівництво":{"cs":"Stavebnictví","pl":"Budownictwo","en":"Construction"},"Майстри, підсобні працівники, оздоблювальники":{"cs":"Řemeslníci, pomocní dělníci, dokončovací práce","pl":"Fachowcy, pomocnicy, prace wykończeniowe","en":"Skilled workers, laborers, finishers"},"Сезонна робота":{"cs":"Sezónní práce","pl":"Praca sezonowa","en":"Seasonal work"},"Ферми":{"cs":"Farmy","pl":"Farmy","en":"Farms"},"Догляд за тваринами, збір урожаю, сортування":{"cs":"Péče o zvířata, sklizeň, třídění","pl":"Opieka nad zwierzętami, zbiory, sortowanie","en":"Animal care, harvesting, sorting"},"На природі":{"cs":"V přírodě","pl":"Na świeżym powietrzu","en":"Outdoors"},"Лісове господарство":{"cs":"Lesnictví","pl":"Leśnictwo","en":"Forestry"},"Посадка, догляд за лісом, допоміжні роботи":{"cs":"Výsadba, péče o les, pomocné práce","pl":"Sadzenie, pielęgnacja lasu, prace pomocnicze","en":"Planting, forest maintenance, general labor"},"Технічні професії":{"cs":"Technické profese","pl":"Zawody techniczne","en":"Technical jobs"},"Автосервіси":{"cs":"Autoservisy","pl":"Serwisy samochodowe","en":"Auto repair"},"Автомеханіки, шиномонтажники, помічники":{"cs":"Automechanici, pneuservis, pomocníci","pl":"Mechanicy, wulkanizatorzy, pomocnicy","en":"Mechanics, tire fitters, assistants"},"Громадське харчування":{"cs":"Gastronomie","pl":"Gastronomia","en":"Food service"},"Піцерії":{"cs":"Pizzerie","pl":"Pizzerie","en":"Pizzerias"},"Піцайоло, кухарі, кур’єри, працівники залу":{"cs":"Pizzaři, kuchaři, kurýři, obsluha","pl":"Pizzaiolo, kucharze, kurierzy, obsługa sali","en":"Pizza chefs, cooks, couriers, servers"},"Швидкий старт":{"cs":"Rychlý nástup","pl":"Szybki start","en":"Quick start"},"Фастфуд":{"cs":"Rychlé občerstvení","pl":"Fast food","en":"Fast food"},"Каса, кухня, видача замовлень, прибирання":{"cs":"Pokladna, kuchyně, výdej jídel, úklid","pl":"Kasa, kuchnia, wydawanie zamówień, sprzątanie","en":"Cashier, kitchen, order pickup, cleaning"},"Транспорт":{"cs":"Doprava","pl":"Transport","en":"Transport"},"Водії":{"cs":"Řidiči","pl":"Kierowcy","en":"Drivers"},"Водії різних категорій для локальних і міжнародних маршрутів":{"cs":"Řidiči různých skupin pro vnitrostátní i mezinárodní trasy","pl":"Kierowcy różnych kategorii na trasy krajowe i międzynarodowe","en":"Drivers of various license categories for local and international routes"},"Для роботодавців":{"cs":"Pro zaměstnavatele","pl":"Dla pracodawców","en":"For employers"},"Працівники, на яких можна покластися":{"cs":"Zaměstnanci, na které je spoleh","pl":"Pracownicy, na których można polegać","en":"Staff you can rely on"},"Беремо на себе пошук і первинний відбір кандидатів, щоб ваша команда швидше отримала потрібних людей.":{"cs":"Zajišťujeme vyhledávání a předvýběr uchazečů, aby vaše firma rychleji získala potřebné lidi.","pl":"Zajmujemy się wyszukiwaniem i wstępną selekcją kandydatów, aby Twoja firma szybciej znalazła pracowników.","en":"We handle sourcing and initial screening so your team can hire the people it needs faster."},"Обговорити потребу":{"cs":"Probrat potřeby","pl":"Omów potrzeby","en":"Discuss staffing needs"},"Аналіз потреби":{"cs":"Analýza potřeb","pl":"Analiza potrzeb","en":"Needs analysis"},"Уточнюємо профіль, обсяг роботи, графік та очікування.":{"cs":"Upřesníme profil, rozsah práce, směny a očekávání.","pl":"Ustalamy profil, zakres pracy, grafik i oczekiwania.","en":"We clarify roles, workload, schedules, and expectations."},"Пошук і відбір":{"cs":"Vyhledávání a výběr","pl":"Wyszukiwanie i selekcja","en":"Search and selection"},"Знаходимо кандидатів і перевіряємо їхню мотивацію та досвід.":{"cs":"Hledáme uchazeče a ověřujeme jejich motivaci a zkušenosti.","pl":"Znajdujemy kandydatów i sprawdzamy ich motywację i doświadczenie.","en":"We find candidates and assess their motivation and experience."},"Вихід на роботу":{"cs":"Nástup do práce","pl":"Rozpoczęcie pracy","en":"Starting work"},"Координуємо комунікацію та супроводжуємо старт співпраці.":{"cs":"Koordinujeme komunikaci a pomáháme se zahájením spolupráce.","pl":"Koordynujemy komunikację i wspieramy rozpoczęcie współpracy.","en":"We coordinate communication and support the start of employment."},"Готові до нового кроку?":{"cs":"Připraveni na další krok?","pl":"Gotowi na kolejny krok?","en":"Ready for the next step?"},"Напишіть або зателефонуйте — підберемо рішення для кандидата чи роботодавця.":{"cs":"Napište nebo zavolejte. Najdeme řešení pro uchazeče i zaměstnavatele.","pl":"Napisz lub zadzwoń. Znajdziemy rozwiązanie dla kandydata lub pracodawcy.","en":"Message or call us. We'll help candidates and employers find the right solution."},"Чехія":{"cs":"Česko","pl":"Czechy","en":"Czechia"},"Україна":{"cs":"Ukrajina","pl":"Ukraina","en":"Ukraine"},"Ви також можете переглянути наші актуальні вакансії на сторінці Facebook.":{"cs":"Aktuální nabídky práce najdete také na naší stránce na Facebooku.","pl":"Aktualne oferty pracy znajdziesz też na naszej stronie na Facebooku.","en":"You can also view our current vacancies on our Facebook page."},"Зазвичай відповідаємо в робочий час.":{"cs":"Obvykle odpovídáme v pracovní době.","pl":"Zwykle odpowiadamy w godzinach pracy.","en":"We usually respond during business hours."},"Люди для бізнесу. Робота для людей.":{"cs":"Lidé pro firmy. Práce pro lidi.","pl":"Ludzie dla firm. Praca dla ludzi.","en":"People for business. Jobs for people."},"Нагору ↑":{"cs":"Nahoru ↑","pl":"Do góry ↑","en":"Back to top ↑"},"Працевлаштування та рекрутинг у Чехії":{"cs":"Zaměstnání a nábor v Česku","pl":"Zatrudnienie i rekrutacja w Czechach","en":"Jobs and recruitment in Czechia"},"Оберіть номер телефону":{"cs":"Vyberte telefonní číslo","pl":"Wybierz numer telefonu","en":"Choose a phone number"},"Натисніть на номер, щоб зателефонувати.":{"cs":"Klepnutím na číslo zavoláte.","pl":"Kliknij numer, aby zadzwonić.","en":"Tap a number to call."},"Оберіть номер WhatsApp":{"cs":"Vyberte číslo WhatsApp","pl":"Wybierz numer WhatsApp","en":"Choose a WhatsApp number"},"Оберіть країну. У WhatsApp відкриється контакт або чат — натисніть значок телефону, щоб зателефонувати.":{"cs":"Vyberte zemi. V aplikaci WhatsApp se otevře kontakt nebo chat. Pro volání klepněte na ikonu telefonu.","pl":"Wybierz kraj. WhatsApp otworzy kontakt lub czat. Aby zadzwonić, naciśnij ikonę telefonu.","en":"Choose a country. WhatsApp will open the contact or chat; tap the phone icon to call."},"Viber — оберіть дію":{"cs":"Viber — vyberte akci","pl":"Viber — wybierz działanie","en":"Viber — choose an action"},"Telegram — оберіть дію":{"cs":"Telegram — vyberte akci","pl":"Telegram — wybierz działanie","en":"Telegram — choose an action"},"Переглянути оголошення про роботу або зателефонувати нам.":{"cs":"Prohlédněte si nabídky práce nebo nám zavolejte.","pl":"Zobacz oferty pracy lub zadzwoń do nas.","en":"Browse job posts or call us."},"📢 Перейти до оголошень":{"cs":"📢 Zobrazit nabídky","pl":"📢 Zobacz ogłoszenia","en":"📢 View job posts"},"Відкрити групу Viber":{"cs":"Otevřít skupinu Viber","pl":"Otwórz grupę Viber","en":"Open Viber group"},"Відкрити канал Telegram":{"cs":"Otevřít kanál Telegram","pl":"Otwórz kanał Telegram","en":"Open Telegram channel"},"☎ Зателефонувати":{"cs":"☎ Zavolat","pl":"☎ Zadzwoń","en":"☎ Call us"},"Обрати номер Чехії або України":{"cs":"Vybrat české nebo ukrajinské číslo","pl":"Wybierz numer czeski lub ukraiński","en":"Choose Czech or Ukrainian number"},"Відкрити меню":{"cs":"Otevřít nabídku","pl":"Otwórz menu","en":"Open menu"},"Закрити меню":{"cs":"Zavřít nabídku","pl":"Zamknij menu","en":"Close menu"},"Закрити":{"cs":"Zavřít","pl":"Zamknij","en":"Close"},"Переглянути вакансії →":{"cs":"Zobrazit nabídky →","pl":"Zobacz oferty →","en":"View jobs →"},"🇨🇿 Чехія":{"cs":"🇨🇿 Česko","pl":"🇨🇿 Czechy","en":"🇨🇿 Czechia"},"🇺🇦 Україна":{"cs":"🇺🇦 Ukrajina","pl":"🇺🇦 Ukraina","en":"🇺🇦 Ukraine"},"RECRUITER CZ — робота та персонал у Чехії":{"cs":"RECRUITER CZ — práce a zaměstnanci v Česku","pl":"RECRUITER CZ — praca i personel w Czechach","en":"RECRUITER CZ — jobs and staffing in Czechia"}};
  Object.assign(translations, {"RECRUITER CZ — на головну":{"cs":"RECRUITER CZ — domů","pl":"RECRUITER CZ — strona główna","en":"RECRUITER CZ — home"},"Логотип RECRUITER":{"cs":"Logo RECRUITER","pl":"Logo RECRUITER","en":"RECRUITER logo"},"Головна навігація":{"cs":"Hlavní navigace","pl":"Nawigacja główna","en":"Main navigation"},"Команда працівників різних професій у Чехії":{"cs":"Tým pracovníků různých profesí v Česku","pl":"Zespół pracowników różnych zawodów w Czechach","en":"Team of workers in various professions in Czechia"},"Переваги":{"cs":"Výhody","pl":"Korzyści","en":"Benefits"},"Далі до розділу про компанію":{"cs":"Přejít na sekci o společnosti","pl":"Przejdź do sekcji o firmie","en":"Go to about section"},"Обрати номер WhatsApp для дзвінка":{"cs":"Vybrat číslo WhatsApp pro volání","pl":"Wybierz numer WhatsApp do połączenia","en":"Choose WhatsApp number to call"},"Обрати дію Viber":{"cs":"Vybrat akci Viber","pl":"Wybierz działanie Viber","en":"Choose Viber action"},"Обрати дію Telegram":{"cs":"Vybrat akci Telegram","pl":"Wybierz działanie Telegram","en":"Choose Telegram action"},"Переглянути вакансії RECRUITER CZ у Facebook":{"cs":"Zobrazit nabídky RECRUITER CZ na Facebooku","pl":"Zobacz oferty RECRUITER CZ na Facebooku","en":"View RECRUITER CZ jobs on Facebook"},"Зателефонувати RECRUITER CZ":{"cs":"Zavolat RECRUITER CZ","pl":"Zadzwoń do RECRUITER CZ","en":"Call RECRUITER CZ"},"Готелі та ресторани — дізнатися більше":{"cs":"Hotely a restaurace — více informací","pl":"Hotele i restauracje — dowiedz się więcej","en":"Hotels and restaurants — learn more"},"Заводи — дізнатися більше":{"cs":"Továrny — více informací","pl":"Fabryki — dowiedz się więcej","en":"Factories — learn more"},"Склади — дізнатися більше":{"cs":"Sklady — více informací","pl":"Magazyny — dowiedz się więcej","en":"Warehouses — learn more"},"Будівництво — дізнатися більше":{"cs":"Stavebnictví — více informací","pl":"Budownictwo — dowiedz się więcej","en":"Construction — learn more"},"Ферми — дізнатися більше":{"cs":"Farmy — více informací","pl":"Farmy — dowiedz się więcej","en":"Farms — learn more"},"Лісове господарство — дізнатися більше":{"cs":"Lesnictví — více informací","pl":"Leśnictwo — dowiedz się więcej","en":"Forestry — learn more"},"Автосервіси — дізнатися більше":{"cs":"Autoservisy — více informací","pl":"Serwisy samochodowe — dowiedz się więcej","en":"Auto repair — learn more"},"Піцерії — дізнатися більше":{"cs":"Pizzerie — více informací","pl":"Pizzerie — dowiedz się więcej","en":"Pizzerias — learn more"},"Фастфуд — дізнатися більше":{"cs":"Rychlé občerstvení — více informací","pl":"Fast food — dowiedz się więcej","en":"Fast food — learn more"},"Водії — дізнатися більше":{"cs":"Řidiči — více informací","pl":"Kierowcy — dowiedz się więcej","en":"Drivers — learn more"}});
  const originals = new WeakMap();
  const attrOriginals = new WeakMap();
  const translate = (value, lang) => lang === 'uk' ? value : (translations[value]?.[lang] || value);
  const titleOriginal = document.title;
  const description = document.querySelector('meta[name="description"]');
  const descriptionOriginal = description?.content || '';
  function applyLanguage(lang) {
    if (!['uk','cs','pl','en'].includes(lang)) lang = 'uk';
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) {
      if (node.parentElement?.closest('script,style')) continue;
      if (!originals.has(node)) originals.set(node, node.nodeValue);
      const source = originals.get(node);
      const core = source.trim();
      if (!core) continue;
      const translated = translate(core, lang);
      node.nodeValue = source.replace(core, translated);
    }
    document.querySelectorAll('[aria-label],[title],[placeholder]').forEach(el => {
      if (!attrOriginals.has(el)) {
        const orig = {};
        ['aria-label','title','placeholder'].forEach(name => {if(el.hasAttribute(name)) orig[name] = el.getAttribute(name);});
        attrOriginals.set(el, orig);
      }
      for (const [name,value] of Object.entries(attrOriginals.get(el))) el.setAttribute(name, translate(value,lang));
    });
    document.documentElement.lang = lang;
    document.title = translate(titleOriginal, lang);
    if (description) description.content = lang === 'uk' ? descriptionOriginal : ({
      cs:'RECRUITER CZ — nabídky práce v Česku a profesionální nábor zaměstnanců.',
      pl:'RECRUITER CZ — oferty pracy w Czechach i profesjonalna rekrutacja pracowników.',
      en:'RECRUITER CZ — jobs in Czechia and professional recruitment services.'
    }[lang]);
    document.querySelectorAll('.language-switcher button').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
      btn.setAttribute('aria-pressed', String(btn.dataset.lang === lang));
    });
    try { localStorage.setItem('recruiter-language', lang); } catch {}
    window.recruiterCurrentLanguage = lang;
  }
  document.querySelectorAll('.language-switcher button').forEach(btn => btn.addEventListener('click', () => {
    applyLanguage(btn.dataset.lang);
    nav.classList.remove('open');
    menuButton.setAttribute('aria-expanded','false');
    document.body.style.overflow = '';
  }));
  let initial = 'uk';
  try { initial = new URLSearchParams(window.location.search).get('lang') || localStorage.getItem('recruiter-language') || 'uk'; } catch {}
  applyLanguage(initial);
})();

# Creative Portfolio Landing Page — PROMPT

Quyidagi promptni istalgan AI yordamchiga (Claude, ChatGPT va h.k.) berib, shu saytning o'zini yoki uning yangi variantini yaratishingiz mumkin.

---

## 🇺🇿 O'zbekcha prompt

```
Sen tajribali frontend dasturchi va UI/UX dizaynersan. Menga (Nigora Numonova, dasturchi) uchun juda kreativ, zamonaviy shaxsiy portfolio landing page yarat.

TEXNOLOGIYALAR
- Faqat toza HTML5, CSS3 va vanilla JavaScript (framework ishlatma).
- Fayl tuzilmasi aniq ajratilgan bo'lsin:
  portfolio/
  ├── index.html
  ├── css/style.css
  ├── js/main.js        (mantiq: tema, animatsiyalar, forma)
  ├── js/i18n.js        (UZ va EN tarjimalar obyekti)
  └── images/           (profil rasmi, logo, SVG rasmlar, loyiha muqovalari)
- Profil rasmim: images/nigora.jpg (hero uchun), images/avatar.jpg (men haqimda uchun).

TALABLAR
1. Ikki rejim: Dark va Light. Tugma orqali almashsin, tanlov localStorage'da saqlansin, birinchi kirishda tizim rejimiga (prefers-color-scheme) moslansin. Ranglar CSS o'zgaruvchilari (custom properties) orqali boshqarilsin.
2. Ikki til: O'zbek (UZ) va Ingliz (EN). Matnlar data-i18n atributlari orqali almashsin, til tanlovi saqlansin, sahifa qayta yuklanmasin.
3. Bo'limlar: Hero (ism, yozuvchi-effekt bilan lavozimlar, CTA tugmalar, statistika), Marquee lenta, Men haqimda, Ko'nikmalar (HTML, CSS, JS, UI/UX — progress barlar), Loyihalar (3 ta karta), Yo'l (timeline), Aloqa (forma + ijtimoiy tarmoqlar), Footer.
4. Kreativ effektlar:
   - zarrachali (particle) canvas fon, sichqoncha bilan o'zaro ta'sir
   - kursor ortidan yuruvchi yorug'lik (glow)
   - 3D tilt kartalar va magnit tugmalar
   - scroll reveal animatsiyalar, raqamlar sanaladigan hisoblagich
   - gradient matn, suzuvchi chip'lar, morf shakldagi blob va rasm ramkasi
   - sahifa tepasida scroll progress chizig'i
5. Dizayn uslubi: binafsha–pushti–moviy gradient (#ff5fa2, #7c5cff, #3dd6ff), glassmorphism kartalar, yumaloq burchaklar, sarlavhalar uchun Syne, matn uchun Space Grotesk, kod uslubi uchun JetBrains Mono shriftlari.
6. To'liq responsiv (mobil, planshet, kompyuter), mobil uchun burger menyu.
7. Sifat: semantik HTML, alt matnlar, aria-label'lar, prefers-reduced-motion'ni hurmat qilish, toza va izohli kod.

CHIQISH FORMATI
Har bir faylni alohida kod bloki ichida, fayl yo'li sarlavhasi bilan ber. Oxirida saytni qanday ishga tushirish va ma'lumotlarni (ism, loyihalar, aloqa havolalari) qanday o'zgartirishni qisqacha tushuntir.
```

---

## 🇬🇧 English prompt

```
You are an experienced frontend developer and UI/UX designer. Build a highly creative, modern personal portfolio landing page for me (Nigora Numonova, a developer).

TECH
- Pure HTML5, CSS3 and vanilla JavaScript only (no frameworks).
- Clearly separated file structure:
  portfolio/
  ├── index.html
  ├── css/style.css
  ├── js/main.js        (logic: theme, animations, form)
  ├── js/i18n.js        (UZ and EN translation object)
  └── images/           (profile photo, logo, SVG art, project covers)
- My profile photo: images/nigora.jpg (hero), images/avatar.jpg (about section).

REQUIREMENTS
1. Two themes: Dark and Light. Toggle button, persisted in localStorage, defaults to the system preference (prefers-color-scheme). Drive all colors with CSS custom properties.
2. Two languages: Uzbek (UZ) and English (EN). Swap text via data-i18n attributes, persist the choice, no page reload.
3. Sections: Hero (name, typewriter roles, CTA buttons, stats), Marquee strip, About, Skills (HTML, CSS, JS, UI/UX with progress bars), Projects (3 cards), Journey (timeline), Contact (form + socials), Footer.
4. Creative effects:
   - particle canvas background reacting to the mouse
   - cursor-following glow
   - 3D tilt cards and magnetic buttons
   - scroll-reveal animations and animated number counters
   - gradient text, floating chips, morphing blob and photo frame
   - scroll progress bar at the top
5. Visual style: violet–pink–cyan gradient (#ff5fa2, #7c5cff, #3dd6ff), glassmorphism cards, rounded corners, Syne for headings, Space Grotesk for body, JetBrains Mono for code accents.
6. Fully responsive (mobile, tablet, desktop) with a burger menu on mobile.
7. Quality: semantic HTML, alt text, aria-labels, respect prefers-reduced-motion, clean commented code.

OUTPUT FORMAT
Give each file in its own code block with the file path as a heading. At the end, briefly explain how to run the site and how to edit the content (name, projects, contact links).
```

---

## ✏️ Saytni o'zgartirish bo'yicha maslahat

- **Matnlar:** `js/i18n.js` ichida UZ va EN bo'limlarini tahrirlang.
- **Ranglar:** `css/style.css` boshidagi `--pink`, `--violet`, `--cyan` o'zgaruvchilari.
- **Rasm:** `images/nigora.jpg` va `images/avatar.jpg` ni almashtiring.
- **Ijtimoiy tarmoqlar:** `index.html` ichidagi `href="#"` o'rniga o'z havolalaringizni qo'ying.

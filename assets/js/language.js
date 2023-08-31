// Language data
const languageData = {
  id: {
    birthday: "Umur",
    contentAbout:
      "Perkenalkan! nama saya Trisna Almuti, lulusan Rekayasa Perangkat Lunak yang baru saja lulus dengan semangat yang tak tergoyahkan dalam pengembangan web. Ketertarikan saya pada bidang ini dimulai pada tahun 2020, dan sejak saat itu, saya memiliki rasa haus yang tak terpuaskan akan pengetahuan. Saya memulai perjalanan saya dengan mempelajari aspek dasar pembuatan situs web, dimulai dengan dasar-dasar HTML dan CSS. Semakin dalam saya mendalami bidang ini, semakin besar pula minat saya, yang mengarahkan saya untuk berfokus terutama pada bidang pengembangan backend.",
  },
  en: {
    birthday: "Birthday",
    contentAbout:
      "Greetings! I'm delighted to introduce myself as Trisna Almuti, a recent Software Engineering graduate with an unwavering passion for web development. My fascination with this field began in 2020, and ever since, I have embraced an insatiable thirst for knowledge. I embarked on my journey by delving into the fundamental aspects of website creation, starting with the essentials of HTML and CSS. The deeper I delved into this realm, the more my passion burgeoned, leading me to focus primarily on the captivating realm of backend development.",
  },
};

// Function to change language
function changeLanguage(lang) {
  const birthday = document.getElementById("birthday");
  const contentAbout = document.getElementById("contentAbout");

  birthday.textContent = languageData[lang].birthday;
  contentAbout.textContent = languageData[lang].contentAbout;
}

// Event listener for language links
const languageLinks = document.querySelectorAll("[data-lang]");
languageLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const selectedLang = e.target.getAttribute("data-lang");
    changeLanguage(selectedLang);
  });
});

window.addEventListener("load", () => {
  document.querySelector(".time") && getWeather();
  const form = document.getElementsByTagName("form")[0];

  const validate = fields => {
    let validation = true;

    fields.forEach(f => {
      if (f.value.length === 0 || (f.type === "checkbox" && !f.checked)) {
        f.classList.add("error");
        validation *= false;
      } else {
        f.classList.remove("error");
        validation *= true;
      }
    });

    return validation;
  };

  form &&
    form.addEventListener("submit", async e => {
      e.preventDefault();
      const SendData = new FormData(form);
      const http = new XMLHttpRequest();
      const fields = Array.from(form.querySelectorAll('[data-type="field"]'));

      const isValid = await validate(fields);

      if (isValid) {
        http.open("POST", "form.php", true);
        http.onreadystatechange = () => {
          if (http.readyState == 4 && http.status == 200) {
            form.classList.add("hidden");
            document.querySelector(".ss").classList.add("active");
          }
        };
        http.send(SendData);
      }
    });

  const topBtn = document.querySelector(".top-btn span");
  topBtn &&
    topBtn.addEventListener("click", () => {
      window.scroll({ top: 0, left: 0, behavior: "smooth" });
    });

  $(".advantages").slick({
    mobileFirst: true,
    centerMode: true,
    arrows: false,
    centerPadding: "10%",
    slidesToShow: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: "unslick"
      }
    ]
  });

  const sliderItems = Array.from(document.querySelectorAll(".adv"));

  sliderItems.forEach(el => {
    el.addEventListener("click", e => {
      const index = el.getAttribute("data-slick-index");
      $(".advantages").slick("slickGoTo", index);
    });
  });
});

const getWeather = async () => {
  const w = fetch(
    "https://api.openweathermap.org/data/2.5/find?q=Beirut&units=metric&appid=9da32aaafbf99f43f7d52b9381cd91c5"
  ).then(r => r.json());
  const { list } = await w;
  const currentWeather = Math.ceil(list[0].main.temp);
  const icon = list[0].weather[0].icon;

  currentWeather && icon && setWeather(currentWeather, icon);
};

const setWeather = (temp, icon) => {
  const tempHolder = document.querySelector(".temp-holder");
  const iconHolder = document.querySelector(".icon-holder");
  tempHolder.innerHTML = `${temp} ° C`;
  iconHolder.innerHTML = `<img src="https://openweathermap.org/img/w/${icon}.png" />`;
};

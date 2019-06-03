window.addEventListener("load", () => {
  const form = document.getElementsByTagName("form")[0];

  const validate = fields => {
    let validation = true;

    fields.forEach(f => {
      if (f.value.length === 0) {
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

  const topBtn = document.querySelector(".to-top a");
  topBtn &&
    topBtn.addEventListener("click", e => {
      e.preventDefault();
      window.scroll({ top: 0, left: 0, behavior: "smooth" });
    });

  $(".feedbacks").slick({
    mobileFirst: true,
    centerMode: true,
    arrows: false,
    centerPadding: "35%",
    // infinite: false,
    focusOnSelect: true,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          centerPadding: "38%"
        }
      }
    ]
  });
  const sliderItems = Array.from(document.querySelectorAll(".feedback"));

  const showSlides = currentSlide => {
    const prevIndex = currentSlide - 1;
    const nextIndex = currentSlide + 1;

    sliderItems.forEach(el => {
      const index = el.getAttribute("data-slick-index");
      if (+index === prevIndex || +index === nextIndex) {
        el.classList.add("visible");
      } else {
        el.classList.remove("visible");
      }
    });
  };

  showSlides(0);

  $(".feedbacks").on("beforeChange", function(
    event,
    slick,
    currentSlide,
    nextSlide
  ) {
    showSlides(nextSlide);
  });
});

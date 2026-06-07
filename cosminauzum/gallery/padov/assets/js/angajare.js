(function () {
    emailjs.init("axm62-nrRXhVpMnv5"); // Înlocuiește cu ID-ul tău de utilizator EmailJS
  })();

  document
    .getElementById("apply-form")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      const formData = new FormData(this);

      const emailParams = {
        name: formData.get("name"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        location: formData.get("location"),
        job: formData.get("job"),
      };

      // Trimiterea emailului către companie
      emailjs
        .send(
          "service_lcpt396",
          "template_636ucmn",
          emailParams
        )
        .then(
          function (response) {
            // Trimiterea emailului de confirmare către utilizator
            const confirmationParams = {
              user_email: formData.get("email"),
              user_name: formData.get("name"),
            };

            emailjs
              .send(
                "service_lcpt396",
                "template_we7m3uv",
                confirmationParams
              )
              .then(
                function (response) {
                  alert(
                    "Aplicația ta a fost trimisă cu succes! Vei primi un email de confirmare."
                  );
                },
                function (error) {
                  alert(
                    "A apărut o eroare la trimiterea aplicației. Încearcă din nou!"
                  );
                }
              );
          },
          function (error) {
            alert(
              "A apărut o eroare la trimiterea aplicației. Încearcă din nou!"
            );
          }
        );
    });

  // Funcția pentru flip card
  function flipCard(card) {
    card.classList.toggle("flipped");
  }
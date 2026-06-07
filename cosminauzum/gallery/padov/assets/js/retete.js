const blogContainer = document.getElementById("blog-container");
      let currentPage = 1;

      const pages = [
        [
          {
            title: "Prăjitura Tradițională Pavlova",
            description: "Descoperă prăjitura ce a făcut celebră Patiseria Padov. O combinație perfectă de arome autentice și tehnici rafinate.",
            image: "https://www.padov.ro/img/pavlova3.jpg",
            alt: "Prăjitură tradițională Pavlova",
            url: "https://padov.ro/in_curand/index.html"
          },
          {
            title: "Tortul Moștenire Padov",
            description: "Un desert nobil, pregătit doar pentru ocazii speciale. O rețetă veche, păstrată cu grijă de familia Padov.",
            image: "https://www.padov.ro/img/padov.jpg",
            alt: "Tortul Moștenire Padov",
            url: "https://padov.ro/in_curand/index.html"
          },
          {
            title: "Covrigeii bunicii",
            description: "Rețeta originală a covrigeilor făcuți în casă, care păstrează gustul copilăriei și tradiția familiei Padov.",
            image: "https://www.padov.ro/img/covrigei.jpg",
            alt: "Covrigeii bunicii",
            url: "../../articole/covrigei.html"
          },
          {
            title: "Cozonac cu nucă",
            description: "Cozonaci cu nucă",
            image: "https://www.padov.ro/img/cozonac.jpg",
            alt: "Cozonac cu nucă",
            url: "../../articole/cozonac.html"
          }
        ],
        [{
            title: "Tartă cu fructe de pădure",
            description:
              "Tartă crocantă, umplută cu cele mai proaspete fructe de pădure și o cremă fină de vanilie.",
            image: "https://www.padov.ro/img/tarte.jpg",
            alt: "Tartă cu fructe de pădure",
            url: "https://padov.ro/in_curand/index.html"
          },
          {
            title: "Cornulețe fragede cu nucă",
            description:
              "Cornulețe fine și fragede, umplute cu o delicioasă pastă",
            image: "https://www.padov.ro/img/cornulete_asortate2.jpg",
            alt: "Cornulețe asortate",
            url: "https://padov.ro/in_curand/index.html"
          },
          {
            title: "Eclerul Padov",
            description:
              "Un ecler clasic cu o cremă delicioasă, transformat într-o capodoperă de desert.",
            image: "https://www.padov.ro/img/eclere.jpg",
            alt: "Eclerul Padov",
            url: "https://padov.ro/in_curand/index.html"
          },
        //   {
        //     title: "Checul de ciocolată fină",
        //     description:
        //       "Chec de ciocolată preparat cu ciocolată de cea mai bună calitate. Un deliciu pentru orice iubitor de ciocolată.",
        //     image: "https://via.placeholder.com/600x300",
        //     alt: "Checul de ciocolată fină",
        //   },
        //   {
        //     title: "Macarons franțuzești",
        //     description:
        //       "Rețeta perfectă pentru macarons fragede și crocante, ce îți aduc un gust din inima Parisului.",
        //     image: "https://via.placeholder.com/600x300",
        //     alt: "Macarons franțuzești",
        //   },
        ]
        // [
        //   {
        //     title: "Tartă cu fructe de pădure",
        //     description:
        //       "Tartă crocantă, umplută cu cele mai proaspete fructe de pădure și o cremă fină de vanilie.",
        //     image: "https://www.padov.ro/img/tarte.jpg",
        //     alt: "Tartă cu fructe de pădure",
        //   },
        //   {
        //     title: "Cornulețe fragede cu nucă",
        //     description:
        //       "Cornulețe fine și fragede, umplute cu o delicioasă pastă",
        //     image: "https://www.padov.ro/img/cornulete_asortate2.jpg",
        //     alt: "Cornulețe asortate",
        //   },
        //   {
        //     title: "Cheesecake cu caramel",
        //     description:
        //       "Un cheesecake cremos cu caramel sărat, ce îți va încânta simțurile la fiecare linguriță.",
        //     image: "https://via.placeholder.com/600x300",
        //     alt: "Cheesecake cu caramel",
        //   },
        //],
      ];

      function changePage(pageNumber) {
        if (pageNumber < 1 || pageNumber > pages.length) return;
      
        currentPage = pageNumber;
        blogContainer.innerHTML = "";
      
        pages[pageNumber - 1].forEach((post) => {
          const blogPost = document.createElement("div");
          blogPost.classList.add("blog-post");
      
          blogPost.innerHTML = `
                    <img src="${post.image}" alt="${post.alt}">
                    <div class="blog-content">
                        <h2>${post.title}</h2>
                        <p>${post.description}</p>
                        <a href="${post.url}" class="more-button">Mai mult</a>
                    </div>
                `;
          blogContainer.appendChild(blogPost);
        });
      
        // Scroll la începutul paginii
        window.scrollTo({ top: 0, behavior: "smooth" });
      
        // Actualizează butoanele Prev și Next
        document.getElementById("prevBtn").disabled = currentPage === 1;
        document.getElementById("nextBtn").disabled =
          currentPage === pages.length;
      }
      
      // Load the first page by default
      changePage(1);
      
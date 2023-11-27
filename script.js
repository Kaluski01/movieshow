const apiKey = '313bce687a1c5e9f83aac6c846f66a13';
const movieId = 458156;
const targetDiv = document.getElementById('movieDetails'); 

fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`)
    .then(response => {
        return response.json();
    })
    .then(data => {
        // Create HTML content with movie information
        const movieContent = `
            <h1 class="overview ">${data.title}</h1>
            <p>Release Date:${data.release_date}</p>
            <p class="data">Overview: ${data.overview}</p>
            <p>Vote Average: ${data.vote_average}</p>
            
        `;

        // Set the HTML content of the target div
        targetDiv.innerHTML = movieContent;
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });



    let main = document.getElementById('main');
    // const apiKey = '313bce687a1c5e9f83aac6c846f66a13';
    let smallImages = ['imob.png','ping.png']
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`)
        .then((response) => {
            return response.json();
        })
        .then(data => {
            // Iterate through the movies and create HTML elements
            data.results.forEach(movie => {
                const movieDiv = document.createElement('div');
                movieDiv.classList.add('movie-card');

    
                // Create and set attributes for the image element
                const movieImage = document.createElement('img');
                movieImage.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
                movieImage.alt = `${movie.title} Poster`;
                movieImage.classList.add('movie-image'); // Add a class for styling

                const detailedId = movie.id
                movieDiv.addEventListener('click', function () {
                    navigateToDetailedPage(detailedId);
                });
                const movieTitle = document.createElement('h3');
                movieTitle.textContent = movie.title;
    
                const movieOverview = document.createElement('p');
                // movieOverview.textContent = movie.overview; 
    
                const releaseDate = document.createElement('p');
                releaseDate.textContent = `Release Date: ${movie.release_date}`;
                releaseDate.classList.add('releaseDate')

                // Append elements to movieDiv
                
                movieDiv.appendChild(movieImage);
                movieDiv.appendChild(movieTitle);
                movieDiv.appendChild(releaseDate);
                // Append movieDiv to main

                main.appendChild(movieDiv)

                // for the images
                let imageContainer = document.createElement('div');
                imageContainer.id = 'imageContainer'; // You may want to assign unique IDs for each container
            
                // Add small images and text to the image container
                smallImages.forEach((smallImageUrl, index) => {

                    const smallImage = document.createElement('img');
                    smallImage.src = smallImageUrl;
                    smallImage.alt = '';
            
                    const text = document.createElement('p');
                    text.textContent = (index === 0) ? '8.5/100%' : '90%'; // Adjust text content as needed
            
                    imageContainer.appendChild(smallImage);
                    imageContainer.appendChild(text);
                });
            
                // Append the image container to the current movie card
                movieDiv.appendChild(imageContainer);
            
            });
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });

      function navigateToDetailedPage(movieId) {
        window.location.href = `detailed.html?movieId=${movieId}`;
    }

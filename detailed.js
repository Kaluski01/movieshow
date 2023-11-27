document.addEventListener('DOMContentLoaded', function () {
    // Get the movieId from the query parameter
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get('movieId');

    // Check if movieId is not null


    const apiKey = '313bce687a1c5e9f83aac6c846f66a13';
    const targetDiv = document.getElementById('movieDetails');

    // Include the 'credits' information in the API request
    fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&append_to_response=credits`)
        .then(response => response.json())
        .then(data => {
            const movieImage = document.createElement('img');
            movieImage.src = `https://image.tmdb.org/t/p/w500${data.backdrop_path}`;
            movieImage.classList.add('movie-image');

            // Extract credits information
            const credits = data.credits;
            const cast = credits.cast.slice(0, 2);
            const crew = credits.crew;
            const backdrop_path = data.backdrop_path;

            const stars = cast.filter(member => member.known_for_department === 'Acting');
            const directors = crew.filter(member => member.job === 'Director');
            const producers = crew.filter(member => member.job === 'Producer');

            const movieContent = `
                <img src ="https://image.tmdb.org/t/p/w500${backdrop_path}?api_key=${apiKey}" class="image"></img>
                <div class="movieDetails">
                    <h1>Title: ${data.title}</h1>
                    <div class="info">
                        <span>
                            <h2>Overview:</h2>
                            <h6>${data.overview}</h6>
                        </span>
                        <span>      
                            <h2>Stars:</h2>
                            <p>${stars.map(star => `${star.name}`).join(', ')}</p>
                        </span>
                        <span>
                            <h2>Directors:</h2>
                            <p>${directors.map(director => `${director.name}`).join(', ')}</p>
                        </span>
                        <span>
                            <h2>Producers:</h2>
                            <p>${producers.map(producer => `${producer.name}`).join(', ')}</p>
                        </span>
                    </div>
                </div>`;

            // Set the HTML content of the target div
            targetDiv.innerHTML = movieContent;
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
});

location.href('index.html')
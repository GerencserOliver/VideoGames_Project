export default class ByName {
    constructor() {
        document.querySelector(".btn")?.addEventListener("click", this.filteredByName.bind(this));
    }


    async filteredByName() {
        const response = await fetch("http://localhost:3000/games");
        const games = await response.json();
        const search = document.querySelector("#search") as HTMLInputElement;
        const cardContainer = document.querySelector(".card-container") as HTMLDivElement;

        let gamesHTML = "";
        games.forEach((game: {
            Title: string;
            Metrics: { ReviewScore: number; UsedPrice: number };
            Features: { MaxPlayers: number };
            Release: { Console: string; Year: number };
            Metadata: { Genres: string };
        }) => {
            if (game.Title.toLowerCase().includes(search.value.toLowerCase())) {
                gamesHTML += `
                    <div class="col-md-4">
                        <div class="card" style="width: 23.5rem; height: 17rem;">
                            <div class="card-body">
                                <h5 class="card-title">${game.Title}</h5>
                                <p class="card-text"><strong>Műfaj:</strong> ${game.Metadata.Genres}</p>
                                <p class="card-text"><strong>Értékelés:</strong> ${game.Metrics.ReviewScore}</p>
                                <p class="card-text"><strong>Max. játékosok:</strong> ${game.Features.MaxPlayers}</p>
                                <p class="card-text"><strong>Használt ár:</strong> $${game.Metrics.UsedPrice}</p>
                                <p class="card-text"><strong>Megjelenés éve:</strong> ${game.Release.Year}</p>
                            </div>
                        </div>
                    </div>
                `;
            }
        });
        console.log(gamesHTML);
        cardContainer.innerHTML = gamesHTML;
    }
}
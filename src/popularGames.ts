export default class PopularGames {
    constructor() {
        this.showPopularGames();
    }

    async loadPopularGames() {
        const response = await fetch("http://localhost:3000/games");
        const games = await response.json();
        return games;
    }

    async showPopularGames() {
        const games = await this.loadPopularGames();
        let gamesHTML = "";
        let cardContainer = document.querySelector(".row") as HTMLDivElement;

        const sortedGames = games.sort((a: any, b: any) => b.Metrics.ReviewScore - a.Metrics.ReviewScore);

        const top10Games = sortedGames.slice(0, 10);

        if (cardContainer) {
            top10Games.forEach((game: {
                Title: string;
                Metadata: { Genres: string };
                Metrics: { ReviewScore: number; UsedPrice: number };
                Features: { MaxPlayers: number };
                Release: { Year: number };
            }) => {
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
            });
            cardContainer.innerHTML = gamesHTML;
        }
    }
}

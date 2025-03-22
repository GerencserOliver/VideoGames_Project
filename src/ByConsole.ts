export default class ByConsole {
    constructor() {
        this.selectedConsole();
        document.querySelector(".btn")?.addEventListener("click", this.filterByConsole.bind(this));
    }

    async selectedConsole() {
        const response = await fetch("http://localhost:3000/games");
        const games = await response.json();
        const select = document.querySelector(".console-select") as HTMLSelectElement;

        games.forEach((game: {
            Title: string;
            Metadata: { Genres: string };
            Metrics: { ReviewScore: number; UsedPrice: number };
            Features: { MaxPlayers: number };
            Release: { Console: string };
        }) => {
            let option = document.createElement("option");
            option.value = game.Release.Console;
            if (!select.innerHTML.includes(option.value)) {
                option.text = game.Release.Console;
                select.appendChild(option);
            }
        });
    }

    async filterByConsole() {
        const response = await fetch("http://localhost:3000/games");
        const games = await response.json();
        const select = document.querySelector(".console-select") as HTMLSelectElement;
        const cardContainer = document.querySelector(".row") as HTMLDivElement;

        let gamesHTML = "";

        games.forEach((game: {
            Title: string;
            Metadata: { Genres: string };
            Metrics: { ReviewScore: number; UsedPrice: number };
            Features: { MaxPlayers: number };
            Release: { Console: string; Year: number };
        }) => {
            if (select.value === game.Release.Console) {
                gamesHTML += `
                    <div class="col-md-4">
                        <div class="card" style="width: 25rem;">
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
        cardContainer.innerHTML = gamesHTML;
    }
}
import PopularGames from "./popularGames";
import ByConsole from "./ByConsole";

const rootDiv = document.querySelector("#root") as HTMLDivElement | null;

const navbarItems = document.querySelectorAll("a[data-href]") as NodeListOf<HTMLAnchorElement>;

const PAGES = "/pages/";
const routes: Record<string, { page: string; code: any }> = {
  '/': { page: 'games.html', code: PopularGames },
  '/konzolok-szerint': { page: 'byconsole.html', code: ByConsole },
  '/mufaj-szerint': { page: 'bygenre.html', code: null },
  '/kiadok-szerint': { page: 'bypublisher.html', code: null },
  '/kapcsolat': { page: 'contact.html', code: null }
};


const loadPage = async (page: string): Promise<string> => {
    const response = await fetch(PAGES + page);
    const resHTML = await response.text();
    return resHTML;
};

const dynamicClass = (code: any) => {
    if (code != null) {
        const dynamicClassName = eval(code);
        new dynamicClassName();
    }
};

const onNavClick = async (event: Event) => {
    event.preventDefault();
    const target = event.target as HTMLAnchorElement;
    const pathName = target.dataset.href;
    if (!pathName) return;
    window.history.pushState({}, '', pathName);
    const data = await loadPage(routes[pathName].page);
    if (rootDiv) rootDiv.innerHTML = data;
    dynamicClass(routes[pathName].code);
};

window.addEventListener("load", async () => {
    const pathName = window.location.pathname;
    if (!routes[pathName]) return;
    const data = await loadPage(routes[pathName].page);
    if (rootDiv) rootDiv.innerHTML = data;
    dynamicClass(routes[pathName].code);
});

window.addEventListener("popstate", async () => {
    const pathName = window.location.pathname;
    if (!routes[pathName]) return;
    const data = await loadPage(routes[pathName].page);
    if (rootDiv) rootDiv.innerHTML = data;
    dynamicClass(routes[pathName].code);
});

navbarItems.forEach(item => {
    item.addEventListener("click", onNavClick);
});

import "./Steam.scss";

type FavoriteGame = {
  title: string;
  imagePath: string;
};

const FAVORITE_GAMES: FavoriteGame[] = [
  { title: "Nier Automata", imagePath: "images/games/na.jpg" },
  { title: "Fire Emblem Awakening", imagePath: "images/games/fea.jpg" },
  { title: "Sonic Adventure 2: Battle", imagePath: "images/games/sa2b.jpg" },
  { title: "Final Fantasy XIII", imagePath: "images/games/ff13.jpg" },
];

const PARENT_CLASS = "Steam";

const STEAM_URL = "steamcommunity.com/profiles/76561198341352380/";

function Steam() {
  // const { data } = useQuery({
  //   queryKey: ['recentlyPlayedGames'],
  //   queryFn: () => getRecentlyPlayedGames(),
  // });

  return (
    <div className={`${PARENT_CLASS}`}>
      <div className={`${PARENT_CLASS}__navbar`}>
        <div className={`${PARENT_CLASS}__navbar-logo`}>Steam</div>
        <div className={`${PARENT_CLASS}__navbar-links`}>
          <ul>
            <li>
              <a>Store</a>
            </li>
            <li>
              <a>Library</a>
            </li>
            <li>
              <a>Community</a>
            </li>
          </ul>
        </div>
      </div>
      <div className={`${PARENT_CLASS}__url`}>
        <div className={`${PARENT_CLASS}__url-title`}>URL</div>
        <div className={`${PARENT_CLASS}__url-link`}>{STEAM_URL}</div>
      </div>
      <div className={`${PARENT_CLASS}__content`}>
        <div className={`${PARENT_CLASS}__user-info`}>
          <div className={`${PARENT_CLASS}__user-info-heading`}>
            Profile — Public View{" "}
          </div>
          <div className={`${PARENT_CLASS}__user-info-content`}>
            <div className={`${PARENT_CLASS}__user-info-pic`}>
              <img src="/images/steamprofilepic.jpg" />
            </div>
            <div className={`${PARENT_CLASS}__user-info-stats`}>
              <div className={`${PARENT_CLASS}__user-info-name`}>Dani</div>
              <div className={`${PARENT_CLASS}__dashed-border`}></div>
              <div className={`${PARENT_CLASS}__user-info-text`}>
                <div>
                  <div className={`${PARENT_CLASS}__user-info-label`}>
                    COUNTRY
                  </div>
                  <div className={`${PARENT_CLASS}__user-info-label`}>
                    STATUS
                  </div>
                  <div className={`${PARENT_CLASS}__user-info-label`}>
                    SUMMARY
                  </div>
                </div>
                <div>
                  <div className={`${PARENT_CLASS}__user-info-input`}>
                    UNITED STATES
                  </div>
                  <div className={`${PARENT_CLASS}__user-info-input`}>
                    ONLINE
                  </div>
                  <div className={`${PARENT_CLASS}__user-info-input`}>
                    i love video games!!!
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={`${PARENT_CLASS}__favorites`}>
          <div className={`${PARENT_CLASS}__content-heading`}>
            Favorite Games
          </div>
          <div className={`${PARENT_CLASS}__favorites-games`}>
            {FAVORITE_GAMES.map((game) => (
              <div
                className={`${PARENT_CLASS}__favorites-games-card`}
                key={game.title}
              >
                <img src={game.imagePath} />
                <span>{game.title}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Steam;

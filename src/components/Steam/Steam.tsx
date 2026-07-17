import { useQuery } from '@tanstack/react-query';
import './Steam.scss';
import { getRecentlyPlayedGames } from '../../api/api';
import { GameData } from '../../types/types';

const PARENT_CLASS = 'Steam';

function Steam() {
  const { data } = useQuery({
    queryKey: ['recentlyPlayedGames'],
    queryFn: () => getRecentlyPlayedGames(),
  });

  return (
    <div className={`${PARENT_CLASS}__container`}>
      <div className={`${PARENT_CLASS}__header`}>
        <img src="/icons/steamgray.png"></img>
        <div>
          <div className="title">STEAM</div>
          <ul>
            <li>Store</li>
            <li>Community</li>
            <li>About</li>
            <li>Support</li>
          </ul>
        </div>
      </div>
      <div className={`${PARENT_CLASS}__body`}>
        <div className="about">
          <div className="heading">About</div>
          <div className="about__content">
            <img className="profile-pic" src="/images/steamprofilepic.jpg" />
            <ul>
              <li>dani</li>
              <li>
                <img src="/images/usflag.gif" /> United States
              </li>
              <li>
                i love video games!!! <img src="/images/steamhappy.png" />
              </li>
            </ul>
          </div>
        </div>
        <div className="content">
          <div className="left">
            <div className="card">
              <div className="header">recent activity</div>

              {data
                ? data.map((game: GameData) => (
                    <div className="game" key={game.name}>
                      <img src={game.imgUrl} />
                      <div className="game__text">
                        <span>{game.name}</span>
                        <span>{(game.playtimeForever / 60).toFixed(1)} hrs played</span>
                      </div>
                    </div>
                  ))
                : null}
            </div>
            <div className="card">
              <div className="header">comments</div>
              content
            </div>
          </div>
          <div className="right">
            <div className="card">
              <div className="header">favorites</div>
              content
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Steam;

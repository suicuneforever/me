import { useQuery } from '@tanstack/react-query';
import './Steam.scss';
import { getRecentlyPlayedGames } from '../../api/api';

const PARENT_CLASS = 'Steam';

function Steam() {
  const { data, status, error } = useQuery({
    queryKey: ['recentlyPlayedGames'],
    queryFn: () => getRecentlyPlayedGames(),
  });

  console.log('status', status);
  console.log('data', data);
  console.log('error', error);

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
        <div className="search-bar">
          <input type="text" />
        </div>
      </div>
      <div className={`${PARENT_CLASS}__body`}>
        <div className="about">
          <div className="heading">About</div>
          <div className="about__content">
            <img src="/images/steamprofilepic.jpg" />
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
            <div className="card activity">
              <div className="header">activity</div>
              content
            </div>
            <div className="card comments">
              <div className="header">comments</div>
              content
            </div>
          </div>
          <div className="right">
            <div className="card favorites">
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

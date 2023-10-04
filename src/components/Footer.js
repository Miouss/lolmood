import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";

import "../styles/Footer.css";

export default function Footer() {
  return (
    <>
      <div id="logo-copyright">
        <h1>LOL Mood</h1>
        <p>Copyright © 2022 Ghabi Samir. All Rights Reserved</p>
      </div>

      <div id="legal-mention">
        <p>
          LoL Mood was created under Riot Games' "Legal Jibber Jabber" policy
          using assets owned by Riot Games. Riot Games does not endorse or
          sponsor this project.
        </p>
      </div>

      <div id="developpers-mention">
        <div>
          <a
            href="https://www.linkedin.com/in/samir-ghabi-aa58a2224/"
            target="_blank"
            rel="noreferrer"
          >
            <FontAwesomeIcon icon={faLinkedin} size="2x" />
          </a>
          <span>Developped by Samir Ghabi</span>
        </div>
        <div>
          <a href="https://www.linkedin.com/in/evans-ry/" target="_blank">
            <FontAwesomeIcon icon={faLinkedin} size="2x" />
          </a>
          <span>Designed by Evans Riss Yaw</span>
        </div>
      </div>
    </>
  );
}

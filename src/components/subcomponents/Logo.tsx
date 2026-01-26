import { APPNAME } from "../../utils/utils.constants";
import logo from '../../assets/logo.png';

export const Logo: React.FC = () => {
    return (
        <div className="wp-block-site-logo">
            <a href="index.html" className="custom-logo-link" rel="home" aria-current="page">
                <img fetchPriority="high" width="90" height="49"
                    className="custom-logo" alt={APPNAME} decoding="async"
                    sizes="(max-width: 120px) 100vw, 240px"
                    src={logo}
                />
            </a>
        </div>
    );
};
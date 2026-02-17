import { APPNAME } from "../../utils/utils.constants";

export const SkipToContent: React.FC = () => {
    return (
        <a className="skip-link screen-reader-text" id="wp-skip-link" href="/">
            Skip to content {APPNAME}
        </a>
    );
};
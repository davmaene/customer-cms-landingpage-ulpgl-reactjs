import { ApplyButton } from "./subcomponents/ApplyHeaderButton";
import { Logo } from "./subcomponents/Logo";
import { MainNavigation } from "./subcomponents/Navigation";
import { TopNavigation } from "./subcomponents/TopNavigationButton";

export const Header: React.FC = () => {
  return (
    <header className="site-header wp-block-template-part">
      <div className="wp-block-group alignfull is-style-default has-global-padding is-layout-constrained wp-container-core-group-is-layout-9f697be6 wp-block-group-is-layout-constrained"
        style={{ marginTop: '0px', paddingTop: '20px', paddingRight: '30px', paddingBottom: '30px', paddingLeft: '30px' }}>
        <TopNavigation />
        <hr
          className="wp-block-separator has-text-color has-lightgrey-color has-alpha-channel-opacity has-lightgrey-background-color has-background is-style-wide"
          style={{ marginTop: '15px', marginBottom: '0px' }}
        />
        <div className="wp-block-group is-content-justification-space-between is-nowrap is-layout-flex wp-container-core-group-is-layout-cb46ffcb wp-block-group-is-layout-flex">
          <Logo />
          <MainNavigation />
          <ApplyButton canBeShown={false} />
        </div>
      </div>
    </header>
  );
};


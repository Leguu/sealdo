import { Trans } from "@lingui/macro";
import { SideNavDivider } from "carbon-components-react";

const Custom404 = () => {

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'row',
      height: '100vh',
      alignItems: 'center',
      justifyContent: 'center',
      columnGap: '1rem'
    }}>
      <Trans>
        <p> 404 </p>

        <div style={{
          borderRight: '1px solid var(--cds-border-strong-01)',
          height: '2rem'
        }} />

        <p> Page not Found </p>
      </Trans>
    </div>
  );
};

export default Custom404;
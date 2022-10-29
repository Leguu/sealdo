import { Content, Header, HeaderGlobalAction, HeaderGlobalBar, HeaderMenuButton, HeaderName, HeaderNameProps, SkipToContent } from "carbon-components-react";
import Link from "next/link";
import React, { forwardRef, ReactNode, useEffect, useState } from "react";
import { UserProfile } from '@carbon/icons-react';
import { t } from "@lingui/macro";
import { useIsMobile } from "@/utils/useIsMobile";
import { profileMenuOpenAtom, useClientSideAtom } from "src/atoms";
import { User } from "@prisma/client";
import UserHeaderPanel from "./UserHeaderPanel";
import SideBar from "./SideBar";

const HeaderNameWithRef = forwardRef((props: HeaderNameProps, _ref) => (
  <HeaderName {...props} />
));
HeaderNameWithRef.displayName = 'HeaderName';


interface Props {
  children: ReactNode;
  user: User;
}

const Layout = ({ children, user }: Props) => {
  const isMobile = useIsMobile();

  const [profileMenuOpen, setProfileMenuOpen] = useClientSideAtom(profileMenuOpenAtom, false);

  const [isSideNavExpanded, setIsSideNavExpanded] = useState(false);
  const onClickSideNavExpand = () => setIsSideNavExpanded(!isSideNavExpanded);
  const closeSideNav = () => setIsSideNavExpanded(false);

  const [isRail, setIsRail] = useState<boolean>();
  useEffect(() => {
    setIsRail(!isMobile);
  }, [isMobile]);

  const HeaderElement = (
    <Header aria-label={t`Header`} style={{ backgroundColor: 'var(--cds-layer-02)' }}>
      <SkipToContent />

      <HeaderMenuButton
        isCollapsible
        onClick={onClickSideNavExpand}
        isActive={isSideNavExpanded}
        aria-label={t`Toggle Navigation`}
      />

      <Link href='/' passHref>
        <HeaderNameWithRef prefix="Legu's">
          Sealdo
        </HeaderNameWithRef>
      </Link>

      <HeaderGlobalBar>
        <HeaderGlobalAction
          aria-label={t`Profile`}
          isActive={profileMenuOpen}
          onClick={() => setProfileMenuOpen(!profileMenuOpen)}
        >
          <UserProfile />
        </HeaderGlobalAction>
      </HeaderGlobalBar>

      <UserHeaderPanel open={profileMenuOpen} user={user} onClose={() => setProfileMenuOpen(false)} />

      <SideBar open={isSideNavExpanded} isRail={isRail} onClose={closeSideNav} />
    </Header>
  );

  return <>
    {HeaderElement}

    <Content style={{ marginLeft: isRail ? '3rem' : undefined }}>
      {children}
    </Content>
  </>;
};

export default Layout;
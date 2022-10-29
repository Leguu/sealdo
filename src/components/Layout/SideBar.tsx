import { useIsMobile } from "@/utils/useIsMobile";
import { Home, Calendar, Task, Event, Course, Term } from "@carbon/icons-react";
import { t } from "@lingui/macro";
import { SideNav, SideNavItems, SideNavLink } from "carbon-components-react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { ComponentType, useRef } from "react";
import { useOnClickOutside } from "usehooks-ts";

const SideNavElement: React.FC<{
  name: string;
  path: string;
  icon?: ComponentType<any>;
  onClick?: () => void;
}> = ({ name, path, icon, onClick }) => {
  const { pathname } = useRouter();
  const getAriaCurrent = (name: string) => pathname === name ? 'page' : undefined;

  return (
    <Link href={path} passHref>
      <SideNavLink renderIcon={icon} aria-current={getAriaCurrent(path)} onClick={onClick}>
        {name}
      </SideNavLink>
    </Link>
  );
};

const SideBar: React.FC<{
  open?: boolean;
  isRail?: boolean;
  onClose: () => void;
}> = ({ open, isRail, onClose }) => {
  const ref = useRef(null);

  useOnClickOutside(ref, onClose);

  return (
    <SideNav
      ref={ref}
      isRail={isRail}
      expanded={open}
      isPersistent={isRail === undefined ? false : undefined}
      onOverlayClick={onClose}
      aria-label={t`Side Navigation`}
      className='sideNav'
      style={{ backgroundColor: 'var(--cds-layer-01)', maxWidth: '14rem' }}
    >
      <SideNavItems>
        <SideNavElement
          name={t`Home`}
          path="/"
          icon={Home}
          onClick={onClose}
        />

        <SideNavElement
          name={t`Calendar`}
          path="/calendar"
          icon={Calendar}
          onClick={onClose}
        />

        <SideNavElement
          name={t`Tasks`}
          path="/tasks"
          icon={Task}
          onClick={onClose}
        />

        <SideNavElement
          name={t`Events`}
          path="/events"
          icon={Event}
          onClick={onClose}
        />

        <SideNavElement
          name={t`Courses`}
          path="/courses"
          icon={Course}
          onClick={onClose}
        />

        <SideNavElement
          name={t`Terms`}
          path="/terms"
          icon={Term}
          onClick={onClose}
        />
      </SideNavItems>
    </SideNav>
  );
};

export default SideBar;
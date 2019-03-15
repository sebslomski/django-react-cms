import React, {useState } from 'react';
import { CSSTransition } from 'react-transition-group';

import './InlineEditable.css';

const BACKEND_URL = 'http://localhost:4000';
const BACKEND_ADMIN_APP_NAME = 'cms';

const InlineEditable = ({
  children,
  id,
  modelName,
}) => {
  const [tooltipIsVisisble, setTooltipIsVisibile] = useState(false);
  const [adminPanelIsVisible, setAdminPanelIsVisible] = useState(false);
  const [{ x: tooltipX, y: tooltipY }, setTooltipCoordinates] = useState({ x: 1, y: 1, });

  return (
    <div
      className="InlineEditable"
      onMouseOver={e => {
        e.stopPropagation();
        setTooltipIsVisibile(true);
        setTooltipCoordinates({ x: e.clientX, y: e.clientY });
      }}
      onMouseOut={e => {
        setTooltipIsVisibile(false)
        e.stopPropagation();
      }}
      onMouseMove={e => {
        e.stopPropagation();
        setTooltipCoordinates({ x: e.clientX, y: e.clientY })
      }}
      onDoubleClick={() => {
        setAdminPanelIsVisible(true);
        setTooltipIsVisibile(false);
      }}
    >
      <div className={`InlineEditable__children-wrapper ${tooltipIsVisisble ? 'InlineEditable__children-wrapper--focused' : ''}`}>
        {children}
      </div>
      <CSSTransition
        in={adminPanelIsVisible}
        timeout={300}
        classNames="InlineEditable__admin-panel-"
        mountOnEnter
        unmountOnExit
      >
        <div className="InlineEditable__admin-panel">
          <iframe title="Admin Popup" src={`${BACKEND_URL}/admin/${BACKEND_ADMIN_APP_NAME}/${modelName}/${id}/change?_popup=1`} />
        </div>
      </CSSTransition>
      {(!adminPanelIsVisible && tooltipIsVisisble) && (
        <div
          className="InlineEditable__tooltip"
          style={{ top: tooltipY, left: tooltipX }}
        >
          Douple click do edit `{modelName}`
        </div>
      )}
    </div>
  );
};

export default InlineEditable;

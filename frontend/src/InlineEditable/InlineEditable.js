import React, {useState } from 'react';
import { CSSTransition } from 'react-transition-group';

import './InlineEditable.css';

const BACKEND_URL = 'http://localhost:7100';
const BACKEND_ADMIN_APP_NAME = 'cms';

const InlineEditable = ({
  children,
  id,
  modelName,
}) => {
  const [tooltipIsVisisble, setTooltipIsVisibile] = useState(false);
  const [adminPanelIsVisible, setAdminPanelIsVisible] = useState(false);
  const [{ x: tooltipX, y: tooltipY }, setTooltipCoordinates] = useState({ x: 1, y: 1, });

  const postMessageListener = ({ data }) => {
    if (data === 'closePopup') {
      setAdminPanelIsVisible(false);
      window.removeEventListener('message', postMessageListener);
    }
  };

  const closeAdminPanel = () => {
    setAdminPanelIsVisible(false);

    window.removeEventListener('message', postMessageListener);
  };

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
      onDoubleClick={e => {
        e.stopPropagation();
        setAdminPanelIsVisible(true);
        setTooltipIsVisibile(false);
        window.addEventListener('message', postMessageListener);
      }}
    >
      <div className={`InlineEditable__children-wrapper ${tooltipIsVisisble ? 'InlineEditable__children-wrapper--focused' : ''}`}>
        {children}
      </div>
      <CSSTransition
        in={adminPanelIsVisible}
        timeout={300}
        classNames="InlineEditable__overlay-"
        mountOnEnter
        unmountOnExit
      >
        <div
          className="InlineEditable__overlay"
          onClick={closeAdminPanel}
        />
      </CSSTransition>
      <CSSTransition
        in={adminPanelIsVisible}
        timeout={300}
        classNames="InlineEditable__admin-panel-"
        mountOnEnter
        unmountOnExit
      >
        <div className="InlineEditable__admin-panel">
          <div
            className="InlineEditable__admin-panel__close"
            onClick={closeAdminPanel}
          >
            ×
          </div>
          <iframe
            className="InlineEditable__admin-panel__iframe"
            title="Admin Popup"
            src={`${BACKEND_URL}/admin/${BACKEND_ADMIN_APP_NAME}/${modelName.toLowerCase()}/${id}/change?_popup=1`}
          />
        </div>
      </CSSTransition>
      {(!adminPanelIsVisible && tooltipIsVisisble) && (
        <div
          className="InlineEditable__tooltip"
          style={{ top: tooltipY, left: tooltipX }}
        >
          <div className="InlineEditable__tooltip__header">
          Douple click do edit
          </div>
          <div className="InlineEditable__tooltip__description">
            {modelName}
          </div>
        </div>
      )}
    </div>
  );
};

export default InlineEditable;

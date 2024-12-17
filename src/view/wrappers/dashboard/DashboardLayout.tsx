/* eslint-disable multiline-ternary */
/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import React, { useContext, useEffect, useState, useRef, Suspense } from 'react';
import { useLocation, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// import useWindowSize from '../../../hooks/useWindowSize';
// import ErrorBoundary from '../error-boundary/ErrorBoundary';
// import FallBackUiLoad from '../../components/fall-back-ui-load/fallbackUILoad';

import type { RootState } from '../../../state';
// import { RASContext } from '../../../context/Context';
import Sidebar from '../../components/sidebar/Sidebar';
import Header from '../../components/header/Header';
// import Header from '../../components/header/Header';
// import Modal from '../modal/Modal';
import './DashboardLayout.css';

const Dashboard = () => {
  const auth = useSelector((state: RootState) => state.auth);

  const mainRef = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();
  //   const { isMobile } = useWindowSize();
  const [shrink, setShrink] = useState(false);
  const [siderBarOpen, setSiderBarOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [headTag, setHeadTag] = useState('');
  const dispatch = useDispatch<any>();

  useEffect(() => {}, []);

  useEffect(() => {
    if (mainRef.current != null) {
      mainRef.current.scrollTo(0, 0);
    }
  }, [pathname]);

  useEffect(() => {}, []);

  return (
    <>
      {/* <ErrorBoundary> */}
      <div className='dashboard-wrapper card-bg-new' id='master-container'>
        <div className='display-f'>
          {/* for responsiveness */}
          {/* <Modal
              show={siderBarOpen}
              onClose={() => {
                setSiderBarOpen(false);
              }}
              from='left'
            >
              <div className='sidebar-content-modal'>
                <SidebarComponent setShowLogoutModal={setShowLogoutModal} showLogoutModal={showLogoutModal} removeShrink={true} closeModal={() => setSiderBarOpen(false)} setHeadTag={setHeadTag} />
              </div>
            </Modal> */}
          <div className={`sidebar-content border-r ${shrink ? 'shrink' : ''}`}>
            <Sidebar
              setShowLogoutModal={setShowLogoutModal}
              showLogoutModal={showLogoutModal}
              shrinked={shrink}
              setShrinked={setShrink}
              closeModal={() => setSiderBarOpen(false)}
              setHeadTag={setHeadTag}
            />
          </div>
          <div className='right'>
            <div className={`dashboard__header ${shrink ? 'expand' : ''}`}>
              <Header
                shrinked={shrink}
                setShrinked={setShrink}
                burgerClick={() => {
                  setSiderBarOpen(true);
                }}
                headTag={headTag}
              />
            </div>
            <div ref={mainRef} style={{ overflow: 'auto', height: '100vh' }} className={`main-content-wrapper card-bg-new ${shrink ? 'expand' : ''}`}>
              <Suspense fallback={<>Loading</>}>
                <Outlet />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
      {/* <Modal
          show={showLogoutModal}
          onClose={() => {
            setShowLogoutModal(false);
          }}
        >
          <LogoutModal
            open={showLogoutModal}
            close={() => {
              setShowLogoutModal(false);
            }}
          />
        </Modal> */}
      {/* <Copy /> */}
      {/* </ErrorBoundary> */}
    </>
  );
};
export default Dashboard;

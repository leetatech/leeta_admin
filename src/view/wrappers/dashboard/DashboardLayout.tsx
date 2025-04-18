import React, { useEffect, useState, useRef, Suspense } from 'react';
import { useLocation, Outlet } from 'react-router-dom';
import Sidebar from '../../components/sidebar/Sidebar';
import Header from '../../components/header/Header';
import './DashboardLayout.css';
import { triggerGetUserInfo } from '../../../features/auth/auth_slice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../state';

const Dashboard = () => {
  const dispatch: AppDispatch = useDispatch();
  const mainRef = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();
  const [shrink, setShrink] = useState(false);
  // Only the setter is needed for this case
  const [, setSiderBarOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [, setHeadTag] = useState('');

  useEffect(() => {
    if (mainRef.current != null) {
      mainRef.current.scrollTo(0, 0);
    }
  }, [pathname]);

  useEffect(() => {
    dispatch(triggerGetUserInfo());
  }, []);

  return (
    <>
      {/* <ErrorBoundary> */}
      <div className='dashboard-wrapper card-bg-new' id='master-container'>
        <div className='display-f'>
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
          <div>
            <div className={`dashboard__header ${shrink ? 'expand' : ''}`}>
              <Header
                shrinked={shrink}
                setShrinked={setShrink}
                burgerClick={() => {
                  setSiderBarOpen(true);
                }}
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
    </>
  );
};
export default Dashboard;

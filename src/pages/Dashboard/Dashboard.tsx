import React, { FC } from 'react';
import './Dashboard.scss';
import { Outlet } from 'react-router-dom';
import { SideNav } from '../../components/SideNav';
import { SchoolLogo } from '../../assets';
import { useNavigate } from 'react-router-dom';

interface DashboardProps {}

const Dashboard: FC<DashboardProps> = ({}: DashboardProps) => {
  const navigate = useNavigate();

  return (
    <div className="dashboard">
      <div className="side">
        <div>
          <img src={SchoolLogo} alt="School Logo" height={170} width={170} />
          <SideNav />
        </div>
        <div className="user">
          <p>John Eric Siguenza</p>
          <form
            method="POST"
            onSubmit={(e) => {
              e.preventDefault();

              navigate('/signin');
            }}
          >
            <input type="submit" value="Sign out" />
          </form>
        </div>
      </div>
      <main>
        <div className="top">
          <p>John Eric</p>
        </div>
        <div className="content">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;

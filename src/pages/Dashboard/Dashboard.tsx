import React, { FC, useEffect, useState } from 'react';
import './Dashboard.scss';
import { Outlet } from 'react-router-dom';
import { SideNav } from '../../components/SideNav';
import { SchoolLogo } from '../../assets';
import { useNavigate } from 'react-router-dom';
import { SubjectContext } from '../../context';

interface DashboardProps {}

interface Subject {
  subject_id: string;
  subject_name: string;
}

const Dashboard: FC<DashboardProps> = ({}: DashboardProps) => {
  const navigate = useNavigate();

  const [subjects, setSubjects] = useState<Subject[]>();
  const [selectedSubject, setSelectedSubject] = useState<string>('');

  useEffect(() => {
    fetch('http://localhost:4000/v1/teacher/1111111/subjects')
      .then((res) => res.json())
      .then((subjectList) => {
        setSubjects(subjectList.data);
        setSelectedSubject(subjectList.data[0].subject_id);
      })
      .catch(console.error);
  }, []);

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
          <select
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              setSelectedSubject(e.target.value);
              localStorage.setItem('selectedSubject', e.target.value);
            }}
            className="select"
          >
            {subjects &&
              subjects.map(({ subject_id, subject_name }, index) => (
                <option value={subject_id}>{subject_name}</option>
              ))}
          </select>

          <p>Students</p>
        </div>
        <div className="content">
          <SubjectContext.Provider value={selectedSubject}>
            <Outlet />
          </SubjectContext.Provider>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;

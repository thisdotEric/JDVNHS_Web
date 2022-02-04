import React, { FC, useEffect, useState, useContext } from 'react';
import './Students.scss';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import { columnDefs } from './table';
import { SubjectContext } from '../../context';

interface StudentsProps {}

function studentsReducer() {}

export interface IStudent {
  user_id: string;
  first_name: string;
  middle_name: string;
  gender: string;
  contact_number: string;
}

interface SubjectStats {
  totalStudents: number;
  maleCount: number;
  femaleCount: number;
  gradeLevel: number;
}

const Students: FC<StudentsProps> = ({}: StudentsProps) => {
  const [students, setStudents] = useState<IStudent[]>();

  const selectedSubject = useContext(SubjectContext);
  const [subjectStats, setSubjectStats] = useState<SubjectStats>();

  /**
   * Load data on load
   */
  useEffect(() => {
    fetch(`http://localhost:4000/v1/subject/${selectedSubject}/students`)
      .then((res) => res.json())
      .then((students) => {
        setStudents(students.data);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    fetch(`http://localhost:4000/v1/subject/${selectedSubject}/students`)
      .then((res) => res.json())
      .then((students) => {
        setStudents(students.data);

        setSubjectStats({
          femaleCount: students.data!.reduce((prev: number, curr: IStudent) => {
            return curr.gender === 'female' ? prev + 1 : prev + 0;
          }, 0),
          maleCount: students.data!.reduce((prev: number, curr: IStudent) => {
            return curr.gender === 'male' ? prev + 1 : prev + 0;
          }, 0),
          totalStudents: students.data!.length,
          gradeLevel: 10,
        });
      })
      .catch(console.error);

    console.log(selectedSubject);
  }, [selectedSubject]);

  useEffect(() => {
    console.log('Editing');
  }, [students, setStudents]);

  return (
    <div className="class-students">
      <div className="class-info">
        <p>Object Oriented Programming</p>
        <p>Total Number of Students: {subjectStats?.totalStudents}</p>
        <p>Number of Female: {subjectStats?.femaleCount}</p>
        <p>Number of Male: {subjectStats?.maleCount}</p>
        <p>Grade Level: {subjectStats?.gradeLevel}</p>
      </div>

      <div
        className="ag-theme-balham"
        id="student-table"
        style={{
          height: '550px',
        }}
      >
        <AgGridReact
          columnDefs={columnDefs}
          rowData={students}
          defaultColDef={{ flex: 1 }}
        ></AgGridReact>
      </div>
    </div>
  );
};

export default Students;

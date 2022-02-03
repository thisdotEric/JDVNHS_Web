import React, { FC } from 'react';
import './Students.scss';

interface StudentsProps {}

// fetch("http://localhost:4000/v1/subject/PreCal/students").then(res => res.json()).then(console.log)

const Students: FC<StudentsProps> = ({}: StudentsProps) => {
  return <p>Jooh</p>;
};

export default Students;

import React from 'react';
import Header from './Header';
import Content from './Content';
import Total from './TotalEx';
import MainHeader from './MainHeader';


const Course = ( {courses} ) => {
  return <div>
      <MainHeader title="Web development curriculum"/>
      {courses.map((item) => 
      <div key={item.id}>
      <Header title={item.name}/>
      <Content part={item.parts}/>
      <Total total={item.parts.reduce((sum, num) => sum + num.exercises, 0)}/>
      </div>
      )}
     
  </div>;
};

export default Course;

import React, { Component }  from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background: #36393e;
  display: flex;
  justify-content: center; // 1
  flex-flow: column wrap; // 2
  width: 100%;
  height: 100%;
`;
const List = styled.div`
  display: flex;
  justify-content: center; // 3
  flex-flow: row wrap; // 4
`;

const Card = styled.div`
  margin: 20px;
  background: #fff;
  height: 400px;
  width: 400px;
  border-radius: 20px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-flow: column; // 5 
  justify-content: center;
  align-items: center;
`;

function RecommendationsPage() {
  return (
    <Container> // 6
      <List>
        {/* {[0, 1, 2, 3, 5, 6, 7, 8, 9].map(item => <Card>{item}</Card>)} */}
        <Card></Card>
        <Card></Card>
        <Card></Card>
        <Card></Card>
        <Card></Card>
        <Card></Card>
        <Card></Card>
        <Card></Card>
        <Card></Card>
        <Card></Card>
        <Card></Card>
      </List>
    </Container>
  );
};

export default RecommendationsPage;
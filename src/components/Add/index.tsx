import { Link } from 'react-router-dom';
import { IoPersonAddOutline } from "react-icons/io5";
import styled from 'styled-components';

const AddWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 15px 0;
  margin-bottom: 15px;
  align-items: center;
`;

const Title = styled.h2`
  color: #fff;
  font-family: 'Arial', sans-serif;
  font-size: 30px;
  margin: 0;
`;

const Button = styled(Link)`
  background-color: #b83afe;
  padding: 10px 15px;
  color: #fff;
  border-radius: 6px;
  text-transform: capitalize;
  cursor: pointer;
  transition: all .2s ease-in-out;
  display: flex;
  align-items: center;
  font-family: 'Arial', sans-serif;
  font-size: 16px;
  text-decoration: none;

  &:hover {
    background-color: #994dc4;
  }

  span {
    margin-right: 10px;
  }
`;

export default function Add() {
    return (
      <AddWrapper>
        <Title>All Clients</Title>
        <Button to="/createClient">
          <IoPersonAddOutline size={20} />
          <span>Create client</span>
        </Button>
      </AddWrapper>
    );
}

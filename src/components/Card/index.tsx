import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { FaEye } from 'react-icons/fa';
import { RxUpdate } from 'react-icons/rx';
import { GoTrash } from 'react-icons/go';
import { CardProps } from '../../types/card';

type ActionIconProps = {
  size?: number;
};

const CardWrapper = styled.article`
  background: #212121;
  padding: 30px;
  border-radius: 6px;
  display: flex;
  margin-bottom: 15px;
  align-items: center;
  justify-content: space-between;
`;

const ActionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100px;
  background: #292929;
  padding: 15px;
  border-radius: 6px;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #2f2f2f;
  }
`;

const ActionIcon = styled.div<ActionIconProps>`
  color: #a0a0a0;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
`;

const ClientBox = styled.div`
  display: flex;
  align-items: center;
`;

const ClientInfo = styled.span`
  font-size: 18px;
  font-family: 'Arial', sans-serif;
  color: #a0a0a0;
  text-transform: capitalize;
`;


export default function Card({ client, onDeleteClient }: CardProps) {
  const navigate = useNavigate();

  return (
    <CardWrapper>
      <ClientBox>        
        <ClientInfo>{client.name}</ClientInfo>
      </ClientBox>
      <ActionContainer className="cardClient__action">
        <ActionIcon as={FaEye} onClick={() => navigate(`/client/${client.id}`)} data-testid="action-icon-eye" size={20} />
        <ActionIcon as={RxUpdate} onClick={() => navigate(`/updateClient/${client.id}`)} data-testid="action-icon-update" size={20} />
        <ActionIcon as={GoTrash} onClick={() => onDeleteClient(client.id)} data-testid="action-icon-trash" size={20} />
      </ActionContainer>
    </CardWrapper>
  );
}

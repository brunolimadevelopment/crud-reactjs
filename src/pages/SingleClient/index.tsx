import styled from 'styled-components';
import { useParams, Link } from 'react-router-dom';
import { MdOutlineArrowBack } from "react-icons/md";
import { useFetchClientById } from '../../hooks/clientHooks';


const SingleClientContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const CardClient = styled.article`
  background: #212121;
  padding: 30px;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CardClientColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const ClientInfo = styled.span`
  font-size: 18px;
  font-family: 'Arial', sans-serif;
  color: #fff;
  margin-bottom: 10px;

  strong {
    font-weight: bold;
    margin-right: 5px;
  }
`;

const LinkBack = styled(Link)`
  color: #fff;
  text-decoration: none;
  display: flex;
  align-items: center;
  margin-top: 15px;
  font-size: 16px;

  svg {
    margin-right: 5px;
  }

  &:hover {
    text-decoration: underline;
  }
`;

const LoadingMessage = styled.div`
  background: rgba(33, 33, 33, 0.8);
  color: #fff;
  padding: 30px;
  border-radius: 6px;
  margin: 20px auto;
  width: fit-content;
  animation: fadeIn 0.3s ease-in-out forwards;
  font-size: 18px;
  font-family: 'Arial', sans-serif;

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

const LinkStyled = styled(Link)`
  color: #fff;
  text-decoration: none;
  margin-top: 30px;
  font-family: 'Arial', sans-serif;
  display: flex;
  align-items: center;
`;

const WrapError = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export default function SingleClient() {
  
  const { id } = useParams<{ id: string | undefined }>();
  const { data: client, error, isLoading } = useFetchClientById(id!);

  if (isLoading) {
    return <LoadingMessage>Loading...</LoadingMessage>;
  }

  if (error || !client) {
    return (
      <WrapError>
        <LoadingMessage>Error: Failed to load client...</LoadingMessage>
        <LinkStyled to="/"><MdOutlineArrowBack /> Back</LinkStyled>
      </WrapError>
    );
  }

  return (
    <SingleClientContainer>
      <CardClient>
        <CardClientColumn>
          <ClientInfo><strong>Name:</strong> {client.name}</ClientInfo>
          <ClientInfo><strong>E-mail:</strong> {client.email}</ClientInfo>
          <ClientInfo><strong>About:</strong> {client.about}</ClientInfo>
        </CardClientColumn>
      </CardClient>
      <LinkBack to="/"><MdOutlineArrowBack /> Back</LinkBack>
    </SingleClientContainer>
  );
}

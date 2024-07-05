import Card from '../../components/Card'
import Add from "../../components/Add";
import Message from '../../components/Message';
import { Client } from '../../types/client';
import styled from 'styled-components';
import { useFetchClients, useDeleteClient } from '../../hooks/clientHooks';

const AppContainer = styled.div`
  overflow: hidden;
`;

export default function Feed() {

  const { data: clients, isError, isLoading } = useFetchClients();
  const { mutation: deleteClientMutation, error: deleteError } = useDeleteClient();

  const handleDeleteClient = (clientId: string) => {
    deleteClientMutation.mutate(clientId);
  };

  if(isLoading) {
    return <Message message="Carregando..." />
  }

  return (
    <>
      <Add />
      {isError && <Message message={'Error try again!'} type="error" />}
      {deleteError && <Message message={deleteError} type="error" />}
      <AppContainer>        
        {
          clients?.map((client: Client) => (
            <Card key={client.id} client={client} onDeleteClient={() => handleDeleteClient(client.id!)} />
          ))
        }
      </AppContainer>
    </>
  );
}
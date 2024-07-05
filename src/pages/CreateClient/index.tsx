import { useCreateClient } from '../../hooks/clientHooks';
import ClientForm from '../../components/Form';
import Message from '../../components/Message';
import AppContainerCenter from '../../components/AppContainerCenter';
import { Client } from '../../types/client';

function CreateClient() {
  const { mutation: createClientMutation, success, error } = useCreateClient();

  const handleCreateClient = async (data: Client) => {
    try {
      await createClientMutation.mutateAsync(data); 
    } catch (error) {
      console.error('Failed to create client:', error);
    }
  };

  return (
    <>
      <AppContainerCenter>
        {success &&  <Message message={success} type="success" />}
        {error && <Message message={error} type="error" />}
        <ClientForm title={'Create a Client'} textButton={'Save'} onAction={handleCreateClient} />
      </AppContainerCenter>
    </>
  );
}

export default CreateClient;
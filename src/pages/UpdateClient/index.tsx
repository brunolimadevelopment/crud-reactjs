import { useParams } from 'react-router-dom';
import ClientForm from '../../components/Form';
import Message from '../../components/Message';
import AppContainerCenter from '../../components/AppContainerCenter';
import { useUpdateClient } from '../../hooks/clientHooks';
import { Client } from '../../types/client';

function UpdateClient() {
  const { id } = useParams<{ id: string | undefined }>();
  const { mutation: updateClientMutation, success, error } = useUpdateClient(id!);

  const handleUpdatePost = (data: Client) => {
    updateClientMutation.mutate(data);
  };

  return (
    <AppContainerCenter>
      {success &&  <Message message={success} type="success" />}
      {error && <Message message={error} type="error" />}
      <ClientForm title={'Editar publicação'} textButton={'Editar'} onAction={handleUpdatePost} />
    </AppContainerCenter>
  );
}

export default UpdateClient;

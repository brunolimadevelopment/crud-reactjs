import styled from 'styled-components';
import { MessageProps } from '../../types/message';

const MessageWrapper = styled.div<{ $messageType: 'success' | 'error' }>`
  background-color: ${(props) => (props.$messageType === 'success' ? '#d4edda' : '#f8d7da')};
  color: ${(props) => (props.$messageType === 'success' ? '#155724' : '#721c24')};
  padding: 0 37px;
  border-radius: 4px;
  border: 1px solid ${(props) => (props.$messageType === 'success' ? '#c3e6cb' : '#f5c6cb')};
  margin: 30px 0;
  text-align: center;
  font-size: 16px;
  font-family: 'Arial', sans-serif;
  animation: fadeIn 0.3s ease-in-out forwards;
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

export default function Message({ message, type = 'success' }: MessageProps) {
  return (
    <MessageWrapper $messageType={type}>
      <p>{message}</p>
    </MessageWrapper>
  );
}

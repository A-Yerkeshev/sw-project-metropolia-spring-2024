import { useSearchParams } from 'react-router-dom';
import QRCode from "react-qr-code";

const QR = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  let baseUrl;
  if (process.env.NODE_ENV === 'development') {
    baseUrl = process.env.REACT_APP_IP_ADDRESS;
  } else {
    baseUrl = window.location.origin;
  }

  const sessionId = searchParams.get('sid');
  const feedbackUrl = baseUrl + 'feedback/new?sid=' + sessionId;

  return <>
          <QRCode value={feedbackUrl} />
          <span>{feedbackUrl}</span>
        </>
}

export default QR;
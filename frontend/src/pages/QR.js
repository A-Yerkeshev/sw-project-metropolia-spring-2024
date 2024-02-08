import { useSearchParams } from 'react-router-dom';
import QRCode from "react-qr-code";

const QR = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sessionId = searchParams.get('sid');
  const feedbackUrl = window.location.origin + '/feedback/new?sid=' + sessionId;

  return <>
          <QRCode value={feedbackUrl} />
          <span>{feedbackUrl}</span>
        </>
}

export default QR;
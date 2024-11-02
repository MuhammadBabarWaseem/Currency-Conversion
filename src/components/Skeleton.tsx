import { Card, Container } from 'react-bootstrap';
import Skeleton from 'react-loading-skeleton';

const LoadingSkeleton = () => {
  return (
    <Container className="py-5">
      <Card className="glass-card">
        <Card.Body>
          <Skeleton
            height={40}
            count={3}
            className="mb-3"
            baseColor="#1e293b"
            highlightColor="#334155"
          />
        </Card.Body>
      </Card>
    </Container>
  );
};

export default LoadingSkeleton;

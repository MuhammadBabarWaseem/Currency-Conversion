import { ArrowRight, Clock } from 'lucide-react';
import React from 'react';
import { Card, Table } from 'react-bootstrap';

import { ConversionHistoryProps } from '../types';

const ConversionHistory: React.FC<ConversionHistoryProps> = ({ history }) => {
  if (history.length === 0) return null;

  return (
    <Card className="mt-4 history-card border-0">
      <Card.Body className="p-4">
        <div className="d-flex align-items-center mb-4">
          <Clock size={20} className="me-2 text-indigo-400" />
          <h3 className="mb-0 gradient-text font-bold">Recent Conversions</h3>
        </div>
        <div className="table-responsive">
          <Table hover className="history-table">
            <thead>
              <tr>
                <th>Date & Time</th>
                <th>Conversion</th>
                <th>Rate</th>
              </tr>
            </thead>
            <tbody>
              {history.map((conversion) => (
                <tr key={conversion.id}>
                  <td className="text-gray-400">
                    {new Date(conversion.timestamp).toLocaleString()}
                  </td>
                  <td>
                    <div className="d-flex align-items-center">
                      <span className="currency-amount font-medium">
                        {conversion.amount.toFixed(2)} {conversion.from}
                      </span>
                      <ArrowRight size={16} className="mx-2 text-gray-400" />
                      <span className="currency-amount font-medium text-indigo-400">
                        {conversion.result.toFixed(2)} {conversion.to}
                      </span>
                    </div>
                  </td>
                  <td className="text-gray-400">
                    1 {conversion.from} = {conversion.rate.toFixed(4)}{" "}
                    {conversion.to}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ConversionHistory;

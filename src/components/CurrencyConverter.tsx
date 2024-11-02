import { ArrowRightLeft, RefreshCw, Wallet } from "lucide-react";
import React, { useContext, useState } from "react";
import { Button, Card, Container, Form, Spinner } from "react-bootstrap";

import API_URLS from "../config";
import { ConversionContext } from "../context/ConversionContext";
import useFetchCurrencies from "../hook/useFetchCurrencies";
import { convertCurrency } from "../utils/api";
import ConversionHistory from "./ConversionHistory";
import LoadingSkeleton from "./Skeleton";

const CurrencyConverter: React.FC = () => {
  const { history, setHistory } = useContext(ConversionContext)!;
  const { data: fetchedCurrencies, loading: fetchingCurrencies } =
    useFetchCurrencies();

  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("EUR");
  const [amount, setAmount] = useState("1");
  const [loading, setLoading] = useState(false);

  if (fetchingCurrencies) {
    return <LoadingSkeleton />;
  }

  const handleSwapCurrencies = () => {
    setFrom(to);
    setTo(from);
  };

  const handleConvert = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = await convertCurrency(API_URLS.CONVERT, {
        from,
        to,
        amount: parseFloat(amount),
      });

      const conversion = {
        id: crypto.randomUUID(),
        from,
        to,
        amount: parseFloat(amount),
        result: data.result,
        rate: data.rate,
        timestamp: new Date().toISOString(),
      };

      setHistory((prev) => [conversion, ...prev].slice(0, 10));
    } catch (error) {
      console.error("Conversion failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-5">
      <Card className="glass-card border-0">
        <Card.Body className="p-4 p-sm-5">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-gradient-to-r from-indigo-500 to-pink-500">
              <Wallet size={32} className="text-white" />
            </div>
            <h2 className="text-3xl font-bold mb-2 gradient-text">
              Currency Exchange
            </h2>
            <p className="text-gray-400">Real-time currency conversion</p>
          </div>

          <Form onSubmit={handleConvert}>
            <Form.Group className="mb-4">
              <Form.Label className="text-gray-400 text-sm font-medium mb-2">
                Amount
              </Form.Label>
              <div className="input-group">
                <Form.Control
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  min="0"
                  step="any"
                  required
                  className="currency-amount"
                  placeholder="Enter amount"
                />
              </div>
            </Form.Group>

            <div className="sm:grid grid-cols-1 sm:grid-cols-5 gap-4 mb-4">
              <div className="sm:col-span-2">
                <Form.Group>
                  <Form.Label className="text-gray-400 text-sm font-medium mb-2">
                    From
                  </Form.Label>
                  <div className="input-group">
                    <Form.Select
                      value={from}
                      onChange={(e) => setFrom(e.target.value)}
                    >
                      {Object.entries(fetchedCurrencies).map(
                        ([code, currency]) => (
                          <option key={code} value={code}>
                            {code} - {currency.name}
                          </option>
                        )
                      )}
                    </Form.Select>
                  </div>
                </Form.Group>
              </div>

              <div className="flex md:items-end items-center justify-center mt-3">
                <Button
                  variant="link"
                  className="btn-icon rounded-full p-3"
                  onClick={handleSwapCurrencies}
                >
                  <ArrowRightLeft size={20} className="text-gray-400 mt-1" />
                </Button>
              </div>

              <div className="sm:col-span-2">
                <Form.Group>
                  <Form.Label className="text-gray-400 text-sm font-medium mb-2">
                    To
                  </Form.Label>
                  <div className="input-group">
                    <Form.Select
                      value={to}
                      onChange={(e) => setTo(e.target.value)}
                    >
                      {Object.entries(fetchedCurrencies).map(
                        ([code, currency]) => (
                          <option key={code} value={code}>
                            {code} - {currency.name}
                          </option>
                        )
                      )}
                    </Form.Select>
                  </div>
                </Form.Group>
              </div>
            </div>

            <Button
              variant="primary"
              type="submit"
              className="w-full flex items-center justify-center"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    className="me-2"
                  />
                  Converting...
                </>
              ) : (
                <>
                  <RefreshCw className="inline-block mr-2" size={18} />
                  Convert Now
                </>
              )}
            </Button>
          </Form>
        </Card.Body>
      </Card>

      <ConversionHistory history={history} currencies={fetchedCurrencies} />
    </Container>
  );
};

export default CurrencyConverter;

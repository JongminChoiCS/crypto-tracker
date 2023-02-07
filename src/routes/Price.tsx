import { useQuery } from "react-query";
import styled from "styled-components";
import { fetchCoinTickers } from "../api";
import { PriceData } from "./Coin";

const Container = styled.div`
  max-width: 480px;
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  height: 300px;
  justify-items: center;
  align-items: center;
`;

const Content = styled.div`
  width: 180px;
  height: 120px;
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  span:first-child {
    font-size: 15px;
    font-weight: 600;
    color: lightgray;
  }
  span:last-child {
    font-size: 33px;
    font-weight: 400;
  }
`;

interface PriceProps {
  coinId: string;
}

function Price({ coinId }: PriceProps) {
  const { isLoading, data: tickersData } = useQuery<PriceData>(
    ["tickers", coinId],
    () => fetchCoinTickers(coinId),
    {
      refetchInterval: 5000,
    }
  );
  return (
    <h1>
      {isLoading ? (
        "Loading price..."
      ) : (
        <Container>
          <Content>
            <span>Before 1 hour</span>
            <span
              style={
                tickersData && tickersData.quotes.USD.percent_change_1h > 0
                  ? { color: "red" }
                  : { color: "blue" }
              }
            >
              {tickersData?.quotes.USD.percent_change_1h} %
            </span>
          </Content>
          <Content>
            <span>Before 12 hours</span>
            <span
              style={
                tickersData && tickersData.quotes.USD.percent_change_12h >= 0
                  ? { color: "red" }
                  : { color: "blue" }
              }
            >
              {tickersData?.quotes.USD.percent_change_12h} %
            </span>
          </Content>
          <Content>
            <span>Before 24 hours</span>
            <span
              style={
                tickersData && tickersData.quotes.USD.percent_change_24h > 0
                  ? { color: "red" }
                  : { color: "blue" }
              }
            >
              {tickersData?.quotes.USD.percent_change_24h} %
            </span>
          </Content>
          <Content>
            <span>Before 7 days</span>
            <span
              style={
                tickersData && tickersData.quotes.USD.percent_change_7d > 0
                  ? { color: "red" }
                  : { color: "blue" }
              }
            >
              {tickersData?.quotes.USD.percent_change_7d} %
            </span>
          </Content>
        </Container>
      )}
    </h1>
  );
}

export default Price;

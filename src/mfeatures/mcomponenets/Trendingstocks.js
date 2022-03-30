// import { useState, useEffect } from 'react';
// import { authHeader, handleResponse } from '../HomePage/HomePage';

// import { TrendingDetails } from '../TrendingDetails/TrendingDetails';
// export function TrendingStocks({ region }) {
//   const [quotes, setQuotes] = useState(null);
//   const [symbols, setSymbols] = useState(null);
//   useEffect(() => {
//     async function getTrendingStocks() {
//       try {
//         const trendingStocks = await fetch(
//           `https://yfapi.net/v1/finance/trending/${region}`,
//           authHeader
//         ).then((res) => handleResponse(res));
//         setQuotes(trendingStocks.finance.result[0].quotes);
//       } catch (error) {
//         console.log(error);
//       }
//     }
//     // getTrendingStocks();
//   }, [region]);

//   useEffect(() => {
//     if (quotes) {
//       const stockSymbols = [];
//       for (let i = 0; i < quotes.length; i += 10) {
//         const arrTemp = [];
//         let test = quotes.slice(i, i + 10);
//         for (const obj of test) {
//           arrTemp.push(obj.symbol);
//         }
//         stockSymbols.push(arrTemp);
//       }
//       setSymbols(stockSymbols);
//     }
//   }, [quotes]);
//   console.log(quotes);
//   if (!quotes) {
//     return <p>Loading... form quotes</p>;
//   }
//   return (
//     <>
//       <TrendingDetails symbols={symbols} region={region} />
//     </>
//   );
// }

// import { useState, useEffect } from 'react';
// import { useParams } from 'react-router';
// // import { authHeader, handleResponse } from '../HomePage/HomePage';
// import styles from '../../mcss/Trending.module.css';

// export function Details() {
//   const [stockDetails, setStockDetails] = useState(null);
//   const { symbol } = useParams();

//   useEffect(() => {
//     async function getDetailsClicked() {
//       const filteredData = [];
//       const dataDetails = await fetch(
//         `https://yfapi.net/v11/finance/quoteSummary/${symbol}?lang=en&region=US&modules=summaryDetail,assetProfile,fundProfile,price`,
//         authHeader
//       ).then((res) => handleResponse(res));
//       const result = dataDetails.quoteSummary.result;
//       for (const data of result) {
//         filteredData.push({
//           name: data.assetProfile.name,
//           startDate: data.assetProfile.startDate,
//           description: data.assetProfile.description,
//           previousClose: data.summaryDetail.previousClose,
//           open: data.summaryDetail.open,
//           dayLow: data.summaryDetail.dayLow,
//           dayHigh: data.summaryDetail.dayHigh,
//           fiftyTwoWeekLow: data.summaryDetail.fiftyTwoWeekLow,
//           fiftyTwoWeekHigh: data.summaryDetail.fiftyTwoWeekHigh,
//         });
//       }

//       setStockDetails(filteredData);
//     }
//     // getDetailsClicked();
//   }, [symbol]);

//   if (!stockDetails) {
//     return <p>Loading...</p>;
//   }
//   const evolutionHigh = stockDetails.dayHigh > stockDetails.open ? '+' : '-';
//   const evolutionLow = stockDetails.dayLow > stockDetails.open ? '+' : '-';

//   console.log(stockDetails);

//   return (
//     <div className={styles.details_container} key={stockDetails.name}>
//       <p>{stockDetails.name}</p>
//       <p>{stockDetails.startDate}</p>
//       <p>`Open: ${stockDetails.open}`</p>
//       <p>`Previous close: ${stockDetails.previousClose} `</p>
//       <div className={styles.prices}>
//         <p className="bg-red-500">
//           Day high{stockDetails.dayHigh}
//           {evolutionHigh}
//         </p>
//         <p className="bg-green-500">
//           Day low{stockDetails.dayLow}
//           {evolutionLow}
//         </p>
//         <p>
//           History 52 weeks{' '}
//           <span className="bg-red-500">
//             low: {stockDetails.fiftyTwoWeekLow}
//           </span>
//           <span className="bg-green-500">
//             high: {stockDetails.fiftyTwoWeekLow}
//           </span>
//         </p>
//       </div>

//       <p>{stockDetails.description}</p>
//     </div>
//   );
// }

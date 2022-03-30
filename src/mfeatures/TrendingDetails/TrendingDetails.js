// import { useState, useEffect } from 'react';
// // import { authHeader, handleResponse } from '../HomePage/HomePage';
// import styles from '../../mcss/Trending.module.css';
// import { CustomLink } from '../mcomponenets/CustomLink';

// export function TrendingDetails({ symbols, region }) {
//   const [trendingData, setTrendingData] = useState(null);
//   const [errorServer, setError] = useState('');

//   useEffect(() => {
//     async function getDetails() {
//       const fetchedDetails = [];

//       for (const interval of symbols) {
//         console.log(interval);
//         try {
//           const detailsQuote = await fetch(
//             `https://yfapi.net/v6/finance/quote?region=${region}&lang=en&symbols=${interval.toString()}`,
//             authHeader
//           ).then((res) => handleResponse(res));
//           console.log(detailsQuote);
//           fetchedDetails.push(detailsQuote);
//         } catch (error) {
//           console.log(error);
//           setError('An  error has occured');
//         }
//       }
//       const temp = fetchedDetails.map((elem) => elem.quoteResponse.result);
//       const detailsQuoteTemp = [];
//       for (const data of temp) {
//         detailsQuoteTemp.push(...data);
//       }
//       //   setTrendingData(detailsQuoteTemp);
//     }

//     // async function getDetails2() {
//     //   const details = await fetch(
//     //     `https://yfapi.net/v6/finance/quote?region=${region}&lang=en&symbols=${}`
//     //   ).then((res) => res.json());
//     //   setTrendingData(details);
//     // }

//     // getDetails();
//   }, [symbols, region]);

//   if (!trendingData) {
//     return <p>Loading </p>;
//   }

//   const renderQuotedetails = trendingData.map((elem) => (
//     <CustomLink
//       to={`/details/${elem.symbol}`}
//       className={styles.trendingContainer}
//       key={elem.symbol}
//     >
//       <article className={styles.details_stock}>
//         {elem.coinImageUrl ? (
//           <img src={elem.coinImageUrl} alt={`${elem.symbol}`} />
//         ) : (
//           <i className="gg-align-bottom"></i>
//         )}
//         <p>{elem.shortName}</p>
//         <p>{elem.regularMarketPrice}</p>
//         <p>{`History: ${elem.fiftyTwoWeekRange}`}</p>
//       </article>
//     </CustomLink>
//   ));

//   return (
//     <div className={styles.trendingContainer}>
//       {errorServer && <p>{errorServer}</p>}
//       {renderQuotedetails}
//     </div>
//   );
// }

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
export const StocksCurrent = ({ keye, Id }) => {
  return (
    <div>
      <p>{keye}</p>
      <p>{Id}</p>
    </div>
  );
};

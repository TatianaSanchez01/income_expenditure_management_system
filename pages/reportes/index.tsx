import Reportes from '@/components/features/Reportes';
import React, { useState } from 'react';

const Index = () => {
  const [amount, setAmount] = useState(0);
  return (
    <div>
      <Reportes />
    </div>
  );
};
export default Index;

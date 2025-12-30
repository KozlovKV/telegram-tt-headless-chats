import { useEffect, useLayoutEffect, useState } from '../../lib/teact/teact';

const TestCleanupOrder = () => {
  const [, setRand] = useState(Math.random());

  useEffect(() => {
     
    console.log('effect 1');

    setTimeout(() => {
      setRand(Math.random());
    }, 3000);

    return () => {
       
      console.log('cleanup 1');
    };
  });

  useEffect(() => {
     
    console.log('effect 2');

    return () => {
       
      console.log('cleanup 2');
    };
  });

  useLayoutEffect(() => {
     
    console.log('layout effect 1');

    return () => {
       
      console.log('layout cleanup 1');
    };
  });

  useLayoutEffect(() => {
     
    console.log('layout effect 2');

    return () => {
       
      console.log('layout cleanup 2');
    };
  });

  return <div>Test</div>;
};

export default TestCleanupOrder;

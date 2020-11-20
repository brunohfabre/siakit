import React, { useRef, useState, useEffect, useCallback } from 'react';

import Spin from '../Spin';

interface Props {
  dataLength: number;
  dataCount: number;
  loading: boolean;
  next(page: number): void;
}

const InfiniteScroll: React.FC<Props> = ({
  children,
  dataLength,
  loading,
  next,
}) => {
  const scrollObserve = useRef<HTMLDivElement>(null);

  const [initialPage, setInitialPage] = useState(1);

  const [scrollRatio, setScrollRatio] = useState(0);
  const [prevDataLength, setPrevDataLangth] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const intersectionObserver = new IntersectionObserver((entries) => {
    const ratio = entries[0].intersectionRatio;

    setScrollRatio(ratio);
  });

  useEffect(() => {
    if (scrollObserve.current) {
      intersectionObserver.observe(scrollObserve.current);
    }

    return () => {
      intersectionObserver.disconnect();
    };
  }, []);

  const handleNext = useCallback(() => {
    if (!loading && scrollRatio > 0) {
      setPrevDataLangth(dataLength);
      next(initialPage);

      setInitialPage(initialPage + 1);
    }
  }, [dataLength, loading, scrollRatio, next, initialPage]);

  useEffect(() => {
    if (!loading && scrollRatio > 0) {
      handleNext();
    }
  }, [loading, scrollRatio, handleNext, isRunning]);

  return (
    <>
      {children}

      {loading && <Spin />}

      <div ref={scrollObserve} style={{ height: 16 }} />
    </>
  );
};

export default InfiniteScroll;

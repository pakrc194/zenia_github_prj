import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

export const useVisitorId = () => {
  const [visitorId, setVisitorId] = useState("" as string);

  useEffect(() => {
    // 1. LocalStorage에서 기존 ID가 있는지 확인
    const savedId = localStorage.getItem('visitor_id');

    if (savedId) {
      setVisitorId(savedId);
    } else {
      // 2. 없으면 새로 생성 후 저장
      const newId = uuidv4();
      localStorage.setItem('visitor_id', newId);
      setVisitorId(newId);
    }
  }, []);

  return visitorId;
};
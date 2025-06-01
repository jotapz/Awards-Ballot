import { useState } from 'react';

export function useCategoryNavigation(categories) {
  const [index, setIndex] = useState(0);

  const next = () => {
    if (index < categories.length - 1) {
      setIndex((prev) => prev + 1);
    }
  };

  const prev = () => {
    if (index > 0) {
      setIndex((prev) => prev - 1);
    }
  };

  return {
    index,
    category: categories[index],
    next,
    prev,
  };
}

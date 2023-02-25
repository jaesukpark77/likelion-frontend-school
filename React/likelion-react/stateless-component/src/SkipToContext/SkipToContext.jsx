import { useEffect, useRef } from 'react';
import { A11yHidden } from '@/components';

export function SkipToContent({ to, ...restProps }) {
  const skipToContentRef = useRef(null); // { current: null }

  let targetElement = null;

  // side effect 적용 가능
  useEffect(() => {
    targetElement = document.querySelector(to); // null

    if (targetElement) {
      targetElement.setAttribute('tabindex', -1);

      skipToContentRef.current.addEventListener('click', (e) => {
        e.preventDefault();
        targetElement && targetElement.focus();
      });
    }
  }, []);

  // React 요소 ({ref, props, type}) -> ReactDOM 렌더링 -> 실제 DOM
  return (
    <A11yHidden
      ref={skipToContentRef}
      as="a"
      focusable
      href={to}
      {...restProps}
    />
  );
}

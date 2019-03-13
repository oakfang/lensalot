import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useCallback,
  useEffect,
} from 'react';
import get from 'lodash.get';
import set from 'lodash.set';
import produce from 'immer';

import freeze from './freeze';

const LensContext = createContext();

export function LensProvider({ state, children, effects = [] }) {
  const stateRef = useRef(state);
  const listenersMapRef = useRef({});
  useEffect(() => {
    listenersMapRef.current[''] = new Set(effects);
  }, [effects]);
  const getLensValue = useCallback(
    lens => freeze(get(stateRef.current, lens)),
    []
  );
  const listenToLens = useCallback((lens, cb) => {
    if (!listenersMapRef.current[lens]) {
      listenersMapRef.current[lens] = new Set();
    }
    const listeners = listenersMapRef.current[lens];
    listeners.add(cb);
    return () => {
      listeners.delete(cb);
      if (!listeners.size) {
        delete listenersMapRef.current[lens];
      }
    };
  }, []);
  const notifyLens = useCallback(lens => {
    const frags = lens.split('.');
    let current;
    let val;
    do {
      const frag = frags.shift();
      current = current ? current + '.' + frag : frag;
      val = val === undefined ? getLensValue(current) : val[frag];
      const listeners = listenersMapRef.current[current];
      if (listeners) {
        for (let cb of listeners) {
          cb(val);
        }
      }
    } while (frags.length);
    const listeners = listenersMapRef.current[''];
    if (listeners) {
      const val = freeze(stateRef.current);
      for (let cb of listeners) {
        cb(val);
      }
    }
  }, []);
  const setLens = useCallback((lens, value) => {
    stateRef.current = produce(stateRef.current, draft => {
      set(draft, lens, value);
    });
    notifyLens(lens);
  }, []);
  return (
    <LensContext.Provider value={{ getLensValue, listenToLens, setLens }}>
      {children}
    </LensContext.Provider>
  );
}

export function useLens(lens) {
  const { getLensValue, listenToLens, setLens } = useContext(LensContext);
  if (!(getLensValue && listenToLens && setLens)) {
    throw new Error();
  }
  const [state, setState] = useState(getLensValue(lens));
  useEffect(() => listenToLens(lens, setState), [lens]);
  const setValue = useCallback(value => setLens(lens, value), [lens]);
  return [state, setValue];
}

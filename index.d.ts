import React from 'react';
declare type Effect<State> = (state: State) => void;
interface LensProviderProps<State> {
  state: State;
  children: React.ReactNode;
  effects?: Array<Effect<State>>;
}
declare function LensProvider<State>({
  state,
  children,
  effects,
}: LensProviderProps<State>): JSX.Element;
export declare function useLens<T = any>(
  lens: string
): (T | ((value: any) => void))[];
export {};

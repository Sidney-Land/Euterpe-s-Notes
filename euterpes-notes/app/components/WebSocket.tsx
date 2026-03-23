"use client";

import { createContext, useContext, useEffect, useRef } from "react";

const WsContext = createContext<WebSocket | null>(null);

export function WebSocketProvider({ children }: { children: React.ReactNode }) {
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (!wsRef.current) {
      wsRef.current = new WebSocket("ws://"); // TODO: Add Server's URL
    }
    return () => {
      wsRef.current?.close();
      wsRef.current = null;
    };
  }, []);

  return (
    <WsContext.Provider value={wsRef.current}>
      {children}
    </WsContext.Provider>
  );
}

export const useWebSocket = () => useContext(WsContext);
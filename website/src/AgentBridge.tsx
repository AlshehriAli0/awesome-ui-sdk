'use client';

import { useEffect } from 'react';
import { createAgent, registerTools } from '@ui-sdk/react/agent';

export function AgentBridge() {
  useEffect(() => {
    const agent = createAgent();
    Object.assign(window, { agent });
    return registerTools(agent, { allow: (step) => !step.confirm });
  }, []);

  return null;
}

// Copyright (c) ZeroC, Inc. All rights reserved.

import * as React from 'react';

export function Hero() {
  return (
    <div className="hero">
      <div className="hero-content">
        <h1>
          The best way to <span>network</span> your software
        </h1>
        <p>TODO</p>
      </div>
      <style jsx>{`
        .hero {
          text-align: center;
        }

        .hero h1 {
          font-size: 100px;
          font-weight: 700;
          line-height: 1.2;
          margin-bottom: 0.5rem;
          // font space
          letter-spacing: -0.04em;
        }

        .hero span {
          background: rgb(23, 53, 166);
          background: linear-gradient(
            33deg,
            rgba(23, 53, 166, 1) 0%,
            rgba(0, 212, 255, 1) 100%
          );
          -webkit-background-clip: text;
          -moz-background-clip: text;
          -webkit-text-fill-color: transparent;
          -moz-text-fill-color: transparent;
        }
        .hero-content {
        }
      `}</style>
    </div>
  );
}

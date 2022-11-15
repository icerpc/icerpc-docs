// Copyright (c) ZeroC, Inc. All rights reserved.

import { MdThumbDownOffAlt, MdThumbUpOffAlt } from 'react-icons/md';

export function Feedback() {
  return (
    <div className="feedback-container">
      <h4>Was this page helpful?</h4>
      <div className="feedback-buttons-container">
        {/* TODO: Add click functionality to the feedback buttons */}
        <button>
          <MdThumbDownOffAlt />
        </button>
        <button>
          <MdThumbUpOffAlt />
        </button>
      </div>
      <style jsx>
        {`
          button {
            background: none;
            border: none;
            cursor: pointer;
            font-size: 2rem;
          }

          button:hover {
            color: var(--primary-color);
          }

          .feedback-container {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding-bottom: 1rem;
          }

          .feedback-buttons-container {
            display: flex;
            flex-direction: row;
            justify-content: center;
            gap: 2rem;
            align-items: center;
            font-size: 32px;
          }
        `}
      </style>
    </div>
  );
}

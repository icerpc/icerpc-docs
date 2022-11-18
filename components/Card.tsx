// Copyright (c) ZeroC, Inc. All rights reserved.

import { IconContext } from 'react-icons';
import { BsBox } from 'react-icons/bs';

export default function Card({ title, description }) {
  return (
    <div className="card">
      {/* <IconContext.Provider
        value={{ color: 'var(--primary-color)', size: '1.5em' }}
      >
        <div style={{ padding: '1rem 0' }}>
          <BsBox />
        </div>
      </IconContext.Provider> */}
      <h3>{title}</h3>
      <p>{description}</p>
      <div className="shine"></div>
      <style jsx>
        {`
          h3 {
            margin: 5px 0;
          }

          p {
            margin: 0;
          }

          .card {
            display: flex;
            flex-direction: column;
            padding: 18px;
            border: 1px solid #dce6e9;
            border-radius: 5px;
            transition: box-shadow 0.2s ease-in-out;
          }

          .card:hover {
            transform: scale(1.01);
            box-shadow: 0 5px 25px rgba(0, 0, 0, 0.1);
          }
        `}
      </style>
    </div>
  );
}

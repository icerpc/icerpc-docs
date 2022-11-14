// Copyright (c) ZeroC, Inc. All rights reserved.

export function HorizontalDivider() {
  return (
    <div className="horizontal-divider">
      <style jsx>
        {`
          .horizontal-divider {
            height: 1px;
            background: var(--border-color);
            margin-top: 2rem;
            margin-bottom: 2rem;
          }
        `}
      </style>
    </div>
  );
}

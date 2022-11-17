export function List({ children, ordered }) {
  if (ordered) {
    return (
      <ol>
        {children}
        <style jsx>
          {`
            ol {
              margin: 0;
              padding: 0;
              list-style: none;
            }
          `}
        </style>
      </ol>
    );
  } else {
    return (
      <ul>
        {children}
        <style jsx>
          {`
            ul {
              margin: 0;
              list-style-type: '- ';
              display: flex;
              flex-direction: column;
              gap: 1rem;
            }
          `}
        </style>
      </ul>
    );
  }
}

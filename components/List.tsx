// Copyright (c) ZeroC, Inc. All rights reserved.

export function List({ children, ordered }) {
  if (ordered) {
    return <ol className="m-0 list-none p-0">{children}</ol>;
  } else {
    return <ul className="m-0 flex list-[-] flex-col gap-4">{children}</ul>;
  }
}

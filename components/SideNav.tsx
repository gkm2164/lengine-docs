import React from 'react';
import {useRouter} from 'next/router';
import Link from 'next/link';
// import * as items from './navs.json';

const items = [{"title":"Home","link":{"href":"/"},"links":[]},{"title":"Introduction","links":[{"href":"/introduction/purpose","children":"Purpose of the language"},{"href":"/introduction/key-features","children":"Key features and design goals"},{"href":"/introduction/history","children":"Brief history and development"}]},{"title":"Getting Started","links":[{"href":"/getting-started/install","children":"Installing the language"},{"href":"/getting-started/basic","children":"Basic syntax and structure"},{"href":"/getting-started/helloworld","children":"Hello, Lengine!"}]},{"title":"Data Types","links":[{"href":"/data-types/numeric","children":"Numeric data types"},{"href":"/data-types/boolean","children":"Boolean data type"},{"href":"/data-types/char-strings","children":"Character and strings"},{"href":"/data-types/list-sequence","children":"List and Sequence"},{"href":"/data-types/set-map","children":"Set and Map"}]},{"title":"Functions and Control Structures","links":[{"href":"/funcs/define","children":"Defining and calling functions"},{"href":"/funcs/cnditions","children":"Conditional expressions"},{"href":"/funcs/loops","children":"Loops and iteration"},{"href":"/funcs/tailrec","children":"Tail recursion optimization"}]},{"title":"Higher-Order Functions","links":[{"href":"/higher-order/first-class","children":"Functions as first-class objects"},{"href":"/higher-order/compose-currying","children":"Function composition and currying"},{"href":"/higher-order/anonymous-clojures","children":"Anonymous functions and closures"}]},{"title":"Lazy Evaluation","links":[{"href":"/lazy-eval/lazy-and-force","children":"Lazy and Force"},{"href":"/lazy-eval/stream","children":"Stream"}]},{"title":"Error Handling and Debugging","links":[{"href":"/err/exceptions","children":"Exceptions and error handling"},{"href":"/err/tdd","children":"Testing and test-driven development"}]},{"title":"Macro","links":[{"href":"/macro/intro","children":"Introduction to Macro"}]},{"title":"Advanced Topics","links":[{"href":"/adv/interoperability","children":"Interoperability with other languages"}]},{"title":"Conclusion","links":[{"href":"/conclusion/future-plans","children":"Future development and roadmap"},{"href":"/conclusion/additional-resources","children":"Additional resources and references"}]}];

export function SideNav() {
  const router = useRouter();
  return (
    <nav className="sidenav">
      {items.map((item) => (
        <div key={item.title}>
          <span>{item.link ? <Link href={item.link.href} className={router.pathname === item.link.href ?'active': ''}>{item.title}</Link> : <>{item.title}</>}</span>
          <ul className="flex column">
            {item.links.map((link) => {
              const active = router.pathname === link.href;
              return (
                <li key={link.href} className={active ? 'active' : ''}>
                  <Link {...link} />
                </li>
              );
            })}
          </ul>
        </div>
      ))}
      <style jsx>
        {`
          nav {
            position: sticky;
            top: var(--top-nav-height);
            height: calc(100vh - var(--top-nav-height));
            flex: 0 0 auto;
            overflow-y: auto;
            padding: 2.5rem 2rem 2rem;
            border-right: 1px solid var(--border-color);
          }
          span {
            font-size: larger;
            font-weight: 500;
            padding: 0.5rem 0 0.5rem;
          }
          ul {
            padding: 0;
          }
          li {
            list-style: none;
            margin: 0;
          }
          li :global(a) {
            text-decoration: none;
          }
          li :global(a:hover),
          li.active :global(a) {
            text-decoration: underline;
          }
        `}
      </style>
    </nav>
  );
}
